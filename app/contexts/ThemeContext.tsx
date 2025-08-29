'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeName = 'light' | 'dark' | 'cyberpunk';

type ThemeContextType = {
  themeName: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('light');

  // Set theme on initial load
  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem('theme') as ThemeName | null;
    
    // Remove all theme classes first
    root.classList.remove('light', 'dark', 'cyberpunk');
    
    // Set the theme from localStorage or default to light
    const initialTheme = savedTheme || 'light';
    root.classList.add(initialTheme);
    setThemeName(initialTheme);
    
    // Listen for system color scheme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (!savedTheme) {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark', 'cyberpunk');
        root.classList.add(newTheme);
        setThemeName(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = (theme: ThemeName) => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'cyberpunk');
    
    // Add the new theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    setThemeName(theme);
  };

  return (
    <ThemeContext.Provider value={{ themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export type { ThemeName };
