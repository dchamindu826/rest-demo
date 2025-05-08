// src/pages/AboutPage.jsx
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutPage.module.css';
import AnimatedText from '../components/Animation/AnimatedText';
import TiltWrapper from '../components/Animation/TiltWrapper';
// Assume images
import chefImage from '../assets/images/chef-portrait.jpg';
import restaurantInterior from '../assets/images/restaurant-interior.jpg';

const AboutPage = () => {
  const pageRef = useRef(null);
  const timelineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Page title animation
        gsap.from(pageRef.current.querySelector(`.${styles.pageTitle}`), {
             opacity: 0, y: -30, duration: 1, delay: 0.2, ease: 'power3.out'
        });

        // Storyline Timeline Animation
        const storySections = gsap.utils.toArray(`.${styles.storySection}`);
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 60%', // Start when timeline top hits 60% of viewport
                end: 'bottom 80%', // End when timeline bottom hits 80% of viewport
                scrub: 1.5, // Smooth scrubbing
                // markers: true, // for debugging
            }
        });

        storySections.forEach((section, index) => {
            const dot = section.querySelector(`.${styles.timelineDot}`);
            const content = section.querySelector(`.${styles.timelineContent}`);

            tl.fromTo(dot,
               { scale: 0, autoAlpha: 0 },
               { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'power2.inOut' },
               index * 0.5 // Stagger start time based on index
             )
             .fromTo(content,
                { opacity: 0, x: index % 2 === 0 ? -50 : 50 }, // Animate from left/right
                { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
                index * 0.5 + 0.2 // Start slightly after dot appears
             );
        });

        // Chef Section Animation
        const chefSection = pageRef.current.querySelector(`.${styles.chefSection}`);
         gsap.from(chefSection.querySelector(`.${styles.chefImage}`), {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: chefSection,
                start: 'top 75%',
                toggleActions: 'play none none none',
            }
        });
         gsap.from(chefSection.querySelector(`.${styles.chefBio}`), {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: chefSection,
                start: 'top 70%',
                toggleActions: 'play none none none',
            }
        });


    }, pageRef); // Scope animations to the page

    return () => ctx.revert(); // Cleanup GSAP animations and ScrollTriggers
  }, []);

  return (
    <div ref={pageRef} className={`${styles.aboutPage} section-padding`}>
      <div className="container">
        <AnimatedText type="chars" stagger={0.05} duration={1} ease="expo.out">
             <h1 className={styles.pageTitle}>Our Story</h1>
         </AnimatedText>

        {/* Storyline Section */}
        <div ref={timelineRef} className={styles.storyline}>
          <div className={styles.timelineLine}></div> {/* Central line */}

          {/* Story Point 1 */}
          <div className={`${styles.storySection} ${styles.alignLeft}`}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <AnimatedText type="words" delay={0.1}><h3 className={styles.timelineHeading}>The Dream</h3></AnimatedText>
              <p>It started with a simple vision: to create a space where culinary art and warm hospitality converge. A place where every meal is a celebration.</p>
            </div>
          </div>

          {/* Story Point 2 */}
          <div className={`${styles.storySection} ${styles.alignRight}`}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
               <AnimatedText type="words" delay={0.1}><h3 className={styles.timelineHeading}>The Journey</h3></AnimatedText>
              <p>Years of passion, travel, and tasting culminated in finding the perfect location and assembling a team dedicated to excellence.</p>
            </div>
          </div>

          {/* Story Point 3 */}
           <div className={`${styles.storySection} ${styles.alignLeft}`}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <AnimatedText type="words" delay={0.1}><h3 className={styles.timelineHeading}>Today</h3></AnimatedText>
              <p>We proudly offer a unique dining experience, blending innovative techniques with timeless flavors, all served with genuine care.</p>
            </div>
          </div>
          {/* Add more points as needed */}
        </div>


         {/* Chef Section */}
         <section className={`${styles.chefSection} section-padding`}>
            <div className={styles.chefGrid}>
                <TiltWrapper className={styles.chefImage} options={{ scale: 1.03, max: 8 }}>
                     <img src={chefImage} alt="Head Chef Portrait" loading="lazy" />
                     <div className={styles.imageGlow}></div>
                 </TiltWrapper>
                <div className={styles.chefBio}>
                    <AnimatedText type="words"><h2 className={styles.chefName}>Meet the Maestro</h2></AnimatedText>
                    <AnimatedText type="lines" delay={0.3}>
                        <p>Our Head Chef brings over 15 years of international experience, a dedication to seasonal ingredients, and an artist's eye to every plate. Their philosophy revolves around purity of flavor and elegant presentation.</p>
                        <p>Driven by innovation yet rooted in classical techniques, Chef crafts menus that surprise and delight.</p>
                     </AnimatedText>
                </div>
            </div>
         </section>

         {/* Optional Philosophy Section */}
        <section className={`${styles.philosophySection} section-padding`}>
             <TiltWrapper className={styles.philosophyImage} options={{ max: 5 }}>
                  <img src={restaurantInterior} alt="Restaurant interior ambiance" loading="lazy" />
             </TiltWrapper>
            <AnimatedText type="words" delay={0.2}><h2>Our Philosophy</h2></AnimatedText>
             <AnimatedText type="lines" delay={0.4}>
                 <p>Beyond the food, we strive to create moments. We believe in the power of a shared meal to connect people. Sustainability, community, and creativity are the pillars of our establishment.</p>
             </AnimatedText>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;

