import React from 'react';
import { Button } from '@/components/ui/button';
import { ParallaxSection } from '@/components/ParallaxSection';
import { ChevronDown, Phone } from 'lucide-react';
import { urlFor } from '@/lib/sanity';

interface HeroData {
  header: {
    title: string;
    description: string;
  };
  backgroundImage: any;
  primaryButton: {
    text: string;
    phoneNumber: string;
  };
  secondaryButton: {
    text: string;
    action: string;
  };
  isActive: boolean;
}

interface HeroProps {
  heroData?: HeroData;
  fallbackImage: string;
  onScrollToContent: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  heroData, 
  fallbackImage,
  onScrollToContent 
}) => {
  const handleSecondaryButtonClick = () => {
    const contactSection = document.querySelector('#contact-form');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ParallaxSection 
      backgroundImage={heroData?.backgroundImage ? urlFor(heroData.backgroundImage).url() : fallbackImage}
      speed={0.2}
      className="min-h-screen flex items-center justify-center relative"
      id="hero"
    >
      <div className="absolute inset-0 bg-gradient-overlay"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto fade-in-up">
          <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white mb-6 animate-slide-in-up">
            {heroData?.header?.title || 'S&S Stainless Exhaust'}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 font-inter">
            {heroData?.header?.description || 'Professional Exhaust Repair, Custom Fabrication & Complete Auto Care'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              variant="hero"
              size="lg"
              className="text-lg px-8 py-4"
            >
              <a href={`tel:${heroData?.primaryButton?.phoneNumber || '6134007589'}`}>
                <Phone className="mr-2" />
                {heroData?.primaryButton?.text || 'Call Now: (613) 400-7589'}
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
              onClick={handleSecondaryButtonClick}
            >
              {heroData?.secondaryButton?.text || 'Schedule Service'}
            </Button>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-11 left-1/2 transform -translate-x-1/2 animate-float cursor-pointer"
        onClick={onScrollToContent}
      >
        <ChevronDown className="w-8 h-8 text-white/70 hover:text-white smooth-transition" />
      </div>
    </ParallaxSection>
  );
};
