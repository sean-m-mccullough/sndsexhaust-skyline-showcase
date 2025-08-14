export const handler = async (event, context) => {

     // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    const PLACE_ID = process.env.GOOGLE_PLACE_ID;

    if (!API_KEY || !PLACE_ID) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Missing required environment variables' 
            }),
        };
    }

    try {
        // Google Places API endpoint for place details with reviews
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Google API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status !== 'OK') {
            throw new Error(`Google API status: ${data.status}`);
        }

        // Return filtered/formatted review data
        const reviewData = {
            rating: data.result.rating,
            total_ratings: data.result.user_ratings_total,
            reviews: data.result.reviews?.map(review => ({
                author_name: review.author_name,
                rating: review.rating,
                text: review.text,
                time: review.time,
                relative_time_description: review.relative_time_description
            })) || []
        };

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'max-age=3600', // Cache for 1 hour
            },
            body: JSON.stringify(reviewData),
        };

    } catch (error) {
        console.error('Error fetching Google reviews:', error);
        
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Failed to fetch reviews',
                message: error.message 
            }),
        };
    }
}