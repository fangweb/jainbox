import { GetInbox } from './response';

export class MockApiService {
  getInbox() {
    return Promise.resolve(GetInbox);
  }
}
