import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@sanity/client'

type PublicComment = { _id: string; name: string; message: string; submittedAt: string }
function client(write = false) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) return null
  const token = write ? process.env.SANITY_API_WRITE_TOKEN : undefined
  if (write && !token) return null
  return createClient({ projectId, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01', useCdn: false, token })
}

export const config = { api: { bodyParser: { sizeLimit: '10kb' } } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const slug = typeof req.query.slug === 'string' ? req.query.slug : (req.method === 'POST' && typeof req.body?.slug === 'string' ? req.body.slug : '')
  if (!slug || slug.length > 180) return res.status(400).json({ error: 'A valid blog post slug is required.' })
  if (req.method === 'GET') {
    const sanity = client()
    if (!sanity) return res.status(503).json({ error: 'Comments are not configured yet.' })
    try {
      const comments = await sanity.fetch<PublicComment[]>(`*[_type == "blogComment" && approved == true && post->slug.current == $slug] | order(submittedAt asc){_id, name, message, submittedAt}`, { slug })
      return res.status(200).json({ comments })
    } catch {
      return res.status(503).json({ error: 'Comments are temporarily unavailable.' })
    }
  }

  const { name, message, website } = req.body || {}
  // Quietly accept the common hidden-field bot trap without storing a comment.
  if (typeof website === 'string' && website.trim()) return res.status(201).json({ ok: true })
  if (typeof name !== 'string' || typeof message !== 'string') return res.status(400).json({ error: 'Enter your name and a comment.' })
  const cleanName = name.trim().slice(0, 80)
  const cleanMessage = message.trim()
  if (!cleanName || cleanMessage.length < 2 || cleanMessage.length > 4000) return res.status(400).json({ error: 'Names must be under 80 characters and comments between 2 and 4,000 characters.' })

  const sanity = client(true)
  if (!sanity) return res.status(503).json({ error: 'Commenting is not configured. Please try again later.' })
  try {
    const [post] = await sanity.fetch<{ _id: string }[]>(`*[_type == "blogPost" && slug.current == $slug][0...1]{_id}`, { slug })
    if (!post) return res.status(404).json({ error: 'That post could not be found.' })
    await sanity.create({ _type: 'blogComment', post: { _type: 'reference', _ref: post._id }, name: cleanName, message: cleanMessage, submittedAt: new Date().toISOString(), approved: false })
    return res.status(201).json({ ok: true })
  } catch {
    return res.status(503).json({ error: 'Your comment could not be submitted right now.' })
  }
}
