// src/components/UI/MenuItemCard.jsx
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltWrapper from '../Animation/TiltWrapper';
import styles from './MenuItemCard.module.css';

// Ensure ScrollTrigger is registered (should be done globally once)
// gsap.registerPlugin(ScrollTrigger);

const MenuItemCard = ({ item, index }) => {
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const element = cardRef.current;
    // Simple reveal animation using ScrollTrigger
    const anim = gsap.fromTo(element,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%', // Trigger when 90% from top enters viewport
          toggleActions: 'play none none none', // Play once
          // markers: true, // for debugging
        }
      }
    );

    // GSAP hover effect (subtle grow/shadow)
    const hoverTl = gsap.timeline({ paused: true })
      .to(element.querySelector(`.${styles.itemImage}`), { scale: 1.05, duration: 0.4, ease: 'power2.out' }, 0)
      .to(element.querySelector(`.${styles.itemContent}`), { backgroundColor: 'rgba(30, 30, 30, 0.7)', duration: 0.4, ease: 'power2.out'}, 0);


    element.addEventListener('mouseenter', () => hoverTl.play());
    element.addEventListener('mouseleave', () => hoverTl.reverse());

    return () => {
        anim.scrollTrigger?.kill(); // Kill ScrollTrigger instance
        anim.kill(); // Kill the animation itself
        hoverTl.kill(); // Kill hover timeline
        // No need to remove listeners if element is unmounted
    };
  }, []);

  return (
    <TiltWrapper
      ref={cardRef} // Assign ref here for GSAP targetting
      className={styles.menuItemCard}
      options={{ max: 6, scale: 1.02, speed: 600, glare: true, 'max-glare': 0.1 }}
    >
      <div className={styles.imageWrapper}>
        <img src={item.imageUrl || 'https://via.placeholder.com/400x300/222/888?text=Dish'} alt={item.name} className={styles.itemImage} loading="lazy" />
         <div className={styles.priceTag}>${item.price.toFixed(2)}</div>
      </div>
      <div className={styles.itemContent}>
        <h3 className={styles.itemName}>{item.name}</h3>
        <p className={styles.itemDescription}>{item.description}</p>
      </div>
    </TiltWrapper>
  );
};

export default MenuItemCard;

