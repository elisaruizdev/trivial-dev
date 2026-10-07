import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import { loadEnv } from 'vite'
import { buildGradeMessages, buildQuestionMessages } from './prompts.ts'

const knownLevels = ['junior', 'mid', 'senior']

interface ChatCompletion {
  choices?: { message?: { content?: string } }[]
  error?: { message?: string }
}

function send(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function readBody(req: IncomingMessage, limit = 20_000): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > limit) {
        reject(new Error('too-large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('bad-json'))
      }
    })
    req.on('error', reject)
  })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asText(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > max) return null
  return trimmed
}

function avoidList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  const prompts: string[] = []
  for (const item of value) {
    const prompt = asText(item, 180)
    if (!prompt) continue
    prompts.push(prompt)
    if (prompts.length >= 40) break
  }
  return prompts
}

function stripFence(content: string): string {
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/)
  return (fenced?.[1] ?? content).trim()
}

async function complete(apiKey: string, baseUrl: string, model: string, messages: { role: string; content: string }[]): Promise<unknown> {
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages,
    }),
    signal: AbortSignal.timeout(45_000),
  })

  const payload = (await response.json()) as ChatCompletion
  if (response.status === 401) {
    const error = new Error('unauthorized')
    error.name = 'AiUnauthorized'
    throw error
  }
  if (!response.ok) {
    throw new Error(payload.error?.message ?? 'upstream')
  }
  const content = payload.choices?.[0]?.message?.content
  if (!content) throw new Error('empty')
  return JSON.parse(stripFence(content)) as unknown
}

function createHandler(mode: string, envDir: string) {
  const env = loadEnv(mode, envDir, '')
  return (req: IncomingMessage, res: ServerResponse, next: (error?: unknown) => void) => {
    const pathname = new URL(req.url ?? '/', 'http://localhost').pathname
    const isQuestions = pathname === '/api/questions'
    const isGrade = pathname === '/api/grade'
    if (req.method !== 'POST' || (!isQuestions && !isGrade)) {
      next()
      return
    }

    void (async () => {
      const apiKey = env.OPENAI_API_KEY?.trim()
      if (!apiKey) {
        send(res, 503, { error: 'missing-api-key' })
        return
      }

      let body: unknown
      try {
        body = await readBody(req, 48_000)
      } catch {
        send(res, 400, { error: 'bad-json' })
        return
      }
      if (!isRecord(body)) {
        send(res, 400, { error: 'bad-json' })
        return
      }

      const baseUrl = env.OPENAI_BASE_URL?.trim() || 'https://api.openai.com/v1'
      const model = env.OPENAI_MODEL?.trim() || 'gpt-4o-mini'

      try {
        if (isQuestions) {
          const topicLabel = asText(body.topicLabel, 80)
          const guidance = asText(body.guidance, 2000)
          const level = asText(body.level, 16)
          const calibration = asText(body.calibration, 800)
          const count = body.count
          if (
            !topicLabel ||
            !guidance ||
            !level ||
            !knownLevels.includes(level) ||
            !calibration ||
            typeof count !== 'number' ||
            count < 1 ||
            count > 10
          ) {
            send(res, 400, { error: 'bad-request' })
            return
          }
          const parsed = await complete(
            apiKey,
            baseUrl,
            model,
            buildQuestionMessages({
              topicLabel,
              guidance,
              level,
              calibration,
              count,
              avoid: avoidList(body.avoid),
            }),
          )
          send(res, 200, parsed)
          return
        }

        const prompt = asText(body.prompt, 700)
        const modelAnswer = asText(body.modelAnswer, 1600)
        const explanation = asText(body.explanation, 1600)
        const responseText = asText(body.response, 2000)
        if (!prompt || !modelAnswer || !explanation || !responseText) {
          send(res, 400, { error: 'bad-request' })
          return
        }
        const parsed = await complete(
          apiKey,
          baseUrl,
          model,
          buildGradeMessages({ prompt, modelAnswer, explanation, response: responseText }),
        )
        send(res, 200, parsed)
      } catch (error) {
        if (error instanceof Error && error.name === 'AiUnauthorized') {
          send(res, 401, { error: 'unauthorized' })
          return
        }
        if (error instanceof SyntaxError) {
          send(res, 422, { error: 'invalid-payload' })
          return
        }
        send(res, 502, { error: 'upstream' })
      }
    })()
  }
}

export function interviewApi(): Plugin {
  return {
    name: 'interview-api',
    configureServer(server) {
      server.middlewares.use(createHandler(server.config.mode, server.config.envDir || server.config.root))
    },
    configurePreviewServer(server) {
      server.middlewares.use(createHandler(server.config.mode, server.config.envDir || server.config.root))
    },
  }
}
