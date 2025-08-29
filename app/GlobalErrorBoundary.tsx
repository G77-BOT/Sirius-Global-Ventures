'use client';

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ErrorFallback({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error; 
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={resetErrorBoundary}
            className="w-full sm:w-auto"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function GlobalErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        // Log error to error reporting service
        console.error('Global error boundary caught:', error, info);
      }}
      onReset={() => {
        // Reset the state of your app so the error doesn't happen again
        console.log('Resetting error boundary');
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
