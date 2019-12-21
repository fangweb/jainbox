import { PathConfig, WsConfig } from '../config';
import * as actions from '../modules/ws-module';
import { getInbox } from '../modules/inbox-module';

import { wait } from '../helpers';
import { ApiService } from '../services/apiService';
import {
  updateRegisteredUsers,
  updateLoaded
} from '../modules/application-module';
import mockRegisteredUsers from './mock/registeredUsers';

const prodMiddleware = () => {
  let socket = null;

  const onOpen = store => async event => {
    await wait(500);
    console.log('Websocket has connected');
    const response = await ApiService.getRegisteredUsers();
    const registeredUsers = await response.json();
    store.dispatch(updateRegisteredUsers(registeredUsers));
    store.dispatch(updateLoaded(true));
  };

  const onClose = store => event => {
    console.log('Websocket has disconnected');
  };

  const onError = store => event => {
    console.error('WebSocket error: ', event);
  };

  const onMessage = store => event => {
    const payload = JSON.parse(event.data);
    const { router } = store.getState();
    switch (payload.Type) {
      case 'newMessage':
        if (router.location.pathname === `${PathConfig.inboxPath}/page/1`) {
          store.dispatch(getInbox({ page: 1, showLoader: false }));
        }
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

          socket = new WebSocket(`${WsConfig.basePath}/ws`);
          socket.onopen = onOpen(store);
          socket.onclose = onClose(store);
          socket.onerror = onError(store);
          socket.onmessage = onMessage(store);
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
        store.dispatch(updateRegisteredUsers(mockRegisteredUsers));
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
  return process.env.REACT_APP_USE_MOCK === 'true'
    ? mockMiddleware()
    : prodMiddleware();
};

export default wsMiddleware;
