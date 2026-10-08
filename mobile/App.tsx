import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
import { ServicesProvider } from '../src/ui/services-context.tsx'
import { InterviewProvider } from '../src/ui/interview-context.tsx'
import { useInterview } from '../src/ui/use-interview.ts'
import { createServices } from './src/create-services.ts'
import { InterviewScreen } from './src/interview-screen.tsx'
import { OwnQuestionsScreen } from './src/own-questions-screen.tsx'
import { ResultScreen } from './src/result-screen.tsx'
import { SetupScreen } from './src/setup-screen.tsx'
import { colors } from './src/theme.ts'

const services = createServices()

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ServicesProvider services={services}>
        <InterviewProvider>
          <Root />
        </InterviewProvider>
      </ServicesProvider>
    </SafeAreaProvider>
  )
}

function Root() {
  const { state } = useInterview()
  const [library, setLibrary] = useState(false)
  const paper = state.status === 'question' || state.status === 'feedback' || state.status === 'summary'
  const atHome = !paper
  return (
    <View style={[styles.root, { backgroundColor: paper ? colors.paper : colors.bg }]}>
      <StatusBar style={paper ? 'dark' : 'light'} />
      {state.status === 'question' || state.status === 'feedback' ? <InterviewScreen /> : null}
      {state.status === 'summary' ? <ResultScreen /> : null}
      {atHome && library ? <OwnQuestionsScreen onClose={() => setLibrary(false)} /> : null}
      {atHome && !library ? <SetupScreen onOpenLibrary={() => setLibrary(true)} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
})
