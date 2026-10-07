export const verdicts = ['correct', 'partial', 'incorrect'] as const

export type Verdict = (typeof verdicts)[number]

export function isVerdict(value: string): value is Verdict {
  return (verdicts as readonly string[]).includes(value)
}

export type GradeSource = 'exact' | 'model' | 'heuristic'

export interface Grade {
  verdict: Verdict
  comment: string
  source: GradeSource
}
