import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceCard } from '@/components/ServiceCard';
import { ContactForm } from '@/components/ContactForm';
import { ParallaxSection } from '@/components/ParallaxSection';
import { CustomerReviews } from '@/components/CustomerReviews';
import { MediaGallery } from '@/components/MediaGallery';
import { Navigation } from '@/components/Navigation';
import { 
  Wrench, 
  Flame, 
  Car, 
  Shield, 
  Award, 
  Users,
  ChevronDown,
  Phone
} from 'lucide-react';
import heroImage from '@/assets/hero-exhaust3.png';
import blueExhaust from '@/assets/blue-exhaust.jpg';
import loinRoarExhuast from '@/assets/loin-roar-exhaust.jpg';

const Index = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToContent = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />
      {/* Hero Section with Parallax */}
      <ParallaxSection 
        backgroundImage={heroImage}
        speed={0.5}
        className="min-h-screen flex items-center justify-center relative"
        id="hero"
      >
        <div className="absolute inset-0 bg-gradient-overlay"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto fade-in-up">
            <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white mb-6 animate-slide-in-up">
              S&S Stainless Exhaust
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-inter">
              Professional Exhaust Repair, Custom Fabrication & Complete Auto Care
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                <Phone className="mr-2" />
                Call Now: (613) 400-7589
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                Schedule Service
              </Button>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-float"
          onClick={scrollToContent}
        >
          <ChevronDown className="w-8 h-8 text-white/70 hover:text-white smooth-transition" />
        </div>
      </ParallaxSection>

      {/* Services & Why Choose Us Section */}
      <section id="services" ref={scrollRef} className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          {/* Why Choose Us */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-oswald font-bold text-foreground mb-4">
              Why Choose S&S Stainless Exhaust?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Over 20 years of automotive excellence with a commitment to quality craftsmanship 
              and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Shield,
                title: "Quality Guarantee",
                description: "All our work comes with a comprehensive warranty and quality guarantee for your peace of mind."
              },
              {
                icon: Award,
                title: "Expert Craftsmanship",
                description: "Certified technicians with decades of experience in exhaust systems and automotive repair."
              },
              {
                icon: Users,
                title: "Customer First",
                description: "Transparent pricing, honest diagnostics, and exceptional customer service every time."
              }
            ].map((item, index) => (
              <Card key={index} className="text-center p-8 fade-in-up card-shadow hover:shadow-lg smooth-transition">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-oswald font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Our Services */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-oswald font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From precision exhaust repairs to custom fabrication and complete automotive care, 
              we deliver professional solutions with exceptional quality.
            </p>
          </div>

          <div className="space-y-16">
            <div className="fade-in-up">
              <ServiceCard
                title="Exhaust Repair"
                description="Professional exhaust system repairs using high-quality stainless steel components. We diagnose and fix leaks, replace damaged sections, and restore your vehicle's performance and sound."
                features={[
                  "Complete exhaust system diagnostics",
                  "High-quality stainless steel repairs",
                  "Muffler and catalytic converter services",
                  "Performance exhaust upgrades"
                ]}
                icon={Wrench}
                image={blueExhaust}
              />
            </div>

            <div className="fade-in-up">
              <ServiceCard
                title="Custom Fabrication"
                description="Expert custom exhaust fabrication tailored to your vehicle's specific needs. Our skilled craftsmen create bespoke solutions for performance vehicles, classic cars, and specialized applications."
                features={[
                  "Custom exhaust design and fabrication",
                  "Performance header construction",
                  "Stainless steel welding expertise",
                  "One-off and prototype development"
                ]}
                icon={Flame}
                image={loinRoarExhuast}
                reverse
              />
            </div>
          </div>
        </div>
      </section>

      {/* Media Gallery Section */}
      <MediaGallery />

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-oswald font-bold mb-4">S&S Stainless Exhaust</h3>
              <p className="text-primary-foreground/80">
                Professional automotive services with a focus on exhaust systems, 
                custom fabrication, and complete auto care.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Exhaust Repair</li>
                <li>Custom Fabrication</li>
                <li>Auto Care</li>
                <li>Performance Upgrades</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>2615 Blackwell St unit 112</p>
                <p>Ottawa, ON K1B4E4</p>
                <p>(613) 400-7589</p>
                <p>onlyauthentic@ymail.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 S&S Stainless Exhaust. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
