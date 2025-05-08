// src/pages/HomePage.jsx
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HomePage.module.css';
import ParticleBackground from '../components/Animation/ParticleBackground';
import AnimatedText from '../components/Animation/AnimatedText';
import MagneticButton from '../components/Common/MagneticButton';
import TiltWrapper from '../components/Animation/TiltWrapper';
// Assume you have images in assets/images
import heroImage from '../assets/images/hero-dish.png'; // Example image

const HomePage = () => {
    const heroRef = useRef(null);
    const sectionAboutRef = useRef(null);
    const floatingIconRef1 = useRef(null);
    const floatingIconRef2 = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animations
            gsap.fromTo(heroRef.current.querySelector(`.${styles.heroContent}`),
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
            );

             // Floating/Parallax Icons using ScrollTrigger
            gsap.to(floatingIconRef1.current, {
                yPercent: -30, // Moves up faster than scroll
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5, // Smooth scrubbing effect
                }
            });
            gsap.to(floatingIconRef2.current, {
                yPercent: 20, // Moves down slower than scroll
                rotation: 45,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 2,
                }
            });

            // Example: Section Reveal Animation
            gsap.from(sectionAboutRef.current.querySelector(`.${styles.aboutContent}`), {
                opacity: 0,
                y: 100,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionAboutRef.current,
                    start: 'top 80%', // Trigger when 80% from top enters viewport
                    toggleActions: 'play none none none', // Play once on enter
                    // markers: true // For debugging
                }
            });
             gsap.from(sectionAboutRef.current.querySelector(`.${styles.aboutImage}`), {
                opacity: 0,
                scale: 0.8,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionAboutRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                }
            });

        }, heroRef); // Scope animations to the hero element

         // Cleanup
         return () => ctx.revert();

    }, []);


  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.heroSection}>
        <ParticleBackground /> {/* Place background specifically here */}
         {/* Floating Elements */}
        <div ref={floatingIconRef1} className={`${styles.floatingElement} ${styles.float1}`}>✨</div>
        <div ref={floatingIconRef2} className={`${styles.floatingElement} ${styles.float2}`}>🌿</div>

        <div className={`${styles.heroContent} container`}>
          <AnimatedText type="words" stagger={0.1} duration={1} ease="expo.out">
            <h1>Experience Culinary Art</h1>
          </AnimatedText>
          <AnimatedText type="lines" stagger={0.2} duration={0.8} delay={0.5} ease="power3.out">
            <p className={styles.subtitle}>Where flavor meets imagination in every dish.</p>
          </AnimatedText>
          <div style={{ marginTop: '2rem', display: 'inline-block' }}> {/* Wrapper for magnetic */}
             <MagneticButton onClick={() => console.log('Reserve Clicked!')}>
                Reserve a Table
             </MagneticButton>
          </div>
        </div>
      </section>

      {/* Example About Teaser Section */}
      <section ref={sectionAboutRef} className={`${styles.aboutSection} section-padding`}>
         <div className={`${styles.aboutGrid} container`}>
            <div className={styles.aboutContent}>
                <h2>Our Philosophy</h2>
                <AnimatedText type="words" stagger={0.02} duration={0.6} >
                    <p>We believe in sourcing the finest ingredients and transforming them with passion and creativity. Our kitchen is a playground where tradition meets innovation.</p>
                </AnimatedText>
                <MagneticButton style={{ marginTop: '1.5rem' }} onClick={() => {/* navigate to about */} }>
                    Discover Our Story
                </MagneticButton>
            </div>
             <TiltWrapper className={styles.aboutImage} options={{ max: 8, glare: true, 'max-glare': 0.1 }}>
                <img src={heroImage} alt="Artfully plated dish" />
             </TiltWrapper>
        </div>
      </section>

      {/* More sections (Menu highlights, Gallery teaser etc.) would go here */}

    </div>
  );
};

export default HomePage;

