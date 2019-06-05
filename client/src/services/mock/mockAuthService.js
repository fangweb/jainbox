import Session from '../../lib/session';
import { userSignin, userSignup } from './response';
import AuthenticationError from '../../lib/error/AuthenticationError';
import { wait } from '../../helpers';

export class MockAuthService {

  isAuthenticated() {
    return Session.get('jwt') ? true : false;
  }
  
  storeJwt({ token }) {
    Session.set('jwt', token);
  }
  
  clearJwt() {
    Session.remove('jwt');
  }
  
  async signIn({ username, password }) {
    await wait(1000);
    if (username === 'showError') {
      throw new AuthenticationError('Mock error');
    }
    this.storeJwt(userSignin.token);
    return userSignin;
  }
  
  async signUp({ username, password, createWithMockData }) {
    await wait(1000);
    if (username === 'showError') {
      throw new AuthenticationError('Mock error'); 
    }
    this.storeJwt(userSignin.token);
    return userSignup;  
  }
  
  signOut() {
    this.clearJwt(); 
  }
  
}
