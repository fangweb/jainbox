import React from 'react';
import styles from './dropdown.module.css';
import PropTypes from 'prop-types';

const item = ({ children, onSelectItem }) => {
  return (
    <div className={styles.item}>
      {children}
    </div>
  );
};

item.propTypes = {
  children: PropTypes.node.isRequired
};

export const Item = item;
