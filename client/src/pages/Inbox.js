import React, { Component } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { openModal } from '../pkg/modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ServiceContainer } from '../services';
import NoMessages from '../components/NoMessages';
import '../assets/css/messages-panel.css';

class Inbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSelected: false,
      inboxMessages: []
    };
  }
  
  async componentDidMount() {
    const api = new ServiceContainer().api();
    const inboxMessages = await api.getInbox();
    this.setState({ inboxMessages });
  }
  
  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownSelected: !prevState.dropdownSelected
    }));
  };

  /* TODO:
  onDropdownSelect = (value) => {
    // switch, no need to store state value of selected option 
  }
  */

  handleOutsideClickForDropdown = () => {
    const { dropdownSelected } = this.state;
    if (dropdownSelected) {
      this.toggleDropdown();
    }
  };
  
  handleTrash = () => {
    this.props.openModal('CONFIRMATION_MODAL', { title: 'test title' });
  };
  
  render() {
    const { dropdownSelected, inboxMessages } = this.state;

    return (
      <div className="inbox messages-panel">
        <div className="control">
          <div className="multiselect">
            <input type="checkbox" />
            <OutsideClickHandler
              onOutsideClick={this.handleOutsideClickForDropdown}
            >
              <div className="dropdown">
                <button onClick={this.toggleDropdown}>
                  <i className="fas fa-angle-down" />
                </button>
                <ul className={`options ${dropdownSelected ? 'show' : ''}`}>
                  <li>All</li>
                  <li>Unread</li>
                  <li>None</li>
                </ul>
              </div>
            </OutsideClickHandler>
          </div>
          <button className="trash" onClick={this.handleTrash}>
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
          {this.displayInboxMessages(inboxMessages, "You have no messages")}
        </div>
      </div>
    );
  }
  
  displayInboxMessages(inboxMessages, notice) {
    if (inboxMessages.length >= 1) {
      return (
        <React.Fragment>
          {
            inboxMessages.map(message => {
              const e = new Date(message.created_at);
              const timeSent = e.toLocaleTimeString();
              return (
                <div key={message.panel_id} className="message">
                  <div className="checkbox">
                    <input type="checkbox" />
                  </div>
                  <div className={`sender flex-auto ${!message.viewed ? "bold-view" : ""}`}>
                    {message.username}
                  </div>
                  <div className={`title flex-auto ${!message.viewed ? "bold-view" : ""}`}>
                    {message.title}
                  </div>
                  <div className={`time-sent flex-auto ${!message.viewed ? "bold-view" : ""}`}>
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

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal
}, dispatch);

export default connect(null, mapDispatchToProps)(Inbox);
