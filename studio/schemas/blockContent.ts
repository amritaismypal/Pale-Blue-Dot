export default {
  title: 'Portable text', name: 'blockContent', type: 'array',
  of: [
    { type: 'block', styles: [
      { title: 'Normal', value: 'normal' }, { title: 'Heading 2', value: 'h2' },
      { title: 'Heading 3', value: 'h3' }, { title: 'Heading 4', value: 'h4' },
      { title: 'Quote', value: 'blockquote' },
    ], lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
      marks: { decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }], annotations: [{ name: 'link', type: 'object', title: 'Link', fields: [{ name: 'href', type: 'url', title: 'URL' }] }] } },
    { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alternative text', type: 'string', validation: (Rule: any) => Rule.required() }, { name: 'caption', title: 'Caption', type: 'string' }] },
  ],
}
