import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  /** Optional looping clip. Falls back to `image` when absent. */
  video?: string
  image: string
  alt?: string
  className?: string
  /** Focal point for the crop, e.g. '55% 38%'. */
  objectPosition?: string
}

/**
 * A pill-shaped piece of media that sits inline inside a headline.
 *
 * Plays only while on screen: mobile browsers routinely refuse autoplay on load
 * but allow a programmatic play() once the element scrolls into view, and pausing
 * off-screen keeps a looping clip from burning battery for nothing.
 */
export function InlineMedia({ video, image, alt = '', className, objectPosition }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Some mobile browsers ignore JSX-only attributes until a user gesture.
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
      { rootMargin: '80px', threshold: 0.1 },
    )

    el.addEventListener('loadedmetadata', play)
    observer.observe(el)
    return () => {
      el.removeEventListener('loadedmetadata', play)
      observer.disconnect()
    }
  }, [video])

  const shell = cn(
    'relative inline-block shrink-0 overflow-hidden rounded-full align-middle',
    'bg-sunk ring-1 ring-line',
    className,
  )

  if (video) {
    return (
      <span className={shell}>
        <video
          ref={ref}
          src={video}
          poster={image}
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={alt}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      </span>
    )
  }

  return (
    <span className={shell}>
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="pill-drift h-full w-full object-cover"
        style={{ objectPosition }}
      />
    </span>
  )
}
