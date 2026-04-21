import React, { useState } from 'react';
import ConditionForm from '../components/ConditionForm';
import ConditionResult from '../components/ConditionResult';
import { conditionService } from '../services/condition.service';
import Loader from '../../../components/ui/Loader/Loader';
import ErrorAlert from '../../../components/ui/ErrorAlert/ErrorAlert';
import styles from './ConditionPage.module.css';

const ConditionPage = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const data = await conditionService.getConditionAdvice(formData);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Sick Mode</h1>
        <p>Tell us your symptoms, and we'll suggest comforting, safe foods to eat and avoid.</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.formContainer}>
          <ConditionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
        
        <div className={styles.resultContainer}>
          {isLoading && <Loader message="Generating medical food advice..." />}
          {error && <ErrorAlert message={error} />}
          {!isLoading && !error && result && <ConditionResult data={result} />}
          {!isLoading && !error && !result && (
            <div className={styles.placeholder}>
              <p>Select your condition to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConditionPage;
