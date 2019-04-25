import { getInbox, getSent, getTrash } from './response';

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
}
