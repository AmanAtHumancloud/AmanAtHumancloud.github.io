import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '../../data/content'

/**
 * First-visit intro: a counter races to 100, then the panel wipes upward
 * and hands off to the hero. Skipped for reduced motion.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)
  // Decided during render so reduced-motion visitors never see the panel at all.
  const [gone, setGone] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (reduced || gone) {
      onDone()
      return
    }

    const total = 1250
    const start = performance.now()
    let raf = 0

    function tick(now: number) {
      const t = Math.min((now - start) / total, 1)
      // ease-out so it sprints then settles
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setGone(true)
          onDone()
        }, 260)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, gone, onDone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-paper px-6 py-8 sm:px-12 sm:py-12"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-indigo" />
            <span className="font-mono text-sm tracking-[0.12em] text-subtle uppercase">
              {profile.handle}
            </span>
          </div>

          <div className="flex items-end justify-between gap-8">
            <motion.p
              className="max-w-[16ch] text-[clamp(2rem,6vw,4rem)] leading-[1.02] font-bold tracking-[-0.03em] text-ink"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {profile.name}
            </motion.p>
            <p className="font-mono text-[clamp(2.5rem,9vw,6rem)] leading-none font-medium tabular-nums text-indigo">
              {count}
            </p>
          </div>

          {/* progress rule */}
          <div className="h-[2px] w-full overflow-hidden bg-line">
            <motion.div
              className="h-full bg-indigo"
              style={{ width: `${count}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
