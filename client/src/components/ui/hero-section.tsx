import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Subsidiary } from "@shared/schema";

const HeroSection = () => {
  const { data: subsidiaries, isLoading } = useQuery({
    queryKey: ['/api/subsidiaries'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="font-heading font-bold text-3xl lg:text-5xl leading-tight mb-4">
              Building the Future Through Strategic Investments
            </h1>
            <p className="text-lg mb-6 text-neutral-100">
              Global Holdings Ltd is a diversified holding company with a portfolio of innovative businesses across multiple sectors.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                className="bg-secondary hover:bg-secondary-dark text-white font-medium py-2 px-6 rounded-md text-center transition-colors duration-200"
              >
                <Link href="/companies">
                  Explore Our Companies
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white text-primary hover:bg-neutral-100 font-medium py-2 px-6 rounded-md text-center transition-colors duration-200"
              >
                <Link href="/investor-relations">
                  Investor Relations
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-10">
            <div className="relative">
              <div className="w-full h-64 lg:h-96 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center">
                {/* Corporate structure visual */}
                <div className="bg-white/90 w-4/5 h-4/5 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-xl">GH</span>
                  </div>
                  <div className="text-primary font-bold text-xl mb-6">Global Holdings Ltd</div>
                  <div className="grid grid-cols-3 gap-4 w-full">
                    {isLoading ? (
                      // Loading placeholders
                      Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-neutral-100 rounded-md p-3 text-center">
                          <div className="w-10 h-10 mx-auto bg-neutral-200 rounded-full flex items-center justify-center mb-2 animate-pulse">
                          </div>
                          <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
                        </div>
                      ))
                    ) : (
                      // Actual subsidiaries + placeholders
                      <>
                        {subsidiaries?.map((subsidiary: Subsidiary, index: number) => (
                          <Link key={subsidiary.id} href={`/companies/${subsidiary.name.toLowerCase()}`}>
                            <a className="bg-neutral-100 rounded-md p-3 text-center hover:bg-neutral-200 transition-colors duration-200">
                              <div 
                                className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2"
                                style={{ backgroundColor: subsidiary.logoColor }}
                              >
                                <span className="text-white font-bold text-xs">{subsidiary.logoInitials}</span>
                              </div>
                              <div className="text-primary text-xs font-bold">{subsidiary.name}</div>
                            </a>
                          </Link>
                        ))}
                        
                        {/* Fill in with placeholder "coming soon" subsidiaries */}
                        {Array(Math.max(0, 3 - (subsidiaries?.length || 0))).fill(0).map((_, i) => (
                          <div key={`placeholder-${i}`} className="bg-neutral-100 rounded-md p-3 text-center opacity-50">
                            <div className="w-10 h-10 mx-auto bg-neutral-200 rounded-full flex items-center justify-center mb-2">
                              <span className="text-white font-bold text-xs">+</span>
                            </div>
                            <div className="text-primary text-xs">Future Co.</div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
