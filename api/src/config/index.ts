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
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: "24 hours"
  }
};
