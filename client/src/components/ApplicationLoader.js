import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ServiceContainer } from '../services';
import { SignInPath } from '../const';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from './Loader';
import { updateOnlineUsers, updateLoaded, updateAuthenticated } from '../modules/application-module';

import '../assets/css/application-loader.css';

class ApplicationLoader extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      bootstrappingApplication: true
    }
  }

  async initialize() {
    const { application, updateOnlineUsers, updateLoaded, updateAuthenticated } = this.props;
    const auth = (new ServiceContainer()).auth();
    updateAuthenticated(auth.isAuthenticated());
    this.setState({ bootstrappingApplication: false });
    if (application.loaded || !auth.isAuthenticated()) {
      return;
    }
    const ws = (new ServiceContainer()).ws();
    const { onlineUsers } = await ws.initialize();
    updateOnlineUsers(onlineUsers);  
    updateLoaded(true);
  }
  
  componentDidMount() {
    this.initialize();
  }
  
  render() {
    const { application } = this.props;
    const { bootstrappingApplication } = this.state;
    
    if (bootstrappingApplication) {
      return (
        <div className="application-loader">
          <div className="inner">
            <i className="fas fa-wifi application-loader-icon"></i>
            <span>Bootstrapping application</span>
            <Loader />
          </div>
        </div>
      );      
    }
    
    if (!application.isAuthenticated) {
      return (
        <Redirect to={SignInPath} />
      );
    }  
    
    if (!application.loaded) {
      return (
        <div className="application-loader">
          <div className="inner">
            <i className="fas fa-wifi application-loader-icon"></i>
            <span>Setting up connections</span>
            <Loader />
          </div>
        </div>
      );
    }
    
    return this.props.children;
  }
}

const mapStateToProps = (state) => ({
  application: state.applicationReducer
}); 

const mapDispatchToProps = dispatch => bindActionCreators({
  updateOnlineUsers,
  updateLoaded,
  updateAuthenticated
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationLoader);
