import { motion, useReducedMotion } from 'motion/react'

const LAYERS = [
  { n: '1', name: 'Rate limit', note: 'per IP + per tenant' },
  { n: '2', name: 'JWT / SSO', note: 'RS256 vs JWKS' },
  { n: '3', name: 'Tenant resolve', note: 'org scoping' },
  { n: '4', name: 'License check', note: 'seat + plan' },
  { n: '5', name: 'Permissions', note: '7 roles, granular' },
  { n: '6', name: 'Feature gate', note: 'module flags' },
]

const W = 1120
const H = 260
const BOX_W = 134
const BOX_H = 72
const GAP = 16
const START_X = 76
const Y = 96

/**
 * The six-layer authorization pipeline in Acai HIRE.
 * Strokes draw on when the diagram enters view.
 */
export function AuthPipeline() {
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

  return (
    <figure className="my-2 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full min-w-[860px]"
        role="img"
        aria-label="Request flow through six authorization layers: rate limit, JWT and SSO verification, tenant resolution, license check, permission check, feature gate — then the controller and database."
      >
        <defs>
          <marker id="ap-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#9ca3af" />
          </marker>
        </defs>

        {/* incoming request */}
        <motion.text
          x="8"
          y={Y + BOX_H / 2 - 6}
          className="fill-subtle font-mono"
          fontSize="13"
          {...fade(0)}
        >
          request
        </motion.text>
        <motion.text
          x="8"
          y={Y + BOX_H / 2 + 10}
          className="fill-subtle font-mono"
          fontSize="13"
          {...fade(0.05)}
        >
          in →
        </motion.text>

        {LAYERS.map((layer, i) => {
          const x = START_X + i * (BOX_W + GAP)
          const d = 0.1 + i * 0.09
          return (
            <g key={layer.n}>
              <motion.rect
                x={x}
                y={Y}
                width={BOX_W}
                height={BOX_H}
                rx="8"
                fill="#ffffff"
                stroke="#e7e3dc"
                strokeWidth="1"
                {...fade(d)}
              />
              <motion.text
                x={x + 10}
                y={Y + 20}
                className="fill-indigo font-mono"
                fontSize="14"
                {...fade(d + 0.04)}
              >
                {layer.n}
              </motion.text>
              <motion.text
                x={x + 10}
                y={Y + 40}
                className="fill-ink"
                fontSize="14"
                fontWeight="500"
                {...fade(d + 0.04)}
              >
                {layer.name}
              </motion.text>
              <motion.text
                x={x + 10}
                y={Y + 56}
                className="fill-subtle font-mono"
                fontSize="13"
                {...fade(d + 0.06)}
              >
                {layer.note}
              </motion.text>

              {/* connector to the next box */}
              {i < LAYERS.length - 1 && (
                <motion.line
                  x1={x + BOX_W}
                  y1={Y + BOX_H / 2}
                  x2={x + BOX_W + GAP - 2}
                  y2={Y + BOX_H / 2}
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  markerEnd="url(#ap-arrow)"
                  {...draw(d + 0.08)}
                />
              )}

              {/* reject path */}
              <motion.line
                x1={x + BOX_W / 2}
                y1={Y + BOX_H}
                x2={x + BOX_W / 2}
                y2={Y + BOX_H + 34}
                stroke="#9ca3af"
                strokeWidth="1"
                strokeDasharray="3 3"
                {...draw(d + 0.12)}
              />
              <motion.text
                x={x + BOX_W / 2}
                y={Y + BOX_H + 48}
                textAnchor="middle"
                className="fill-subtle font-mono"
                fontSize="13"
                {...fade(d + 0.16)}
              >
                403
              </motion.text>
            </g>
          )
        })}

        {/* controller + db */}
        <motion.line
          x1={START_X + LAYERS.length * (BOX_W + GAP) - GAP}
          y1={Y + BOX_H / 2}
          x2={START_X + LAYERS.length * (BOX_W + GAP) + 2}
          y2={Y + BOX_H / 2}
          stroke="#4f46e5"
          strokeWidth="1.5"
          markerEnd="url(#ap-arrow)"
          {...draw(0.72)}
        />
        <motion.text
          x={START_X + LAYERS.length * (BOX_W + GAP) + 10}
          y={Y + BOX_H / 2 - 4}
          className="fill-indigo font-mono"
          fontSize="13"
          {...fade(0.78)}
        >
          controller
        </motion.text>
        <motion.text
          x={START_X + LAYERS.length * (BOX_W + GAP) + 10}
          y={Y + BOX_H / 2 + 12}
          className="fill-subtle font-mono"
          fontSize="13"
          {...fade(0.82)}
        >
          → postgres
        </motion.text>

        {/* caption rule */}
        <motion.line
          x1="8"
          y1={Y - 28}
          x2={W - 8}
          y2={Y - 28}
          stroke="#e7e3dc"
          strokeWidth="1"
          {...draw(0)}
        />
        <motion.text x="8" y={Y - 38} className="fill-subtle font-mono" fontSize="14" {...fade(0)}>
          AUTHORIZATION PIPELINE — every request, every route
        </motion.text>
      </svg>
    </figure>
  )
}
