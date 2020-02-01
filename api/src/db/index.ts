import { Config } from "../config";
import * as pgPromise from "pg-promise";

const options: any = {
  host: Config.pg.host,
  database: Config.pg.database,
  port: Config.pg.port,
  user: Config.pg.user,
  password: Config.pg.password,
  capSQL: true
};

export const Db = pgPromise()(options);
