'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { use } from 'react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CareerDetailPage({ params }: PageProps) {
  const { id } = use(params);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/careers" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Careers
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Career Details
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Job ID: {id}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            This page will show detailed information about the specific job posting.
          </p>
        </div>
      </div>
    </div>
  );
}