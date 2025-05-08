// src/components/Animation/TiltWrapper.jsx
import React, { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

const TiltWrapper = ({ children, options = {}, className = '', ...rest }) => {
  const tiltRef = useRef(null);

  const defaultOptions = {
    max: 10, // Max tilt rotation (degrees)
    speed: 400, // Speed of the enter/exit transition
    glare: true, // If it should have a "glare" effect
    'max-glare': 0.2, // Glare intensity (0.1 to 1)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.01, // Scale on hover
    gyroscope: false, // Enable/disable device orientation detection
  };

  useEffect(() => {
    const element = tiltRef.current;
    if (element) {
      VanillaTilt.init(element, { ...defaultOptions, ...options });

      // Cleanup function
      return () => {
        // Check if vanillaTilt instance exists before destroying
        if (element.vanillaTilt) {
          element.vanillaTilt.destroy();
        }
      };
    }
  }, [options]); // Re-init if options change

  return (
    <div ref={tiltRef} className={className} {...rest}>
      {children}
    </div>
  );
};

export default TiltWrapper;