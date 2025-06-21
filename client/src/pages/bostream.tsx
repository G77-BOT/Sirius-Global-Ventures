import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { BarChart2, BarChart, Lock, Settings, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/ui/feature-card";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";

// Map of icons by name
const iconMap = {
  BarChart2,
  BarChart,
  Lock,
  Settings
};

const Bostream = () => {
  // Fetch Bostream data (assuming ID 1 based on the seed data)
  const subsidiaryId = 1;
  const { data: subsidiaryData, isLoading } = useQuery({
    queryKey: ['/api/subsidiaries', subsidiaryId],
  });

  const subsidiary = subsidiaryData?.subsidiary;
  const features = subsidiaryData?.features || [];
  const stats = subsidiaryData?.stats || [];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary-dark text-white py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-12 bg-white/20 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-white/20 rounded w-full mb-2"></div>
                  <div className="h-4 bg-white/20 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-white/20 rounded w-4/6 mb-6"></div>
                  <div className="h-10 bg-white/20 rounded w-40"></div>
                </div>
              ) : (
                <>
                  <h1 className="font-heading font-bold text-3xl lg:text-5xl leading-tight mb-4">
                    {subsidiary?.name}: Advanced Crypto Trading Platform
                  </h1>
                  <p className="text-lg mb-6 text-neutral-100">
                    {subsidiary?.detailedDescription}
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <Button
                      asChild
                      className="bg-white hover:bg-neutral-100 text-secondary font-medium py-2 px-6 rounded-md text-center transition-colors duration-200"
                    >
                      <a 
                        href={subsidiary?.websiteUrl || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Start Trading
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-transparent border border-white text-white hover:bg-white/10 font-medium py-2 px-6 rounded-md text-center transition-colors duration-200"
                    >
                      <Link href="/contact?subject=bostream">
                        Contact Sales
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className="lg:w-1/2 lg:pl-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
                <div className="flex justify-center items-center mb-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <span className="text-secondary font-bold text-2xl">
                      {isLoading ? "..." : subsidiary?.logoInitials}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {isLoading ? (
                    // Loading placeholders for stats
                    Array(4).fill(0).map((_, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-md animate-pulse">
                        <div className="h-8 bg-white/10 rounded mb-2"></div>
                        <div className="h-4 bg-white/10 rounded w-1/2"></div>
                      </div>
                    ))
                  ) : (
                    // Actual stats
                    stats.map((stat: { value: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                      <div key={index} className="bg-white/5 p-4 rounded-md text-center">
                        <div className="text-white font-bold text-xl">{stat.value}</div>
                        <div className="text-white/70 text-xs">{stat.label}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex flex-col lg:flex-row items-start">
            <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-12 sticky top-24">
              <div className="flex items-center space-x-2 mb-4">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: isLoading ? '#3498DB' : subsidiary?.logoColor }}
                >
                  <span className="text-white font-bold text-xs">
                    {isLoading ? "BS" : subsidiary?.logoInitials}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-primary">
                  {isLoading ? "Bostream" : subsidiary?.name}
                </h3>
              </div>
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">
                Advanced Crypto Trading Platform
              </h2>
              <p className="text-neutral-400 mb-6">
                Bostream delivers cutting-edge technology for professional crypto traders, featuring high-frequency trading capabilities, advanced analytics, and institutional-grade security.
              </p>
              <Button
                asChild
                className="bg-secondary hover:bg-secondary-dark text-white font-medium py-2 px-6 rounded-md inline-block transition-colors duration-200"
              >
                <a 
                  href={subsidiary?.websiteUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Learn More
                </a>
              </Button>
            </div>
            
            <div className="lg:w-2/3">
              <div className="bg-neutral-100 rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isLoading ? (
                    // Loading placeholders for features
                    Array(4).fill(0).map((_, i) => (
                      <div key={i} className="bg-white p-6 rounded-md shadow-sm animate-pulse h-40">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg mb-4"></div>
                        <div className="h-5 bg-neutral-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-neutral-200 rounded w-full"></div>
                      </div>
                    ))
                  ) : (
                    // Actual features
                    features.map((feature: { iconName: string; id: Key | null | undefined; title: string; description: string; }) => {
                      // Get the appropriate icon, defaulting to BarChart2 if not found
                      const IconComponent = iconMap[feature.iconName as keyof typeof iconMap] || BarChart2;
                      
                      return (
                        <FeatureCard
                          key={feature.id}
                          icon={IconComponent}
                          title={feature.title}
                          description={feature.description}
                        />
                      );
                    })
                  )}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0 md:mr-6">
                      <h4 className="font-heading font-bold text-lg text-primary mb-1">Ready to experience Bostream?</h4>
                      <p className="text-neutral-400 text-sm">Get started with our advanced crypto trading platform today.</p>
                    </div>
                    <Button
                      asChild
                      className="bg-secondary hover:bg-secondary-dark text-white font-medium py-2 px-6 rounded-md text-center whitespace-nowrap transition-colors duration-200"
                    >
                      <a 
                        href={subsidiary?.websiteUrl || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Start Trading
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-primary mb-4">How Bostream Works</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Our platform offers an end-to-end solution for cryptocurrency trading, from market analysis to transaction execution.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-secondary/20 -translate-x-1/2"></div>
              
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1">
                    <h3 className="font-heading font-bold text-xl text-primary mb-2">Market Analysis</h3>
                    <p className="text-neutral-400">
                      Our advanced algorithms analyze market trends, volatility, and trading volumes across multiple exchanges to identify profitable trading opportunities.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center order-1 md:order-2 relative">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">1</div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 flex justify-center relative">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">2</div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="font-heading font-bold text-xl text-primary mb-2">Strategy Development</h3>
                    <p className="text-neutral-400">
                      Based on the analysis, our platform develops custom trading strategies tailored to your risk tolerance and investment goals.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1">
                    <h3 className="font-heading font-bold text-xl text-primary mb-2">Automated Execution</h3>
                    <p className="text-neutral-400">
                      Our high-frequency trading system executes transactions at optimal price points with minimal latency, maximizing your trading efficiency.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center order-1 md:order-2 relative">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">3</div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 flex justify-center relative">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white font-bold z-10">4</div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="font-heading font-bold text-xl text-primary mb-2">Portfolio Management</h3>
                    <p className="text-neutral-400">
                      Comprehensive portfolio management tools allow you to monitor performance, adjust strategies, and optimize your cryptocurrency investments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-primary mb-4">What Our Clients Say</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Hear from professional traders who have experienced the Bostream difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-primary">John Doe</h4>
                  <p className="text-neutral-400 text-sm">Professional Trader</p>
                </div>
              </div>
              <p className="text-neutral-500 italic mb-4">
                "Bostream's high-frequency trading capabilities have transformed my crypto trading strategy. The execution speed and accuracy are unmatched in the industry."
              </p>
              <div className="flex text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            <div className="bg-neutral-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AS</span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-primary">Alice Smith</h4>
                  <p className="text-neutral-400 text-sm">Investment Manager</p>
                </div>
              </div>
              <p className="text-neutral-500 italic mb-4">
                "The analytics tools provided by Bostream give me insights that were previously unavailable. It's like having a team of data scientists working for you around the clock."
              </p>
              <div className="flex text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            <div className="bg-neutral-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">RJ</span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-primary">Robert Johnson</h4>
                  <p className="text-neutral-400 text-sm">Institutional Investor</p>
                </div>
              </div>
              <p className="text-neutral-500 italic mb-4">
                "Security is paramount in crypto trading, and Bostream delivers peace of mind with their institutional-grade security protocols. Their API integration also allows seamless connection with our existing systems."
              </p>
              <div className="flex text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-secondary-dark text-white">
        <div className="container mx-auto px-4 lg:px-0 text-center">
          <h2 className="font-heading font-bold text-3xl mb-4">Ready to Revolutionize Your Crypto Trading?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of professional traders who are already using Bostream's advanced trading platform to maximize their cryptocurrency investments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              asChild
              className="bg-white text-secondary hover:bg-neutral-100 font-medium py-2 px-6 rounded-md text-center transition-colors duration-200"
            >
              <a 
                href={subsidiary?.websiteUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Start Trading Now <ExternalLink className="h-4 w-4 ml-1 inline-block" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-transparent border border-white text-white hover:bg-white/10 font-medium py-2 px-6 rounded-md text-center transition-colors duration-200"
            >
              <Link href="/contact?subject=bostream">
                Request a Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Bostream;
