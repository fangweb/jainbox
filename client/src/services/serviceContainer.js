import { MockApiService } from './mock/mockApiService';
import { MockAuthService } from './mock/mockAuthService';

import { ApiService } from './apiService';
import { AuthService } from './authService';

export class ServiceContainer {
  static auth() {
    return process.env.REACT_APP_USE_MOCK ? MockAuthService : AuthService;
  }

  static api() {
    return process.env.REACT_APP_USE_MOCK ? MockApiService : ApiService;
  }
}
