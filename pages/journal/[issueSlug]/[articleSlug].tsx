import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../../components/Layout'
import Breadcrumbs from '../../../components/Breadcrumbs'
import ArticleBody from '../../../components/ArticleBody'
import ArticleCard from '../../../components/ArticleCard'
import References from '../../../components/References'
import EmptyState from '../../../components/EmptyState'
import { contentPathFallback, contentRevalidate, sanityFetch, sanityFetchSiteSettings } from '../../../lib/sanity.client'
import { articleBySlugQuery, articlePathsQuery } from '../../../lib/queries'
import { sanityImage } from '../../../lib/sanity.image'
import type { Article, SiteSettings } from '../../../types/content'

type Props = { article: Article | null; settings: SiteSettings }
export const getStaticPaths: GetStaticPaths = async () => { const entries = await sanityFetch<{slug:string; issueSlug:string}[]>(articlePathsQuery, {}, []); return { paths: entries.map(({slug, issueSlug}) => ({params: {issueSlug, articleSlug: slug}})), fallback: contentPathFallback } }
export const getStaticProps: GetStaticProps<Props> = async ({ params, preview = false }) => {
  const [article, settings] = await Promise.all([sanityFetch<Article | null>(articleBySlugQuery, { issueSlug: String(params?.issueSlug || ''), articleSlug: String(params?.articleSlug || '') }, null, preview), sanityFetchSiteSettings(preview)])
  if (!article) return { notFound: true, revalidate: contentRevalidate }
  return { props: { article, settings }, revalidate: contentRevalidate }
}
export default function ArticlePage({ article, settings }: Props) {
  if (!article) return <Layout settings={settings}><section className="container"><EmptyState title="Article not found">This article may have moved or is not published yet.</EmptyState></section></Layout>
  const hero = sanityImage(article.heroImage, 1600)
  const date = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''
  const alternate = article.translation || article.original || article.translationOf
  return <Layout settings={settings}><Head><title>{article.title} | Pale Blue Dot</title><meta name="description" content={article.abstract || article.title} /><meta property="og:title" content={article.title} /><meta property="og:description" content={article.abstract || ''} />{hero && <meta property="og:image" content={hero} />}</Head>
    <article className="article-page"><Breadcrumbs items={[{label:'Home',href:'/'},{label:'Journal',href:'/journal'},{label:article.issue?.title || 'Edition',href:`/journal/${article.issue?.slug || ''}`},{label:article.title}]} />
      <header className="article-header"><p className="eyebrow">{article.issue?.title || 'Pale Blue Dot'}</p><h1>{article.title}</h1><p className="article-byline">Published by {article.authors?.map((author) => author.name).join(', ') || 'Pale Blue Dot'}{date ? ` on ${date}` : ''}</p>{article.disclaimer && <p className="disclaimer">{article.disclaimer}</p>}{alternate && <div className="language-switch"><span>Also available:</span><Link href={`/journal/${alternate.issueSlug}/${alternate.slug}`}>{alternate.language?.toUpperCase() || 'Translation'}</Link></div>}{article.pdf && <p><a className="button" href={article.pdf} target="_blank" rel="noopener noreferrer">Download this article (PDF)</a></p>}</header>
      {hero && <Image className="article-hero" src={hero} alt={article.heroImage?.alt || article.title} width={1600} height={1000} sizes="100vw" priority />}
      {article.abstract && <p className="article-abstract"><strong>Abstract.</strong> {article.abstract}</p>}
      <ArticleBody value={article.body} /><References references={article.references} />
      <section className="more-edition"><div className="section-heading"><h2>More from this edition</h2><Link href={`/journal/${article.issue?.slug || ''}`}>View full edition →</Link></div>{article.more?.length ? <div className="content-grid">{article.more.slice(0,3).map((other) => <ArticleCard key={other._id || other.slug} article={other} issueSlug={article.issue?.slug} />)}</div> : <p>Explore the other articles in this edition.</p>}</section>
    </article>
  </Layout>
}
