import { MockApiService } from './mock/mockApiService';
import { MockAuthService } from './mock/mockAuthService';

import { ApiService } from './apiService';
import { AuthService } from './authService';

export class ServiceContainer {
  constructor() {
    this.devEnv = process.env.NODE_ENV === 'development';
  }

  auth() {
    return this.devEnv ? MockAuthService : AuthService;
  }

  api() {
    return this.devEnv ? MockApiService : ApiService;
  }
}
