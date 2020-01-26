import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPage } from '../helpers';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import {
  getSent,
  selectAll,
  selectNone,
  selectSingle,
  reset,
  toggleError
} from '../modules/sent-module';
import Checkbox from '../components/Checkbox';
import PanelError from '../components/PanelError';
import NoMessages from '../components/NoMessages';
import '../assets/css/messages-panel.css';

class Sent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSelected: false
    };
  }

  componentDidMount() {
    try {
      const page = getPage(this.props.match.params.page);
      this.props.getSent({ page });
    } catch (e) {
      this.props.toggleError();
    }
  }

  componentDidUpdate = async prevProps => {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      try {
        const currentPage = getPage(this.props.match.params.page);
        this.props.getSent({ page: currentPage });
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
    const { loading } = this.props.sent;
    if (loading) {
      return;
    }
    this.props.selectAll();
    this.toggleDropdown();
  };

  selectNone = () => {
    const { loading } = this.props.sent;
    if (loading) {
      return;
    }
    this.props.selectNone();
    this.toggleDropdown();
  };

  selectSingle = (panelId, isSelected) => {
    const { loading } = this.props.sent;
    if (loading) {
      return;
    }
    this.props.selectSingle(panelId, isSelected);
  };

  /* TODO:
  handleTrashAction = () => {
    const { loading } = this.props.sent;
    if (loading) {
    }
  };
  */

  onNextPage = async () => {
    const { page } = this.props.sent;
    const nextPage = page + 1;
    this.props.push(`/sent/page/${nextPage}`);
  };

  onPreviousPage = async () => {
    const { page } = this.props.sent;
    const prevPage = page - 1;
    this.props.push(`/sent/page/${prevPage}`);
  };

  onNavigateToMessage = messageLink => {
    this.props.push(messageLink);
  };

  displaySentMessages(sentMessages, loading, notice) {
    const { page } = this.props.sent;

    if (loading) {
      return (
        <div className="messages">
          <Loader />
        </div>
      );
    }
    if (sentMessages.length >= 1) {
      return (
        <div className="messages">
          <React.Fragment>
            {sentMessages.map(message => {
              const event = new Date(message.created_at);
              const timeSent = event.toLocaleString();
              const messageLink = `/view-message/${message.message_id}`;
              return (
                <div key={message.panel_id} className="message">
                  <div className="checkbox">
                    <Checkbox
                      checked={message.selected}
                      panelId={message.panel_id}
                      selectSingle={this.selectSingle}
                    />
                  </div>
                  <div
                    role="button"
                    tabIndex="0"
                    className="messages-right-section"
                    onClick={() => this.onNavigateToMessage(messageLink)}
                    onKeyDown={() => this.onNavigateToMessage(messageLink)}
                  >
                    <div className="view">
                      <i className="fas fa-eye viewIcon" />
                    </div>
                    <div className="username flex-auto">{message.to}</div>
                    <div className="title flex-auto">{message.title}</div>
                    <div className="time-sent flex-auto">{timeSent}</div>
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
      sentMessages,
      loading,
      page,
      totalResults,
      error
    } = this.props.sent;

    if (error) {
      return <PanelError message="Page does not exist" />;
    }

    return (
      <div className="sent messages-panel">
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
                  <button onClick={this.selectNone} onKeyDown={this.selectNone}>
                    None
                  </button>
                </div>
              </div>
            </OutsideClickHandler>
          </div>
          <button className="trash">
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
        {this.displaySentMessages(
          sentMessages,
          loading,
          'You have no messages'
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sent: state.sentReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSent,
      selectAll,
      selectNone,
      selectSingle,
      reset,
      toggleError,
      push
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sent);
