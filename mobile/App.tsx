import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet } from 'react-native'
import { ServicesProvider } from '../src/ui/services-context.tsx'
import { InterviewProvider } from '../src/ui/interview-context.tsx'
import { useInterview } from '../src/ui/use-interview.ts'
import { createServices } from './src/create-services.ts'
import { InterviewScreen } from './src/interview-screen.tsx'
import { ResultScreen } from './src/result-screen.tsx'
import { SetupScreen } from './src/setup-screen.tsx'
import { colors } from './src/theme.ts'

const services = createServices()

export default function App() {
  return (
    <ServicesProvider services={services}>
      <InterviewProvider>
        <Root />
      </InterviewProvider>
    </ServicesProvider>
  )
}

function Root() {
  const { state } = useInterview()
  const paper = state.status === 'question' || state.status === 'feedback' || state.status === 'summary'
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: paper ? colors.paper : colors.bg }]}>
      <StatusBar style={paper ? 'dark' : 'light'} />
      {state.status === 'question' || state.status === 'feedback' ? <InterviewScreen /> : null}
      {state.status === 'summary' ? <ResultScreen /> : null}
      {state.status === 'question' || state.status === 'feedback' || state.status === 'summary' ? null : <SetupScreen />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
})
