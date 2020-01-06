import { RequestHandler } from "express";
import { BaseController } from "./base.controller";
import { MessagesRepository, PanelRepository } from "../repository";
import { AuthenticationHandler } from "../handlers";
import { HttpError } from "../common/errors";

export class MessagesController extends BaseController {
  public constructor() {
    super();
    this.router.use(AuthenticationHandler);
    this.router.route("/compose").post(this.composeMessage);
    this.router.route("/view").get(this.viewMessage);
  }

  public static get router() {
    return new MessagesController().router;
  }

  private composeMessage: RequestHandler = async (request, response, next) => {
    const { tokenPayload } = response.locals;
    const { receiver_name, title, message_text } = request.body;
    const grpcClient = request.app.get("grpcClient");
    try {
      const result = await MessagesRepository.composeMessage({
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
    const { message_id } = request.query;
    try {
      // Update panel message by updating is_viewed postgres data column
      await PanelRepository.updateIsViewed({
        usernameId: tokenPayload.username_id,
        messageId: message_id,
        isViewed: true
      });

      const result = await MessagesRepository.viewMessage({
        messageId: message_id,
        usernameId: tokenPayload.username_id
      });

      response.json(result);
    } catch (error) {
      next(new HttpError({ status: 400, message: error.message }));
    }
  };
}
