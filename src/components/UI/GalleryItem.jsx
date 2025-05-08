// src/components/UI/GalleryItem.jsx
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltWrapper from '../Animation/TiltWrapper';
import styles from './GalleryItem.module.css';
import { FaExpandAlt } from 'react-icons/fa'; // Example icon import

const GalleryItem = ({ imageSrc, alt, index }) => {
  const itemRef = useRef(null);

  useLayoutEffect(() => {
    const element = itemRef.current;
    const anim = gsap.fromTo(element,
        { opacity: 0, scale: 0.85, y: 50 },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.05, // Stagger entrance based on index
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 95%',
                toggleActions: 'play none none none',
            }
        }
    );

    // Hover Animation (Zoom image, show overlay)
    const imgElement = element.querySelector(`.${styles.galleryImage}`);
    const overlayElement = element.querySelector(`.${styles.overlay}`);
    const hoverTl = gsap.timeline({ paused: true })
        .to(imgElement, { scale: 1.1, duration: 0.5, ease: 'power2.out' }, 0)
        .to(overlayElement, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0);

    element.addEventListener('mouseenter', () => hoverTl.play());
    element.addEventListener('mouseleave', () => hoverTl.reverse());

    return () => {
       anim.scrollTrigger?.kill();
       anim.kill();
       hoverTl.kill();
    };

  }, [index]);

  const handleItemClick = () => {
    // Basic placeholder for lightbox functionality
    console.log("Open lightbox for:", imageSrc);
    // Here you would typically trigger a modal/lightbox component
    // passing the imageSrc and alt text.
  };

  return (
    <TiltWrapper
      ref={itemRef}
      className={styles.galleryItem}
      options={{ max: 8, scale: 1.03, speed: 500 }}
      onClick={handleItemClick}
    >
      <img src={imageSrc} alt={alt} className={styles.galleryImage} loading="lazy" />
      <div className={styles.overlay}>
        <FaExpandAlt className={styles.icon} />
        <span className={styles.overlayText}>View</span>
      </div>
    </TiltWrapper>
  );
};

export default GalleryItem;

