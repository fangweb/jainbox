import Session from '../lib/session';
import { ApiConfig } from '../config';
import { HttpClient } from '../lib/httpClient';

export class AuthService {
  static isAuthenticated() {
    return Session.get('jwt') !== null;
  }

  static storeJwt({ token }) {
    Session.set('jwt', token);
  }

  static clearJwt() {
    Session.remove('jwt');
  }

  static getBaseHeaders() {
    return {
      Accept: ApiConfig.headers.HeaderAcceptValue,
      'Content-Type': ApiConfig.headers.HeaderContentTypeValue
    };
  }

  static async signIn({ username, password }) {
    const response = await HttpClient.post(
      this.getBaseHeaders(),
      `${ApiConfig.basePath}/user/sign-in`,
      { username, password }
    );

    return response;
  }

  static async signUp({ username, password }) {
    const response = await HttpClient.post(
      this.getBaseHeaders(),
      `${ApiConfig.basePath}/user/create`,
      { username, password }
    );
    return response;
  }

  static signOut() {
    AuthService.clearJwt();
  }
}
