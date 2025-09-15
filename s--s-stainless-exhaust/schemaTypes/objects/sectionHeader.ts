import { defineType } from 'sanity'

export default defineType({
  name: 'sectionHeader',
  title: 'Section Header',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main heading for the section',
      validation: Rule => Rule.required().max(100)
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle or tagline',
      validation: Rule => Rule.max(150)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description text',
      validation: Rule => Rule.required().max(500)
    },
    {
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' }
        ]
      },
      initialValue: 'center'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Section Header',
        subtitle: subtitle?.slice(0, 50) + '...' || 'No description'
      }
    }
  }
})