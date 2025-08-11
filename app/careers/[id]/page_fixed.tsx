'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Award, Coffee, Heart, Briefcase, CheckCircle, Send, Calendar, Building } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities?: string[];
  benefits: string[];
  salary?: string;
  experience?: string;
  postedDate: string;
  applicationDeadline?: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function CareerDetailPage({ params }: PageProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationData, setApplicationData] = useState<{
    name: string;
    email: string;
    phone: string;
    resume: File | null;
    coverLetter: string;
    linkedIn: string;
    portfolio: string;
  }>({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    linkedIn: '',
    portfolio: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Mock job data - in a real application, this would come from an API
        const jobs: Job[] = [
          {
            id: 1,
            title: "Senior Backend Developer",
            department: "Engineering",
            location: "Remote",
            type: "Full-time",
            description: "Join our team to build scalable cryptocurrency data streaming infrastructure. You'll work on high-performance systems that process millions of transactions and data points from multiple exchanges in real-time.",
            requirements: [
              "5+ years experience with Node.js and TypeScript",
              "Experience with distributed systems and microservices",
              "Knowledge of cryptocurrency exchanges and trading systems",
              "Proficiency in SQL and NoSQL databases",
              "Experience with AWS or similar cloud platforms",
              "Strong understanding of API design and development"
            ],
            responsibilities: [
              "Design and implement scalable backend services",
              "Optimize database performance and query efficiency",
              "Build and maintain real-time data processing pipelines",
              "Collaborate with frontend developers on API design",
              "Implement comprehensive testing and monitoring",
              "Participate in code reviews and technical discussions"
            ],
            benefits: [
              "Competitive salary with equity options",
              "Comprehensive health, dental, and vision coverage",
              "Flexible remote work arrangements",
              "Professional development budget ($5,000/year)",
              "Latest MacBook Pro and equipment",
              "Unlimited PTO policy"
            ],
            salary: "$120,000 - $180,000",
            experience: "5+ years",
            postedDate: "2024-01-15",
            applicationDeadline: "2024-04-15"
          },
          {
            id: 2,
            title: "DevOps Engineer",
            department: "Infrastructure", 
            location: "Remote",
            type: "Full-time",
            description: "Help us maintain and scale our high-availability cryptocurrency platform. You'll be responsible for infrastructure automation, monitoring, and ensuring 99.9% uptime across our global operations.",
            requirements: [
              "3+ years experience with AWS, Docker, and Kubernetes",
              "Proficiency in infrastructure-as-code tools (Terraform, CloudFormation)",
              "Experience with CI/CD pipelines and automation",
              "Knowledge of monitoring tools (Prometheus, Grafana, ELK stack)",
              "Understanding of security best practices",
              "Experience with high-traffic, mission-critical systems"
            ],
            responsibilities: [
              "Manage and scale cloud infrastructure on AWS",
              "Implement and maintain CI/CD pipelines",
              "Monitor system performance and availability",
              "Automate deployment and operational processes",
              "Ensure security compliance and best practices",
              "Respond to incidents and perform root cause analysis"
            ],
            benefits: [
              "Competitive salary with performance bonuses",
              "Stock options in a growing company",
              "Health and wellness stipend",
              "Remote-first culture with team retreats",
              "Top-tier hardware and software tools",
              "Professional conference attendance"
            ],
            salary: "$100,000 - $150,000",
            experience: "3+ years",
            postedDate: "2024-01-12",
            applicationDeadline: "2024-04-12"
          }
        ];

        const foundJob = jobs.find(j => j.id === parseInt(params.id));
        setJob(foundJob || null);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', applicationData);
    alert('Application submitted successfully! We will review your application and get back to you soon.');
    setShowApplication(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/careers" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Careers
          </Link>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Job Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sorry, we couldn't find the job you're looking for. It may have been removed or the link is incorrect.
            </p>
            <Link
              href="/careers"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/careers" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Careers
        </Link>

        {/* Job Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-blue-100">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    {job.department}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {job.type}
                  </div>
                  {job.salary && (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {job.salary}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowApplication(!showApplication)}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Apply Now
                </button>
                <Link
                  href="/careers"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  View Other Jobs
                </Link>
              </div>
            </div>
          </div>

          {/* Job Meta Information */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Posted: {new Date(job.postedDate).toLocaleDateString()}
              </div>
              {job.applicationDeadline && (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Clock className="w-4 h-4 mr-2 text-orange-600" />
                  Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                </div>
              )}
              {job.experience && (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Award className="w-4 h-4 mr-2 text-green-600" />
                  Experience: {job.experience}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Application Form */}
        {showApplication && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Apply for {job.title}</h2>
            <form onSubmit={handleApplicationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={applicationData.name}
                    onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="https://linkedin.com/in/..."
                    value={applicationData.linkedIn}
                    onChange={(e) => setApplicationData({...applicationData, linkedIn: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Portfolio Website (Optional)
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="https://your-portfolio.com"
                  value={applicationData.portfolio}
                  onChange={(e) => setApplicationData({...applicationData, portfolio: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Letter *
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resume/CV *
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  onChange={(e) => setApplicationData({...applicationData, resume: e.target.files?.[0] || null})}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Accepted formats: PDF, DOC, DOCX (Max size: 10MB)
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowApplication(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Job Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Job Description</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Benefits */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Heart className="w-5 h-5 text-red-500 mr-2" />
                Benefits & Perks
              </h3>
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="w-4 h-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Button */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Join our team and help shape the future of finance.
              </p>
              <button
                onClick={() => setShowApplication(!showApplication)}
                className="w-full bg-white text-blue-600 font-medium py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-2" />
                {showApplication ? 'Hide Application' : 'Apply Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
