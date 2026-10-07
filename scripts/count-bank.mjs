import fs from 'node:fs'

const text = fs.readFileSync('src/infrastructure/fallback-bank.ts', 'utf8')
const blocks = text.split(/\b(?:choice|openEnded)\(/).slice(1)
const counts = {}
for (const block of blocks) {
  const id = (block.match(/id: '([^']+)'/) || [])[1]
  if (!id) continue
  const kind = block.includes("kind: 'written'")
    ? 'written'
    : block.includes("kind: 'voice'")
      ? 'voice'
      : 'choice'
  const [topic, level] = id.split('-')
  const key = `${topic} ${level}`
  counts[key] ??= { choice: 0, written: 0, voice: 0, total: 0 }
  counts[key][kind] += 1
  counts[key].total += 1
}
console.log(counts)
