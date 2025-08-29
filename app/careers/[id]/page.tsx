'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salaryRange?: string;
  experience: string;
}

export default function CareerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs?id=${params.id}`, {
          method: 'PUT',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        
        const data = await response.json();
        if (data.success) {
          setJob(data.job);
        } else {
          setError('Job not found');
        }
      } catch (err) {
        setError('Failed to load job details');
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.resume) {
      errors.resume = 'Resume is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: params.id,
          ...formData
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          resume: '',
          coverLetter: ''
        });
      } else {
        setError(data.error || 'Failed to submit application');
      }
    } catch (err) {
      setError('An error occurred while submitting your application');
      console.error('Error submitting application:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => router.push('/careers')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for applying to {job?.title}. We'll review your application and get back to you soon.
          </p>
          <button
            onClick={() => {
              setSubmitSuccess(false);
              router.push('/careers');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/careers" 
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Careers
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="p-6 sm:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {job?.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
                <span>{job?.department}</span>
                <span>•</span>
                <span>{job?.location}</span>
                <span>•</span>
                <span>{job?.type}</span>
                {job?.salaryRange && (
                  <>
                    <span>•</span>
                    <span>{job.salaryRange}</span>
                  </>
                )}
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Job Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {job?.description}
                </p>

                {job?.requirements && job.requirements.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                      Requirements
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Apply for this position
              </h2>
              
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Your full name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Resume/CV *
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormData(prev => ({
                              ...prev,
                              resume: file.name
                            }));
                          }
                        }}
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                      />
                      <label
                        htmlFor="resume"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer text-center"
                      >
                        {formData.resume || 'Choose file...'}
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      PDF, DOC, DOCX up to 5MB
                    </p>
                    {formErrors.resume && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.resume}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={4}
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Tell us why you're a great fit for this position..."
                  />
                </div>
                
                <div className="flex items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                        Submitting...
                      </span>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}