import React, { Component } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testAction } from '../modules/inbox';

import '../assets/css/messages-panel.css';

class Sent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSelected: false
    };
  }

  componentDidMount() {
    this.props.testAction();
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownSelected: !prevState.dropdownSelected
    }));
  };

  /** TODO
  onDropdownSelect = (value) => {
    // switch, no need to store state value of selected option 
  }
  */

  onHandleOutsideClickForDropdown = () => {
    const { dropdownSelected } = this.state;
    if (dropdownSelected) {
      this.toggleDropdown();
    }
  };

  render() {
    const { dropdownSelected } = this.state;
    return (
      <div className="sent-messages messages-panel">
        <div className="control">
          <div className="multiselect">
            <input type="checkbox" />
            <OutsideClickHandler
              onOutsideClick={this.onHandleOutsideClickForDropdown}
            >
              <div className="dropdown">
                <button onClick={this.onToggleDropdown}>
                  <i className="fas fa-angle-down" />
                </button>
                <ul className={`options ${dropdownSelected ? 'show' : ''}`}>
                  <li>All</li>
                  <li>None</li>
                </ul>
              </div>
            </OutsideClickHandler>
          </div>
          <button className="trash">
            <i className="fas fa-trash-alt" />
          </button>
          <div className="divider" />
          <div className="pagination">
            <span>Displaying 1-10 of 57</span>
            <button className="prev-page">
              <i className="fas fa-angle-left" />
            </button>
            <button className="next-page">
              <i className="fas fa-angle-right" />
            </button>
          </div>
        </div>
        <div className="messages">
          <div className="message">
            <div className="checkbox">
              <input type="checkbox" />
            </div>
            <div className="sender flex-auto">
              <b>Test name 123456</b>
            </div>
            <div className="title flex-auto">
              <b>Welcome to the group</b>
            </div>
            <div className="time-sent flex-auto">
              <b>6:30 AM</b>
            </div>
          </div>
          <div className="message">
            <div className="checkbox">
              <input type="checkbox" />
            </div>
            <div className="sender flex-auto">Test name 123456</div>
            <div className="title flex-auto">Welcome to the group</div>
            <div className="time-sent flex-auto">6:30 AM</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      testAction
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Sent);
