import { DeactivateErrorMessage } from "../const";

export class DeactivateError extends Error {
  constructor() {
    super(DeactivateErrorMessage);
  }
}
