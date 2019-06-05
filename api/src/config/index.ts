import * as dotenv from "dotenv";
dotenv.config();

type NodeEnv = "test" | "development" | "production";

export interface IConfiguration {
  nodeEnv: NodeEnv;
  serverPort: number;
  pg: any;
  jwt: any;
}

export const Config: IConfiguration = {
  nodeEnv: process.env.NODE_ENV as NodeEnv,
  serverPort: parseInt(process.env.SERVER_PORT as string, 10),
  pg: {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
  },
  jwt: {
    secret: process.env.JWTSECRET,
    expiration: "24 hours"
  }
};
