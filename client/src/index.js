import 'normalize.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader';
import * as serviceWorker from './serviceWorker';
import store, { history } from './store';
import Application from './application';

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Application />
    </ConnectedRouter>
  </Provider>
);

const HotRoot = hot(module)(Root);

ReactDOM.render(<HotRoot />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
/* eslint-disable no-use-before-define */
serviceWorker.unregister();
