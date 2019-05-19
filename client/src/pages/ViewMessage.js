import React, { Component } from 'react';

import '../assets/css/view-message.css';

class ViewMessage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: {
        id: null,
        title: null,
        handler: null,
        content: null
      }
    };
  }
  
  componentDidMount() {
  
  }
  
  // Redux not required, just pull directly from api
    
  render() {
    return (
      <div className="view-message">
        <div className="top-bar">
          <div className="handler message-segment">
            TestUserA
          </div>
          <div className="right">
            <div className="view-message-time message-segment">
              4:36 PM
            </div>
            <div className="go-back message-segment">
              <i className="fas fa-backward backwardsIcon"></i>
            </div>
          </div>
        </div>
        <div className="title message-segment">
          TItle
        </div>
        <div className="content message-segment">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially 
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
           recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </div>
    );
  }
}

export default ViewMessage;
