import { getInbox, getSent, getTrash } from './response';
import { wait } from '../../helpers';

export class MockApiService {
  getInbox() {
    return Promise.resolve(getInbox);
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
