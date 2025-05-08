// src/pages/ContactPage.jsx
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import styles from './ContactPage.module.css'; // Reuse Reservation styles where possible
import reservationStyles from './ReservationPage.module.css'; // Import styles to reuse
import AnimatedText from '../components/Animation/AnimatedText';
import MagneticButton from '../components/Common/MagneticButton';
import AnimatedMapMarker from '../components/UI/AnimatedMapMarker'; // Import the marker
import { FaPhoneAlt, FaEnvelope, FaMapPin } from 'react-icons/fa';

const ContactPage = () => {
  const formRef = useRef(null);
  const pageRef = useRef(null);
  const contactInfoRef = useRef(null);
  const mapSectionRef = useRef(null);


   // Similar form animation setup as ReservationPage
  useLayoutEffect(() => {
     const ctx = gsap.context(() => {
        // Animate Contact Info reveal
         gsap.from(contactInfoRef.current.querySelectorAll('li'), {
            opacity: 0,
            x: -30,
            stagger: 0.2,
            duration: 0.8,
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: contactInfoRef.current, start: 'top 85%', toggleActions: 'play none none none'}
         });

         // Animate Map Section reveal
         gsap.from(mapSectionRef.current, {
             opacity: 0,
             y: 50,
             duration: 1,
             ease: 'power3.out',
             delay: 0.2,
             scrollTrigger: { trigger: mapSectionRef.current, start: 'top 80%', toggleActions: 'play none none none'}
         });

         // Animate Form reveal
         gsap.from(formRef.current, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            delay: 0.4,
            scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none none'}
        });


        // Input focus animations (copied from ReservationPage logic)
        const inputs = formRef.current.querySelectorAll(`.${reservationStyles.formInput}`);
        inputs.forEach(input => {
             const label = input.previousElementSibling;
             const line = input.nextElementSibling;

             gsap.set(line, { scaleX: 0, transformOrigin: 'left' });

             input.addEventListener('focus', () => {
                gsap.to(label, { y: -20, scale: 0.8, color: 'var(--color-secondary)', duration: 0.3, ease: 'power2.out' }); // Use different accent color
                gsap.to(line, { scaleX: 1, duration: 0.4, ease: 'power2.out' });
             });

             input.addEventListener('blur', () => {
                 if (input.value === '') {
                    gsap.to(label, { y: 0, scale: 1, color: 'var(--color-text)', duration: 0.3, ease: 'power2.out' });
                 }
                 gsap.to(line, { scaleX: 0, transformOrigin: 'right', duration: 0.4, ease: 'power2.in' });
             });
        });

     }, pageRef);

     return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted');
     // Add visual feedback (e.g., success message animation)
  };

  return (
    <div ref={pageRef} className={`${styles.contactPage} section-padding`}>
      <div className="container">
         <AnimatedText type="chars" stagger={0.05} duration={1} ease="expo.out">
          <h1 className={styles.pageTitle}>Get In Touch</h1>
        </AnimatedText>
         <AnimatedText type="lines" delay={0.3}>
            <p className={styles.pageSubtitle}>We'd love to hear from you. Reach out with questions or feedback.</p>
         </AnimatedText>


        <div className={styles.contactLayout}>
          {/* Left Side: Contact Info & Map */}
          <div className={styles.leftColumn}>
            <div ref={contactInfoRef} className={styles.contactInfo}>
              <AnimatedText type="words"><h3 className={styles.infoTitle}>Contact Details</h3></AnimatedText>
              <ul>
                <li><FaMapPin className={styles.infoIcon} /> 123 Culinary Avenue, Flavor Town, FT 54321</li>
                <li><FaPhoneAlt className={styles.infoIcon} /> <a href="tel:+1234567890">(123) 456-7890</a></li>
                <li><FaEnvelope className={styles.infoIcon} /> <a href="mailto:info@restaurant.com">info@restaurant.com</a></li>
              </ul>
            </div>

            <div ref={mapSectionRef} className={styles.mapSection}>
                <AnimatedText type="words"><h3 className={styles.infoTitle}>Find Us Here</h3></AnimatedText>
               {/* Map Placeholder */}
                <div className={styles.mapPlaceholder}>
                    {/* Placeholder background simulating a map */}
                    <div className={styles.mapMarkerContainer}>
                         <AnimatedMapMarker />
                    </div>
                     {/* You would replace this div with an actual map embed (e.g., Google Maps iframe or Leaflet/Mapbox container) */}
                </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className={styles.rightColumn}>
             <div ref={formRef} className={styles.contactFormWrapper}>
                <AnimatedText type="words"><h3 className={styles.infoTitle}>Send a Message</h3></AnimatedText>
                 {/* Reuse Reservation Form Styles */}
                 <form onSubmit={handleSubmit} className={reservationStyles.reservationForm}>
                    <div className={reservationStyles.formGroup}>
                        <label htmlFor="contact-name" className={reservationStyles.formLabel}>Name</label>
                        <input type="text" id="contact-name" name="name" required className={reservationStyles.formInput} placeholder=" "/>
                        <span className={reservationStyles.inputLine}></span>
                    </div>
                     <div className={reservationStyles.formGroup}>
                        <label htmlFor="contact-email" className={reservationStyles.formLabel}>Email</label>
                        <input type="email" id="contact-email" name="email" required className={reservationStyles.formInput} placeholder=" "/>
                        <span className={reservationStyles.inputLine}></span>
                    </div>
                     <div className={reservationStyles.formGroup}>
                        <label htmlFor="contact-subject" className={reservationStyles.formLabel}>Subject</label>
                        <input type="text" id="contact-subject" name="subject" required className={reservationStyles.formInput} placeholder=" "/>
                        <span className={reservationStyles.inputLine}></span>
                    </div>
                    <div className={reservationStyles.formGroup}>
                        <label htmlFor="contact-message" className={reservationStyles.formLabel}>Your Message</label>
                        <textarea id="contact-message" name="message" rows="5" required className={`${reservationStyles.formInput} ${reservationStyles.formTextarea}`} placeholder=" "></textarea>
                        <span className={reservationStyles.inputLine}></span>
                    </div>
                    <div className={reservationStyles.submitButtonWrapper}>
                        <MagneticButton type="submit" style={{ '--btn-color': 'var(--color-secondary)' }}> {/* Custom color prop if needed */}
                            Send Message
                        </MagneticButton>
                    </div>
                </form>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

