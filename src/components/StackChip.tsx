import { cn } from '../lib/cn'

export function StackChip({ children, tone = 'default' }: { children: string; tone?: 'default' | 'accent' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3.5 py-1.5 font-mono text-[14px] leading-none whitespace-nowrap transition-colors duration-300',
        tone === 'accent'
          ? 'border-indigo/25 bg-glow text-indigo-deep'
          : 'border-line bg-card text-body hover:border-indigo/40 hover:text-indigo-deep',
      )}
    >
      {children}
    </span>
  )
}
