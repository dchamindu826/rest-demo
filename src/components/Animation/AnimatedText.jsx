// src/components/Animation/AnimatedText.jsx
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import Splitting from 'splitting';
import { gsap } from 'gsap';
import 'splitting/dist/splitting.css'; // Basic styles
import 'splitting/dist/splitting-cells.css'; // Styles for cells (words/chars)
import styles from './AnimatedText.module.css'; // Optional custom styles

const AnimatedText = ({ children, type = 'chars', stagger = 0.03, duration = 0.8, delay = 0, ease = 'power3.out', direction = 'up' }) => {
  const textRef = useRef(null);
  const animationRef = useRef(null); // To store GSAP animation

  // Use useLayoutEffect for DOM measurements/manipulations before paint
  useLayoutEffect(() => {
    if (!textRef.current) return;

    // Ensure Splitting runs only once
    const results = Splitting({ target: textRef.current, by: type });
    const targets = results[0][type]; // Get the chars or words

    if (!targets || targets.length === 0) return;

    // Set initial state (hidden)
    gsap.set(targets, {
      opacity: 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
      x: direction === 'left' ? '100%' : direction === 'right' ? '-100%' : 0,
      scale: direction === 'scale' ? 0.5 : 1,
      rotation: direction === 'rotate' ? 45 : 0,
      transformOrigin: 'center center'
    });

    // Create animation (but don't play it yet if using ScrollTrigger elsewhere)
    animationRef.current = gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      duration: duration,
      stagger: stagger,
      ease: ease,
      delay: delay,
      paused: true // Start paused, trigger manually or via ScrollTrigger
    });

    // Basic Intersection Observer to play animation when visible
    // Replace with ScrollTrigger for more complex scroll-based animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && animationRef.current) {
            animationRef.current.play();
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    observer.observe(textRef.current);

    // Cleanup function
    return () => {
        observer.disconnect();
        if (animationRef.current) {
            animationRef.current.kill(); // Kill GSAP animation on unmount
        }
        // Attempt to revert Splitting - NOTE: Splitting doesn't have a built-in revert/destroy.
        // Manual cleanup might be needed if styles conflict, but often not necessary.
         if (textRef.current && textRef.current.hasAttribute('data-splitting')) {
            // console.log("Splitting cleanup would happen here if supported");
         }
    };

  }, [children, type, stagger, duration, delay, ease, direction]); // Re-run if text or config changes

  return <span ref={textRef} data-splitting className={styles.animatedTextWrapper}>{children}</span>;
};

export default AnimatedText;

