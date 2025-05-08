// src/pages/GalleryPage.jsx
import React from 'react';
import styles from './GalleryPage.module.css'; // <<< Make sure this import is correct
import GalleryItem from '../components/UI/GalleryItem';
import AnimatedText from '../components/Animation/AnimatedText';

// Sample Image Data (replace with actual data/API)
const galleryImages = [
  { id: 'g1', src: 'https://i.imgur.com/1E4BV4Q.jpeg', alt: 'Artfully plated dish with microgreens' },
  { id: 'g2', src: 'https://i.imgur.com/u8AgBzn.jpeg', alt: 'Elegant restaurant interior shot' },
  { id: 'g3', src: 'https://i.imgur.com/ZjrxfaG.jpeg', alt: 'Close up of a colorful dessert' },
  { id: 'g4', src: 'https://i.imgur.com/JuABpDb.jpeg', alt: 'Cocktail with garnish on the bar' },
  { id: 'g5', src: 'https://i.imgur.com/YzsOSQ9.jpeg', alt: 'Chef plating food meticulously' },
  { id: 'g6', src: 'https://i.imgur.com/Kg06Qrj.jpeg', alt: 'Cozy corner seating in the restaurant' },
  { id: 'g7', src: 'https://i.imgur.com/7Nh3Fvr.jpeg', alt: 'Steaming main course dish' },
  { id: 'g8', src: 'https://i.imgur.com/6MQjTIB.jpeg', alt: 'Exterior view of the restaurant entrance' },
  // Add more images
];


const GalleryPage = () => {
  return (
    <div className={`${styles.galleryPage} section-padding`}>
      <div className="container">
        <AnimatedText type="chars" stagger={0.05} duration={1} ease="expo.out">
          <h1 className={styles.pageTitle}>Visual Feast</h1>
        </AnimatedText>
         <AnimatedText type="lines" delay={0.3}>
            <p className={styles.pageSubtitle}>A glimpse into our world of flavor and ambiance.</p>
         </AnimatedText>

        <div className={styles.galleryGrid}>
          {galleryImages.map((image, index) => (
            <GalleryItem
              key={image.id}
              imageSrc={image.src}
              alt={image.alt}
              index={index}
            />
          ))}
        </div>
      </div>
       {/* Add Lightbox/Modal component here if implemented */}
    </div>
  );
};

export default GalleryPage;

// << NO CSS CODE SHOULD BE HERE >>