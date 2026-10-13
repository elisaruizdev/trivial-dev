import { useState } from 'react'
import { onboardingSlides } from '../../domain/onboarding-slides.ts'
import { WelcomeScreen } from './welcome-screen.tsx'

type Step = 'welcome' | number

export function OnboardingFlow({ onFinish }: { onFinish: (hideNextTime: boolean) => void }) {
  const [step, setStep] = useState<Step>('welcome')
  const [hideNextTime, setHideNextTime] = useState(false)

  if (step === 'welcome') {
    return <WelcomeScreen onContinue={() => setStep(0)} />
  }

  const index = step
  const slide = onboardingSlides[index]
  const last = index === onboardingSlides.length - 1

  return (
    <main className="onboarding">
      <p className="onboarding-progress">
        {index + 1} / {onboardingSlides.length}
      </p>
      <h2 className="onboarding-title">{slide.title}</h2>
      <p className="onboarding-body">{slide.body}</p>
      {last ? (
        <label className="onboarding-remember">
          <input
            type="checkbox"
            checked={hideNextTime}
            onChange={(event) => setHideNextTime(event.target.checked)}
          />
          <span>No volver a mostrar la bienvenida ni estas instrucciones</span>
        </label>
      ) : null}
      <div className="onboarding-actions">
        {index > 0 ? (
          <button type="button" className="onboarding-back" onClick={() => setStep(index - 1)}>
            Atrás
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          className="primary"
          onClick={() => {
            if (last) onFinish(hideNextTime)
            else setStep(index + 1)
          }}
        >
          {last ? 'Elegir tema y nivel' : 'Siguiente'}
        </button>
      </div>
    </main>
  )
}
