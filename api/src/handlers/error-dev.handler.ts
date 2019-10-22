import { ErrorRequestHandler } from "express";
export const ErrorDevHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  console.error(error.message);
  next(error);
};
