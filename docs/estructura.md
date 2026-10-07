# Cómo está armado Trivial Dev

Esto es una entrevista técnica, no un examen con un banco cerrado. Eliges tema y nivel, y la partida pregunta como una recruiter: opción múltiple, texto o voz.

Está organizado para que puedas leerlo viniendo de Angular y para que un tema nuevo, Bootstrap incluido, entre sin reescribir la partida.

## El recorrido de una partida

1. `SetupScreen` pinta `topics` y `levels`. El tema y el nivel viven en el estado local del formulario. No hace falta un servicio para eso: es el equivalente a los campos de un componente, no a un store.
2. Al pulsar Empezar, el manejador del formulario llama a `start()`. No hay un `useEffect` que dispare la carga al montar. En Angular ese trabajo cae a menudo en `ngOnInit`; aquí el click es el sitio, porque la carga es consecuencia de una acción.
3. `start()` vive en `InterviewProvider` y llama a `loadInterview`, que solo conoce el puerto `QuestionSource`.
4. `ResilientQuestionSource` prueba `HttpQuestionSource` (`POST /api/questions`). Si no hay clave, la clave falla o el JSON no encaja, usa `BankQuestionSource`.
5. El reducer pasa a `question`. `InterviewScreen` pinta la pregunta con el componente que corresponda en `answerViews`.
6. Responder llama a `gradeAnswer`. Las de opción múltiple las cierra `ExactChoiceEvaluator`. Las escritas y las de voz pasan por `HttpAnswerEvaluator` y, si ese servicio no responde, por `HeuristicAnswerEvaluator`.
7. El reducer guarda la respuesta y enseña la explicación. En la última, pasa a `summary` y la ruta `/resultado` lee ese estado.

Si recargas el navegador a mitad de partida, vuelves al inicio. El estado está en memoria, como un servicio que no persiste. Todavía no hay `sessionStorage`.

## De Angular a esto

| En Angular | Aquí |
| --- | --- |
| Módulo y `providedIn: 'root'` | `createServices()` en `src/main.tsx`, pasado a `ServicesProvider` |
| Servicio que pides con `inject()` | Un puerto en `src/application/ports.ts` y una clase que lo implementa |
| `constructor(private api: Api)` | `useServices()` dentro del provider. El atajo `constructor(private x)` no compila: el `tsconfig` lleva `erasableSyntaxOnly`, así que el campo se declara y se asigna en el cuerpo |
| `signal` o un `BehaviorSubject` con la partida | `useReducer` en `InterviewProvider` |
| `@Input()` | Props del componente |
| `@Output()` | Un callback en las props (`onChange`, `onSubmit`) |
| Plantilla | El JSX del `return` |
| `@if` / `@for` | Un condicional o un `array.map` |
| Router | `react-router` en `src/ui/app.tsx` |
| `styleUrls` | De momento un solo `src/index.css`. El equivalente de una hoja por componente es un CSS module al lado del archivo, cuando una pantalla crezca |
| Guard | La pantalla redirige si el estado no es el suyo. `/entrevista` sin partida vuelve a `/` |
| Pipe | Una función pura: `summarize`, `responseLabel` |
| `ngOnDestroy` | El `return` del `useEffect` de `VoiceAnswer`, que apaga el micrófono al desmontar |

Un componente de React es una función. Se ejecuta en cada render. No guardes datos en una variable local de esa función esperando que sobrevivan: se pierden. Lo que tiene que sobrevivir va a `useState`, `useReducer` o a un ref.

Las reglas de los hooks son estrictas: se llaman en el tope de la función, no dentro de un `if`. `useInterview()` siempre va al principio de la pantalla, y el `if (state.status === ...)` viene después.

`StrictMode`, en desarrollo, monta y desmonta dos veces para destapar efectos mal cerrados. Por eso el micrófono se apaga en la limpieza del efecto.

## Carpetas

`src/domain` no importa React. Son los tipos de tema, nivel, pregunta y nota. `topic.ts` es el registro que vas a tocar.

`src/application` son los casos de uso y los puertos. El reducer solo cambia de estado. `parse-questions.ts` solo valida el JSON. `load-interview.ts` y `grade-answer.ts` no saben si por debajo hay red o un array.

`src/infrastructure` son las implementaciones: HTTP, banco, evaluadores, micrófono y `create-services.ts`, que es el único sitio donde se hace `new` de esas clases.

`src/ui` pinta. Puede importar dominio, aplicación y sus propios hooks. No importa `src/infrastructure`. Hay un test que lo vigila: `src/application/ui-boundary.test.ts`.

`server` es el proxy de desarrollo. Vite lo engancha en `/api/questions` y `/api/grade`. Lee la clave y llama al modelo. No conoce la lista de temas: el cliente le manda la etiqueta, la guía y el nivel.

`src/main.tsx` es el composition root. Crea los servicios una vez, fuera del render, y los inyecta. Es el `main.ts` más el sitio donde antes declarabas los providers.

## SOLID, en archivos

**Una sola responsabilidad.** El reducer no llama a la red. La pantalla no valida el JSON. El parser no puntúa. Si una función hace dos de esas cosas, se ha mezclado.

**Abierto a temas nuevos, cerrado en la partida.** `InterviewScreen` no tiene un `switch` por tema. Recorre `topics`. Añadir Bootstrap no toca esa pantalla ni el reducer ni el servidor. El único `switch` de verdad es el del reducer, y es por fase de la partida (`idle`, `loading`, `question`, `feedback`, `summary`), no por tecnología.

**Sustituibles.** `HttpQuestionSource` y `BankQuestionSource` implementan las dos `load()`. `ResilientQuestionSource` puede usar cualquiera de las dos, y los tests le pasan un objeto falso. Si una implementación no se puede cambiar por otra sin romper a quien la llama, el contrato está mal.

**Interfaces pequeñas.** `QuestionSource` carga. `AnswerEvaluator` puntúa. `SpeechTranscriber` escucha. El micrófono no está metido en el generador de preguntas. Quien no habla no depende de la voz.

**Depender del puerto.** La UI pide `Services` por contexto. Quién es HTTP y quién es el banco se decide en `createServices()`. El día que cambies de proveedor, el cambio se queda en infraestructura y en `server`.

El registro de vistas (`src/ui/answers/registry.ts`) sí se toca al añadir un tipo de pregunta. Es una línea, y TypeScript no compila si falta: `answerViews` es un `Record` de todos los `kind`. Eso es el cierre práctico. No hay un sistema de plugins.

## Añadir Bootstrap a mano

1. Abre `src/domain/topic.ts` y añade un objeto al array:

```ts
{
  id: 'bootstrap',
  label: 'Bootstrap',
  summary: 'Rejilla, utilidades y componentes.',
  guidance:
    'Rejilla de doce columnas, utilidades de espaciado y cuándo un componente de Bootstrap estorba más de lo que ayuda. No lo conviertas en un examen de clases memorizadas.',
}
```

2. No toques `SetupScreen`, el reducer ni `server`. La tarjeta sale porque la pantalla hace `topics.map`.

3. Con `OPENAI_API_KEY` en `.env`, reinicia `npm run dev` y juega una partida. El cliente envía `guidance` al proxy y el modelo pregunta de Bootstrap.

4. Sin clave, el arranque enseña que Bootstrap no tiene banco. Si quieres practicarlo offline, añade preguntas en `src/infrastructure/fallback-bank.ts` con `topicId: 'bootstrap'` y los tres niveles (`junior`, `mid`, `senior`). Mira `choice(...)` y `openEnded(...)` al principio de ese archivo. Una pregunta de voz lleva `kind: 'voice'`.

5. `npm test`. El test del banco exige una pregunta por nivel en los temas listados en `shipped` (`src/infrastructure/sources.test.ts`). Un tema nuevo que no esté en esa lista puede existir sin banco. El de la pantalla sí exige que cada tema del registro se vea como botón. Si hardcodeas las tarjetas, ese test falla.

## Añadir otro tipo de pregunta

1. Suma el literal en `questionKinds` (`src/domain/question.ts`).
2. Crea el componente en `src/ui/answers`, con las mismas props que `AnswerViewProps`.
3. Regístralo en `answerViews`.
4. Si no se puntúa como una opción, `RoutingAnswerEvaluator` ya lo manda al evaluador abierto. Si necesita una regla propia, esa regla es otra clase que implementa `AnswerEvaluator`, y se enchufa en `createServices()`.

La pantalla de la entrevista no debería ganar un `if` por el tipo nuevo. Ya delega en el registro.

## La IA

La clave se llama `OPENAI_API_KEY` y vive en `.env`, que no se sube a git. Vite solo expone al navegador las variables que empiezan por `VITE_`. Esta no. El navegador llama a `/api/questions` y `/api/grade`. El proxy está en `server/interview-api.ts` y solo existe mientras corre `npm run dev` o `npm run preview`.

Puedes cambiar el modelo con `OPENAI_MODEL` (por defecto `gpt-4o-mini`) o apuntar a un endpoint compatible con `OPENAI_BASE_URL`.

Sin clave, o si la respuesta no trae el JSON esperado, la ronda usa `fallback-bank.ts` y lo dice en un aviso. Ese banco tiene dos preguntas por nivel: sirve para probar la pantalla, no para una ronda de entrenamiento. Con clave, la partida pide 30. El cliente las trae en tandas de 10 (`QUESTION_BATCH_SIZE`) porque un solo JSON con las 30 se corta a menudo. `INTERVIEW_LENGTH` está en `src/application/ports.ts`.

## Fragmento, consola y micrófono

Si la pregunta trae `snippet`, encima de la respuesta aparece un editor. Puedes leer el código o cambiarlo. Al pulsar Responder, si el lenguaje es `javascript`, un worker lo ejecuta fuera de la página y la consola muestra lo que haya escrito `console.log`. HTML y CSS se previsualizan en un marco sin scripts. El worker está en `src/ui/code/run-javascript.ts` y la vista en `src/ui/code/code-workspace.tsx`.

Las preguntas que no son de opción múltiple, escritas o de voz, llevan micrófono. `SpeechField` usa el mismo `SpeechTranscriber`: en el navegador es la Web Speech API, así que Chrome pide permiso al micrófono del portátil o del móvil. La transcripción queda en el cuadro y puedes corregirla antes de enviar.

## App de Android

Está en `mobile/`. Reutiliza el dominio, los casos de uso y los evaluadores de `src/`. La interfaz es de React Native. El micrófono usa el reconocimiento de voz de Android. El fragmento JavaScript se ejecuta en un WebView y el resultado vuelve a la consola de la pantalla.

La IA sigue viviendo en el ordenador: la app llama al mismo proxy de Vite, por la IP de la red local y el puerto 5173. Por eso el servidor web hay que arrancarlo con `npm run dev`, que ya escucha en la red (`vite --host`). El teléfono y el ordenador tienen que estar en la misma Wi-Fi. Android permite ese HTTP de desarrollo porque la app declara tráfico en claro.

```bash
cd mobile
npm install
npx expo start
```

Con la app Expo Go instalada desde Play Store puedes abrir el proyecto escaneando el QR. El micrófono y el WebView piden un build nativo, que en este proyecto se instala con el SDK de Android:

```bash
cd mobile
npx expo run:android
```

Eso compila e instala `com.trivialdev.interview` en el dispositivo o el emulador que esté conectado. Sin el SDK, Expo Go abre la partida y el banco de ejemplo; la voz y la consola quedan para el build nativo.

Las de opción múltiple no se fían del modelo para saber si has acertado: se compara el id. Las abiertas, si el modelo no valora, reciben una nota orientativa por coincidencia de palabras. La explicación de la pregunta se enseña siempre, para que puedas contrastar esa nota.

## Arrancar

```bash
npm install
copy .env.example .env
npm run dev
```

Abre la URL que imprime Vite. `npm test` ejecuta el parser, el reducer, el banco y un recorrido de pantalla: elegir HTML junior, responder y llegar al resultado, sin red. `npm run lint` y `npx tsc -b` comprueban el resto.
