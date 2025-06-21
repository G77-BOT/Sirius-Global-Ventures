import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">CryptoBostream</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome to CryptoBostream</h2>
            <p className="mb-4">Your crypto streaming platform is being served by Next.js</p>
            
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Link 
                href="/api/subsidiaries" 
                className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium mb-2">Subsidiaries API</h3>
                <p className="text-gray-600">View all subsidiaries</p>
              </Link>
              
              <Link 
                href="/api/news" 
                className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium mb-2">News API</h3>
                <p className="text-gray-600">View all news</p>
              </Link>
              
              <Link 
                href="/api/values" 
                className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium mb-2">Values API</h3>
                <p className="text-gray-600">View company values</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
