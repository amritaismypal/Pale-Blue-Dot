import { useEffect, useState } from 'react'
export interface HeadingItem { id: string; text: string; level: number }
export default function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  const [active, setActive] = useState('')
  useEffect(() => { if (!('IntersectionObserver' in window)) return; const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top)[0]; if (visible) setActive(visible.target.id) }, { rootMargin: '-15% 0px -75% 0px' }); headings.forEach(({id}) => { const el=document.getElementById(id); if(el) observer.observe(el) }); return () => observer.disconnect() }, [headings])
  if (!headings.length) return null
  return <details className="toc" open><summary>On this page</summary><nav aria-label="Table of contents"><ol>{headings.map((heading) => <li key={heading.id} className={`toc-level-${heading.level}`}><a className={active === heading.id ? 'active' : ''} href={`#${heading.id}`}>{heading.text}</a></li>)}</ol></nav></details>
}
