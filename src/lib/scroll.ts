import type Lenis from 'lenis'

/**
 * Lenis owns the scroll position, so programmatic scrolling has to go through it.
 * SmoothScroll registers the instance here; anyone can then scroll without
 * threading the instance through props.
 */
let instance: Lenis | null = null

export function setLenis(next: Lenis | null) {
  instance = next
}

/** Scrolls an element to just below the fixed nav. */
export function scrollToEl(el: HTMLElement, offset = -88) {
  if (instance) {
    instance.scrollTo(el, { offset })
    return
  }
  // Reduced motion, or Lenis not running: fall back to the platform.
  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: 'auto' })
}
