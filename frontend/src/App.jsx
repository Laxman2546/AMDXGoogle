import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DecisionPage from './features/decision/pages/DecisionPage';
import ConditionPage from './features/condition/pages/ConditionPage';
import PlatePage from './features/plate/pages/PlatePage';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">AI Food Assistant</Link>
        </div>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
        </nav>
      </header>
      
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/decision" element={<DecisionPage />} />
          <Route path="/condition" element={<ConditionPage />} />
          <Route path="/plate" element={<PlatePage />} />
        </Routes>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} AI Food Assistant</p>
      </footer>
    </div>
  );
}

export default App;
