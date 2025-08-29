import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ARViewProvider } from '@/components/ar/ARViewManager';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlobalErrorBoundary from './GlobalErrorBoundary';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sirius Global Ventures',
  description: 'Transforming ideas into reality',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300`}>
        <ThemeProvider>
          <ARViewProvider>
            <GlobalErrorBoundary>
              <GoogleAnalytics />
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </GlobalErrorBoundary>
          </ARViewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
