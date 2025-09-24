'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export class ThreeUtils {
  static createParticleBackground(container: HTMLElement, options: {
    particleCount?: number;
    particleColor?: number;
    animationSpeed?: number;
  } = {}) {
    const { particleCount = 100, particleColor = 0xffffff, animationSpeed = 0.001 } = options;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particles
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: number[] = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
      
      velocities.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: particleColor,
      size: 2,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    camera.position.z = 10;

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i] * animationSpeed * 1000;
        positions[i + 1] += velocities[i + 1] * animationSpeed * 1000;
        positions[i + 2] += velocities[i + 2] * animationSpeed * 1000;

        // Wrap around edges
        if (positions[i] > 10) positions[i] = -10;
        if (positions[i] < -10) positions[i] = 10;
        if (positions[i + 1] > 10) positions[i + 1] = -10;
        if (positions[i + 1] < -10) positions[i + 1] = 10;
        if (positions[i + 2] > 10) positions[i + 2] = -10;
        if (positions[i + 2] < -10) positions[i + 2] = 10;
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleSystem.rotation.y += animationSpeed;
      
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      scene.remove(particleSystem);
      particles.dispose();
      material.dispose();
      renderer.dispose();
    };
  }

  static createFloatingGeometry(container: HTMLElement, options: {
    geometry?: 'box' | 'sphere' | 'torus';
    color?: number;
    wireframe?: boolean;
  } = {}) {
    const { geometry = 'torus', color = 0x00ff88, wireframe = false } = options;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    let mesh: THREE.Mesh;
    let geometryObj: THREE.BufferGeometry;

    switch (geometry) {
      case 'box':
        geometryObj = new THREE.BoxGeometry(2, 2, 2);
        break;
      case 'sphere':
        geometryObj = new THREE.SphereGeometry(1.5, 32, 32);
        break;
      case 'torus':
      default:
        geometryObj = new THREE.TorusGeometry(1, 0.4, 16, 100);
        break;
    }

    const material = new THREE.MeshBasicMaterial({ 
      color, 
      wireframe,
      transparent: true,
      opacity: 0.8
    });

    mesh = new THREE.Mesh(geometryObj, material);
    scene.add(mesh);

    camera.position.z = 5;

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      mesh.position.y = Math.sin(Date.now() * 0.001) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      scene.remove(mesh);
      geometryObj.dispose();
      material.dispose();
      renderer.dispose();
    };
  }

  static createWaveEffect(container: HTMLElement, options: {
    color?: number;
    amplitude?: number;
    frequency?: number;
  } = {}) {
    const { color = 0x0099ff, amplitude = 1, frequency = 0.01 } = options;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create plane geometry for wave effect
    const geometry = new THREE.PlaneGeometry(10, 10, 50, 50);
    const material = new THREE.MeshBasicMaterial({ 
      color, 
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.set(0, 5, 8);
    camera.lookAt(0, 0, 0);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * frequency;
      const positions = plane.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.5 + time) * amplitude + Math.cos(y * 0.5 + time) * amplitude;
      }

      plane.geometry.attributes.position.needsUpdate = true;
      plane.rotation.z += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      scene.remove(plane);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }
}

// React hook for Three.js scenes
export function useThreeScene(
  sceneSetup: (container: HTMLElement) => (() => void) | void,
  dependencies: any[] = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cleanup = sceneSetup(containerRef.current);
      return cleanup;
    }
  }, dependencies);

  return containerRef;
}

export default ThreeUtils;