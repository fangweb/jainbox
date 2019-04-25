import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../assets/css/side-menu.css';

class SideMenu extends Component {

  navigateCompose = () => {
    const { history } = this.props;
    history.push('/compose');
  };

  render() {
    const { pathname } = this.props.location;
    return (
      <div className="side-menu">
        <div className="compose">
          <button className="side-menu__compose" onClick={this.navigateCompose}>
            <span>Compose</span>
          </button>
        </div>
        <ul>
          <li>
            <Link
              to="/inbox"
              className={`link ${pathname === '/' || pathname === '/inbox' ? 'active' : ''}`}
            >
              <i className="fas fa-inbox" />
              <span>Inbox</span>
            </Link>
          </li>
          <li>
            <Link
              to="/sent"
              className={`link ${pathname === '/sent'  ? 'active' : ''}`}
            >
              <i className="fas fa-envelope-square" />
              <span>Sent Messages</span>
            </Link>
          </li>
          <li>
            <Link
              to="/trash"
              className={`link ${pathname === '/trash'  ? 'active' : ''}`}
            >
              <i className="fas fa-trash-alt" />
              <span>Trash</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(SideMenu);
