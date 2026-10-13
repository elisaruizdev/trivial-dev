import { describe, expect, it } from 'vitest'
import { ONBOARDING_PREF_KEY } from '../application/onboarding-preference.ts'
import { BrowserOnboardingPreferenceStore } from './browser-onboarding-preference-store.ts'

describe('BrowserOnboardingPreferenceStore', () => {
  it('recuerda si el usuario no quiere ver la intro otra vez', async () => {
    const storage = new Map<string, string>()
    const store = new BrowserOnboardingPreferenceStore({
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key),
    })

    expect(await store.load()).toBe(false)
    await store.save(true)
    expect(storage.get(ONBOARDING_PREF_KEY)).toBe('1')
    expect(await store.load()).toBe(true)
    await store.save(false)
    expect(await store.load()).toBe(false)
  })
})
