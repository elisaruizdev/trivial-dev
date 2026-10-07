import type { ReactNode } from 'react'
import type { Services } from '../application/ports.ts'
import { ServicesContext } from './use-services.ts'

export function ServicesProvider({ services, children }: { services: Services; children: ReactNode }) {
  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>
}
