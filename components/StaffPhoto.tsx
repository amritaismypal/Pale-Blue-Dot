import Image from 'next/image'
import fs from 'node:fs'
import path from 'node:path'
import { sanityImage } from '../lib/sanity.image'
import type { ImageData } from '../types/content'
export function localStaffPhoto(slug?: string) { if (!slug) return undefined; const file = `${slug}.jpg`; return fs.existsSync(path.join(process.cwd(), 'public/images/staff', file)) ? `/images/staff/${file}` : undefined }
export default function StaffPhoto({ name, slug, photo, localPhoto }: { name: string; slug?: string; photo?: ImageData; localPhoto?: string }) {
  const src = sanityImage(photo, 480) || localPhoto || localStaffPhoto(slug)
  if (src) return <Image className="staff-photo" src={src} alt={photo?.alt || `${name}`} width={480} height={480} sizes="(max-width: 700px) 70vw, 240px" />
  const initials = name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()
  return <div className="staff-avatar" role="img" aria-label={`${name} initials`}><span>{initials}</span></div>
}
