import { defineType } from 'sanity'

export default defineType({
  name: 'whyChooseUsSection',
  title: 'Why Choose Us Section',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Section Header',
      type: 'sectionHeader'
    },
    {
      name: 'featureCards',
      title: 'Feature Cards',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'featureCard' }] }],
      validation: Rule => Rule.min(1).max(6)
    },
    {
      name: 'isActive',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'header.title',
      cardCount: 'featureCards'
    },
    prepare({ title, cardCount }) {
      return {
        title: title || 'Why Choose Us Section',
        subtitle: `${cardCount?.length || 0} feature cards`
      }
    }
  }
})