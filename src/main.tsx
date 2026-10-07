import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createServices } from './infrastructure/create-services.ts'
import { App } from './ui/app.tsx'
import { InterviewProvider } from './ui/interview-context.tsx'
import { ServicesProvider } from './ui/services-context.tsx'
import './index.css'

const services = createServices()
const root = document.getElementById('root')
if (!root) throw new Error('No está el nodo root')

createRoot(root).render(
  <StrictMode>
    <ServicesProvider services={services}>
      <InterviewProvider>
        <App />
      </InterviewProvider>
    </ServicesProvider>
  </StrictMode>,
)
