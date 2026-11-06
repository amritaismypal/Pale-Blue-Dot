import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import type { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import EditionCard from '../components/EditionCard'
import EmptyState from '../components/EmptyState'
import { sanityFetch, sanityFetchSiteSettings } from '../lib/sanity.client'
import { blogListQuery, featuredIssueQuery, issuesQuery } from '../lib/queries'
import { sanityImage } from '../lib/sanity.image'
import type { BlogPost, Issue, SiteSettings } from '../types/content'

type Props = { settings: SiteSettings; featured: Issue | null; issues: Issue[]; posts: BlogPost[] }
export const getStaticProps: GetStaticProps<Props> = async () => {
  const [settings, featured, issues, posts] = await Promise.all([
    sanityFetchSiteSettings(), sanityFetch< Issue | null>(featuredIssueQuery, {}, null), sanityFetch(issuesQuery, {}, [] as Issue[]), sanityFetch(blogListQuery, {}, [] as BlogPost[]),
  ])
  return { props: { settings, featured, issues, posts: posts.slice(0, 3) }, revalidate: 60 }
}
export default function Home({ settings, featured, issues, posts }: Props) {
  const older = issues.filter((issue) => issue._id !== featured?._id).slice(0, 3)
  const cover = featured && sanityImage(featured.coverImage, 1000)
  return <Layout settings={settings}><Head><title>Pale Blue Dot | Interdisciplinary Student Journal</title><meta name="description" content={settings.aboutBlurb || 'An interdisciplinary student journal publishing scholarship across borders.'} /><meta property="og:title" content="Pale Blue Dot" /><meta property="og:description" content={settings.aboutBlurb || 'Ideas travel farther when every voice has room.'} /></Head>
    <Hero aboutBlurb={settings.aboutBlurb} />
    <section className="container highlights"><div className="section-heading"><div><p className="eyebrow">Latest issue</p><h2>Now Available</h2></div><Link href="/journal">All editions →</Link></div>
      {featured ? <article className="featured-edition">{cover ? <Image src={cover} alt={featured.coverImage?.alt || `${featured.title} cover`} width={1000} height={1200} sizes="(max-width: 680px) 100vw, 40vw" /> : <div className="image-placeholder">Pale Blue Dot</div>}<div className="featured-copy"><p className="eyebrow">{featured.publishedAt ? new Date(featured.publishedAt).getFullYear() : 'New edition'}</p><h3>{featured.title}</h3><p>{featured.description}</p><Link className="button" href={`/journal/${featured.slug}`}>Read this edition →</Link></div></article> : <EmptyState title="The first edition is on its way">Check back soon for new writing from Pale Blue Dot.</EmptyState>}</section>
    {older.length > 0 && <section className="container highlights"><div className="section-heading"><h2>Previous Editions</h2><Link href="/journal">Browse all editions →</Link></div><div className="content-grid">{older.map((issue) => <EditionCard key={issue._id || issue.slug} issue={issue} />)}</div></section>}
    <section className="container highlights"><div className="section-heading"><h2>Latest from the Blog</h2><Link href="/blog">Visit the blog →</Link></div>{posts.length ? <div className="content-grid">{posts.map((post) => <article className="content-card" key={post._id || post.slug}><div className="card-copy"><p className="eyebrow">{post.author?.name || 'Pale Blue Dot'}{post.publishedAt ? ` · ${new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}</p><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p></div></article>)}</div> : <EmptyState title="Notes from the journal">Blog posts will appear here as they are published.</EmptyState>}</section>
    <section className="container highlights"><h2 className="page-title">Get involved</h2><div className="get-involved"><div className="involved-card"><h3>Contribute your work</h3><p>See current submission guidelines and share your research.</p>{settings.submissionsOpen ? <Link href="/submit">Submit to the journal →</Link> : <p className="submission-closed" role="status">{settings.submissionsClosedMessage || 'Submissions are closed for now.'}</p>}</div><div className="involved-card"><h3>Meet the team</h3><p>Learn about the students who bring Pale Blue Dot together.</p><Link href="/staff">Meet the staff →</Link></div><div className="involved-card"><h3>Contact us</h3><p>{settings.contactEmail ? <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a> : 'Reach out through our social channels.'}</p></div></div></section>
  </Layout>
}
