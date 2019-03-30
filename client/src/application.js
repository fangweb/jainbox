import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ShortId from 'shortid';

import './assets/css/index.css';
import Inbox from './pages/Inbox';
import Compose from './pages/Compose';
import Sent from './pages/Sent';
import Trash from './pages/Trash';
import Thread from './pages/Thread';
import Layout from './components/Layout';

function Application() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" key={ShortId.generate()} component={Inbox} />
        <Route
          exact
          path="/inbox"
          name="inbox"
          key={ShortId.generate()}
          component={Inbox}
        />
        <Route
          exact
          path="/compose"
          name="compose"
          key={ShortId.generate()}
          component={Compose}
        />
        <Route
          exact
          path="/sent"
          name="sent"
          key={ShortId.generate()}
          component={Sent}
        />
        <Route
          exact
          path="/trash"
          name="trash"
          key={ShortId.generate()}
          component={Trash}
        />
        <Route
          path="/thread/:thread_id"
          name="thread"
          key={ShortId.generate()}
          component={Thread}
        />
        {/* TODO: not found */}
      </Switch>
    </Layout>
  );
}

export default Application;
