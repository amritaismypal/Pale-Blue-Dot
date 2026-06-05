export default {
  name:'article',
  title:'Article',
  type:'document',
  fields:[
    {name:'title', title:'Title', type:'string'},
    {name:'slug', title:'Slug', type:'slug', options:{source:'title'}},
    {name:'authors', title:'Authors', type:'array', of:[{type:'reference', to:[{type:'author'}]}]},
    {name:'language', title:'Original Language', type:'string'},
    {name:'bodyOriginal', title:'Body (Original)', type:'blockContent'},
    {name:'bodyEnglish', title:'Body (English Translation)', type:'blockContent'},
    {name:'publishedAt', title:'Published At', type:'datetime'},
    {name:'readingTime', title:'Reading Time', type:'number'},
    {name:'pdf', title:'PDF Download', type:'file'},
    {name:'issue', title:'Issue', type:'reference', to:[{type:'issue'}]},
  ]
}
