import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import inboxReducer from './inbox';

export default history =>
  combineReducers({
    inboxReducer,
    router: connectRouter(history)
  });
