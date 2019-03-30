import React from 'react';
import '../assets/css/panel.css';

function Panel({ children }) {
  return <div className="panel">{children}</div>;
}

export default Panel;
