import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { timeline } from '../data/content'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()

  // The spine fills as you scroll the list.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 55%'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 })

  return (
    <Section
      id="path"
      index="03"
      title="Experience"
      intro="Where I have worked, and what I did there."
    >
      <ol ref={ref} className="relative">
        {/* track */}
        <span aria-hidden className="absolute top-3 bottom-3 left-[7px] w-[2px] bg-line" />
        {/* fill */}
        <motion.span
          aria-hidden
          className="absolute top-3 left-[7px] w-[2px] origin-top bg-indigo"
          style={{
            height: reduced ? '100%' : undefined,
            scaleY: reduced ? 1 : fill,
            bottom: 12,
          }}
        />

        {timeline.map((entry, i) => (
          <li key={entry.id} className="relative pb-14 pl-10 last:pb-0 sm:pl-14">
            <Reveal delay={i}>
              <span
                aria-hidden
                className={`absolute top-2 left-0 h-4 w-4 rounded-full border-[3px] bg-paper ${
                  entry.current ? 'border-indigo' : 'border-line'
                }`}
              >
                {entry.current && (
                  <span className="absolute inset-0.5 rounded-full bg-indigo">
                    <span className="absolute inset-0 animate-ping rounded-full bg-indigo/50" />
                  </span>
                )}
              </span>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h3 className="text-[clamp(1.375rem,2.6vw,1.875rem)] font-bold tracking-[-0.025em] text-ink">
                  {entry.org}
                </h3>
                {entry.current && (
                  <span className="rounded-full bg-glow px-3 py-1 font-mono text-[13px] font-medium text-indigo-deep">
                    current
                  </span>
                )}
              </div>

              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[17px]">
                <span className="font-medium text-indigo-deep">{entry.role}</span>
                <span aria-hidden className="text-line">
                  /
                </span>
                <span className="text-body">{entry.period}</span>
                <span aria-hidden className="text-line">
                  /
                </span>
                <span className="text-body">{entry.place}</span>
              </p>

              <p className="mt-4 max-w-[70ch] text-[17px] leading-relaxed text-body">{entry.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
