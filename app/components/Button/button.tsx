import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
      <div id={styles.clip} className={styles.clip}>
        <div id={styles.leftTop} className={styles.corner}></div>
        <div id={styles.rightBottom} className={styles.corner}></div>
        <div id={styles.rightTop} className={styles.corner}></div>
        <div id={styles.leftBottom} className={styles.corner}></div>
      </div>
      <span id={styles.rightArrow} className={`${styles.arrow} ${styles.rightArrow}`}></span>
      <span id={styles.leftArrow} className={`${styles.arrow} ${styles.leftArrow}`}></span>
    </button>
  );
};

export default Button;