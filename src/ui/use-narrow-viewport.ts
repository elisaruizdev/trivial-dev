import { useEffect, useState } from 'react'

const QUERY = '(max-width: 800px)'

function canMatchMedia() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
}

export function useNarrowViewport() {
  const [narrow, setNarrow] = useState(() => (canMatchMedia() ? window.matchMedia(QUERY).matches : false))

  useEffect(() => {
    if (!canMatchMedia()) return
    const media = window.matchMedia(QUERY)
    const onChange = () => setNarrow(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return narrow
}
