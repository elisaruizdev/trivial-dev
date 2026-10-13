export interface OnboardingSlide {
  title: string
  body: string
}

export const onboardingSlides: readonly OnboardingSlide[] = [
  {
    title: 'Elige tema y nivel',
    body: 'Cada ronda son 30 preguntas como en una entrevista técnica. Marca un tema y un nivel y pulsa empezar cuando estés listo.',
  },
  {
    title: 'De dónde salen las preguntas',
    body: 'Si el ordenador está en la misma Wi-Fi y corre el servidor, las genera la IA. Si no, usamos el banco de ejemplo. Las preguntas que guardes entran cuando coinciden tema y nivel.',
  },
  {
    title: 'Cómo respondes',
    body: 'Algunas se marcan, otras se escriben y, en senior, alguna se dice en voz alta. Tras cada respuesta ves la explicación y un enlace para profundizar.',
  },
]
