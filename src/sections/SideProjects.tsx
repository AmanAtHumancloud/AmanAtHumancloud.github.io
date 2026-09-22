import { sideProjects, about, profile, media } from '../data/content'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { StackChip } from '../components/StackChip'
import { TiltCard } from '../components/ui/TiltCard'
import { AmbientVideo } from '../components/ui/AmbientVideo'

export function SideProjects() {
  return (
    <>
      {/* about */}
      <Section id="about" index="04" title="About" intro={about.title}>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <div className="mb-10 overflow-hidden rounded-3xl border border-line bg-sunk">
              <AmbientVideo src={media.about} className="aspect-video w-full" />
            </div>

            <div className="flex flex-col gap-6">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-[60ch] text-lead leading-[1.6] text-body">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={1}>
            <TiltCard className="rounded-3xl" intensity={5}>
              <div className="overflow-hidden rounded-3xl border border-line bg-card">
                <div className="relative aspect-4/5 w-full overflow-hidden bg-sunk">
                  <img
                    src={profile.photoTall}
                    alt={profile.name}
                    width={900}
                    height={1125}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  {/* name plate over the foot of the photo */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-6 pt-14">
                    <p className="text-[21px] font-bold text-white">{profile.name}</p>
                    <p className="mt-0.5 text-[16px] text-white/80">{profile.role}</p>
                  </div>
                </div>

                <dl className="flex flex-col gap-4 p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[16px] text-body">Based in</dt>
                    <dd className="text-[16px] font-medium text-ink">{profile.location}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[16px] text-body">Degree</dt>
                    <dd className="text-[16px] font-medium text-ink">B.E. Computer Engg.</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[16px] text-body">CGPA</dt>
                    <dd className="text-[16px] font-medium text-ink">8.7 / 10</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[16px] text-body">Languages</dt>
                    <dd className="text-[16px] font-medium text-ink">English, Hindi</dd>
                  </div>
                </dl>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </Section>

      {/* side projects */}
      <Section
        id="more"
        index="05"
        title="Also built"
        intro="Smaller projects, internships and the odd piece of hardware."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {sideProjects.map((project, i) => (
            <Reveal key={project.name} delay={i} className="h-full">
              <TiltCard className="rounded-3xl" intensity={6}>
                <div className="flex h-full flex-col rounded-3xl border border-line bg-card p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[21px] font-bold tracking-[-0.02em] text-ink">
                      {project.name}
                    </h3>
                    <span className="font-mono text-[14px] text-subtle">{project.year}</span>
                  </div>

                  <p className="mt-4 flex-1 text-[17px] leading-relaxed text-body">{project.body}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li key={s}>
                        <StackChip>{s}</StackChip>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
