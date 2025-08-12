import Link from 'next/link';
import { AlertTriangle, Info, TrendingDown, Shield, FileWarning, DollarSign } from 'lucide-react';

export default function DisclaimerPage() {
  const lastUpdated = "March 1, 2024";

  return (
    <>      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl overflow-hidden mb-12">
            <div className="px-8 py-16 md:px-12">
              <div className="text-center">
                <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-red-100" />
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Disclaimer</h1>
                <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
                  Important legal disclaimers and risk warnings regarding investment activities, 
                  information accuracy, and the use of our services.
                </p>
                <p className="text-red-200 mt-4">Last updated: {lastUpdated}</p>
              </div>
            </div>
          </section>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">

              {/* Investment Risk Warning */}
              <section className="mb-12">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-red-800 mb-2">INVESTMENT RISK WARNING</h3>
                      <p className="text-red-700 text-sm leading-relaxed">
                        Investment in venture capital and private equity involves substantial risk and 
                        may result in partial or complete loss of your investment. You should carefully 
                        consider whether such investments are suitable for you in light of your financial 
                        circumstances and ability to afford such losses.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingDown className="w-6 h-6 mr-3 text-red-600" />
                  Investment Risks and Disclaimers
                </h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">General Investment Risks</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Loss of Principal:</strong> You may lose some or all of your invested capital</li>
                  <li><strong>Illiquidity:</strong> Private investments typically cannot be readily sold or exchanged</li>
                  <li><strong>Volatility:</strong> Investment values may fluctuate significantly over time</li>
                  <li><strong>Market Risk:</strong> Economic downturns may adversely affect all investments</li>
                  <li><strong>Company-Specific Risk:</strong> Individual portfolio companies may fail</li>
                  <li><strong>Regulatory Risk:</strong> Changes in laws may impact investment returns</li>
                  <li><strong>Currency Risk:</strong> International investments may be affected by exchange rates</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Past Performance Disclaimer</h3>
                <p className="text-gray-700 mb-6">
                  Past performance is not indicative of future results. Any historical returns, expected 
                  returns, or probability projections may not reflect actual future performance. All 
                  investments involve risk of loss, and there can be no assurance that any investment 
                  strategy will be successful.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accredited Investor Requirements</h3>
                <p className="text-gray-700 mb-6">
                  Many of our investment opportunities are available only to accredited investors as 
                  defined by applicable securities laws. You must meet specific income, net worth, 
                  or professional criteria to participate in certain investments.
                </p>
              </section>

              {/* Information Disclaimers */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="w-6 h-6 mr-3 text-red-600" />
                  Information and Content Disclaimers
                </h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">No Investment Advice</h3>
                <p className="text-gray-700 mb-4">
                  The information provided on this website and in our communications is for general 
                  informational purposes only and should not be construed as:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Investment advice or recommendations</li>
                  <li>Legal, tax, or accounting advice</li>
                  <li>An offer to sell or solicitation to buy securities</li>
                  <li>A guarantee of investment returns</li>
                  <li>Professional financial guidance</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Information Accuracy</h3>
                <p className="text-gray-700 mb-6">
                  While we strive to provide accurate and up-to-date information, we make no 
                  representations or warranties regarding the accuracy, completeness, or reliability 
                  of any information on this website. Information may become outdated, and we are 
                  not obligated to update it.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Information</h3>
                <p className="text-gray-700 mb-6">
                  Some information on our website may be obtained from third-party sources. We do 
                  not independently verify such information and are not responsible for its accuracy 
                  or completeness.
                </p>
              </section>

              {/* Legal Disclaimers */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-red-600" />
                  Legal Disclaimers
                </h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Forward-Looking Statements</h3>
                <p className="text-gray-700 mb-6">
                  This website may contain forward-looking statements about our business, investments, 
                  and market conditions. These statements involve risks and uncertainties, and actual 
                  results may differ materially from those expressed or implied in such statements.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mb-6">
                  <p className="text-yellow-800 font-semibold mb-2">LIABILITY LIMITATION</p>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    To the maximum extent permitted by law, Sirius Global Ventures disclaims all 
                    liability for any direct, indirect, incidental, consequential, or punitive damages 
                    arising from your use of this website or our services.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Advice</h3>
                <p className="text-gray-700 mb-6">
                  You should consult with qualified legal, tax, and financial advisors before making 
                  any investment decisions. We recommend that you seek independent professional advice 
                  tailored to your specific circumstances.
                </p>
              </section>

              {/* Regulatory Disclaimers */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileWarning className="w-6 h-6 mr-3 text-red-600" />
                  Regulatory and Compliance Disclaimers
                </h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">SEC Registration</h3>
                <p className="text-gray-700 mb-6">
                  Sirius Global Ventures will be a registered investment adviser with the U.S. Securities 
                  and Exchange Commission (SEC). Registration does not imply a certain level of skill 
                  or training or endorsement by the SEC.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Jurisdictional Limitations</h3>
                <p className="text-gray-700 mb-4">
                  Our services may not be available in all jurisdictions. The information on this 
                  website is not intended for distribution in any country where such distribution 
                  would be contrary to local laws or regulations.
                </p>
                <p className="text-gray-700 mb-6">
                  If you are located outside the United States, you are responsible for complying 
                  with applicable local laws and regulations.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Anti-Money Laundering</h3>
                <p className="text-gray-700 mb-6">
                  We are committed to complying with all applicable anti-money laundering (AML) and 
                  know-your-customer (KYC) regulations. We may request documentation to verify your 
                  identity and source of funds.
                </p>
              </section>

              {/* Website Use Disclaimers */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Website Use and Technical Disclaimers</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Website Availability</h3>
                <p className="text-gray-700 mb-6">
                  We strive to maintain website availability but cannot guarantee uninterrupted access. 
                  The website may be temporarily unavailable due to maintenance, technical issues, or 
                  other factors beyond our control.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Technology Risks</h3>
                <p className="text-gray-700 mb-6">
                  Use of our website and online services involves technology risks, including but not 
                  limited to system failures, data transmission errors, cybersecurity threats, and 
                  service interruptions. We are not liable for losses resulting from such technical issues.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">External Links</h3>
                <p className="text-gray-700 mb-6">
                  Our website may contain links to third-party websites. These links are provided for 
                  convenience only, and we do not endorse or take responsibility for the content, 
                  accuracy, or practices of external websites.
                </p>
              </section>

              {/* Tax Disclaimers */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-6 h-6 mr-3 text-red-600" />
                  Tax Disclaimers
                </h2>
                <p className="text-gray-700 mb-4">
                  Tax considerations are complex and vary based on individual circumstances. 
                  Investment activities may have significant tax implications, including:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Capital gains and losses</li>
                  <li>Alternative minimum tax implications</li>
                  <li>State and local tax considerations</li>
                  <li>International tax obligations</li>
                  <li>Retirement account restrictions</li>
                </ul>
                <p className="text-gray-700 mb-6">
                  You should consult with a qualified tax advisor regarding the tax implications of 
                  any investment decisions. We do not provide tax advice and are not responsible for 
                  any tax consequences of your investments.
                </p>
              </section>

              {/* Contact and Updates */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates and Modifications</h2>
                <p className="text-gray-700 mb-6">
                  We reserve the right to modify this disclaimer at any time without prior notice. 
                  Material changes will be indicated by updating the "last updated" date. Your 
                  continued use of our website after changes constitutes acceptance of the updated disclaimer.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions and Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this disclaimer or need clarification regarding 
                  any of the statements contained herein, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-900 font-semibold mb-2">Sirius Global Ventures</p>
                  <p className="text-gray-700">Email: legal@siriusglobalventures.com</p>
                  <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                  <p className="text-gray-700">Address: 123 Investment Street, Suite 456, New York, NY 10001</p>
                </div>
              </section>

              {/* Final Warning */}
              <section className="mb-8">
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Final Investment Warning
                  </h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    By using our website and services, you acknowledge that you have read, understood, 
                    and agree to all disclaimers and risk warnings contained herein. You further 
                    acknowledge that investment losses are possible and that you are financially 
                    prepared to accept such losses.
                  </p>
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
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-blue-600 hover:text-blue-800 underline">
                Cookie Policy
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
