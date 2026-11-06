import Head from 'next/head'
import Link from 'next/link'
import type { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import PortableTextRenderer from '../components/PortableTextRenderer'
import EmptyState from '../components/EmptyState'
import { contentRevalidate, sanityFetch, sanityFetchSiteSettings } from '../lib/sanity.client'
import { featuredIssueQuery } from '../lib/queries'
import type { Issue, SiteSettings } from '../types/content'
type Props={settings:SiteSettings;latest:Issue|null}
export const getStaticProps:GetStaticProps<Props>=async({preview = false})=>{const [settings,latest]=await Promise.all([sanityFetchSiteSettings(preview),sanityFetch<Issue|null>(featuredIssueQuery,{},null,preview)]);return{props:{settings,latest},revalidate:contentRevalidate}}
export default function Submit({settings,latest}:Props){const open=Boolean(settings.submissionsOpen);return <Layout settings={settings}><Head><title>Submit | Pale Blue Dot</title><meta name="description" content="Submission guidelines for Pale Blue Dot."/></Head><section className="container"><header className="page-intro"><p className="eyebrow">Contribute</p><h1 className="page-title">Submit to the Journal</h1></header><div className="submit-panel">{open?<><h2>Submissions are open</h2><PortableTextRenderer value={settings.submissionGuidelines}/>{settings.submissionsFormUrl?<a className="button" href={settings.submissionsFormUrl} target="_blank" rel="noopener noreferrer">Open the submission form →</a>:<EmptyState title="The submission form is being prepared">Please check back soon or contact the editorial team.</EmptyState>}</>:<><h2>{settings.submissionsClosedMessage||'Submissions are closed for now.'}</h2><p>{settings.contactEmail?<>Questions? Email <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>.</>:'Please check back for future submission windows.'}</p>{latest?<Link className="button" href={`/journal/${latest.slug}`}>Read the latest edition →</Link>:<Link href="/journal">Browse the journal →</Link>}</>}</div></section></Layout>}
