import { defineType } from 'sanity'

export default defineType({
  name: 'featureCard',
  title: 'Feature Card',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., "shield", "award", "users")',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Shield (Quality/Security)', value: 'shield' },
          { title: 'Award (Achievement/Excellence)', value: 'award' },
          { title: 'Users (Community/Service)', value: 'users' },
          { title: 'Wrench (Tools/Repair)', value: 'wrench' },
          { title: 'Star (Quality/Rating)', value: 'star' },
          { title: 'Clock (Time/Speed)', value: 'clock' },
          { title: 'Heart (Care/Love)', value: 'heart' },
          { title: 'Check Circle (Verified/Complete)', value: 'check-circle' },
          { title: 'Thumbs Up (Approval)', value: 'thumbs-up' },
          { title: 'Target (Precision)', value: 'target' }
        ]
      }
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide this feature card'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      order: 'order',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, subtitle, order, isActive } = selection
      return {
        title: `${order}. ${title}${!isActive ? ' (Hidden)' : ''}`,
        subtitle: subtitle?.substring(0, 60) + (subtitle?.length > 60 ? '...' : '')
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})
