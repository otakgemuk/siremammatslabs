import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'comparison',
  title: 'Comparison Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['prop-firms', 'charting-tools', 'brokers', 'scanners', 'strategies'],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Keep under 160 chars for SEO'),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (e.g., "Sire Mammat · Prop Firm Intel · July 2026")',
      type: 'string',
    }),
    defineField({
      name: 'heroStats',
      title: 'Hero Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
      description: 'Stats displayed in hero section (e.g., $50K, 90/10 Split)',
    }),
    defineField({
      name: 'plansCompared',
      title: 'Plans Being Compared',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'plan' } }],
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'content',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'sectionType',
              type: 'string',
              title: 'Section Type',
              options: {
                list: ['text', 'table', 'cards', 'fit-guide', 'verdict'],
              },
            },
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'subheading', type: 'string', title: 'Subheading (optional)' },
            {
              name: 'body',
              type: 'text',
              title: 'Body Text',
              rows: 4,
            },
            {
              name: 'tableData',
              type: 'object',
              title: 'Table Data (if type = "table")',
              hidden: true,
              fields: [
                {
                  name: 'rows',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        { name: 'factor', type: 'string' },
                        { name: 'col1', type: 'string' },
                        { name: 'col2', type: 'string' },
                        { name: 'col3', type: 'string' },
                        { name: 'highlight', type: 'string', description: 'e.g., "gold", "pos", "neg"' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'verdict',
      title: 'Verdict Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'Verdict Heading',
        },
        {
          name: 'paragraphs',
          type: 'array',
          of: [{ type: 'text' }],
          title: 'Verdict Paragraphs',
        },
        {
          name: 'ranking',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'rank', type: 'number' },
                { name: 'name', type: 'string' },
                { name: 'reason', type: 'string' },
              ],
            },
          ],
          title: 'Ranked Picks',
        },
      ],
    }),
    defineField({
      name: 'disclaimers',
      title: 'Disclaimers',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'hero',
    },
  },
})
