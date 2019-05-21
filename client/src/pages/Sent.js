import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { getSent, selectAll, selectNone, selectSingle, reset, toggleError } from '../modules/sent-module';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from '../components/Checkbox';
import PanelError from '../components/PanelError';
import NoMessages from '../components/NoMessages';
import '../assets/css/messages-panel.css';

class Sent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dropdownSelected: false,
    };
  }

  componentDidMount() {
    const { page } = this.props.match.params;
    const _page = Number(page);  
    if (isNaN(_page)) {
      this.props.toggleError();
    } 
    else {
      this.props.getSent({ page: _page });
    }
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.props.getSent({ page: Number(this.props.match.params.page) });
    }
  }

  componentWillUnmount() {
    this.props.reset();
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
    const { loading } = this.props.sent;
    if (loading) {
      return;
    }
    this.props.selectAll();
    this.toggleDropdown();
  }
  
  selectNone = () => {
    const { loading } = this.props.sent;
    if (loading) {
      return;
    }
    this.props.selectNone();
    this.toggleDropdown();
  }
  
  selectSingle = (panelId, isSelected) => {
    const { loading } = this.props.sent;
    if (loading) {
      return;
    }
    this.props.selectSingle(panelId, isSelected);
  }

  handleTrashAction = () => {
    const { loading } = this.props.sent;
    if (loading) {
      return;
    }
  }

  onNextPage = async () => {
    const { page }  = this.props.sent;
    const nextPage = page + 1;
    this.props.history.push(`/sent/page/${nextPage}`);
  }
  
  onPreviousPage = async () => {
    const { page }  = this.props.sent;
    const prevPage = page - 1;
    this.props.history.push(`/sent/page/${prevPage}`);
  }
  
  render() {
    const { dropdownSelected } = this.state;
    const { sentMessages, loading, page, totalResults, error } = this.props.sent;

    if (error) {
      return (
        <PanelError message="Page does not exist" />
      );
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
                <ul className={`options ${dropdownSelected ? 'show' : ''}`}>
                  <li onClick={() => this.selectAll()}>All</li>
                  <li onClick={() => this.selectNone()}>None</li>
                </ul>
              </div>
            </OutsideClickHandler>
          </div>
          <button className="trash">
            <i className="fas fa-trash-alt" />
          </button>
          <div className="divider" />
          <Pagination onNextPage={this.onNextPage} onPreviousPage={this.onPreviousPage} page={page} totalResults={totalResults} loading={loading} />
        </div>
        {this.displaySentMessages(sentMessages, loading, "You have no messages")}
      </div>
    );
  }

  displaySentMessages(sentMessages, loading, notice) {
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
            {
              sentMessages.map(message => {
                const e = new Date(message.created_at);
                const timeSent = e.toLocaleTimeString();
                return (
                  <div key={message.panel_id} className="message">
                    <div className="checkbox">
                      <Checkbox checked={message.selected} panelId={message.panel_id} selectSingle={this.selectSingle} />
                    </div>
                    <div className={`username flex-auto`}>
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
      toggleError
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sent);
