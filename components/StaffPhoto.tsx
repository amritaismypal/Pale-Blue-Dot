import Image from 'next/image'
import { sanityImage } from '../lib/sanity.image'
import type { ImageData } from '../types/content'
export default function StaffPhoto({ name, slug, photo, localPhoto }: { name: string; slug?: string; photo?: ImageData; localPhoto?: string }) {
  const src = sanityImage(photo, 480) || localPhoto
  if (src) return <Image className="staff-photo" src={src} alt={photo?.alt || `${name}`} width={480} height={480} sizes="(max-width: 700px) 70vw, 240px" />
  const initials = name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()
  return <div className="staff-avatar" role="img" aria-label={`${name} initials`}><span>{initials}</span></div>
}
