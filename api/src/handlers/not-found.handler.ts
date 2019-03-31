import { RequestHandler } from 'express';
import { HttpError } from '../common/errors/http/http.error';

export const NotFoundHandler: RequestHandler = (request, response, next) => {
  next(new HttpError({ status: 404, message: 'Endpoint not found' }));
};
