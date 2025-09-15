import { defineType } from 'sanity'

export default defineType({
  name: 'customerReview',
  title: 'Customer Review',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '⭐ 1 Star', value: 1 },
          { title: '⭐⭐ 2 Stars', value: 2 },
          { title: '⭐⭐⭐ 3 Stars', value: 3 },
          { title: '⭐⭐⭐⭐ 4 Stars', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5 }
        ]
      }
    },
    {
      name: 'text',
      title: 'Review Text',
      type: 'text',
      validation: Rule => Rule.required().max(500)
    },
    {
      name: 'serviceCategory',
      title: 'Service Category',
      type: 'string',
      description: 'What service was reviewed (e.g., "Exhaust Repair", "Custom Fabrication")',
      options: {
        list: [
          { title: 'Exhaust Repair', value: 'Exhaust Repair' },
          { title: 'Custom Fabrication', value: 'Custom Fabrication' },
          { title: 'Lion Roar Exhausts', value: 'Lion Roar Exhausts' },
          { title: 'General Service', value: 'General Service' },
          { title: 'Consultation', value: 'Consultation' }
        ]
      }
    },
    {
      name: 'date',
      title: 'Review Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'isFeatured',
      title: 'Featured Review',
      type: 'boolean',
      description: 'Highlight this review as featured',
      initialValue: false
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this review on the website',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'text',
      rating: 'rating',
      featured: 'isFeatured'
    },
    prepare({ title, subtitle, rating, featured }) {
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: `${title} ${featured ? '⭐ FEATURED' : ''}`,
        subtitle: `${stars} "${subtitle?.slice(0, 60)}${subtitle?.length > 60 ? '...' : ''}"`
      }
    }
  },
  orderings: [
    {
      title: 'Featured First, then by Date',
      name: 'featuredThenDate',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'date', direction: 'desc' }
      ]
    },
    {
      title: 'Rating (Highest First)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }]
    }
  ]
})