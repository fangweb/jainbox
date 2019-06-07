import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPage } from '../helpers';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import {
  getTrash,
  selectAll,
  selectNone,
  selectSingle,
  reset,
  toggleError
} from '../modules/trash-module';
import Checkbox from '../components/Checkbox';
import PanelError from '../components/PanelError';
import NoMessages from '../components/NoMessages';

import '../assets/css/messages-panel.css';

class Trash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSelected: false
    };
  }

  componentDidMount() {
    try {
      const page = getPage(this.props.match.params.page);
      this.props.getTrash({ page });
    } catch (e) {
      this.props.toggleError();
    }
  }

  componentDidUpdate = async prevProps => {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      try {
        const currentPage = getPage(this.props.match.params.page);
        this.props.getTrash({ page: currentPage });
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
    const { loading } = this.props.trash;
    if (loading) {
      return;
    }
    this.props.selectAll();
    this.toggleDropdown();
  };

  selectNone = () => {
    const { loading } = this.props.trash;
    if (loading) {
      return;
    }
    this.props.selectNone();
    this.toggleDropdown();
  };

  selectSingle = (panelId, isSelected) => {
    const { loading } = this.props.trash;
    if (loading) {
      return;
    }
    this.props.selectSingle(panelId, isSelected);
  };

  /* TODO
  handleDeleteAction = () => {
    const { loading } = this.props.trash;
    if (loading) {
    }
  };
  */

  onNextPage = async () => {
    const { page } = this.props.sent;
    const nextPage = page + 1;
    this.props.history.push(`/trash/page/${nextPage}`);
  };

  onPreviousPage = async () => {
    const { page } = this.props.sent;
    const prevPage = page - 1;
    this.props.history.push(`/trash/page/${prevPage}`);
  };

  displayTrashMessages(trashMessages, loading, notice) {
    const { page } = this.props.trash;

    if (loading) {
      return (
        <div className="messages">
          <Loader />
        </div>
      );
    }
    if (trashMessages.length >= 1) {
      return (
        <div className="messages">
          <React.Fragment>
            {trashMessages.map(message => {
              const e = new Date(message.created_at);
              const timeSent = e.toLocaleTimeString();
              const messageLink = `/view-message/${message.message_id}`;
              const prevLink = `/sent/page/${page}`;
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
                  <div className="username flex-auto">{message.username}</div>
                  <div className="title flex-auto">{message.title}</div>
                  <div className="time-sent flex-auto">{timeSent}</div>
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
      trashMessages,
      loading,
      page,
      totalResults,
      error
    } = this.props.trash;

    if (error) {
      return <PanelError message="Page does not exist" />;
    }

    return (
      <div className="trash messages-panel">
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
                  <button onClick={this.selectAll} onKeyDown={this.selectAll}>
                    All
                  </button>
                  <button onClick={this.selectNone} onKeyDown={this.selectNone}>
                    None
                  </button>
                </ul>
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
        {this.displayTrashMessages(trashMessages, loading, 'You have no trash')}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trash: state.trashReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTrash,
      selectAll,
      selectNone,
      selectSingle,
      reset,
      toggleError
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash);
