import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Briefcase, MapPin, Calendar, Filter, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobPosting } from "@shared/schema";

const Careers = () => {
  // State for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Fetch all job postings
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['/api/jobs'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Unique departments and locations for filters
  const departments = jobs ? Array.from(new Set(jobs.map((job: JobPosting) => job.department))) : [];
  const locations = jobs ? Array.from(new Set(jobs.map((job: JobPosting) => job.location))) : [];

  // Filter jobs
  const filteredJobs = jobs ? jobs.filter((job: JobPosting) => {
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !departmentFilter || job.department === departmentFilter;
    const matchesLocation = !locationFilter || job.location === locationFilter;
    
    return matchesSearch && matchesDepartment && matchesLocation;
  }) : [];

  // Group jobs by subsidiary
  const groupedJobs = filteredJobs ? filteredJobs.reduce((acc: Record<string | number, JobPosting[]>, job: JobPosting) => {
    const key = job.subsidiaryId || 'Global Holdings';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(job);
    return acc;
  }, {}) : {};

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl leading-tight mb-4">
              Join Our Team
            </h1>
            <p className="text-lg mb-6 text-neutral-100">
              Discover exciting career opportunities across Global Holdings and our portfolio companies.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                className="bg-secondary hover:bg-secondary-dark text-white font-medium py-2 px-6 rounded-md text-center transition-colors duration-200"
              >
                <a href="#open-positions">
                  View Open Positions
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white text-primary hover:bg-neutral-100 font-medium py-2 px-6 rounded-md text-center transition-colors duration-200"
              >
                <Link href="/contact?subject=careers">
                  Contact Recruiting
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-primary mb-4">Why Work With Us</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              At Global Holdings, we're building a team of talented professionals who are passionate about innovation and driving growth across diverse industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-neutral-100 rounded-lg hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-primary mb-2">Innovative Environment</h3>
                <p className="text-neutral-400">We foster a culture of innovation where creative thinking and new ideas are encouraged and rewarded.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-100 rounded-lg hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-primary mb-2">Professional Growth</h3>
                <p className="text-neutral-400">We invest in your development with continuous learning opportunities, mentorship, and career advancement.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-100 rounded-lg hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-primary mb-2">Collaborative Culture</h3>
                <p className="text-neutral-400">Work alongside diverse, talented professionals who value teamwork, inclusion, and shared success.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-100 rounded-lg p-8">
              <h3 className="font-heading font-bold text-2xl text-primary mb-4">Benefits & Perks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="min-w-[24px] h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2 text-neutral-500">Competitive compensation</span>
                </div>
                <div className="flex items-start">
                  <div className="min-w-[24px] h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2 text-neutral-500">Comprehensive health benefits</span>
                </div>
                <div className="flex items-start">
                  <div className="min-w-[24px] h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2 text-neutral-500">Retirement plans with matching</span>
                </div>
                <div className="flex items-start">
                  <div className="min-w-[24px] h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2 text-neutral-500">Flexible work arrangements</span>
                </div>
                <div className="flex items-start">
                  <div className="min-w-[24px] h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2 text-neutral-500">Generous paid time off</span>
                </div>
                <div className="flex items-start">
                  <div className="min-w-[24px] h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2 text-neutral-500">Professional development budget</span>
                </div>
                <div className="flex items-start">
                  <div className="min-w-[24px] h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2 text-neutral-500">Parental leave</span>
                </div>
                <div className="flex items-start">
                  <div className="min-w-[24px] h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2 text-neutral-500">Wellness programs</span>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-100 rounded-lg p-8">
              <h3 className="font-heading font-bold text-2xl text-primary mb-4">Our Commitment to Diversity</h3>
              <p className="text-neutral-500 mb-4">
                Global Holdings is committed to fostering a diverse and inclusive workplace where all employees feel valued and empowered to succeed. We believe that diverse perspectives drive innovation and better business outcomes.
              </p>
              <p className="text-neutral-500 mb-4">
                We actively work to create an environment that celebrates differences and provides equal opportunities for growth and advancement regardless of background, identity, or experience.
              </p>
              <div className="bg-white p-4 rounded-md border-l-4 border-secondary">
                <p className="italic text-neutral-500">
                  "We're building teams that reflect the diversity of the communities we serve, bringing together unique perspectives to solve complex challenges."
                </p>
                <p className="text-sm text-neutral-400 mt-2">— Chief People Officer, Global Holdings Ltd</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-primary mb-4">Open Positions</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Explore current job opportunities across Global Holdings and our subsidiary companies.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-neutral-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search positions..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-neutral-400" />
                      <SelectValue placeholder="Department" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Departments</SelectItem>
                    {departments.map((dept, index) => (
                      <SelectItem key={index} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-neutral-400" />
                      <SelectValue placeholder="Location" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    {locations.map((loc, index) => (
                      <SelectItem key={index} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {searchTerm || departmentFilter || locationFilter ? (
              <div className="mt-4 flex items-center">
                <Filter className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm text-neutral-500">
                  Filters: {[
                    searchTerm && `"${searchTerm}"`,
                    departmentFilter,
                    locationFilter
                  ].filter(Boolean).join(", ")}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 text-sm"
                  onClick={() => {
                    setSearchTerm("");
                    setDepartmentFilter("");
                    setLocationFilter("");
                  }}
                >
                  Clear
                </Button>
              </div>
            ) : null}
          </div>
          
          {/* Job Listings */}
          <div className="space-y-8">
            {isLoading ? (
              // Loading placeholder
              <div className="animate-pulse space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-6 h-48"></div>
                ))}
              </div>
            ) : (
              // Job listings by company
              Object.entries(groupedJobs).length > 0 ? (
                Object.entries(groupedJobs).map(([companyKey, companyJobs]) => (
                  <div key={companyKey} className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-heading font-bold text-2xl text-primary mb-4">
                      {companyKey === 'Global Holdings' ? 'Global Holdings' : 'Bostream'}
                    </h3>
                    <div className="space-y-4">
                      {companyJobs.map((job: JobPosting) => (
                        <div key={job.id} className="border-b border-neutral-100 last:border-0 pb-4 last:pb-0">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <h4 className="font-heading font-bold text-lg text-primary">{job.title}</h4>
                              <div className="flex flex-wrap items-center mt-1 text-sm text-neutral-500">
                                <div className="flex items-center mr-4">
                                  <Briefcase className="h-4 w-4 mr-1 text-neutral-400" />
                                  {job.department}
                                </div>
                                <div className="flex items-center mr-4">
                                  <MapPin className="h-4 w-4 mr-1 text-neutral-400" />
                                  {job.location}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-neutral-400" />
                                  {job.type}
                                </div>
                              </div>
                            </div>
                            <Button
                              asChild
                              className="bg-secondary hover:bg-secondary-dark text-white mt-4 md:mt-0"
                            >
                              <a href={`/careers/job/${job.id}`}>
                                View Job
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </a>
                            </Button>
                          </div>
                          <p className="mt-2 text-neutral-500 line-clamp-2">
                            {job.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // No jobs found
                <div className="bg-white rounded-lg p-8 text-center">
                  <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="h-8 w-8 text-neutral-400" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-primary mb-2">No Positions Found</h3>
                  <p className="text-neutral-400 max-w-md mx-auto mb-6">
                    We couldn't find any positions matching your current filters. Please try adjusting your search criteria or check back later.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setDepartmentFilter("");
                      setLocationFilter("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">Our Application Process</h2>
              <p className="text-neutral-400 max-w-3xl mx-auto">
                Learn what to expect when you apply for a position with Global Holdings or one of our subsidiaries.
              </p>
            </div>
            
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 -translate-x-1/2"></div>
              
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 order-2 md:order-1 md:text-right">
                    <h3 className="font-heading font-bold text-xl text-primary mb-2">1. Application</h3>
                    <p className="text-neutral-400">
                      Submit your application through our careers portal. Make sure your resume highlights your relevant skills and experience.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center order-1 md:order-2 relative">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">1</div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 flex justify-center relative">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">2</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                    <h3 className="font-heading font-bold text-xl text-primary mb-2">2. Initial Screening</h3>
                    <p className="text-neutral-400">
                      Our recruiting team will review your application and reach out if there's a potential match with one of our open positions.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 order-2 md:order-1 md:text-right">
                    <h3 className="font-heading font-bold text-xl text-primary mb-2">3. Interviews</h3>
                    <p className="text-neutral-400">
                      Selected candidates will participate in a series of interviews, which may include video calls, in-person meetings, and technical assessments.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center order-1 md:order-2 relative">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">3</div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 flex justify-center relative">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">4</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                    <h3 className="font-heading font-bold text-xl text-primary mb-2">4. Decision & Offer</h3>
                    <p className="text-neutral-400">
                      After the interview process, we'll make a decision and extend an offer to the selected candidate, including details on compensation and benefits.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 order-2 md:order-1 md:text-right">
                    <h3 className="font-heading font-bold text-xl text-primary mb-2">5. Onboarding</h3>
                    <p className="text-neutral-400">
                      Welcome to the team! Our comprehensive onboarding process will help you integrate smoothly into your new role and company culture.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center order-1 md:order-2 relative">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">5</div>
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
          <h2 className="font-heading font-bold text-3xl mb-4">Don't See the Right Position?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals to join our team. Submit your resume for future consideration, and we'll contact you when a suitable position becomes available.
          </p>
          <Button
            asChild
            className="bg-white text-secondary hover:bg-neutral-100 font-medium py-3 px-8 rounded-md inline-block transition-colors duration-200"
          >
            <Link href="/contact?subject=careers">
              Send Your Resume
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Careers;
