import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { SiteSettings } from '../types/content'
import { sanityImage } from '../lib/sanity.image'

const links = [['Journal', '/journal'], ['Blog', '/blog'], ['Submit', '/submit'], ['Staff', '/staff'], ['About', '/about']]
export default function Header({ settings }: { settings?: SiteSettings }) {
  const [open, setOpen] = useState(false)
  const logo = sanityImage(settings?.logo, 360)
  return <header className="site-header"><div className="header-inner">
    <Link href="/" className="brand">{logo ? <Image className="brand-logo" src={logo} alt={settings?.logo?.alt || 'Pale Blue Dot'} width={360} height={120} priority /> : <><span className="brand-dot">PBD</span><span>Pale Blue Dot</span></>}</Link>
    <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
    <nav id="primary-navigation" aria-label="Main navigation" className={`main-nav ${open ? 'is-open' : ''}`}>
      {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
  </div></header>
}
