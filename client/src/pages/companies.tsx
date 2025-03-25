import { useQuery } from "@tanstack/react-query";
import { Subsidiary, Stat } from "@shared/schema";
import CompanyCard from "@/components/ui/company-card";
import { Plus } from "lucide-react";
import { Link } from "wouter";

const Companies = () => {
  // Fetch all subsidiaries
  const { data: subsidiaries, isLoading: loadingSubsidiaries } = useQuery({
    queryKey: ['/api/subsidiaries'],
  });

  // Get stats for each subsidiary
  const subsidiaryStats = subsidiaries?.map((subsidiary: Subsidiary) => {
    return useQuery({
      queryKey: ['/api/subsidiaries', subsidiary.id],
      enabled: !!subsidiary,
    });
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl leading-tight mb-4">
              Our Companies
            </h1>
            <p className="text-lg mb-6 text-neutral-100">
              Discover our diverse portfolio of innovative businesses across multiple sectors
            </p>
          </div>
        </div>
      </section>

      {/* Companies List Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">Portfolio Companies</h2>
              <p className="text-neutral-400">
                Global Holdings Ltd invests in forward-thinking companies that are disrupting and transforming their respective industries.
              </p>
            </div>
            
            <div className="space-y-12">
              {loadingSubsidiaries ? (
                // Loading placeholders
                Array(2).fill(0).map((_, i) => (
                  <div key={i} className="bg-neutral-100 rounded-lg animate-pulse h-96"></div>
                ))
              ) : subsidiaries && subsidiaries.length > 0 ? (
                // Display actual subsidiaries
                subsidiaries.map((subsidiary: Subsidiary, index: number) => {
                  const statsData = subsidiaryStats?.[index]?.data?.stats;
                  
                  return (
                    <CompanyCard 
                      key={subsidiary.id} 
                      subsidiary={subsidiary}
                      stats={statsData}
                    />
                  );
                })
              ) : (
                // No subsidiaries found
                <div className="text-center py-12 bg-neutral-100 rounded-lg">
                  <p className="text-neutral-400">No companies available at this time.</p>
                </div>
              )}
              
              {/* Future Company Placeholder */}
              <div className="bg-white/50 border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-neutral-200 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="font-heading font-bold text-xl text-neutral-400 mb-2">Future Subsidiary</h3>
                <p className="text-neutral-300 max-w-lg mx-auto mb-4">
                  Global Holdings is continuously expanding our portfolio with innovative companies that align with our vision.
                </p>
                <Link href="/contact">
                  <a className="inline-flex items-center text-secondary hover:text-secondary-dark font-medium">
                    Contact us to discuss opportunities
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Criteria Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">Our Investment Criteria</h2>
              <p className="text-neutral-400 max-w-3xl mx-auto">
                When evaluating potential investments, we look for companies that meet the following criteria:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-lg text-primary mb-2">Strong Leadership Team</h4>
                <p className="text-neutral-400 text-sm">We invest in teams with a proven track record, deep industry knowledge, and the vision to drive innovation.</p>
              </div>
              
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-lg text-primary mb-2">Scalable Business Model</h4>
                <p className="text-neutral-400 text-sm">We look for businesses with potential for significant growth and the ability to scale operations efficiently.</p>
              </div>
              
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-lg text-primary mb-2">Innovative Solutions</h4>
                <p className="text-neutral-400 text-sm">We invest in companies that offer unique products or services that solve real problems in their target markets.</p>
              </div>
              
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-lg text-primary mb-2">Clear Value Proposition</h4>
                <p className="text-neutral-400 text-sm">We seek businesses with a clear understanding of their unique value proposition and competitive advantage.</p>
              </div>
              
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-lg text-primary mb-2">Market Opportunity</h4>
                <p className="text-neutral-400 text-sm">We target companies addressing large or rapidly growing markets with significant revenue potential.</p>
              </div>
              
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-heading font-bold text-lg text-primary mb-2">Financial Viability</h4>
                <p className="text-neutral-400 text-sm">We invest in companies with sound financial fundamentals and a clear path to profitability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl mb-6">Interested in Becoming Part of Global Holdings?</h2>
            <p className="text-lg mb-8">
              If your company aligns with our investment criteria and you're looking for a strategic partner to help accelerate growth, we'd love to hear from you.
            </p>
            <Link href="/contact">
              <a className="bg-white text-primary hover:bg-neutral-100 font-medium py-3 px-8 rounded-md inline-block transition-colors duration-200">
                Start a Conversation
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Companies;
