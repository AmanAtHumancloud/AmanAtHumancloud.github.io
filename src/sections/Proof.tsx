import { proof } from '../data/content'
import { Reveal } from '../components/Reveal'
import { CountUp } from '../components/ui/CountUp'

export function Proof() {
  return (
    <section aria-label="At a glance" className="relative z-10 border-y border-line bg-card">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <dl className="grid grid-cols-4 gap-x-4 py-12 sm:gap-x-8 md:py-14">
          {proof.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i}
              className="border-l border-line pl-4 first:border-l-0 first:pl-0 sm:pl-8 sm:first:pl-0"
            >
              <dd className="font-mono text-[clamp(1.75rem,5vw,3.75rem)] leading-none font-medium tracking-[-0.03em] text-indigo tabular-nums">
                <CountUp value={stat.value} />
              </dd>
              <dt className="mt-3 text-[clamp(0.8125rem,1.4vw,1rem)] leading-snug text-body text-pretty">
                {stat.label}
              </dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
