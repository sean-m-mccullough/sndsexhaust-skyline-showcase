import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  image: string | string[];
  reverse?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  features,
  icon: Icon,
  image,
  reverse = false
}) => {
  const images = Array.isArray(image) ? image : [image];
  const isCarousel = images.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <Card className="overflow-hidden card-shadow hover:shadow-lg smooth-transition">
      <div className={`grid md:grid-cols-2 gap-0 ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className={`relative h-64 md:h-auto ${reverse ? 'md:order-2' : ''}`}>
          {isCarousel ? (
            <div className="embla h-full" ref={emblaRef}>
              <div className="embla__container h-full">
                {images.map((img, index) => (
                  <div key={index} className="embla__slide h-full min-w-0 flex-[0_0_100%]">
                    <img
                      src={img}
                      alt={`${title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={scrollPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <img
              src={images[0]}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        </div>
        
        <CardContent className={`p-8 flex flex-col justify-center ${reverse ? 'md:order-1' : ''}`}>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-oswald font-bold text-foreground">{title}</h3>
          </div>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {description}
          </p>
          
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-foreground">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                {feature}
              </li>
            ))}
          </ul>
          
          <Button variant="outline" className="self-start" onClick={scrollToContact}>
            Learn More
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};