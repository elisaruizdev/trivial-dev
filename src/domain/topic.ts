/**
 * Registro de temas. Un tema nuevo es un objeto más en este array.
 * La pantalla recorre la lista: no hay un switch por id.
 */
export interface Topic {
  id: string
  label: string
  summary: string
  guidance: string
}

export const topics: readonly Topic[] = [
  {
    id: 'html',
    label: 'HTML',
    summary: 'Documento, semántica y formularios.',
    guidance:
      'Semántica, formularios, accesibilidad básica y cuándo un elemento es el correcto. No preguntes frameworks.',
  },
  {
    id: 'css',
    label: 'CSS',
    summary: 'Caja, layout y cascada.',
    guidance:
      'Modelo de caja, flex, grid, posicionamiento, especificidad y cascada. No preguntes preprocesadores ni librerías de componentes.',
  },
  {
    id: 'scss',
    label: 'SCSS',
    summary: 'Sass moderno: variables, @use y anidado.',
    guidance:
      'Sass moderno: variables, anidado, @use frente a @import, mixins y el coste de la especificidad. No lo confundas con CSS plano ni con Bootstrap.',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    summary: 'Tipos que aguantan un refactor.',
    guidance:
      'Anotaciones, unknown frente a any, uniones, genéricos y el modo strict. Ejemplos cortos de frontend, sin configurar un compilador entero.',
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    summary: 'Lenguaje, antes del framework.',
    guidance:
      'El lenguaje: igualdad, ámbito, closures, this, promesas y el event loop. Sin preguntar sintaxis exclusiva de un framework.',
  },
  {
    id: 'angular',
    label: 'Angular',
    summary: 'Componentes, signals y plantillas actuales.',
    guidance:
      'Angular reciente: componentes standalone, plantillas con @if, input() y output(), signals, inject() y suscripciones. No des por hecho el AngularJS ni módulos NgModule como única opción.',
  },
  {
    id: 'vue',
    label: 'Vue',
    summary: 'Reactividad, plantilla y composición.',
    guidance:
      'Vue 3 con Composition API: ref, computed, props, emits y composables. No preguntes la Options API como si fuera la única, ni Vue 2 salvo para contrastar.',
  },
  {
    id: 'react',
    label: 'React',
    summary: 'Estado, efectos y composición.',
    guidance:
      'React con funciones y hooks: estado, listas y keys, efectos, composición. No pidas clases como patrón recomendado ni detalles internos del reconciliador que no cambien cómo se escribe un componente.',
  },
  {
    id: 'ai',
    label: 'IA',
    summary: 'Modelos, contexto y cuándo no fiarse.',
    guidance:
      'Uso de modelos de lenguaje en producto: tokens, ventana de contexto, alucinaciones, temperatura, prompts, RAG y cuándo afinar. Pregunta criterio de producto, no papers ni entrenamiento. No pidas jailbreaks ni generación de contenido dañino.',
  },
  {
    id: 'laravel',
    label: 'PHP · Laravel',
    summary: 'Rutas, Eloquent y el ciclo de una petición.',
    guidance:
      'PHP con Laravel actual: rutas, controladores, validación, Eloquent, migraciones, middleware, colas y políticas. Pregunta cómo se comporta el framework en una petición real. No conviertas el examen en memorizar helpers ni en PHP antiguo.',
  },
  {
    id: 'kotlin',
    label: 'Kotlin',
    summary: 'Nulos, datos y corrutinas.',
    guidance:
      'Kotlin el lenguaje: nulabilidad, data class, when, extensiones, sealed y corrutinas. Un ejemplo corto de Android vale si ilustra el lenguaje. No examines la SDK ni Jetpack Compose como tema principal.',
  },
  {
    id: 'swift',
    label: 'Swift',
    summary: 'Opcionales, valor y protocolos.',
    guidance:
      'Swift el lenguaje: opcionales, structs frente a classes, protocolos, tipos por valor y async/await. Un ejemplo de iOS vale si ilustra el lenguaje. No examines UIKit ni SwiftUI como tema principal.',
  },
]

export function findTopic(id: string): Topic | undefined {
  return topics.find((topic) => topic.id === id)
}
