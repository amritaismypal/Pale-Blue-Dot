import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { sanityImage } from '../lib/sanity.image'
const components: PortableTextComponents = {
  block: { h2: ({ children, value }) => <h2 id={(value as any).id} className="body-h2">{children}</h2>, h3: ({ children, value }) => <h3 id={(value as any).id} className="body-h3">{children}</h3>, h4: ({ children, value }) => <h4 id={(value as any).id} className="body-h4">{children}</h4>, blockquote: ({ children }) => <blockquote>{children}</blockquote> },
  marks: { link: ({ children, value }) => <a href={value?.href} target={value?.href?.startsWith('http') ? '_blank' : undefined} rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</a> },
  types: { image: ({ value }) => { const src = sanityImage(value, 1200); return src ? <figure className="portable-image"><Image src={src} alt={value.alt || ''} width={1200} height={800} sizes="(max-width: 800px) 100vw, 70ch" /><figcaption>{value.caption}</figcaption></figure> : null } },
}
export default function PortableTextRenderer({ value }: { value?: unknown[] }) { return value?.length ? <div className="portable-text"><PortableText value={value as never} components={components} /></div> : null }
