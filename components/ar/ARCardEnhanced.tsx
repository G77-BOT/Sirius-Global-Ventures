'use client';

import React, { useState, useRef, useCallback, useEffect, ReactNode, CSSProperties } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { X, Maximize2, Minimize2, Move3d } from 'lucide-react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { Group } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { useAR } from '@/contexts/ARContext';
import { useTheme } from '@/contexts/ThemeContext';

type Vector3 = [number, number, number];

interface AnimationConfig {
  hoverScale?: number;
  tapScale?: number;
  transition?: {
    type?: 'spring' | 'tween' | 'inertia' | 'just';
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

const defaultAnimationConfig: AnimationConfig = {
  hoverScale: 1.05,
  tapScale: 0.98,
  transition: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
    mass: 0.5
  }
};

/**
 * Props for the ARCardEnhanced component
 */
interface ARCardEnhancedProps {
  /** Card title */
  title: string;
  /** Optional card description */
  description?: string;
  /** URL to the 3D model (GLB/GLTF format) */
  modelUrl: string;
  /** Optional image URL to display as fallback */
  imageUrl?: string;
  /** Additional CSS classes */
  className?: string;
  /** Initial scale of the 3D model */
  scale?: number;
  /** Position of the 3D model [x, y, z] */
  position?: Vector3;
  /** Rotation of the 3D model [x, y, z] in radians */
  rotation?: Vector3;
  /** Callback when the AR view is requested */
  onViewInAR?: () => void;
  /** Callback when the card is closed */
  onClose?: () => void;
  /** Callback when the 3D model is loaded */
  onModelLoaded?: (model: Group) => void;
  /** Additional content to render inside the card */
  children?: ReactNode;
  /** Inline styles */
  style?: CSSProperties;
  /** Whether to show the AR button */
  showARButton?: boolean;
  /** Whether to show the expand button */
  showExpandButton?: boolean;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Whether the card is initially expanded */
  initialExpanded?: boolean;
  /** Animation configuration */
  animationConfig?: AnimationConfig;
}


interface ModelProps {
  url: string;
  scale?: number;
  position?: Vector3;
  rotation?: Vector3;
  onLoad?: (model: Group) => void;
  onError?: (error: Error) => void;
}

const Model: React.FC<ModelProps> = ({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onLoad,
  onError
}) => {
  const { scene } = useGLTF(url, undefined, undefined, (e) => {
    if (e instanceof Error) onError?.(e);
  });
  
  useEffect(() => {
    if (scene) {
      // Create a new group and add the cloned scene to it
      const group = new THREE.Group();
      const model = scene.clone();
      group.add(model);
      
      // Set initial position, rotation, and scale
      group.position.set(...position);
      group.rotation.set(...rotation);
      group.scale.set(scale, scale, scale);
      
      // Notify parent that model is loaded
      onLoad?.(group);
    }
  }, [scene, onLoad, position, rotation, scale]);

  if (!scene) return null;
  
  // Create a group to properly handle the model
  return (
    <group scale={[scale, scale, scale]} position={position} rotation={rotation}>
      <primitive object={scene} />
    </group>
  );
};

const ARCardEnhanced: React.FC<ARCardEnhancedProps> = ({
  title,
  description,
  modelUrl,
  className = '',
  scale: initialScale = 1,
  position: initialPosition = [0, 0, 0],
  rotation: initialRotation = [0, 0, 0],
  onViewInAR,
  onClose,
  onModelLoaded,
  children,
  style,
  showARButton = true,
  showExpandButton = true,
  showCloseButton = true,
  initialExpanded = false,
  animationConfig = defaultAnimationConfig,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showARViewer, setShowARViewer] = useState(false);
  const [model, setModel] = useState<Group | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useRef<any>(null);
  const { isARSupported, launchAR } = useAR();

  const handleModelLoaded = useCallback((loadedModel: unknown) => {
    const model = loadedModel as THREE.Group;
    if (model && model.isGroup) {
      setModel(model);
      setIsLoading(false);
      onModelLoaded?.(model);
    } else {
      console.error('Loaded model is not a Group:', loadedModel);
      setError('Invalid model format');
      setIsLoading(false);
    }
  }, [onModelLoaded]);

  const handleModelError = useCallback((error: Error) => {
    console.error('Error loading model:', error);
    setError('Failed to load 3D model');
    setIsLoading(false);
  }, []);

  const handleViewInAR = useCallback(() => {
    onViewInAR?.();
    isARSupported ? launchAR(modelUrl) : setShowARViewer(true);
  }, [isARSupported, launchAR, modelUrl, onViewInAR]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg ${className}`}
      style={style}
      initial={{ scale: 1 }}
      whileHover={{ scale: animationConfig.hoverScale || 1.05 }}
      whileTap={{ scale: animationConfig.tapScale || 0.98 }}
      transition={animationConfig.transition}
      {...props}
    >
      <div className="relative w-full h-64">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <Suspense fallback={null}>
            <Model 
              url={modelUrl}
              scale={initialScale}
              position={initialPosition}
              rotation={initialRotation}
              onLoad={handleModelLoaded}
              onError={handleModelError}
            />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
        
        {showARButton && (
          <button
            onClick={handleViewInAR}
            className="absolute top-4 right-4 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700"
            aria-label="View in AR"
          >
            <Move3d size={20} />
          </button>
        )}
        
        {showExpandButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white"
          >
            {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        )}
        
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-16 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default ARCardEnhanced;
