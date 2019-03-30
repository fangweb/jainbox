import React, { Component } from 'react';

import '../assets/css/compose.css';

const dropDown = () => {
  return <input placeholder="To" type="text" className="to" />;
};

class Compose extends Component {
  /* TODO:
  constructor(props) {
    super(props);
    this.state = {
      sending: false
    };
  }
  */

  onSend = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="compose">
        <form onSubmit={this.onSend}>
          {dropDown()}
          <textarea placeholder="Message" className="message" />
          <button type="submit" className="send">
            <i className="fas fa-share-square" />
            <span>Send</span>
          </button>
        </form>
      </div>
    );
  }
}

export default Compose;
