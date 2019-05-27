import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SignInPath } from '../const'; 

export default AuthorizedRoute = ({ isAuthenticated, ...props }) => 
  isAuthenticated 
  ? <Route {...props}/> 
  : <Redirect to={SignInPath} />;
