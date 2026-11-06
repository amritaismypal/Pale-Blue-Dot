export default {
  name: 'issue', title: 'Edition', type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule: any) => Rule.required() },
    { name: 'editionNumber', title: 'Edition number', type: 'number' },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    { name: 'coverImage', title: 'Cover image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alternative text', type: 'string', validation: (Rule: any) => Rule.required() }] },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'pdf', title: 'Edition PDF', type: 'file', options: { accept: '.pdf' } },
    { name: 'featured', title: 'Show as Now Available', type: 'boolean', initialValue: false },
  ],
  preview: { select: { title: 'title', media: 'coverImage', editionNumber: 'editionNumber' }, prepare({ title, media, editionNumber }: any) { return { title, subtitle: editionNumber ? `Edition ${editionNumber}` : 'Edition', media } } },
}
