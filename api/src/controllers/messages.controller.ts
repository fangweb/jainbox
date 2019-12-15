import { RequestHandler } from "express";
import { BaseController } from "./base.controller";
import { MessagesRepository } from "../repository";
import { AuthenticationHandler } from "../handlers";
import { HttpError } from "../common/errors";

export class MessagesController extends BaseController {
  public constructor() {
    super();
    this.router.use(AuthenticationHandler);
    this.router.route("/compose").post(this.compose);
    this.router.route("/view").get(this.viewMessage);
  }

  public static get router() {
    return new MessagesController().router;
  }

  private compose: RequestHandler = async (request, response, next) => {
    const { tokenPayload } = response.locals;
    const { receiver_name, title, message_text } = request.body;
    const grpcClient = request.app.get("grpcClient");
    try {
      const result = await MessagesRepository.compose({
        createdById: tokenPayload.username_id,
        receiverName: receiver_name,
        title,
        messageText: message_text
      });

      try {
        grpcClient.Notify(
          {
            Username: receiver_name,
            Type: "newMessage",
            Notification: message_text
          },
          function(grpcError, grpcResponse) {
            if (grpcError) {
              console.error(grpcError);
            }
            console.log(grpcResponse);
          }
        );
      } catch (notifyError) {
        console.error(notifyError);
      }

      response.json(result);
    } catch (error) {
      next(new HttpError({ status: 400, message: error.message }));
    }
  };

  private viewMessage: RequestHandler = async (request, response, next) => {
    const { tokenPayload } = response.locals;
    const { id } = request.query;
    try {
      const result = await MessagesRepository.viewMessage({
        messageId: id,
        usernameId: tokenPayload.username_id
      });
      response.json(result);
    } catch (error) {
      next(new HttpError({ status: 400, message: error.message }));
    }
  };
}
