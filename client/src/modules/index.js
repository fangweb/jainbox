import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import inboxReducer from './inbox';
import { reducer as modalReducer } from '../pkg/modal';

export default history =>
  combineReducers({
    inboxReducer,
    modalReducer,
    router: connectRouter(history)
  });
