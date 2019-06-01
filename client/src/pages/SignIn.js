import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { InboxPath } from '../const';
import '../assets/css/sign-in.css';

class SignIn extends Component {
  
  // pass props from render on route
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }
  
  constructor(props) {
    super(props);
    
    this.state = {
      displaySignup: false,
      signinForm: {
        username: '',
        password: ''
      },
      signupForm: {
        username: '',
        password: '',
        verify: '',
        generateMock: true
      }
    };
    
  }
  
  toggleCard = e => {
    e.preventDefault();
    this.setState(prevState => ({ displaySignup: !prevState.displaySignup }));
  }
  
  setForm = (formType, e) => {
    const target = e.target;
    const { name, value } = target;
    console.log(name, value);
    this.setState(prevState => ({ 
      [formType]:  {
        ...prevState[formType],
        [name]: value
      } 
    }));
  }
  
  toggleCheckbox = () => {
    this.setState( prevState => ({ 
      signupForm: {
        ...prevState['signupForm'],
        generateMock: !prevState['signupForm']['generateMock']
      }
    })); 
  }
  
  handleSignin = e => {
    e.preventDefault();
    console.log(this.state.signinForm);
  }

  handleSignup = e => {
    e.preventDefault();  
    console.log(this.state.signupForm);
  }
  
  render() {
    const { isAuthenticated } = this.props;
    const { displaySignup, signinForm, signupForm } = this.state;
    
    if (isAuthenticated) {
      return <Redirect to={`${InboxPath}/page/1`} />;
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
              <form onSubmit={this.handleSignin}>
                <input onChange={e => this.setForm('signinForm', e)} value={signinForm.username} type="text" name="username" placeholder="Username" />
                <input onChange={e => this.setForm('signinForm', e)} value={signinForm.password} type="password" name="password" placeholder="Password" />
                <button type="submit" className="sign-in__button"><b>Sign in</b></button>
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
              <form onSubmit={this.handleSignup}>
                <input onChange={e => this.setForm('signupForm', e)} value={signupForm.username}  type="text" name="username" placeholder="Username" />
                <input onChange={e => this.setForm('signupForm', e)} value={signupForm.password}  type="password" name="password" placeholder="Password" />
                <input onChange={e => this.setForm('signupForm', e)} value={signupForm.verify}  type="password" name="verify" placeholder="Verify Password" />
                <label className="mock-ctrl">
                  <input onChange={this.toggleCheckbox} checked={signupForm.generateMock} type="checkbox" /> 
                  <span>Generate Mock Data</span>
                </label>
                <button type="submit" className="sign-in__button"><b>Sign up</b></button>
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
