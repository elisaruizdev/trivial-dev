import type { OnboardingPreferenceStore } from '../application/onboarding-preference.ts'
import { ONBOARDING_PREF_KEY } from '../application/onboarding-preference.ts'

export class BrowserOnboardingPreferenceStore implements OnboardingPreferenceStore {
  private readonly storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

  constructor(storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = localStorage) {
    this.storage = storage
  }

  async load(): Promise<boolean> {
    return this.storage.getItem(ONBOARDING_PREF_KEY) === '1'
  }

  async save(hideIntro: boolean): Promise<void> {
    if (hideIntro) this.storage.setItem(ONBOARDING_PREF_KEY, '1')
    else this.storage.removeItem(ONBOARDING_PREF_KEY)
  }
}

export const browserOnboardingPreference = new BrowserOnboardingPreferenceStore()
