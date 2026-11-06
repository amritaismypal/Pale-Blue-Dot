import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '../types/content'
import { sanityImage } from '../lib/sanity.image'
export default function ArticleCard({ article, issueSlug }: { article: Article; issueSlug?: string }) {
  const src = sanityImage(article.heroImage, 720)
  return <article className="content-card article-card">{src ? <Image src={src} alt={article.heroImage?.alt || ''} width={720} height={480} sizes="(max-width: 700px) 100vw, 33vw" /> : <div className="image-placeholder">Pale Blue Dot</div>}<div className="card-copy"><h3><Link href={`/journal/${issueSlug || article.issue?.slug}/${article.slug}`}>{article.title}</Link></h3><p className="meta">{article.authors?.map((author) => author.name).join(', ') || 'Pale Blue Dot'}{article.publishedAt ? ` · ${new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` : ''}</p>{article.abstract && <p>{article.abstract}</p>}</div></article>
}
