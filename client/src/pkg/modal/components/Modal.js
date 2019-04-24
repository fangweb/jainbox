import React from 'react';
import { Overlay } from './Overlay';
import { modalComponents } from '../modal-module';
import { connect } from 'react-redux';

class ModalC extends React.Component {

  render() {
    if (!this.props.modal) {
      return null;
    }
    
    const { modalKind, modalProps } = this.props.modal;
    const ComponentKind = modalComponents[modalKind];
    if (!ComponentKind) {
      return null;
    }

    return (
      <React.Fragment>
        <Overlay />
        <ComponentKind {...modalProps} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  modal: state.modalReducer
}); 

export const Modal = connect(mapStateToProps)(ModalC);

