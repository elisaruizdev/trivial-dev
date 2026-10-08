import { Linking, Pressable, StyleSheet, Text } from 'react-native'
import { colors } from './theme.ts'

export function SourceLink({ url }: { url: string | null }) {
  if (!url?.startsWith('https://')) return null
  let host = url
  try {
    host = new URL(url).host.replace(/^www\./, '')
  } catch {
    return null
  }
  return (
    <Pressable accessibilityRole="link" onPress={() => void Linking.openURL(url)}>
      <Text style={styles.link}>Consultar en {host}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  link: {
    color: colors.navy,
    fontWeight: '700',
    textDecorationLine: 'underline',
    textDecorationColor: colors.blue,
  },
})
