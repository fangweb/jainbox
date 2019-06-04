import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { SignInPath, RootPath, ComposePath, InboxPath, SentPath, TrashPath, ViewMessagePath, TestAreaPath } from './const';
import DashboardLayout from './components/DashboardLayout';
import Inbox from './pages/Inbox';
import Compose from './pages/Compose';
import Sent from './pages/Sent';
import Trash from './pages/Trash';
import ViewMessage from './pages/ViewMessage';
import SignIn from './pages/SignIn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TestArea } from './pkg/testArea';
import { Modal } from './pkg/modal';
import { Toast } from './pkg/toast';
import { initialize } from './modules/application-module';

import './assets/css/index.css';

class Application extends Component {
  
  componentDidMount() {
    this.props.initialize();
  }
  
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
            render={props => (
              <SignIn isAuthenticated={false} {...props} />
            )}
          />
          <Route 
            path={`${InboxPath}/page/:page`}
            name="inbox"
            key="inbox"
            render={props => (
              <DashboardLayout>
                <Inbox {...props} />
              </DashboardLayout>
            )}
          />
          <Route
            exact
            path={`${ComposePath}`}
            name="compose"
            key="compose"
            render={props => (
              <DashboardLayout>
                <Compose {...props} />
              </DashboardLayout>
            )}
          />
          <Route
            exact
            path={`${SentPath}/page/:page`}
            name="sent"
            key="sent"
            render={props => (
              <DashboardLayout>
                <Sent {...props} />
              </DashboardLayout>
            )}
          />
          <Route
            exact
            path={`${TrashPath}/page/:page`}
            name="trash"
            key="trash"
            render={props => (
              <DashboardLayout>
                <Trash {...props} />
              </DashboardLayout>
            )}
          />
          <Route
            path={`${ViewMessagePath}/:messageId`}
            name="view-message"
            key="view-message"
            render={props => (
              <DashboardLayout>
                <ViewMessage {...props} />
              </DashboardLayout>
            )}
          />
          <Route
            path={`${TestAreaPath}`}
            name="testArea"
            key="testArea"
            render={props => (
              <DashboardLayout>
                <TestArea {...props} />
              </DashboardLayout>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      initialize,
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Application);
