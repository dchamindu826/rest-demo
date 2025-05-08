// src/pages/ReservationPage.jsx
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import styles from './ReservationPage.module.css';
import GlassmorphismPanel from '../components/UI/GlassmorphismPanel';
import MagneticButton from '../components/Common/MagneticButton';
import ParticleBackground from '../components/Animation/ParticleBackground'; // Background for the whole page

const ReservationPage = () => {
  const formRef = useRef(null);
  const pageRef = useRef(null);

  useLayoutEffect(() => {
     const ctx = gsap.context(() => {
        // Animate panel entrance
        gsap.from(formRef.current, {
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out'
        });

        // Input focus animations
        const inputs = formRef.current.querySelectorAll(`.${styles.formInput}`);
        inputs.forEach(input => {
             const label = input.previousElementSibling; // Assuming label is right before input
             const line = input.nextElementSibling; // Assuming line is right after input

             gsap.set(line, { scaleX: 0, transformOrigin: 'left' }); // Initial state for line

             input.addEventListener('focus', () => {
                gsap.to(label, { y: -20, scale: 0.8, color: 'var(--color-primary)', duration: 0.3, ease: 'power2.out' });
                gsap.to(line, { scaleX: 1, duration: 0.4, ease: 'power2.out' });
             });

             input.addEventListener('blur', () => {
                 if (input.value === '') { // Only move label back if empty
                    gsap.to(label, { y: 0, scale: 1, color: 'var(--color-text)', duration: 0.3, ease: 'power2.out' });
                 }
                 gsap.to(line, { scaleX: 0, transformOrigin: 'right', duration: 0.4, ease: 'power2.in' });
             });
        });

     }, pageRef); // Scope animations

     return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted');
    // Add visual feedback (e.g., success message animation)
  };

  return (
    <div ref={pageRef} className={`${styles.reservationPage} section-padding`}>
      <ParticleBackground /> {/* Full page background */}
      <div className="container">
        <GlassmorphismPanel ref={formRef} className={styles.reservationPanel}>
          <h2>Make a Reservation</h2>
          <p className={styles.formIntro}>Book your table for an unforgettable dining experience.</p>
          <form onSubmit={handleSubmit} className={styles.reservationForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Name</label>
              <input type="text" id="name" name="name" required className={styles.formInput} />
              <span className={styles.inputLine}></span>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email</label>
              <input type="email" id="email" name="email" required className={styles.formInput} />
              <span className={styles.inputLine}></span>
            </div>
             <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="date" className={styles.formLabel}>Date</label>
                    <input type="date" id="date" name="date" required className={styles.formInput} />
                    <span className={styles.inputLine}></span>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="time" className={styles.formLabel}>Time</label>
                    <input type="time" id="time" name="time" required className={styles.formInput} />
                    <span className={styles.inputLine}></span>
                </div>
             </div>
            <div className={styles.formGroup}>
              <label htmlFor="guests" className={styles.formLabel}>Number of Guests</label>
              <input type="number" id="guests" name="guests" min="1" required className={styles.formInput} />
              <span className={styles.inputLine}></span>
            </div>
             <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>Special Requests (Optional)</label>
                <textarea id="message" name="message" rows="3" className={`${styles.formInput} ${styles.formTextarea}`}></textarea>
                 <span className={styles.inputLine}></span>
            </div>
            <div className={styles.submitButtonWrapper}>
                <MagneticButton type="submit">
                    Book Now
                </MagneticButton>
            </div>
          </form>
        </GlassmorphismPanel>
      </div>
    </div>
  );
};

export default ReservationPage;

