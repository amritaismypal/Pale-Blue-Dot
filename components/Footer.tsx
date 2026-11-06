import type { SiteSettings } from '../types/content'
import Link from 'next/link'
export default function Footer({ settings }: { settings?: SiteSettings }) {
  return <footer className="site-footer"><div className="container footer-inner">
    <div><Link href="/" className="footer-brand">Pale Blue Dot</Link><p>An interdisciplinary student journal publishing scholarship across borders.</p></div>
    <div><h2>Connect</h2>{settings?.contactEmail && <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>}
      <div className="social-links">{settings?.socialLinks?.map((social) => <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer">{social.label}</a>)}</div>
    </div><small>© {new Date().getFullYear()} Pale Blue Dot</small>
  </div></footer>
}
