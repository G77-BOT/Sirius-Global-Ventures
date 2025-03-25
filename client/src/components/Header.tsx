import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ChevronDown, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [aboutSubmenuOpen, setAboutSubmenuOpen] = useState(false);
  const [companiesSubmenuOpen, setCompaniesSubmenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAboutSubmenu = () => {
    setAboutSubmenuOpen(!aboutSubmenuOpen);
  };

  const toggleCompaniesSubmenu = () => {
    setCompaniesSubmenuOpen(!companiesSubmenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4 px-4 lg:px-0">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">GH</span>
            </div>
            <div>
              <div className="font-heading font-bold text-xl text-primary">Global Holdings</div>
              <div className="text-xs text-neutral-300">Corporate Excellence</div>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden text-primary"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/">
              <a className={`${isActive("/") ? "text-secondary" : "text-primary"} hover:text-secondary font-medium`}>
                Home
              </a>
            </Link>
            
            {/* About Dropdown */}
            <div className="dropdown relative">
              <button className={`${location.startsWith("/about") ? "text-secondary" : "text-primary"} hover:text-secondary font-medium flex items-center`}>
                About
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="dropdown-menu hidden absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                <Link href="/about">
                  <a className="block px-4 py-2 text-sm text-primary hover:bg-neutral-100">Our Story</a>
                </Link>
                <Link href="/about/leadership">
                  <a className="block px-4 py-2 text-sm text-primary hover:bg-neutral-100">Leadership</a>
                </Link>
                <Link href="/about/structure">
                  <a className="block px-4 py-2 text-sm text-primary hover:bg-neutral-100">Corporate Structure</a>
                </Link>
              </div>
            </div>
            
            {/* Companies Dropdown */}
            <div className="dropdown relative">
              <button className={`${location.startsWith("/companies") ? "text-secondary" : "text-primary"} hover:text-secondary font-medium flex items-center`}>
                Our Companies
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="dropdown-menu hidden absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-10">
                <Link href="/companies/bostream">
                  <a className="block px-4 py-2 text-sm text-primary hover:bg-neutral-100 font-semibold">
                    Bostream <span className="text-xs font-normal text-secondary">Crypto Trading</span>
                  </a>
                </Link>
                <span className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-100">Coming Soon</span>
              </div>
            </div>
            
            <Link href="/investor-relations">
              <a className={`${isActive("/investor-relations") ? "text-secondary" : "text-primary"} hover:text-secondary font-medium`}>
                Investor Relations
              </a>
            </Link>
            <Link href="/careers">
              <a className={`${isActive("/careers") ? "text-secondary" : "text-primary"} hover:text-secondary font-medium`}>
                Careers
              </a>
            </Link>
            <Link href="/news">
              <a className={`${isActive("/news") ? "text-secondary" : "text-primary"} hover:text-secondary font-medium`}>
                News
              </a>
            </Link>
            <Link href="/contact">
              <a className={`${isActive("/contact") ? "text-secondary" : "text-primary"} hover:text-secondary font-medium`}>
                Contact
              </a>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden bg-white border-t border-neutral-100`}>
        <div className="container mx-auto px-4 py-3 space-y-3">
          <Link href="/">
            <a className="block py-2 text-primary font-medium">Home</a>
          </Link>
          
          <div>
            <button 
              className="flex justify-between items-center w-full py-2 text-primary font-medium"
              onClick={toggleAboutSubmenu}
            >
              About
              <ChevronDown className={`h-4 w-4 transform ${aboutSubmenuOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
            </button>
            <div className={`${aboutSubmenuOpen ? 'block' : 'hidden'} pl-4 space-y-2 mt-1`}>
              <Link href="/about">
                <a className="block py-1 text-sm text-primary">Our Story</a>
              </Link>
              <Link href="/about/leadership">
                <a className="block py-1 text-sm text-primary">Leadership</a>
              </Link>
              <Link href="/about/structure">
                <a className="block py-1 text-sm text-primary">Corporate Structure</a>
              </Link>
            </div>
          </div>
          
          <div>
            <button 
              className="flex justify-between items-center w-full py-2 text-primary font-medium"
              onClick={toggleCompaniesSubmenu}
            >
              Our Companies
              <ChevronDown className={`h-4 w-4 transform ${companiesSubmenuOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
            </button>
            <div className={`${companiesSubmenuOpen ? 'block' : 'hidden'} pl-4 space-y-2 mt-1`}>
              <Link href="/companies/bostream">
                <a className="block py-1 text-sm font-semibold text-primary">
                  Bostream <span className="text-xs font-normal text-secondary">Crypto Trading</span>
                </a>
              </Link>
              <span className="block py-1 text-sm text-neutral-300">Coming Soon</span>
            </div>
          </div>
          
          <Link href="/investor-relations">
            <a className="block py-2 text-primary font-medium">Investor Relations</a>
          </Link>
          <Link href="/careers">
            <a className="block py-2 text-primary font-medium">Careers</a>
          </Link>
          <Link href="/news">
            <a className="block py-2 text-primary font-medium">News</a>
          </Link>
          <Link href="/contact">
            <a className="block py-2 text-primary font-medium">Contact</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
