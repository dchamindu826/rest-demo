// src/components/Common/MagneticButton.jsx
import React from 'react';
import useMagneticEffect from '../../hooks/useMagneticEffect';
import styles from './MagneticButton.module.css';

const MagneticButton = ({ children, onClick, className = '', ...rest }) => {
  const magneticRef = useMagneticEffect(0.3, 100); // Adjust strength/threshold

  return (
    <button
      ref={magneticRef}
      className={`${styles.magneticButton} ${className}`}
      onClick={onClick}
      {...rest}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
};

export default MagneticButton;

