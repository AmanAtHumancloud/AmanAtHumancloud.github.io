import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Stagger position — multiplied by 60ms. */
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'span'
}

/**
 * 16px rise + fade, fires once at 20% in view.
 * Under prefers-reduced-motion it renders the content plainly.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: delay * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
