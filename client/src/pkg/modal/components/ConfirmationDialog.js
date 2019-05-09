import React from 'react';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

class ConfirmationDialog extends React.Component {
  
  static propTypes = {
    title: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  }
  
  preventClose = (event) => {
    event.stopPropagation()
  }
  
  onSelect = (value) => {
    this.props.onSelect(value);
  }
  
  render() {
    return (
      <div className={styles.confirmation} onClick={this.preventClose}>
        <div className={styles.title}>
          {this.props.title}
        </div>       
        <div className={styles.ctrl}>
          <button className={[styles.btn, styles.proceed].join(' ')} onClick={() => this.onSelect(true)}>Proceed</button>
          <button className={[styles.btn, styles.cancel].join(' ')} onClick={() => this.onSelect(false)}>Cancel</button>
        </div>
      </div>      
    );
  }
}

export default ConfirmationDialog;

