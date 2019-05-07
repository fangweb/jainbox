import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './test-area.module.css';
import { activateToast } from '../../toast';
import { Dropdown } from '../../dropdown';

const dropdownData = [{
  id: 1,
  username: 'testUserA'
}, {
  id: 2,
  username: 'testingForB'
}, {
  id: 3,
  username: 'tester3forOne'
}];

class TestAreaC extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      dropdownTitle: null
    };
  }

  handleMessage = (event) => {
    this.setState({ message: event.target.value });
  }
  
  activateToast = () => {
    this.props.activateToast("SUCCESS_TOAST", { message: this.state.message });
  }
  
  setDropdownTitle = (dropdownTitle) => {
    if (this.state.dropdownTitle !== dropdownTitle) {
      this.setState({ dropdownTitle });
    }      
  }
  
  getDropdownTitle = () => {
    const { dropdownTitle } = this.state;
    if (dropdownTitle === null) {
      return "Select a user";
    } else {
      return dropdownTitle;
    }
  }
  
  render() {
    return (
      <div className={styles.testArea}>
        <section className={styles.section}>
          <input type="text" value={this.state.message} onChange={this.handleMessage} />
          <button className={styles.toastButton} onClick={this.activateToast}>
            Activate Toast
          </button>
        </section>
        <section className={styles.section}>
          <Dropdown title={this.getDropdownTitle()} data={dropdownData} onSelectItem={(value) => this.setDropdownTitle(value.username)} />
        </section>
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
