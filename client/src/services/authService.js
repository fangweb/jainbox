import Session from '../lib/session';

export class AuthService {
  static isAuthenticated() {
    return !Session.getJwt();
  }
}
