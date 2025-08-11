import Link from 'next/link';
import React from 'react';
import { ArrowLeft, Target, Eye, Heart, Users, TrendingUp, Globe, Shield, CheckCircle, Award, Building, Calendar } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SGV</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Sirius Global Ventures
                </h1>
                <p className="text-xs text-gray-500">Corporate Excellence</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/leadership" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Leadership
              </Link>
              <Link href="/portfolio" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Portfolio
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl overflow-hidden mb-12">
          <div className="px-8 py-16 md:px-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Sirius Global Ventures</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Building tomorrow's leaders through strategic investments, innovative partnerships, 
                and unwavering commitment to excellence across multiple industries.
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16 bg-white rounded-2xl mb-12">
          <div className="px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-lg text-gray-600">
                  Founded with a vision to transform industries through strategic investments and innovation
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Corporate Excellence Since 2024</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Sirius Global Ventures Holding is a diversified investment company focused on building and 
                    investing in cutting-edge businesses across multiple sectors including technology, e-commerce, 
                    artificial intelligence, machine learning, software and hardware development, accommodation, 
                    commodities, clubs, and entertainment.
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Our flagship project is BotStream, an advanced AI trading platform providing access to 14 
                    exchanges with integrated AI assistant chatbot functionality, giving users a competitive 
                    edge in arbitrage trading across various markets.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">2024</div>
                      <div className="text-sm text-gray-600">Established</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">Multi</div>
                      <div className="text-sm text-gray-600">Industries</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Holding Company Structure</h4>
                        <p className="text-gray-600 text-sm">Strategic oversight and management of diverse portfolio companies</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Growth-Focused Investment</h4>
                        <p className="text-gray-600 text-sm">Identifying and nurturing high-potential companies for sustainable expansion</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Global Vision</h4>
                        <p className="text-gray-600 text-sm">Building companies that compete and thrive in international markets</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Foundation</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles and vision that guide our strategic decisions and corporate culture
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Our Mission</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                To build, acquire, and grow innovative companies that create lasting value for stakeholders 
                while driving positive change across multiple industries through strategic investments and 
                operational excellence.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Our Vision</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                To become a globally recognized holding company that shapes the future of business by 
                fostering innovation, entrepreneurship, and sustainable growth across diverse sectors 
                worldwide.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Our Values</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600 text-sm">Innovation & Excellence</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600 text-sm">Integrity & Transparency</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600 text-sm">Strategic Partnership</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600 text-sm">Sustainable Growth</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="py-16 bg-white rounded-2xl mb-12">
          <div className="px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Competencies</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our expertise spans multiple industries and functional areas, enabling comprehensive support for portfolio companies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Strategic Growth</h4>
                <p className="text-gray-600 text-sm">Identifying and executing growth opportunities across diverse markets</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Operational Excellence</h4>
                <p className="text-gray-600 text-sm">Optimizing operations and processes for maximum efficiency and impact</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Technology Innovation</h4>
                <p className="text-gray-600 text-sm">Leveraging cutting-edge technology to drive competitive advantages</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Risk Management</h4>
                <p className="text-gray-600 text-sm">Implementing robust risk frameworks to protect and enhance value</p>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Focus Areas</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We invest across multiple high-growth sectors where we can add significant value
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              'Technology', 'E-commerce', 'AI/ML', 'Software Dev', 
              'Hardware', 'Accommodation', 'Commodities', 'Entertainment'
            ].map((industry, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-100 text-center">
                <div className="text-sm font-medium text-gray-900 mb-1">{industry}</div>
                <div className="w-full h-1 bg-blue-600 rounded-full"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're an entrepreneur with a vision or an investor seeking opportunities, 
            we're here to create lasting partnerships that drive mutual success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
            >
              View Our Portfolio
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
