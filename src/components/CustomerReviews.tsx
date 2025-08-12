import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
  service: string;
  googleProfile?: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Mike Johnson",
    rating: 5,
    review: "Outstanding work on my custom exhaust system! The team at S&S really knows their stuff. Quality craftsmanship and fair pricing. Highly recommend!",
    service: "Custom Fabrication",
    googleProfile: true
  },
  {
    id: 2,
    name: "Sarah Martinez",
    rating: 5,
    review: "Quick and professional exhaust repair. They diagnosed the problem immediately and had me back on the road the same day. Great customer service!",
    service: "Exhaust Repair",
    googleProfile: true
  },
  {
    id: 3,
    name: "David Chen",
    rating: 5,
    review: "Been bringing my trucks here for years. Reliable, honest, and always does quality work. The stainless steel work is top-notch.",
    service: "Complete Auto Care",
    googleProfile: true
  },
  {
    id: 4,
    name: "Jennifer Wilson",
    rating: 5,
    review: "Exceptional service! They went above and beyond to help with my classic car's exhaust system. Attention to detail is amazing.",
    service: "Custom Fabrication",
    googleProfile: true
  },
  {
    id: 5,
    name: "Robert Taylor",
    rating: 5,
    review: "Professional team, clean shop, and reasonable prices. My performance exhaust sounds perfect and the installation was flawless.",
    service: "Exhaust Repair",
    googleProfile: true
  },
  {
    id: 6,
    name: "Lisa Anderson",
    rating: 5,
    review: "Friendly staff and excellent work quality. They explained everything clearly and finished ahead of schedule. Will definitely return!",
    service: "Complete Auto Care",
    googleProfile: true
  }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const GoogleBadge: React.FC = () => (
  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
      G
    </div>
    <span>Google Review</span>
  </div>
);

export const CustomerReviews: React.FC = () => {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-2xl font-semibold text-foreground">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <div className="text-muted-foreground">
              Based on {totalReviews}+ Google Reviews
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our customers consistently rate us 5 stars for quality workmanship, 
            professional service, and exceptional value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={review.id} className="fade-in-up card-shadow hover:shadow-lg smooth-transition">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <StarRating rating={review.rating} />
                    <h4 className="font-semibold text-foreground mt-2">
                      {review.name}
                    </h4>
                    <span className="text-sm text-primary font-medium">
                      {review.service}
                    </span>
                  </div>
                  <Quote className="w-6 h-6 text-primary/30" />
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{review.review}"
                </p>
                
                {review.googleProfile && <GoogleBadge />}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Google Business Profile CTA */}
        <div className="text-center mt-12 fade-in-up">
          <Card className="max-w-md mx-auto p-6 bg-primary/5 border-primary/20">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Love our service?
              </h3>
              <p className="text-muted-foreground">
                Share your experience and help others find quality automotive care.
              </p>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 smooth-transition">
                Leave a Google Review
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};