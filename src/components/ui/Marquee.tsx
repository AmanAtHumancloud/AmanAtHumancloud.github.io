import { cn } from '../../lib/cn'

type Props = {
  items: readonly string[]
  /** Seconds for one full loop. */
  duration?: number
  reverse?: boolean
  className?: string
}

/** Infinite horizontal strip. The list is duplicated so the loop is seamless. */
export function Marquee({ items, duration = 42, reverse = false, className }: Props) {
  const doubled = [...items, ...items]

  return (
    <div className={cn('marquee-mask relative w-full overflow-hidden', className)}>
      <div
        className="marquee-track flex w-max gap-3"
        style={{
          ['--marquee-duration' as string]: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="rounded-full border border-line bg-card px-5 py-2.5 font-mono text-[15px] whitespace-nowrap text-body shadow-[0_1px_2px_rgba(20,20,26,0.04)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
