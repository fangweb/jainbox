import React from 'react';
import '../assets/css/not-found.css';

function NotFound() {
  return (
    <div className="not-found">
      <div className="inner">
        <i className="far fa-dizzy notFoundIcon" />
        <div className="not-found__message">Page not found</div>
      </div>
    </div>
  );
}

export default NotFound;
