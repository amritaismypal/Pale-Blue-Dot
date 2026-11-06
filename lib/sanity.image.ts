import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity.client'

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null
export function sanityImage(source: unknown, width = 1200) {
  if (!builder || !source) return undefined
  try { return builder.image(source as never).width(width).auto('format').url() } catch { return undefined }
}
