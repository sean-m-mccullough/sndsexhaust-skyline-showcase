import { defineType } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      description: 'The company name displayed in the navigation',
      validation: Rule => Rule.required()
    },
    {
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'href',
            title: 'Link/Anchor',
            type: 'string',
            description: 'Use # followed by section ID (e.g., #hero, #services)',
            validation: Rule => Rule.required()
          },
          {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            validation: Rule => Rule.required().min(1)
          },
          {
            name: 'isActive',
            title: 'Show in Navigation',
            type: 'boolean',
            initialValue: true
          }
        ],
        preview: {
          select: {
            title: 'label',
            subtitle: 'href',
            order: 'order'
          },
          prepare({ title, subtitle, order }) {
            return {
              title: `${order}. ${title}`,
              subtitle: subtitle
            }
          }
        }
      }],
      validation: Rule => Rule.min(1).max(8)
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      description: 'Phone number for the Call Now button (include country code)',
      validation: Rule => Rule.required()
    },
    {
      name: 'phoneDisplayText',
      title: 'Phone Display Text',
      type: 'string',
      description: 'Text shown on the Call Now button',
      initialValue: 'Call Now'
    },
    {
      name: 'isActive',
      title: 'Enable Navigation',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide the entire navigation'
    }
  ],
  preview: {
    select: {
      title: 'brandName',
      itemCount: 'navigationItems'
    },
    prepare({ title, itemCount }) {
      return {
        title: title || 'Navigation Settings',
        subtitle: `${itemCount?.length || 0} navigation items`
      }
    }
  }
})
