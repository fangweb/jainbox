import { RequestHandler } from 'express';
import { UnauthorizedError } from '../common/errors';
import { TokenService } from '../services';

export const AuthenticationHandler: RequestHandler = async (request, response, next) => {
  const authorization = request.get('Authorization');
  let tokenPayload;

  if (!authorization) {
    return next(new UnauthorizedError());
  }
  
  const [type, token] = authorization.split(' ');

  if (!token || type !== 'Bearer') {
    return next(new UnauthorizedError());
  }


  try {
    tokenPayload = await TokenService.verify(token);
  } catch (error) {
    throw error;
  }

  response.locals.tokenPayload = tokenPayload;
  next();
};
