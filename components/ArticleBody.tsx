import { useMemo } from 'react'
import PortableTextRenderer from './PortableTextRenderer'
import TableOfContents, { type HeadingItem } from './TableOfContents'
function slugify(text: string) { return text.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }
export default function ArticleBody({ value }: { value?: unknown[] }) {
  const headings = useMemo<HeadingItem[]>(() => (value || []).filter((block: any) => block?._type === 'block' && ['h2','h3','h4'].includes(block.style)).map((block: any) => { const text = (block.children || []).map((child: any) => child.text || '').join(''); return { text, id: slugify(text), level: Number(block.style.slice(1)) } }), [value])
  const withIds = useMemo(() => { let index = 0; return (value || []).map((block: any) => { if (block?._type === 'block' && ['h2','h3','h4'].includes(block.style)) { const heading = headings[index++]; return { ...block, _key: block._key || `heading-${index}`, id: heading?.id } } return block }) }, [value, headings])
  return <div className="article-reading-layout"><TableOfContents headings={headings} /><article className="article-body"><PortableTextRenderer value={withIds} /></article></div>
}
