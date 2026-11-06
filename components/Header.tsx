import Link from 'next/link'
import { useState } from 'react'

const links = [['Journal', '/journal'], ['Blog', '/blog'], ['Submit', '/submit'], ['Staff', '/staff'], ['About', '/about']]
export default function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><div className="header-inner">
    <Link href="/" className="brand"><span className="brand-dot">PBD</span><span>Pale Blue Dot</span></Link>
    <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
    <nav id="primary-navigation" aria-label="Main navigation" className={`main-nav ${open ? 'is-open' : ''}`}>
      {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
  </div></header>
}
