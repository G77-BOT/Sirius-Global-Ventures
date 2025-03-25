import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import ContactForm from "@/components/ui/contact-form";
import ContactInfo from "@/components/ui/contact-info";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [location] = useLocation();
  const { toast } = useToast();
  const [initialSubject, setInitialSubject] = useState<string>("");

  // Parse query parameters for pre-filling the form
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get("subject");
    
    if (subject) {
      // Map URL parameter to form subject values
      const subjectMap: Record<string, string> = {
        "general": "general",
        "investor": "investor",
        "bostream": "bostream",
        "partnership": "partnership",
        "careers": "careers"
      };
      
      const mappedSubject = subjectMap[subject] || "general";
      setInitialSubject(mappedSubject);
      
      toast({
        title: "Form Pre-filled",
        description: `Subject set to: ${mappedSubject.charAt(0).toUpperCase() + mappedSubject.slice(1)}`,
        variant: "default",
      });
    }
  }, [location, toast]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl leading-tight mb-4">
              Contact Us
            </h1>
            <p className="text-lg mb-6 text-neutral-100">
              Have questions about Global Holdings or our portfolio companies? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">Get in Touch</h2>
              <p className="text-neutral-400 mb-8">
                Fill out the form below and a member of our team will get back to you as soon as possible.
              </p>
              
              <ContactForm initialSubject={initialSubject} />
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

      {/* Map and Office Locations Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-primary mb-4">Our Locations</h2>
            <p className="text-neutral-400 max-w-3xl mx-auto">
              Global Holdings has offices in strategic locations around the world to better serve our portfolio companies and investors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-neutral-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-primary mb-2">New York</h3>
                <p className="text-neutral-400 text-sm mb-4">
                  123 Corporate Drive<br />
                  Suite 500<br />
                  New York, NY 10001<br />
                  United States
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-secondary mr-2" />
                    <span className="text-neutral-500">+1 (234) 567-890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-secondary mr-2" />
                    <span className="text-neutral-500">newyork@globalholdings.com</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-neutral-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-primary mb-2">London</h3>
                <p className="text-neutral-400 text-sm mb-4">
                  45 Finsbury Square<br />
                  6th Floor<br />
                  London, EC2A 1HP<br />
                  United Kingdom
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-secondary mr-2" />
                    <span className="text-neutral-500">+44 20 1234 5678</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-secondary mr-2" />
                    <span className="text-neutral-500">london@globalholdings.com</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-neutral-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-primary mb-2">Singapore</h3>
                <p className="text-neutral-400 text-sm mb-4">
                  1 Raffles Quay<br />
                  North Tower, Level 25<br />
                  Singapore 048583
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-secondary mr-2" />
                    <span className="text-neutral-500">+65 6123 4567</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-secondary mr-2" />
                    <span className="text-neutral-500">singapore@globalholdings.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">Frequently Asked Questions</h2>
              <p className="text-neutral-400">
                Find quick answers to common questions about Global Holdings and our subsidiaries.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-neutral-100 rounded-lg p-6">
                <h3 className="font-heading font-bold text-xl text-primary mb-2">How can I invest in Global Holdings?</h3>
                <p className="text-neutral-500">
                  Global Holdings offers various investment opportunities for qualified investors. Please contact our Investor Relations team through the form above or by emailing investors@globalholdings.com for more information.
                </p>
              </div>
              
              <div className="bg-neutral-100 rounded-lg p-6">
                <h3 className="font-heading font-bold text-xl text-primary mb-2">How do I apply for a job at one of your companies?</h3>
                <p className="text-neutral-500">
                  Visit our Careers page to browse current job openings across Global Holdings and our portfolio companies. You can apply directly through our online application system.
                </p>
              </div>
              
              <div className="bg-neutral-100 rounded-lg p-6">
                <h3 className="font-heading font-bold text-xl text-primary mb-2">Is Bostream available in my country?</h3>
                <p className="text-neutral-500">
                  Bostream currently operates in select markets with plans for global expansion. Visit the Bostream website for the most up-to-date information on supported countries and regions.
                </p>
              </div>
              
              <div className="bg-neutral-100 rounded-lg p-6">
                <h3 className="font-heading font-bold text-xl text-primary mb-2">How can I propose my company for acquisition or investment?</h3>
                <p className="text-neutral-500">
                  If you believe your company aligns with our investment criteria, please reach out using the contact form above. Select "Partnership Opportunities" as the subject and provide details about your business in the message field.
                </p>
              </div>
              
              <div className="bg-neutral-100 rounded-lg p-6">
                <h3 className="font-heading font-bold text-xl text-primary mb-2">Where can I find financial reports and investor information?</h3>
                <p className="text-neutral-500">
                  Visit our Investor Relations page for access to financial reports, presentations, and other information relevant to investors and stakeholders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
