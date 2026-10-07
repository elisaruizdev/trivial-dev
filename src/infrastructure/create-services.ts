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
import { WebSpeechTranscriber } from './web-speech-transcriber.ts'

export function createServices(): Services {
  const open = new ResilientAnswerEvaluator(new HttpAnswerEvaluator(), new HeuristicAnswerEvaluator())
  return {
    questions: new BankQuestionSource(fallbackBank),
    evaluator: new RoutingAnswerEvaluator(new ExactChoiceEvaluator(), open),
    speech: new WebSpeechTranscriber(),
  }
}
