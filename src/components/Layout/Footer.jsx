// src/components/Layout/Footer.jsx
import React from 'react';
import styles from './Footer.module.css'; // Make sure this import is correct
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; // Example social media icons

const Footer = () => {
  // Get the current year automatically
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContent} container`}> {/* Use container for centering and padding */}
        <div className={styles.footerColumns}>

            {/* Column 1: Info/Logo */}
            <div className={styles.footerColumn}>
                {/* You can use text or an actual logo image here */}
                <h4 className={styles.footerLogo}>
                    Restau<span className={styles.logoHighlight}>rant</span> {/* Example Text Logo */}
                </h4>
                <p>Experience culinary excellence and unparalleled ambiance.</p>
                <p>123 Culinary Avenue, Flavor Town, FT 54321</p> {/* Example Address */}
            </div>

             {/* Column 2: Quick Links */}
             <div className={styles.footerColumn}>
                <h5 className={styles.columnTitle}>Quick Links</h5>
                <ul className={styles.linkList}>
                    {/* Use NavLink from react-router-dom if you want active styling, otherwise regular <a> */}
                    <li><a href="/">Home</a></li>
                    <li><a href="/menu">Menu</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/gallery">Gallery</a></li>
                    <li><a href="/reservation">Reservations</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
             </div>

              {/* Column 3: Social Media & Hours (Example) */}
             <div className={styles.footerColumn}>
                <h5 className={styles.columnTitle}>Follow Us</h5>
                <div className={styles.socialIcons}>
                    {/* Replace # with your actual social media links */}
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                </div>
                 {/* Optional: Add operating hours */}
                <h5 className={`${styles.columnTitle} ${styles.hoursTitle}`}>Hours</h5>
                <p>Mon - Fri: 11am - 10pm</p>
                <p>Sat - Sun: 10am - 11pm</p>
             </div>

        </div>

        {/* Bottom bar with copyright */}
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Your Restaurant Name. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;