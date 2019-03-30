import { GetInbox } from './mockApiServiceResponses';

export class MockApiService {
  getInbox() {
    return Promise.resolve(GetInbox);
  }
}
