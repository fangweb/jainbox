import { MockApiService } from './mock/mockApiService';
import { MockWsService } from './mock/mockWsService';
import { ApiService } from './apiService';
import { WsService } from './wsService';
import { SessionService } from './sessionService';

export class ServiceContainer {
  constructor() {
    this.devEnv = process.env.NODE_ENV === 'development';
  }

  api() {
    return this.devEnv ? new MockApiService() : new ApiService();
  }

  ws() {
    return this.devEnv ? new MockWsService() : new WsService();
  }
  
  session() {
    return SessionService;
  }
  
}
