import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <main className={styles.container}>
      <img
        src={`${process.env.PUBLIC_URL}/scribepath_logo.png`}
        alt="Company logo"
        className={styles.logo}
      />
      <section className={styles.contentSection}>
        <h1 className={styles.tagline}>Capture | Organize | Conquer</h1>
        <button className={styles.getStartedButton} onClick={handleGetStarted} aria-label="Get started with Scribe Path">
          Get Started
        </button>
        <p className={styles.newsletter}>JOIN THE NEWSLETTER</p>
      </section>
    </main>
  );
};

export default LandingPage;