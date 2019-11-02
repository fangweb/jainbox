import Session from '../lib/session';
import { ApiConfig } from '../config';
import { HttpClient } from '../lib/httpClient';

export class AuthService {
  static isAuthenticated() {
    return !Session.getJwt();
  }

  static getBaseHeaders() {
    return {
      Accept: ApiConfig.HeaderAcceptValue,
      'Content-Type': ApiConfig.HeaderContentTypeValue
    };
  }

  static async signIn(username, password) {
    const response = await HttpClient.post(
      this.getBaseHeaders(),
      `/api/user/sign-in`,
      { username, password }
    );
    return response;
  }

  static async create(username, password) {
    const response = await HttpClient.post(
      this.getBaseHeaders(),
      `/api/user/create`,
      { username, password }
    );
    return response;
  }
}
