'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

export function useMousePosition(ref: React.RefObject<HTMLElement>) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { tension: 300, friction: 20 },
  }));

  // Update mouse position with spring animation
  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
    
    // Smoothly animate the position
    api.start({
      x: (x - 0.5) * 20, // Move element slightly with mouse
      y: (y - 0.5) * 20,
    });
  }, [ref, api]);

  // Handle mouse enter/leave with spring animations
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    api.start({
      scale: 1.05,
      config: { tension: 500, friction: 15 },
    });
  }, [api]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsActive(false);
    api.start({
      x: 0,
      y: 0,
      scale: 1,
      config: { tension: 500, friction: 20 },
    });
  }, [api]);

  // Handle mouse down/up for active states
  const handleMouseDown = useCallback(() => {
    setIsActive(true);
    api.start({
      scale: 0.95,
      config: { tension: 500, friction: 15 },
    });
  }, [api]);

  const handleMouseUp = useCallback(() => {
    setIsActive(false);
    api.start({
      scale: isHovered ? 1.05 : 1,
      config: { tension: 500, friction: 15 },
    });
  }, [api, isHovered]);

  // Set up event listeners
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', updateMousePosition);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    
    // Clean up
    return () => {
      element.removeEventListener('mousemove', updateMousePosition);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
    };
  }, [ref, updateMousePosition, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp]);

  // Update CSS variables for glow effect
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    element.style.setProperty('--mouse-x', `${mousePosition.x * 100}%`);
    element.style.setProperty('--mouse-y', `${mousePosition.y * 100}%`);
    element.style.setProperty('--ar-glow-intensity', isHovered ? '0.6' : '0.1');
    
    if (isActive) {
      element.style.setProperty('--ar-active-scale', '0.98');
    } else {
      element.style.setProperty('--ar-active-scale', '1');
    }
  }, [ref, mousePosition, isHovered, isActive]);

  // Enhanced gesture support for mobile
  const bind = useGesture({
    onHover: ({ hovering }) => {
      if (hovering) {
        handleMouseEnter();
      } else {
        handleMouseLeave();
      }
    },
    onDrag: ({ down, movement: [mx, my] }) => {
      api.start({
        x: down ? mx : 0,
        y: down ? my : 0,
        scale: down ? 0.97 : 1,
      });
    },
  });

  return { 
    mousePosition, 
    isHovered, 
    isActive,
    transform: {
      x,
      y,
      scale,
    },
    bind,
  };
}

export function useARCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { mousePosition, isHovered } = useMousePosition(cardRef);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return {
    cardRef,
    mousePosition,
    isHovered,
    isExpanded,
    toggleExpand,
  };
}

export function useARViewer() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [modelUrl, setModelUrl] = useState('');

  const openViewer = (url: string) => {
    setModelUrl(url);
    setIsViewerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return {
    isViewerOpen,
    modelUrl,
    openViewer,
    closeViewer,
  };
}
