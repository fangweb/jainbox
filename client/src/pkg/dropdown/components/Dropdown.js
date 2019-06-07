import React from 'react';
import PropTypes from 'prop-types';
import styles from './dropdown.module.css';
import { Item } from './Item';

export class Dropdown extends React.Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number }))
      .isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  openDropdown = () => {
    this.setState({ isOpen: true });
    document.addEventListener('click', this.closeDropdown);
  };

  closeDropdown = () => {
    this.setState({ isOpen: false });
    document.removeEventListener('click', this.closeDropdown);
  };

  selectItem = value => {
    if (this.state.selectedItem !== value) {
      this.props.onSelectItem(value);
    }
  };

  generateItem = dataKey => {
    return (
      <div
        key={dataKey.id}
        onClick={() => this.selectItem(dataKey)}
        onKeyDown={() => this.selectItem(dataKey)}
        role="presentation"
      >
        <Item>
          <span>{dataKey.username}</span>
        </Item>
      </div>
    );
  };

  generateMenu(data) {
    return (
      <div
        className={`${styles.menu} ${this.state.isOpen ? styles.opened : ''}`}
      >
        {data.map(this.generateItem)}
      </div>
    );
  }

  render() {
    const { data } = this.props;
    if (data.length < 1) {
      return null;
    }
    return (
      <div className={styles.dropdown}>
        <button
          className={styles.dropdownBtn}
          type="button"
          onClick={this.openDropdown}
        >
          {this.props.title}
        </button>
        {this.generateMenu(data)}
      </div>
    );
  }
}
