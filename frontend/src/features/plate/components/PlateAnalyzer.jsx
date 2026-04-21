import React, { useState } from 'react';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import styles from './PlateAnalyzer.module.css';

const PlateAnalyzer = ({ onSubmit, isLoading }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ description });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="description" className={styles.label}>
          Describe your food *
        </label>
        <textarea
          id="description"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., 2 slices of white bread with butter, a glass of orange juice..."
          rows="4"
          required
        />
      </div>

      <Button type="submit" disabled={isLoading || !description.trim()} fullWidth>
        Analyze Meal
      </Button>
    </form>
  );
};

export default PlateAnalyzer;
