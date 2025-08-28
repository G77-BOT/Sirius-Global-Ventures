'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ARCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  interactive?: boolean;
}

export default function ARCard({ 
  children, 
  className = '', 
  glowColor = '#3b82f6',
  intensity = 0.5,
  interactive = true 
}: ARCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };

    if (interactive && isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive, isHovered]);

  const cardVariants = {
    initial: { 
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: `0 4px 20px ${glowColor}20`
    },
    hover: {
      scale: interactive ? 1.02 : 1,
      rotateX: interactive ? (mousePosition.y - 0.5) * 10 : 0,
      rotateY: interactive ? (mousePosition.x - 0.5) * 10 : 0,
      boxShadow: `0 8px 40px ${glowColor}40`,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden backdrop-blur-sm bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-2xl ${className}`}
      variants={cardVariants}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* AR Glow Effect */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${glowColor}40 0%, transparent 70%)`,
          transition: 'background 0.3s ease'
        }}
      />
      
      {/* Holographic Border Effect */}
      <div className="absolute inset-0 rounded-2xl">
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(45deg, ${glowColor}30, transparent, ${glowColor}30)`,
            backgroundSize: '200% 200%',
            animation: 'holographic 3s ease-in-out infinite'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>

      {/* AR Corner Indicators */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-blue-400/60 rounded-tl-lg" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-blue-400/60 rounded-tr-lg" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-blue-400/60 rounded-bl-lg" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-blue-400/60 rounded-br-lg" />

      <style jsx>{`
        @keyframes holographic {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  );
}