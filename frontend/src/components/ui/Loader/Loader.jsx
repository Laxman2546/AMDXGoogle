import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <div className={styles.spinner}></div>
      {message && <span className={styles.message}>{message}</span>}
    </div>
  );
};

export default Loader;
