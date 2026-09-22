import { stackGroups, profile, media } from '../data/content'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { StackChip } from '../components/StackChip'
import { TiltCard } from '../components/ui/TiltCard'
import { InlineMedia } from '../components/ui/InlineMedia'

export function Stack() {
  return (
    <Section
      id="stack"
      index="02"
      title="Toolkit"
      intro={
        <>
          What I
          <InlineMedia
            video={media.toolkitPill}
            image={profile.photoTall}
            alt=""
            objectPosition="55% 34%"
            className="mx-[0.16em] h-[0.66em] w-[1.35em] -translate-y-[0.04em]"
          />
          work with, grouped by what it is actually for.
        </>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stackGroups.map((group, i) => (
          <Reveal key={group.title} delay={i} className="h-full">
            <TiltCard className="rounded-3xl" intensity={5}>
              <div className="h-full rounded-3xl border border-line bg-card p-7">
                <h3 className="text-[19px] font-bold tracking-[-0.01em] text-ink">{group.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <StackChip>{item}</StackChip>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
