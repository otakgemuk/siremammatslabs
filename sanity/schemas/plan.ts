import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'plan',
  title: 'Trading Plan',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'firm',
      title: 'Firm',
      type: 'reference',
      to: { type: 'propFirm' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accountSize',
      title: 'Account Size ($)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pricingModel',
      title: 'Pricing Model',
      type: 'string',
      options: {
        list: ['monthly', 'one-time', 'variable'],
      },
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price ($)',
      type: 'number',
    }),
    defineField({
      name: 'promoPriceAndCode',
      title: 'Promo Price & Code',
      type: 'object',
      fields: [
        {
          name: 'promoPrice',
          title: 'Promo Price ($)',
          type: 'number',
        },
        {
          name: 'code',
          title: 'Discount Code',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Promo Details',
          type: 'text',
          rows: 2,
        },
      ],
    }),
    defineField({
      name: 'activationFee',
      title: 'Activation Fee ($)',
      type: 'number',
    }),
    defineField({
      name: 'profitTarget',
      title: 'Profit Target ($)',
      type: 'number',
    }),
    defineField({
      name: 'maxDrawdown',
      title: 'Max Drawdown ($)',
      type: 'number',
    }),
    defineField({
      name: 'drawdownType',
      title: 'Drawdown Type',
      type: 'string',
      options: {
        list: ['EOD-trailing', 'intraday-trailing', 'static', 'daily-loss-limit'],
      },
    }),
    defineField({
      name: 'dailyLossLimit',
      title: 'Daily Loss Limit',
      type: 'string',
      description: 'e.g., "None", "$500", "Calculated"',
    }),
    defineField({
      name: 'consistencyEval',
      title: 'Consistency (Eval)',
      type: 'object',
      fields: [
        {
          name: 'percentage',
          title: 'Percentage (%)',
          type: 'number',
        },
        {
          name: 'maxDailyProfit',
          title: 'Max Daily Profit ($)',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'consistencyFunded',
      title: 'Consistency (Funded)',
      type: 'object',
      fields: [
        {
          name: 'percentage',
          title: 'Percentage (%)',
          type: 'number',
        },
        {
          name: 'required',
          title: 'Required?',
          type: 'boolean',
        },
      ],
    }),
    defineField({
      name: 'minTradingDays',
      title: 'Minimum Trading Days',
      type: 'number',
    }),
    defineField({
      name: 'maxContracts',
      title: 'Max Contracts',
      type: 'object',
      fields: [
        {
          name: 'minis',
          title: 'Minis',
          type: 'number',
        },
        {
          name: 'micros',
          title: 'Micros',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'payoutBuffer',
      title: 'Payout Buffer ($)',
      type: 'number',
      description: 'Amount that must be in account before withdrawal allowed',
    }),
    defineField({
      name: 'payoutSpeed',
      title: 'Payout Speed',
      type: 'string',
      description: 'e.g., "~1 hour", "Same-day", "Next business day"',
    }),
    defineField({
      name: 'fundedSplit',
      title: 'Funded Profit Split',
      type: 'object',
      fields: [
        {
          name: 'trader',
          title: 'Trader %',
          type: 'number',
        },
        {
          name: 'firm',
          title: 'Firm %',
          type: 'number',
        },
        {
          name: 'note',
          title: 'Note (e.g., progression levels)',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'resetCost',
      title: 'Reset Cost ($)',
      type: 'number',
    }),
    defineField({
      name: 'pathToLive',
      title: 'Path to Live Capital',
      type: 'text',
      rows: 3,
      description: 'Steps to go from eval to live trading',
    }),
    defineField({
      name: 'keyHighlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points for quick scans',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'firm.name',
      media: 'firm.logo',
    },
  },
})
