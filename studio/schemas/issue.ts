export default {
  name: 'issue',
  title: 'Issue',
  type: 'document',
  fields: [
    {name:'title', title:'Title', type:'string'},
    {name:'slug', title:'Slug', type:'slug', options:{source:'title'}},
    {name:'cover', title:'Cover', type:'image'},
    {name:'introduction', title:'Introduction', type:'text'},
    {name:'editorialNote', title:'Editorial Note', type:'blockContent'},
    {name:'articles', title:'Articles', type:'array', of:[{type:'reference', to:[{type:'article'}]}]},
  ]
}
