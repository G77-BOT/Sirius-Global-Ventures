'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import { Button } from './ui/button';
import { Moon, Sun, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const { themeName, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-full">
      <Button
        variant={themeName === 'light' ? 'default' : 'ghost'}
        size="icon"
        className="rounded-full h-8 w-8"
        onClick={() => setTheme('light')}
        aria-label="Light theme"
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={themeName === 'dark' ? 'default' : 'ghost'}
        size="icon"
        className="rounded-full h-8 w-8"
        onClick={() => setTheme('dark')}
        aria-label="Dark theme"
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={themeName === 'cyberpunk' ? 'default' : 'ghost'}
        size="icon"
        className="rounded-full h-8 w-8"
        onClick={() => setTheme('cyberpunk')}
        aria-label="Cyberpunk theme"
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  );
}
