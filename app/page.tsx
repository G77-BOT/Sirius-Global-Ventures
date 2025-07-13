import Link from 'next/link';
import React from 'react';
import { ArrowRight, TrendingUp, Shield, Globe, ChevronRight, ExternalLink } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">SGV</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Sirius Global Ventures
                </h1>
                <p className="text-xs text-gray-500">Corporate Excellence</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                About
              </Link>
              <Link href="#companies" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Our Companies
              </Link>
              <Link href="#news" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                News
              </Link>
              <Link href="/admin/news" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Admin
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Building Tomorrow's{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Leaders
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed mb-8">
              Sirius Global Ventures is a holding company that builds, acquires, and grows innovative companies 
              across multiple industries. We partner with visionary entrepreneurs to create lasting value.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="#companies"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore Our Portfolio
                <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-base font-medium rounded-xl text-blue-600 bg-white hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-10 blur-3xl"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Corporate Excellence Through Innovation
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe in the power of innovation to drive sustainable growth and create meaningful impact across industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-200 hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Strategic Growth</h4>
              <p className="text-gray-600">
                We identify and nurture high-potential companies, providing the resources and expertise needed for sustainable expansion.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:border-purple-200 transition-all duration-200 hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Operational Excellence</h4>
              <p className="text-gray-600">
                Our experienced team brings decades of operational expertise to help portfolio companies achieve their full potential.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:border-green-200 transition-all duration-200 hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Global Vision</h4>
              <p className="text-gray-600">
                We think globally while acting locally, building companies that can compete and thrive in international markets.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Companies Section */}
      <section id="companies" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Our Portfolio Companies
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're proud to support innovative companies that are shaping the future across multiple industries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bostream - Featured Company */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-bl-full opacity-50"></div>
              <div className="relative p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">BS</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Botstream
                    </h4>
                    <p className="text-blue-600 font-medium">Crypto Trading Platform</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Advanced cryptocurrency trading platform featuring real-time data streaming, 
                  professional analytics, and institutional-grade security for modern traders.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">&lt;10ms</div>
                    <div className="text-sm text-gray-600">Latency</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Link
                    href="/api/subsidiaries/1"
                    className="inline-flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform"
                  >
                    Learn More
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                  <a
                    href="https://bostream.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Visit Site
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Future Company Placeholder */}
            <div className="bg-white/60 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-xl flex items-center justify-center mb-6">
                <span className="text-4xl">+</span>
              </div>
              <h4 className="text-xl font-bold text-gray-500 mb-4">Next Innovation</h4>
              <p className="text-gray-400 mb-6">
                We're always looking for the next breakthrough company to join our portfolio. 
                Could it be yours?
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
              >
                Contact Us
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Latest News & Updates
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay informed about the latest developments across our portfolio companies and corporate initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Sample News Cards */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="w-full h-40 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-sm">News Image</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Corporate News • 2 days ago
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Sirius Global Ventures Announces Strategic Partnership
              </h4>
              <p className="text-gray-600 text-sm">
                New partnership aims to accelerate growth across our portfolio companies...
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="w-full h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-sm">News Image</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Bostream • 5 days ago
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Bostream Launches Advanced Trading Features
              </h4>
              <p className="text-gray-600 text-sm">
                New suite of professional trading tools now available for institutional clients...
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="w-full h-40 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-sm">News Image</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Industry • 1 week ago
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Technology Innovation Awards 2024
              </h4>
              <p className="text-gray-600 text-sm">
                Recognition for outstanding contribution to fintech innovation...
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/news"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-colors"
            >
              View All News
              <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Partner With Us?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're an entrepreneur with a vision or an investor looking for opportunities, 
            we'd love to explore how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/api/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-medium rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get In Touch
            </Link>
            <Link
              href="/investor-relations"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
            >
              Investor Relations
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SGV</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sirius Global Ventures</h3>
                  <p className="text-sm text-gray-400">Corporate Excellence</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Building tomorrow's leaders through strategic investments and innovative partnerships.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#companies" className="hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Portfolio</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://bostream.ca" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Bostream</a></li>
                <li><Link href="#news" className="hover:text-white transition-colors">News</Link></li>
                <li><Link href="/investor-relations" className="hover:text-white transition-colors">Investors</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sirius Global Ventures. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}