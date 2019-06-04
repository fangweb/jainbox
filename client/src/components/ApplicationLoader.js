import React, { Component } from 'react';
import '../assets/css/application-loader.css';
import { Redirect } from 'react-router-dom';
import Loader from './Loader';

class ApplicationLoader extends Component {
  return (

    if (isAuthenticated) {
      return <Redirect to={`${InboxPath}/page/1`} />;
    }
    
    <div className="application-loader">
      <div className="inner">
        <i className="fas fa-bus application-loader-icon"></i>
        <span>Your application is loading</span>
        <Loader />
      </div>
    </div>
  );
}

export default ApplicationLoader;
