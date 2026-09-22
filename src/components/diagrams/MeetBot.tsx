import { motion, useReducedMotion } from 'motion/react'

const STAGES = [
  { name: 'Calendar hook', note: 'schedules a job' },
  { name: 'Puppeteer join', note: 'headless chromium' },
  { name: 'FFmpeg capture', note: 'live audio out' },
  { name: 'Whisper', note: 'self-hosted STT' },
  { name: 'Gemini Flash', note: 'structured summary' },
  { name: 'Inbox + dashboard', note: 'email Â· Next.js' },
]

const W = 1080
const H = 230
const BOX_W = 152
const BOX_H = 64
const GAP = 24
const START_X = 20
const Y = 74

export function MeetBot() {
  const reduced = useReducedMotion()

  const draw = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 6 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  const queueY = Y + BOX_H + 34

  return (
    <figure className="my-2 w-full">
      {/* Wider than a phone: give it its own scroller with a visible hint. */}
      <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1 pb-1">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full min-w-[860px]"
        role="img"
        aria-label="MeetBot pipeline: a calendar webhook schedules a job, Puppeteer joins the call, FFmpeg captures audio, self-hosted Whisper transcribes it, Gemini Flash summarises it, and the result lands in email and a dashboard. Every stage is a BullMQ job on Redis."
      >
        <defs>
          <marker id="mb-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#9ca3af" />
          </marker>
        </defs>

        <motion.line x1="8" y1={Y - 28} x2={W - 8} y2={Y - 28} stroke="#e7e3dc" strokeWidth="1" {...draw(0)} />
        <motion.text x="8" y={Y - 38} className="fill-subtle font-mono" fontSize="14" {...fade(0)}>
          ASYNC PIPELINE â each stage retries without redoing the last
        </motion.text>

        {STAGES.map((stage, i) => {
          const x = START_X + i * (BOX_W + GAP)
          const d = 0.08 + i * 0.09
          const isLocal = stage.name === 'Whisper'
          return (
            <g key={stage.name}>
              <motion.rect
                x={x}
                y={Y}
                width={BOX_W}
                height={BOX_H}
                rx="8"
                fill="#ffffff"
                stroke={isLocal ? '#4f46e5' : '#e7e3dc'}
                strokeWidth="1"
                {...fade(d)}
              />
              <motion.text
                x={x + 10}
                y={Y + 26}
                className={isLocal ? 'fill-indigo' : 'fill-ink'}
                fontSize="14"
                fontWeight="500"
                {...fade(d + 0.04)}
              >
                {stage.name}
              </motion.text>
              <motion.text
                x={x + 10}
                y={Y + 44}
                className="fill-subtle font-mono"
                fontSize="13"
                {...fade(d + 0.06)}
              >
                {stage.note}
              </motion.text>

              {i < STAGES.length - 1 && (
                <motion.line
                  x1={x + BOX_W}
                  y1={Y + BOX_H / 2}
                  x2={x + BOX_W + GAP - 2}
                  y2={Y + BOX_H / 2}
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  markerEnd="url(#mb-arrow)"
                  {...draw(d + 0.08)}
                />
              )}

              {/* tick down into the queue bar */}
              <motion.line
                x1={x + BOX_W / 2}
                y1={Y + BOX_H}
                x2={x + BOX_W / 2}
                y2={queueY}
                stroke="#e7e3dc"
                strokeWidth="1"
                strokeDasharray="2 4"
                {...draw(d + 0.14)}
              />
            </g>
          )
        })}

        {/* the queue everything runs on */}
        <motion.rect
          x={START_X}
          y={queueY}
          width={STAGES.length * (BOX_W + GAP) - GAP}
          height="34"
          rx="6"
          fill="#eef2ff"
          stroke="#e7e3dc"
          {...fade(0.62)}
        />
        <motion.text
          x={START_X + 14}
          y={queueY + 22}
          className="fill-body font-mono"
          fontSize="13"
          {...fade(0.68)}
        >
          BullMQ on Redis â scheduling, retries, backoff
        </motion.text>
      </svg>
      </div>
      <figcaption className="mt-2 text-[13px] text-subtle lg:hidden">
        Scroll the diagram sideways to follow the flow →
      </figcaption>
    </figure>
  )
}
