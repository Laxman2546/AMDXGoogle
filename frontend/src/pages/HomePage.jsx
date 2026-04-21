import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card/Card';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Welcome to NutriMind</h1>
        <p className={styles.subtitle}>Choose an option below to get personalized nutritional guidance.</p>
      </header>

      <section className={styles.grid}>
        <Card interactive onClick={() => navigate('/decision')}>
          <h2 className={styles.cardTitle}>🤔 What should I eat now?</h2>
          <p className={styles.cardText}>Get quick food suggestions based on your budget, goals, and time of day.</p>
        </Card>

        <Card interactive onClick={() => navigate('/condition')}>
          <h2 className={styles.cardTitle}>🤒 Sick Mode</h2>
          <p className={styles.cardText}>Not feeling well? Tell us your symptoms and get safe, comforting food advice.</p>
        </Card>

        <Card interactive onClick={() => navigate('/plate')}>
          <h2 className={styles.cardTitle}>🍽️ Analyze my food</h2>
          <p className={styles.cardText}>Describe what you're eating and get a health score with improvement tips.</p>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
