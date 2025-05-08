// src/pages/MenuPage.jsx
import React from 'react';
import styles from './MenuPage.module.css';
import MenuItemCard from '../components/UI/MenuItemCard';
import AnimatedText from '../components/Animation/AnimatedText';

// Sample Data (replace with API fetch)
const menuData = {
  appetizers: [
    { id: 1, name: 'Crimson Tartare', description: 'Finely diced prime beef, quail egg, caper berries, subtle spice.', price: 22.00, imageUrl: 'https://i.imgur.com/nQktprB.jpeg' },
    { id: 2, name: 'Ocean Jewels', description: 'Seared scallops, cauliflower purée, golden raisin vinaigrette.', price: 26.00, imageUrl: 'https://i.imgur.com/MooZPKP.jpeg' },
    { id: 3, name: 'Gilded Beetroot Carpaccio', description: 'Thinly sliced beets, goat cheese mousse, pistachio dust, balsamic glaze.', price: 18.00, imageUrl: 'https://i.imgur.com/lPuhRGm.jpeg' },
  ],
  mainCourses: [
    { id: 4, name: 'Embered Lamb Rack', description: 'Herb-crusted lamb, potato gratin, seasonal vegetables, rosemary jus.', price: 45.00, imageUrl: 'https://i.imgur.com/zIx7QS3.jpeg' },
    { id: 5, name: 'Pan-Seared Sea Bass', description: 'Crispy skin sea bass, saffron risotto, asparagus tips, lemon butter sauce.', price: 38.00, imageUrl: 'https://i.imgur.com/g3F9dx6.jpeg' },
    { id: 6, name: 'Wild Mushroom Vol-au-vent', description: 'Puff pastry filled with creamy wild mushrooms, truffle oil essence.', price: 32.00, imageUrl: 'https://i.imgur.com/VYtqQ7O.jpeg' },
  ],
  desserts: [
     { id: 7, name: 'Chocolate Sphere', description: 'Dark chocolate sphere, molten lava center, berry coulis, vanilla bean ice cream.', price: 16.00, imageUrl: 'https://i.imgur.com/9pHR34X.jpeg' },
     { id: 8, name: 'Deconstructed Lemon Tart', description: 'Lemon curd, meringue shards, sable crumble, citrus segments.', price: 14.00, imageUrl: 'https://i.imgur.com/UjxlCAL.jpeg' },
  ]
};

const MenuPage = () => {
  return (
    <div className={`${styles.menuPage} section-padding`}>
      <div className="container">
        <AnimatedText type="chars" stagger={0.05} duration={1} ease="expo.out">
          <h1 className={styles.pageTitle}>Our Menu</h1>
        </AnimatedText>
        <AnimatedText type="lines" delay={0.3}>
            <p className={styles.pageSubtitle}>A symphony of flavors crafted with passion.</p>
        </AnimatedText>


        {Object.entries(menuData).map(([category, items]) => (
          <section key={category} className={styles.menuCategory}>
            <AnimatedText type="words" delay={0.5} >
                <h2 className={styles.categoryTitle}>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
             </AnimatedText>
            <div className={styles.menuGrid}>
              {items.map((item, index) => (
                <MenuItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;

