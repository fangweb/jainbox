import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ServiceContainer } from '../services';
import { SignInPath } from '../const';
import Loader from './Loader';
import {
  updateOnlineUsers,
  updateLoaded,
  updateAuthenticated
} from '../modules/application-module';

import '../assets/css/application-loader.css';

class ApplicationLoader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      bootstrappingApplication: true
    };
  }

  componentDidMount() {
    this.initialize();
  }

  async initialize() {
    const { application } = this.props;
    const auth = new ServiceContainer().auth();
    this.props.updateAuthenticated(auth.isAuthenticated());
    this.setState({ bootstrappingApplication: false });
    if (application.loaded || !auth.isAuthenticated()) {
      return;
    }
    const ws = new ServiceContainer().ws();
    const { onlineUsers } = await ws.initialize();
    this.props.updateOnlineUsers(onlineUsers);
    this.props.updateLoaded(true);
  }

  render() {
    const { application } = this.props;
    const { bootstrappingApplication } = this.state;

    if (bootstrappingApplication) {
      return <div className="application-loader" />;
    }

    if (!application.isAuthenticated) {
      return <Redirect to={SignInPath} />;
    }

    if (!application.loaded) {
      return (
        <div className="application-loader">
          <div className="inner">
            <i className="fas fa-wifi application-loader-icon" />
            <span>Setting up connections</span>
            <Loader />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const mapStateToProps = state => ({
  application: state.applicationReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateOnlineUsers,
      updateLoaded,
      updateAuthenticated
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationLoader);
