import { getOnlineUsers } from './response';

export class MockWsService {
  initialize() {
    return Promise.resolve({
      onlineUsers: getOnlineUsers
    });
  }

}
