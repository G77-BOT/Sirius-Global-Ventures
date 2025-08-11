'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, TrendingUp, Users, Calendar, MapPin, Search, Filter, ChevronRight } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  website: string;
  logo: string;
  industry: string;
  founded: string;
  headquarters: string;
  employees: string;
  status: string;
  funding: string;
  valuation: string;
  metrics: {
    uptime?: string;
    latency?: string;
    exchanges?: number;
    users?: string;
    growth?: string;
  };
  tags: string[];
  featured: boolean;
}

export default function PortfolioPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    // Fetch companies from API or use mock data
    const fetchCompanies = async () => {
      try {
        // Mock data for now - in production, fetch from your API
        const mockCompanies: Company[] = [
          {
            id: '1',
            name: 'BotStream',
            slug: 'botstream',
            description: 'Advanced cryptocurrency trading platform featuring real-time data streaming, professional analytics, and institutional-grade security for modern traders.',
            shortDescription: 'AI-powered cryptocurrency trading platform with access to 14+ exchanges',
            website: 'https://bostream.ca',
            logo: '/images/companies/botstream-logo.png',
            industry: 'FinTech',
            founded: '2024',
            headquarters: 'Global',
            employees: '10-50',
            status: 'development',
            funding: 'N/A',
            valuation: 'N/A',
            metrics: {
              uptime: '99.9%',
              latency: '<10ms',
              exchanges: 14,
              users: '5,000+',
              growth: '150%'
            },
            tags: ['AI', 'Cryptocurrency', 'Trading', 'Real-time Analytics', 'Blockchain'],
            featured: true
          },
          {
            id: '2',
            name: 'Future Ventures',
            slug: 'future-ventures',
            description: 'Coming soon - Next breakthrough innovation in development',
            shortDescription: 'Stealth mode startup in AI and automation space',
            website: '',
            logo: '/images/companies/placeholder-logo.png',
            industry: 'AI/ML',
            founded: '2024',
            headquarters: 'TBD',
            employees: 'Stealth',
            status: 'development',
            funding: 'Pre-seed',
            valuation: 'TBD',
            metrics: {},
            tags: ['AI', 'Machine Learning', 'Automation', 'Stealth'],
            featured: false
          }
        ];
        
        setCompanies(mockCompanies);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const industries = Array.from(new Set(companies.map(company => company.industry)));
  const statuses = Array.from(new Set(companies.map(company => company.status)));

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
    const matchesStatus = selectedStatus === 'all' || company.status === selectedStatus;
    
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const featuredCompanies = filteredCompanies.filter(company => company.featured);
  const otherCompanies = filteredCompanies.filter(company => !company.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Discover the innovative companies we've invested in and partnered with to build 
                the future of technology, finance, and beyond.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
                <div className="flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {companies.length} Portfolio Companies
                </div>
                <div className="flex items-center justify-center">
                  <Users className="w-4 h-4 mr-2" />
                  Multiple Industries
                </div>
                <div className="flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Active Investments
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies, technologies, or industries..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Filter by:</span>
                </div>
                
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  <option value="all">All Industries</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="development">In Development</option>
                  <option value="acquired">Acquired</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <>
            {/* Featured Companies */}
            {featuredCompanies.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Companies</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredCompanies.map((company) => (
                    <CompanyCard key={company.id} company={company} featured />
                  ))}
                </div>
              </section>
            )}

            {/* All Companies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {featuredCompanies.length > 0 ? 'All Companies' : 'Portfolio Companies'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </section>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </>
        )}

        {/* Investment Criteria Section */}
        <section className="mt-16 py-16 bg-white rounded-2xl">
          <div className="px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Investment Criteria</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We seek innovative companies that align with our strategic vision and investment philosophy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">High Growth Potential</h3>
                <p className="text-gray-600 text-sm">Companies with scalable business models and significant market opportunities</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Exceptional Teams</h3>
                <p className="text-gray-600 text-sm">Visionary founders and experienced management teams with proven track records</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Technology Innovation</h3>
                <p className="text-gray-600 text-sm">Cutting-edge technology solutions that create competitive advantages</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Portfolio?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            If you're building the next breakthrough company, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact?type=investment"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              Submit Your Pitch
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function CompanyCard({ company, featured = false }: { company: Company; featured?: boolean }) {
  return (
    <div className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 overflow-hidden ${
      featured ? 'lg:col-span-1' : ''
    }`}>
      {company.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </span>
        </div>
      )}
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-bl-full opacity-50"></div>
      
      <div className="relative p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-sm">{company.name.substring(0, 2)}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {company.name}
            </h3>
            <p className="text-blue-600 font-medium text-sm">{company.industry}</p>
          </div>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed text-sm">
          {company.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {company.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs">
              {tag}
            </span>
          ))}
          {company.tags.length > 3 && (
            <span className="text-blue-600 text-xs">+{company.tags.length - 3} more</span>
          )}
        </div>

        {Object.keys(company.metrics).length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {company.metrics.uptime && (
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-600">{company.metrics.uptime}</div>
                <div className="text-xs text-gray-600">Uptime</div>
              </div>
            )}
            {company.metrics.exchanges && (
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-600">{company.metrics.exchanges}+</div>
                <div className="text-xs text-gray-600">Exchanges</div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-500 text-xs">
            <MapPin className="w-3 h-3 mr-1" />
            {company.headquarters}
          </div>
          <div className="flex items-center space-x-2">
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Visit Site
                <ExternalLink className="ml-1 w-3 h-3" />
              </a>
            )}
            <Link
              href={`/companies/${company.slug}`}
              className="inline-flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform"
            >
              Learn More
              <ChevronRight className="ml-1 w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
