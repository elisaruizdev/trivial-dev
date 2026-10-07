import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { interviewApi } from './server/interview-api.ts'

export default defineConfig({
  plugins: [react(), interviewApi()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
