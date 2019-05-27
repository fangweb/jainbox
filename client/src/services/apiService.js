import { ApiConfig } from '../const';
import { ServiceContainer } from '../services';

export class ApiService {
  constructor() {
    const SessionService = ServiceContainer().session();
    this.headers = {
      Accept: ApiConfig.HeaderAcceptValue,
      Authorization: `${ApiConfig.AuthScheme} ${SessionService.getJwt()}`,
      'Content-Type': ApiConfig.HeaderContentTypeValue
    };
  }

  async getInbox() {
  
  }
}
