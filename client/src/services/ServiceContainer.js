export class ServiceContainer {
  constructor() {
    this.devEnv = process.env.NODE_ENV === 'development';
  }

  getApiService() {
    return this.devEnv ? new MockApiService() : new ApiService();
  }
}
