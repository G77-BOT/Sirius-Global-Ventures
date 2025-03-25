import { Zap, Users, Shield, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Subsidiary, News, Value } from "@shared/schema";

import HeroSection from "@/components/ui/hero-section";
import ValueCard from "@/components/ui/value-card";
import CompanyCard from "@/components/ui/company-card";
import NewsCard from "@/components/ui/news-card";
import ContactForm from "@/components/ui/contact-form";
import ContactInfo from "@/components/ui/contact-info";

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

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-primary mb-4">About Global Holdings</h2>
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
              <a className="inline-flex items-center text-secondary hover:text-secondary-dark font-medium">
                Learn more about our story
                <ChevronRight className="h-5 w-5 ml-1" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Companies Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-primary mb-4">Our Companies</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Global Holdings is proud to support a diverse portfolio of innovative companies across multiple sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 mb-12">
            {loadingSubsidiaries ? (
              // Loading placeholder
              <div className="bg-white rounded-lg p-8 animate-pulse h-96"></div>
            ) : firstSubsidiary ? (
              // Display the first subsidiary with its stats
              <CompanyCard 
                subsidiary={firstSubsidiary} 
                stats={subsidiaryDetails?.stats}
              />
            ) : (
              // No subsidiaries found
              <div className="bg-white/50 border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-neutral-200 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-neutral-400 mb-2">Future Subsidiary</h3>
                <p className="text-neutral-300 max-w-lg mx-auto mb-4">
                  Global Holdings is continuously expanding our portfolio with innovative companies that align with our vision.
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
            <div className="bg-white/50 border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-neutral-200 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-neutral-400 mb-2">Future Subsidiary</h3>
              <p className="text-neutral-300 max-w-lg mx-auto mb-4">
                Global Holdings is continuously expanding our portfolio with innovative companies that align with our vision.
              </p>
              <Link href="/contact">
                <a className="inline-flex items-center text-secondary hover:text-secondary-dark font-medium">
                  Contact us to discuss opportunities
                  <ChevronRight className="h-5 w-5 ml-1" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-primary mb-4">News & Updates</h2>
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
              <div className="col-span-3 text-center py-12 bg-neutral-100 rounded-lg">
                <p className="text-neutral-400">No recent news articles available.</p>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <Link href="/news">
              <a className="inline-flex items-center text-secondary hover:text-secondary-dark font-medium">
                View all news and updates
                <ChevronRight className="h-5 w-5 ml-1" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">Contact Us</h2>
              <p className="text-neutral-400 mb-8">
                Have questions about Global Holdings or our portfolio companies? We'd love to hear from you.
              </p>
              
              <ContactForm />
            </div>
            
            <div className="lg:w-1/2 lg:pl-12">
              <div className="bg-neutral-100 rounded-lg p-8 h-full">
                <h3 className="font-heading font-bold text-2xl text-primary mb-6">Connect With Us</h3>
                
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
