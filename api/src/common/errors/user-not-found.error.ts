import { UserNotFoundMessage } from "../const";

export class UserNotFoundError extends Error {
  constructor() {
    super(UserNotFoundMessage);
  }
}
