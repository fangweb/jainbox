import Session from '../../lib/session';

export class MockAuthService {

  isAuthenticated() {
    return Session.getJwt() ? true : false;
  }
  
}
