import { inboxPage1, inboxPage2, inboxPage3, sentPage1, trashPage1, mockMessage } from './response';
import { wait } from '../../helpers';

export class MockApiService {
  
  getInbox({ page }) {
    if ( page === 1 ) {
      return Promise.resolve(inboxPage1);
    } else if ( page === 2 ) {
      return Promise.resolve(inboxPage2);
    } else if ( page === 3 ) {
      return Promise.resolve(inboxPage3);
    } else {
      return Promise.reject();
    }
  }
  
  getSent({ page }) {
    if ( page === 1 ) {
      return Promise.resolve(sentPage1);
    } else {
      return Promise.reject();
    }
  }
  
  getTrash({ page }) {
    if ( page === 1 ) {
      return Promise.resolve(trashPage1);
    } else {
      return Promise.reject();
    }
  }
  
  getMessage({ messageId }) {
    if ( messageId === "36") {
      return Promise.resolve(mockMessage);
    } else {
      return Promise.reject();
    }
  }
  
  async compose(form) {
    await wait(3000);
    return true;
  }
}
