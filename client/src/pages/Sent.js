import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSent } from '../modules/sent-module';
import NoMessages from '../components/NoMessages';

import '../assets/css/messages-panel.css';

class Sent extends Component {

  async componentDidMount() {
    await this.props.getSent();
  }
  

  render() {
    const { sentMessages } = this.props.sent;
    return (
      <div className="sent-messages messages-panel">
        <div className="control">
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
          {this.displaySentMessages(sentMessages, "You have no messages")}
        </div>
      </div>
    );
  }

  displaySentMessages(sentMessages, notice) {
    if (sentMessages.length >= 1) {
      return (
        <React.Fragment>
          {
            sentMessages.map(message => {
              const e = new Date(message.created_at);
              const timeSent = e.toLocaleTimeString();
              return (
                <div key={message.panel_id} className="message">
                  <div className={`sender flex-auto`}>
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
  sent: state.sentReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSent
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sent);
