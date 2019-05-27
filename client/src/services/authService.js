import Session from '../lib/session';

export class AuthService {

  isAuthenticated() {
    return Session.getJwt() ? true : false;
  }
  
}
