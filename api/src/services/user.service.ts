import * as Bcrypt from "bcryptjs";
import { IncorrectPasswordError, DeactivateError } from "../common/errors";
import { TokenService } from "./token.service";
import { UserRepository } from "../repository";
import { Config } from "../config";

export class UserService {
  public static async signIn(
    username: string,
    password: string
  ): Promise<string> {
    let accountData: any;
    try {
      accountData = await UserRepository.details({ username });
    } catch (error) {
      throw error;
    }

    try {
      const compare = await Bcrypt.compare(password, accountData.hash);
      if (!compare) {
        throw new IncorrectPasswordError();
      }
    } catch (error) {
      throw error;
    }

    try {
      const token = await TokenService.sign(
        accountData.username,
        accountData.id
      );
      return token;
    } catch (error) {
      throw error;
    }
  }

  public static async create(username: string, password: string): Promise<any> {
    let hash: string;

    try {
      hash = await Bcrypt.hash(password, 10);
    } catch (error) {
      throw error;
    }

    try {
      const accountData = await UserRepository.create({ username, hash });
      const token = await TokenService.sign(
        accountData.username,
        accountData.id
      );
      return token;
    } catch (error) {
      throw error;
    }
  }

  public static async deactivate(
    username: string,
    password: string
  ): Promise<void> {
    let accountData: any;

    try {
      accountData = await UserRepository.details({ username });
    } catch (error) {
      throw error;
    }

    try {
      const compare = await Bcrypt.compare(password, accountData.hash);
      if (!compare) {
        throw new IncorrectPasswordError();
      }
    } catch (error) {
      throw error;
    }

    try {
      await UserRepository.deactivate({ username, hash: accountData.hash });
    } catch (error) {
      throw new DeactivateError();
    }
  }
}
