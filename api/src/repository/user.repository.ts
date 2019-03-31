import * as pgPromise from 'pg-promise';
import * as queries from './queries/user.queries';
import { Db } from '../db';
import { UpdateOnlineStatusError, UserExistsError, UserNotFoundError } from '../common/errors';

export class UserRepository {
  public static create({ username, hash }: { username: string; hash: string }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      Db.tx(async t => {
        const createdAccount = await t.one(queries.createAccount, { username, hash });
        await t.none(queries.createStatus, { usernameId: createdAccount.id });
        return createdAccount;
      })
        .then(data => resolve(data))
        .catch(error => {
          if (error.code === '23505') {
            return reject(new UserExistsError());
          }
          reject(error);
        });
    });
  }

  public static details({ username }: { username: string }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Db.one(queries.details, { username });
        resolve(data);
      } catch (error) {
        if (error instanceof pgPromise.errors.QueryResultError) {
          if (error.code === pgPromise.errors.queryResultErrorCode.noData) {
            return reject(new UserNotFoundError());
          }
        }

        reject(error);
      }
    });
  }

  public static deactivate({ username, hash }: { username: string; hash: string }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Db.one(queries.deactivate, { username, hash, deactivate: true });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static updateStatus({
    usernameId,
    onlineStatus
  }: {
    usernameId: number;
    onlineStatus: boolean;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Db.one(queries.updateStatus, { usernameId, onlineStatus });
        resolve(data);
      } catch (error) {
        reject(new UpdateOnlineStatusError());
      }
    });
  }
}
