import Head from 'next/head'
import type { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import EditionCard from '../../components/EditionCard'
import EmptyState from '../../components/EmptyState'
import { sanityFetch } from '../../lib/sanity.client'
import { issuesQuery, siteSettingsQuery } from '../../lib/queries'
import type { Issue, SiteSettings } from '../../types/content'
export const getStaticProps: GetStaticProps<{ issues: Issue[]; settings: SiteSettings }> = async () => {
  const [issues, settings] = await Promise.all([sanityFetch(issuesQuery, {}, [] as Issue[]), sanityFetch(siteSettingsQuery, {}, {} as SiteSettings)])
  return { props: { issues, settings }, revalidate: 60 }
}
export default function Journal({ issues, settings }: { issues: Issue[]; settings: SiteSettings }) { return <Layout settings={settings}><Head><title>Journal Editions | Pale Blue Dot</title><meta name="description" content="Explore every edition of Pale Blue Dot." /></Head><section className="container"><header className="page-intro"><p className="eyebrow">Pale Blue Dot</p><h1 className="page-title">Journal Editions</h1><p>One journal, many perspectives. Browse our editions and the scholarship in each one.</p></header>{issues.length ? <div className="content-grid">{issues.map((issue) => <EditionCard key={issue._id || issue.slug} issue={issue} />)}</div> : <EmptyState title="No editions published yet">When an edition is published in Sanity Studio, it will appear here.</EmptyState>}</section></Layout> }
