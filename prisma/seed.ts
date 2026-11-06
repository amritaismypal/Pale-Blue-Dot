import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
  await prisma.article.create({
    data: {
      edition: 1,
      title: 'The Pale Meanings of a Pale Blue Dot',
      author: 'María González',
      publishDate: new Date('2026-06-01'),
      abstract: 'An exploration of planetary perspective in contemporary student scholarship from Chile.',
      content: 'Full article content goes here. This is placeholder content for testing the application.\n\nSection 1...\n\nSection 2...',
      language: 'es',
      status: 'published'
    }
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
