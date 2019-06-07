import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

class ConfirmationDialog extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired
  };

  preventClose = event => {
    event.stopPropagation();
  };

  onConfirm = value => {
    this.props.onConfirm(value);
  };

  render() {
    return (
      <div
        className={styles.confirmation}
        onClick={this.preventClose}
        onKeyDown={this.preventClose}
        role="presentation"
      >
        <div className={styles.title}>{this.props.title}</div>
        <div className={styles.ctrl}>
          <button
            className={[styles.btn, styles.proceed].join(' ')}
            onClick={() => this.onConfirm(true)}
          >
            Proceed
          </button>
          <button
            className={[styles.btn, styles.cancel].join(' ')}
            onClick={() => this.onConfirm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default ConfirmationDialog;
