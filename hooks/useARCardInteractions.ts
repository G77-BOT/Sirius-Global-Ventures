'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { useGesture } from '@use-gesture/react';
import * as THREE from 'three';

interface ARCardInteractionProps {
  initialScale?: number;
  hoverScale?: number;
  activeScale?: number;
  rotationIntensity?: number;
  positionIntensity?: number;
  springConfig?: {
    tension?: number;
    friction?: number;
  };
}

export function useARCardInteractions({
  initialScale = 1,
  hoverScale = 1.05,
  activeScale = 0.95,
  rotationIntensity = 0.1,
  positionIntensity = 0.01,
  springConfig = { tension: 300, friction: 15 },
}: ARCardInteractionProps = {}) {
  const ref = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const [{ scale, rotation, position }, api] = useSpring(
    () => ({
      scale: initialScale,
      rotation: [0, 0, 0],
      position: [0, 0, 0],
      config: springConfig,
    }),
    []
  );

  // Handle hover state
  const handlePointerOver = useCallback(() => {
    setIsHovered(true);
    api.start({
      scale: hoverScale,
      config: { ...springConfig, tension: 400 },
    });
  }, [api, hoverScale, springConfig]);

  const handlePointerOut = useCallback(() => {
    setIsHovered(false);
    setIsActive(false);
    api.start({
      scale: initialScale,
      rotation: [0, 0, 0],
      position: [0, 0, 0],
      config: springConfig,
    });
  }, [api, initialScale, springConfig]);

  // Handle click/press
  const handlePointerDown = useCallback(() => {
    setIsActive(true);
    api.start({
      scale: activeScale,
      config: { ...springConfig, tension: 500 },
    });
  }, [activeScale, api, springConfig]);

  const handlePointerUp = useCallback(() => {
    setIsActive(false);
    api.start({
      scale: isHovered ? hoverScale : initialScale,
      config: springConfig,
    });
  }, [api, hoverScale, initialScale, isHovered, springConfig]);

  // Gesture handling for 3D interactions
  const bind = useGesture(
    {
      onHover: ({ hovering }) => {
        if (hovering) {
          handlePointerOver();
        } else {
          handlePointerOut();
        }
      },
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onDrag: ({ active, movement: [mx, my], ...state }) => {
        if (active) {
          const rotationX = my * rotationIntensity * (Math.PI / 180);
          const rotationY = mx * rotationIntensity * (Math.PI / 180);
          
          api.start({
            rotation: [rotationX, rotationY, 0],
            position: [mx * positionIntensity, -my * positionIntensity, 0],
            immediate: true,
          });
        } else {
          // Return to original position when drag ends
          api.start({
            rotation: [0, 0, 0],
            position: [0, 0, 0],
            config: { ...springConfig, tension: 200 },
          });
        }
      },
    },
    {
      drag: {
        filterTaps: true,
        delay: 100,
      },
    }
  );

  // Auto-rotate when not interacting
  useEffect(() => {
    if (isHovered && !isActive) {
      let frameId: number;
      const animate = () => {
        if (ref.current) {
          ref.current.rotation.y += 0.005;
        }
        frameId = requestAnimationFrame(animate);
      };
      
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }
  }, [isHovered, isActive]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Reset position on resize to prevent visual glitches
      api.start({
        rotation: [0, 0, 0],
        position: [0, 0, 0],
        immediate: true,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [api]);

  return {
    ref,
    bind,
    isHovered,
    isActive,
    scale: scale as unknown as [number, number, number],
    rotation: rotation as unknown as [number, number, number],
    position: position as unknown as [number, number, number],
    // Animation props for Three.js objects
    animatedProps: {
      scale: scale as unknown as [number, number, number],
      rotation: rotation as unknown as [number, number, number],
      position: position as unknown as [number, number, number],
    },
  };
}
