// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'

const Home = ({ isAuthenticated }) => (
  <div className={styles.container}>
    <h1 className={styles.welcome}>निर्मान<span className={styles.span}>for Humankind...</span></h1>
    {isAuthenticated ? (
      <>
        <p>Your donations make a difference. Help us by donating clothes!</p>
        <Link to="/donate">Donate Clothes</Link>
        <Link to="/donations">View Donations</Link>
      </>
    ) : (
      <>
        <p className={styles.p2}><Link className={styles.link} to="/login">login</Link>  <Link className={styles.link} to="/register">register</Link> </p>
      </>
    )}
  </div>
);

export default Home;
