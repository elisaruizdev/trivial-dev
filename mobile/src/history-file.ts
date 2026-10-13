import { readInterviewHistory } from '../../src/application/interview-history.ts'
import { JsonFile } from './json-file.ts'

export const historyFile = new JsonFile('interview-history.json', readInterviewHistory)
