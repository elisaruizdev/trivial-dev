export const ONBOARDING_PREF_KEY = 'trivial-dev.hide-intro'

export interface OnboardingPreferenceStore {
  /** true = no volver a mostrar bienvenida ni instrucciones */
  load(): Promise<boolean>
  save(hideIntro: boolean): Promise<void>
}
