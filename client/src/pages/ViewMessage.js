import React, { Component } from 'react';
import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    this.auth = ServiceContainer.auth();
  }

  async componentDidMount() {
    const api = ServiceContainer.api();
    const { messageId } = this.props.match.params;
    await wait(300);
    try {
      const response = await api.viewMessage({ messageId });
      const body = await response.json();
      const event = new Date(body.created_at);
      const time = event.toLocaleTimeString();
      const date = event.toLocaleDateString();

      this.setState({ message: { ...body, time, date }, loading: false });
    } catch (e) {
      console.error(e);
      this.setState({ error: true, loading: false });
    }
  }

  onNavigateBack = () => {
    this.props.goBack();
  };

  renderUsernameSegment = (createdBy, receiver) => {
    if (this.auth.getAuth().username === receiver) {
      return <div className="username message-segment">From: {createdBy}</div>;
    }
    return <div className="username message-segment">To: {receiver}</div>;
  };

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
          {this.renderUsernameSegment(message.created_by, message.receiver)}
          <div className="right-control">
            <div className="time message-segment">{message.time}</div>
            <div className="date message-segment">{message.date}</div>
            <div
              role="button"
              tabIndex="0"
              onClick={this.onNavigateBack}
              onKeyDown={this.onNavigateBack}
              className="back-btn message-segment"
            >
              <i className="fas fa-backward backwardsIcon" />
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goBack
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(ViewMessage);
