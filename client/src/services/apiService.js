import { ApiConst } from '../const';
import { ServiceContainer } from '../services';

export class ApiService {
  constructor() {
    const SessionService = ServiceContainer().session();
    this.headers = {
      Accept: ApiConst.HeaderAcceptValue,
      Authorization: `${ApiConst.AuthScheme} ${SessionService.getJwt()}`,
      'Content-Type': ApiConst.HeaderContentTypeValue
    };
  }

  async getInbox() {
  
  }
}
