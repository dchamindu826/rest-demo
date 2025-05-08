// src/components/UI/AnimatedMapMarker.jsx
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import styles from './AnimatedMapMarker.module.css';

const AnimatedMapMarker = () => {
    const markerRef = useRef(null);

    useLayoutEffect(() => {
        const marker = markerRef.current;
        // Simple pulse and bob animation
        gsap.set(marker, { scale: 0.8, opacity: 0, y: -20 });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 }); // Loop infinitely

        tl.to(marker, { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }) // Entrance / Pop up
          .to(marker, { y: -8, duration: 0.8, ease: 'power1.inOut' }) // Bob up
          .to(marker, { y: 0, duration: 0.8, ease: 'power1.inOut' }) // Bob down
          .to(marker, { scale: 1.1, duration: 0.4, ease: 'power1.inOut' }, "-=0.4") // Slight pulse up
          .to(marker, { scale: 1, duration: 0.4, ease: 'power1.inOut' }); // Slight pulse down

        return () => tl.kill(); // Cleanup timeline
    }, []);

    return (
        <div ref={markerRef} className={styles.markerWrapper}>
            <FaMapMarkerAlt className={styles.markerIcon} />
            <div className={styles.markerShadow}></div>
        </div>
    );
};

export default AnimatedMapMarker;

