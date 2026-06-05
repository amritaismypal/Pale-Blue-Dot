export default {
  name:'blogPost',
  title:'Blog Post',
  type:'document',
  fields:[
    {name:'title', title:'Title', type:'string'},
    {name:'slug', title:'Slug', type:'slug', options:{source:'title'}},
    {name:'author', title:'Author', type:'reference', to:[{type:'author'}]},
    {name:'publishedAt', title:'Published At', type:'datetime'},
    {name:'excerpt', title:'Excerpt', type:'text'},
    {name:'body', title:'Body', type:'blockContent'},
  ]
}
