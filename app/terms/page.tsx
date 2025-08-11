import Link from 'next/link';
import { FileText, Scale, AlertTriangle, Users, Globe, Shield } from 'lucide-react';

export default function TermsOfServicePage() {
  const lastUpdated = "March 1, 2024";

  return (
    <>      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl overflow-hidden mb-12">
            <div className="px-8 py-16 md:px-12">
              <div className="text-center">
                <Scale className="w-16 h-16 mx-auto mb-6 text-indigo-100" />
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
                <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
                  Please read these terms and conditions carefully before using our services. 
                  By accessing our website or services, you agree to be bound by these terms.
                </p>
                <p className="text-indigo-200 mt-4">Last updated: {lastUpdated}</p>
              </div>
            </div>
          </section>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-indigo-600" />
                  Agreement to Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms of Service ("Terms") govern your use of the Sirius Global Ventures website 
                  and services provided by Sirius Global Ventures ("Company," "we," "us," or "our"). 
                  By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-indigo-600" />
                  Description of Services
                </h2>
                <p className="text-gray-700 mb-4">
                  Sirius Global Ventures is a venture capital firm that provides investment services 
                  and related financial advisory services. Our services include:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Investment management and advisory services</li>
                  <li>Portfolio company support and mentorship</li>
                  <li>Market research and analysis</li>
                  <li>Investment opportunity evaluation</li>
                  <li>Financial and strategic consulting</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-3 text-indigo-600" />
                  Eligibility and Account Registration
                </h2>
                <p className="text-gray-700 mb-4">
                  To use our services, you must:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Be at least 18 years of age</li>
                  <li>Have the legal capacity to enter into binding agreements</li>
                  <li>Provide accurate and complete information during registration</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Meet any specific investor qualification requirements</li>
                </ul>
                <p className="text-gray-700">
                  We reserve the right to refuse service or terminate accounts at our sole discretion.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment Risks and Disclaimers</h2>
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl mb-6">
                  <p className="text-red-800 font-semibold mb-2">IMPORTANT INVESTMENT DISCLAIMER</p>
                  <p className="text-red-700 text-sm leading-relaxed">
                    Investment in venture capital and private equity involves significant risk and 
                    may result in partial or total loss of invested capital. Past performance does 
                    not guarantee future results.
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Risks</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Loss of principal investment</li>
                  <li>Illiquid investments with limited exit opportunities</li>
                  <li>Market volatility and economic downturns</li>
                  <li>Company-specific risks and potential failures</li>
                  <li>Regulatory and legal changes</li>
                  <li>Currency and interest rate fluctuations</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">No Investment Advice</h3>
                <p className="text-gray-700 mb-4">
                  Information provided on our website and in our communications is for general 
                  informational purposes only and does not constitute investment advice, 
                  recommendations, or solicitations.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">User Conduct and Responsibilities</h2>
                <p className="text-gray-700 mb-4">You agree to use our services responsibly and not to:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Submit false, misleading, or fraudulent information</li>
                  <li>Interfere with the proper functioning of our systems</li>
                  <li>Attempt unauthorized access to our systems or data</li>
                  <li>Use our services for money laundering or terrorist financing</li>
                  <li>Engage in any activity that could harm our reputation</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-indigo-600" />
                  Intellectual Property Rights
                </h2>
                <p className="text-gray-700 mb-4">
                  All content on our website and in our materials, including but not limited to text, 
                  graphics, logos, images, software, and data compilations, is owned by or licensed to 
                  Sirius Global Ventures and is protected by intellectual property laws.
                </p>
                <p className="text-gray-700 mb-4">
                  You may not reproduce, distribute, modify, or create derivative works of our content 
                  without our prior written consent.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Confidentiality</h2>
                <p className="text-gray-700 mb-4">
                  Through your use of our services, you may receive confidential information about 
                  our investment strategies, portfolio companies, and business operations. You agree to:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Keep all confidential information strictly confidential</li>
                  <li>Use confidential information only for authorized purposes</li>
                  <li>Not disclose confidential information to third parties</li>
                  <li>Return or destroy confidential information upon request</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mb-6">
                  <p className="text-yellow-800 font-semibold mb-2">LIABILITY LIMITATION</p>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    To the maximum extent permitted by law, Sirius Global Ventures shall not be liable 
                    for any indirect, incidental, special, consequential, or punitive damages.
                  </p>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Our total liability for any claims arising from or relating to these Terms or your 
                  use of our services shall not exceed the amount you have paid to us in the twelve 
                  months preceding the claim.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
                <p className="text-gray-700 mb-4">
                  You agree to indemnify and hold harmless Sirius Global Ventures, its affiliates, 
                  officers, directors, employees, and agents from any claims, damages, losses, or 
                  expenses arising from:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Your use of our services</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any applicable laws or regulations</li>
                  <li>Your infringement of third-party rights</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Compliance</h2>
                <p className="text-gray-700 mb-4">
                  Our services are subject to various regulatory requirements, including but not limited to:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Securities and Exchange Commission (SEC) regulations</li>
                  <li>Investment Advisers Act of 1940</li>
                  <li>Anti-money laundering (AML) requirements</li>
                  <li>Know Your Customer (KYC) obligations</li>
                  <li>Accredited investor verification requirements</li>
                </ul>
                <p className="text-gray-700">
                  You agree to cooperate with our compliance requirements and provide necessary 
                  documentation and information as requested.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-indigo-600" />
                  Governing Law and Dispute Resolution
                </h2>
                <p className="text-gray-700 mb-4">
                  These Terms are governed by the laws of the State of New York, without regard to 
                  conflict of law principles. Any disputes arising from these Terms shall be resolved through:
                </p>
                <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Good faith negotiation</li>
                  <li>Binding arbitration under the rules of the American Arbitration Association</li>
                  <li>Arbitration proceedings conducted in New York, NY</li>
                </ol>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
                <p className="text-gray-700 mb-4">
                  We may terminate or suspend your access to our services at any time, with or without 
                  cause, with or without notice. You may terminate your relationship with us by 
                  discontinuing use of our services and closing your account.
                </p>
                <p className="text-gray-700">
                  Upon termination, your right to use our services ceases immediately, but provisions 
                  regarding confidentiality, intellectual property, limitation of liability, and 
                  indemnification shall survive.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to modify these Terms at any time. Material changes will be 
                  communicated to you through our website or direct communication. Continued use of 
                  our services after changes constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
                <p className="text-gray-700 mb-4">
                  If any provision of these Terms is found to be unenforceable or invalid, the remaining 
                  provisions shall remain in full force and effect. The unenforceable provision shall 
                  be modified to the minimum extent necessary to make it enforceable.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-900 font-semibold mb-2">Sirius Global Ventures</p>
                  <p className="text-gray-700">Email: legal@siriusglobalventures.com</p>
                  <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                  <p className="text-gray-700">Address: 123 Investment Street, Suite 456, New York, NY 10001</p>
                </div>
              </section>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
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
