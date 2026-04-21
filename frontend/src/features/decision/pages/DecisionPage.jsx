import React, { useState } from 'react';
import DecisionForm from '../components/DecisionForm';
import DecisionResult from '../components/DecisionResult';
import { decisionService } from '../services/decision.service';
import Loader from '../../../components/ui/Loader/Loader';
import ErrorAlert from '../../../components/ui/ErrorAlert/ErrorAlert';
import styles from './DecisionPage.module.css';

const DecisionPage = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    
    try {
      // API call to the backend
      const data = await decisionService.getDecision(formData);
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
        <h1>What Should I Eat?</h1>
        <p>Give us a few details and we will decide for you.</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.formContainer}>
          <DecisionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
        
        <div className={styles.resultContainer}>
          {isLoading && <Loader message="Analyzing best options..." />}
          {error && <ErrorAlert message={error} />}
          {!isLoading && !error && result && <DecisionResult data={result} />}
          {!isLoading && !error && !result && (
            <div className={styles.placeholder}>
              <p>Fill out the form to get personalized food suggestions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecisionPage;
