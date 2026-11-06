import Image from 'next/image'
import Link from 'next/link'
import type { Issue } from '../types/content'
import { sanityImage } from '../lib/sanity.image'
export default function EditionCard({ issue }: { issue: Issue }) {
  const src = sanityImage(issue.coverImage, 720)
  return <article className="content-card edition-card">{src ? <Image src={src} alt={issue.coverImage?.alt || `${issue.title} cover`} width={720} height={920} sizes="(max-width: 700px) 100vw, 33vw" /> : <div className="image-placeholder" aria-label="Edition cover not yet available">Pale Blue Dot</div>}<div className="card-copy"><p className="eyebrow">{issue.publishedAt ? new Date(issue.publishedAt).getFullYear() : 'Edition'}</p><h2>{issue.title}</h2><p>{issue.description || 'Explore the writing in this edition.'}</p><p className="meta">{issue.articleCount ?? issue.articles?.length ?? 0} articles</p><Link className="text-link" href={`/journal/${issue.slug}`}>View edition <span aria-hidden="true">→</span></Link></div></article>
}
