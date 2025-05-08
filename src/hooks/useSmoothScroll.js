// src/hooks/useSmoothScroll.js
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check if window is defined (for SSR compatibility, though less relevant in Vite client-side)
    if (typeof window !== 'undefined') {
       const lenis = new Lenis({
         duration: 1.2,
         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
         direction: 'vertical',
         gestureDirection: 'vertical',
         smooth: true,
         mouseMultiplier: 1,
         smoothTouch: false,
         touchMultiplier: 2,
         infinite: false,
       });
       lenisRef.current = lenis;

       function raf(time) {
         lenis.raf(time);
         requestAnimationFrame(raf);
       }

       requestAnimationFrame(raf);

       // Clean up on component unmount
       return () => {
         lenis.destroy();
         lenisRef.current = null;
       };
    }
  }, []);

  return lenisRef; // Optionally return the lenis instance if needed elsewhere
}

export default useSmoothScroll;