import React, { useState } from 'react';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import styles from './DecisionForm.module.css';

const DecisionForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    time: '',
    budget: '',
    goal: 'normal',
    dietPreference: 'veg'
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
      <Input
        label="Time of Day"
        name="time"
        value={formData.time}
        onChange={handleChange}
        placeholder="e.g., Morning, 2:00 PM"
        required
      />
      
      <Input
        label="Budget"
        name="budget"
        type="number"
        value={formData.budget}
        onChange={handleChange}
        placeholder="Available budget"
        required
      />

      <div className={styles.selectGroup}>
        <label htmlFor="goal" className={styles.label}>Goal *</label>
        <select
          id="goal"
          name="goal"
          className={styles.select}
          value={formData.goal}
          onChange={handleChange}
          required
        >
          <option value="normal">Normal</option>
          <option value="light">Light</option>
          <option value="fitness">Fitness</option>
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

      <Button type="submit" disabled={isLoading} fullWidth>
        Get Decision
      </Button>
    </form>
  );
};

export default DecisionForm;
