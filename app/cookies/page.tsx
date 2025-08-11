import Link from 'next/link';
import { Cookie, Settings, Eye, BarChart, Shield, Globe } from 'lucide-react';

export default function CookiePolicyPage() {
  const lastUpdated = "March 1, 2024";

  const cookieTypes = [
    {
      name: "Essential Cookies",
      icon: Shield,
      color: "from-green-600 to-emerald-600",
      description: "Required for the website to function properly and cannot be disabled.",
      examples: [
        "Authentication and security",
        "Session management",
        "Load balancing",
        "CSRF protection"
      ],
      canDisable: false
    },
    {
      name: "Analytics Cookies",
      icon: BarChart,
      color: "from-blue-600 to-indigo-600",
      description: "Help us understand how visitors use our website to improve user experience.",
      examples: [
        "Google Analytics",
        "Page view tracking",
        "User behavior analysis",
        "Performance monitoring"
      ],
      canDisable: true
    },
    {
      name: "Functional Cookies",
      icon: Settings,
      color: "from-purple-600 to-pink-600",
      description: "Enable enhanced functionality and personalization features.",
      examples: [
        "Language preferences",
        "Theme settings",
        "Form data storage",
        "User preferences"
      ],
      canDisable: true
    },
    {
      name: "Marketing Cookies",
      icon: Eye,
      color: "from-orange-600 to-red-600",
      description: "Used to track visitors across websites for advertising purposes.",
      examples: [
        "Ad targeting",
        "Social media integration",
        "Retargeting campaigns",
        "Conversion tracking"
      ],
      canDisable: true
    }
  ];

  return (
    <>      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl overflow-hidden mb-12">
            <div className="px-8 py-16 md:px-12">
              <div className="text-center">
                <Cookie className="w-16 h-16 mx-auto mb-6 text-orange-100" />
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
                <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                  Learn about how Sirius Global Ventures uses cookies and similar technologies 
                  to enhance your browsing experience and analyze website usage.
                </p>
                <p className="text-orange-200 mt-4">Last updated: {lastUpdated}</p>
              </div>
            </div>
          </section>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Cookie className="w-6 h-6 mr-3 text-orange-600" />
                  What Are Cookies?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
                  when you visit a website. They help websites remember information about your visit, 
                  such as your preferred language and other settings.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Similar technologies include web beacons, pixels, local storage, and other tracking 
                  technologies that serve similar purposes.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
                <p className="text-gray-700 mb-6">
                  Sirius Global Ventures uses cookies and similar technologies for various purposes:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cookieTypes.map((type, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                      <div className={`bg-gradient-to-r ${type.color} p-4`}>
                        <div className="flex items-center space-x-3">
                          <type.icon className="w-6 h-6 text-white" />
                          <h3 className="text-lg font-bold text-white">{type.name}</h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 text-sm mb-4">{type.description}</p>
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Examples:</h4>
                          <ul className="space-y-1">
                            {type.examples.map((example, exampleIndex) => (
                              <li key={exampleIndex} className="text-xs text-gray-600">
                                • {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className={`text-xs px-3 py-1 rounded-full ${
                          type.canDisable 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {type.canDisable ? 'Can be disabled' : 'Essential - Cannot be disabled'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Specific Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900">
                        <th className="border border-gray-300 p-3 text-left font-semibold">Cookie Name</th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">Purpose</th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">Duration</th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3 font-mono text-xs">_sgv_session</td>
                        <td className="border border-gray-300 p-3">Maintains user session and authentication</td>
                        <td className="border border-gray-300 p-3">Session</td>
                        <td className="border border-gray-300 p-3">Essential</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-900">
                        <td className="border border-gray-300 p-3 font-mono text-xs">_ga</td>
                        <td className="border border-gray-300 p-3">Google Analytics - tracks unique visitors</td>
                        <td className="border border-gray-300 p-3">2 years</td>
                        <td className="border border-gray-300 p-3">Analytics</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-mono text-xs">_ga_*</td>
                        <td className="border border-gray-300 p-3">Google Analytics - enhanced measurement</td>
                        <td className="border border-gray-300 p-3">2 years</td>
                        <td className="border border-gray-300 p-3">Analytics</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-900">
                        <td className="border border-gray-300 p-3 font-mono text-xs">theme_preference</td>
                        <td className="border border-gray-300 p-3">Remembers light/dark theme setting</td>
                        <td className="border border-gray-300 p-3">1 year</td>
                        <td className="border border-gray-300 p-3">Functional</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-mono text-xs">cookie_consent</td>
                        <td className="border border-gray-300 p-3">Stores cookie consent preferences</td>
                        <td className="border border-gray-300 p-3">1 year</td>
                        <td className="border border-gray-300 p-3">Essential</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-6 h-6 mr-3 text-orange-600" />
                  Managing Your Cookie Preferences
                </h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookie Banner</h3>
                <p className="text-gray-700 mb-4">
                  When you first visit our website, you'll see a cookie banner allowing you to 
                  accept or customize your cookie preferences. You can change these settings at any time.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser Settings</h3>
                <p className="text-gray-700 mb-4">
                  You can also control cookies through your browser settings:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Site permissions → Cookies and site data</li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mb-6">
                  <p className="text-yellow-800 font-semibold mb-2">Important Note</p>
                  <p className="text-yellow-700 text-sm">
                    Disabling certain cookies may limit website functionality and affect your user experience.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-orange-600" />
                  Third-Party Cookies
                </h2>
                <p className="text-gray-700 mb-4">
                  Some cookies on our website are set by third-party services:
                </p>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Google Analytics</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      We use Google Analytics to understand how visitors use our website.
                    </p>
                    <Link 
                      href="https://policies.google.com/privacy" 
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Google Privacy Policy
                    </Link>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">LinkedIn Insights</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      For professional networking and business analytics purposes.
                    </p>
                    <Link 
                      href="https://www.linkedin.com/legal/privacy-policy" 
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      LinkedIn Privacy Policy
                    </Link>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Consent</h2>
                <p className="text-gray-700 mb-4">
                  By continuing to use our website after being informed about our use of cookies, 
                  you consent to our use of cookies as described in this policy.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Withdrawing Consent</h3>
                <p className="text-gray-700 mb-4">
                  You can withdraw your consent at any time by:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Clicking the "Cookie Settings" link in our footer</li>
                  <li>Clearing your browser cookies</li>
                  <li>Contacting us directly at privacy@siriusglobalventures.com</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
                <p className="text-gray-700 mb-4">
                  Cookies are retained for different periods depending on their purpose:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent cookies:</strong> Remain until their expiration date or manual deletion</li>
                  <li><strong>Analytics cookies:</strong> Typically retained for 2 years</li>
                  <li><strong>Functional cookies:</strong> Usually retained for 1 year</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our 
                  practices or applicable laws. We will notify you of any material changes by 
                  updating the "last updated" date at the top of this policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about our use of cookies, please contact us at:
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

          {/* Cookie Management */}
          <div className="mt-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Your Cookie Preferences</h2>
                <p className="text-gray-600 mb-6">
                  Click the button below to update your cookie consent preferences at any time.
                </p>
                <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors">
                  Cookie Settings
                </button>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline">
                Terms of Service
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
