import Head from 'next/head'
import fs from 'node:fs'
import path from 'node:path'
import type { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import StaffCard from '../components/StaffCard'
import EmptyState from '../components/EmptyState'
import { sanityFetch, sanityFetchSiteSettings } from '../lib/sanity.client'
import { staffQuery } from '../lib/queries'
import type { SiteSettings, StaffMember } from '../types/content'
type Profile=StaffMember&{localPhoto?:string|null}
type Props={staff:Profile[];settings:SiteSettings}
export const getStaticProps:GetStaticProps<Props>=async()=>{const [staff,settings]=await Promise.all([sanityFetch(staffQuery,{},[] as StaffMember[]),sanityFetchSiteSettings()]);const members=staff.map((member)=>{const local=member.slug?`${member.slug}.jpg`:'';const localPhoto=local&&fs.existsSync(path.join(process.cwd(),'public/images/staff',local))?`/images/staff/${local}`:null;return {...member,localPhoto}});return{props:{staff:members,settings},revalidate:60}}
export default function Staff({staff,settings}:Props){return <Layout settings={settings}><Head><title>Our Staff | Pale Blue Dot</title><meta name="description" content="Meet the editorial team behind Pale Blue Dot."/></Head><section className="container"><header className="page-intro"><p className="eyebrow">The people behind the journal</p><h1 className="page-title">Our Staff</h1></header>{staff.length?<div className="staff-grid">{staff.map((member)=><StaffCard key={member._id} member={member} localPhoto={member.localPhoto}/>)}</div>:<EmptyState title="The team is growing">Staff profiles will appear here as they are added in Sanity Studio.</EmptyState>}</section></Layout>}
