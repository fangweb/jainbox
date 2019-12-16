import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PathConfig } from './config';
import ApplicationLoader from './components/ApplicationLoader';
import DashboardLayout from './components/DashboardLayout';
import Inbox from './pages/Inbox';
import Compose from './pages/Compose';
import Sent from './pages/Sent';
import Trash from './pages/Trash';
import ViewMessage from './pages/ViewMessage';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import { TestArea } from './pkg/testArea';
import { Modal } from './pkg/modal';
import { ToastContainer } from './pkg/toast';

import './assets/css/index.css';

class Application extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Redirect
            exact
            from={PathConfig.rootPath}
            to={`${PathConfig.inboxPath}/page/1`}
          />
          <Redirect
            exact
            from={PathConfig.inboxPath}
            to={`${PathConfig.inboxPath}/page/1`}
          />
          <Redirect
            exact
            from={PathConfig.sentPath}
            to={`${PathConfig.sentPath}/page/1`}
          />
          <Redirect
            exact
            from={PathConfig.trashPath}
            to={`${PathConfig.trashPath}/page/1`}
          />
          <Route
            path={PathConfig.signInPath}
            name="signin"
            key="signin"
            render={props => <SignIn {...props} />}
          />
          <Route
            path={`${PathConfig.inboxPath}/page/:page`}
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
            path={`${PathConfig.composePath}`}
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
            path={`${PathConfig.sentPath}/page/:page`}
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
            path={`${PathConfig.trashPath}/page/:page`}
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
            path={`${PathConfig.viewMessagePath}/:messageId`}
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
            path={`${PathConfig.testAreaPath}`}
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
          <Route component={NotFound} />
          {/* TODO: not found */}
        </Switch>
        <Modal />
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default Application;
