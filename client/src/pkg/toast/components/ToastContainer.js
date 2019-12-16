import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endToast } from '../toast-module';
import Toast from './Toast';

class Container extends Component {
  render() {
    if (!this.props.toast) {
      return null;
    }

    return (
      <Toast
        toastType={this.props.toast.toastType}
        {...this.props.toast.toastProps}
        toastHasFinished={this.props.endToast}
      />
    );
  }
}

const mapStateToProps = state => ({
  toast: state.toastReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      endToast
    },
    dispatch
  );

export const ToastContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
