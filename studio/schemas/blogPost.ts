export default { name: 'blogPost', title: 'Blog post', type: 'document', fields: [
  { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
  { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule: any) => Rule.required() },
  { name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] },
  { name: 'publishedAt', title: 'Published at', type: 'datetime' },
  { name: 'coverImage', title: 'Cover image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alternative text', type: 'string', validation: (Rule: any) => Rule.required() }] },
  { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
  { name: 'body', title: 'Body', type: 'blockContent' },
] }
