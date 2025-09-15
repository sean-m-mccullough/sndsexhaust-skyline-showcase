import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LeaveReviewCardProps {
  googlePlaceId?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

export const LeaveReviewCard: React.FC<LeaveReviewCardProps> = ({
  googlePlaceId = 'ChIJA_EbyGkPzkwR-opFUNWIM8Q',
  title = 'Love our service?',
  description = 'Share your experience and help others find quality automotive care.',
  buttonText = 'Leave a Google Review',
  className = ''
}) => {
  return (
    <Card className={`bg-primary/5 border-primary/20 ${className}`}>
      <CardContent className="p-6 text-center space-y-4 h-full flex flex-col justify-center">
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
          <span className="text-white font-bold text-xl">G</span>
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground">
          {description}
        </p>
        <a
          href={`https://search.google.com/local/writereview?placeid=${googlePlaceId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 smooth-transition inline-block"
        >
          {buttonText}
        </a>
      </CardContent>
    </Card>
  );
};
