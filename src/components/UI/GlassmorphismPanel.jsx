// src/components/UI/GlassmorphismPanel.jsx
import React from 'react';
import styles from './GlassmorphismPanel.module.css';

const GlassmorphismPanel = ({ children, className = '', ...rest }) => {
  return (
    <div className={`${styles.glassPanel} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default GlassmorphismPanel;

