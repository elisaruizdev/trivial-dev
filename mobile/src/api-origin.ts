import Constants from 'expo-constants'

export function apiOrigin(): string {
  const hostUri = Constants.expoGoConfig?.debuggerHost ?? Constants.expoConfig?.hostUri ?? ''
  const host = hostUri.split(':')[0]
  if (!host) return ''
  return `http://${host}:5173`
}
