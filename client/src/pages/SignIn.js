import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InboxPath } from '../const';
import { ServiceContainer } from '../services';
import { updateAuthenticated } from '../modules/application-module';
import '../assets/css/sign-in.css';

const getNewInitialState = () => {
  return {
    displaySignup: false,
    formSubmitting: false,
    formError: false,
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

const SubmitButton = ({ message, formSubmitting, submittingMessage }) => {
  if (formSubmitting) {
    return (
      <button type="submit" disabled className="sign-in__button disabled">
        <i style={{ marginRight: '1em' }} className="fas fa-spinner fa-spin"></i>
        <b>{submittingMessage}</b>
      </button>
    );
  }
  return (
    <button type="submit" className="sign-in__button"><b>{message}</b></button>
  );
};

class SignIn extends Component {
  
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
    const { updateAuthenticated } = this.props;
    e.preventDefault();
    this.setState({ formSubmitting: true });
    try {
      await this.auth.signIn({ ...this.state.formSignin });
      updateAuthenticated(true);
    }
    catch (e) {
      console.log(e);
      this.setState({ formError: true, formSubmitting: false });
    }
  }

  handleSignup = async (e) => {
    const { updateAuthenticated } = this.props;
    e.preventDefault();  
    this.setState({ formSubmitting: true });
    try {
      await this.auth.signUp({ ...this.state.formSignup });
      updateAuthenticated(true);     
    }
    catch (e) {
      this.setState({ formError: true, formSubmitting: false });
    }    
  }
  
  render() {
    const { application } = this.props;
    const { displaySignup, formSubmitting, formSignin, formSignup, formError } = this.state;
    
    if (application.isAuthenticated) {
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

const mapStateToProps = (state) => ({
  application: state.applicationReducer
}); 

const mapDispatchToProps = dispatch => bindActionCreators({
  updateAuthenticated
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
