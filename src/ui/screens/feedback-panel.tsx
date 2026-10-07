import type { Grade } from '../../domain/grade.ts'
import { verdictLabel } from '../labels.ts'
import { SourceLink } from '../source-link.tsx'

interface FeedbackPanelProps {
  grade: Grade
  explanation: string
  sourceUrl: string | null
  isLast: boolean
  onNext: () => void
}

export function FeedbackPanel({ grade, explanation, sourceUrl, isLast, onNext }: FeedbackPanelProps) {
  return (
    <section className={`feedback is-${grade.verdict}`} aria-live="polite">
      <p className="eyebrow">{verdictLabel[grade.verdict]}</p>
      <p>{grade.comment}</p>
      <p>{explanation}</p>
      <SourceLink url={sourceUrl} />
      <button className="primary" type="button" onClick={onNext}>
        {isLast ? 'Ver resultado' : 'Siguiente pregunta'}
      </button>
    </section>
  )
}
