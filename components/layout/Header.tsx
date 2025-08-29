'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { ThemeToggleButton } from '../ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Portfolio',
    href: '/portfolio',
    children: [
      { name: 'All Companies', href: '/portfolio' },
      { name: 'BotStream', href: '/companies/bostream' },
      { name: 'Investment Criteria', href: '/portfolio/criteria' },
    ]
  },
  { name: 'Leadership', href: '/leadership' },
  { 
    name: 'Investors',
    href: '/investor-relations',
    children: [
      { name: 'Overview', href: '/investor-relations' },
      { name: 'Performance', href: '/investor-relations/performance' },
      { name: 'Reports', href: '/investor-relations/reports' },
    ]
  },
  { name: 'Careers', href: '/careers' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      ref={headerRef}
      className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-blue-100 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-t border-blue-100 dark:border-gray-700 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <Link href="/ar" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                    <Sparkles className="w-5 h-5" />
                    <span>Experience in AR</span>
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <ThemeToggleButton />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">SGV</span>
              </div>
              <div className="hidden xs:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Sirius Global Ventures
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Corporate Excellence</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:space-x-2 xl:space-x-4">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                  onMouseEnter={() => item.children && setDropdownOpen(item.name)}
                  onMouseLeave={() => item.children && setDropdownOpen(null)}
                  onClick={() => setDropdownOpen(null)}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className="ml-1 h-4 w-4 flex-shrink-0" />
                  )}
                </Link>
                {item.children && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Theme Toggle */}
            <ThemeToggleButton />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (!mobileMenuOpen) {
                  setDropdownOpen(null);
                }
              }}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-screen' : 'max-h-0'
          }`}
          id="mobile-menu"
        >
          <div className="pt-2 pb-4 space-y-1 px-2">
            {navigation.map((item) => (
              <div key={item.name} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="flex flex-col">
                  <Link
                    href={item.href}
                    className="px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between"
                    onClick={(e) => {
                      if (item.children) {
                        e.preventDefault();
                        setDropdownOpen(dropdownOpen === item.name ? null : item.name);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown 
                        className={`h-5 w-5 transform transition-transform ${dropdownOpen === item.name ? 'rotate-180' : ''}`} 
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                  {item.children && (
                    <div 
                      className={`pl-4 space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${
                        dropdownOpen === item.name ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Theme Toggle */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Theme
              </span>
              <ThemeToggleButton />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
