'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center">
        <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </div>
    );
  }

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const;

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-1 bg-white dark:bg-gray-800">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`
              flex items-center justify-center w-8 h-8 rounded-md transition-colors
              ${theme === value 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
            title={label}
            aria-label={`Switch to ${label} theme`}
            data-testid={`theme-toggle-${value}`}
          >
            {value === 'light' ? (
              <Sun data-testid="sun-icon" className="w-4 h-4" />
            ) : value === 'dark' ? (
              <Moon data-testid="moon-icon" className="w-4 h-4" />
            ) : (
              <Monitor data-testid="monitor-icon" className="w-4 h-4" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ThemeToggleButton() {
  const { theme, setTheme, actualTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center">
        <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </button>
    );
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return Monitor;
    }
    return actualTheme === 'dark' ? Moon : Sun;
  };

  const Icon = getIcon();

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-800"
      title={`Current theme: ${theme}. Click to cycle through themes.`}
      aria-label="Toggle theme"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
