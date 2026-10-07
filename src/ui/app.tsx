import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { InterviewScreen } from './screens/interview-screen.tsx'
import { ResultScreen } from './screens/result-screen.tsx'
import { SetupScreen } from './screens/setup-screen.tsx'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SetupScreen />} />
        <Route path="/entrevista" element={<InterviewScreen />} />
        <Route path="/resultado" element={<ResultScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
