import { MockApiService } from './mock/mockApiService';
import { MockWsService } from './mock/mockWsService';
import { MockAuthService } from './mock/mockAuthService';

import { ApiService } from './apiService';
import { WsService } from './wsService';
import { AuthService } from './authService';

export class ServiceContainer {
  constructor() {
    this.devEnv = process.env.NODE_ENV === 'development';
  }

  auth() {
    return this.devEnv ? MockAuthService : new AuthService();
  }

  api() {
    return this.devEnv ? MockApiService : new ApiService();
  }

  ws() {
    return this.devEnv ? MockWsService : new WsService();
  }
}
