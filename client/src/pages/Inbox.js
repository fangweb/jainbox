import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPage } from '../helpers';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import {
  getInbox,
  selectAll,
  selectNone,
  selectAllUnread,
  selectSingle,
  reset,
  toggleError
} from '../modules/inbox-module';
import Checkbox from '../components/Checkbox';
import PanelError from '../components/PanelError';
import NoMessages from '../components/NoMessages';
import '../assets/css/messages-panel.css';

class Inbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSelected: false
    };
  }

  componentDidMount() {
    try {
      const page = getPage(this.props.match.params.page);
      this.props.getInbox({ page });
    } catch (e) {
      this.props.toggleError();
    }
  }

  componentDidUpdate = async prevProps => {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      try {
        const currentPage = getPage(this.props.match.params.page);
        this.props.getInbox({ page: currentPage });
      } catch (e) {
        this.props.toggleError();
      }
    }
  };

  componentWillUnmount() {
    this.props.reset();
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownSelected: !prevState.dropdownSelected
    }));
  };

  handleOutsideClickForDropdown = () => {
    const { dropdownSelected } = this.state;
    if (dropdownSelected) {
      this.toggleDropdown();
    }
  };

  selectAll = () => {
    const { loading } = this.props.inbox;
    if (loading) {
      return;
    }
    this.props.selectAll();
    this.toggleDropdown();
  };

  selectNone = () => {
    const { loading } = this.props.inbox;
    if (loading) {
      return;
    }
    this.props.selectNone();
    this.toggleDropdown();
  };

  selectAllUnread = () => {
    const { loading } = this.props.inbox;
    if (loading) {
      return;
    }
    this.props.selectAllUnread();
    this.toggleDropdown();
  };

  selectSingle = (panelId, isSelected) => {
    const { loading } = this.props.inbox;
    if (loading) {
      return;
    }
    this.props.selectSingle(panelId, isSelected);
  };

  /* TODO:
  handleTrashAction = () => {
    const { loading } = this.props.inbox;
    if (loading) {
    }
  };
  */

  onNextPage = async () => {
    const { page } = this.props.inbox;
    const nextPage = page + 1;
    this.props.history.push(`/inbox/page/${nextPage}`);
  };

  onPreviousPage = async () => {
    const { page } = this.props.inbox;
    const prevPage = page - 1;
    this.props.history.push(`/inbox/page/${prevPage}`);
  };

  displayInboxMessages(inboxMessages, loading, notice) {
    const { page } = this.props.inbox;

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
            {inboxMessages.map(message => {
              const e = new Date(message.created_at);
              const timeSent = e.toLocaleTimeString();
              const messageLink = `/view-message/${message.message_id}`;
              const prevLink = `/inbox/page/${page}`;
              return (
                <div key={message.panel_id} className="message">
                  <div className="checkbox">
                    <Checkbox
                      checked={message.selected}
                      panelId={message.panel_id}
                      selectSingle={this.selectSingle}
                    />
                  </div>
                  <div className="view">
                    <Link
                      to={{
                        pathname: messageLink,
                        state: { prevLink }
                      }}
                      style={{
                        color: message.viewed
                          ? 'rgb(163, 163, 163)'
                          : 'rgb(25, 127, 37)'
                      }}
                    >
                      <i className="fas fa-eye viewIcon" />
                    </Link>
                  </div>
                  <div
                    className={`username flex-auto ${
                      !message.viewed ? 'bold-view' : ''
                    }`}
                  >
                    {message.from}
                  </div>
                  <div
                    className={`title flex-auto ${
                      !message.viewed ? 'bold-view' : ''
                    }`}
                  >
                    {message.title}
                  </div>
                  <div
                    className={`time-sent flex-auto ${
                      !message.viewed ? 'bold-view' : ''
                    }`}
                  >
                    {timeSent}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        </div>
      );
    }
    return (
      <div className="messages">
        <NoMessages notice={notice} />
      </div>
    );
  }

  render() {
    const { dropdownSelected } = this.state;
    const {
      inboxMessages,
      loading,
      page,
      totalResults,
      error
    } = this.props.inbox;

    if (error) {
      return <PanelError message="The inbox page does not exist" />;
    }

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
                <div className={`options ${dropdownSelected ? 'show' : ''}`}>
                  <button onClick={this.selectAll} onKeyDown={this.selectAll}>
                    All
                  </button>
                  <button
                    onClick={this.selectAllUnread}
                    onKeyDown={this.selectAllUnread}
                  >
                    Unread
                  </button>
                  <button onClick={this.selectNone} onKeyDown={this.selectNone}>
                    None
                  </button>
                </div>
              </div>
            </OutsideClickHandler>
          </div>
          <button className="trash" onClick={this.handleTrashAction}>
            <i className="fas fa-trash-alt" />
          </button>
          <div className="divider" />
          <Pagination
            onNextPage={this.onNextPage}
            onPreviousPage={this.onPreviousPage}
            page={page}
            totalResults={totalResults}
            loading={loading}
          />
        </div>
        {this.displayInboxMessages(
          inboxMessages,
          loading,
          'You have no messages'
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inbox: state.inboxReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getInbox,
      selectAll,
      selectNone,
      selectAllUnread,
      selectSingle,
      reset,
      toggleError
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox);
