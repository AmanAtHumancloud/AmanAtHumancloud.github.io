import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { profile } from '../data/content'

const ITEMS = [
  { href: '#work', label: 'Work' },
  { href: '#stack', label: 'Toolkit' },
  { href: '#path', label: 'Experience' },
  { href: '#about', label: 'About' },
]

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const [solid, setSolid] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 48))

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-indigo"
        style={{ scaleX: scrollYProgress }}
      />

      <nav
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          solid
            ? 'border-b border-line bg-paper/85 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-xl bg-ink font-mono text-[15px] font-bold text-white transition-colors duration-300 group-hover:bg-indigo"
            >
              A
            </span>
            <span className="hidden text-[17px] font-medium text-ink sm:inline">{profile.name}</span>
          </a>

          <ul className="flex items-center gap-1">
            {ITEMS.map((item) => (
              <li key={item.href} className="hidden sm:block">
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
        </div>
      </nav>
    </>
  )
}
