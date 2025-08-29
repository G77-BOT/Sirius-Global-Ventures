'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { X, Expand, Minimize, Move3d } from 'lucide-react';
import { useARCard, useARViewer } from '@/hooks/useARInteractions';

// Dynamically import ARViewer with no SSR
const ARViewer = dynamic(() => import('./ARViewerNew'), { ssr: false });

interface ARCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  arEnabled?: boolean;
  modelUrl?: string;
  overlayContent?: React.ReactNode;
}

export default function ARCard({
  children,
  className = '',
  glowColor = 'rgba(59, 130, 246, 0.5)',
  arEnabled = false,
  modelUrl = '/models/company_logo.glb',
  overlayContent,
}: ARCardProps) {
  const {
    cardRef,
    mousePosition,
    isHovered,
    isExpanded,
    toggleExpand,
  } = useARCard();

  const {
    isViewerOpen: showARViewer,
    openViewer: handleARViewerOpen,
    closeViewer: handleARViewerClose,
  } = useARViewer();

  // Update glow color CSS variable
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--ar-glow', glowColor);
      cardRef.current.style.setProperty('--ar-shadow-color', glowColor);
    }
  }, [glowColor, cardRef]);

  const cardVariants = {
    initial: { 
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: `0 4px 20px ${glowColor.replace('0.5', '0.2')}`,
      zIndex: 1,
    },
    expanded: {
      scale: 1.02,
      boxShadow: `0 8px 40px ${glowColor.replace('0.5', '0.4')}`,
      zIndex: 50,
    },
    hover: {
      scale: 1.02,
      rotateX: (mousePosition.y - 0.5) * 10,
      rotateY: (mousePosition.x - 0.5) * 10,
      boxShadow: `0 8px 40px ${glowColor.replace('0.5', '0.4')}`,
    }
  };

  return (
    <div className="ar-container">
      <motion.div
        ref={cardRef}
        className={`ar-card ar-glow rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden transition-all duration-300 ${
          isExpanded 
            ? 'fixed inset-4 md:inset-12 lg:inset-24 xl:inset-32 z-[100]' 
            : 'cursor-pointer'
        } ${className}`}
        variants={cardVariants}
        initial="initial"
        animate={isExpanded ? "expanded" : "initial"}
        whileHover={!isExpanded ? "hover" : undefined}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        onClick={arEnabled ? () => handleARViewerOpen(modelUrl) : undefined}
      >
        <div className="relative z-10 h-full">
          {children}
          
          {/* Overlay content */}
          {overlayContent && (
            <div className="absolute inset-0 pointer-events-none">
              {overlayContent}
            </div>
          )}
          
          {/* Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-20">
            {arEnabled && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleARViewerOpen(modelUrl);
                }}
                className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
                aria-label="View in AR"
              >
                <Move3d className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
              aria-label={isExpanded ? 'Minimize' : 'Expand'}
            >
              {isExpanded ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Expand className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        
        {/* AR Corner Indicators */}
        {arEnabled && (
          <>
            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-white/40 rounded-tl" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-white/40 rounded-tr" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-white/40 rounded-bl" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-white/40 rounded-br" />
          </>
        )}
      </motion.div>

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
      
      {/* Overlay when expanded */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={toggleExpand}
        />
      )}
    </div>
  );
}
