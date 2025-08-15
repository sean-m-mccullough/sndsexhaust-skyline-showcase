import React from 'react';
import useSWR from 'swr';
import { Star, Quote } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import fetchHelper from '@/functions/fetchHelper';


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

type Review = {
  author_name: string;
  rating : number;
  relative_time_description : string;
  text : string;
  time : number;
}

type ResponseEnvelope<T> = {
  rating: number;
  total_ratings: number;
  reviews: T;
};


export const CustomerReviews: React.FC = () => {
  const { data, isLoading, error } = useSWR<ResponseEnvelope<Review[]>>('/.netlify/functions/google-reviews', fetchHelper);
  const averageRating = data?.rating || 0;
  const totalReviews = data?.total_ratings || 0;
  
  if (isLoading) {
    return <div>Loading reviews...</div>;
  }
  
  if (!data || !data.reviews || data.reviews.length < 1 || error) {
    console.log('no data');
    return <div>No reviews available.</div>;
  }

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
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
          {data.reviews.map((review, index) => (
            <Card 
              key={review.time}
              className="card-shadow hover:shadow-lg smooth-transition"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <StarRating rating={review.rating} />
                    <h4 className="font-semibold text-foreground mt-2">
                      {review.author_name}
                    </h4>
                    <span className="text-sm text-primary font-medium">
                      {review.relative_time_description}
                    </span>
                  </div>
                  <Quote className="w-6 h-6 text-primary/30" />
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{review.text}"
                </p>
                
                <GoogleBadge />
              </CardContent>
            </Card>
          ))}
            <Card className="max-w-md mx-auto p-6 bg-primary/5 border-primary/20 justify-center items-center align-center flex flex-col">
              <CardContent className="space-y-4 text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground text-center">
                  Love our service?
                </h3>
                <p className="text-muted-foreground text-center">
                  Share your experience and help others find quality automotive care.
                </p>
                <a
                  href="https://maps.app.goo.gl/ckmFpGPyRVNQZ5617"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 smooth-transition inline-block text-center"
                >
                  Leave a Google Review
                </a>
              </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
};