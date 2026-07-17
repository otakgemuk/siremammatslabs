import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'propFirm',
  title: 'Prop Firm',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Firm Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ticker',
      title: 'Ticker / Abbreviation',
      type: 'string',
      description: 'e.g., TPT, FFN, TRADEDAY',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'affiliateCode',
      title: 'Affiliate Code',
      type: 'string',
      description: 'e.g., MOT for MightyOx',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'supportedPlatforms',
      title: 'Supported Platforms',
      type: 'string',
    }),
    defineField({
      name: 'supportedDataFeeds',
      title: 'Supported Data Feeds',
      type: 'string',
    }),
    defineField({
      name: 'maximumAllocation',
      title: 'Maximum Allocation',
      type: 'string',
    }),
    defineField({
      name: 'pidId',
      title: 'PID Firm ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'lastVerified',
      title: 'PID Last Verified',
      type: 'date',
      readOnly: true,
    }),
    defineField({
      name: 'dataStatus',
      title: 'PID Data Status',
      type: 'string',
      options: { list: ['verified', 'partial', 'unverified', 'conflict'] },
      readOnly: true,
    }),
    defineField({
      name: 'sourceIds',
      title: 'PID Source IDs',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'sourceUrl',
      title: 'PID Source URL',
      type: 'url',
      readOnly: true,
    }),
    defineField({
      name: 'plans',
      title: 'Available Plans',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'plan' } }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'ticker',
    },
  },
})
