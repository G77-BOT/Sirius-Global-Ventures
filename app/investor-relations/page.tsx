'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, TrendingUp, DollarSign, Building, Calendar, Download, ExternalLink, BarChart3, Users, Target } from 'lucide-react';

export default function InvestorRelationsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');

  const performanceMetrics = {
    totalInvestments: 2500000,
    totalValuation: 12000000,
    activeCompanies: 2,
    exitedCompanies: 0,
    totalReturns: 4800000,
    averageGrowth: 92.5,
    portfolioValue: 15600000
  };

  const periods = ['1M', '3M', '6M', '1Y', '3Y', 'ALL'];

  const portfolioCompanies = [
    {
      name: 'BotStream',
      industry: 'FinTech',
      investmentDate: '2024-01-15',
      investmentAmount: 2000000,
      currentValuation: 10000000,
      ownership: 25,
      status: 'Active',
      growth: 150,
      description: 'AI-powered cryptocurrency trading platform'
    },
    {
      name: 'Future Ventures',
      industry: 'AI/ML',
      investmentDate: '2024-06-01',
      investmentAmount: 500000,
      currentValuation: 2000000,
      ownership: 15,
      status: 'Development',
      growth: 75,
      description: 'Stealth mode AI automation startup'
    }
  ];

  const reports = [
    {
      title: 'Q4 2024 Portfolio Performance Report',
      date: '2024-12-31',
      type: 'Quarterly Report',
      size: '2.4 MB',
      downloadUrl: '#'
    },
    {
      title: 'Annual Investment Review 2024',
      date: '2024-12-31',
      type: 'Annual Report',
      size: '5.8 MB',
      downloadUrl: '#'
    },
    {
      title: 'BotStream Investment Case Study',
      date: '2024-11-15',
      type: 'Case Study',
      size: '1.2 MB',
      downloadUrl: '#'
    },
    {
      title: 'Market Analysis & Investment Thesis',
      date: '2024-10-30',
      type: 'Strategic Report',
      size: '3.1 MB',
      downloadUrl: '#'
    }
  ];

  const keyHighlights = [
    {
      title: 'Strong Portfolio Growth',
      description: '92.5% average growth across portfolio companies',
      icon: TrendingUp,
      color: 'from-green-600 to-emerald-600'
    },
    {
      title: 'Strategic Positioning',
      description: 'Focus on high-growth technology sectors',
      icon: Target,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Experienced Leadership',
      description: 'Proven track record in venture investments',
      icon: Users,
      color: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Active Management',
      description: 'Hands-on approach to portfolio company support',
      icon: Building,
      color: 'from-orange-600 to-red-600'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Investor Relations</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Transparent reporting and strategic insights into our portfolio performance 
                and investment philosophy for our valued stakeholders.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
                <div className="flex items-center justify-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {formatCurrency(performanceMetrics.portfolioValue)} Portfolio Value
                </div>
                <div className="flex items-center justify-center">
                  <Building className="w-4 h-4 mr-2" />
                  {performanceMetrics.activeCompanies} Active Companies
                </div>
                <div className="flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {performanceMetrics.averageGrowth}% Average Growth
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-green-600 text-sm font-medium">+24%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(performanceMetrics.totalInvestments)}
              </h3>
              <p className="text-gray-600">Total Investments</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-green-600 text-sm font-medium">+{performanceMetrics.averageGrowth}%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(performanceMetrics.portfolioValue)}
              </h3>
              <p className="text-gray-600">Portfolio Value</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-blue-600 text-sm font-medium">Active</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {performanceMetrics.activeCompanies}
              </h3>
              <p className="text-gray-600">Portfolio Companies</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-green-600 text-sm font-medium">+92%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(performanceMetrics.totalReturns)}
              </h3>
              <p className="text-gray-600">Total Returns</p>
            </div>
          </div>
        </section>

        {/* Performance Chart Section */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Performance</h2>
                <p className="text-gray-600">Track our portfolio value growth over time</p>
              </div>
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPeriod === period
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chart Placeholder */}
            <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border-2 border-dashed border-blue-200">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive Performance Chart</p>
                <p className="text-gray-500 text-sm">Chart integration available in full implementation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Companies */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Companies</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-2 text-gray-600 font-medium">Company</th>
                    <th className="text-left py-4 px-2 text-gray-600 font-medium">Investment</th>
                    <th className="text-left py-4 px-2 text-gray-600 font-medium">Valuation</th>
                    <th className="text-left py-4 px-2 text-gray-600 font-medium">Ownership</th>
                    <th className="text-left py-4 px-2 text-gray-600 font-medium">Growth</th>
                    <th className="text-left py-4 px-2 text-gray-600 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioCompanies.map((company, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 dark:bg-gray-900">
                      <td className="py-4 px-2">
                        <div>
                          <div className="font-semibold text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.industry}</div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div>
                          <div className="font-medium text-gray-900">{formatCurrency(company.investmentAmount)}</div>
                          <div className="text-sm text-gray-500">{new Date(company.investmentDate).getFullYear()}</div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="font-medium text-gray-900">{formatCurrency(company.currentValuation)}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="font-medium text-gray-900">{company.ownership}%</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center">
                          <span className="text-green-600 font-medium">+{company.growth}%</span>
                          <TrendingUp className="w-4 h-4 text-green-600 ml-1" />
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          company.status === 'Active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {company.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Investment Highlights</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key factors driving our portfolio performance and strategic positioning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyHighlights.map((highlight, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${highlight.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reports & Documents */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Reports & Documents</h2>
                <p className="text-gray-600">Access our latest financial reports and investment analyses</p>
              </div>
              <Link
                href="/investor-relations/reports"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
              >
                View All Reports
                <ExternalLink className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{report.type} • {report.size}</p>
                      <p className="text-xs text-gray-400">{new Date(report.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact IR */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Investor Relations Contact</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Have questions about our portfolio or investment opportunities? 
            Our IR team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact?type=investor"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              Contact IR Team
            </Link>
            <a
              href="mailto:investors@siriusglobalventures.com"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
            >
              investors@siriusglobalventures.com
            </a>
          </div>
        </section>
      </div>    </div>
  );
}
