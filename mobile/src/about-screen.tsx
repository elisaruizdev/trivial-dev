import { useEffect } from 'react'
import { BackHandler, Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import { apiOrigin } from './api-origin.ts'
import { Credit } from './credit.tsx'
import { useScreenSpace } from './screen-space.ts'
import { colors } from './theme.ts'

export function AboutScreen({ onClose }: { onClose: () => void }) {
  const space = useScreenSpace()
  const origin = apiOrigin()

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose()
      return true
    })
    return () => sub.remove()
  })

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, space]}>
      <Pressable onPress={onClose} accessibilityRole="button">
        <Text style={styles.back}>Volver</Text>
      </Pressable>
      <Text style={styles.title} accessibilityRole="header">
        Sobre esta app
      </Text>
      <Text style={styles.lead}>
        Elige tema y nivel. La ronda son 30 preguntas. Si el ordenador está en la misma Wi-Fi y corre el servidor, las
        genera la IA. Si guardas preguntas tuyas, entran cuando coinciden el tema y el nivel.
      </Text>
      <Text style={styles.note}>
        {origin
          ? `Servidor de preguntas: ${origin}`
          : 'Sin la IP del ordenador, esta ronda usa el banco de ejemplo.'}
      </Text>
      <Text style={styles.note}>
        Si aceptas los avisos, te recuerdo practicar y las preguntas que falles, aunque cierres la app.
      </Text>
      <Credit />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'transparent' },
  content: { flexGrow: 1, paddingHorizontal: 24, gap: 14 },
  back: { color: colors.yellow, fontWeight: '700', fontSize: 16 },
  title: { color: colors.yellow, letterSpacing: 2, fontSize: 18, fontWeight: '700', textTransform: 'uppercase' },
  lead: { color: colors.paper, fontSize: 20, lineHeight: 29 },
  note: { color: colors.textSoft, fontSize: 15, lineHeight: 22 },
})
