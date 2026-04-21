import React from 'react';
import Card from '../../../components/ui/Card/Card';
import styles from './PlateScore.module.css';

const PlateScore = ({ data }) => {
  if (!data) return null;

  const scoreClass = data.score >= 80 ? styles.scoreGood : 
                     data.score >= 50 ? styles.scoreAverage : 
                     styles.scorePoor;

  return (
    <div className={styles.container}>
      
      <div className={styles.scoreContainer}>
        <div className={`${styles.scoreCircle} ${scoreClass}`}>
          <span className={styles.scoreText}>{data.score}</span>
          <span className={styles.scoreMax}>/100</span>
        </div>
        <h3 className={styles.scoreLabel}>Health Score</h3>
      </div>

      <Card className={styles.dangerCard}>
        <h3 className={styles.title}>Identified Issues</h3>
        <ul className={styles.list}>
          {data.issues?.map((item, i) => (
            <li key={`issue-${i}`} className={styles.listItem}>
               <span className={styles.icon}>⚠️</span> {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className={styles.fixCard}>
        <h3 className={styles.title}>Quick Fixes</h3>
        <ul className={styles.list}>
          {data.fixes?.map((item, i) => (
            <li key={`fix-${i}`} className={styles.listItem}>
              <span className={styles.icon}>💡</span> {item}
            </li>
          ))}
        </ul>
      </Card>

    </div>
  );
};

export default PlateScore;
