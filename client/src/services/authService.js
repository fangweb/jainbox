import Session from '../lib/session';
import { ApiConfig } from '../config';
import { HttpClient } from '../lib/httpClient';
import Cookies from '../lib/cookies';

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
      Accept: ApiConfig.headers.acceptValue,
      'Content-Type': ApiConfig.headers.contentTypeValue
    };
  }

  static async getCredentialsFromResponse(response) {
    const body = await response.json();
    return body.Authorization;
  }

  static async signIn({ username, password }) {
    const response = await HttpClient.post(
      this.getBaseHeaders(),
      `${ApiConfig.basePath}/user/sign-in`,
      { username, password }
    );

    const credentials = await AuthService.getCredentialsFromResponse(response);
    const token = credentials.split(' ')[1];
    Cookies.set('X-Authorization', `Bearer ${token}`, {
      path: '/subscriber/ws'
    });
    AuthService.storeJwt({ token });

    return response;
  }

  static async signUp({ username, password }) {
    const response = await HttpClient.post(
      this.getBaseHeaders(),
      `${ApiConfig.basePath}/user/create`,
      { username, password }
    );
    const credentials = await AuthService.getCredentialsFromResponse(response);
    const token = credentials.split(' ')[1];
    Cookies.set('X-Authorization', `Bearer ${token}`, {
      path: '/subscriber/ws'
    });
    AuthService.storeJwt({ token });

    return response;
  }

  static signOut() {
    AuthService.clearJwt();
  }
}
