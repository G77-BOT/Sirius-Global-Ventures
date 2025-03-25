import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Subsidiary } from "@shared/schema";
import AnimatedBackground from "@/components/AnimatedBackground";
import Floating3DLogo from "@/components/ui/floating-3d-logo";

const HeroSection = () => {
  const { data: subsidiaries, isLoading } = useQuery({
    queryKey: ['/api/subsidiaries'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 relative overflow-hidden">
      {/* Animated particle background */}
      <AnimatedBackground density={30} color="#ffffff" speed={0.02} />
      
      <div className="container mx-auto px-4 lg:px-0 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="font-heading font-bold text-3xl lg:text-5xl leading-tight mb-4 glow-effect">
              Building the Future Through Strategic Investments
            </h1>
            <p className="text-lg mb-6 text-neutral-100">
              Sirius Global Ventures is a diversified holding company with a portfolio of innovative businesses across multiple sectors.
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
                className="bg-white/90 backdrop-blur-sm text-primary hover:bg-white font-medium py-2 px-6 rounded-md text-center transition-colors duration-200"
              >
                <Link href="/investor-relations">
                  Investor Relations
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-10">
            <div className="relative">
              <div className="w-full h-64 lg:h-96 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center card-3d overflow-hidden">
                {/* Grid lines background */}
                <div className="absolute inset-0 grid-lines"></div>
                
                {/* Corporate structure visual with 3D logo */}
                <div className="bg-white/80 w-4/5 h-4/5 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center relative z-10 backdrop-blur-sm">
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <Floating3DLogo text="SGV" colorPrimary="#3498DB" colorSecondary="#2C3E50" size="lg" />
                  </div>
                  
                  <div className="text-primary font-bold text-2xl mb-8 mt-16">Sirius Global Ventures</div>
                  
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
                            <a className="bg-neutral-100/80 backdrop-blur-sm rounded-md p-3 text-center hover:bg-neutral-200 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                              <div 
                                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 animate-pulse-slow shadow-md"
                                style={{ backgroundColor: subsidiary.logoColor }}
                              >
                                <span className="text-white font-bold text-sm">{subsidiary.logoInitials}</span>
                              </div>
                              <div className="text-primary text-sm font-bold">{subsidiary.name}</div>
                            </a>
                          </Link>
                        ))}
                        
                        {/* Fill in with placeholder "coming soon" subsidiaries */}
                        {Array(Math.max(0, 3 - (subsidiaries?.length || 0))).fill(0).map((_, i) => (
                          <div key={`placeholder-${i}`} className="bg-neutral-100/50 backdrop-blur-sm rounded-md p-3 text-center">
                            <div className="w-12 h-12 mx-auto bg-neutral-200/70 rounded-full flex items-center justify-center mb-2">
                              <span className="text-white font-bold text-sm">+</span>
                            </div>
                            <div className="text-primary text-sm">Future Co.</div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  
                  {/* Animated connection lines between parent and subsidiaries */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg width="100%" height="100%" className="opacity-30">
                      <path d="M 50% 30% L 25% 60%" stroke="#3498DB" strokeWidth="1" strokeDasharray="5,5" />
                      <path d="M 50% 30% L 50% 60%" stroke="#3498DB" strokeWidth="1" strokeDasharray="5,5" />
                      <path d="M 50% 30% L 75% 60%" stroke="#3498DB" strokeWidth="1" strokeDasharray="5,5" />
                    </svg>
                  </div>
                </div>
                
                {/* Decorative glowing orbs */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
