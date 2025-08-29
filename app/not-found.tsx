import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-6">
          <Button asChild size="lg">
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
