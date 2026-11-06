import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../../components/Layout'
import Breadcrumbs from '../../../components/Breadcrumbs'
import ArticleCard from '../../../components/ArticleCard'
import EmptyState from '../../../components/EmptyState'
import { sanityFetch } from '../../../lib/sanity.client'
import { issueBySlugQuery, issuesQuery, siteSettingsQuery } from '../../../lib/queries'
import { sanityImage } from '../../../lib/sanity.image'
import type { Issue, SiteSettings } from '../../../types/content'

type Props = { issue: Issue | null; settings: SiteSettings }
export const getStaticPaths: GetStaticPaths = async () => { const issues = await sanityFetch<Issue[]>(issuesQuery, {}, []); return { paths: issues.map((issue) => ({ params: { issueSlug: issue.slug } })), fallback: 'blocking' } }
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.issueSlug || '')
  const [issue, settings] = await Promise.all([sanityFetch<Issue | null>(issueBySlugQuery, { slug }, null), sanityFetch(siteSettingsQuery, {}, {} as SiteSettings)])
  if (!issue) return { notFound: true, revalidate: 60 }
  return { props: { issue, settings }, revalidate: 60 }
}
export default function EditionPage({ issue, settings }: Props) {
  if (!issue) return <Layout settings={settings}><section className="container"><EmptyState title="Edition not found">This edition may have moved or is not published yet.</EmptyState></section></Layout>
  const cover = sanityImage(issue.coverImage, 1000)
  return <Layout settings={settings}><Head><title>{issue.title} | Pale Blue Dot</title><meta name="description" content={issue.description || `Read the ${issue.title} edition of Pale Blue Dot.`} /><meta property="og:title" content={issue.title} /><meta property="og:description" content={issue.description || ''} />{cover && <meta property="og:image" content={cover} />}</Head><section className="container">
    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Journal', href: '/journal' }, { label: issue.title }]} />
    <header className="edition-header">{cover ? <Image src={cover} alt={issue.coverImage?.alt || `${issue.title} cover`} width={1000} height={1200} sizes="(max-width: 680px) 100vw, 40vw" /> : <div className="image-placeholder">Pale Blue Dot</div>}<div><p className="eyebrow">{issue.publishedAt ? new Date(issue.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Pale Blue Dot'}</p><h1>{issue.title}</h1>{issue.description && <p>{issue.description}</p>}{issue.pdf?.url && <a className="button" href={issue.pdf.url} target="_blank" rel="noopener noreferrer">Download full edition (PDF){issue.pdf.size ? ` · ${(issue.pdf.size / (1024 * 1024)).toFixed(1)} MB` : ''}</a>}</div></header>
    <div className="section-heading"><h2>Articles in this edition</h2></div>{issue.articles?.length ? <div className="content-grid">{issue.articles.map((article) => <ArticleCard key={article._id || article.slug} article={article} issueSlug={issue.slug} />)}</div> : <EmptyState title="Articles are being prepared">Articles will appear here as they are published for this edition.</EmptyState>}
    <p className="mt-8"><Link href="/journal">← All editions</Link></p>
  </section></Layout>
}
