import { proof } from '../data/content'
import { Reveal } from '../components/Reveal'
import { CountUp } from '../components/ui/CountUp'

export function Proof() {
  return (
    <section aria-label="At a glance" className="relative z-10 border-y border-line bg-card">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <dl className="grid grid-cols-4 gap-x-2.5 py-10 sm:gap-x-8 md:py-14">
          {proof.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i}
              className="border-l border-line pl-2.5 first:border-l-0 first:pl-0 sm:pl-8 sm:first:pl-0"
            >
              <dd className="font-mono text-[clamp(1.375rem,5vw,3.75rem)] leading-none font-medium tracking-[-0.04em] text-indigo tabular-nums sm:tracking-[-0.03em]">
                <CountUp value={stat.value} />
              </dd>
              <dt className="mt-2.5 text-[13px] leading-[1.3] text-body text-pretty hyphens-auto sm:mt-3 sm:text-[clamp(0.875rem,1.4vw,1rem)] sm:leading-snug">
                <span className="sm:hidden">{stat.short}</span>
                <span className="hidden sm:inline">{stat.label}</span>
              </dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
