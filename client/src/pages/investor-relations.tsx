import { BarChart, TrendingUp, DollarSign, FileText, Download, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InvestorRelations = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl leading-tight mb-4">
              Investor Relations
            </h1>
            <p className="text-lg mb-6 text-neutral-100">
              Access information about Global Holdings' financial performance, corporate governance, and investment opportunities.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                className="bg-secondary hover:bg-secondary-dark text-white font-medium py-2 px-6 rounded-md text-center transition-colors duration-200"
              >
                <Link href="#financial-information">
                  Financial Information
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white text-primary hover:bg-neutral-100 font-medium py-2 px-6 rounded-md text-center transition-colors duration-200"
              >
                <Link href="#investment-opportunities">
                  Investment Opportunities
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/2">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">Investment Overview</h2>
              <p className="text-neutral-400 mb-6">
                Global Holdings Ltd is a diversified holding company with strategic investments across multiple high-growth sectors. Our investment approach focuses on identifying innovative companies with strong leadership and disruptive potential.
              </p>
              <p className="text-neutral-400 mb-6">
                As a holding company, we provide long-term capital and strategic guidance to our portfolio companies, helping them scale operations, enter new markets, and create sustainable value for all stakeholders.
              </p>
              
              <div className="bg-neutral-100 p-6 rounded-lg mb-6">
                <h3 className="font-heading font-bold text-xl text-primary mb-4">Investment Highlights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="min-w-[24px] h-6 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2 text-neutral-500">Diversified portfolio across fintech, blockchain, and technology sectors</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[24px] h-6 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2 text-neutral-500">Strong management team with extensive industry experience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[24px] h-6 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2 text-neutral-500">Focus on high-growth markets with significant disruption potential</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[24px] h-6 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2 text-neutral-500">Clear path to value creation through strategic acquisitions and organic growth</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[24px] h-6 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2 text-neutral-500">Commitment to sustainable business practices and ESG principles</span>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/5 p-4 rounded-md text-center">
                  <div className="text-primary font-bold text-3xl">10+</div>
                  <div className="text-neutral-400 text-sm">Sectors of interest</div>
                </div>
                <div className="bg-primary/5 p-4 rounded-md text-center">
                  <div className="text-primary font-bold text-3xl">$50M+</div>
                  <div className="text-neutral-400 text-sm">Investment capacity</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-neutral-100 rounded-lg p-8">
                <h3 className="font-heading font-bold text-2xl text-primary mb-6">Our Investment Strategy</h3>
                
                <Tabs defaultValue="approach">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="approach">Approach</TabsTrigger>
                    <TabsTrigger value="sectors">Focus Sectors</TabsTrigger>
                    <TabsTrigger value="criteria">Criteria</TabsTrigger>
                  </TabsList>
                  <TabsContent value="approach" className="pt-6">
                    <div className="space-y-4">
                      <p className="text-neutral-500">
                        Our investment approach combines thorough market analysis with strategic foresight. We focus on:
                      </p>
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <TrendingUp className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-lg text-primary mb-1">Long-term Growth</h4>
                          <p className="text-neutral-400 text-sm">We invest with a long-term perspective, focusing on sustainable growth rather than short-term gains.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <DollarSign className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-lg text-primary mb-1">Value Creation</h4>
                          <p className="text-neutral-400 text-sm">We actively work with our portfolio companies to create value through strategic guidance and operational support.</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="sectors" className="pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-heading font-bold text-primary mb-2">Financial Technology</h4>
                          <p className="text-neutral-400 text-sm">Blockchain, cryptocurrency, digital payments, and financial infrastructure</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-heading font-bold text-primary mb-2">Renewable Energy</h4>
                          <p className="text-neutral-400 text-sm">Clean energy solutions, sustainable infrastructure, and green technologies</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-heading font-bold text-primary mb-2">Healthcare Technology</h4>
                          <p className="text-neutral-400 text-sm">Digital health, telemedicine, and healthcare data analytics</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-heading font-bold text-primary mb-2">Enterprise Software</h4>
                          <p className="text-neutral-400 text-sm">AI, machine learning, cloud infrastructure, and SaaS solutions</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="criteria" className="pt-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="min-w-[24px] h-6 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <span className="ml-2 text-neutral-500"><strong className="text-primary">Strong Leadership Team</strong> with proven track record and industry expertise</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-[24px] h-6 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <span className="ml-2 text-neutral-500"><strong className="text-primary">Scalable Business Model</strong> with potential for significant growth</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-[24px] h-6 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="ml-2 text-neutral-500"><strong className="text-primary">Innovative Solutions</strong> that address real market needs</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-[24px] h-6 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                          </svg>
                        </div>
                        <span className="ml-2 text-neutral-500"><strong className="text-primary">Large Market Opportunity</strong> with significant addressable market</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Information Section */}
      <section id="financial-information" className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">Financial Information</h2>
              <p className="text-neutral-400 max-w-3xl mx-auto">
                Access the latest financial reports, presentations, and regulatory filings for Global Holdings Ltd.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-primary">Annual Reports</h4>
                      <p className="text-neutral-400 text-sm">Comprehensive annual financial statements and performance metrics</p>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    <span>Download</span>
                  </Button>
                </div>
                <div className="mt-6 border-t border-neutral-100 pt-4">
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                      <span className="text-neutral-500">Annual Report 2023</span>
                      <Button variant="ghost" size="sm" className="text-secondary">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-neutral-500">Annual Report 2022</span>
                      <Button variant="ghost" size="sm" className="text-secondary">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-neutral-500">Annual Report 2021</span>
                      <Button variant="ghost" size="sm" className="text-secondary">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-primary">Quarterly Results</h4>
                      <p className="text-neutral-400 text-sm">Quarterly financial performance updates and earnings reports</p>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    <span>Download</span>
                  </Button>
                </div>
                <div className="mt-6 border-t border-neutral-100 pt-4">
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                      <span className="text-neutral-500">Q4 2023 Results</span>
                      <Button variant="ghost" size="sm" className="text-secondary">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-neutral-500">Q3 2023 Results</span>
                      <Button variant="ghost" size="sm" className="text-secondary">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-neutral-500">Q2 2023 Results</span>
                      <Button variant="ghost" size="sm" className="text-secondary">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-neutral-500">Q1 2023 Results</span>
                      <Button variant="ghost" size="sm" className="text-secondary">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-primary">Investor Presentations</h4>
                      <p className="text-neutral-400 text-sm">Presentations providing insights into our business strategy and performance</p>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    <span>Download</span>
                  </Button>
                </div>
                <div className="mt-6 border-t border-neutral-100 pt-4">
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                      <span className="text-neutral-500">2024 Strategic Overview</span>
                      <Button variant="ghost" size="sm" className="text-secondary">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-neutral-500">Bostream Acquisition Presentation</span>
                      <Button variant="ghost" size="sm" className="text-secondary">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-neutral-500">Investor Day 2023</span>
                      <Button variant="ghost" size="sm" className="text-secondary">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunities Section */}
      <section id="investment-opportunities" className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">Investment Opportunities</h2>
              <p className="text-neutral-400 max-w-3xl mx-auto">
                Explore current and upcoming investment opportunities with Global Holdings Ltd.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg p-8">
                <h3 className="font-heading font-bold text-2xl mb-4">Private Equity</h3>
                <p className="mb-6 text-white/80">
                  Our private equity program focuses on mid-market companies with proven business models and significant growth potential. We partner with management teams to accelerate growth and create long-term value.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Investment size: $5-50 million</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Target companies: Established with $2-20M EBITDA</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Investment horizon: 4-7 years</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="bg-white text-primary hover:bg-neutral-100 font-medium py-2 px-6 rounded-md inline-block transition-colors duration-200 mt-2"
                >
                  <Link href="/contact?subject=investor">
                    Learn More
                  </Link>
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-secondary to-secondary-dark text-white rounded-lg p-8">
                <h3 className="font-heading font-bold text-2xl mb-4">Venture Capital</h3>
                <p className="mb-6 text-white/80">
                  Our venture capital arm invests in early to mid-stage technology companies with disruptive solutions in our focus sectors. We provide capital, strategic guidance, and access to our global network.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Investment size: $500K-5 million</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Focus: Seed to Series B</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sectors: Fintech, Cleantech, Health tech</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="bg-white text-secondary hover:bg-neutral-100 font-medium py-2 px-6 rounded-md inline-block transition-colors duration-200 mt-2"
                >
                  <Link href="/contact?subject=investor">
                    Learn More
                  </Link>
                </Button>
              </div>
              
              <div className="bg-neutral-100 rounded-lg p-8 col-span-1 md:col-span-2">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <h3 className="font-heading font-bold text-2xl text-primary mb-2">Interested in Investing with Us?</h3>
                    <p className="text-neutral-400">
                      Whether you're an institutional investor, family office, or accredited individual investor, we offer various investment opportunities aligned with your financial goals.
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md whitespace-nowrap transition-colors duration-200"
                  >
                    <Link href="/contact?subject=investor">
                      Get in Touch
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Governance Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">Corporate Governance</h2>
              <p className="text-neutral-400 max-w-3xl mx-auto">
                Global Holdings is committed to maintaining the highest standards of corporate governance, ensuring transparency and accountability to our shareholders.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-heading font-bold text-xl text-primary mb-4">Board of Directors</h3>
                <p className="text-neutral-400 mb-4">
                  Our Board of Directors brings together experienced professionals with diverse expertise across finance, technology, and global markets.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="text-secondary"
                >
                  <Link href="/about/leadership">
                    Meet Our Board
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-heading font-bold text-xl text-primary mb-4">Governance Documents</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 text-secondary mr-2" />
                    <span className="text-neutral-500">Code of Business Conduct</span>
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 text-secondary mr-2" />
                    <span className="text-neutral-500">Corporate Governance Guidelines</span>
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 text-secondary mr-2" />
                    <span className="text-neutral-500">Audit Committee Charter</span>
                  </li>
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="text-secondary"
                >
                  <a href="#">
                    View Documents
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-heading font-bold text-xl text-primary mb-4">ESG Commitment</h3>
                <p className="text-neutral-400 mb-4">
                  Environmental, Social, and Governance (ESG) considerations are integrated into our investment process and business operations.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="text-secondary"
                >
                  <a href="#">
                    Our ESG Approach
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-heading font-bold text-xl text-primary mb-4">Regulatory Filings</h3>
                <p className="text-neutral-400 mb-4">
                  Access our regulatory filings, compliance documents, and reporting standards.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="text-secondary"
                >
                  <a href="#">
                    View Filings
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 lg:px-0 text-center">
          <h2 className="font-heading font-bold text-3xl mb-4">Join Our Investor Community</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Stay updated with the latest news, financial reports, and investment opportunities from Global Holdings Ltd.
          </p>
          <Button
            asChild
            className="bg-white text-primary hover:bg-neutral-100 font-medium py-3 px-8 rounded-md inline-block transition-colors duration-200"
          >
            <Link href="/contact?subject=investor">
              Connect with Investor Relations
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default InvestorRelations;
