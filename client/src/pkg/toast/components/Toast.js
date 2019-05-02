import React, { Component } from 'react';
import { toastComponents } from '../toast-module';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endToast } from '../toast-module';

class ToastC extends Component {
  render() {
  
    if (!this.props.toast) {
      return null;
    }
    
    const { toastKind, toastProps } = this.props.toast;
    const ComponentKind = toastComponents[toastKind];
    if (!ComponentKind) {
      return null;
    }
    
    return (
      <ComponentKind {...toastProps} toastHasFinished={this.props.endToast} />
    );
  }
}

const mapStateToProps = (state) => ({
  toast: state.toastReducer
}); 

const mapDispatchToProps = dispatch => bindActionCreators({
  endToast
}, dispatch);

export const Toast = connect(mapStateToProps, mapDispatchToProps)(ToastC);

