export default { name: 'staffMember', title: 'Staff member', type: 'document', fields: [
  { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
  { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule: any) => Rule.required() },
  { name: 'role', title: 'Role', type: 'string' },
  { name: 'bio', title: 'Bio', type: 'text' },
  { name: 'funFact', title: 'Fun fact', type: 'string' },
  { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alternative text', type: 'string', validation: (Rule: any) => Rule.required() }] },
  { name: 'displayOrder', title: 'Display order', type: 'number' },
  { name: 'email', title: 'Email', type: 'string' },
  { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
] }
