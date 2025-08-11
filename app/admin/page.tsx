'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Building, 
  Briefcase, 
  Newspaper, 
  MessageSquare, 
  Users, 
  Mail, 
  TrendingUp, 
  Calendar,
  Settings,
  BarChart3,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface DashboardStats {
  companies: {
    total: number;
    active: number;
    featured: number;
  };
  jobs: {
    total: number;
    active: number;
    applications: number;
  };
  news: {
    total: number;
    published: number;
    featured: number;
  };
  contacts: {
    total: number;
    unresolved: number;
    thisMonth: number;
  };
  team: {
    total: number;
    leadership: number;
    active: number;
  };
  subscribers: {
    total: number;
    active: number;
    thisMonth: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    companies: { total: 2, active: 2, featured: 1 },
    jobs: { total: 4, active: 4, applications: 23 },
    news: { total: 8, published: 6, featured: 2 },
    contacts: { total: 15, unresolved: 3, thisMonth: 8 },
    team: { total: 2, leadership: 2, active: 2 },
    subscribers: { total: 45, active: 42, thisMonth: 12 }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch dashboard stats
    const fetchStats = async () => {
      try {
        // In production, fetch from your API
        // const response = await fetch('/api/admin/stats');
        // const data = await response.json();
        // setStats(data);
        
        // For now, use mock data
        setTimeout(() => setLoading(false), 500);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'Add New Company',
      description: 'Add a portfolio company',
      href: '/admin/companies/new',
      icon: Building,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Create Job Posting',
      description: 'Post a new job opening',
      href: '/admin/jobs/new',
      icon: Briefcase,
      color: 'from-green-600 to-emerald-600'
    },
    {
      title: 'Write News Article',
      description: 'Publish company news',
      href: '/admin/news/new',
      icon: Newspaper,
      color: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Manage Team',
      description: 'Update team profiles',
      href: '/admin/team',
      icon: Users,
      color: 'from-orange-600 to-red-600'
    }
  ];

  const recentActivity = [
    {
      type: 'contact',
      title: 'New contact submission',
      description: 'John Doe submitted an investment inquiry',
      time: '2 hours ago',
      status: 'new'
    },
    {
      type: 'application',
      title: 'Job application received',
      description: 'Senior Backend Developer position',
      time: '4 hours ago',
      status: 'pending'
    },
    {
      type: 'news',
      title: 'News article published',
      description: 'Q4 Portfolio Performance Update',
      time: '1 day ago',
      status: 'published'
    },
    {
      type: 'subscriber',
      title: 'Newsletter subscription',
      description: 'sarah.chen@techcorp.com subscribed',
      time: '2 days ago',
      status: 'active'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SGV</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-xs text-gray-500">Sirius Global Ventures</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/settings"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                View Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Here's what's happening with your portfolio today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Companies Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Portfolio Companies</h3>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">{stats.companies.total}</div>
                  <div className="text-sm text-gray-500">
                    {stats.companies.active} active • {stats.companies.featured} featured
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Job Openings</h3>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">{stats.jobs.total}</div>
                  <div className="text-sm text-gray-500">
                    {stats.jobs.applications} applications received
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* News Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Newspaper className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">News Articles</h3>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">{stats.news.total}</div>
                  <div className="text-sm text-gray-500">
                    {stats.news.published} published • {stats.news.featured} featured
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contacts Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Contact Messages</h3>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">{stats.contacts.total}</div>
                  <div className="text-sm text-gray-500">
                    {stats.contacts.unresolved} unresolved
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">{stats.team.total}</div>
                  <div className="text-sm text-gray-500">
                    {stats.team.leadership} leadership
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscribers Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                <Mail className="w-6 h-6 text-pink-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">{stats.subscribers.total}</div>
                  <div className="text-sm text-gray-500">
                    +{stats.subscribers.thisMonth} this month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.status === 'new' || activity.status === 'pending' ? (
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    ) : (
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/admin/activity"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View all activity →
              </Link>
            </div>
          </div>
        </div>

        {/* Management Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/companies"
            className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
          >
            <Building className="w-5 h-5 text-blue-600 mr-3" />
            <span className="font-medium text-gray-900">Manage Companies</span>
          </Link>
          
          <Link
            href="/admin/jobs"
            className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
          >
            <Briefcase className="w-5 h-5 text-green-600 mr-3" />
            <span className="font-medium text-gray-900">Manage Jobs</span>
          </Link>
          
          <Link
            href="/admin/news"
            className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
          >
            <Newspaper className="w-5 h-5 text-purple-600 mr-3" />
            <span className="font-medium text-gray-900">Manage News</span>
          </Link>
          
          <Link
            href="/admin/contacts"
            className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
          >
            <MessageSquare className="w-5 h-5 text-orange-600 mr-3" />
            <span className="font-medium text-gray-900">View Messages</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
