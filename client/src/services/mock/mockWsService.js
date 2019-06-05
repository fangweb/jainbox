import { getOnlineUsers } from './response';
import { wait } from '../../helpers';

export class MockWsService {
  async initialize() {
    await wait(1000);
    return {
      onlineUsers: getOnlineUsers
    };
  }

}
