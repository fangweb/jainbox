import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './assets/css/index.css';
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

class Application extends Component {
  
  componentDidMount() {
    this.props.initialize();
  }
  
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Switch>
            <Redirect exact from="/" to="/inbox/page/1" />
            <Redirect exact from="/inbox" to="/inbox/page/1" />
            <Redirect exact from="/sent" to="/sent/page/1" />
            <Redirect exact from="/trash" to="/trash/page/1" />
            <Route 
              path="/inbox/page/:page"
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
              path="/sent/page/:page"
              name="sent"
              key="sent"
              component={Sent}
            />
            <Route
              exact
              path="/trash/page/:page"
              name="trash"
              key="trash"
              component={Trash}
            />
            <Route
              path="/message/:messageId"
              name="message"
              key="message"
              component={ViewMessage}
            />
            <Route
              path="/testarea"
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
