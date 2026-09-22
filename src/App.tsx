import { useCallback, useState } from 'react'
import { SmoothScroll } from './components/SmoothScroll'
import { Nav } from './components/Nav'
import { Intro } from './components/ui/Intro'
import { Hero } from './sections/Hero'
import { Proof } from './sections/Proof'
import { Work } from './sections/Work'
import { Stack } from './sections/Stack'
import { Timeline } from './sections/Timeline'
import { SideProjects } from './sections/SideProjects'
import { Contact } from './sections/Contact'

export default function App() {
  // The hero holds its entrance until the intro panel has cleared.
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])

  return (
    <>
      <Intro onDone={onDone} />
      <SmoothScroll />
      <div className="paper-grid" aria-hidden />

      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-indigo focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to work
      </a>

      <Nav />

      <main className="relative z-10">
        <Hero start={ready} />
        <Proof />
        <Work />
        <Stack />
        <Timeline />
        <SideProjects />
      </main>

      <Contact />
    </>
  )
}
