// src/hooks/useMagneticEffect.js
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function useMagneticEffect(strength = 0.4, distanceThreshold = 80) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let R = element.getBoundingClientRect();
    let x = R.left + R.width / 2;
    let y = R.top + R.height / 2;

    const handleMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const dx = mouseX - x;
        const dy = mouseY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < distanceThreshold) {
            // Inside threshold - apply magnetic effect
            gsap.to(element, {
                x: dx * strength,
                y: dy * strength,
                duration: 0.5, // Make it smooth
                ease: 'power3.out'
            });
        } else {
            // Outside threshold - return to original position
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)' // Snap back nicely
            });
        }
    };

    const handleResize = () => {
         R = element.getBoundingClientRect();
         x = R.left + R.width / 2;
         y = R.top + R.height / 2;
         // Reset position on resize if needed
         gsap.set(element, { x: 0, y: 0 });
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize); // Recalculate on resize

    // Initial calculation
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      // Kill any ongoing animations on unmount
      gsap.killTweensOf(element);
    };
  }, [strength, distanceThreshold]);

  return elementRef;
}

export default useMagneticEffect;