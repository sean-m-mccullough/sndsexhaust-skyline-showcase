import { defineType } from 'sanity'

export default defineType({
  name: 'reviewsSection',
  title: 'Reviews Section',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Section Header',
      type: 'sectionHeader'
    },
    {
      name: 'googleReviewsEnabled',
      title: 'Enable Google Reviews',
      type: 'boolean',
      description: 'Toggle to show/hide Google Reviews integration',
      initialValue: true
    },
    {
      name: 'googleBusinessUrl',
      title: 'Google Business Profile URL',
      type: 'url',
      description: 'Link to your Google Business profile for "Leave Review" button',
      validation: Rule => Rule.uri({ scheme: ['http', 'https'] })
    },
    {
      name: 'errorMessage',
      title: 'Error Message',
      type: 'object',
      description: 'Custom message when reviews are unavailable',
      fields: [
        {
          name: 'title',
          title: 'Error Title',
          type: 'string',
          initialValue: 'Reviews Unavailable'
        },
        {
          name: 'message',
          title: 'Error Message',
          type: 'text',
          initialValue: 'We\'re sorry, but our customer reviews are temporarily unavailable. Please check back later or visit our Google Business page directly.'
        }
      ]
    },
    {
      name: 'reviewsDisplayLimit',
      title: 'Number of Reviews to Display',
      type: 'number',
      description: 'Maximum number of Google Reviews to show',
      initialValue: 6,
      validation: Rule => Rule.min(3).max(12)
    },
    {
      name: 'showRatingsSummary',
      title: 'Show Ratings Summary',
      type: 'boolean',
      description: 'Display average rating and total review count',
      initialValue: true
    },
    {
      name: 'ratingSummaryText',
      title: 'Rating Summary Text',
      type: 'string',
      description: 'Text to display with ratings summary',
      initialValue: 'Our customers consistently rate us 5 stars for quality workmanship, professional service, and exceptional value.'
    },
    {
      name: 'leaveReviewCard',
      title: 'Leave Review Card',
      type: 'object',
      description: 'Content for the "Leave Review" card',
      fields: [
        {
          name: 'title',
          title: 'Card Title',
          type: 'string',
          initialValue: 'Love our service?'
        },
        {
          name: 'description',
          title: 'Card Description',
          type: 'text',
          initialValue: 'Share your experience and help others find quality automotive care.'
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Leave a Google Review'
        },
        {
          name: 'googlePlaceId',
          title: 'Google Place ID',
          type: 'string',
          description: 'Your Google Business Place ID for the review link',
          initialValue: 'ChIJA_EbyGkPzkwR-opFUNWIM8Q'
        }
      ]
    },
    {
      name: 'isActive',
      title: 'Show Reviews Section',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'header.title',
      googleEnabled: 'googleReviewsEnabled'
    },
    prepare({ title, googleEnabled }) {
      return {
        title: title || 'Reviews Section',
        subtitle: `Google Reviews: ${googleEnabled ? 'Enabled' : 'Disabled'}`
      }
    }
  }
})
