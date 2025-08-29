'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
    
    // You can also log the error to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                variant="default"
                className="w-full sm:w-auto"
              >
                Try again
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Reload page
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mt-6 text-left">
                <summary className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer mb-2">
                  Error details
                </summary>
                <pre className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-800 dark:text-gray-200 overflow-auto max-h-60">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

// Higher-order component for easier usage in Next.js app directory
export const withErrorBoundary = (Component: React.ComponentType, Fallback?: ReactNode) => {
  return function WithErrorBoundary() {
    return (
      <ErrorBoundary fallback={Fallback}>
        <Component />
      </ErrorBoundary>
    );
  };
};
