import React, { useId } from 'react';
import styles from './Input.module.css';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  ...props
}) => {
  const id = useId();

  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span className={styles.asterisk}>*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        aria-invalid={!!error}
        {...props}
      />
      {error && <span className={styles.errorMessage} role="alert">{error}</span>}
    </div>
  );
};

export default Input;
