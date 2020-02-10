import { UserExistsMessage } from "../const";

export class UserExistsError extends Error {
  constructor() {
    super(UserExistsMessage);
  }
}
