import Header from './Header'
import Footer from './Footer'
import type { SiteSettings } from '../types/content'

export default function Layout({ children, settings }: { children: React.ReactNode; settings?: SiteSettings }) {
  return <div className="site-shell"><a className="skip-link" href="#main-content">Skip to content</a><Header settings={settings} /><main id="main-content" className="main-content">{children}</main><Footer settings={settings} /></div>
}
