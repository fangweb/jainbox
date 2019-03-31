import { UnauthorizedErrorMessage } from '../../const';
import { HttpError } from './http.error';

export class UnauthorizedError extends HttpError {
  constructor(message = UnauthorizedErrorMessage) {
    super({ status: 401, message });
  }
}
