import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { scrollToEl } from '../lib/scroll'
import { work, profile, media, type CaseStudy } from '../data/content'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { StackChip } from '../components/StackChip'
import { TiltCard } from '../components/ui/TiltCard'
import { CountUp } from '../components/ui/CountUp'
import { InlineMedia } from '../components/ui/InlineMedia'
import { AuthPipeline } from '../components/diagrams/AuthPipeline'
import { MeetBot } from '../components/diagrams/MeetBot'

const EASE = [0.16, 1, 0.3, 1] as const

function Card({
  study,
  open,
  onToggle,
}: {
  study: CaseStudy
  open: boolean
  onToggle: () => void
}) {
  return (
    <TiltCard className="rounded-3xl">
      <div
        className={`flex h-full flex-col rounded-3xl border bg-card p-7 transition-[border-color,box-shadow] duration-300 sm:p-8 ${
          open
            ? 'border-indigo/40 shadow-[0_18px_50px_-24px_rgba(79,70,229,0.5)]'
            : 'border-line shadow-[0_2px_10px_-6px_rgba(20,20,26,0.15)]'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[15px] font-medium text-indigo">{study.index}</span>
          <span className="font-mono text-[14px] text-subtle">{study.year}</span>
        </div>

        <h3 className="mt-5 text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-bold tracking-[-0.03em] text-ink">
          {study.name}
        </h3>
        <p className="mt-2 text-[17px] font-medium text-indigo-deep">{study.tagline}</p>

        <p className="mt-5 text-[17px] leading-relaxed text-body">{study.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {study.stack.slice(0, 6).map((s) => (
            <li key={s}>
              <StackChip>{s}</StackChip>
            </li>
          ))}
          {study.stack.length > 6 && (
            <li>
              <StackChip tone="accent">{`+${study.stack.length - 6}`}</StackChip>
            </li>
          )}
        </ul>

        {/* impact strip */}
        <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-line-soft pt-6">
          {study.impact.slice(0, 2).map((m) => (
            <div key={m.label}>
              <dd className="font-mono text-2xl font-medium text-ink tabular-nums">
                <CountUp value={m.value} />
              </dd>
              <dt className="mt-1 text-[15px] leading-snug text-body">{m.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={`case-${study.id}`}
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-[16px] font-medium text-white transition-colors duration-300 hover:bg-indigo"
          >
            {open ? 'Hide case study' : 'Read case study'}
            <motion.span
              aria-hidden
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            >
              ↓
            </motion.span>
          </button>

          {study.href && (
            <a
              href={study.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[16px] font-medium text-ink transition-colors duration-300 hover:border-indigo hover:text-indigo"
            >
              {study.hrefLabel}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  )
}

function Detail({ study }: { study: CaseStudy }) {
  const reduced = useReducedMotion()

  const step = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay: 0.1 + i * 0.07, ease: EASE },
        }

  return (
    <div className="mx-auto max-w-[1400px] rounded-3xl border border-indigo/25 bg-glow/60 p-7 sm:p-10 lg:p-12">
      <motion.div className="flex flex-wrap items-baseline gap-x-4 gap-y-2" {...step(0)}>
        <h3 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] text-ink">
          {study.name}
        </h3>
        <span className="text-[17px] text-body">{study.tagline}</span>
      </motion.div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
        <motion.div {...step(1)}>
          <p className="label mb-4">The problem</p>
          <p className="text-[17px] leading-relaxed text-body">{study.problem}</p>

          <p className="label mt-10 mb-5">What it moved</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
            {study.impact.map((m) => (
              <div key={m.label}>
                <dd className="font-mono text-3xl font-medium text-indigo tabular-nums">
                  <CountUp value={m.value} />
                </dd>
                <dt className="mt-1.5 text-[15px] leading-snug text-body">{m.label}</dt>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div {...step(2)}>
          <p className="label mb-5">What I built</p>
          {/* two columns once there is room, so lines stay readable at full width */}
          <ul className="grid gap-7 xl:grid-cols-2 xl:gap-x-10">
            {study.built.map((item, i) => (
              <motion.li key={item.title} className="flex gap-5" {...step(i + 3)}>
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo/12 font-mono text-[13px] font-medium text-indigo-deep">
                  {i + 1}
                </span>
                <div>
                  <h4 className="text-[18px] font-bold text-ink">{item.title}</h4>
                  <p className="mt-2 text-[17px] leading-relaxed text-body">{item.detail}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {study.diagram && (
        <motion.div className="mt-12" {...step(7)}>
          <p className="label mb-4">How it fits together</p>
          <div className="overflow-hidden rounded-2xl border border-line bg-card p-4 sm:p-6">
            {study.diagram === 'auth-pipeline' ? <AuthPipeline /> : <MeetBot />}
          </div>
        </motion.div>
      )}

      <motion.div className="mt-10 flex flex-wrap gap-2" {...step(8)}>
        {study.stack.map((s) => (
          <StackChip key={s}>{s}</StackChip>
        ))}
      </motion.div>
    </div>
  )
}

export function Work() {
  const [openId, setOpenId] = useState<string | null>(null)
  const reduced = useReducedMotion()
  const openStudy = work.find((w) => w.id === openId) ?? null
  const detailRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Two-speed columns: the right-hand cards drift as the grid passes through.
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'end start'],
  })
  const rawDrift = useTransform(scrollYProgress, [0, 1], [34, -34])
  const smoothDrift = useSpring(rawDrift, { stiffness: 90, damping: 24, mass: 0.4 })
  const drift = reduced ? undefined : smoothDrift

  // Bring the opened case study into view. The panel sits below the grid, so its
  // top edge does not move as it expands — scrolling immediately is safe.
  useEffect(() => {
    if (!openId || !detailRef.current) return
    const el = detailRef.current
    const frame = requestAnimationFrame(() => scrollToEl(el))
    return () => cancelAnimationFrame(frame)
  }, [openId])

  return (
    <Section
      id="work"
      index="01"
      title="Selected work"
      intro={
        <>
          Four things I
          <InlineMedia
            video={media.workPill}
            image={profile.photoTall}
            alt=""
            objectPosition="55% 34%"
            className="mx-[0.16em] h-[0.66em] w-[1.35em] -translate-y-[0.04em]"
          />
          built, and what it took to build them.
        </>
      }
    >
      <div ref={gridRef} className="grid gap-6 md:grid-cols-2 md:gap-7">
        {work.map((study, i) => (
          <Reveal key={study.id} delay={i} className="h-full">
            {/* Right-hand column drifts at a different speed on scroll. */}
            <motion.div style={i % 2 === 1 ? { y: drift } : undefined} className="h-full">
              <Card
                study={study}
                open={openId === study.id}
                onToggle={() => setOpenId((cur) => (cur === study.id ? null : study.id))}
              />
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* One shared detail panel below the grid — keeps the layout calm.
          It breaks out of the section's max-width to run the full viewport
          width, keeping only the page gutter. */}
      <div ref={detailRef} className="relative left-1/2 -ml-[50vw] w-[100vw] scroll-mt-24">
        <AnimatePresence mode="wait" initial={false}>
          {openStudy && (
            <motion.div
              id={`case-${openStudy.id}`}
              key={openStudy.id}
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={reduced ? {} : { height: 'auto', opacity: 1 }}
              exit={reduced ? {} : { height: 0, opacity: 0 }}
              transition={{
                height: { type: 'spring', stiffness: 200, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="overflow-hidden"
            >
              <div className="px-5 pt-7 sm:px-8">
                <Detail study={openStudy} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}
