import { inboxPage1, inboxPage2, inboxPage3, getSent, getTrash } from './response';
import { wait } from '../../helpers';

export class MockApiService {
  
  getInbox({ page }) {
    if ( page === 1 ) {
      return Promise.resolve(inboxPage1);
    } else if ( page === 2 ) {
      return Promise.resolve(inboxPage2);
    } else if ( page === 3 ) {
      return Promise.resolve(inboxPage3);
    }
  }
  
  getSent() {
    return Promise.resolve(getSent);
  }
  
  getTrash() {
    return Promise.resolve(getTrash);
  }
  
  async compose(form) {
    await wait(3000);
    return true;
  }
}
