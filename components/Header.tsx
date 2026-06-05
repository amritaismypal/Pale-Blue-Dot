import Link from 'next/link'

export default function Header(){
  return (
    <header className="site-header fixed w-full z-30">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-pale-blue rounded-full flex items-center justify-center text-deep-blue font-semibold">PBD</div>
          <Link href="/" className="font-display text-lg text-off-white">Pale Blue Dot</Link>
        </div>

        <nav className="main-nav hidden md:flex items-center gap-6 text-sm">
          <Link href="/journal" className="nav-link">Journal</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/staff" className="nav-link">Staff</Link>
          <Link href="/submissions" className="nav-link">Submissions</Link>
        </nav>
      </div>
    </header>
  )
}
