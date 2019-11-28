import { RequestHandler } from "express";
import { BaseController } from "./base.controller";
import { AuthenticationHandler } from "../handlers";
import { getOffsetLimit } from "../common/helpers";
import { CouldNotProcessRequest } from "../common/const";
import { PanelRepository } from "../repository";
import { TokenPayload } from "../services";
import { HttpError } from "../common/errors";

const validatePage = (request, response, next) => {
  let { page } = request.query;

  page = parseInt(page, 10);
  if (isNaN(page)) {
    return next(
      new HttpError({ status: 401, message: CouldNotProcessRequest })
    );
  }

  response.locals.page = page;
  next();
};

export class PanelController extends BaseController {
  public constructor() {
    super();
    this.router.use(AuthenticationHandler);

    this.router.route("/inbox").get([validatePage, this.getInboxMessages]);
    this.router.route("/sent").get([validatePage, this.getSentMessages]);
    this.router.route("/trash").get([validatePage, this.getTrashedMessages]);
    this.router.route("/registered-users").get(this.getRegisteredUsers);
    this.router.route("/message").delete(this.softDeleteMessage);
    this.router.route("/message").put(this.putMessageIntoInbox);
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
      console.log(error);
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

  private putMessageIntoInbox: RequestHandler = async (
    request,
    response,
    next
  ) => {
    const { tokenPayload } = response.locals;
    const { message_id } = request.body;

    try {
      const result = await PanelRepository.putMessageIntoInbox({
        usernameId: tokenPayload.username_id,
        messageId: message_id
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

  private softDeleteMessage: RequestHandler = async (
    request,
    response,
    next
  ) => {
    const { tokenPayload } = response.locals;
    const { message_id } = request.body;

    try {
      const result = await PanelRepository.softDeleteMessage({
        usernameId: tokenPayload.username_id,
        messageId: message_id
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
      console.log(error);
      next(new HttpError({ status: 400, message: error.message }));
    }
  };
}
