export interface QuestionPromptInput {
  topicLabel: string
  guidance: string
  level: string
  calibration: string
  count: number
  avoid?: readonly string[]
}

export function buildQuestionMessages(input: QuestionPromptInput): { role: 'system' | 'user'; content: string }[] {
  return [
    {
      role: 'system',
      content: [
        'Eres una recruiter técnica. Haces una entrevista en español, con trato directo y sin condescendencia.',
        'Respondes solo con un objeto JSON, sin markdown.',
        'Cada pregunta tiene una sola respuesta defendible. No uses trivia de memorizar el año de una versión.',
        'No salgas del tema ni del nivel.',
      ].join(' '),
    },
    {
      role: 'user',
      content: [
        `Tema: ${input.topicLabel}.`,
        `Criterio del tema: ${input.guidance}`,
        `Nivel: ${input.level}. ${input.calibration}`,
        `Genera ${input.count} preguntas distintas.`,
        input.avoid && input.avoid.length > 0
          ? `No repitas estas preguntas ya hechas:\n${input.avoid.map((prompt) => `- ${prompt}`).join('\n')}`
          : '',
        'Formato exacto:',
        '{"questions":[{"kind":"choice"|"written"|"voice","prompt":"","options":[{"id":"a","text":""}],"answerId":"a","modelAnswer":"","explanation":"","snippet":null}]}',
        'En choice: cuatro opciones, answerId es el id correcto, modelAnswer puede ir vacío.',
        'En written y voice: options es [] , answerId es "", modelAnswer es una buena respuesta de candidata y explanation es el comentario de la recruiter.',
        'explanation dice por qué esa respuesta encaja y qué matiz suma, en menos de 80 palabras.',
        'La pregunta de voz debe poder contestarse hablando en menos de un minuto.',
        'Alrededor de un tercio de las preguntas llevan snippet en vez de null.',
        'snippet es {"language":"el lenguaje del tema","source":"código"} o null.',
        'Si language es javascript, source es un programa corto, de menos de 15 líneas, que usa console.log. Sin red, sin prompt, sin markdown.',
        'html o css solo cuando el fragmento es marcado o estilo, no un script.',
        'En PHP, Kotlin, Swift u otro lenguaje el fragmento se lee: no hace falta que se ejecute en el navegador.',
        'La pregunta tiene que poder responderse mirando ese fragmento.',
      ].join('\n'),
    },
  ]
}

export function buildGradeMessages(input: {
  prompt: string
  modelAnswer: string
  explanation: string
  response: string
}): { role: 'system' | 'user'; content: string }[] {
  return [
    {
      role: 'system',
      content: [
        'Valoras una respuesta de entrevista técnica.',
        'Aceptas formulaciones distintas si el criterio es el mismo.',
        'correct: cubre lo que se esperaba. partial: la idea está pero falta una parte importante. incorrect: no responde a la pregunta o se equivoca en el criterio.',
        'Respondes solo JSON: {"verdict":"correct"|"partial"|"incorrect","comment":""}.',
        'comment son dos frases en español, en tono de recruiter, sin halago vacío y sin insulto.',
      ].join(' '),
    },
    {
      role: 'user',
      content: [
        `Pregunta: ${input.prompt}`,
        `Respuesta esperada: ${input.modelAnswer}`,
        `Contexto: ${input.explanation}`,
        `Respuesta de la candidata: ${input.response}`,
      ].join('\n'),
    },
  ]
}
