import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../assets/css/side-menu.css';

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: 'inbox'
    };
  }

  onSelect = value => {
    this.setState({ selectedValue: value });
  };

  isSelected = value => {
    const { selectedValue } = this.state;
    return value === selectedValue;
  };

  navigateCompose = () => {
    const { history } = this.props;
    this.onSelect('compose');
    history.push('/compose');
  };

  render() {
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
              onClick={() => this.onSelect('inbox')}
              className={`link ${this.isSelected('inbox') ? 'active' : ''}`}
            >
              <i className="fas fa-inbox" />
              <span>Inbox</span>
            </Link>
          </li>
          <li>
            <Link
              to="/sent"
              onClick={() => this.onSelect('sent')}
              className={`link ${this.isSelected('sent') ? 'active' : ''}`}
            >
              <i className="fas fa-envelope-square" />
              <span>Sent Messages</span>
            </Link>
          </li>
          <li>
            <Link
              to="/trash"
              onClick={() => this.onSelect('trash')}
              className={`link ${this.isSelected('trash') ? 'active' : ''}`}
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
