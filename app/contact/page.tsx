'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  inquiryType: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = {
    headquarters: {
      address: "Sirius Global Ventures Headquarters",
      street: "Innovation District",
      city: "Business Center",
      country: "Global Operations",
      phone: "+1 (555) 123-4567",
      email: "contact@siriusglobalventures.com"
    },
    support: {
      email: "support@siriusglobalventures.com",
      hours: "24/7 Available"
    },
    business: {
      email: "business@siriusglobalventures.com",
      hours: "Mon-Fri 9AM-6PM"
    },
    investors: {
      email: "investors@siriusglobalventures.com",
      hours: "Mon-Fri 9AM-5PM"
    }
  };

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
              <Link href="/portfolio" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Portfolio
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Ready to partner with us? Whether you're an entrepreneur with a vision or an investor seeking opportunities, 
                we'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <h3 className="text-green-800 font-medium">Message sent successfully!</h3>
                    <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <div>
                    <h3 className="text-red-800 font-medium">Error sending message</h3>
                    <p className="text-red-700 text-sm">Please try again or contact us directly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Business Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="investment">Investment Opportunity</option>
                      <option value="partnership">Partnership</option>
                      <option value="careers">Careers</option>
                      <option value="media">Media/Press</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-8 py-4 font-medium rounded-xl transition-colors ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Primary Contact */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">{contactInfo.headquarters.address}</div>
                    <div className="text-gray-600 text-sm">{contactInfo.headquarters.street}</div>
                    <div className="text-gray-600 text-sm">{contactInfo.headquarters.city}</div>
                    <div className="text-gray-600 text-sm">{contactInfo.headquarters.country}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <a href={`tel:${contactInfo.headquarters.phone}`} className="text-gray-900 hover:text-blue-600 transition-colors">
                    {contactInfo.headquarters.phone}
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <a href={`mailto:${contactInfo.headquarters.email}`} className="text-gray-900 hover:text-blue-600 transition-colors">
                    {contactInfo.headquarters.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Department Contacts */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Department Contacts</h3>
              <div className="space-y-4">
                {/* Business Inquiries */}
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-medium text-gray-900">Business Inquiries</h4>
                  <a href={`mailto:${contactInfo.business.email}`} className="text-blue-600 hover:text-blue-700 text-sm">
                    {contactInfo.business.email}
                  </a>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {contactInfo.business.hours}
                  </div>
                </div>

                {/* Investor Relations */}
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-medium text-gray-900">Investor Relations</h4>
                  <a href={`mailto:${contactInfo.investors.email}`} className="text-purple-600 hover:text-purple-700 text-sm">
                    {contactInfo.investors.email}
                  </a>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {contactInfo.investors.hours}
                  </div>
                </div>

                {/* Technical Support */}
                <div className="border-l-4 border-green-600 pl-4">
                  <h4 className="font-medium text-gray-900">Technical Support</h4>
                  <a href={`mailto:${contactInfo.support.email}`} className="text-green-600 hover:text-green-700 text-sm">
                    {contactInfo.support.email}
                  </a>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {contactInfo.support.hours}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/careers" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  → Career Opportunities
                </Link>
                <Link href="/investor-relations" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  → Investor Relations
                </Link>
                <Link href="/portfolio" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  → Portfolio Companies
                </Link>
                <Link href="/news" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  → Latest News
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
