import type { Services } from '../../src/application/ports.ts'
import {
  ExactChoiceEvaluator,
  HeuristicAnswerEvaluator,
  HttpAnswerEvaluator,
  ResilientAnswerEvaluator,
  RoutingAnswerEvaluator,
} from '../../src/infrastructure/answer-evaluators.ts'
import { BankQuestionSource } from '../../src/infrastructure/bank-question-source.ts'
import { fallbackBank } from '../../src/infrastructure/fallback-bank.ts'
import { HttpQuestionSource } from '../../src/infrastructure/http-question-source.ts'
import { ResilientQuestionSource } from '../../src/infrastructure/resilient-question-source.ts'
import { OwnQuestionSource } from '../../src/infrastructure/own-question-source.ts'
import { apiOrigin } from './api-origin.ts'
import { FileOwnQuestionStore } from './file-own-question-store.ts'
import { NativeSpeechTranscriber } from './native-speech.ts'

export function createServices(): Services {
  const origin = apiOrigin()
  const bank = new BankQuestionSource(fallbackBank)
  const ownQuestions = new FileOwnQuestionStore()
  const remote = origin ? new ResilientQuestionSource(new HttpQuestionSource(`${origin}/api/questions`), bank) : bank
  const open = new ResilientAnswerEvaluator(
    new HttpAnswerEvaluator(origin ? `${origin}/api/grade` : '/api/grade'),
    new HeuristicAnswerEvaluator(),
  )
  return {
    questions: new OwnQuestionSource(remote, ownQuestions),
    evaluator: new RoutingAnswerEvaluator(new ExactChoiceEvaluator(), open),
    speech: new NativeSpeechTranscriber(),
    ownQuestions,
  }
}
