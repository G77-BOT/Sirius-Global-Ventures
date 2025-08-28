'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ARStatsProps {
  stats: Array<{
    label: string;
    value: string;
    description?: string;
    icon?: React.ComponentType<any>;
    color?: string;
  }>;
  className?: string;
}

export default function ARStats({ stats, className = '' }: ARStatsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('ar-stats');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      id="ar-stats"
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        const color = stat.color || '#3b82f6';
        
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative group"
          >
            {/* AR Card Container */}
            <div className="relative overflow-hidden backdrop-blur-sm bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-2xl p-6 hover:bg-white/20 dark:hover:bg-gray-900/30 transition-all duration-300">
              
              {/* Holographic Background Effect */}
              <div 
                className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${color}30 0%, transparent 70%)`,
                }}
              />
              
              {/* AR Scan Lines */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent group-hover:animate-pulse" />
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent group-hover:animate-pulse" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                {IconComponent && (
                  <div className="mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <IconComponent 
                        className="w-6 h-6" 
                        style={{ color }}
                      />
                    </div>
                  </div>
                )}

                {/* Value with Counter Animation */}
                <motion.div
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                  transition={{ 
                    delay: index * 0.1 + 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                {stat.description && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </div>
                )}
              </div>

              {/* AR Corner Indicators */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-blue-400/40 rounded-tl" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-blue-400/40 rounded-tr" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-blue-400/40 rounded-bl" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-blue-400/40 rounded-br" />

              {/* Holographic Border Animation */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div 
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(45deg, ${color}40, transparent, ${color}40)`,
                    backgroundSize: '200% 200%',
                    animation: 'holographic 3s ease-in-out infinite'
                  }}
                />
              </div>
            </div>

            {/* AR Data Stream Effect */}
            <div className="absolute -top-2 -right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-full bg-blue-400/60 rounded-full animate-ping" />
              <div className="absolute inset-0 w-full h-full bg-blue-400 rounded-full animate-pulse" />
            </div>
          </motion.div>
        );
      })}

      <style jsx>{`
        @keyframes holographic {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  );
}