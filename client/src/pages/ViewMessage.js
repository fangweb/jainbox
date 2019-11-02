import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PathConfig } from '../config';
import { ServiceContainer } from '../services';
import { wait } from '../helpers';
import PanelError from '../components/PanelError';

import Loader from '../components/Loader';

import '../assets/css/view-message.css';

class ViewMessage extends Component {
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
      apiResult = await api.getMessage({ messageId });
      this.setState({ message: { ...apiResult }, loading: false });
    } catch (e) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { loading, message, error } = this.state;

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
          <div className="handler message-segment">{message.username}</div>
          <div className="right">
            <div className="view-message-time message-segment">4:36 PM</div>
            <div className="go-back message-segment">
              <Link
                to={this.props.location.state.prevLink || PathConfig.inboxPath}
              >
                <i className="fas fa-backward backwardsIcon" />
              </Link>
            </div>
          </div>
        </div>
        <div className="title message-segment">{message.title}</div>
        <div className="content message-segment">
          <pre>{message.message_text}</pre>
        </div>
      </div>
    );
  }
}

export default ViewMessage;
