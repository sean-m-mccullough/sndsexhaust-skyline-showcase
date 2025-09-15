import { defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Company Name',
          type: 'string',
          initialValue: 'S&S Stainless Exhaust'
        },
        {
          name: 'description',
          title: 'Company Description',
          type: 'text'
        }
      ]
    },
    {
      name: 'services',
      title: 'Services List',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.max(6)
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Address',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        }
      ]
    },
    {
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2025 S&S Stainless Exhaust. All rights reserved.'
    }
  ],
  preview: {
    select: {
      title: 'companyInfo.name'
    }
  }
})