import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import OutsideClickHandler from 'react-outside-click-handler';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { getInbox, selectAll, selectNone, selectAllUnread, selectSingle } from '../modules/inbox-module';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from '../components/Checkbox';
import NoMessages from '../components/NoMessages';
import '../assets/css/messages-panel.css';

class Inbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSelected: false
    };
  }

  async componentDidMount() {
    this.props.getInbox({ page: 1 });
  }
  
  componentWillUnmount() {
    this.props.selectNone();
  }
  
  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownSelected: !prevState.dropdownSelected
    }));
  }

  handleOutsideClickForDropdown = () => {
    const { dropdownSelected } = this.state;
    if (dropdownSelected) {
      this.toggleDropdown();
    }
  }
  
  selectAll = () => {
    const { loading } = this.props.inbox;
    if (loading) {
      return;
    }
    this.props.selectAll();
    this.toggleDropdown();
  }
  
  selectNone = () => {
    const { loading } = this.props.inbox;
    if (loading) {
      return;
    }
    this.props.selectNone();
    this.toggleDropdown();
  }
  
  selectAllUnread = () => {
    const { loading } = this.props.inbox;
    if (loading) {
      return;
    }
    this.props.selectAllUnread();
    this.toggleDropdown();
  }
  
  selectSingle = (panelId, isSelected) => {
    const { loading } = this.props.inbox;
    if (loading) {
      return;
    }
    this.props.selectSingle(panelId, isSelected);
  }
  
  handleTrashAction = () => {
    const { loading } = this.props.inbox;
    if (loading) {
      return;
    }
  }
  
  onNextPage = async () => {
    const { page }  = this.props.inbox;
    const nextPage = page + 1;
    this.props.getInbox({ page: nextPage });
  }
  
  onPreviousPage = async () => {
    const { page }  = this.props.inbox;
    const prevPage = page - 1;
    this.props.getInbox({ page: prevPage }); 
  }
  
  render() {
    const { dropdownSelected } = this.state;
    const { inboxMessages, loading, page, totalResults } = this.props.inbox;
    
    return (
      <div className="inbox messages-panel">
        <div className="control">
          <div className="multiselect">
            <OutsideClickHandler
              onOutsideClick={this.handleOutsideClickForDropdown}
            >
              <div className="dropdown">
                <button onClick={this.toggleDropdown}>
                  <i className="fas fa-angle-down" />
                </button>
                <ul className={`options ${dropdownSelected ? 'show' : ''}`}>
                  <li onClick={() => this.selectAll()}>All</li>
                  <li onClick={() => this.selectAllUnread()}>Unread</li>
                  <li onClick={() => this.selectNone()}>None</li>
                </ul>
              </div>
            </OutsideClickHandler>
          </div>
          <button className="trash" onClick={this.handleTrashAction}>
            <i className="fas fa-trash-alt" />
          </button>
          <div className="divider" />
          <Pagination onNextPage={this.onNextPage} onPreviousPage={this.onPreviousPage} page={page} totalResults={totalResults} loading={loading} />
        </div>
        {this.displayInboxMessages(inboxMessages, loading, "You have no messages")}
      </div>
    );
  }
  
  displayInboxMessages(inboxMessages, loading, notice) {
    if (loading) {
      return (
        <div className="messages">
          <Loader />
        </div>
      );
    }
    if (inboxMessages.length >= 1) {
      return (
        <div className="messages">
          <React.Fragment>
            {
              inboxMessages.map(message => {
                const e = new Date(message.created_at);
                const timeSent = e.toLocaleTimeString();
                return (
                  <div key={message.panel_id} className="message">
                    <div className="checkbox">
                      <Checkbox checked={message.selected} panelId={message.panel_id} selectSingle={this.selectSingle} />
                    </div>
                    <div className="view">
                      <Link 
                        to="/message/testId" 
                        style={{ color: message.viewed ? 'rgb(163, 163, 163)' : 'rgb(25, 127, 37)' }}>
                          <i className="fas fa-eye viewIcon"></i>
                      </Link>
                    </div>
                    <div className={`username flex-auto ${!message.viewed ? "bold-view" : ""}`}>
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
        </div>
      );
    } else {
      return (
        <div className="messages">
          <NoMessages notice={notice} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  inbox: state.inboxReducer
}); 

const mapDispatchToProps = dispatch => bindActionCreators({
  getInbox,
  selectAll,
  selectNone,
  selectAllUnread,
  selectSingle
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
