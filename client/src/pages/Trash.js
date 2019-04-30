import React, { Component } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
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
    await this.props.getTrash();
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
    this.props.selectAll();
    this.toggleDropdown();
  }
  
  selectNone = () => {
    this.props.selectNone();
    this.toggleDropdown();
  }
  
  selectSingle = (panelId, isSelected) => {
    this.props.selectSingle(panelId, isSelected);
  }

  render() {
    const { dropdownSelected } = this.state;
    const { trashMessages } = this.props.trash;
    
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
          {this.displayTrashMessages(trashMessages, "You have no messages")}
        </div>
      </div>
    );
  }
  
  displayTrashMessages(trashMessages, notice) {
    if (trashMessages.length >= 1) {
      return (
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
      );
    } else {
      return (
        <NoMessages notice={notice} />
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
