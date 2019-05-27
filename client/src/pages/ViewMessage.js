import React, { Component } from 'react';
import { InboxPath } from '../const';
import { Link } from 'react-router-dom';
import { ServiceContainer } from '../services';
import { wait } from '../helpers';
import PanelError from '../components/PanelError';
import PropTypes from 'prop-types';

import Loader from '../components/Loader';

import '../assets/css/view-message.css';

class ViewMessage extends Component {
  
  static propTypes = {
    prevlink: PropTypes.string
  }
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: null,
      error: false
    };
  }
  
  async componentDidMount() {
    const api = new ServiceContainer().api();
    const { messageId } = this.props.match.params; 
    await wait(300); 
    let apiResult;
    try {
      apiResult = await api.getMessage({ messageId: messageId });
      this.setState({ message: { ...apiResult }, loading: false });
    } catch (e) {
      this.setState({ error: true, loading: false });
    }
  }
    
  render() {
    const { loading, message, error } = this.state;
    let prevLink;
    if (this.props.location.state) {
      prevLink = this.props.location.state.prevLink;
    } else {
      prevLink = InboxPath
    }
    
    if (error) {
      return (
        <div className="view-message">
          <PanelError message="There was an error" />
        </div>
      );
    }
    
    if (loading) {
      return (
        <div className="view-message">
          <Loader />
        </div>
      );
    }
    
    return (
      <div className="view-message">
        <div className="top-bar">
          <div className="handler message-segment">
            {message.username}
          </div>
          <div className="right">
            <div className="view-message-time message-segment">
              4:36 PM
            </div>
            <div className="go-back message-segment">
              <Link to={prevLink}>
                <i className="fas fa-backward backwardsIcon"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="title message-segment">
          {message.title}
        </div>
        <div className="content message-segment">
          <pre>
            {message.message_text}
          </pre>
        </div>
      </div>
    );
  }
}

export default ViewMessage;
