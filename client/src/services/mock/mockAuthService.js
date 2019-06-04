import Session from '../../lib/session';
import { userSignin, userSignup } from './response';
import { wait } from '../../helpers';

export class MockAuthService {

  isAuthenticated() {
    return Session.get('jwt') ? true : false;
  }
  
  storeJwt({ token }) {
    Session.set('jwt', token);
  }
  
  async signIn({ username, password }) {
    await wait(500);
    if (username === 'showError') {
      return Promise.reject();
    }
    this.storeJwt(userSignin.token);
    return Promise.resolve(userSignin);
  }
  
  async signUp({ username, password, createWithMockData }) {
    await wait(500);
    if (username === 'showError') {
      return Promise.reject();
    }
    this.storeJwt(userSignin.token);
    return Promise.resolve(userSignup);  
  }
  
}
