import { ApiConfig } from '../const';

export class ApiService {
  constructor() {
    this.headers = {
      Accept: ApiConfig.HeaderAcceptValue,
      Authorization: `${ApiConfig.AuthScheme}`,
      'Content-Type': ApiConfig.HeaderContentTypeValue
    };
  }

  /* TODO:
  async getInbox() {}
  */
}
