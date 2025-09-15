import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import { Shield } from 'lucide-react';

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

interface WhyChooseUsData {
  header: {
    title: string;
    description: string;
  };
  featureCards: FeatureCard[];
  isActive: boolean;
}

interface WhyChooseUsProps {
  whyChooseUsData?: WhyChooseUsData;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ whyChooseUsData }) => {
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || Shield;
    return IconComponent;
  };

  // Fallback data if Sanity data is not available
  const fallbackData = {
    header: {
      title: "Why Choose S&S Stainless Exhaust?",
      description: "Over 10 years of automotive excellence with a commitment to quality craftsmanship and customer satisfaction."
    },
    featureCards: [
      {
        icon: "Shield",
        title: "Quality Guarantee",
        description: "All our work comes with a comprehensive warranty and quality guarantee for your peace of mind.",
        order: 1,
        isActive: true
      },
      {
        icon: "Award", 
        title: "Expert Craftsmanship",
        description: "Certified technicians with decades of experience in exhaust systems and automotive repair.",
        order: 2,
        isActive: true
      },
      {
        icon: "Users",
        title: "Customer First", 
        description: "Transparent pricing, honest diagnostics, and exceptional customer service every time.",
        order: 3,
        isActive: true
      }
    ]
  };

  const data = whyChooseUsData || fallbackData;
  
  // Filter active cards and sort by order
  const activeCards = data.featureCards
    ?.filter(card => card.isActive)
    ?.sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-oswald font-bold text-foreground mb-4">
          {data.header?.title || fallbackData.header.title}
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {data.header?.description || fallbackData.header.description}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {activeCards.map((item, index) => {
          const IconComponent = getIcon(item.icon);
          
          return (
            <Card key={index} className="text-center p-8 card-shadow hover:shadow-lg smooth-transition">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <IconComponent className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-oswald font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};
