'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import ARViewer with no SSR
const ARViewer = dynamic(() => import('./ARViewer'), { ssr: false });

interface ARButtonProps {
  modelUrl?: string;
  label?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: string;
  showIcon?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

export default function ARButton({
  modelUrl = '/models/company_logo.glb',
  label = 'View in AR',
  className = '',
  variant = 'default',
  size = 'md',
  glowColor = '#3b82f6',
  showIcon = true,
  fullWidth = false,
  onClick,
}: ARButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showARViewer, setShowARViewer] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Handle AR viewer open/close
  const handleARViewerOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowARViewer(true);
    document.body.style.overflow = 'hidden';
    if (onClick) onClick();
  };

  const handleARViewerClose = () => {
    setShowARViewer(false);
    document.body.style.overflow = 'auto';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Button variants
  const buttonVariants = {
    default: `bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700`,
    outline: `bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600/10`,
    ghost: `bg-transparent hover:bg-blue-600/10 text-blue-600`,
    link: `bg-transparent text-blue-600 hover:underline p-0 h-auto`,
  };

  // Size variants
  const sizeVariants = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-6',
  };

  // Glow effect styles
  const glowStyles = {
    '--glow-color': glowColor,
    '--glow-opacity': isHovered ? '0.5' : '0.2',
    '--glow-size': isHovered ? '100%' : '50%',
  } as React.CSSProperties;

  return (
    <>
      <motion.button
        ref={buttonRef}
        className={`relative overflow-hidden rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
          fullWidth ? 'w-full' : 'w-auto'
        } ${buttonVariants[variant]} ${sizeVariants[size]} ${className}`}
        style={glowStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleARViewerOpen}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${glowColor}20, transparent 70%)`,
            filter: 'blur(8px)',
          }}
        />

        {/* Button content */}
        {showIcon && (
          <motion.span 
            className="relative z-10"
            animate={isHovered ? { rotate: 15 } : { rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.span>
        )}
        <span className="relative z-10">{label}</span>

        {/* Shimmer effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: 'translateX(-100%) rotate(-30deg)',
            animation: isHovered ? 'shimmer 1.5s infinite' : 'none',
          }}
        />
      </motion.button>

      {/* AR Viewer Modal */}
      <AnimatePresence>
        {showARViewer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={handleARViewerClose}
          >
            <div className="relative w-full h-full max-w-6xl">
              <button
                className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleARViewerClose();
                }}
              >
                <span className="sr-only">Close AR Viewer</span>
                <X className="w-8 h-8" />
              </button>
              <ARViewer modelUrl={modelUrl} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(-30deg); }
          100% { transform: translateX(100%) rotate(-30deg); }
        }
      `}</style>
    </>
  );
}
