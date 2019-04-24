import React from 'react';
import styles from './modal.module.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeModal } from '../modal-module';

class OverlayC extends React.Component {

  listenKeyboard = (event) => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.props.closeModal();
    }
  }

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

  onOverlayClick = () => {
    this.props.closeModal();
  }
  
  render() {
    return (
      <div className={styles.overlay} onClick={this.onOverlayClick}>
        {this.props.children}
      </div>
    );
  }
  
}

const mapStateToProps = (state) => ({
  modal: state.modal
}); 

const mapDispatchToProps = dispatch => bindActionCreators({
  closeModal
}, dispatch);

export const Overlay = connect(mapStateToProps, mapDispatchToProps)(OverlayC);





