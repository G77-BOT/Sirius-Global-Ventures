'use client';

import React, { useState, useRef, useCallback, useEffect, FC, ReactNode } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { X, Maximize2, Minimize2, Move3d, ArrowRight, Zap, Eye, EyeOff } from 'lucide-react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { useAR } from '@/contexts/ARContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useARCardInteractions } from '@/hooks/useARCardInteractions';
import { Group } from 'three';

// Define types for animation controls
interface AnimationControls {
  start: (animation: any) => void;
  stop: () => void;
}

type SpringConfig = {
  tension?: number;
  friction?: number;
  mass?: number;
  damping?: number;
  stiffness?: number;
  type?: 'spring' | 'tween' | 'inertia' | 'just';
};

// Define ARViewerEnhanced props interface
interface ARViewerEnhancedProps {
  modelUrl: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  onClose?: () => void;
  onError?: (error: Error) => void;
  onLoad?: () => void;
  className?: string;
  shadows?: boolean;
}

// Dynamically import ARViewer component with dynamic import (no SSR)
const ARViewerEnhanced = dynamic<ARViewerEnhancedProps>(
  () => import('./ARViewerEnhanced').then((mod) => mod.default),
  { 
    ssr: false, 
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }
);

interface ARCardEnhancedProps {
  title: string;
  description: string;
  modelUrl: string;
  imageUrl?: string;
  className?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  glowColor?: string;
  ambientLightIntensity?: number;
  directionalLightIntensity?: number;
  enableShadows?: boolean;
  enableAutoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  onViewInAR?: () => void;
  onClose?: () => void;
  onModelLoaded?: (model: THREE.Object3D) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  overlayContent?: React.ReactNode;
  showARButton?: boolean;
  showExpandButton?: boolean;
  showCloseButton?: boolean;
  initialExpanded?: boolean;
  animationConfig?: {
    hoverScale?: number;
    tapScale?: number;
    transition?: {
      type?: 'spring' | 'tween' | 'inertia' | 'just';
      stiffness?: number;
      damping?: number;
      mass?: number;
    };
  };
}

export const ARCardEnhanced: React.FC<ARCardEnhancedProps> = ({
  title,
  description,
  modelUrl,
  imageUrl,
  className = '',
  scale: initialScale = 1,
  position: initialPosition = [0, 0, 0],
  rotation: initialRotation = [0, 0, 0],
  glowColor = 'rgba(99, 102, 241, 0.6)',
  ambientLightIntensity = 0.5,
  directionalLightIntensity = 1,
  enableShadows = true,
  enableAutoRotate = true,
  enableZoom = true,
  enablePan = true,
  enableRotate = true,
  onViewInAR,
  onClose,
  onModelLoaded,
  children,
  style,
  overlayContent,
  showARButton = true,
  showExpandButton = true,
  showCloseButton = true,
  initialExpanded = false,
  animationConfig = {
    hoverScale: 1.05,
    tapScale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      mass: 0.5
    }
  },
  ...props
}) => {
  // Refs
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group>(null);
  const controls = useAnimation();
  
  // State for loading and error
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI state
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTapped, setIsTapped] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(initialExpanded);
  
  // Model transform state
  const [modelPosition, setModelPosition] = useState<[number, number, number]>(initialPosition);
  const [modelRotation, setModelRotation] = useState<[number, number, number]>(initialRotation);
  const [modelScale, setModelScale] = useState<number>(initialScale);
  
  // AR state
  const [showARViewer, setShowARViewer] = useState<boolean>(false);
  const [isARActive, setIsARActive] = useState<boolean>(false);
  const [arSessionStarted, setARSessionStarted] = useState<boolean>(false);
  const [isARLoading, setIsARLoading] = useState<boolean>(false);
  const [arError, setARError] = useState<string | null>(null);
  
  // Theme
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Check if AR is supported
  const isARSupported = typeof window !== 'undefined' && 
                       'xr' in navigator && 
                       navigator.xr && 
                       'isSessionSupported' in navigator.xr;
  
  // Toggle card expansion
  // AR context
  const { isARSupported: isARSupportedFromContext } = useAR();

  // Memoize spring config for animations
  const springConfig = useMemo(() => ({
    type: animationConfig?.transition?.type || 'spring',
    stiffness: animationConfig?.transition?.stiffness || 100,
    damping: animationConfig?.transition?.damping || 10,
    mass: animationConfig?.transition?.mass || 0.5
  }), [animationConfig]);

  // Handle AR view toggle
  const handleViewInAR = useCallback(async () => {
    if (!isARSupported) {
      setARError('AR is not supported on this device');
      return;
    }

    try {
      setIsARLoading(true);
      setShowARViewer(true);
      
      if (onViewInAR) {
        await onViewInAR();
      }
      
      setIsARActive(true);
      setARSessionStarted(true);
    } catch (error) {
      setARError(error instanceof Error ? error.message : 'Failed to start AR session');
      setShowARViewer(false);
      setIsARActive(false);
      setARSessionStarted(false);
    } finally {
      setIsARLoading(false);
    }
  }, [isARSupported, onViewInAR]);
    setIsARLoading(true);
    if (onViewInAR) onViewInAR();
  }, [onViewInAR]);

  const handleARViewerClose = useCallback(() => {
    setShowARViewer(false);
    setIsARActive(false);
    setARSessionStarted(false);
    if (onClose) onClose();
  }, [onClose]);

  // Handle AR session start/end
  const handleARStart = useCallback(() => {
    setIsARActive(true);
    setARSessionStarted(true);
    setIsARLoading(false);
  }, []);

  const handleAREnd = useCallback(() => {
    setIsARActive(false);
    setARSessionStarted(false);
    setShowARViewer(false);
  }, []);

  // Handle model loading
  const handleModelLoaded = useCallback((model: THREE.Object3D) => {
    try {
      // Update model position and rotation
      setModelPosition(initialPosition);
      setModelRotation(initialRotation);
      setModelScale(initialScale);
      
      // Call the onModelLoaded callback if provided
      if (onModelLoaded) {
        onModelLoaded(model);
      }
      
      // Set loading to false and clear any errors
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error handling model load:', err);
      setError(err instanceof Error ? err : new Error('Failed to load model'));
      setIsLoading(false);
    }
      
      // Set loading to false
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error handling model load:', err);
      setError(err instanceof Error ? err : new Error('Failed to load model'));
      setIsLoading(false);
    }
  }, [onModelLoaded]);

  // Handle model error
  const handleModelError = useCallback((err: Error) => {
    console.error('Error loading 3D model:', err);
    setIsLoading(false);
    setError(err);
  }, []);

  // Update glow effect on hover
  useEffect(() => {
    if (!cardRef.current) return;

    const updateGlow = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      cardRef.current.style.setProperty('--glow-x', `${x}px`);
      cardRef.current.style.setProperty('--glow-y', `${y}px`);
    };

    if (isHovered) {
      cardRef.current.addEventListener('mousemove', updateGlow);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', updateGlow);
      }
    };
  }, [isHovered]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Toggle hover state
  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
    controls.start({
      scale: animationConfig.hoverScale,
      transition: {
        type: 'spring',
        stiffness: animationConfig.transition?.stiffness || 300,
        damping: animationConfig.transition?.damping || 15,
        mass: animationConfig.transition?.mass || 0.5
      }
    });
  }, [controls, animationConfig]);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
    controls.start({
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: animationConfig.transition?.stiffness || 300,
        damping: animationConfig.transition?.damping || 15,
        mass: animationConfig.transition?.mass || 0.5
      }
    });
  }, [controls, animationConfig]);

  // Handle tap/click
  const handleTap = useCallback(() => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  }, [isExpanded]);

  // Card content
  const renderCardContent = () => (
    <div className="relative w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/80 to-transparent">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="flex space-x-2">
          {showARButton && isARSupported && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleARViewerOpen}
              className="p-2 rounded-full bg-indigo-600/80 hover:bg-indigo-500 text-white"
              aria-label="View in AR"
            >
              <Move3d size={16} />
            </motion.button>
          )}
          {showExpandButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleExpand}
              className="p-2 rounded-full bg-gray-700/80 hover:bg-gray-600 text-white"
              aria-label={isExpanded ? 'Minimize' : 'Expand'}
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </motion.button>
          )}
          {showCloseButton && isExpanded && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="p-2 rounded-full bg-red-600/80 hover:bg-red-500 text-white"
              aria-label="Close"
            >
              <X size={16} />
            </motion.button>
          )}
        </div>
      </div>

      {/* 3D Model Container */}
      <div className="relative flex-1 w-full overflow-hidden">
        {isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <div className="animate-pulse text-gray-400">Loading 3D model...</div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4 z-10">
            <div className="text-red-500 font-medium">Error loading model</div>
            <div className="text-sm text-gray-300 mt-2">{error.message}</div>
            <button
              onClick={() => {
                setError(null);
                setIsLoading(true);
              }}
              className="mt-4 px-4 py-2 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
        {showExpandButton && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleExpand}
            className="p-2 rounded-full bg-gray-700/80 hover:bg-gray-600 text-white"
            aria-label={isExpanded ? 'Minimize' : 'Expand'}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </motion.button>
        )}
        {showCloseButton && isExpanded && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
            className="p-2 rounded-full bg-red-600/80 hover:bg-red-500 text-white"
            aria-label="Close"
          >
            <X size={16} />
          </motion.button>
        )}
      </div>
        <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
        {children && <div className="mt-2">{children}</div>}
      </div>

      {/* Overlay Content */}
      {overlayContent && (
        <div className="absolute inset-0 pointer-events-none">
          {overlayContent}
        </div>
      )}

      {/* Glow Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            circle at var(--glow-x, 50%) var(--glow-y, 50%),
            var(--glow-color, rgba(99, 102, 241, 0.6)) 0%,
            transparent 70%
          )`,
          filter: 'blur(20px)',
          zIndex: -1,
        }}
      />
    </div>
  );

  return (
    <>
      <motion.div
        ref={cardRef}
        className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl 
          transition-all duration-300 group ${isExpanded ? 'w-full h-[80vh]' : 'w-full h-96'} ${className}`}
        style={{
          '--glow-color': glowColor,
          '--glow-size': '200px',
          '--glow-opacity': '0.3',
          ...style,
        } as React.CSSProperties}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onTap={handleTap}
        animate={controls}
        initial={false}
        layout
      >
        {renderCardContent()}
      </motion.div>

      {/* AR Viewer Modal */}
      {showARViewer && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleARViewerClose}
{{ ... }}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl h-[80vh] bg-gray-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleARViewerClose}
                  className="p-2 rounded-full bg-red-600/80 hover:bg-red-500 text-white"
                  aria-label="Close AR Viewer"
                >
                  <X size={20} />
                </motion.button>
              </div>
              
              <div className="w-full h-full">
                <ARViewerEnhanced
                  modelUrl={modelUrl}
                  scale={scale * 1.5}
                  position={position}
                  rotation={rotation}
                  autoRotate={true}
                  enableZoom={true}
                  enablePan={true}
                  enableRotate={true}
                  className="w-full h-full"
                />
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-black/70 text-white text-sm px-4 py-2 rounded-full">
                  {isARActive ? 'Move your device to explore in AR' : 'Tap the AR button to place in your space'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
          '--glow-blur': '50px',
          '--glow-x': '0px',
          '--glow-y': '0px',
        } as React.CSSProperties}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(
              circle at var(--glow-x) var(--glow-y),
              var(--glow-color) 0%,
              transparent calc(var(--glow-size) / 2)
            )`,
            filter: 'blur(var(--glow-blur))',
            opacity: isHovered ? 'var(--glow-opacity)' : '0',
            transition: 'opacity 0.3s ease',
          }}
          aria-hidden="true"
        />

        {/* Card content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900/80 to-transparent">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={toggleExpand}
                className="p-2 text-gray-300 hover:text-white transition-colors"
                aria-label={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              {onClose && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onClose) onClose();
                  }}
                  className="p-2 text-gray-300 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* 3D Model or Image Preview */}
          <div className="flex-1 relative">
            <div className="absolute inset-0">
              {showARViewer ? (
                <ARViewerEnhanced
                  modelUrl={modelUrl}
                  scale={scale}
                  position={position}
                  rotation={rotation}
                  onClose={handleARViewerClose}
                  className="w-full h-full"
                />
              ) : imageUrl ? (
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-center p-4">
                    <Move3d className="w-12 h-12 mx-auto text-gray-600 mb-2" />
                    <p className="text-gray-400">3D Model Preview</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={handleARViewerOpen}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg 
                  transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Move3d className="w-4 h-4 mr-2" />
                {isARSupported ? 'View in AR' : '3D Preview'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              {children && (
                <div className="flex space-x-2">
                  {React.Children.map(children, (child, index) => (
                    <div key={index} onClick={(e) => e.stopPropagation()}>
                      {child}
      <AnimatePresence>
        {showARViewer && !isARActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={handleARViewerClose}
          >
            <div 
              className="relative w-full max-w-4xl h-[80vh] rounded-xl overflow-hidden"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {modelUrl && (
                <ARViewer
                  modelUrl={modelUrl}
                  scale={cardScale * 1.5}
                  position={modelPosition}
                  rotation={modelRotation}
                  onClose={handleARViewerClose}
                  className="w-full h-full"
                />
              )}
              
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-gray-300 text-sm bg-black/50 inline-block px-3 py-1 rounded-full">
                  Drag to rotate • Scroll to zoom • Right-click to pan
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
