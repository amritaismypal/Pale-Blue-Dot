import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

const singletons = ['siteSettings', 'aboutPage']

export default defineConfig({
  name: 'pale-blue-dot', title: 'Pale Blue Dot',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'replace-me',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool({ structure: (S) => S.list().title('Content').items([
    ...singletons.map((id) => S.listItem().title(id === 'siteSettings' ? 'Site settings' : 'About page').id(id).child(S.document().schemaType(id).documentId(id))),
    S.divider(), ...S.documentTypeListItems().filter((item) => !singletons.includes(String(item.getId()))),
  ]) }), presentationTool({
    previewUrl: {
      initial: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
      previewMode: { enable: '/api/draft-mode/enable', disable: '/api/draft-mode/disable' },
    },
  })],
  schema: { types: schemaTypes },
})
