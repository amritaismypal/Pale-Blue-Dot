export default {
  name:'author',
  title:'Author',
  type:'document',
  fields:[
    {name:'name', title:'Name', type:'string'},
    {name:'slug', title:'Slug', type:'slug', options:{source:'name'}},
    {name:'bio', title:'Bio', type:'text'},
    {name:'photo', title:'Photo', type:'image'},
  ]
}
