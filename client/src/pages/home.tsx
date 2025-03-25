import { Zap, Users, Shield, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Subsidiary, News, Value } from "@shared/schema";
import { useEffect } from "react";
import gsap from "gsap";

import HeroSection from "@/components/ui/hero-section";
import ValueCard from "@/components/ui/value-card";
import CompanyCard from "@/components/ui/company-card";
import NewsCard from "@/components/ui/news-card";
import ContactForm from "@/components/ui/contact-form";
import ContactInfo from "@/components/ui/contact-info";
import CryptoChart from "@/components/ui/crypto-chart";
import AnimatedBackground from "@/components/AnimatedBackground";
import Floating3DLogo from "@/components/ui/floating-3d-logo";

// Map of icons by name
const iconMap = {
  Zap,
  Users,
  Shield
};

const Home = () => {
  // Fetch subsidiaries
  const { data: subsidiaries, isLoading: loadingSubsidiaries } = useQuery({
    queryKey: ['/api/subsidiaries'],
  });

  // Fetch company values
  const { data: values, isLoading: loadingValues } = useQuery({
    queryKey: ['/api/values'],
  });

  // Fetch news
  const { data: newsItems, isLoading: loadingNews } = useQuery({
    queryKey: ['/api/news'],
  });

  // Get a specific subsidiary by ID
  const getSubsidiaryById = (id: number) => {
    return subsidiaries?.find((sub: Subsidiary) => sub.id === id);
  };

  // Get the first subsidiary and its details
  const firstSubsidiary = subsidiaries && subsidiaries.length > 0 ? subsidiaries[0] : null;

  // Get the stats for a subsidiary
  const { data: subsidiaryDetails } = useQuery({
    queryKey: ['/api/subsidiaries', firstSubsidiary?.id],
    enabled: !!firstSubsidiary,
  });
  
  // Sample crypto chart data
  const sampleCryptoData = Array.from({ length: 30 }, (_, i) => ({
    time: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    price: 30000 + Math.random() * 20000,
    volume: 500000000 + Math.random() * 1000000000
  }));
  
  // Animation effects on component mount
  useEffect(() => {
    // Simple animation for sections
    const sections = document.querySelectorAll('section:not(:first-child)');
    
    // Initially set sections to be invisible
    sections.forEach((section) => {
      gsap.set(section, { opacity: 0, y: 50 });
    });
    
    // Then animate them in after a short delay
    setTimeout(() => {
      sections.forEach((section, index) => {
        gsap.to(section, { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: index * 0.2 // Stagger the animations
        });
      });
    }, 300);
    
    // Animate value cards with staggered effect
    const valueCards = document.querySelectorAll('.value-card');
    gsap.fromTo(
      valueCards, 
      { opacity: 0, scale: 0.9 }, 
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5, 
        stagger: 0.1,
        delay: 0.5 
      }
    );
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="py-16 bg-white relative">
        {/* Decorative background elements */}
        <div className="absolute right-0 top-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 lg:px-0 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-primary mb-4 animate-glow-subtle">About Sirius Global Ventures</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Our mission is to build, acquire, and grow innovative companies that are shaping the future across multiple industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {loadingValues ? (
              // Loading placeholders
              Array(3).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-neutral-100 rounded-lg p-6 text-center animate-pulse h-64"
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
          
          <div className="text-center">
            <Link href="/about">
              <a className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-secondary hover:bg-white hover:text-secondary-dark font-medium transition-all duration-300 hover:shadow-md">
                Learn more about our story
                <ChevronRight className="h-5 w-5 ml-1" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Companies Section */}
      <section className="py-16 bg-neutral-100 relative overflow-hidden">
        {/* Decorative blockchain elements */}
        <AnimatedBackground density={15} color="#3498DB" speed={0.005} />
        
        <div className="container mx-auto px-4 lg:px-0 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-primary mb-4">Our Companies</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Sirius Global Ventures is proud to support a diverse portfolio of innovative companies across multiple sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 mb-12">
            {loadingSubsidiaries ? (
              // Loading placeholder
              <div className="bg-white rounded-lg p-8 animate-pulse h-96"></div>
            ) : firstSubsidiary ? (
              // Display the first subsidiary with its stats
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="p-8">
                    <CompanyCard 
                      subsidiary={firstSubsidiary} 
                      stats={subsidiaryDetails?.stats}
                    />
                  </div>
                  <div className="p-8 bg-gradient-to-br from-neutral-50 to-neutral-100">
                    <h3 className="font-heading font-bold text-xl text-primary mb-4">
                      {firstSubsidiary.name} Performance
                    </h3>
                    <div className="h-64">
                      <CryptoChart 
                        title="Trading Volume" 
                        subtitle="Last 30 days" 
                        data={sampleCryptoData} 
                        color={firstSubsidiary.logoColor} 
                        gradient={true}
                        animated={true}
                      />
                    </div>
                    <div className="mt-4">
                      <Link href={`/companies/${firstSubsidiary.name.toLowerCase()}`}>
                        <a className="inline-flex items-center bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full text-primary hover:bg-primary/20 font-medium transition-all duration-300">
                          Explore {firstSubsidiary.name}
                          <ChevronRight className="h-5 w-5 ml-1" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // No subsidiaries found
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-dashed border-neutral-200 p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-neutral-200 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-neutral-400 mb-2">Future Subsidiary</h3>
                <p className="text-neutral-300 max-w-lg mx-auto mb-4">
                  Sirius Global Ventures is continuously expanding our portfolio with innovative companies that align with our vision.
                </p>
                <Link href="/contact">
                  <a className="inline-flex items-center text-secondary hover:text-secondary-dark font-medium">
                    Contact us to discuss opportunities
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </a>
                </Link>
              </div>
            )}
            
            {/* Future Companies Placeholder */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-dashed border-neutral-200 p-8 text-center relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto bg-neutral-200 rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-neutral-400 mb-2">Future Innovation</h3>
                <p className="text-neutral-300 max-w-lg mx-auto mb-4">
                  Sirius Global Ventures is continuously expanding our portfolio with innovative companies that align with our vision.
                </p>
                <Link href="/contact">
                  <a className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-secondary hover:bg-white hover:text-secondary-dark font-medium transition-all duration-300 hover:shadow-md">
                    Contact us to discuss opportunities
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-16 bg-white relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 lg:px-0 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-primary mb-4 animate-glow-subtle">News & Updates</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Stay informed about the latest developments across our portfolio of companies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {loadingNews ? (
              // Loading placeholders
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-neutral-100 rounded-lg animate-pulse h-96"></div>
              ))
            ) : newsItems && newsItems.length > 0 ? (
              // Display up to 3 news items
              newsItems.slice(0, 3).map((news: News) => {
                // If the news is associated with a subsidiary, get that subsidiary's details
                const subsidiary = news.subsidiaryId ? getSubsidiaryById(news.subsidiaryId) : null;
                
                return (
                  <NewsCard
                    key={news.id}
                    id={news.id}
                    title={news.title}
                    content={news.content}
                    category={news.category}
                    imageUrl={news.imageUrl}
                    publishDate={new Date(news.publishDate)}
                    subsidiaryId={news.subsidiaryId}
                    subsidiaryName={subsidiary?.name}
                    subsidiaryInitials={subsidiary?.logoInitials}
                  />
                );
              })
            ) : (
              // No news found
              <div className="col-span-3 text-center py-12 bg-neutral-100 rounded-lg backdrop-blur-sm">
                <p className="text-neutral-400">No recent news articles available.</p>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <Link href="/news">
              <a className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-secondary hover:bg-white hover:text-secondary-dark font-medium transition-all duration-300 hover:shadow-md">
                View all news and updates
                <ChevronRight className="h-5 w-5 ml-1" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-neutral-100 relative overflow-hidden">
        <AnimatedBackground density={10} color="#3498DB" speed={0.003} />
        
        <div className="container mx-auto px-4 lg:px-0 relative z-10">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4 animate-glow-subtle">Contact Us</h2>
              <p className="text-neutral-400 mb-8">
                Have questions about Sirius Global Ventures or our portfolio companies? We'd love to hear from you.
              </p>
              
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm">
                <ContactForm />
              </div>
            </div>
            
            <div className="lg:w-1/2 lg:pl-12">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 h-full shadow-sm">
                <h3 className="font-heading font-bold text-2xl text-primary mb-6">Connect With Us</h3>
                
                <ContactInfo />
                
                {/* Floating 3D logo in corner */}
                <div className="absolute -bottom-8 -right-8 opacity-20 pointer-events-none">
                  <Floating3DLogo text="SGV" colorPrimary="#3498DB" colorSecondary="#2C3E50" size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
