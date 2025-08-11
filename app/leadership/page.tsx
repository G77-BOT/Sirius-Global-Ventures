import Link from 'next/link';
import React from 'react';
import { ArrowLeft, Linkedin, Twitter, Mail, Award, Users, Target, Globe } from 'lucide-react';

export default function LeadershipPage() {
  const leaders = [
    {
      id: 1,
      name: "Mohamud Abdiaziz Mohamed",
      position: "Founder, CEO & Creator",
      company: "Sirius Global Ventures & BotStream",
      bio: "Mohamud Abdiaziz Mohamed is the visionary founder and CEO of Sirius Global Ventures Holding, as well as the creator of BotStream, the company's flagship AI trading platform. With his innovative approach to technology and business, he has established SGV as a diversified investment company focused on cutting-edge businesses across multiple sectors.",
      expertise: [
        "Strategic Leadership & Vision",
        "AI & Machine Learning",
        "Cryptocurrency Trading Systems",
        "Investment Strategy",
        "Technology Innovation",
        "Business Development"
      ],
      achievements: [
        "Founded Sirius Global Ventures Holding in 2024",
        "Created BotStream AI trading platform with access to 14+ exchanges",
        "Pioneered advanced arbitrage trading algorithms",
        "Built diverse portfolio across technology, e-commerce, and AI sectors",
        "Established strategic partnerships across multiple industries"
      ],
      image: "/api/placeholder/400/400",
      initials: "MAM",
      gradient: "from-blue-600 to-indigo-600",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "mohamud@siriusglobalventures.com"
      }
    },
    {
      id: 2,
      name: "Joseph Jackson",
      position: "Vice President",
      company: "Sirius Global Ventures",
      bio: "Joseph Jackson serves as Vice President of Sirius Global Ventures and is credited with coining the name 'Sirius Global Ventures.' As a key member of the global holding company, he brings strategic insight and operational excellence to the organization's diverse portfolio of investments.",
      expertise: [
        "Corporate Strategy",
        "Brand Development",
        "Operational Excellence",
        "Partnership Development",
        "Market Analysis",
        "Portfolio Management"
      ],
      achievements: [
        "Co-founded Sirius Global Ventures branding and identity",
        "Developed strategic partnerships across portfolio companies",
        "Led operational improvements resulting in enhanced efficiency",
        "Established corporate governance frameworks",
        "Drove expansion into new market segments"
      ],
      image: "/api/placeholder/400/400",
      initials: "JJ",
      gradient: "from-purple-600 to-pink-600",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "joseph@siriusglobalventures.com"
      }
    },
    {
      id: 3,
      name: "Margaret Ajibola",
      position: "Head of Frontend Development",
      company: "BotStream",
      bio: "Margaret Ajibola serves as Head of the Frontend Department, which is the right role for her. Over the past weeks, her ambition and dedication have shone through in the project and for us both. She is an inspiration to us and hopefully will be for many years to come. Her work and contributions to BotStream have not gone unnoticed and will continue to be recognized.",
      expertise: [
        "Node.js Development",
        "Next.js Framework",
        "React Native",
        "JavaScript & TypeScript",
        "Frontend Architecture",
        "Web App Development"
      ],
      achievements: [
        "Joined the BotStream project two months ago and has been improving continuously",
        "Specializes in frontend development with robust infrastructure improvements",
        "Graduated from web app development boot camp in 2021",
        "Pioneer in her field and one of the best frontend developers",
        "Over 3.5 years of experience with continuous growth and learning",
        "Contributed to making BotStream's frontend more advanced and robust"
      ],
      image: "/api/placeholder/400/400",
      initials: "MA",
      gradient: "from-green-600 to-emerald-600",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "margaret@bostream.ca"
      }
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
              <Link href="/portfolio" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Portfolio
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Leadership Team</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Meet the visionary leaders driving innovation and excellence at Sirius Global Ventures, 
                shaping the future of business across multiple industries.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Profiles */}
        <section className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {leaders.map((leader) => (
              <div key={leader.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${leader.gradient} p-8 text-white`}>
                  <div className="flex items-center space-x-6">
                    {/* Profile Image/Avatar */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span className="text-2xl font-bold text-white">{leader.initials}</span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{leader.name}</h2>
                      <p className="text-lg text-white/90 mb-1">{leader.position}</p>
                      <p className="text-white/80 text-sm">{leader.company}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Bio */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Biography</h3>
                    <p className="text-gray-700 leading-relaxed">{leader.bio}</p>
                  </div>

                  {/* Expertise */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas of Expertise</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {leader.expertise.map((skill, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          <span className="text-gray-700 text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h3>
                    <div className="space-y-3">
                      {leader.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact & Social */}
                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
                    <div className="flex items-center space-x-4">
                      <a 
                        href={`mailto:${leader.social.email}`}
                        className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <a 
                        href={leader.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a 
                        href={leader.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                        title="Twitter Profile"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Company Values driven by Leadership */}
        <section className="py-16 bg-white rounded-2xl mb-12">
          <div className="px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership-Driven Excellence</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our leaders embody the values and vision that drive Sirius Global Ventures' success across all portfolio companies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Visionary Leadership</h4>
                <p className="text-gray-600 text-sm">Forward-thinking strategies that anticipate market trends and opportunities</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Collaborative Excellence</h4>
                <p className="text-gray-600 text-sm">Building strong teams and partnerships that drive collective success</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Innovation Focus</h4>
                <p className="text-gray-600 text-sm">Constantly pushing boundaries to create breakthrough solutions</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Global Perspective</h4>
                <p className="text-gray-600 text-sm">Understanding international markets and cross-cultural dynamics</p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Quote/Vision */}
        <section className="py-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 text-center">
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-xl md:text-2xl font-medium mb-6 italic">
                "At Sirius Global Ventures, we believe in the power of strategic leadership to transform industries 
                and create lasting value. Our commitment to innovation, integrity, and excellence drives everything we do."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">SGV</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">Leadership Team</div>
                  <div className="text-blue-100 text-sm">Sirius Global Ventures</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Work With Our Team?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you're seeking investment opportunities or looking to partner with us, 
              our leadership team is ready to explore how we can create value together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Our Team
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                View Our Portfolio
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
