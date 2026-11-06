export default { name: 'siteSettings', title: 'Site settings', type: 'document', fields: [
  { name: 'submissionsOpen', title: 'Submissions open', type: 'boolean', initialValue: false },
  { name: 'submissionsFormUrl', title: 'Submission form URL', type: 'url' },
  { name: 'submissionsClosedMessage', title: 'Closed message', type: 'string', initialValue: 'Submissions are closed for now.' },
  { name: 'submissionGuidelines', title: 'Submission guidelines', type: 'blockContent' },
  { name: 'contactEmail', title: 'Contact email', type: 'string' },
  { name: 'socialLinks', title: 'Social links', type: 'array', of: [{ type: 'object', fields: [{ name: 'label', title: 'Label', type: 'string' }, { name: 'url', title: 'URL', type: 'url' }] }] },
  { name: 'aboutBlurb', title: 'Homepage mission paragraph', type: 'text', rows: 3, initialValue: "An editorial journal centering student scholars and intellectuals outside the United States. We publish work in the authors' original language and in English" },
] }
