import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './test-area.module.css';
import { activateToast } from '../../toast';


class TestAreaC extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  handleMessage = (event) => {
    this.setState({ message: event.target.value });
  }
  
  activateToast = () => {
    this.props.activateToast("SUCCESS_TOAST", { message: this.state.message });
  }
  
  render() {
    return (
      <div className={styles.testArea}>
        <div className={styles.toastArea}>
          <input type="text" value={this.state.message} onChange={this.handleMessage} />
          <button className={styles.toastButton} onClick={this.activateToast}>
            Activate Toast
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toast: state.toastReducer
}); 

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      activateToast
    },
    dispatch
  );

export const TestArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestAreaC);
