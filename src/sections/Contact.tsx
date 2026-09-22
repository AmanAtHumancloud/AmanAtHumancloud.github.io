import { contact, profile } from '../data/content'
import { Reveal } from '../components/Reveal'
import { Magnetic } from '../components/Magnetic'
import { Aurora } from '../components/ui/Aurora'

const LINKS = [
  { label: 'GitHub', href: profile.links.github, handle: '@Amanzing01' },
  { label: 'LinkedIn', href: profile.links.linkedin, handle: '/in/amanzing2001' },
  { label: 'Résumé', href: profile.links.resume, handle: 'PDF · one page' },
]

export function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line bg-card">
      <Aurora className="opacity-70" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-36">
        <Reveal>
          <div className="mb-4 flex items-center gap-4">
            <span className="font-mono text-[15px] font-medium text-indigo">06</span>
            <span className="h-px w-12 bg-indigo/30" />
            <span className="label">Contact</span>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h2 className="max-w-[15ch] text-[clamp(2.5rem,8vw,5.5rem)] leading-[1] font-bold tracking-[-0.04em] text-ink text-balance">
            {contact.title}
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <p className="mt-8 max-w-[56ch] text-lead leading-[1.6] text-body">{contact.body}</p>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Magnetic
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-indigo px-8 py-5 text-[clamp(1.0625rem,2vw,1.375rem)] font-medium text-white shadow-[0_10px_30px_-10px_rgba(79,70,229,0.7)] transition-colors duration-300 hover:bg-indigo-deep"
            >
              {profile.email}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Magnetic>

            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-line bg-paper px-8 py-5 text-[17px] font-medium text-ink transition-colors duration-300 hover:border-indigo hover:text-indigo"
            >
              Message me on LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <ul className="mt-20 grid gap-4 sm:grid-cols-3">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-paper px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo/40 hover:shadow-[0_10px_30px_-16px_rgba(79,70,229,0.5)]"
                >
                  <span className="flex flex-col gap-1">
                    <span className="text-[18px] font-medium text-ink transition-colors duration-300 group-hover:text-indigo">
                      {link.label}
                    </span>
                    <span className="font-mono text-[14px] text-subtle">{link.handle}</span>
                  </span>
                  <span
                    aria-hidden
                    className="text-indigo transition-transform duration-300 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={5}>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            <p className="text-[16px] text-body">
              © {new Date().getFullYear()} {profile.name} — {profile.location}
            </p>
            <p className="text-[16px] text-body">Built with React, Vite and Tailwind.</p>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
