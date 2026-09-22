import { AnimatePresence, motion, useMotionValueEvent, useScroll, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '../data/content'

const ITEMS = [
  { href: '#work', label: 'Work' },
  { href: '#stack', label: 'Toolkit' },
  { href: '#path', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const EASE = [0.16, 1, 0.3, 1] as const

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 48))

  // Escape closes the sheet. Deliberately no body scroll-lock: the sheet is a
  // dropdown rather than a full-screen overlay, and locking would fight Lenis
  // on the same tick a link inside it tries to scroll.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-indigo"
        style={{ scaleX: scrollYProgress }}
      />

      <nav
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          solid || open
            ? 'border-b border-line bg-paper/85 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="#top" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-xl bg-ink font-mono text-[15px] font-bold text-white transition-colors duration-300 group-hover:bg-indigo"
            >
              A
            </span>
            <span className="text-[17px] font-medium text-ink">{profile.name}</span>
          </a>

          {/* desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {ITEMS.slice(0, 4).map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[16px] text-body transition-colors duration-300 hover:bg-sunk hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="ml-1">
              <a
                href="#contact"
                className="rounded-full bg-ink px-5 py-2.5 text-[16px] font-medium text-white transition-colors duration-300 hover:bg-indigo"
              >
                Get in touch
              </a>
            </li>
          </ul>

          {/* mobile toggle — 44px tap target */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-ink md:hidden"
          >
            <span className="relative block h-4 w-6">
              <motion.span
                className="absolute left-0 block h-[2px] w-6 rounded bg-current"
                animate={open ? { top: 7, rotate: 45 } : { top: 2, rotate: 0 }}
                transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
              />
              <motion.span
                className="absolute left-0 block h-[2px] w-6 rounded bg-current"
                animate={open ? { top: 7, rotate: -45 } : { top: 12, rotate: 0 }}
                transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
              />
            </span>
          </button>
        </div>

        {/* mobile sheet */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-nav"
              key="sheet"
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={reduced ? {} : { height: 'auto', opacity: 1 }}
              exit={reduced ? {} : { height: 0, opacity: 0 }}
              transition={{
                height: { type: 'spring', stiffness: 240, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="overflow-hidden border-t border-line md:hidden"
            >
              <ul className="mx-auto max-w-6xl px-5 py-3">
                {ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, x: -10 }}
                    animate={reduced ? {} : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.04 * i, ease: EASE }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-line-soft py-4 text-[19px] font-medium text-ink last:border-b-0"
                    >
                      {item.label}
                      <span aria-hidden className="text-indigo">
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
