import Session from '../../lib/session';
import { userSignin, userSignup } from './response';
import AuthenticationError from '../../lib/error/AuthenticationError';
import { wait } from '../../helpers';

export class MockAuthService {
  static isAuthenticated() {
    return Session.get('jwt') !== null;
  }

  static storeJwt({ token }) {
    Session.set('jwt', token);
  }

  static clearJwt() {
    Session.remove('jwt');
  }

  static async signIn({ username, password }) {
    await wait(1000);
    if (username === 'showError') {
      throw new AuthenticationError('Mock error for User Sign in');
    }
    MockAuthService.storeJwt({ token: userSignin.token });
    return userSignin;
  }

  static async signUp({ username, password, createWithMockData }) {
    await wait(1000);
    if (username === 'showError') {
      throw new AuthenticationError('Mock error for User Sign up');
    }
    MockAuthService.storeJwt({ token: userSignin.token });
    return userSignup;
  }

  static signOut() {
    MockAuthService.clearJwt();
  }
}
