import { createClient } from '@sanity/client'
import { siteSettingsQuery } from './queries'
import type { SiteSettings } from '../types/content'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const sanityConfigured = Boolean(projectId)
export const sanityClient = projectId ? createClient({
  projectId, dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  useCdn: true,
}) : null

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!sanityClient) return fallback
  try { return await sanityClient.fetch<T>(query, params) } catch (error) {
    console.error('Sanity query failed:', error)
    return fallback
  }
}

export async function sanityFetchSiteSettings(): Promise<SiteSettings> {
  const settings = await sanityFetch<SiteSettings | null>(siteSettingsQuery, {}, null)
  return settings ?? {}
}
