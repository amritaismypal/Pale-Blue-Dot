import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import type { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import EmptyState from '../../components/EmptyState'
import { contentRevalidate, sanityFetch, sanityFetchSiteSettings } from '../../lib/sanity.client'
import { blogListQuery } from '../../lib/queries'
import { sanityImage } from '../../lib/sanity.image'
import type { BlogPost, SiteSettings } from '../../types/content'
export const getStaticProps: GetStaticProps<{posts:BlogPost[];settings:SiteSettings}> = async ({preview = false}) => { const [posts,settings]=await Promise.all([sanityFetch(blogListQuery,{},[] as BlogPost[],preview),sanityFetchSiteSettings(preview)]); return {props:{posts,settings},revalidate:contentRevalidate} }
export default function Blog({posts,settings}:{posts:BlogPost[];settings:SiteSettings}) { return <Layout settings={settings}><Head><title>Blog | Pale Blue Dot</title><meta name="description" content="Dispatches, interviews, and reflections from Pale Blue Dot." /></Head><section className="container"><header className="page-intro"><p className="eyebrow">Dispatches and reflections</p><h1 className="page-title">Blog</h1><p>Conversations and ideas from the Pale Blue Dot community.</p></header>{posts.length ? <div className="content-grid">{posts.map((post)=>{const src=sanityImage(post.coverImage,720);return <article className="content-card" key={post._id||post.slug}>{src&&<Image src={src} alt={post.coverImage?.alt||''} width={720} height={480} sizes="(max-width:700px) 100vw, 33vw"/>}<div className="card-copy"><p className="meta">{post.author?.name||'Pale Blue Dot'}{post.publishedAt?` · ${new Date(post.publishedAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}`:''}</p><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="text-link">Read post →</Link></div></article>})}</div>:<EmptyState title="No blog posts yet">New essays and conversations will be published here.</EmptyState>}</section></Layout> }
