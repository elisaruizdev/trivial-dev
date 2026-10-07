import { createContext, useContext } from 'react'
import type { Services } from '../application/ports.ts'

export const ServicesContext = createContext<Services | null>(null)

export function useServices(): Services {
  const services = useContext(ServicesContext)
  if (!services) {
    throw new Error('useServices tiene que vivir dentro de ServicesProvider')
  }
  return services
}
