import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '../lib/cn'

type Props = {
  id: string
  index: string
  title: string
  /** Large section heading. A node, so a pill of media can sit inside it. */
  intro?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, index, title, intro, children, className }: Props) {
  return (
    <section
      id={id}
      className={cn('relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-32', className)}
    >
      <Reveal>
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-[15px] font-medium text-indigo">{index}</span>
          <span className="h-px w-12 bg-indigo/30" />
          <span className="label">{title}</span>
        </div>
      </Reveal>

      {intro && (
        <Reveal delay={1}>
          <h2 className="mb-14 max-w-[22ch] text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-bold tracking-[-0.035em] text-ink text-balance">
            {intro}
          </h2>
        </Reveal>
      )}

      {children}
    </section>
  )
}
