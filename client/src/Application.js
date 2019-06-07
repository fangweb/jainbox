import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  SignInPath,
  RootPath,
  ComposePath,
  InboxPath,
  SentPath,
  TrashPath,
  ViewMessagePath,
  TestAreaPath
} from './const';
import ApplicationLoader from './components/ApplicationLoader';
import DashboardLayout from './components/DashboardLayout';
import Inbox from './pages/Inbox';
import Compose from './pages/Compose';
import Sent from './pages/Sent';
import Trash from './pages/Trash';
import ViewMessage from './pages/ViewMessage';
import SignIn from './pages/SignIn';
import { TestArea } from './pkg/testArea';
import { Modal } from './pkg/modal';
import { Toast } from './pkg/toast';

import './assets/css/index.css';

class Application extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Redirect exact from={RootPath} to={`${InboxPath}/page/1`} />
          <Redirect exact from={InboxPath} to={`${InboxPath}/page/1`} />
          <Redirect exact from={SentPath} to={`${SentPath}/page/1`} />
          <Redirect exact from={TrashPath} to={`${TrashPath}/page/1`} />
          <Route
            path={SignInPath}
            name="signin"
            key="signin"
            render={props => <SignIn {...props} />}
          />
          <Route
            path={`${InboxPath}/page/:page`}
            name="inbox"
            key="inbox"
            render={props => (
              <ApplicationLoader>
                <DashboardLayout>
                  <Inbox {...props} />
                </DashboardLayout>
              </ApplicationLoader>
            )}
          />
          <Route
            exact
            path={`${ComposePath}`}
            name="compose"
            key="compose"
            render={props => (
              <ApplicationLoader>
                <DashboardLayout>
                  <Compose {...props} />
                </DashboardLayout>
              </ApplicationLoader>
            )}
          />
          <Route
            exact
            path={`${SentPath}/page/:page`}
            name="sent"
            key="sent"
            render={props => (
              <ApplicationLoader>
                <DashboardLayout>
                  <Sent {...props} />
                </DashboardLayout>
              </ApplicationLoader>
            )}
          />
          <Route
            exact
            path={`${TrashPath}/page/:page`}
            name="trash"
            key="trash"
            render={props => (
              <ApplicationLoader>
                <DashboardLayout>
                  <Trash {...props} />
                </DashboardLayout>
              </ApplicationLoader>
            )}
          />
          <Route
            path={`${ViewMessagePath}/:messageId`}
            name="view-message"
            key="view-message"
            render={props => (
              <ApplicationLoader>
                <DashboardLayout>
                  <ViewMessage {...props} />
                </DashboardLayout>
              </ApplicationLoader>
            )}
          />
          <Route
            path={`${TestAreaPath}`}
            name="testArea"
            key="testArea"
            render={props => (
              <ApplicationLoader>
                <DashboardLayout>
                  <TestArea {...props} />
                </DashboardLayout>
              </ApplicationLoader>
            )}
          />
          {/* TODO: not found */}
        </Switch>
        <Modal />
        <Toast />
      </React.Fragment>
    );
  }
}

export default Application;
