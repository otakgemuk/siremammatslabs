import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('comparison').title('📊 Comparisons'),
      S.divider(),
      S.documentTypeListItem('propFirm').title('🏢 Prop Firms'),
      S.documentTypeListItem('plan').title('📋 Trading Plans'),
    ])
