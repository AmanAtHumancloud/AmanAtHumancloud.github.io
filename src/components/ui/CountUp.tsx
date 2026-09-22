import { useInView, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type Props = {
  /** e.g. "2,000+", "~40%", "28+", "3" — prefix/suffix are preserved. */
  value: string
  className?: string
}

/** Splits "~40%" into prefix "~", number 40, suffix "%". */
function parse(value: string) {
  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  const numeric = Number(digits.replace(/,/g, ''))
  if (!Number.isFinite(numeric)) return null
  return { prefix, suffix, numeric, grouped: digits.includes(',') }
}

/** Counts from zero to the value when it scrolls into view. */
export function CountUp({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const parsed = parse(value)

  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 60, damping: 18, mass: 0.8 })
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (inView && parsed) mv.set(parsed.numeric)
  }, [inView, mv, parsed])

  useEffect(() => spring.on('change', (v) => setShown(v)), [spring])

  if (!parsed || reduced) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  const rounded = Math.round(shown)
  const text = parsed.grouped ? rounded.toLocaleString('en-US') : String(rounded)

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>
        {parsed.prefix}
        {text}
        {parsed.suffix}
      </span>
    </span>
  )
}
