import { RequestHandler } from "express";
import { HttpError } from "../common/errors/http/http.error";
import { CouldNotProcessRequest } from "../common/const";
import { convertStringToInt } from "../common/helpers";

export const ValidatePageHandler: RequestHandler = (
  request,
  response,
  next
) => {
  const { page } = request.query;

  try {
    const pageInt = convertStringToInt(page);
    response.locals.page = pageInt;
    next();
  } catch (error) {
    return next(new HttpError({ status: 401, message: error.message }));
  }
};
