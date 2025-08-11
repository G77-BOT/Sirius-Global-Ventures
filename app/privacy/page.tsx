import Link from 'next/link';
import { Shield, Eye, Lock, Database, UserCheck, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = "March 1, 2024";

  return (
    <>      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl overflow-hidden mb-12">
            <div className="px-8 py-16 md:px-12">
              <div className="text-center">
                <Shield className="w-16 h-16 mx-auto mb-6 text-blue-100" />
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                  Your privacy is important to us. This policy explains how Sirius Global Ventures 
                  collects, uses, and protects your personal information.
                </p>
                <p className="text-blue-200 mt-4">Last updated: {lastUpdated}</p>
              </div>
            </div>
          </section>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-blue-600" />
                  Overview
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Sirius Global Ventures ("we," "us," or "our") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website, use our services, or interact with us in any way.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-3 text-blue-600" />
                  Information We Collect
                </h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <p className="text-gray-700 mb-4">We may collect the following personal information:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Name and contact information (email address, phone number, mailing address)</li>
                  <li>Professional information (company, job title, industry)</li>
                  <li>Investment-related information and preferences</li>
                  <li>Communication history and preferences</li>
                  <li>Financial information (when necessary for investment purposes)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                <p className="text-gray-700 mb-4">When you visit our website, we automatically collect:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>IP address and browser information</li>
                  <li>Device information and operating system</li>
                  <li>Website usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <UserCheck className="w-6 h-6 mr-3 text-blue-600" />
                  How We Use Your Information
                </h2>
                <p className="text-gray-700 mb-4">We use your information for the following purposes:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>To provide and improve our investment services</li>
                  <li>To communicate with you about investment opportunities</li>
                  <li>To process and respond to your inquiries</li>
                  <li>To send newsletters and marketing communications (with your consent)</li>
                  <li>To comply with legal and regulatory requirements</li>
                  <li>To analyze website usage and improve user experience</li>
                  <li>To detect and prevent fraud or security breaches</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-blue-600" />
                  Information Sharing
                </h2>
                <p className="text-gray-700 mb-4">We may share your information in the following circumstances:</p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Providers</h3>
                <p className="text-gray-700 mb-4">
                  We work with trusted third-party service providers who assist us in operating our business, 
                  such as technology providers, legal counsel, and professional advisors.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
                <p className="text-gray-700 mb-4">
                  We may disclose information when required by law, regulation, or legal process, 
                  or to protect our rights and interests.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Transfers</h3>
                <p className="text-gray-700 mb-6">
                  In the event of a merger, acquisition, or sale of assets, your information may be 
                  transferred as part of that transaction.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-blue-600" />
                  Data Security
                </h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and audits</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response procedures</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                <p className="text-gray-700 mb-4">Depending on your location, you may have the following rights:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Object:</strong> Object to certain processing activities</li>
                </ul>
                <p className="text-gray-700">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar technologies to enhance your browsing experience and analyze website usage. 
                  You can manage cookie preferences through your browser settings.
                </p>
                <p className="text-gray-700 mb-4">
                  For more detailed information about our cookie practices, please see our 
                  <Link href="/cookies" className="text-blue-600 hover:text-blue-800 underline ml-1">Cookie Policy</Link>.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
                <p className="text-gray-700 mb-4">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined 
                  in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. 
                  Retention periods may vary based on the type of information and applicable legal requirements.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">International Transfers</h2>
                <p className="text-gray-700 mb-4">
                  Your information may be processed in countries other than your country of residence. 
                  We ensure appropriate safeguards are in place to protect your information in accordance 
                  with applicable data protection laws.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Our services are not intended for individuals under the age of 18. We do not knowingly 
                  collect personal information from children under 18. If we become aware that we have 
                  collected such information, we will take steps to delete it promptly.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices 
                  or applicable laws. We will notify you of any material changes by posting the updated 
                  policy on our website and updating the "last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-900 font-semibold mb-2">Sirius Global Ventures</p>
                  <p className="text-gray-700">Email: privacy@siriusglobalventures.com</p>
                  <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                  <p className="text-gray-700">Address: 123 Investment Street, Suite 456, New York, NY 10001</p>
                </div>
              </section>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-blue-600 hover:text-blue-800 underline">
                Cookie Policy
              </Link>
              <Link href="/disclaimer" className="text-blue-600 hover:text-blue-800 underline">
                Disclaimer
              </Link>
              <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>    </>
  );
}
