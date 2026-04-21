import React, { useState } from 'react';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import styles from './ConditionForm.module.css';

const ConditionForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    condition: '',
    dietPreference: 'veg',
    language: 'en'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.selectGroup}>
        <label htmlFor="condition" className={styles.label}>How are you feeling? *</label>
        <select
          id="condition"
          name="condition"
          className={styles.select}
          value={formData.condition}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a condition...</option>
          <option value="fever">Fever</option>
          <option value="cold">Cold & Cough</option>
          <option value="weakness">General Weakness</option>
          <option value="stomach_upset">Stomach Upset</option>
          <option value="headache">Headache</option>
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label htmlFor="dietPreference" className={styles.label}>Diet Preference *</label>
        <select
          id="dietPreference"
          name="dietPreference"
          className={styles.select}
          value={formData.dietPreference}
          onChange={handleChange}
          required
        >
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label htmlFor="language" className={styles.label}>Language *</label>
        <select
          id="language"
          name="language"
          className={styles.select}
          value={formData.language}
          onChange={handleChange}
          required
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="te">Telugu</option>
        </select>
      </div>

      <Button type="submit" disabled={isLoading || !formData.condition} fullWidth>
        Get Advice
      </Button>
    </form>
  );
};

export default ConditionForm;
