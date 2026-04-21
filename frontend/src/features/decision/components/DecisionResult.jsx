import React from 'react';
import Card from '../../../components/ui/Card/Card';
import styles from './DecisionResult.module.css';

const DecisionResult = ({ data }) => {
  if (!data) return null;

  return (
    <div className={styles.container}>
      <Card className={styles.resultCard}>
        <h3 className={styles.title}>Recommended Actions</h3>
        <ul className={styles.list}>
          {data.suggestions?.map((item, i) => (
            <li key={i} className={styles.listItem}>
              <span className={styles.icon}>✅</span> {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className={styles.dangerCard}>
        <h3 className={styles.title}>Things to Avoid</h3>
        <ul className={styles.list}>
          {data.avoid?.map((item, i) => (
            <li key={i} className={styles.listItem}>
              <span className={styles.icon}>❌</span> {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className={styles.reasonCard}>
        <h3 className={styles.title}>Why?</h3>
        <p className={styles.reasonText}>{data.reason}</p>
      </Card>
    </div>
  );
};

export default DecisionResult;
