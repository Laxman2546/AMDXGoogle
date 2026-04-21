import React from 'react';
import styles from './Card.module.css';

const Card = ({ children, className = '', onClick, interactive = false }) => {
  const classes = [
    styles.card,
    interactive ? styles.interactive : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick} role={interactive ? "button" : "region"} tabIndex={interactive ? 0 : undefined}>
      {children}
    </div>
  );
};

export default Card;
