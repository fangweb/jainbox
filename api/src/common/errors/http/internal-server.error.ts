import { InternalServerErrorMessage } from "../../const";
import { HttpError } from "./http.error";

export class InternalServerError extends HttpError {
  constructor() {
    super({ status: 500, message: InternalServerErrorMessage });
  }
}
