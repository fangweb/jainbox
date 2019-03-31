import { ErrorRequestHandler } from 'express';
export const ErrorHandler: ErrorRequestHandler = (error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    message: error.message
  });
};
