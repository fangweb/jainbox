import React, { Component } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { getTrash, selectAll, selectNone, selectSingle } from '../modules/trash-module';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from '../components/Checkbox';
import NoMessages from '../components/NoMessages';

import '../assets/css/messages-panel.css';

class Trash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSelected: false,
    };
  }

  async componentDidMount() {
    this.props.getTrash({ page: 1 });
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
    const { loading } = this.props.trash;
    if (loading) {
      return;
    }
    this.props.selectAll();
    this.toggleDropdown();
  }
  
  selectNone = () => {
    const { loading } = this.props.trash;
    if (loading) {
      return;
    }
    this.props.selectNone();
    this.toggleDropdown();
  }
  
  selectSingle = (panelId, isSelected) => {
    const { loading } = this.props.trash;
    if (loading) {
      return;
    }
    this.props.selectSingle(panelId, isSelected);
  }

  handleDeleteAction = () => {
    const { loading } = this.props.trash;
    if (loading) {
      return;
    }
  }

  onNextPage = async () => {
    const { page }  = this.props.trash;
    const nextPage = page + 1;
    this.props.getInbox({ page: nextPage });
  }
  
  onPreviousPage = async () => {
    const { page }  = this.props.trash;
    const prevPage = page - 1;
    this.props.getInbox({ page: prevPage }); 
  }

  render() {
    const { dropdownSelected } = this.state;
    const { trashMessages, loading, page, totalResults } = this.props.trash;
    
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
        {this.displayTrashMessages(trashMessages, loading, "You have no trash")}
      </div>
    );
  }
  
  displayTrashMessages(trashMessages, loading, notice) {
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
            {
              trashMessages.map(message => {
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
  trash: state.trashReducer
}); 

const mapDispatchToProps = dispatch => bindActionCreators({
  getTrash,
  selectAll,
  selectNone,
  selectSingle
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Trash);
