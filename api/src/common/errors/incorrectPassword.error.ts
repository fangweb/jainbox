import { IncorrectPasswordMessage } from "../const";

export class IncorrectPasswordError extends Error {
  constructor() {
    super(IncorrectPasswordMessage);
  }
}
