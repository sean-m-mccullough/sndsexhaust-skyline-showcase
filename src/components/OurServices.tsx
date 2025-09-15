import React from 'react';
import { ServiceCard } from '@/components/ServiceCard';
import { urlFor } from '@/lib/sanity';
import * as LucideIcons from 'lucide-react';
import { Shield } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
  images: any[];
  reverse: boolean;
}

interface ServicesData {
  header: {
    title: string;
    description: string;
  };
  services: Service[];
}

interface OurServicesProps {
  servicesData?: ServicesData;
}

export const OurServices: React.FC<OurServicesProps> = ({ servicesData }) => {
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || Shield;
    return IconComponent;
  };

  if (!servicesData) {
    return null;
  }

  return (
    <>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-oswald font-bold text-foreground mb-4">
          {servicesData.header?.title || 'Our Services'}
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {servicesData.header?.description}
        </p>
      </div>

      <div className="space-y-16">
        {servicesData.services?.map((service: Service, index: number) => {
          const IconComponent = getIcon(service.icon);
          const images = service.images?.map((img: any) => urlFor(img).url()) || [];
          
          return (
            <div key={index}>
              <ServiceCard
                title={service.title}
                description={service.description}
                features={service.features || []}
                icon={IconComponent}
                image={images.length > 0 ? images : undefined}
                reverse={service.reverse || false}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
