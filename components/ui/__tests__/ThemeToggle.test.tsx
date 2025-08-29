import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';
// Mock the useTheme hook
jest.mock('../../providers/ThemeProvider', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    setTheme: jest.fn(),
    actualTheme: 'light',
  })),
}));

describe('ThemeToggle', () => {
  it('renders all theme toggle buttons', () => {
    render(<ThemeToggle />);
    expect(screen.getByTestId('theme-toggle-light')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle-dark')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle-system')).toBeInTheDocument();
  });

  it('renders the correct icons', () => {
    render(<ThemeToggle />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });
});
