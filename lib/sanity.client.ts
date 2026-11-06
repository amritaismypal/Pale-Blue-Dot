import { createClient } from '@sanity/client'
import { siteSettingsQuery } from './queries'
import type { SiteSettings } from '../types/content'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const sanityConfigured = Boolean(projectId)
const publicSanityClient = projectId ? createClient({
  projectId, dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  useCdn: true,
}) : null
export const sanityClient = publicSanityClient

function getSanityClient(preview = false) {
  if (!projectId) return null
  if (preview) {
    const token = process.env.SANITY_API_READ_TOKEN
    if (!token) throw new Error('SANITY_API_READ_TOKEN is required to preview draft content.')
    return createClient({
      projectId, dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
      useCdn: false,
      token,
      perspective: 'previewDrafts',
    })
  }
  return publicSanityClient
}

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T, preview = false): Promise<T> {
  const client = getSanityClient(preview)
  if (!client) return fallback
  try { return await client.fetch<T>(query, params) } catch (error) {
    console.error('Sanity query failed:', error)
    return fallback
  }
}

export async function sanityFetchSiteSettings(preview = false): Promise<SiteSettings> {
  const settings = await sanityFetch<SiteSettings | null>(siteSettingsQuery, {}, null, preview)
  return settings ?? {}
}
