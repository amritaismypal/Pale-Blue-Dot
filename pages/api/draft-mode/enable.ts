import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@sanity/client'
import { validatePreviewUrl } from '@sanity/preview-url-secret'

export default async function enableDraftMode(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' })
  if (!req.url) return res.status(400).json({ message: 'Missing preview URL' })

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const token = process.env.SANITY_API_READ_TOKEN
  if (!projectId || !token) return res.status(500).json({ message: 'Preview is not configured' })

  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
    useCdn: false,
    token,
  })

  try {
    const { isValid, redirectTo = '/' } = await validatePreviewUrl(client, req.url)
    if (!isValid) return res.status(401).json({ message: 'Invalid or expired preview link' })
    res.setDraftMode({ enable: true })
    return res.redirect(307, redirectTo)
  } catch (error) {
    console.error('Draft mode could not be enabled:', error)
    return res.status(401).json({ message: 'Invalid or expired preview link' })
  }
}
