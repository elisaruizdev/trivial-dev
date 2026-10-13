import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { CodePracticeScreen } from './screens/code-practice-screen.tsx'
import { InterviewScreen } from './screens/interview-screen.tsx'
import { OwnQuestionsScreen } from './screens/own-questions-screen.tsx'
import { ResultScreen } from './screens/result-screen.tsx'
import { SetupScreen } from './screens/setup-screen.tsx'

const linkedin = 'https://www.linkedin.com/in/elisaruizortega/'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<SetupScreen />} />
          <Route path="/mis-preguntas" element={<OwnQuestionsScreen />} />
          <Route path="/escribir" element={<CodePracticeScreen />} />
          <Route path="/entrevista" element={<InterviewScreen />} />
          <Route path="/resultado" element={<ResultScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function Shell() {
  return (
    <div className="app-shell">
      <Outlet />
      <footer className="site-footer">
        <p>
          Creado por{' '}
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            Elisa Ruiz
          </a>{' '}
          ❤️ 2026
        </p>
      </footer>
    </div>
  )
}
