import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useScreenSpace() {
  const insets = useSafeAreaInsets()
  return {
    paddingTop: insets.top + 24,
    paddingBottom: insets.bottom + 40,
  }
}
