import { Linking, StyleSheet, Text, View } from 'react-native'
import { colors } from './theme.ts'

const linkedin = 'https://www.linkedin.com/in/elisaruizortega/'

export function Credit({ tone = 'light' }: { tone?: 'light' | 'ink' }) {
  const muted = tone === 'ink' ? colors.muted : colors.textSoft
  const name = tone === 'ink' ? colors.navy : colors.yellow

  return (
    <View style={styles.wrap}>
      <Text style={[styles.line, { color: muted }]}>
        Creado por{' '}
        <Text
          style={[styles.name, { color: name }]}
          accessibilityRole="link"
          onPress={() => void Linking.openURL(linkedin)}
        >
          Elisa Ruiz
        </Text>{' '}
        ❤️ 2026
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { marginTop: 28, alignItems: 'center' },
  line: { fontSize: 13, textAlign: 'center' },
  name: { fontWeight: '700', textDecorationLine: 'underline' },
})
