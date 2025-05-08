// src/components/Animation/ParticleBackground.jsx
import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap'; // GSAPත් import කරගන්නවා animation වලට උදව්වක් ගන්න
import styles from './ParticleBackground.module.css';

// Function to create a soft particle texture
const createParticleTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 0,
    canvas.width / 2, canvas.height / 2, canvas.width / 2
  );
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)'); // Center color (adjust alpha)
  gradient.addColorStop(0.3, 'rgba(255, 215, 0, 0.5)'); // Soft gold middle (adjust alpha)
  gradient.addColorStop(1, 'rgba(255, 165, 0, 0)'); // Transparent edge (soft orange/gold)

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  return new THREE.CanvasTexture(canvas);
};

const ParticleBackground = () => {
  const mountRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const particleTexture = useMemo(() => createParticleTexture(), []); // Texture එක හදාගන්නවා

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    let width = currentMount.clientWidth;
    let height = currentMount.clientHeight;
    let animationFrameId;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100); // අඩු field of view එකක්
    camera.position.z = 3; // ಕ್ಯಾಮೆರාව ටිකක් ලං කරන්න
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Particles
    const particleCount = 150; // Particle ගණන අඩු කළා
    const positions = new Float32Array(particleCount * 3);
    const randomFactors = new Float32Array(particleCount * 3); // Random චලනයට

    const spread = 8; // කොච්චර දුරකට particles පැතිරෙනවද

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // X, Y, Z positions random විදියට දානවා
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread * 1.5; // Y අතට ටිකක් වැඩියෙන්
      positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.5; // Z අතට ටිකක් අඩුවෙන්

      // Animation එක random කරන්න factors ටිකක්
      randomFactors[i3] = Math.random() * 0.5 + 0.5; // Speed factor
      randomFactors[i3 + 1] = Math.random() * Math.PI * 2; // Phase offset for sine wave
      randomFactors[i3 + 2] = Math.random() * 0.5 + 0.5; // Sway amount factor
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('randomFactors', new THREE.BufferAttribute(randomFactors, 3)); // Random factors attribute

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.08, // Particle size (adjust as needed)
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending, // Glowing effect
      transparent: true,
      alphaMap: particleTexture, // Soft texture එක apply කරනවා
      // vertexColors: false // Texture එක නිසා color එක material එකෙන් දාන්න පුළුවන්
      color: '#FFD700' // Soft Gold Color (හෝ #FFA500 - Orange)
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse move listener
    const handleMouseMove = (event) => {
        // Mouse position එක normalize කරනවා (-1 to 1)
         mouse.current.x = (event.clientX / width) * 2 - 1;
         mouse.current.y = -(event.clientY / height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const positions = geometry.attributes.position.array;
      const randoms = geometry.attributes.randomFactors.array;

      // Camera movement based on mouse (Subtle)
      camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.current.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position); // Scene එක දිහා බලන්න

      // Animate particles
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const speed = randoms[i3];
        const phase = randoms[i3 + 1];
        const sway = randoms[i3 + 2];

        // Move particles up slowly
        positions[i3 + 1] += 0.005 * speed; // සෙමින් උඩට යනවා

        // Add horizontal sway using sine wave
        positions[i3] += Math.sin(elapsedTime * 0.5 * speed + phase) * 0.003 * sway;

        // If particle goes above the view, reset it to the bottom randomly
        if (positions[i3 + 1] > spread / 2 * 1.5) {
          positions[i3 + 1] = -spread / 2 * 1.5; // Reset to bottom
          positions[i3] = (Math.random() - 0.5) * spread; // Reset X position
        }
      }
      geometry.attributes.position.needsUpdate = true; // Tell Three.js to update positions

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      width = currentMount.clientWidth;
      height = currentMount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (currentMount && renderer.domElement) {
         try {
            currentMount.removeChild(renderer.domElement);
         } catch (e) {
             console.warn("Could not remove renderer DOM element on cleanup:", e);
         }
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose(); // Texture එකත් dispose කරන්න
      renderer.dispose();
    };
  }, [particleTexture]); // particleTexture වෙනස් වුනොත් effect එක re-run වෙනවා (ඒත් useMemo නිසා එහෙම වෙන්නේ නෑ)

  return <div ref={mountRef} className={styles.particleCanvas}></div>;
};

export default ParticleBackground;

/* src/components/Animation/ParticleBackground.module.css එක වෙනස් කරන්න අවශ්‍ය නෑ */
/* .particleCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
} */