import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal, closeModal } from '../pkg/modal';
import { ServiceContainer } from '../services';
import { reset } from '../modules/application-module';
import '../assets/css/header.css';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      closeModal,
      reset
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(
  class extends Component {
    constructor(props) {
      super(props);

      const serviceContainer = new ServiceContainer();
      this.auth = serviceContainer.auth();
      this.ws = serviceContainer.ws();
    }

    onConfirmModal = confirm => {
      this.props.closeModal();
      if (confirm) {
        console.log(confirm);
        this.auth.signOut();
        this.ws.disconnect();
        this.props.reset();
      }
    };

    openLogoutModal = () => {
      this.props.openModal('CONFIRMATION_MODAL', {
        title: 'Proceed to logout?',
        onConfirm: this.onConfirmModal
      });
    };

    render() {
      return (
        <header>
          <ul className="menu">
            <li>
              <Link to="/testarea">
                <i className="fas fa-vial" />
                <span>Test Area</span>
              </Link>
            </li>
            <li>
              <a href="/placeholder">
                <i className="fas fa-door-closed" />
                <span>Deactivate</span>
              </a>
            </li>
            <li>
              <button onClick={this.openLogoutModal}>
                <i className="fas fa-power-off" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </header>
      );
    }
  }
);
