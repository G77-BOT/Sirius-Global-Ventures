import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, ExternalLink } from 'lucide-react';

const navigation = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Leadership', href: '/leadership' },
    { name: 'Careers', href: '/careers' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ],
  portfolio: [
    { name: 'Our Companies', href: '/portfolio' },
    { name: 'BotStream', href: '/companies/bostream', external: true },
    { name: 'Investment Criteria', href: '/portfolio/criteria' },
    { name: 'Success Stories', href: '/portfolio/success-stories' },
  ],
  investors: [
    { name: 'Overview', href: '/investor-relations' },
    { name: 'Performance', href: '/investor-relations/performance' },
    { name: 'Reports', href: '/investor-relations/reports' },
    { name: 'Contact IR', href: '/contact?type=investor' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookies Policy', href: '/cookies' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
};

const socialLinks = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: '#',
    icon: Twitter,
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">SGV</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Sirius Global Ventures</h3>
                <p className="text-sm text-gray-400">Corporate Excellence</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Building tomorrow's leaders through strategic investments and innovative partnerships 
              across multiple industries worldwide.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-blue-400" />
                <a href="mailto:contact@siriusglobalventures.com" className="hover:text-white transition-colors">
                  contact@siriusglobalventures.com
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-blue-400" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="w-4 h-4 mr-3 mt-1 text-blue-400" />
                <div>
                  <div>Innovation District</div>
                  <div>Business Center, Global Operations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Portfolio</h4>
            <ul className="space-y-2">
              {navigation.portfolio.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a 
                      href="https://bostream.ca"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors flex items-center"
                    >
                      {item.name}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  ) : (
                    <Link 
                      href={item.href} 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Investors Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Investors</h4>
            <ul className="space-y-2">
              {navigation.investors.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-300 mb-4 lg:mb-0">
                Get the latest news about our portfolio companies and investment opportunities.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:max-w-md lg:max-w-xs">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-r-none text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="mt-2 sm:mt-0 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg sm:rounded-l-none font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">
              © 2024 Sirius Global Ventures Holding. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Founded by Mohamud Abdiaziz Mohamed • VP Joseph Jackson
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title={item.name}
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
