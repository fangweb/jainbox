import * as BodyParser from "body-parser";
import * as Compression from "compression";
import * as Cors from "cors";
import * as Express from "express";
import * as Helmet from "helmet";
import * as Logger from "morgan";
import * as Path from "path";
import * as Grpc from "grpc";
import * as Protoloader from "@grpc/proto-loader";

import {
  UserController,
  PanelController,
  MessagesController
} from "./controllers";

import { NotFoundHandler, ErrorDevHandler, ErrorHandler } from "./handlers";
import { Config } from "./config";
import { Db } from "./db";

export class Server {
  public static async start(): Promise<void> {
    const server = new Server();

    await server.application.listen(Config.serverPort);
    console.log("API is listening at port %s", Config.serverPort);
  }

  private readonly application: Express.Application;

  public constructor() {
    this.application = Express();
    this.initialize();
    this.setupEndpoints();
  }

  public getApp(): Express.Application {
    return this.application;
  }

  private initialize(): void {
    if (Config.nodeEnv !== "production") {
      this.application.use(Logger("dev"));
    }

    this.application.use(Helmet());
    this.application.use(Compression());
    this.application.use(BodyParser.urlencoded({ extended: true }));
    this.application.use(BodyParser.json());
    this.application.use(Cors());

    this.initializeGrpc();
  }

  private initializeGrpc(): void {
    try {
      const packageDefinition = Protoloader.loadSync(
        Path.resolve(__dirname, "../messenger.proto"),
        {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true
        }
      );
      const messengerProto = Grpc.loadPackageDefinition(packageDefinition).pb;

      const grpcClient = new messengerProto["Messenger"](
        `subscriber:${Config.grpcPort}`,
        Grpc.credentials.createInsecure()
      );

      this.application.set("grpcClient", grpcClient);
    } catch (error) {
      console.error(error);
    }
  }

  private setupEndpoints(): void {
    this.application.use("/user", UserController.router);
    this.application.use("/panel", PanelController.router);
    this.application.use("/messages", MessagesController.router);
    this.application.use(NotFoundHandler);
    if (Config.nodeEnv === "development") {
      this.application.use(ErrorDevHandler);
    }

    this.application.use(ErrorHandler);
  }
}
