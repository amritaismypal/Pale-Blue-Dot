export default { name: 'author', title: 'Author', type: 'document', fields: [
  { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
  { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule: any) => Rule.required() },
  { name: 'bio', title: 'Bio', type: 'text' },
  { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alternative text', type: 'string', validation: (Rule: any) => Rule.required() }] },
  { name: 'affiliation', title: 'University / affiliation', type: 'string' },
] }
