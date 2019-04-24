import { MockApiService } from './mock/mockApiService';
import { SessionService } from './sessionService';
import { ApiService } from './apiService';

export class ServiceContainer {
  constructor() {
    this.devEnv = process.env.NODE_ENV === 'development';
  }

  api() {
    return this.devEnv ? new MockApiService() : new ApiService();
  }
  
  session() {
    return SessionService;
  }
}
