import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  src: string
  className?: string
  poster?: string
}

/**
 * A silent looping clip used as decoration.
 *
 * Plays only while on screen. Mobile browsers routinely block autoplay on load but
 * allow a programmatic play() once the element is visible, and pausing off-screen
 * stops a loop decoding frames nobody is looking at. Under reduced motion it stays
 * on its first frame.
 */
export function AmbientVideo({ src, className, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.muted = true
    el.setAttribute('muted', 'true')
    el.setAttribute('playsinline', 'true')
    el.setAttribute('webkit-playsinline', 'true')

    const play = () => void el.play()?.catch(() => {})

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) play()
          else el.pause()
        }
      },
      { rootMargin: '120px', threshold: 0.1 },
    )

    el.addEventListener('loadedmetadata', play)
    observer.observe(el)
    return () => {
      el.removeEventListener('loadedmetadata', play)
      observer.disconnect()
    }
  }, [src])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      controls={false}
      // Only fetch the clip when it is actually near the viewport.
      preload="none"
      aria-hidden
      className={cn('object-cover', className)}
    />
  )
}
