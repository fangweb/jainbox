import { RequestHandler } from 'express';
import { BaseController } from './base.controller';
import { MessageController } from '../repository';

export class MessageController extends BaseController {
  public constructor() {
    super();
  }

  public static get router() {
    return new MessagesController().router;
  }

  private compose: RequestHandler = async (request, response, next)  => {
    const { tokenPayload } = response.locals;
    const { receiver_name, message_text } = request.body;

    try {
      const result = await MessageController.compose({ initiatorId: tokenPayload.username_id, receiverName: receiver_name, messageText: message_text });
      response.json(result);
    } catch (error) {
      next(new HttpError({ status: 409, message: error.message }));
    }
  }
  
}
