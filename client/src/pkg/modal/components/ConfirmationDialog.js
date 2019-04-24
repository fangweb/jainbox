import React from 'react';
import styles from './modal.module.css';

class ConfirmationDialog extends React.Component {
  
  preventClose = (event) => {
    event.stopPropagation()
  }

  render() {
    return (
      <div className={styles.confirmation} onClick={this.preventClose}>
        <div className="confirmation-heading">
          {this.props.title}
        </div>       
      </div>      
    );
  }
}

export default ConfirmationDialog;

