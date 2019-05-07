import React from 'react';
import styles from './dropdown.module.css';
import PropTypes from 'prop-types';
import { Item } from './Item';

export class Dropdown extends React.Component {  
  
  static propTypes = {
    title: PropTypes.string.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })) 
  }
  
  constructor(props) {
    super(props);    
    this.state = {
      isOpen: false,
    };
  }
  
  openDropdown = () => {
    this.setState({ isOpen: true });
    document.addEventListener("click", this.closeDropdown);
  }
  
  closeDropdown = () => {
    this.setState({ isOpen: false });
    document.removeEventListener("click", this.closeDropdown);
  }
  
  selectItem = (value) => {    
    if (this.state.selectedItem !== value) {
      this.props.onSelectItem(value);
    }    
  }
  
  generateItem = (dataKey) => {
    return (
      <li key={dataKey.id} onClick={() => this.selectItem(dataKey)}>
        <Item>
          <span>{dataKey.username}</span>
        </Item>
      </li>
    );
  }
    
  generateMenu(data) {
    return (
      <ul className={`${styles.menu} ${this.state.isOpen ? styles.opened : ''}`}>
        {data.map(this.generateItem)}
      </ul>    
    );
  }
  
  render () { 
    const { data } = this.props;
    if ( data.length < 1 ) {
      return null;
    }
    return (
      <div className={styles.dropdown}>
        <button className={styles.dropdownBtn} type="button" onClick={this.openDropdown}>
          {this.props.title}
        </button>
        {this.generateMenu(data)}
      </div>
    )
  }
}

