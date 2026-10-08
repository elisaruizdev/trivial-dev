import type { Services } from '../application/ports.ts'
import { fallbackBank } from './fallback-bank.ts'
import {
  ExactChoiceEvaluator,
  HeuristicAnswerEvaluator,
  HttpAnswerEvaluator,
  ResilientAnswerEvaluator,
  RoutingAnswerEvaluator,
} from './answer-evaluators.ts'
import { BankQuestionSource } from './bank-question-source.ts'
import { BrowserOwnQuestionStore } from './browser-own-question-store.ts'
import { OwnQuestionSource } from './own-question-source.ts'
import { WebSpeechTranscriber } from './web-speech-transcriber.ts'

export function createServices(): Services {
  const ownQuestions = new BrowserOwnQuestionStore()
  const open = new ResilientAnswerEvaluator(new HttpAnswerEvaluator(), new HeuristicAnswerEvaluator())
  return {
    questions: new OwnQuestionSource(new BankQuestionSource(fallbackBank), ownQuestions),
    evaluator: new RoutingAnswerEvaluator(new ExactChoiceEvaluator(), open),
    speech: new WebSpeechTranscriber(),
    ownQuestions,
  }
}
