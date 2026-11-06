import Head from 'next/head'
import Link from 'next/link'
import type { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import PortableTextRenderer from '../components/PortableTextRenderer'
import EmptyState from '../components/EmptyState'
import { sanityFetch } from '../lib/sanity.client'
import { aboutQuery, siteSettingsQuery } from '../lib/queries'
import type { AboutPage, SiteSettings } from '../types/content'
type Props={about:AboutPage|null;settings:SiteSettings}
export const getStaticProps:GetStaticProps<Props>=async()=>{const [about,settings]=await Promise.all([sanityFetch<AboutPage|null>(aboutQuery,{},null),sanityFetch(siteSettingsQuery,{},{} as SiteSettings)]);return{props:{about,settings},revalidate:60}}
export default function About({about,settings}:Props){return <Layout settings={settings}><Head><title>About | Pale Blue Dot</title><meta name="description" content={about?.mission||'Learn about Pale Blue Dot and how the journal works.'}/></Head><section className="container"><header className="page-intro"><p className="eyebrow">Our purpose</p><h1 className="page-title">About Pale Blue Dot</h1></header>{about&&(about.mission||about.history||about.values||about.howItWorks||about.body)?<><div className="about-sections">{about.mission&&<section><h2>Mission</h2><p>{about.mission}</p></section>}{about.history&&<section><h2>History</h2><p>{about.history}</p></section>}{about.values&&<section><h2>Values</h2><p>{about.values}</p></section>}{about.howItWorks&&<section><h2>How the journal works</h2><PortableTextRenderer value={about.howItWorks}/></section>}</div>{about.body&&<div className="portable-text"><PortableTextRenderer value={about.body}/></div>}</>:<EmptyState title="Our story is being written">The editorial team will share the journal’s mission, history, and values here.</EmptyState>}<p className="mt-8"><Link className="button" href="/staff">Meet the staff →</Link> <Link className="button light" href="/submit">Submit your work →</Link></p></section></Layout>}
