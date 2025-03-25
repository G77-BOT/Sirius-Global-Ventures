import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { News, Subsidiary } from "@shared/schema";
import { Calendar, Search, Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NewsCard from "@/components/ui/news-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NewsPage = () => {
  // State for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch all news items
  const { data: newsItems, isLoading: loadingNews } = useQuery({
    queryKey: ['/api/news'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch all subsidiaries to get their names for news items
  const { data: subsidiaries } = useQuery({
    queryKey: ['/api/subsidiaries'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Get a specific subsidiary by ID
  const getSubsidiaryById = (id: number) => {
    return subsidiaries?.find((sub: Subsidiary) => sub.id === id);
  };

  // Extract unique categories for filter
  const categories = newsItems 
    ? Array.from(new Set(newsItems.map((item: News) => item.category))) 
    : [];

  // Filter news items
  const filteredNews = newsItems ? newsItems.filter((item: News) => {
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  }) : [];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl leading-tight mb-4">
              News & Updates
            </h1>
            <p className="text-lg mb-6 text-neutral-100">
              Stay informed about the latest developments and announcements from Global Holdings and our portfolio companies.
            </p>
          </div>
        </div>
      </section>

      {/* News Filters */}
      <section className="py-8 bg-white border-b border-neutral-100">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search news..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-neutral-400" />
                    <SelectValue placeholder="All Categories" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 lg:px-0">
          {loadingNews ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-96"></div>
              ))}
            </div>
          ) : filteredNews.length > 0 ? (
            <>
              {/* Featured News (first item) */}
              <div className="mb-12">
                {(() => {
                  const featuredNews = filteredNews[0];
                  const subsidiary = featuredNews.subsidiaryId ? getSubsidiaryById(featuredNews.subsidiaryId) : null;
                  
                  return (
                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 h-64 lg:h-auto bg-neutral-200 relative">
                          <img 
                            src={featuredNews.imageUrl || "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=700&q=80"} 
                            alt={featuredNews.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-0 left-0 bg-secondary text-white text-xs font-medium px-3 py-1">
                            {featuredNews.category}
                          </div>
                        </div>
                        <div className="lg:w-1/2 p-8">
                          <div className="flex items-center mb-4">
                            <div className={`w-6 h-6 ${subsidiary ? "bg-secondary" : "bg-primary"} rounded-full flex items-center justify-center mr-2`}>
                              <span className="text-white font-bold text-xs">{subsidiary?.logoInitials || "GH"}</span>
                            </div>
                            <span className="text-neutral-300 text-sm">{subsidiary?.name || "Global Holdings"}</span>
                            <span className="mx-2 text-neutral-300">•</span>
                            <div className="flex items-center text-neutral-300 text-sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDistanceToNow(new Date(featuredNews.publishDate), { addSuffix: true })}
                            </div>
                          </div>
                          <h2 className="font-heading font-bold text-2xl lg:text-3xl text-primary mb-4">{featuredNews.title}</h2>
                          <p className="text-neutral-400 mb-6 line-clamp-3 lg:line-clamp-5">{featuredNews.content}</p>
                          <Button
                            asChild
                            variant="outline"
                            className="text-secondary hover:text-secondary-dark"
                          >
                            <a href={`/news/${featuredNews.id}`} className="inline-flex items-center">
                              Read Full Story
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              
              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredNews.slice(1).map((news: News) => {
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
                })}
              </div>
            </>
          ) : (
            // No results found
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-neutral-400" />
              </div>
              <h3 className="font-heading font-bold text-xl text-primary mb-2">No News Found</h3>
              <p className="text-neutral-400 max-w-md mx-auto mb-6">
                We couldn't find any news items matching your current filters. Please try adjusting your search criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-8">
              Stay up-to-date with the latest news and announcements from Global Holdings and our portfolio companies.
            </p>
            <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mb-2 sm:mb-0 sm:mr-2 sm:flex-grow"
              />
              <Button className="bg-white text-primary hover:bg-neutral-100">
                Subscribe
              </Button>
            </div>
            <p className="mt-4 text-sm opacity-70">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsPage;
