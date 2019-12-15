import {
  inboxPage1,
  inboxPage2,
  inboxPage3,
  sentPage1,
  trashPage1,
  mockMessage
} from './response';
import { wait } from '../../helpers';

export class MockApiService {
  static getInbox({ page }) {
    if (page === 1) {
      return Promise.resolve(inboxPage1);
    }
    if (page === 2) {
      return Promise.resolve(inboxPage2);
    }
    if (page === 3) {
      return Promise.resolve(inboxPage3);
    }
    return Promise.reject();
  }

  static getSent({ page }) {
    if (page === 1) {
      return Promise.resolve(sentPage1);
    }
    return Promise.reject();
  }

  static getTrash({ page }) {
    if (page === 1) {
      return Promise.resolve(trashPage1);
    }
    return Promise.reject();
  }

  static getMessage({ messageId }) {
    if (messageId === '36') {
      return Promise.resolve(mockMessage);
    }
    return Promise.reject();
  }

  static async sendMessage({ to, title, messageText }) {
    await wait(1000);
    return true;
  }
}
