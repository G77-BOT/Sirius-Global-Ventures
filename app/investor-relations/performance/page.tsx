import React from 'react';
import { TrendingUp, DollarSign, Users, PieChart, BarChart3, LineChart, ArrowUpRight, ArrowDownRight, Calendar, Download, ExternalLink } from 'lucide-react';

export default function PerformancePage() {
  const portfolioStats = [
    {
      title: 'Total Portfolio Value',
      value: 'N/A',
      change: '+24.5%',
      period: 'YTD',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Active Companies',
      value: '18',
      change: '+2',
      period: 'This Year',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Average IRR',
      value: '32.8%',
      change: '+4.2%',
      period: '5-Year',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Total Exits',
      value: '12',
      change: '+3',
      period: 'Since 2020',
      trend: 'up',
      icon: PieChart
    }
  ];

  const performanceData = [
    {
      year: '2024',
      portfolioValue: 2400,
      returns: 24.5,
      newInvestments: 4,
      exits: 2
    },
    {
      year: '2023',
      portfolioValue: 1930,
      returns: 18.2,
      newInvestments: 6,
      exits: 3
    },
    {
      year: '2022',
      portfolioValue: 1635,
      returns: 22.8,
      newInvestments: 5,
      exits: 2
    },
    {
      year: '2021',
      portfolioValue: 1330,
      returns: 35.6,
      newInvestments: 7,
      exits: 4
    },
    {
      year: '2020',
      portfolioValue: 980,
      returns: 12.4,
      newInvestments: 3,
      exits: 1
    }
  ];

  const sectorAllocation = [
    { sector: 'Technology', percentage: 42, value: 'N/A', companies: 8 },
    { sector: 'Healthcare', percentage: 23, value: 'N/A', companies: 4 },
    { sector: 'Financial Services', percentage: 18, value: 'N/A', companies: 3 },
    { sector: 'Consumer Goods', percentage: 12, value: 'N/A', companies: 2 },
    { sector: 'Industrial', percentage: 5, value: 'N/A', companies: 1 }
  ];

  const topPerformers = [
    {
      company: 'Bostream',
      sector: 'Technology',
      investment: 'N/A',
      currentValue: 'N/A',
      multiple: '4.0x',
      irr: '48.2%',
      status: 'Active'
    },
    {
      company: 'MedTech Solutions',
      sector: 'Healthcare',
      investment: 'N/A',
      currentValue: 'N/A',
      multiple: '2.97x',
      irr: '35.4%',
      status: 'Active'
    },
    {
      company: 'FinanceFlow',
      sector: 'Financial Services',
      investment: 'N/A',
      currentValue: 'N/A',
      multiple: '4.46x',
      irr: '52.1%',
      status: 'Exited 2023'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Portfolio Performance
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                Comprehensive overview of our portfolio performance, investment returns, and strategic metrics across all holdings.
              </p>
            </div>
            <div className="hidden md:flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Review
              </button>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {portfolioStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    stat.trend === 'up' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {stat.period}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Chart & Sector Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Historical Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                5-Year Performance
              </h3>
              <LineChart className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {performanceData.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{data.year}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {data.newInvestments} investments, {data.exits} exits
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white">
                      N/A
                    </div>
                    <div className={`text-sm font-medium ${
                      data.returns > 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      +{data.returns}% returns
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Allocation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sector Allocation
              </h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {sectorAllocation.map((sector, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {sector.sector}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {sector.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${sector.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{sector.value}</span>
                    <span>{sector.companies} companies</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Top Performing Investments
              </h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Company</th>
                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Sector</th>
                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Investment</th>
                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Current Value</th>
                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Multiple</th>
                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">IRR</th>
                    <th className="pb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  {topPerformers.map((investment, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-600 last:border-b-0">
                      <td className="py-4">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {investment.company}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {investment.sector}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {investment.investment}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {investment.currentValue}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-bold text-green-600 dark:text-green-400">
                          {investment.multiple}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-bold text-green-600 dark:text-green-400">
                          {investment.irr}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          investment.status === 'Active'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        }`}>
                          {investment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Performance Benchmarks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-12">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Performance vs. Benchmarks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">32.8%</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">SGV Portfolio IRR</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">5-Year Average</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">24.5%</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Industry Average</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Private Equity</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">12.1%</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">S&P 500</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">5-Year Average</div>
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Risk Management & ESG
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Risk Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Portfolio Beta</span>
                  <span className="font-semibold text-gray-900 dark:text-white">0.85</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Sharpe Ratio</span>
                  <span className="font-semibold text-gray-900 dark:text-white">2.1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Max Drawdown</span>
                  <span className="font-semibold text-gray-900 dark:text-white">-8.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Value at Risk (95%)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">-12.5%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">ESG Compliance</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">ESG-Compliant Holdings</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Carbon Neutral Companies</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Board Diversity Score</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">8.5/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">UN SDG Alignment</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">89%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Interested in Our Performance?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Get detailed quarterly reports and insights into our investment strategy and portfolio performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download Full Report
            </button>
            <button className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <ExternalLink className="w-4 h-4 mr-2" />
              Schedule Investor Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
