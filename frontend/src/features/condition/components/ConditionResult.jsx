import React from 'react';
import Card from '../../../components/ui/Card/Card';
import styles from './ConditionResult.module.css';

const ConditionResult = ({ data }) => {
  if (!data) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.mainTitle}>{data.title}</h2>
      
      {data.regional && (
        <p className={styles.regionalText}>
          {data.regional.hi && <span>HI: {data.regional.hi}</span>}
          {data.regional.te && <span className={styles.separator}>|</span>}
          {data.regional.te && <span>TE: {data.regional.te}</span>}
        </p>
      )}

      <Card className={styles.resultCard}>
        <h3 className={styles.title}>Foods to Eat</h3>
        <ul className={styles.list}>
          {data.eat?.map((item, i) => (
            <li key={`eat-${i}`} className={styles.listItem}>
              <span className={styles.icon}>🍲</span> {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className={styles.dangerCard}>
        <h3 className={styles.title}>Foods to Avoid</h3>
        <ul className={styles.list}>
          {data.avoid?.map((item, i) => (
            <li key={`avoid-${i}`} className={styles.listItem}>
              <span className={styles.icon}>🚫</span> {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className={styles.tipsCard}>
        <h3 className={styles.title}>Hydration & Tips</h3>
        <ul className={styles.list}>
          {data.tips?.map((item, i) => (
            <li key={`tip-${i}`} className={styles.listItem}>
              <span className={styles.icon}>💧</span> {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className={styles.reasonCard}>
        <h3 className={styles.title}>Why this works</h3>
        <p className={styles.reasonText}>{data.reason}</p>
      </Card>
      
      <p className={styles.disclaimer}>⚠️ This is nutritional advice based on traditional patterns, not a medical diagnosis.</p>
    </div>
  );
};

export default ConditionResult;
