import React, { useState } from 'react';
import PlateAnalyzer from '../components/PlateAnalyzer';
import PlateScore from '../components/PlateScore';
import { plateService } from '../services/plate.service';
import Loader from '../../../components/ui/Loader/Loader';
import ErrorAlert from '../../../components/ui/ErrorAlert/ErrorAlert';
import styles from './PlatePage.module.css';

const PlatePage = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const data = await plateService.getPlateAnalysis(formData);
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
        <h1>Analyze My Plate</h1>
        <p>Describe your meal to get a nutritional health score and instant fixes.</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.formContainer}>
          <PlateAnalyzer onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
        
        <div className={styles.resultContainer}>
          {isLoading && <Loader message="Analyzing meal composition..." />}
          {error && <ErrorAlert message={error} />}
          {!isLoading && !error && result && <PlateScore data={result} />}
          {!isLoading && !error && !result && (
            <div className={styles.placeholder}>
              <p>Enter a description on the left to see your plate score.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatePage;
