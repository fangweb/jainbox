import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RootPath, ComposePath, InboxPath, SentPath, TrashPath, ViewMessagePath, TestAreaPath } from './const';
import Inbox from './pages/Inbox';
import Compose from './pages/Compose';
import Sent from './pages/Sent';
import Trash from './pages/Trash';
import ViewMessage from './pages/ViewMessage';
import Layout from './components/Layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TestArea } from './pkg/testArea';
import { Modal } from './pkg/modal';
import { Toast } from './pkg/toast';
import { initialize } from './modules/ws-module';

import './assets/css/index.css';

class Application extends Component {
  
  componentDidMount() {
    this.props.initialize();
  }
  
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Switch>
            <Redirect exact from={RootPath} to={`${InboxPath}/page/1`} />
            <Redirect exact from={InboxPath} to={`${InboxPath}/page/1`} />
            <Redirect exact from={SentPath} to={`${SentPath}/page/1`} />
            <Redirect exact from={TrashPath} to={`${TrashPath}/page/1`} />
            <Route 
              path={`${InboxPath}/page/:page`}
              name="inbox"
              key="inbox"
              component={Inbox}
            />
            <Route
              exact
              path={`${ComposePath}`}
              name="compose"
              key="compose"
              component={Compose}
            />
            <Route
              exact
              path={`${SentPath}/page/:page`}
              name="sent"
              key="sent"
              component={Sent}
            />
            <Route
              exact
              path={`${TrashPath}/page/:page`}
              name="trash"
              key="trash"
              component={Trash}
            />
            <Route
              path={`${ViewMessagePath}/:messageId`}
              name="view-message"
              key="view-message"
              component={ViewMessage}
            />
            <Route
              path={`${TestAreaPath}`}
              name="testArea"
              key="testArea"
              component={TestArea}
            />
            {/* TODO: not found */}
          </Switch>
        </Layout>
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
)(Application);;
