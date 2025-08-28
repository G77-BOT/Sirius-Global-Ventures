import Link from 'next/link';
import React from 'react';
import { ArrowRight, TrendingUp, Shield, Globe, ChevronRight, ExternalLink } from 'lucide-react';
import ARBackground from '../components/ar/ARBackground';
import ARHero from '../components/ar/ARHero';
import ARCard from '../components/ar/ARCard';
import ARStats from '../components/ar/ARStats';
import ARButton from '../components/ar/ARButton';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* AR Background */}
      <ARBackground intensity={0.3} color="#3b82f6" />
      
      {/* AR Hero Section */}
      <ARHero
        title="Building Tomorrow's Leaders"
        subtitle="Next-Generation Venture Capital"
        description="Sirius Global Ventures leverages advanced AR technology and AI-driven insights to identify, invest in, and accelerate the growth of revolutionary companies across multiple industries."
        primaryAction={{
          text: "Explore AR Portfolio",
          href: "#companies"
        }}
        secondaryAction={{
          text: "Neural Network Analysis",
          href: "#about"
        }}
      />

      {/* About Section */}
      <section id="about" className="relative py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              AR-Enhanced Corporate Excellence
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We harness augmented reality and advanced analytics to drive sustainable growth and create meaningful impact across industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ARCard glowColor="#3b82f6" className="p-8">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AR-Powered Analytics</h4>
              <p className="text-gray-600 dark:text-gray-300">
                We leverage augmented reality visualization to identify and nurture high-potential companies with unprecedented precision.
              </p>
            </ARCard>

            <ARCard glowColor="#7c3aed" className="p-8">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Neural Network Security</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI-enhanced security protocols and operational frameworks ensure maximum protection and growth potential.
              </p>
            </ARCard>

            <ARCard glowColor="#059669" className="p-8">
              <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quantum Global Vision</h4>
              <p className="text-gray-600 dark:text-gray-300">
                We utilize quantum computing insights to build companies that dominate international markets through AR innovation.
              </p>
            </ARCard>
          </div>
        </div>
      </section>
      
      {/* Our Companies Section */}
      <section id="companies" className="relative py-20 bg-gradient-to-br from-gray-50/80 to-blue-50/80 dark:from-gray-800/80 dark:to-blue-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              AR-Enhanced Portfolio
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're proud to support AR-integrated companies that are revolutionizing the future across multiple industries.
            </p>
          </div>

          {/* AR Stats */}
          <ARStats 
            stats={[
              {
                label: "AR Uptime",
                value: "99.9%",
                description: "System reliability",
                icon: Shield,
                color: "#10b981"
              },
              {
                label: "Neural Latency",
                value: "<10ms",
                description: "Response time",
                icon: TrendingUp,
                color: "#3b82f6"
              },
              {
                label: "Quantum Exchanges",
                value: "14+",
                description: "Connected platforms",
                icon: Globe,
                color: "#8b5cf6"
              },
              {
                label: "AI Processing",
                value: "24/7",
                description: "Continuous analysis",
                icon: ArrowRight,
                color: "#f59e0b"
              }
            ]}
            className="mb-16"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bostream - Featured Company */}
            <ARCard glowColor="#3b82f6" className="relative overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">BS</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Botstream
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">AR Crypto Trading Platform</p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Revolutionary AR-enhanced cryptocurrency trading platform featuring quantum data streaming, 
                  neural analytics, and holographic security protocols for next-generation traders.
                </p>
                
                <div className="flex items-center justify-between">
                  <Link
                    href="/api/subsidiaries/1"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium"
                  >
                    AR Analysis
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                  <ARButton variant="primary" size="sm">
                    <span className="flex items-center">
                      Neural Link
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </span>
                  </ARButton>
                </div>
              </div>
            </ARCard>

            {/* Future Company Placeholder */}
            <ARCard glowColor="#6366f1" className="text-center" interactive={false}>
              <div className="p-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-4xl text-white">∞</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quantum Innovation Hub</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our AR laboratory is continuously scanning for the next breakthrough company to join our quantum portfolio. 
                  Neural networks active.
                </p>
                <Link href="#contact">
                  <ARButton variant="ghost" size="sm">
                    <span className="flex items-center">
                      Initialize Contact
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </span>
                  </ARButton>
                </Link>
              </div>
            </ARCard>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="relative py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Neural Network Updates
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stay connected to the latest AR developments across our quantum portfolio and neural initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Sample News Cards */}
            <ARCard glowColor="#3b82f6" className="p-6">
              <div className="w-full h-40 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm" />
                <span className="text-white text-sm relative z-10">AR Neural Feed</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Quantum Update • 2 cycles ago
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                AR Partnership Protocol Activated
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                New neural partnership protocol aims to accelerate quantum growth across our AR portfolio...
              </p>
            </ARCard>

            <ARCard glowColor="#7c3aed" className="p-6">
              <div className="w-full h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm" />
                <span className="text-white text-sm relative z-10">Holographic Data</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Bostream • 5 neural cycles ago
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Bostream Deploys Quantum Trading Matrix
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Revolutionary AR trading matrix now available for quantum institutional clients...
              </p>
            </ARCard>

            <ARCard glowColor="#059669" className="p-6">
              <div className="w-full h-40 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm" />
                <span className="text-white text-sm relative z-10">Neural Recognition</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                AR Industry • 1 quantum week ago
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                AR Innovation Recognition Protocol 2024
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Neural recognition for outstanding contribution to AR fintech innovation...
              </p>
            </ARCard>
          </div>

          <div className="text-center">
            <Link
              href="/news"
            >
              <ARButton variant="secondary" size="md">
                <span className="flex items-center">
                  View All Neural Updates
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </ARButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Initialize Neural Partnership?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're an AR entrepreneur with quantum vision or an investor seeking neural opportunities, 
            we'd love to explore how our systems can synchronize.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/investor-relations"
            >
              <ARButton variant="primary" size="lg" glowColor="#ffffff">
                Initialize Contact Protocol
              </ARButton>
            </Link>
            <Link
              href="/contact"
            >
              <ARButton variant="ghost" size="lg" glowColor="#ffffff">
                Neural Investor Interface
              </ARButton>
            </Link>
          </div>
      </section>
    </div>
  );
}
  )
}
  )
}