import { Zap, Users, Shield, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Value } from "@shared/schema";
import ValueCard from "@/components/ui/value-card";

// Map of icons by name
const iconMap = {
  Zap,
  Users,
  Shield
};

const About = () => {
  // Fetch company values
  const { data: values, isLoading: loadingValues } = useQuery({
    queryKey: ['/api/values'],
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl leading-tight mb-4">
              About Global Holdings
            </h1>
            <p className="text-lg mb-6 text-neutral-100">
              Building a portfolio of innovative companies to shape the future of multiple industries.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-neutral-100 rounded-lg p-8 relative">
                <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-medium px-3 py-1 rounded-tr-lg">
                  Est. 2020
                </div>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold text-lg">GH</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-primary">From Vision to Reality</h3>
                      <p className="text-neutral-400 text-sm">Founded with a vision to identify, invest in, and grow innovative businesses</p>
                    </div>
                  </div>
                  <div className="pl-16 border-l-2 border-neutral-200 ml-6">
                    <div className="relative">
                      <div className="absolute -left-[34px] top-0 w-6 h-6 bg-secondary rounded-full"></div>
                      <h4 className="font-heading font-bold text-lg text-primary mb-1">2021</h4>
                      <p className="text-neutral-400 mb-6">Established corporate infrastructure and investment strategy</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[34px] top-0 w-6 h-6 bg-secondary rounded-full"></div>
                      <h4 className="font-heading font-bold text-lg text-primary mb-1">2022</h4>
                      <p className="text-neutral-400 mb-6">Expanded advisory board with industry experts</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[34px] top-0 w-6 h-6 bg-secondary rounded-full"></div>
                      <h4 className="font-heading font-bold text-lg text-primary mb-1">2023</h4>
                      <p className="text-neutral-400 mb-6">Acquired Bostream, entering the cryptocurrency trading sector</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[34px] top-0 w-6 h-6 bg-primary rounded-full"></div>
                      <h4 className="font-heading font-bold text-lg text-primary mb-1">2024</h4>
                      <p className="text-neutral-400">Currently expanding portfolio with focus on fintech and sustainable technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">Our Story</h2>
              <p className="text-neutral-400 mb-4">
                Global Holdings Ltd was founded by a team of industry veterans with decades of experience in identifying and nurturing promising businesses. Our journey began with a simple yet powerful vision: to create a diversified holding company that invests in forward-thinking organizations across multiple sectors.
              </p>
              <p className="text-neutral-400 mb-4">
                We believe that the most successful companies of tomorrow are those that solve real problems with innovative approaches. Our investment philosophy is centered around identifying these disruptors early and providing them with the capital, expertise, and connections they need to thrive.
              </p>
              <p className="text-neutral-400 mb-6">
                Today, Global Holdings is home to a growing portfolio of companies, each chosen for their unique contribution to their respective industries. Our first major acquisition, Bostream, exemplifies our commitment to investing in cutting-edge technology that transforms traditional markets.
              </p>
              <div className="bg-neutral-100 p-4 rounded-md border-l-4 border-secondary mb-6">
                <p className="italic text-neutral-500">
                  "Our mission is not just to invest in companies, but to invest in visions that have the potential to reshape industries and improve lives."
                </p>
                <p className="text-sm text-neutral-400 mt-2">— CEO, Global Holdings Ltd</p>
              </div>
              <Link href="/about/leadership">
                <a className="inline-flex items-center text-secondary hover:text-secondary-dark font-medium">
                  Meet our leadership team
                  <ChevronRight className="h-5 w-5 ml-1" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-primary mb-4">Our Values</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              The core principles that guide our investment decisions and company operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {loadingValues ? (
              // Loading placeholders
              Array(3).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-lg p-6 text-center animate-pulse h-64"
                ></div>
              ))
            ) : (
              // Actual values
              values?.map((value: Value) => {
                // Get the appropriate icon, defaulting to Zap if not found
                const IconComponent = iconMap[value.iconName as keyof typeof iconMap] || Zap;
                
                return (
                  <ValueCard
                    key={value.id}
                    icon={IconComponent}
                    title={value.title}
                    description={value.description}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">Mission & Vision</h2>
              <div className="bg-primary p-8 rounded-lg text-white mb-6">
                <h3 className="font-heading font-bold text-2xl mb-4">Our Mission</h3>
                <p className="mb-4">
                  To identify, invest in, and grow innovative companies that are solving real-world problems across multiple industries, creating value for our investors, employees, and the communities we serve.
                </p>
                <h3 className="font-heading font-bold text-2xl mb-4">Our Vision</h3>
                <p>
                  To build a diverse portfolio of industry-leading companies that are shaping the future through innovative solutions and sustainable business practices.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-100 p-4 rounded-md">
                  <div className="text-primary font-bold text-3xl mb-2">10+</div>
                  <div className="text-neutral-400 text-sm">Years of combined executive experience</div>
                </div>
                <div className="bg-neutral-100 p-4 rounded-md">
                  <div className="text-primary font-bold text-3xl mb-2">5+</div>
                  <div className="text-neutral-400 text-sm">Industries in our investment focus</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-neutral-100 rounded-lg p-8">
                <h3 className="font-heading font-bold text-2xl text-primary mb-6">Our Investment Focus</h3>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-primary mb-2">Financial Technology</h4>
                      <p className="text-neutral-400 text-sm">Investing in companies that are revolutionizing financial services through technology innovation.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-primary mb-2">Renewable Energy</h4>
                      <p className="text-neutral-400 text-sm">Supporting businesses that are developing sustainable energy solutions for a cleaner future.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-primary mb-2">Digital Transformation</h4>
                      <p className="text-neutral-400 text-sm">Investing in companies that are helping traditional industries adapt to the digital age.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-primary mb-2">Cloud Infrastructure</h4>
                      <p className="text-neutral-400 text-sm">Backing companies that are building the backbone of tomorrow's digital economy.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-secondary-dark text-white">
        <div className="container mx-auto px-4 lg:px-0 text-center">
          <h2 className="font-heading font-bold text-3xl mb-4">Join Our Journey</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Whether you're an investor, a potential portfolio company, or someone looking to join our team, we'd love to connect with you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/investor-relations">
              <a className="bg-white text-secondary hover:bg-neutral-100 font-medium py-2 px-6 rounded-md text-center transition-colors duration-200">
                Investor Relations
              </a>
            </Link>
            <Link href="/companies">
              <a className="bg-transparent border border-white text-white hover:bg-white/10 font-medium py-2 px-6 rounded-md text-center transition-colors duration-200">
                Our Companies
              </a>
            </Link>
            <Link href="/contact">
              <a className="bg-transparent border border-white text-white hover:bg-white/10 font-medium py-2 px-6 rounded-md text-center transition-colors duration-200">
                Contact Us
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
