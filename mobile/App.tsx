import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image, PixelRatio, StyleSheet, useWindowDimensions, View } from 'react-native'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
import { ServicesProvider } from '../src/ui/services-context.tsx'
import { InterviewProvider } from '../src/ui/interview-context.tsx'
import { useInterview } from '../src/ui/use-interview.ts'
import { createServices } from './src/create-services.ts'
import { CodePracticeScreen } from './src/code-practice-screen.tsx'
import { InterviewScreen } from './src/interview-screen.tsx'
import { OwnQuestionsScreen } from './src/own-questions-screen.tsx'
import { ResultScreen } from './src/result-screen.tsx'
import { PracticeReminders } from './src/practice-reminders.tsx'
import { useOnboardingGate } from '../src/ui/use-onboarding-gate.ts'
import { fileOnboardingPreference } from './src/file-onboarding-preference-store.ts'
import { OnboardingFlow } from './src/onboarding-flow.tsx'
import { SetupScreen } from './src/setup-screen.tsx'
import { colors } from './src/theme.ts'

const services = createServices()

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ServicesProvider services={services}>
        <InterviewProvider>
          <PracticeReminders />
          <Root />
        </InterviewProvider>
      </ServicesProvider>
    </SafeAreaProvider>
  )
}

function Root() {
  const { state } = useInterview()
  const [panel, setPanel] = useState<'home' | 'library' | 'code'>('home')
  const { loading: onboardingLoading, showIntro, finishIntro } = useOnboardingGate(fileOnboardingPreference, true)
  const paper = state.status === 'question' || state.status === 'feedback' || state.status === 'summary'
  const atHome = !paper
  return (
    <View style={[styles.root, { backgroundColor: paper ? colors.paper : colors.bg }]}>
      {paper ? null : <Chalkboard />}
      <StatusBar style={paper ? 'dark' : 'light'} />
      {state.status === 'question' || state.status === 'feedback' ? <InterviewScreen /> : null}
      {state.status === 'summary' ? <ResultScreen /> : null}
      {atHome && panel === 'library' ? <OwnQuestionsScreen onClose={() => setPanel('home')} /> : null}
      {atHome && panel === 'code' ? <CodePracticeScreen onClose={() => setPanel('home')} /> : null}
      {atHome && panel === 'home' && !onboardingLoading && showIntro ? (
        <OnboardingFlow onFinish={(hideNextTime) => void finishIntro(hideNextTime)} />
      ) : null}
      {atHome && panel === 'home' && !onboardingLoading && !showIntro ? (
        <SetupScreen onOpenLibrary={() => setPanel('library')} onOpenCode={() => setPanel('code')} />
      ) : null}
    </View>
  )
}

// resizeMode="repeat" tiles at the bitmap's pixel size on Android, so the tiles are laid out by hand
// in dp, at the same size as the web background (226px wide).
const chalkboard = require('./assets/chalkboard-bg.jpg')
const tileWidth = PixelRatio.roundToNearestPixel(226)
const tileHeight = PixelRatio.roundToNearestPixel((226 * 379) / 550)

function Chalkboard() {
  const { width, height } = useWindowDimensions()
  const columns = Math.ceil(width / tileWidth)
  const rows = Math.ceil(height / tileHeight) + 1
  const tiles = []
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      tiles.push(
        <Image
          key={`${row}-${column}`}
          source={chalkboard}
          resizeMode="stretch"
          style={{ position: 'absolute', left: column * tileWidth, top: row * tileHeight, width: tileWidth, height: tileHeight }}
        />,
      )
    }
  }
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.board]}>
      {tiles}
      <View style={[StyleSheet.absoluteFill, styles.veil]} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  board: { overflow: 'hidden' },
  veil: { backgroundColor: 'rgba(0, 48, 73, 0.7)' },
})
