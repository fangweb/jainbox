type NodeEnv = "test" | "development" | "production";

export interface IConfiguration {
  nodeEnv: NodeEnv;
  serverPort: number;
  grpcPort: number;
  pg: any;
  jwt: any;
}

export const Config: IConfiguration = {
  nodeEnv: process.env.API_NODE_ENV as NodeEnv,
  serverPort: parseInt(process.env.API_SERVER_PORT as string, 10),
  grpcPort: parseInt(process.env.SUBSCRIBER_GRPC_PORT as string, 10),
  pg: {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
  },
  jwt: {
    secret: process.env.API_JWT_SECRET,
    expiration: "24 hours"
  }
};
