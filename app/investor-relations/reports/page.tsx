import Link from 'next/link';
import { ArrowLeft, Download, Calendar, FileText, TrendingUp, PieChart, BarChart, Eye } from 'lucide-react';

export default function InvestorReportsPage() {
  const reports = [
    {
      id: 1,
      title: "Annual Report 2024",
      description: "Comprehensive review of portfolio performance, strategic initiatives, and market outlook",
      date: "March 2024",
      type: "Annual Report",
      size: "2.8 MB",
      pages: 52,
      category: "annual",
      downloadUrl: "/reports/annual-report-2024.pdf",
      featured: true
    },
    {
      id: 2,
      title: "Q4 2023 Portfolio Update",
      description: "Quarterly performance summary and portfolio company highlights",
      date: "January 2024",
      type: "Quarterly Report",
      size: "1.4 MB",
      pages: 24,
      category: "quarterly",
      downloadUrl: "/reports/q4-2023-portfolio-update.pdf"
    },
    {
      id: 3,
      title: "Q3 2023 Portfolio Update",
      description: "Third quarter performance metrics and investment activities",
      date: "October 2023",
      type: "Quarterly Report",
      size: "1.3 MB",
      pages: 22,
      category: "quarterly",
      downloadUrl: "/reports/q3-2023-portfolio-update.pdf"
    },
    {
      id: 4,
      title: "ESG Impact Report 2023",
      description: "Environmental, Social, and Governance impact across our portfolio",
      date: "December 2023",
      type: "Impact Report",
      size: "1.9 MB",
      pages: 34,
      category: "special",
      downloadUrl: "/reports/esg-impact-2023.pdf"
    },
    {
      id: 5,
      title: "Annual Report 2023",
      description: "Full year portfolio performance and strategic review",
      date: "March 2023",
      type: "Annual Report",
      size: "2.6 MB",
      pages: 48,
      category: "annual",
      downloadUrl: "/reports/annual-report-2023.pdf"
    },
    {
      id: 6,
      title: "Technology Trends Report 2024",
      description: "Deep dive into emerging technology trends and investment opportunities",
      date: "February 2024",
      type: "Research Report",
      size: "2.1 MB",
      pages: 38,
      category: "research",
      downloadUrl: "/reports/tech-trends-2024.pdf"
    }
  ];

  const performanceMetrics = [
    {
      metric: "Portfolio IRR",
      value: "24.8%",
      period: "3-Year Average",
      trend: "up",
      description: "Internal Rate of Return across all portfolio investments"
    },
    {
      metric: "Total AUM",
      value: "N/A",
      period: "As of Q4 2023",
      trend: "up",
      description: "Total assets under management"
    },
    {
      metric: "Portfolio Companies",
      value: "28",
      period: "Active Investments",
      trend: "up",
      description: "Number of active portfolio companies"
    },
    {
      metric: "Exits",
      value: "12",
      period: "Since 2020",
      trend: "up",
      description: "Successful exits generating returns"
    }
  ];

  const upcomingReports = [
    {
      title: "Q1 2024 Portfolio Update",
      expectedDate: "April 2024",
      description: "First quarter performance and new investment activities"
    },
    {
      title: "Mid-Year Review 2024",
      expectedDate: "July 2024",
      description: "Comprehensive mid-year portfolio analysis and market outlook"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'annual':
        return TrendingUp;
      case 'quarterly':
        return BarChart;
      case 'special':
        return PieChart;
      case 'research':
        return FileText;
      default:
        return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'annual':
        return 'from-blue-600 to-indigo-600';
      case 'quarterly':
        return 'from-green-600 to-emerald-600';
      case 'special':
        return 'from-purple-600 to-pink-600';
      case 'research':
        return 'from-orange-600 to-red-600';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <>      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link href="/investor-relations" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Investor Relations
          </Link>

          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl overflow-hidden mb-12">
            <div className="px-8 py-16 md:px-12">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Investor Reports</h1>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                  Access comprehensive reports on our portfolio performance, market insights, 
                  and strategic initiatives to stay informed about our investment activities.
                </p>
              </div>
            </div>
          </section>

          {/* Performance Dashboard */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Portfolio Performance Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{metric.value}</div>
                      <div className="text-lg font-semibold text-gray-900 mb-1">{metric.metric}</div>
                      <div className="text-sm text-gray-600 mb-3">{metric.period}</div>
                      <p className="text-xs text-gray-500 leading-relaxed">{metric.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Reports Grid */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Available Reports</h2>
              <div className="text-sm text-gray-600">
                All reports are available in PDF format for download
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {reports.map((report) => {
                const IconComponent = getCategoryIcon(report.category);
                return (
                  <div key={report.id} className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${report.featured ? 'ring-2 ring-blue-200' : ''}`}>
                    {report.featured && (
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-medium text-center">
                        Featured Report
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(report.category)} rounded-xl flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {report.type}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3">{report.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{report.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {report.date}
                          </div>
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            {report.pages} pages
                          </div>
                        </div>
                        <div>{report.size}</div>
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                        <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Upcoming Reports */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Reports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingReports.map((report, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-blue-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                    <div className="flex items-center text-sm text-blue-600 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      Expected: {report.expectedDate}
                    </div>
                    <p className="text-gray-600 text-sm">{report.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Archive Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Report Archive</h2>
                <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                  Looking for historical reports? Access our complete archive of investor reports 
                  dating back to our founding.
                </p>
                <Link
                  href="/investor-relations/archive"
                  className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  View Archive
                </Link>
              </div>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Subscribe to receive notifications when new investor reports and updates are available.
              </p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>    </>
  );
}
