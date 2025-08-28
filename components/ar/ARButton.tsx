'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ARButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  glowColor?: string;
}

export default function ARButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  glowColor = '#3b82f6'
}: ARButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = "relative overflow-hidden font-medium transition-all duration-300 rounded-xl border backdrop-blur-sm";
  
  const variantClasses = {
    primary: `bg-gradient-to-r from-blue-600/80 to-indigo-600/80 text-white border-blue-400/30 hover:from-blue-500/90 hover:to-indigo-500/90 shadow-lg hover:shadow-xl`,
    secondary: `bg-white/10 text-gray-900 dark:text-white border-white/20 hover:bg-white/20 hover:border-white/30`,
    ghost: `bg-transparent text-blue-600 dark:text-blue-400 border-blue-400/30 hover:bg-blue-400/10`
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const buttonVariants = {
  initial: {
    scale: 1,
    boxShadow: "0 2px 8px #3b82f630",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 4px 24px #3b82f6cc",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  tap: {
    scale: 0.98,
    boxShadow: "0 2px 4px #3b82f650",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 35,
    },
  },
};
  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled ? "hover" : "initial"}
      whileTap={!disabled ? "tap" : "initial"}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {/* AR Scan Line Effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-transform duration-1000 ${
          isPressed ? 'translate-x-full' : '-translate-x-full'
        }`}
        style={{ width: '50%' }}
      />
      
      {/* Holographic Border */}
      <div className="absolute inset-0 rounded-xl">
        <div 
          className="absolute inset-0 rounded-xl opacity-50"
          style={{
            background: `linear-gradient(45deg, ${glowColor}60, transparent, ${glowColor}60)`,
            backgroundSize: '200% 200%',
            animation: 'holographic-border 2s ease-in-out infinite'
          }}
        />
      </div>

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>

      {/* AR Corner Indicators */}
      <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-white/40 rounded-tl" />
      <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-white/40 rounded-tr" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-white/40 rounded-bl" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-white/40 rounded-br" />

      <style jsx>{`
        @keyframes holographic-border {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.button>
  );
}