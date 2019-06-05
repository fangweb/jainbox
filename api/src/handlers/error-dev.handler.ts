import { ErrorRequestHandler } from "express";
export const ErrorDevHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  next(error);
};
