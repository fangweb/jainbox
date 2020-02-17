import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal, closeModal } from '../pkg/modal';
import { ServiceContainer } from '../services';
import { reset } from '../modules/application-module';
import { wsDisconnect } from '../modules/ws-module';
import '../assets/css/header.css';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      closeModal,
      reset,
      wsDisconnect
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(
  class extends Component {
    onConfirmModal = confirm => {
      this.props.closeModal();
      if (confirm) {
        const auth = ServiceContainer.auth();
        auth.signOut();
        this.props.wsDisconnect();
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
      const { username } = ServiceContainer.auth().getAuth();
      return (
        <header>
          <ul className="menu profile">
            <li>
              <i className="fas fa-id-card" />
              <span>{username}</span>
            </li>
          </ul>
          <ul className="menu">
            <li>
              <Link to="/testarea">
                <i className="fas fa-vial" />
                <span>Test Area</span>
              </Link>
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
