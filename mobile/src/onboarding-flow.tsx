import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { onboardingSlides } from '../../src/domain/onboarding-slides.ts'
import { Credit } from './credit.tsx'
import { useScreenSpace } from './screen-space.ts'
import { colors } from './theme.ts'
import { WelcomeScreen } from './welcome-screen.tsx'

type Step = 'welcome' | number

export function OnboardingFlow({ onFinish }: { onFinish: (hideNextTime: boolean) => void }) {
  const [step, setStep] = useState<Step>('welcome')
  const [hideNextTime, setHideNextTime] = useState(false)
  const space = useScreenSpace()

  if (step === 'welcome') {
    return <WelcomeScreen onContinue={() => setStep(0)} />
  }

  const index = step
  const slide = onboardingSlides[index]
  const last = index === onboardingSlides.length - 1

  return (
    <View style={[styles.screen, space]}>
      <View style={styles.body}>
        <Text style={styles.progress}>
          {index + 1} / {onboardingSlides.length}
        </Text>
        <Text style={styles.title} accessibilityRole="header">
          {slide.title}
        </Text>
        <Text style={styles.bodyText}>{slide.body}</Text>
        {last ? (
          <Pressable
            style={styles.rememberRow}
            onPress={() => setHideNextTime((value) => !value)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: hideNextTime }}
          >
            <View style={[styles.checkbox, hideNextTime ? styles.checkboxOn : null]} />
            <Text style={styles.rememberText}>No volver a mostrar la bienvenida ni estas instrucciones</Text>
          </Pressable>
        ) : null}
      </View>
      <View style={styles.actions}>
        {index > 0 ? (
          <Pressable onPress={() => setStep(index - 1)} accessibilityRole="button">
            <Text style={styles.back}>Atrás</Text>
          </Pressable>
        ) : (
          <View />
        )}
        <Pressable
          style={styles.primary}
          onPress={() => {
            if (last) onFinish(hideNextTime)
            else setStep(index + 1)
          }}
          accessibilityRole="button"
        >
          <Text style={styles.primaryText}>{last ? 'Elegir tema y nivel' : 'Siguiente'}</Text>
        </Pressable>
      </View>
      <Credit />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  body: { flex: 1, justifyContent: 'center', gap: 12 },
  progress: { color: colors.yellow, fontSize: 12, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  title: { color: colors.paper, fontSize: 28, fontWeight: '800', lineHeight: 36 },
  bodyText: { color: colors.paper, fontSize: 16, lineHeight: 24 },
  rememberRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginTop: 8 },
  checkbox: {
    marginTop: 2,
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.yellow,
    backgroundColor: 'transparent',
  },
  checkboxOn: { backgroundColor: colors.yellow },
  rememberText: { flex: 1, color: colors.paper, fontSize: 14, lineHeight: 20 },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 12,
  },
  back: { color: colors.yellow, fontWeight: '700', fontSize: 16 },
  primary: {
    flexShrink: 1,
    backgroundColor: colors.yellow,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.navy,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  primaryText: { color: colors.navy, fontWeight: '700', fontSize: 16 },
})
