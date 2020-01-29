import { RequestHandler } from "express";
import { HttpError } from "../common/errors/http/http.error";

export const ValidatePageHandler: RequestHandler = (request, response, next) => {
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
