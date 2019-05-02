import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import inboxReducer from './inbox-module';
import sentReducer from './sent-module';
import trashReducer from './trash-module';
import { reducer as modalReducer } from '../pkg/modal';
import { reducer as toastReducer } from '../pkg/toast';

export default history =>
  combineReducers({
    inboxReducer,
    sentReducer,
    trashReducer,
    modalReducer,
    toastReducer,
    router: connectRouter(history)
  });
