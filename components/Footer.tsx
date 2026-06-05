export default function Footer(){
  return (
  <footer className="site-footer mt-24 border-t border-deep-blue/30">
      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-display text-off-white">Pale Blue Dot</h4>
            <p className="text-sm text-off-white max-w-md">An interdisciplinary journal centering student scholars and intellectuals outside the United States. First edition: Chile.</p>
          </div>
          <div>
            <h5 className="text-sm text-off-white font-semibold">Edition</h5>
            <ul className="text-off-white text-sm mt-2">
              <li>Chile — 2026</li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm text-off-white font-semibold">Contact</h5>
            <p className="text-off-white text-sm mt-2">editor@palebluedot.org</p>
            <div className="mt-4 flex gap-3">
              <a className="text-off-white">Twitter</a>
              <a className="text-off-white">Instagram</a>
            </div>
          </div>
        </div>
  <div className="mt-8 text-sm text-off-white">&copy; {new Date().getFullYear()} Pale Blue Dot — All rights reserved.</div>
      </div>
    </footer>
  )
}
