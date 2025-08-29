'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-6">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We're sorry, but an unexpected error has occurred. Our team has been notified and we're working on fixing it.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto"
          >
            <RotateCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto"
          >
            Return home
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer mb-2">
              Error details
            </summary>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-800 dark:text-gray-200 overflow-auto max-h-60">
              <p className="font-mono break-words">{error.message}</p>
              {error.stack && (
                <pre className="mt-2 text-xs opacity-75 overflow-x-auto">
                  {error.stack}
                </pre>
              )}
              {error.digest && (
                <p className="mt-2 text-xs opacity-75">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
