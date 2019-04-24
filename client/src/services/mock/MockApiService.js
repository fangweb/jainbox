import { GetInbox } from './Response';

export class MockApiService {
  getInbox() {
    return Promise.resolve(GetInbox);
  }
}
