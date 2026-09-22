import { useSyncExternalStore } from 'react'

/**
 * Subscribes to a media query. Uses useSyncExternalStore so the first render
 * already has the right answer — no flash of the wrong layout.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false, // server / prerender default
  )
}

/** True on devices whose primary input is a mouse or trackpad. */
export function useFinePointer() {
  return useMediaQuery('(pointer: fine)')
}

/** Tailwind's `md` breakpoint. */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 48rem)')
}
