import * as actions from '../modules/ws-module';
import { PathConfig } from '../config';
import { wait } from '../helpers';
import { updateOnlineUsers, updateLoaded } from '../modules/application-module';
import onlineUsers from './mock/onlineUsers';

const prodMiddleware = () => {
  let socket = null;

  const onOpen = store => event => {
    console.log('Websocket has connected');
  };

  const onClose = store => event => {
    console.log('Websocket has disconnected');
  };

  const onMessage = store => event => {
    const payload = JSON.parse(event.data);

    switch (payload.Type) {
      case 'notification':
        store.dispatch();
        break;
      case 'onlineUsers':
        break;
      default:
        break;
    }
  };

  return store => next => action => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (window.WebSocket) {
          if (socket !== null) {
            socket.close();
          }

          socket = new WebSocket(PathConfig.subscriberRoot);
          socket.onopen = onOpen(store);
          socket.onclose = onClose(store);
          socket.onmessage = onClose(store);
        } else {
          throw new Error('Your browser does support WebSockets');
        }
        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      default:
        break;
    }
    return next(action);
  };
};

const mockMiddleware = () => {
  return store => next => async action => {
    switch (action.type) {
      case 'WS_CONNECT':
        await wait(1000);
        store.dispatch(updateOnlineUsers(onlineUsers));
        store.dispatch(updateLoaded(true));
        console.log('Websocket has connected');
        break;
      case 'WS_DISCONNECT':
        console.log('Websocket has disconnected');
        break;
      default:
        break;
    }
    return next(action);
  };
};

const wsMiddleware = () => {
  return process.env.NODE_ENV === 'development'
    ? mockMiddleware()
    : prodMiddleware();
};

export default wsMiddleware;
