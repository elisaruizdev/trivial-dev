import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { interviewStats, type InterviewStats, type LevelStats } from '../../src/application/interview-stats.ts'
import { levelBrief, levels } from '../../src/domain/level.ts'
import { historyFile } from './history-file.ts'
import { colors } from './theme.ts'

function percent(rate: number): string {
  return `${Math.round(rate * 100)} %`
}

function delta(stats: LevelStats): string {
  if (stats.lastDelta === null) return ''
  const points = Math.round(stats.lastDelta * 100)
  if (points === 0) return ' ='
  return points > 0 ? ` ▲${points}` : ` ▼${-points}`
}

export function StatsPanel() {
  const [open, setOpen] = useState(false)
  const [stats, setStats] = useState<InterviewStats | null>(null)

  useEffect(() => {
    let alive = true
    void historyFile.load().then((history) => {
      if (alive) setStats(interviewStats(history, Date.now()))
    })
    return () => {
      alive = false
    }
  }, [])

  return (
    <View>
      <Pressable
        style={styles.header}
        onPress={() => setOpen((value) => !value)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
      >
        <Text style={styles.legend}>Estadísticas</Text>
        <Text style={styles.chevron}>{open ? '▴' : '▾'}</Text>
      </Pressable>
      {open ? <StatsBody stats={stats} /> : null}
    </View>
  )
}

function StatsBody({ stats }: { stats: InterviewStats | null }) {
  if (!stats) return null
  if (stats.rounds === 0) {
    return <Text style={styles.note}>Aún no hay rondas. Cuando termines una entrevista verás aquí tu avance.</Text>
  }
  const overall = (stats.correct + stats.partial / 2) / stats.answered
  return (
    <View style={styles.body}>
      <View style={styles.tiles}>
        <Tile value={String(stats.rounds)} label="Rondas" />
        <Tile value={percent(overall)} label="Acierto" />
        <Tile value={String(stats.incorrect)} label="Fallos" />
        <Tile value={`${stats.streak} ${stats.streak === 1 ? 'día' : 'días'}`} label="Racha" />
      </View>
      {stats.weakest ? (
        <Text style={styles.focus}>
          Para repasar: {stats.weakest.topicLabel} · {levelBrief[stats.weakest.level].label} (
          {percent(stats.weakest.rate)})
        </Text>
      ) : null}
      <Text style={styles.note}>Acierto medio de las 3 últimas rondas. Las parciales cuentan la mitad.</Text>
      {stats.topics.map((topic) => (
        <View key={topic.topicId} style={styles.topic}>
          <Text style={styles.topicTitle}>{topic.topicLabel}</Text>
          {levels.map((level) => {
            const item = topic.levels[level]
            return (
              <View key={level} style={styles.row}>
                <Text style={styles.level}>{levelBrief[level].label}</Text>
                <View style={styles.track}>
                  {item ? <View style={[styles.fill, { width: `${Math.round(item.recentRate * 100)}%` }]} /> : null}
                </View>
                <Text style={styles.rate}>{item ? `${percent(item.recentRate)}${delta(item)}` : '—'}</Text>
              </View>
            )
          })}
          <Text style={styles.detail}>
            {levels
              .map((level) => topic.levels[level])
              .filter((item): item is LevelStats => item !== null)
              .reduce((sum, item) => sum + item.incorrect, 0)}{' '}
            fallos · mejor ronda{' '}
            {percent(
              Math.max(
                ...levels.map((level) => topic.levels[level]?.bestRate ?? 0),
              ),
            )}
          </Text>
        </View>
      ))}
    </View>
  )
}

function Tile({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: { marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  legend: { color: colors.paper, letterSpacing: 2, fontSize: 16, fontWeight: '700', textTransform: 'uppercase' },
  chevron: { color: colors.yellow, fontSize: 20, fontWeight: '700' },
  body: { gap: 10, marginTop: 8 },
  note: { color: colors.textSoft, fontSize: 13, lineHeight: 18, marginTop: 6 },
  tiles: { flexDirection: 'row', gap: 8 },
  tile: { flex: 1, padding: 8, borderRadius: 12, backgroundColor: colors.raise, alignItems: 'center' },
  tileValue: { color: colors.yellow, fontSize: 16, fontWeight: '700' },
  tileLabel: { color: colors.textSoft, fontSize: 11, marginTop: 2 },
  focus: { color: colors.paper, fontSize: 14, fontWeight: '600' },
  topic: { padding: 10, borderRadius: 14, backgroundColor: colors.raise, gap: 6 },
  topicTitle: { color: colors.paper, fontWeight: '700', fontSize: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  level: { color: colors.textSoft, fontSize: 12, width: 48 },
  track: { flex: 1, height: 8, borderRadius: 4, backgroundColor: colors.bg, overflow: 'hidden' },
  fill: { height: 8, backgroundColor: colors.yellow },
  rate: { color: colors.paper, fontSize: 12, width: 64, textAlign: 'right' },
  detail: { color: colors.textSoft, fontSize: 12 },
})
