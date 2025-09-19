import { defineType } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Hero Header',
      type: 'sectionHeader'
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'phoneNumber', title: 'Phone Number', type: 'string' }
      ]
    },
    {
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'action', title: 'Action Type', type: 'string', options: {
          list: [
            { title: 'Scroll to Contact', value: 'contact' },
            { title: 'Scroll to Services', value: 'services' }
          ]
        }}
      ]
    },
    {
      name: 'tertiaryButton',
      title: 'Tertiary Button',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string', }
      ]
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'header.title'
    }
  }
})