import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'motion/react'
import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  children: ReactNode
  className?: string
  /** Max rotation in degrees. */
  intensity?: number
}

/**
 * Aceternity-style 3D tilt card: rotates toward the cursor with a
 * spotlight sheen that follows it. Pointer-fine only.
 */
export function TiltCard({ children, className, intensity = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(false)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const config = { stiffness: 180, damping: 20, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), config)
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), config)

  // Sheen follows the pointer across the surface.
  const sheenX = useTransform(px, (v) => `${v * 100}%`)
  const sheenY = useTransform(py, (v) => `${v * 100}%`)
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${sheenX} ${sheenY}, rgba(79,70,229,0.10), transparent 62%)`

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function onLeave() {
    setActive(false)
    px.set(0.5)
    py.set(0.5)
  }

  if (reduced) {
    return <div className={cn('relative', className)}>{children}</div>
  }

  return (
    <div className="tilt-scene h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY }}
        animate={{ scale: active ? 1.015 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className={cn('tilt-layer relative h-full', className)}
      >
        {children}

        {/* sheen */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{ opacity: active ? 1 : 0, background: sheen }}
        />
      </motion.div>
    </div>
  )
}
