import { File, Paths } from 'expo-file-system'
import type { OnboardingPreferenceStore } from '../../src/application/onboarding-preference.ts'

const filename = 'onboarding-preference.json'

export class FileOnboardingPreferenceStore implements OnboardingPreferenceStore {
  private open(): File {
    return new File(Paths.document, filename)
  }

  async load(): Promise<boolean> {
    const file = this.open()
    if (!file.exists) return false
    try {
      const parsed = JSON.parse(await file.text()) as { hideIntro?: boolean }
      return parsed.hideIntro === true
    } catch {
      return false
    }
  }

  async save(hideIntro: boolean): Promise<void> {
    const file = this.open()
    if (!file.exists) file.create()
    file.write(JSON.stringify({ hideIntro }))
  }
}

export const fileOnboardingPreference = new FileOnboardingPreferenceStore()
