export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}, {title:'H1', value:'h1'}],
      lists: [{title:'Bullet', value:'bullet'}],
    },
    {type:'image'}
  ]
}
