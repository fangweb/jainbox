import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import inboxReducer from './inbox-module';
import sentReducer from './sent-module';
import { reducer as modalReducer } from '../pkg/modal';

export default history =>
  combineReducers({
    inboxReducer,
    sentReducer,
    modalReducer,
    router: connectRouter(history)
  });
