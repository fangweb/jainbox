import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { InboxPath } from '../const';
import { ServiceContainer } from '../services';
import '../assets/css/sign-in.css';

const getNewInitialState = () => {
  return {
    displaySignup: false,
    formSubmitting: false,
    formError: false,
    redirect: false,
    formSignin: {
      username: '',
      password: ''
    },
    formSignup: {
      username: '',
      password: '',
      verify: '',
      generateMock: true
    }
  };
}

const SubmitButton = ({ onClick, message, formSubmitting, submittingMessage }) => {
  if (formSubmitting) {
    return (
      <button type="submit" disabled className="sign-in__button disabled">
        <i style={{ marginRight: '1em' }} className="fas fa-spinner fa-spin"></i>
        <b>{submittingMessage}</b>
      </button>
    );
  }
  return (
    <button type="submit" onClick={onClick} className="sign-in__button"><b>{message}</b></button>
  );
};

class SignIn extends Component {
  
  // pass props from render on route
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }
  
  constructor(props) {
    super(props);
    
    this.state = {
      ...getNewInitialState()
    };
    
    this.auth = new ServiceContainer().auth();
  }
  
  toggleCard = e => {
    e.preventDefault();
    this.setState(prevState => ({ ...getNewInitialState(), displaySignup: !prevState.displaySignup }));
  }
  
  setForm = (formType, e) => {
    const target = e.target;
    const { name, value } = target;
    this.setState(prevState => ({ 
      [formType]:  {
        ...prevState[formType],
        [name]: value
      } 
    }));
  }
  
  toggleCheckbox = () => {
    this.setState( prevState => ({ 
      formSignup: {
        ...prevState['formSignup'],
        generateMock: !prevState['formSignup']['generateMock']
      }
    })); 
  }
  
  handleSignin = async (e) => {
    e.preventDefault();
    this.setState({ formSubmitting: true });
    try {
      await this.auth.signIn({ ...this.state.formSignin });
      this.setState({ redirect: true });
    }
    catch (e) {
      this.setState({ formError: true, formSubmitting: false });
    }
  }

  handleSignup = async (e) => {
    e.preventDefault();  
    this.setState({ formSubmitting: true });
    try {
      await this.auth.signIn({ ...this.state.formSignup });
      this.setState({ redirect: true });
    }
    catch (e) {
      this.setState({ formError: true, formSubmitting: false });
    }    
  }
  
  render() {
    const { isAuthenticated } = this.props;
    const { displaySignup, formSubmitting, formSignin, formSignup, formError, redirect } = this.state;
    
    if (isAuthenticated || redirect) {
      return (
        <Redirect to={InboxPath} />
      );
    }
    
    if (!displaySignup) {
      return (
        <div className="sign-in">
          <div className="sign-in-card">
            <div className="main">
              <div className="sign-in__header">
                <i className="fas fa-sign-in-alt signinIcon"></i>
                <b>Sign In</b>
              </div>
              {formError &&
                <div className="form-errors">
                  <ul>
                    <li>Please check that all your fields are correct. </li>
                  </ul>
                </div>
              }
              <form onSubmit={this.handleSignin}>
                <input className={`${formError ? 'error' : ''}`} onChange={e => this.setForm('formSignin', e)} value={formSignin.username} type="text" name="username" placeholder="Username" />
                <input className={`${formError ? 'error' : ''}`} onChange={e => this.setForm('formSignin', e)} value={formSignin.password} type="password" name="password" placeholder="Password" />
                <SubmitButton 
                  onClick={this.handleSignin} 
                  message="Sign in" 
                  formSubmitting={formSubmitting}
                  submittingMessage="Signing in"
                />
              </form>
            </div>
            <div className="secondary">
              <div className="sign-in__header">
                <i className="fas fa-users signinIcon"></i>
                <b>Sign up as a new user</b>
              </div>
              <button type="submit" onClick={this.toggleCard} className="sign-in__button"><b>Sign up</b></button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="sign-in">
          <div className="sign-in-card">
            <div className="main">
              <div className="sign-in__header">
                <i className="fas fa-users signinIcon"></i>
                <b>Sign up</b>
              </div>
              {formError &&
                <div className="form-errors">
                  <ul>
                    <li>Please check that all your fields are correct. </li>
                  </ul>
                </div>
              }              
              <form onSubmit={this.handleSignup}>
                <input className={`${formError ? 'error' : ''}`} onChange={e => this.setForm('formSignup', e)} value={formSignup.username}  type="text" name="username" placeholder="Username" />
                <input className={`${formError ? 'error' : ''}`} onChange={e => this.setForm('formSignup', e)} value={formSignup.password}  type="password" name="password" placeholder="Password" />
                <input className={`${formError ? 'error' : ''}`} onChange={e => this.setForm('formSignup', e)} value={formSignup.verify}  type="password" name="verify" placeholder="Verify Password" />
                <label className="mock-ctrl">
                  <input onChange={this.toggleCheckbox} checked={formSignup.generateMock} type="checkbox" /> 
                  <span>Generate Mock Data</span>
                </label>
                <SubmitButton 
                  onClick={this.handleSignup} 
                  message="Sign up" 
                  formSubmitting={formSubmitting}
                  submittingMessage="Signing up"
                />
              </form>
            </div>
            <div className="secondary">
              <div className="sign-in__header">
                <i className="fas fa-sign-in-alt signinIcon"></i>
                <b>Sign in</b>
              </div>
              <button type="submit" onClick={this.toggleCard} className="sign-in__button"><b>Sign in</b></button>
            </div>
          </div>
        </div>      
      );
    }
  }
}


export default SignIn;
