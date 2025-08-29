'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ErrorBoundaryTestPage() {
  const [error, setError] = useState<boolean>(false);

  const throwError = () => {
    // This will be caught by the error boundary
    setError(true);
  };

  if (error) {
    // Simulate a runtime error
    throw new Error('This is a test error to check the error boundary');
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Error Boundary Test
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          This page tests the error boundary implementation. Clicking the button below will trigger an error that should be caught by the error boundary.
        </p>
        <div className="space-y-4">
          <Button 
            onClick={throwError}
            variant="destructive"
            className="w-full sm:w-auto"
          >
            Trigger Error
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Note: In development mode, you'll see the Next.js error overlay first. 
            Close it to see the custom error boundary.
          </p>
        </div>
      </div>
    </div>
  );
}

// Add metadata for the page
export const metadata = {
  title: 'Error Boundary Test | Sirius Global Ventures',
  description: 'Test page for error boundary implementation',
};
