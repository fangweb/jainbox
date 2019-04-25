import React, { Component } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testAction } from '../modules/inbox';
import { ServiceContainer } from '../services';
import NoMessages from '../components/NoMessages';

import '../assets/css/messages-panel.css';

class Sent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSelected: false,
      sentMessages: []
    };
  }

  async componentDidMount() {
    const api = new ServiceContainer().api();
    const sentMessages = await api.getSent();
    this.setState({ sentMessages });
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
    const { dropdownSelected, sentMessages } = this.state;
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
          {this.displaySentMessages(sentMessages, "You have no messages")}
        </div>
      </div>
    );
  }

  displaySentMessages(sentMessages, notice) {
    if (sentMessages.length >= 1) {
      return (
        <React.Fragment>
          {
            sentMessages.map(message => {
              const e = new Date(message.created_at);
              const timeSent = e.toLocaleTimeString();
              return (
                <div key={message.panel_id} className="message">
                  <div className="checkbox">
                    <input type="checkbox" />
                  </div>
                  <div className={`sender flex-auto`}>
                    {message.username}
                  </div>
                  <div className={`title flex-auto`}>
                    {message.title}
                  </div>
                  <div className={`time-sent flex-auto`}>
                    {timeSent}
                  </div>
                </div>  
              );
            })
          }
        </React.Fragment>
      );
    } else {
      return (
        <NoMessages notice={notice} />
      );
    }
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
