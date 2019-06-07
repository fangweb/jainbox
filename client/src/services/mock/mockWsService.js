import { getOnlineUsers } from './response';
import { wait } from '../../helpers';

export class MockWsService {
  static async initialize() {
    await wait(1000);
    return {
      onlineUsers: getOnlineUsers
    };
  }

  static disconnect() {}
}
