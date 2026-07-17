import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'plan',
  title: 'Plan',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Plan Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'pidId', title: 'PID', type: 'string', description: 'e.g. "apex-50000-eodevaluation"' }),
    defineField({ name: 'firm', title: 'Firm', type: 'reference', to: [{ type: 'propFirm' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'programName', title: 'Program Name', type: 'string' }),
    defineField({ name: 'accountSize', title: 'Account Size ($)', type: 'number' }),
    defineField({ name: 'pricingModel', title: 'Pricing Model', type: 'string', options: { list: ['one-time', 'monthly'] } }),
    defineField({ name: 'evalFee', title: 'Eval Fee ($)', type: 'number', description: 'Base evaluation price — NOTE: absent from Jul 17 migration; backfill' }),
    defineField({ name: 'activationFee', title: 'Activation Fee ($)', type: 'number' }),
    defineField({ name: 'profitTarget', title: 'Profit Target ($)', type: 'number' }),
    defineField({ name: 'maxDrawdown', title: 'Max Drawdown ($)', type: 'number' }),
    defineField({ name: 'drawdownType', title: 'Drawdown Type', type: 'string', options: { list: ['EOD-trailing', 'intraday-trailing', 'static'] } }),
    defineField({ name: 'dailyLossLimit', title: 'Daily Loss Limit ($)', type: 'number' }),
    defineField({ name: 'minTradingDays', title: 'Min Trading Days', type: 'number' }),
    defineField({
      name: 'maxContracts', title: 'Max Contracts', type: 'object',
      fields: [
        defineField({ name: 'minis', title: 'Minis', type: 'number' }),
        defineField({ name: 'micros', title: 'Micros', type: 'number' }),
      ],
    }),
    defineField({ name: 'notes', title: 'Notes', type: 'text', rows: 3 }),
    defineField({ name: 'dataStatus', title: 'Data Status', type: 'string', options: { list: ['verified', 'partial', 'unverified'] } }),
    defineField({ name: 'lastVerified', title: 'Last Verified', type: 'date' }),
    defineField({ name: 'sourceIds', title: 'Source IDs', type: 'string' }),
    defineField({ name: 'sourceUrl', title: 'Source URL', type: 'url' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'pidId' },
  },
})
