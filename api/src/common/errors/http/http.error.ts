import { InternalServerErrorMessage } from '../../const';

export class HttpError extends Error {
  public status: number;
  public message: string;

  constructor({ status, message }: { status: number; message: string }) {
    super(message);
    this.status = status;
  }
}
