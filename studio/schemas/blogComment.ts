export default {
  name: 'blogComment', title: 'Blog comment', type: 'document',
  fields: [
    { name: 'post', title: 'Blog post', type: 'reference', to: [{ type: 'blogPost' }], validation: (Rule: any) => Rule.required() },
    { name: 'name', title: 'Display name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'message', title: 'Comment', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
    { name: 'submittedAt', title: 'Submitted at', type: 'datetime' },
    { name: 'approved', title: 'Approved for display', type: 'boolean', initialValue: false },
  ],
  preview: { select: { title: 'name', subtitle: 'post.title' }, prepare({ title, subtitle }: any) { return { title: title || 'Comment', subtitle: subtitle ? `On: ${subtitle}` : 'Pending approval' } } },
}
