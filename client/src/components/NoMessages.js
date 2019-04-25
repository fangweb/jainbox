import React from 'react';
import '../assets/css/no-messages.css';

function NoMessages({ notice }) {
  return (
    <div className="no-messages">
      {notice}
    </div>
  );
}

export default NoMessages;
