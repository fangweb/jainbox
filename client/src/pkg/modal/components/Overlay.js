import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './modal.module.css';
import { closeModal } from '../modal-module';

class OverlayC extends React.Component {
  componentDidMount() {
    if (this.props.closeModal) {
      window.addEventListener('keydown', this.listenKeyboard, true);
    }
  }

  componentWillUnmount() {
    if (this.props.closeModal) {
      window.removeEventListener('keydown', this.listenKeyboard, true);
    }
  }

  listenKeyboard = event => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.props.closeModal();
    }
  };

  onOverlayClick = () => {
    this.props.closeModal();
  };

  render() {
    return (
      <div
        className={styles.overlay}
        onClick={this.onOverlayClick}
        onKeyDown={this.onOverlayClick}
        role="presentation"
      />
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal
    },
    dispatch
  );

export const Overlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(OverlayC);
