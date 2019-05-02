import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/header.css';

function Header() {
  return (
    <header>
      <ul className="menu">
        <li>
          <Link to="/testarea">
            <i className="fas fa-vial"></i>
            <span>Test Area</span>
          </Link>
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
