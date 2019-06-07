import React from 'react';
import '../assets/css/panel-error.css';

function PanelError({ message }) {
  return (
    <div className="panel-error">
      <i className="fas fa-times panel-error-icon" />
      {message}
    </div>
  );
}

export default PanelError;
