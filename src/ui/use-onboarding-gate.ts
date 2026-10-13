import { useEffect, useState } from 'react'
import type { OnboardingPreferenceStore } from '../application/onboarding-preference.ts'

type Phase = 'loading' | 'intro' | 'done'

export function useOnboardingGate(store: OnboardingPreferenceStore, enabled: boolean) {
  const [phase, setPhase] = useState<Phase>(() => (enabled ? 'loading' : 'done'))

  useEffect(() => {
    if (!enabled) {
      setPhase('done')
      return
    }
    let cancelled = false
    void store.load().then((hideIntro) => {
      if (!cancelled) setPhase(hideIntro ? 'done' : 'intro')
    })
    return () => {
      cancelled = true
    }
  }, [enabled, store])

  async function finishIntro(hideNextTime: boolean) {
    await store.save(hideNextTime)
    setPhase('done')
  }

  return {
    loading: phase === 'loading',
    showIntro: phase === 'intro',
    finishIntro,
  }
}
