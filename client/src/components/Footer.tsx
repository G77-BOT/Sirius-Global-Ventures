import { Facebook, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">SGV</span>
              </div>
              <div>
                <div className="font-heading font-bold text-xl text-white">Sirius Global Ventures</div>
                <div className="text-xs text-white/50">Corporate Excellence</div>
              </div>
            </div>
            <p className="text-neutral-100/80 mb-6">
              Sirius Global Ventures is a diversified holding company investing in innovative businesses across multiple sectors.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/"><div className="text-neutral-100/80 hover:text-white transition-colors duration-200 cursor-pointer">Home</div></Link></li>
              <li><Link href="/about"><div className="text-neutral-100/80 hover:text-white transition-colors duration-200 cursor-pointer">About Us</div></Link></li>
              <li><Link href="/companies"><div className="text-neutral-100/80 hover:text-white transition-colors duration-200 cursor-pointer">Our Companies</div></Link></li>
              <li><Link href="/investor-relations"><div className="text-neutral-100/80 hover:text-white transition-colors duration-200 cursor-pointer">Investor Relations</div></Link></li>
              <li><Link href="/news"><div className="text-neutral-100/80 hover:text-white transition-colors duration-200 cursor-pointer">News & Updates</div></Link></li>
              <li><Link href="/careers"><div className="text-neutral-100/80 hover:text-white transition-colors duration-200 cursor-pointer">Careers</div></Link></li>
              <li><Link href="/contact"><div className="text-neutral-100/80 hover:text-white transition-colors duration-200 cursor-pointer">Contact Us</div></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg text-white mb-4">Our Companies</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/companies/bostream">
                  <div className="text-neutral-100/80 hover:text-white transition-colors duration-200 flex items-center cursor-pointer">
                    <span className="w-4 h-4 mr-2 bg-secondary rounded-full flex-shrink-0 flex items-center justify-center">
                      <span className="text-white font-bold text-[8px]">BS</span>
                    </span>
                    Bostream
                  </div>
                </Link>
              </li>
              <li>
                <span className="text-neutral-100/50 transition-colors duration-200 flex items-center cursor-default">
                  <span className="w-4 h-4 mr-2 bg-neutral-100/20 rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="text-white font-bold text-[8px]">+</span>
                  </span>
                  Coming Soon
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-neutral-100/60 mr-3 mt-0.5" />
                <span className="text-neutral-100/80">
                  123 Corporate Drive<br />
                  Suite 500<br />
                  New York, NY 10001<br />
                  United States
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-neutral-100/60 mr-3" />
                <a 
                  href="tel:+1234567890" 
                  className="text-neutral-100/80 hover:text-white transition-colors duration-200"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-neutral-100/60 mr-3" />
                <a 
                  href="mailto:info@siriusglobalventures.com" 
                  className="text-neutral-100/80 hover:text-white transition-colors duration-200"
                >
                  info@siriusglobalventures.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-neutral-100/60 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Sirius Global Ventures. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy-policy">
                <div className="text-neutral-100/60 text-sm hover:text-white transition-colors duration-200 cursor-pointer">
                  Privacy Policy
                </div>
              </Link>
              <Link href="/terms">
                <div className="text-neutral-100/60 text-sm hover:text-white transition-colors duration-200 cursor-pointer">
                  Terms of Service
                </div>
              </Link>
              <Link href="/legal">
                <div className="text-neutral-100/60 text-sm hover:text-white transition-colors duration-200 cursor-pointer">
                  Legal
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
