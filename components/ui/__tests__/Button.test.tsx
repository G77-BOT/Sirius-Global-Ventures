import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from '../button';

describe('Button Component', () => {
  it('renders button with default variant and size', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('text-primary-foreground');
    expect(button).toHaveClass('h-10');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
  });

  it('applies the correct variant classes', () => {
    const { rerender } = render(<Button variant="outline">Outline</Button>);
    const outlineButton = screen.getByRole('button', { name: /outline/i });
    expect(outlineButton).toHaveClass('border');
    expect(outlineButton).toHaveClass('border-input');
    expect(outlineButton).toHaveClass('bg-background');

    rerender(<Button variant="destructive">Destructive</Button>);
    const destructiveButton = screen.getByRole('button', { name: /destructive/i });
    expect(destructiveButton).toHaveClass('bg-destructive');
    expect(destructiveButton).toHaveClass('text-destructive-foreground');
  });

  it('applies the correct size classes', () => {
    render(<Button size="sm">Small</Button>);
    const smallButton = screen.getByRole('button', { name: /small/i });
    expect(smallButton).toHaveClass('h-9');
    expect(smallButton).toHaveClass('rounded-md');
    expect(smallButton).toHaveClass('px-3');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a link when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );
    
    const link = screen.getByRole('link', { name: /link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveClass('inline-flex');
    expect(link).toHaveClass('items-center');
    expect(link).toHaveClass('justify-center');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button', { name: /custom/i });
    expect(button).toHaveClass('custom-class');
  });

  it('renders with an icon when children is provided with icon prop', () => {
    const { container } = render(
      <Button>
        <span data-testid="button-icon">+</span>
        <span>Add Item</span>
      </Button>
    );
    
    expect(screen.getByTestId('button-icon')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="button-icon"]')).toHaveTextContent('+');
  });

  it('disables the button when disabled is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
    expect(button).toHaveClass('disabled:pointer-events-none');
  });
});
