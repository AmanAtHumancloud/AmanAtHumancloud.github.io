import { motion, useReducedMotion } from 'motion/react'
import { hero, profile, media } from '../data/content'
import { Aurora } from '../components/ui/Aurora'
import { Marquee } from '../components/ui/Marquee'
import { Magnetic } from '../components/Magnetic'
import { InlineMedia } from '../components/ui/InlineMedia'

const EASE = [0.16, 1, 0.3, 1] as const

function Name({ start }: { start: boolean }) {
  const reduced = useReducedMotion()
  const letters = hero.headline.split('')

  if (reduced) {
    return (
      <h1 className="text-[clamp(3.25rem,13vw,9rem)] leading-[0.92] font-bold tracking-[-0.045em] text-ink">
        {hero.headline}
      </h1>
    )
  }

  return (
    <h1
      className="flex flex-wrap text-[clamp(3.25rem,13vw,9rem)] leading-[0.92] font-bold tracking-[-0.045em] text-ink"
      aria-label={hero.headline}
    >
      {letters.map((ch, i) => (
        // The clipping box needs room for descenders (the 'g' in Singh) — pad the
        // bottom past the baseline, then pull the same amount back off the layout.
        <span key={i} className="-mb-[0.24em] overflow-hidden pb-[0.24em]" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: '105%' }}
            animate={start ? { y: 0 } : { y: '105%' }}
            transition={{ duration: 0.95, delay: i * 0.035, ease: EASE }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

export function Hero({ start }: { start: boolean }) {
  const show = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: start ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.8, delay, ease: EASE },
  })

  return (
    <header
      id="top"
      className="relative flex min-h-[94svh] flex-col justify-center overflow-hidden px-5 pt-32 pb-14 sm:px-8"
    >
      <Aurora />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* availability */}
        <motion.div className="mb-9 flex flex-wrap items-center gap-x-5 gap-y-3" {...show(0.1)}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-indigo/25 bg-glow px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo" />
            </span>
            <span className="text-[15px] font-medium text-indigo-deep">
              {profile.availableLabel}
            </span>
          </span>
          <span className="text-[15px] text-body">{profile.location}</span>
        </motion.div>

        <Name start={start} />

        {/* The statement line, with the pill of media trailing the sentence. */}
        <motion.p
          className="mt-8 max-w-[24ch] text-[clamp(1.6rem,5vw,3.25rem)] leading-[1.3] font-medium tracking-[-0.025em] text-ink"
          {...show(0.75)}
        >
          {hero.statement}
          <InlineMedia
            video={media.heroPill}
            image={profile.photoTall}
            alt={profile.name}
            objectPosition="55% 34%"
            className="ml-[0.3em] h-[1.25em] w-[2.4em] -translate-y-[0.08em]"
          />
        </motion.p>

        {/* rule + role */}
        <motion.div className="mt-10 flex items-center gap-5" {...show(0.9)}>
          <span className="h-px flex-1 bg-line" />
          <span className="label shrink-0">{hero.role}</span>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <motion.p
              className="max-w-[56ch] text-body-lg leading-relaxed text-body"
              {...show(0.95)}
            >
              {hero.subhead}
            </motion.p>

            <motion.p
              className="mt-5 max-w-[56ch] text-body-lg leading-relaxed text-body"
              {...show(1)}
            >
              {hero.body}
            </motion.p>

            <motion.div className="mt-10 flex flex-wrap items-center gap-4" {...show(1.05)}>
              <Magnetic
                href="#work"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-indigo px-7 py-4 text-[17px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(79,70,229,0.6)] transition-colors duration-300 hover:bg-indigo-deep"
              >
                <span className="relative z-10">View my work</span>
                <span
                  aria-hidden
                  className="relative z-10 transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/25 group-hover:[animation:shimmer-x_0.9s_ease-out]"
                />
              </Magnetic>

              <Magnetic
                href={profile.links.resume}
                external
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-7 py-4 text-[17px] font-medium text-ink transition-colors duration-300 hover:border-indigo hover:text-indigo"
              >
                Download résumé
                <span aria-hidden className="font-mono text-[13px] text-subtle">
                  PDF
                </span>
              </Magnetic>
            </motion.div>
          </div>

          {/* live products */}
          <motion.div {...show(1.15)}>
            <p className="text-[17px] font-medium text-ink">{hero.liveTitle}</p>
            <p className="mt-1 mb-4 text-[15px] text-body">{hero.liveNote}</p>
            <ul className="overflow-hidden rounded-2xl border border-line bg-card">
              {hero.ticker.map((item, i) => (
                <li key={item.id} className={i > 0 ? 'border-t border-line-soft' : ''}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-sunk"
                  >
                    <span className="text-[17px] font-medium text-ink transition-colors duration-300 group-hover:text-indigo">
                      {item.name}
                    </span>
                    <span className="ml-auto truncate text-[15px] text-body">{item.note}</span>
                    <span
                      aria-hidden
                      className="text-indigo transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* tech marquee */}
      <motion.div className="relative z-10 mt-16" {...show(1.3)}>
        <Marquee items={hero.marquee} duration={48} />
      </motion.div>
    </header>
  )
}
