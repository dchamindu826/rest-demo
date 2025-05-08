// src/components/Layout/Header.jsx
import React, { useState, useEffect } from 'react'; // useState, useEffect import කරන්න
import { NavLink, useLocation } from 'react-router-dom'; // useLocation එකතු කරන්න mobile menu එක close කරන්න
import styles from './Header.module.css'; // CSS Module import කරන්න
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger සහ Close icons import කරන්න (npm install react-icons)

const Header = () => {
  // Mobile menu එක open ද close ද කියලා තියාගන්න state එකක්
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Page එක change වෙනවද බලන්න

  // Mobile menu එක open/close කරන function එක
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Page එක change වෙනකොට mobile menu එක auto close කරන්න
  useEffect(() => {
    setIsMobileMenuOpen(false); // Route එක වෙනස් වෙනකොට menu එක close කරනවා
  }, [location.pathname]); // location path එක වෙනස් වෙනකොට run වෙනවා

  // Body scroll එක lock/unlock කරන්න (Optional - menu open වෙනකොට background එක scroll වෙන එක නවත්තන්න)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'; // Menu open නම් body scroll නවත්වනවා
    } else {
      document.body.style.overflow = 'unset'; // Menu close නම් body scroll enable කරනවා
    }
    // Component එක unmount වෙනකොටත් overflow එක unset කරනවා
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]); // isMobileMenuOpen state එක වෙනස් වෙනකොට run වෙනවා


  return (
    // Header එකට class එකක් දානවා menu open ද කියලා දැනගන්න (optional - CSS වලට ඕන නම්)
    <header className={`${styles.header} ${isMobileMenuOpen ? styles.menuOpen : ''}`}>
      <div className={`${styles.headerContent} container`}> {/* Global container class එක use කරනවා */}
        <NavLink to="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}> {/* Logo click කරාමත් menu close වෙන්න */}
          Restau<span className={styles.logoHighlight}>rant</span>
        </NavLink>

        {/* --- Desktop Navigation (Mobile වලදී hide වෙනවා CSS වලින්) --- */}
        <nav className={styles.nav}>
          <ul>
            <li><NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Home</NavLink></li>
            <li><NavLink to="/menu" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Menu</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>About</NavLink></li>
            <li><NavLink to="/gallery" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Gallery</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Contact</NavLink></li>
            <li className={styles.reservationLink}>
                <NavLink to="/reservation" className={styles.reserveButton}>
                    Reserve
                </NavLink>
            </li>
          </ul>
        </nav>

        {/* --- Hamburger Icon (Mobile වලදී විතරක් පේනවා CSS වලින්) --- */}
        <button className={styles.hamburgerIcon} onClick={toggleMobileMenu} aria-label="Toggle menu">
          {/* Menu එක open නම් 'X' icon එක, close නම් ඉරි 3 icon එක */}
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* --- Mobile Menu Container --- */}
        {/* state එක අනුව 'open' class එක add/remove කරනවා CSS වලින් show/hide/animate කරන්න */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
          {/* Mobile menu එක ඇතුලේ තියෙන Close button එක */}
          <button className={styles.closeIcon} onClick={toggleMobileMenu} aria-label="Close menu">
            <FaTimes />
          </button>
          {/* Mobile navigation links */}
          <nav>
            <ul>
               {/* Link එකක් click කරාම toggleMobileMenu function එක call කරලා menu එක close කරනවා */}
              <li><NavLink to="/" onClick={toggleMobileMenu}>Home</NavLink></li>
              <li><NavLink to="/menu" onClick={toggleMobileMenu}>Menu</NavLink></li>
              <li><NavLink to="/about" onClick={toggleMobileMenu}>About</NavLink></li>
              <li><NavLink to="/gallery" onClick={toggleMobileMenu}>Gallery</NavLink></li>
              <li><NavLink to="/contact" onClick={toggleMobileMenu}>Contact</NavLink></li>
              <li><NavLink to="/reservation" className={styles.mobileReserveButton} onClick={toggleMobileMenu}>Reserve Table</NavLink></li>
            </ul>
          </nav>
        </div>

         {/* Optional: Menu එක open වුනාම background එක dim කරන්න overlay එකක් */}
         {/* Overlay එක click කරාමත් menu එක close වෙනවා */}
         {isMobileMenuOpen && <div className={styles.menuOverlay} onClick={toggleMobileMenu}></div>}

      </div>
    </header>
  );
};

export default Header;