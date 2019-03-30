import React from 'react';
import '../assets/css/header.css';

function Header() {
  return (
    <header>
      <ul className="menu">
        <li>
          <a href="/placeholder">
            <i className="fas fa-globe-americas" />
            <span>Online Users</span>
          </a>
        </li>
        <li>
          <a href="/placeholder">
            <i className="fas fa-door-closed" />
            <span>Deactivate</span>
          </a>
        </li>
        <li>
          <a href="/placeholder">
            <i className="fas fa-power-off" />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
