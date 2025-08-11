import Link from 'next/link';
import { ArrowLeft, TrendingUp, Users, Target, Shield, Globe, CheckCircle, DollarSign } from 'lucide-react';

export default function InvestmentCriteriaPage() {
  const criteriaCategories = [
    {
      title: "Company Stage & Size",
      icon: TrendingUp,
      color: "from-blue-600 to-indigo-600",
      criteria: [
        "Early to growth-stage companies",
        "Annual revenue of $1M to $50M",
        "Demonstrated product-market fit",
        "Clear path to scalability",
        "Strong unit economics"
      ]
    },
    {
      title: "Leadership & Team",
      icon: Users,
      color: "from-purple-600 to-pink-600",
      criteria: [
        "Experienced and committed founders",
        "Strong technical and business expertise",
        "Proven execution track record",
        "Aligned vision and values",
        "Ability to attract top talent"
      ]
    },
    {
      title: "Market Opportunity",
      icon: Target,
      color: "from-green-600 to-emerald-600",
      criteria: [
        "Large and growing addressable market",
        "Significant competitive advantages",
        "Disruptive technology or business model",
        "Clear market timing",
        "Multiple expansion opportunities"
      ]
    },
    {
      title: "Financial Profile",
      icon: DollarSign,
      color: "from-orange-600 to-red-600",
      criteria: [
        "Strong revenue growth trajectory",
        "Improving margins and efficiency",
        "Capital efficient growth model",
        "Clear path to profitability",
        "Transparent financial reporting"
      ]
    }
  ];

  const industriesFocus = [
    {
      name: "Financial Technology",
      description: "Blockchain, cryptocurrency, digital payments, and trading platforms",
      examples: ["BotStream - AI Trading Platform"]
    },
    {
      name: "Artificial Intelligence",
      description: "Machine learning, automation, and AI-powered solutions",
      examples: ["Data analytics", "Process automation", "Predictive modeling"]
    },
    {
      name: "Software as a Service",
      description: "Cloud-based software solutions for businesses and consumers",
      examples: ["Enterprise software", "Productivity tools", "API platforms"]
    },
    {
      name: "E-commerce & Digital",
      description: "Online marketplaces, digital commerce, and consumer platforms",
      examples: ["Marketplaces", "Direct-to-consumer", "Digital services"]
    },
    {
      name: "Technology Infrastructure",
      description: "Cloud computing, cybersecurity, and IT infrastructure",
      examples: ["Cloud services", "Security solutions", "DevOps tools"]
    },
    {
      name: "Emerging Technologies",
      description: "IoT, AR/VR, blockchain, and next-generation technologies",
      examples: ["IoT platforms", "Immersive experiences", "Web3 applications"]
    }
  ];

  const investmentProcess = [
    {
      step: 1,
      title: "Initial Screening",
      description: "Review of business plan, financial metrics, and market opportunity",
      duration: "1-2 weeks"
    },
    {
      step: 2,
      title: "Due Diligence",
      description: "Comprehensive analysis of business, technology, and competitive position",
      duration: "4-6 weeks"
    },
    {
      step: 3,
      title: "Investment Committee",
      description: "Presentation to our investment committee for final approval",
      duration: "1-2 weeks"
    },
    {
      step: 4,
      title: "Term Negotiation",
      description: "Negotiation of investment terms and partnership structure",
      duration: "2-3 weeks"
    },
    {
      step: 5,
      title: "Closing & Onboarding",
      description: "Legal documentation, funding, and integration into our portfolio",
      duration: "2-4 weeks"
    }
  ];

  return (
    <>      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link href="/portfolio" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </Link>

          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl overflow-hidden mb-12">
            <div className="px-8 py-16 md:px-12">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Investment Criteria</h1>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                  Our strategic framework for identifying and evaluating exceptional investment opportunities 
                  that align with our vision for the future of business and technology.
                </p>
              </div>
            </div>
          </section>

          {/* Investment Criteria */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Look For</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our investment decisions are guided by rigorous criteria that help us identify companies 
                with the highest potential for sustainable growth and market impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {criteriaCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className={`bg-gradient-to-r ${category.color} p-6`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {category.criteria.map((criterion, criterionIndex) => (
                        <li key={criterionIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Industry Focus */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Focus Areas</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  We focus on high-growth sectors where technology and innovation create significant competitive advantages.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industriesFocus.map((industry, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{industry.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{industry.description}</p>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Examples:</h4>
                      <ul className="space-y-1">
                        {industry.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="text-sm text-blue-600">
                            • {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Investment Process */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Investment Process</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A structured approach that ensures thorough evaluation while maintaining efficiency 
                for exceptional opportunities.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="space-y-8">
                {investmentProcess.map((phase, index) => (
                  <div key={index} className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {phase.step}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{phase.title}</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {phase.duration}
                        </span>
                      </div>
                      <p className="text-gray-600">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Investment Range */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6">Investment Range</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div>
                    <div className="text-3xl font-bold mb-2">$500K - $5M</div>
                    <div className="text-green-100">Initial Investment</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">$10M+</div>
                    <div className="text-green-100">Follow-on Rounds</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">3-7 Years</div>
                    <div className="text-green-100">Investment Horizon</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Partner With Us?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                If your company meets our investment criteria and you're looking for a strategic partner 
                to accelerate your growth, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact?type=investment"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Submit Your Pitch
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  General Inquiry
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>    </>
  );
}
