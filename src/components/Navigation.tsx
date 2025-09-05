import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X } from 'lucide-react';

interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Media', href: '#media' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact-form' }
];

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-border' 
          : 'bg-transparent'
      } ${className}`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('#hero')}
              className={`text-xl font-oswald font-bold smooth-transition ${
                isScrolled 
                  ? 'text-primary hover:text-primary/80' 
                  : 'text-white hover:text-white/90 drop-shadow-lg'
              }`}
            >
              S&S Stainless Exhaust
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium smooth-transition relative ${
                  activeSection === item.href.substring(1)
                    ? 'text-primary'
                    : isScrolled 
                      ? 'text-foreground hover:text-primary' 
                      : 'text-white hover:text-white/80'
                } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                  activeSection === item.href.substring(1) ? 'after:scale-x-100' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Call Now Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Button
              variant="hero"
              size="sm"
              className="hidden sm:flex items-center"
              onClick={() => window.open('tel:+16134007589')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-md ${
                isScrolled ? 'text-foreground' : 'text-white'
              } hover:bg-white/10 smooth-transition`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left text-foreground hover:text-primary smooth-transition py-2 ${
                    activeSection === item.href.substring(1) ? 'text-primary font-medium' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                variant="hero"
                size="sm"
                className="w-full sm:hidden flex items-center justify-center"
                onClick={() => window.open('tel:+16134007589')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now: (613) 400-7589
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};