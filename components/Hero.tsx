import { useEffect, useRef } from 'react'
export default function Hero({ aboutBlurb }: { aboutBlurb?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0, height = 0, frame = 0, tick = 0
    const resize = () => { const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height; const dpr = Math.min(window.devicePixelRatio || 1, 2); canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    resize(); window.addEventListener('resize', resize)
    const draw = () => { ctx.clearRect(0, 0, width, height); const cx = width * .5, cy = height * .39, maxR = Math.hypot(width, height); ctx.fillStyle = 'rgba(29,61,102,.13)'; for (let y=0; y<height; y+=30) for (let x=0; x<width; x+=30) { ctx.globalAlpha = .4 + .35*Math.sin(tick + x*.01 + y*.01); ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI*2); ctx.fill() }; ctx.globalAlpha = 1; for (let r=(tick*14)%92; r<maxR; r+=92) { ctx.globalAlpha = Math.max(0, .28*(1-r/maxR)); ctx.strokeStyle = '#5C9EDB'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke() }; ctx.globalAlpha = .8; ctx.fillStyle = '#5C9EDB'; ctx.shadowColor='#5C9EDB'; ctx.shadowBlur=14; ctx.beginPath(); ctx.arc(cx,cy,4,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0; ctx.globalAlpha=1; tick += .008; if (!motion.matches) frame = requestAnimationFrame(draw) }
    draw()
    const change = () => { cancelAnimationFrame(frame); draw() }; motion.addEventListener('change', change)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); motion.removeEventListener('change', change) }
  }, [])
  return <section className="hero-canvas-wrap"><canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" /><div className="hero-content"><div className="hero-inner"><p className="eyebrow hero-kicker">An interdisciplinary student journal</p><h1>PALE BLUE DOT</h1><p className="hero-tagline">Ideas travel farther when every voice has room.</p><p className="hero-mission">{aboutBlurb || 'A journal for student scholarship and ideas that cross borders, disciplines, and languages.'}</p></div></div><span className="scroll-indicator" aria-hidden="true">↓</span></section>
}
