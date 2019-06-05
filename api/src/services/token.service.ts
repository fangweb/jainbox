import * as Jwt from "jsonwebtoken";
import { InternalServerError } from "../common/errors";
import { Config } from "../config";

export interface TokenPayload {
  username: string;
  username_id: number;
}

export class TokenService {
  public static async sign(
    username: string,
    username_id: number
  ): Promise<string> {
    const payload: TokenPayload = { username, username_id };
    try {
      const token = await Jwt.sign(payload, Config.jwt.secret, {
        expiresIn: Config.jwt.expiration
      });

      return token;
    } catch (error) {
      throw error;
    }
  }

  public static async verify(token: string): Promise<TokenPayload> {
    try {
      return await (<TokenPayload>Jwt.verify(token, Config.jwt.secret));
    } catch (error) {
      throw error;
    }
  }
}
