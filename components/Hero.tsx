import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = (globalThis as any).React?.useState?.(false) ?? [false, () => { }];
  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduced(mq.matches);
      const handler = () => setReduced(mq.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } catch (e) { }
  }, [])
  return reduced
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduced = false // usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let w = canvas.width = canvas.clientWidth;
    let h = canvas.height = canvas.clientHeight;

    const DPR = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = w * DPR; canvas.height = h * DPR; canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.scale(DPR, DPR);

    // configuration — tuned for pale background
    // const dotColor = 'rgba(6,17,31,0.06)'; // very faint dark dots for contrast on pale bg
    // const ringColor = 'rgba(29,61,102,0.08)';
    // const centerColor = 'rgba(92,158,219,0.95)';

  // configuration — three-shade scheme tuned for pale background
  // - dotColor: very faint mid-blue for background texture
  // - ringColor: deeper blue for ripple rings (full color, per-dot alpha set when drawing)
  // - centerColor: accent blue for the Pale Blue Dot
  const dotColor = 'rgba(29,61,102,0.06)'; // mid blue, very low opacity
  const ringColor = 'rgba(29,61,102,0.67)';  // deep blue, actual alpha set at draw time
  const centerColor = 'rgba(92,158,219,1)'; // accent blue (alpha managed when drawing)


    // center pale blue dot (normalized)
    const cx = w * 0.5;
    const cy = h * 0.4;

    let tick = 0;

    let rafId: number | null = null;
    let firstFrame = true;
    function draw() {
      // slightly increase tick for a gentle but noticeable motion
      tick += 0.002;
      if (!ctx) return;
      // Clear fully each frame to avoid trails
      ctx.clearRect(0, 0, w, h);

      // static faint dots grid (layer 1)
      ctx.fillStyle = dotColor;
      for (let y = 0; y < h; y += 28) {
        for (let x = 0; x < w; x += 28) {
          const j = (x + y) / 1000 + Math.sin(tick * 0.5 + x * 0.001);
          const alpha = 0.03 + 0.015 * Math.sin(j);
          ctx.globalAlpha = alpha;
          ctx.beginPath(); ctx.arc(x + ((y % 2 === 0) ? 6 : 0), y + ((x % 3 === 0) ? 4 : 0), 0.9, 0, Math.PI * 2); ctx.fill();
        }
      }

      // ripple rings (layer 2) — smoothly expanding rings
      ctx.globalAlpha = 1;
      const maxR = Math.hypot(w, h);
      const spacing = 90; // distance between rings
      const speed = 14;   // pixels per tick unit
      const base = (tick * speed) % spacing;

      // Fixed number of dots per ring prevents layout re-calculations and jumping
      const dotsPerRing = 80; 

      // Track where the ring should completely fade to 0 alpha
      const outerFadeStart = maxR * 0.6; 

      for (let r = base; r < maxR + spacing; r += spacing) {
        // 1. Calculate a unified phase for this specific ring based on its starting distance
        const ringId = Math.floor((tick * speed) / spacing) - Math.floor(r / spacing);
        const phase = ringId * 0.4 + tick * 0.8;
        
        // 2. Add organic noise solely to the radius, keeping the angular path locked
        const wobble = Math.sin(phase) * 6;
        const animatedR = r + wobble;

        // 3. Smooth alpha transitions for both birthing (inner) and dying (outer) boundaries
        const innerFade = Math.min(1, animatedR / 60); 
        const outerFade = Math.max(0, 1 - (animatedR - outerFadeStart) / (maxR - outerFadeStart));
        const ringAlpha = innerFade * outerFade;

        if (ringAlpha <= 0) continue;

        for (let i = 0; i < dotsPerRing; i++) {
          // Angular positions remain perfectly fixed relative to the dot's index
          const a = (i / dotsPerRing) * Math.PI * 2;
          
          // Smooth radial extension
          const px = cx + Math.cos(a) * animatedR;
          const py = cy + Math.sin(a) * animatedR;

          if (px < -10 || px > w + 10 || py < -10 || py > h + 10) continue;

          ctx.save();
          // Soft base alpha multiplied by the ring's overall boundary visibility lifecycle
          ctx.globalAlpha = 0.35 * ringAlpha; 
          ctx.fillStyle = ringColor;
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

  // central pale blue dot (layer 3) with a gentle glow
  // central pale blue dot (constant low-opacity anchor)
  ctx.save();
  ctx.beginPath(); ctx.fillStyle = centerColor; ctx.globalAlpha = 0.6;
  ctx.shadowColor = centerColor; ctx.shadowBlur = 8; ctx.arc(cx, cy, 3.6, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    const handleResize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * DPR; canvas.height = h * DPR; canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.scale(DPR, DPR);
    }
    window.addEventListener('resize', handleResize);
    return () => { if (rafId) cancelAnimationFrame(rafId); window.removeEventListener('resize', handleResize); }
  }, [canvasRef, reduced])

  return (
    <section className="hero-canvas-wrap" aria-hidden={false}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="hero-content">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="hero-inner">
          <h1 className="font-display text-5xl leading-tight">PALE BLUE DOT</h1>
          <p className="mt-4 text-xl text-muted-text">Interdisciplinary scholarship beyond borders.</p>
          <p className="mt-6 max-w-2xl mx-auto text-sm text-muted-text">An editorial journal centering student scholars and intellectuals outside the United States. First edition: Chile. We publish work in the author's original language and in English.</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a className="px-6 py-3 rounded bg-accent-blue text-deep-blue font-semibold shadow-md" href="/journal">Explore the Journal</a>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <a className="px-4 py-2 rounded border border-pale-blue text-pale-blue" href="/blog">Read the Blog</a>
          </div>

          <div className="scroll-indicator">
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              <rect x="1" y="1" width="22" height="38" rx="11" stroke="rgba(255,255,255,0.12)" />
              <circle cx="12" cy="10" r="3" fill="rgba(255,255,255,0.16)"></circle>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
