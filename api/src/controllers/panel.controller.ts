import { RequestHandler } from "express";
import { BaseController } from "./base.controller";
import { AuthenticationHandler, ValidatePageHandler } from "../handlers";
import { getOffsetLimit } from "../common/helpers";
import { PanelRepository } from "../repository";
import { TokenPayload } from "../services";
import { HttpError } from "../common/errors";

export class PanelController extends BaseController {
  public constructor() {
    super();
    this.router.use(AuthenticationHandler);

    this.router
      .route("/inbox")
      .get([ValidatePageHandler, this.getInboxMessages]);
    this.router.route("/sent").get([ValidatePageHandler, this.getSentMessages]);
    this.router
      .route("/trash")
      .get([ValidatePageHandler, this.getTrashedMessages]);
    this.router.route("/registered-users").get(this.getRegisteredUsers);
    this.router.route("/message").delete(this.softDeleteMessages);
    this.router.route("/message").put(this.putMessagesIntoInbox);
  }

  public static get router() {
    return new PanelController().router;
  }

  private getInboxMessages: RequestHandler = async (
    request,
    response,
    next
  ) => {
    const { tokenPayload, page } = response.locals;
    const [offset, limit] = getOffsetLimit(page);

    try {
      const result = await PanelRepository.getInboxMessages({
        usernameId: tokenPayload.username_id,
        offset,
        limit
      });
      response.json(result);
    } catch (error) {
      console.error(error);
      next(new HttpError({ status: 400, message: error.message }));
    }
  };

  private getSentMessages: RequestHandler = async (request, response, next) => {
    const { tokenPayload, page } = response.locals;
    const [offset, limit] = getOffsetLimit(page);

    try {
      const result = await PanelRepository.getSentMessages({
        usernameId: tokenPayload.username_id,
        offset,
        limit
      });
      response.json(result);
    } catch (error) {
      next(new HttpError({ status: 400, message: error.message }));
    }
  };

  private putMessagesIntoInbox: RequestHandler = async (
    request,
    response,
    next
  ) => {
    const { tokenPayload } = response.locals;
    const { message_ids } = request.body;

    try {
      if (message_ids.some(isNaN)) {
        throw new Error("Invalid page body.");
      }
      const result = await PanelRepository.putMessagesIntoInbox({
        usernameId: tokenPayload.username_id,
        messageIds: message_ids
      });
      response.json(result);
    } catch (error) {
      next(new HttpError({ status: 400, message: error.message }));
    }
  };

  private getTrashedMessages: RequestHandler = async (
    request,
    response,
    next
  ) => {
    const { tokenPayload, page } = response.locals;
    const [offset, limit] = getOffsetLimit(page);

    try {
      const result = await PanelRepository.getTrashedMessages({
        usernameId: tokenPayload.username_id,
        offset,
        limit
      });
      response.json(result);
    } catch (error) {
      next(new HttpError({ status: 400, message: error.message }));
    }
  };

  private putMessagesIntoTrash: RequestHandler = async (
    request,
    response,
    next
  ) => {
    const { tokenPayload } = response.locals;
    const { message_ids } = request.body;

    try {
      if (message_ids.some(isNaN)) {
        throw new Error("Invalid page body.");
      }
      const result = await PanelRepository.putMessagesIntoTrash({
        usernameId: tokenPayload.username_id,
        messageIds: message_ids
      });
      response.json(result);
    } catch (error) {
      next(new HttpError({ status: 400, message: error.message }));
    }
  };

  private softDeleteMessages: RequestHandler = async (
    request,
    response,
    next
  ) => {
    const { tokenPayload } = response.locals;
    const { message_ids } = request.body;

    try {
      const result = await PanelRepository.softDeleteMessages({
        usernameId: tokenPayload.username_id,
        messageIds: message_ids
      });
      response.json(result);
    } catch (error) {
      next(new HttpError({ status: 400, message: error.message }));
    }
  };

  private getRegisteredUsers: RequestHandler = async (
    request,
    response,
    next
  ) => {
    try {
      const result = await PanelRepository.getRegisteredUsers();
      response.json(result);
    } catch (error) {
      next(new HttpError({ status: 400, message: error.message }));
    }
  };
}
