import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Quote, AlertCircle } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { StarRating } from '@/components/StarRating';
import { GoogleBadge } from '@/components/GoogleBadge';
import { LeaveReviewCard } from '@/components/LeaveReviewCard';
import fetchHelper from '@/functions/fetchHelper';

type Review = {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

type ResponseEnvelope<T> = {
  rating: number;
  total_ratings: number;
  reviews: T;
};

type ReviewsData = {
  header: {
    title: string;
    description: string;
  };
  googleReviewsEnabled: boolean;
  googleBusinessUrl: string;
  errorMessage: {
    title: string;
    message: string;
  };
  reviewsDisplayLimit: number;
  showRatingsSummary: boolean;
  ratingSummaryText: string;
  leaveReviewCard: {
    title: string;
    description: string;
    buttonText: string;
    googlePlaceId: string;
  };
};

interface CustomerReviewsProps {
  reviewsData?: ReviewsData;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviewsData }) => {
  // Fallback data
  const fallbackData = {
    header: {
      title: "What Our Customers Say",
      description: "Our customers consistently rate us 5 stars for quality workmanship, professional service, and exceptional value."
    },
    googleReviewsEnabled: true,
    googleBusinessUrl: "https://g.page/r/your-google-business-id/review",
    errorMessage: {
      title: "Reviews Unavailable",
      message: "We're sorry, but our customer reviews are temporarily unavailable. Please check back later or visit our Google Business page directly."
    },
    reviewsDisplayLimit: 6,
    showRatingsSummary: true,
    ratingSummaryText: "Our customers consistently rate us 5 stars for quality workmanship, professional service, and exceptional value.",
    leaveReviewCard: {
      title: "Love our service?",
      description: "Share your experience and help others find quality automotive care.",
      buttonText: "Leave a Google Review",
      googlePlaceId: "ChIJA_EbyGkPzkwR-opFUNWIM8Q"
    }
  };

  const data = reviewsData || fallbackData;
  const shouldFetchGoogleReviews = data.googleReviewsEnabled;

  const { 
    data: googleData, 
    isLoading, 
    error,
    isError 
  } = useQuery<ResponseEnvelope<Review[]>>({
    queryKey: ['googleReviews'],
    queryFn: () => fetchHelper('/.netlify/functions/google-reviews'),
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: shouldFetchGoogleReviews, // Only fetch if Google Reviews are enabled
  });

  const averageRating = googleData?.rating || 0;
  const totalReviews = googleData?.total_ratings || 0;
  
  if (isLoading && shouldFetchGoogleReviews) {
    return (
      <section id="reviews" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }
  
  // Show error if Google Reviews fail or are disabled, or no reviews available
  const hasGoogleReviews = googleData && googleData.reviews && googleData.reviews.length > 0;
  const showError = !hasGoogleReviews;
  
  if (showError) {
    return (
      <section id="reviews" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-oswald font-bold text-foreground mb-4">
              {data.header?.title || fallbackData.header.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {data.header?.description || fallbackData.header.description}
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-8">
            {/* Error Message */}
            <Card className="max-w-2xl w-full border-orange-200 bg-orange-50">
              <CardContent className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {data.errorMessage?.title || fallbackData.errorMessage.title}
                </h3>
                <p className="text-muted-foreground">
                  {data.errorMessage?.message || fallbackData.errorMessage.message}
                </p>
              </CardContent>
            </Card>

            {/* Leave Review Card */}
            <LeaveReviewCard 
              className="max-w-md w-full"
              title={data.leaveReviewCard?.title || fallbackData.leaveReviewCard.title}
              description={data.leaveReviewCard?.description || fallbackData.leaveReviewCard.description}
              buttonText={data.leaveReviewCard?.buttonText || fallbackData.leaveReviewCard.buttonText}
              googlePlaceId={data.leaveReviewCard?.googlePlaceId || fallbackData.leaveReviewCard.googlePlaceId}
            />
          </div>
        </div>
      </section>
    );
  }

  // Only show reviews if Google Reviews are available
  const displayLimit = data.reviewsDisplayLimit || 6;
  const limitedReviews = hasGoogleReviews ? googleData.reviews.slice(0, displayLimit) : [];

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-foreground mb-4">
            {data.header?.title || fallbackData.header.title}
          </h2>
          
          {/* Show ratings summary only for Google Reviews and if enabled */}
          {data.showRatingsSummary && hasGoogleReviews && (
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
          )}
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {data.ratingSummaryText || data.header?.description || fallbackData.header.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Render Google Reviews */}
          {limitedReviews.map((review: Review, index: number) => (
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
          
          {/* Leave Review Card */}
          <LeaveReviewCard 
            title={data.leaveReviewCard?.title || fallbackData.leaveReviewCard.title}
            description={data.leaveReviewCard?.description || fallbackData.leaveReviewCard.description}
            buttonText={data.leaveReviewCard?.buttonText || fallbackData.leaveReviewCard.buttonText}
            googlePlaceId={data.leaveReviewCard?.googlePlaceId || fallbackData.leaveReviewCard.googlePlaceId}
          />
        </div>
      </div>
    </section>
  );
};