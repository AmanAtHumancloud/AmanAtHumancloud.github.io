import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'

/**
 * A drifting indigo/violet colour field that also leans toward the cursor.
 * Aceternity-style "aurora background", tuned for a light page.
 */
export function Aurora({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let raf = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    function onMove(e: MouseEvent) {
      tx = (e.clientX / window.innerWidth - 0.5) * 44
      ty = (e.clientY / window.innerHeight - 0.5) * 30
    }

    function tick() {
      cx += (tx - cx) * 0.045
      cy += (ty - cy) * 0.045
      if (el) el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div ref={ref} className="absolute inset-[-20%] will-change-transform">
        <span
          className="aurora-blob h-[42rem] w-[42rem] bg-indigo/22 top-[-12rem] left-[-6rem]"
          style={{ animationDelay: '0s' }}
        />
        <span
          className="aurora-blob h-[36rem] w-[36rem] bg-violet/18 top-[-4rem] right-[-4rem]"
          style={{ animationDelay: '-7s' }}
        />
        <span
          className="aurora-blob h-[30rem] w-[30rem] bg-[#38bdf8]/14 top-[14rem] left-[32%]"
          style={{ animationDelay: '-14s' }}
        />
      </div>

      {/* fade the field into the page so it never fights the text */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/55 to-paper" />
    </div>
  )
}
