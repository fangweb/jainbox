import React from 'react';
import '../assets/css/no-messages.css';

function NoMessages({ notice }) {
  return (
    <div className="no-messages">
      <i className="meh-icon far fa-meh"></i>
      {notice}
    </div>
  );
}

export default NoMessages;
