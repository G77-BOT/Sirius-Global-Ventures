'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type ThemeMode = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ar-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(
    () => (localStorage.getItem(storageKey) as ThemeMode) || defaultTheme
  );
  
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const resolvedTheme = theme === 'system' 
    ? prefersDark ? 'dark' : 'light' 
    : theme;

  // Update the theme in localStorage and on the document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Clear previous theme classes
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    if (theme === 'system') {
      root.classList.add(resolvedTheme);
    } else {
      root.classList.add(theme);
    }
    
    // Save to localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, resolvedTheme, storageKey]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => {
      if (prev === 'system') return prefersDark ? 'light' : 'dark';
      return prev === 'dark' ? 'light' : 'dark';
    });
  };

  const value = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper hook for media queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}
