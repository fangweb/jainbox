import React from 'react';
import PropTypes from 'prop-types';
import styles from './dropdown.module.css';

const item = ({ children, onSelectItem }) => {
  return <div className={styles.item}>{children}</div>;
};

item.propTypes = {
  children: PropTypes.node.isRequired
};

export const Item = item;
