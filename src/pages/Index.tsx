import { useEffect, useRef } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { MediaGallery } from '@/components/MediaGallery';
import { CustomerReviews } from '@/components/CustomerReviews';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { OurServices } from '@/components/OurServices';
import { Footer } from '@/components/Footer';
import { useSanityQueries } from '@/hooks/useSanityQueries';

import heroImage from '@/assets/hero-exhaust4.png';

const Index = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    navigationData,
    heroData,
    whyChooseUsData,
    servicesData,
    footerData,
    reviewsData,
    isLoading,
    isError,
    errors
  } = useSanityQueries();

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

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
  //         <p className="text-muted-foreground">Loading content...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   console.error('Sanity fetch errors:', errors);
  //   // Continue rendering with fallback content
  // }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation navigationData={navigationData} />
      
      {/* Hero Section with Parallax */}
      <Hero 
        heroData={heroData}
        fallbackImage={heroImage}
        onScrollToContent={scrollToContent}
      />

      {/* Services & Why Choose Us Section */}
      <section id="services" ref={scrollRef} className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          {/* Why Choose Us */}
          <WhyChooseUs whyChooseUsData={whyChooseUsData} />

          {/* Our Services */}
          {/* <div className="text-center mb-16 fade-in-up">
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
                title="Lion Roar Exhausts"
                description="Expert custom exhaust fabrication tailored to your vehicle's specific needs. Our skilled craftsmen create bespoke solutions for performance vehicles, classic cars, and specialized applications."
                features={[
                  "Custom exhaust design and fabrication",
                  "Performance header construction",
                  "Stainless steel welding expertise",
                  "One-off and prototype development"
                ]}
                icon={Flame}
                image={[
                  lionRoarExhaust3, 
                  lionRoarExhaust2, 
                  lionRoarExhaust, 
                  lionRoarExhaust4, 
                  lionRoarExhaust5
                ]}
              />
            </div>
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
                reverse
              />
            </div>
          </div> */}
          {/* Our Services */}
          <OurServices servicesData={servicesData} />
        </div>
      </section>

      {/* Media Gallery Section */}
      <MediaGallery />

      {/* Customer Reviews Section */}
      <CustomerReviews reviewsData={reviewsData} />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Footer */}
      <Footer footerData={footerData} />
    </div>
  );
};

export default Index;
