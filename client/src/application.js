import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './assets/css/index.css';
import Inbox from './pages/Inbox';
import Compose from './pages/Compose';
import Sent from './pages/Sent';
import Trash from './pages/Trash';
import Message from './pages/Message';
import Layout from './components/Layout';
import { Modal } from './pkg/modal';

function Application() {
  return (
    <React.Fragment>
      <Layout>
        <Switch>
          <Route exact path="/" key={"inbox-home"} component={Inbox} />
          <Route
            exact
            path="/inbox"
            name="inbox"
            key="inbox"
            component={Inbox}
          />
          <Route
            exact
            path="/compose"
            name="compose"
            key="compose"
            component={Compose}
          />
          <Route
            exact
            path="/sent"
            name="sent"
            key="sent"
            component={Sent}
          />
          <Route
            exact
            path="/trash"
            name="trash"
            key="trash"
            component={Trash}
          />
          <Route
            path="/message/:message_id"
            name="message"
            key="message"
            component={Message}
          />
          {/* TODO: not found */}
        </Switch>
      </Layout>
      <Modal />
    </React.Fragment>
  );
}

export default Application;
