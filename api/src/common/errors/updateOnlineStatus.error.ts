import { UpdateOnlineStatusMessage } from "../const";

export class UpdateOnlineStatusError extends Error {
  constructor() {
    super(UpdateOnlineStatusMessage);
  }
}
