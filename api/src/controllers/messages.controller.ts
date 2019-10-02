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
    const { receiver_name, message_text } = request.body;

    try {
      const result = await MessagesRepository.compose({
        createdById: tokenPayload.username_id,
        receiverName: receiver_name,
        messageText: message_text
      });
      response.json(result);
    } catch (error) {
      next(new HttpError({ status: 409, message: error.message }));
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
      console.log(error.message);
      next(new HttpError({ status: 409, message: error.message }));
    }
  };
}
