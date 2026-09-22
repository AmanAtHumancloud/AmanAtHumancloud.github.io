import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode, type MouseEvent } from 'react'

type Props = {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  /** Max pull in px. */
  strength?: number
  external?: boolean
  ariaLabel?: string
}

/**
 * Pulls its child a few px toward the cursor. Desktop pointers only —
 * a coarse pointer or reduced-motion gets a plain element.
 */
export function Magnetic({
  children,
  className,
  href,
  onClick,
  strength = 6,
  external,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const enabled =
    !reduced && typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  function handleMove(e: MouseEvent) {
    if (!enabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set((dx / (rect.width / 2)) * strength)
    y.set((dy / (rect.height / 2)) * strength)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  const motionProps = {
    style: enabled ? { x: sx, y: sy } : undefined,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className,
  }

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
