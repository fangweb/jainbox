import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PathConfig } from '../config';
import { ServiceContainer } from '../services';
import { updateAuthenticated } from '../modules/application-module';
import '../assets/css/sign-in.css';

const getNewInitialState = () => {
  return {
    loadingPage: true,
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
};

const SubmitButton = ({ message, formSubmitting, submittingMessage }) => {
  if (formSubmitting) {
    return (
      <button type="submit" disabled className="sign-in__button disabled">
        <i style={{ marginRight: '1em' }} className="fas fa-spinner fa-spin" />
        <b>{submittingMessage}</b>
      </button>
    );
  }
  return (
    <button type="submit" className="sign-in__button">
      <b>{message}</b>
    </button>
  );
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...getNewInitialState()
    };

    this.auth = ServiceContainer.auth();
  }

  componentDidMount() {
    const { application } = this.props;
    this.props.updateAuthenticated(this.auth.isAuthenticated());
    this.setState({ loadingPage: false });
  }

  toggleCard = e => {
    e.preventDefault();
    this.setState(prevState => ({
      ...getNewInitialState(),
      loadingPage: false,
      displaySignup: !prevState.displaySignup
    }));
  };

  setForm = (formType, e) => {
    const { target } = e;
    this.setState(prevState => ({
      [formType]: {
        ...prevState[formType],
        [target.name]: target.value
      }
    }));
  };

  toggleCheckbox = () => {
    this.setState(prevState => ({
      formSignup: {
        ...prevState.formSignup,
        generateMock: !prevState.formSignup.generateMock
      }
    }));
  };

  handleSignin = async e => {
    e.preventDefault();
    this.setState({ formSubmitting: true });
    try {
      await this.auth.signIn({ ...this.state.formSignin });
      this.props.updateAuthenticated(true);
    } catch (error) {
      console.error(error);
      this.setState({ formError: true, formSubmitting: false });
    }
  };

  handleSignup = async e => {
    e.preventDefault();
    this.setState({ formSubmitting: true });
    try {
      await this.auth.signUp({ ...this.state.formSignup });
      this.props.updateAuthenticated(true);
    } catch (error) {
      this.setState({ formError: true, formSubmitting: false });
    }
  };

  render() {
    const { application } = this.props;
    const {
      displaySignup,
      formSubmitting,
      formSignin,
      formSignup,
      formError,
      loadingPage
    } = this.state;

    if (loadingPage) {
      return <div className="sign-in" />;
    }

    if (application.isAuthenticated) {
      return <Redirect to={PathConfig.inboxPath} />;
    }

    if (!displaySignup) {
      return (
        <div className="sign-in">
          <div className="sign-in-card">
            <div className="main">
              <div className="sign-in__header">
                <i className="fas fa-sign-in-alt signinIcon" />
                <b>Sign In</b>
              </div>
              {formError && (
                <div className="form-errors">
                  <ul>
                    <li>Please check that all your fields are correct. </li>
                  </ul>
                </div>
              )}
              <form onSubmit={this.handleSignin}>
                <input
                  className={`${formError ? 'error' : ''}`}
                  onChange={e => this.setForm('formSignin', e)}
                  value={formSignin.username}
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <input
                  className={`${formError ? 'error' : ''}`}
                  onChange={e => this.setForm('formSignin', e)}
                  value={formSignin.password}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <SubmitButton
                  message="Sign in"
                  formSubmitting={formSubmitting}
                  submittingMessage="Signing in"
                />
              </form>
            </div>
            <div className="secondary">
              <div className="sign-in__header">
                <i className="fas fa-users signinIcon" />
                <b>Sign up as a new user</b>
              </div>
              <button
                type="submit"
                onClick={this.toggleCard}
                className="sign-in__button"
              >
                <b>Sign up</b>
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="sign-in">
        <div className="sign-in-card">
          <div className="main">
            <div className="sign-in__header">
              <i className="fas fa-users signinIcon" />
              <b>Sign up</b>
            </div>
            {formError && (
              <div className="form-errors">
                <ul>
                  <li>Please check that all your fields are correct. </li>
                </ul>
              </div>
            )}
            <form onSubmit={this.handleSignup}>
              <input
                className={`${formError ? 'error' : ''}`}
                onChange={e => this.setForm('formSignup', e)}
                value={formSignup.username}
                type="text"
                name="username"
                placeholder="Username"
              />
              <input
                className={`${formError ? 'error' : ''}`}
                onChange={e => this.setForm('formSignup', e)}
                value={formSignup.password}
                type="password"
                name="password"
                placeholder="Password"
              />
              <input
                className={`${formError ? 'error' : ''}`}
                onChange={e => this.setForm('formSignup', e)}
                value={formSignup.verify}
                type="password"
                name="verify"
                placeholder="Verify Password"
              />
              <div className="mock-ctrl">
                <input
                  onChange={this.toggleCheckbox}
                  checked={formSignup.generateMock}
                  type="checkbox"
                />
                <span>Generate Mock Data</span>
              </div>
              <SubmitButton
                message="Sign up"
                formSubmitting={formSubmitting}
                submittingMessage="Signing up"
              />
            </form>
          </div>
          <div className="secondary">
            <div className="sign-in__header">
              <i className="fas fa-sign-in-alt signinIcon" />
              <b>Sign in</b>
            </div>
            <button
              type="submit"
              onClick={this.toggleCard}
              className="sign-in__button"
            >
              <b>Sign in</b>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  application: state.applicationReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateAuthenticated
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
