'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Award, Coffee, Heart, Briefcase, ChevronRight } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  postedDate: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  useEffect(() => {
    // Fetch jobs from API
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        
        // Enhanced job data with additional details
        const enhancedJobs: Job[] = [
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
            benefits: [
              "Competitive salary with equity options",
              "Comprehensive health, dental, and vision coverage",
              "Flexible remote work arrangements",
              "Professional development budget ($5,000/year)",
              "Latest MacBook Pro and equipment",
              "Unlimited PTO policy"
            ],
            salary: "$120,000 - $180,000",
            postedDate: "2024-01-15"
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
            benefits: [
              "Competitive salary with performance bonuses",
              "Stock options in a growing company",
              "Health and wellness stipend",
              "Remote-first culture with team retreats",
              "Top-tier hardware and software tools",
              "Professional conference attendance"
            ],
            salary: "$100,000 - $150,000",
            postedDate: "2024-01-12"
          },
          {
            id: 3,
            title: "Product Manager",
            department: "Product",
            location: "Remote",
            type: "Full-time",
            description: "Lead product strategy for our cryptocurrency streaming and analytics platform. You'll work closely with engineering, design, and business teams to define and execute our product roadmap.",
            requirements: [
              "4+ years of product management experience",
              "Experience in fintech, trading, or cryptocurrency",
              "Strong analytical and data-driven decision making skills",
              "Excellent communication and leadership abilities",
              "Understanding of user experience design principles",
              "Technical background preferred"
            ],
            benefits: [
              "Competitive salary with significant equity upside",
              "Comprehensive benefits package",
              "Flexible PTO and sabbatical opportunities",
              "Professional coaching and development",
              "State-of-the-art home office setup",
              "Team building and wellness activities"
            ],
            salary: "$130,000 - $170,000",
            postedDate: "2024-01-10"
          },
          {
            id: 4,
            title: "Frontend Developer",
            department: "Engineering",
            location: "Remote",
            type: "Full-time",
            description: "Build responsive, intuitive user interfaces for our trading platforms. You'll work with React, TypeScript, and modern web technologies to create seamless user experiences.",
            requirements: [
              "3+ years experience with React and TypeScript",
              "Proficiency in modern CSS and responsive design",
              "Experience with state management (Redux, Zustand)",
              "Knowledge of testing frameworks (Jest, Cypress)",
              "Understanding of web performance optimization",
              "Familiarity with financial or trading applications preferred"
            ],
            benefits: [
              "Competitive salary with growth potential",
              "Comprehensive health benefits",
              "Remote work flexibility",
              "Learning and development budget",
              "Latest development hardware",
              "Collaborative and innovative team culture"
            ],
            salary: "$90,000 - $140,000",
            postedDate: "2024-01-08"
          }
        ];
        
        setJobs(enhancedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const departments = Array.from(new Set(jobs.map(job => job.department)));
  const filteredJobs = selectedDepartment === 'all' 
    ? jobs 
    : jobs.filter(job => job.department === selectedDepartment);

  const companyValues = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Innovation Excellence",
      description: "We push boundaries and embrace cutting-edge technologies to solve complex problems."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Culture",
      description: "We believe in the power of teamwork and diverse perspectives to drive success."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Work-Life Balance",
      description: "We support flexible work arrangements and prioritize employee well-being."
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Growth Mindset",
      description: "Continuous learning and professional development are core to our culture."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
              <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                About
              </Link>
              <Link href="/leadership" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Leadership
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Help us shape the future of finance and technology. Build innovative solutions, 
                grow your career, and make a meaningful impact in a fast-growing company.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
                <div className="flex items-center justify-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {jobs.length} Open Positions
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Remote-First Culture
                </div>
                <div className="flex items-center justify-center">
                  <Award className="w-4 h-4 mr-2" />
                  Competitive Benefits
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="py-16 bg-white rounded-2xl mb-12">
          <div className="px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We're building the future of financial technology, and we need passionate individuals to join us on this journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Filter */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">Open Positions</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Filter by department:</span>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div className="mb-4 lg:mb-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {job.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.type}
                        </div>
                        {job.salary && (
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </div>
                        )}
                      </div>
                    </div>
                    <Link
                      href={`/careers/${job.id}`}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Requirements</h4>
                      <ul className="space-y-1">
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <li key={index} className="text-gray-600 text-sm flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {req}
                          </li>
                        ))}
                        {job.requirements.length > 3 && (
                          <li className="text-blue-600 text-sm">
                            +{job.requirements.length - 3} more requirements
                          </li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Benefits Highlights</h4>
                      <ul className="space-y-1">
                        {job.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="text-gray-600 text-sm flex items-start">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {benefit}
                          </li>
                        ))}
                        {job.benefits.length > 3 && (
                          <li className="text-green-600 text-sm">
                            +{job.benefits.length - 3} more benefits
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. 
            Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              Get In Touch
            </Link>
            <a
              href="mailto:careers@siriusglobalventures.com"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
            >
              Send Resume
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
