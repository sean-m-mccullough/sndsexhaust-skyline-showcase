import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  image: string;
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
  return (
    <Card className="overflow-hidden card-shadow hover:shadow-lg smooth-transition">
      <div className={`grid md:grid-cols-2 gap-0 ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className={`relative h-64 md:h-auto ${reverse ? 'md:order-2' : ''}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
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
          
          <Button variant="outline" className="self-start">
            Learn More
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};