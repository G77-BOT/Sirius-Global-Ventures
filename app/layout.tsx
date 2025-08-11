import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sirius Global Ventures - Corporate Excellence',
  description: 'Sirius Global Ventures is a holding company that builds, acquires, and grows innovative companies across multiple industries.',
  keywords: 'holding company, investments, corporate ventures, technology, innovation',
  authors: [{ name: 'Sirius Global Ventures' }],
  openGraph: {
    title: 'Sirius Global Ventures - Corporate Excellence',
    description: 'Building the future through strategic investments and innovative companies.',
    url: 'https://siriusglobalventures.com',
    siteName: 'Sirius Global Ventures',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
