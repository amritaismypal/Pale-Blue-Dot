import Head from 'next/head'
import Image from 'next/image'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import Breadcrumbs from '../../components/Breadcrumbs'
import PortableTextRenderer from '../../components/PortableTextRenderer'
import BlogComments from '../../components/BlogComments'
import EmptyState from '../../components/EmptyState'
import { contentPathFallback, contentRevalidate, sanityFetch, sanityFetchSiteSettings } from '../../lib/sanity.client'
import { blogBySlugQuery, blogListQuery, blogPathsQuery } from '../../lib/queries'
import { sanityImage } from '../../lib/sanity.image'
import type { BlogPost, SiteSettings } from '../../types/content'
type Props={post:BlogPost|null;settings:SiteSettings}
export const getStaticPaths:GetStaticPaths=async()=>{const paths=await sanityFetch<{slug:string}[]>(blogPathsQuery,{},[]);return{paths:paths.map(({slug})=>({params:{slug}})),fallback:contentPathFallback}}
export const getStaticProps:GetStaticProps<Props>=async({params,preview = false})=>{const [post,settings]=await Promise.all([sanityFetch<BlogPost|null>(blogBySlugQuery,{slug:String(params?.slug||'')},null,preview),sanityFetchSiteSettings(preview)]);if(!post)return{notFound:true,revalidate:contentRevalidate};return{props:{post,settings},revalidate:contentRevalidate}}
export default function BlogPostPage({post,settings}:Props){if(!post)return <Layout settings={settings}><section className="container"><EmptyState title="Post not found" /></section></Layout>;const cover=sanityImage(post.coverImage,1400);return <Layout settings={settings}><Head><title>{post.title} | Pale Blue Dot Blog</title><meta name="description" content={post.excerpt||post.title}/><meta property="og:title" content={post.title}/><meta property="og:description" content={post.excerpt||''}/>{cover&&<meta property="og:image" content={cover}/>}</Head><article className="container"><Breadcrumbs items={[{label:'Home',href:'/'},{label:'Blog',href:'/blog'},{label:post.title}]}/><header className="article-header"><p className="eyebrow">{post.author?.name||'Pale Blue Dot'}{post.publishedAt?` · ${new Date(post.publishedAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}`:''}</p><h1>{post.title}</h1>{post.excerpt&&<p className="page-intro">{post.excerpt}</p>}</header>{cover&&<Image className="post-hero" src={cover} alt={post.coverImage?.alt||post.title} width={1400} height={900} sizes="100vw"/>}<div className="article-reading-layout"><div/><div className="article-body"><PortableTextRenderer value={post.body}/></div></div><BlogComments postSlug={post.slug}/></article></Layout>}
