export default {
  name: 'article', title: 'Article', type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule: any) => Rule.required() },
    { name: 'authors', title: 'Authors', type: 'array', of: [{ type: 'reference', to: [{ type: 'author' }] }] },
    { name: 'issue', title: 'Edition', type: 'reference', to: [{ type: 'issue' }], validation: (Rule: any) => Rule.required() },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    { name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alternative text', type: 'string', validation: (Rule: any) => Rule.required() }] },
    { name: 'disclaimer', title: 'Disclaimer', type: 'string' },
    { name: 'abstract', title: 'Abstract', type: 'text', rows: 4 },
    { name: 'body', title: 'Body', type: 'blockContent' },
    { name: 'references', title: 'References', type: 'array', of: [{ type: 'string' }] },
    { name: 'pdf', title: 'Article PDF', type: 'file', options: { accept: '.pdf' } },
    { name: 'language', title: 'Language', type: 'string', initialValue: 'en' },
    { name: 'translationOf', title: 'Translation of', type: 'reference', to: [{ type: 'article' }] },
  ],
  preview: { select: { title: 'title', issue: 'issue.title' }, prepare({ title, issue }: any) { return { title, subtitle: issue ? `Edition: ${issue}` : 'Edition not selected' } } },
}
