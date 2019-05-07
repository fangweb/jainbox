import { getOnlineUsers } from './response';

export class MockWsService {
  getOnlineUsers() {
    return Promise.resolve(getOnlineUsers);
  }

}
