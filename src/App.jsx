// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Global Styles
import './styles/global.css';

// Layout
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ReservationPage from './pages/ReservationPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

// Hooks & Components
import useSmoothScroll from './hooks/useSmoothScroll';
import ParticleBackground from './components/Animation/ParticleBackground';
// import CustomCursor from './components/Animation/CustomCursor'; // Optional

// Register GSAP Plugin (Ensure it's done once)
gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  // Initialize smooth scrolling
  useSmoothScroll();
  const location = useLocation();

  // Optional: Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
     // Refresh ScrollTrigger on route change to recalculate positions
     ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <>
      {/* Optional: Custom cursor component */}
      {/* <CustomCursor /> */}

      {/* Particle background (can be placed here or within specific pages like Home) */}
      {/* Consider performance implications of having it on every page */}
      {/* <ParticleBackground /> */}

      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Add a 404 Not Found Route */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router basename="/rest-demo">
      <AppContent />
    </Router>
  );
}

export default App;