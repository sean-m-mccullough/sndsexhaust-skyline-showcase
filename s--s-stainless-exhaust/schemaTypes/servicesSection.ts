import { defineType } from 'sanity'

export default defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Section Header',
      type: 'sectionHeader'
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      validation: Rule => Rule.min(1)
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default (Muted)', value: 'muted' },
          { title: 'Background', value: 'background' },
          { title: 'Primary', value: 'primary' }
        ]
      },
      initialValue: 'muted'
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
      title: 'header.title',
      serviceCount: 'services'
    },
    prepare({ title, serviceCount }) {
      return {
        title: title || 'Services Section',
        subtitle: `${serviceCount?.length || 0} services`
      }
    }
  }
})