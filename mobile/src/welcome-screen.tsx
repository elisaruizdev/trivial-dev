import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Credit } from './credit.tsx'
import { useScreenSpace } from './screen-space.ts'
import { colors } from './theme.ts'

export function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  const space = useScreenSpace()

  return (
    <View style={[styles.screen, space]}>
      <View style={styles.center}>
        <View accessibilityRole="header">
          <View style={styles.line}>
            <MarkWord mark={colors.pink} offset={colors.yellow} color={colors.paper}>
              Trivial
            </MarkWord>
            <MarkWord mark={colors.yellow} offset={colors.pink} color={colors.navy}>
              para
            </MarkWord>
          </View>
          <View style={styles.line}>
            <MarkWord mark={colors.mint} offset={colors.yellow} color={colors.navy}>
              desarrolladores
            </MarkWord>
          </View>
        </View>
      </View>
      <Pressable style={styles.primary} onPress={onContinue} accessibilityRole="button">
        <Text style={styles.primaryText}>Continuar</Text>
      </Pressable>
      <Credit />
    </View>
  )
}

function MarkWord({
  children,
  mark,
  offset,
  color,
}: {
  children: string
  mark: string
  offset: string
  color: string
}) {
  return (
    <View style={styles.word}>
      <View style={[styles.wordShadow, { backgroundColor: offset }]} />
      <View style={[styles.wordFace, { backgroundColor: mark }]}>
        <Text style={[styles.wordText, { color }]}>{children}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  center: { flex: 1, justifyContent: 'center' },
  line: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' },
  word: { marginRight: 8, marginBottom: 10 },
  wordShadow: {
    position: 'absolute',
    top: 5,
    right: -4,
    bottom: -5,
    left: 4,
    borderRadius: 4,
  },
  wordFace: { borderRadius: 4, paddingHorizontal: 8, paddingTop: 2, paddingBottom: 4 },
  wordText: { fontSize: 38, fontWeight: '900', lineHeight: 42 },
  primary: {
    alignSelf: 'stretch',
    backgroundColor: colors.yellow,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.navy,
    paddingVertical: 16,
    paddingHorizontal: 22,
    marginBottom: 8,
  },
  primaryText: { color: colors.navy, fontWeight: '700', textAlign: 'center', fontSize: 16 },
})
