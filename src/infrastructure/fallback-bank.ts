import type { Level } from '../domain/level.ts'
import type { ChoiceOption, CodeSnippet, Question, QuestionKind } from '../domain/question.ts'
import { htmlBank } from './bank/html.ts'
import { lines, type Line } from './bank/pack.ts'
import { fallbackSources } from './bank/sources.ts'
import { junior as aiJunior, mid as aiMid, senior as aiSenior } from './bank/extra/ai.ts'
import { junior as aiBatchJunior, mid as aiBatchMid, senior as aiBatchSenior } from './bank/extra/batch/ai.ts'
import { junior as angularJunior, mid as angularMid, senior as angularSenior } from './bank/extra/angular.ts'
import { junior as angularBatchJunior, mid as angularBatchMid, senior as angularBatchSenior } from './bank/extra/batch/angular.ts'
import { junior as cssJunior, mid as cssMid, senior as cssSenior } from './bank/extra/css.ts'
import { junior as cssBatchJunior, mid as cssBatchMid, senior as cssBatchSenior } from './bank/extra/batch/css.ts'
import { junior as htmlJunior, mid as htmlMid, senior as htmlSenior } from './bank/extra/html.ts'
import { junior as htmlBatchJunior, mid as htmlBatchMid, senior as htmlBatchSenior } from './bank/extra/batch/html.ts'
import { junior as javascriptJunior, mid as javascriptMid, senior as javascriptSenior } from './bank/extra/javascript.ts'
import { junior as javascriptBatchJunior, mid as javascriptBatchMid, senior as javascriptBatchSenior } from './bank/extra/batch/javascript.ts'
import { junior as kotlinJunior, mid as kotlinMid, senior as kotlinSenior } from './bank/extra/kotlin.ts'
import { junior as kotlinBatchJunior, mid as kotlinBatchMid, senior as kotlinBatchSenior } from './bank/extra/batch/kotlin.ts'
import { junior as laravelJunior, mid as laravelMid, senior as laravelSenior } from './bank/extra/laravel.ts'
import { junior as laravelBatchJunior, mid as laravelBatchMid, senior as laravelBatchSenior } from './bank/extra/batch/laravel.ts'
import { junior as reactJunior, mid as reactMid, senior as reactSenior } from './bank/extra/react.ts'
import { junior as reactBatchJunior, mid as reactBatchMid, senior as reactBatchSenior } from './bank/extra/batch/react.ts'
import { junior as scssJunior, mid as scssMid, senior as scssSenior } from './bank/extra/scss.ts'
import { junior as scssBatchJunior, mid as scssBatchMid, senior as scssBatchSenior } from './bank/extra/batch/scss.ts'
import { junior as swiftJunior, mid as swiftMid, senior as swiftSenior } from './bank/extra/swift.ts'
import { junior as swiftBatchJunior, mid as swiftBatchMid, senior as swiftBatchSenior } from './bank/extra/batch/swift.ts'
import { junior as typescriptJunior, mid as typescriptMid, senior as typescriptSenior } from './bank/extra/typescript.ts'
import { junior as typescriptBatchJunior, mid as typescriptBatchMid, senior as typescriptBatchSenior } from './bank/extra/batch/typescript.ts'
import { junior as vueJunior, mid as vueMid, senior as vueSenior } from './bank/extra/vue.ts'
import { junior as vueBatchJunior, mid as vueBatchMid, senior as vueBatchSenior } from './bank/extra/batch/vue.ts'

interface ChoiceInput {
  id: string
  topicId: string
  level: Level
  prompt: string
  options: readonly ChoiceOption[]
  answerId: string
  explanation: string
  snippet?: CodeSnippet | null
}

function choice(input: ChoiceInput): Question {
  const correct = input.options.find((option) => option.id === input.answerId)
  return {
    id: input.id,
    topicId: input.topicId,
    level: input.level,
    kind: 'choice',
    prompt: input.prompt,
    options: [...input.options],
    answerId: input.answerId,
    modelAnswer: correct?.text ?? '',
    explanation: input.explanation,
    snippet: input.snippet ?? null,
    sourceUrl: null,
  }
}

interface OpenInput {
  id: string
  topicId: string
  level: Level
  kind: Extract<QuestionKind, 'written' | 'voice'>
  prompt: string
  modelAnswer: string
  explanation: string
  snippet?: CodeSnippet | null
}

function openEnded(input: OpenInput): Question {
  return { ...input, options: [], answerId: '', snippet: input.snippet ?? null, sourceUrl: null }
}

const opts = (a: string, b: string, c: string, d: string): ChoiceOption[] => [
  { id: 'a', text: a },
  { id: 'b', text: b },
  { id: 'c', text: c },
  { id: 'd', text: d },
]

const drafted: Question[] = [
  choice({
    id: 'html-junior-1',
    topicId: 'html',
    level: 'junior',
    prompt: 'Quieres que al pulsar el texto «Email» el foco vaya al input. ¿Qué pareja de atributos lo consigue?',
    options: opts(
      'for en el label e id en el input, con el mismo valor',
      'name en el label y name en el input',
      'ref en el label y ref en el input',
      'label en el input apuntando al texto',
    ),
    answerId: 'a',
    explanation:
      'El atributo for del label debe coincidir con el id del control. name identifica el dato que se envía, no el foco. Así el área clicable crece y el lector de pantalla anuncia la etiqueta.',
  }),
  choice({
    id: 'html-junior-2',
    topicId: 'html',
    level: 'junior',
    prompt: 'En una página con un solo bloque de contenido principal, ¿qué elemento lo marca?',
    options: opts('main', 'section', 'div', 'body'),
    answerId: 'a',
    explanation:
      'main identifica el contenido único de esa vista. section agrupa un tema dentro de la página, div no aporta significado y body envuelve todo el documento, cabecera incluida.',
  }),
  choice({
    id: 'html-mid-1',
    topicId: 'html',
    level: 'mid',
    prompt: 'Dentro de un form, un button sin atributo type se comporta como…',
    options: opts('submit', 'button', 'reset', 'un control que no hace nada'),
    answerId: 'a',
    explanation:
      'El tipo por defecto es submit. Un botón de «cancelar» o de «añadir fila» dentro del formulario envía la página si no lleva type="button". Es un fallo típico al revisar un formulario.',
  }),
  openEnded({
    id: 'html-mid-2',
    topicId: 'html',
    level: 'mid',
    kind: 'written',
    prompt: '¿Por qué un botón de cancelar dentro de un form debería llevar type="button"?',
    modelAnswer:
      'Porque el type por defecto de button dentro de un form es submit. Sin type="button", pulsar cancelar enviaría el formulario. type="button" ejecuta solo el JavaScript asociado y no dispara el envío.',
    explanation:
      'En una entrevista basta con nombrar el tipo por defecto. El matiz que suma es separar la acción de interfaz del envío de datos.',
  }),
  openEnded({
    id: 'html-senior-1',
    topicId: 'html',
    level: 'senior',
    kind: 'written',
    prompt: '¿Cuándo usarías un button y cuándo un enlace para una acción de la interfaz?',
    modelAnswer:
      'Un enlace navega a otra URL y se puede abrir en otra pestaña. Un button dispara una acción en la página: enviar, abrir un diálogo, alternar estado. Si no hay navegación, un enlace con href="#" simula un control y rompe el comportamiento esperado del teclado y del botón secundario.',
    explanation:
      'La recruiter escucha si distingues navegación de acción. Un div con onclick no sustituye a ninguno de los dos: no entra en el tabulador ni se activa con teclado si no lo construyes a mano.',
  }),
  openEnded({
    id: 'html-senior-2',
    topicId: 'html',
    level: 'senior',
    kind: 'voice',
    prompt: 'Te enseñan un div con un onclick que hace de botón. ¿Qué problemas ves, en una respuesta breve?',
    modelAnswer:
      'No es focable con teclado, no se activa con Enter o Espacio y un lector de pantalla no lo anuncia como botón. Tampoco tiene el estado deshabilitado nativo. Habría que añadir role, tabindex y manejadores de teclado, que es rehacer un button.',
    explanation:
      'La respuesta oral busca criterio, no un checklist memorizado. Con nombrar teclado y nombre accesible ya se ve que miras la interfaz más allá del click.',
  }),
  choice({
    id: 'css-junior-1',
    topicId: 'css',
    level: 'junior',
    prompt: '¿Qué espacio queda fuera del borde de la caja?',
    options: opts('margin', 'padding', 'border', 'outline'),
    answerId: 'a',
    explanation:
      'De dentro afuera: contenido, padding, border y margin. El padding empuja por dentro del borde. Outline se pinta fuera pero no ocupa sitio en el layout como el margin.',
  }),
  choice({
    id: 'css-junior-2',
    topicId: 'css',
    level: 'junior',
    prompt: 'Quieres colocar varios elementos en fila, con hueco entre ellos. ¿Qué punto de partida encaja?',
    options: opts(
      'display: flex y gap',
      'display: inline en el padre',
      'float: left en el padre',
      'position: absolute en cada hijo',
    ),
    answerId: 'a',
    explanation:
      'Flexbox reparte los hijos en un eje y gap añade el hueco sin márgenes laterales huérfanos. Float e inline son mecanismos antiguos para este caso, y absolute saca los ítems del flujo.',
  }),
  choice({
    id: 'css-mid-1',
    topicId: 'css',
    level: 'mid',
    prompt: 'Un elemento con position: absolute se coloca respecto a…',
    options: opts(
      'el ancestro más cercano cuya position no sea static',
      'siempre el viewport',
      'siempre su padre directo',
      'siempre el body',
    ),
    answerId: 'a',
    explanation:
      'Si ningún ancestro está posicionado, el absoluto usa el bloque contenedor inicial. Por eso un dropdown a veces se ancla al sitio equivocado: el relative falta en el padre que tú creías.',
  }),
  openEnded({
    id: 'css-mid-2',
    topicId: 'css',
    level: 'mid',
    kind: 'written',
    prompt: '¿Qué cambia box-sizing: border-box en el ancho que declaras?',
    modelAnswer:
      'Con content-box, width es solo el contenido y padding más border se suman. Con border-box, width incluye contenido, padding y border. Por eso un width del 100% con padding no desborda el padre.',
    explanation:
      'Es de las preguntas que separan a quien ha maquetado de quien solo ha leído la propiedad. El valor por defecto del navegador sigue siendo content-box; muchos resets lo cambian.',
  }),
  openEnded({
    id: 'css-senior-1',
    topicId: 'css',
    level: 'senior',
    kind: 'written',
    prompt: '¿Cuándo elegirías Flexbox y cuándo Grid para un layout?',
    modelAnswer:
      'Flexbox reparte en un eje: una fila de acciones, un grupo que puede pasar a la línea, alinear un ítem. Grid declara filas y columnas a la vez: una página, una ficha con zonas. Se pueden anidar. No son rivales; Grid no sustituye un eje simple ni Flex un tablero de dos dimensiones.',
    explanation:
      'Una respuesta senior nombra el eje y acepta combinarlos. Descartar Flex «porque Grid es más nuevo» es la señal de que la decisión no está pensada.',
  }),
  openEnded({
    id: 'css-senior-2',
    topicId: 'css',
    level: 'senior',
    kind: 'voice',
    prompt: 'Un z-index altísimo no tapa lo que debería. ¿Qué explicarías en voz alta?',
    modelAnswer:
      'z-index solo compite dentro del mismo stacking context. Un ancestro con opacity menor que 1, transform, filter o su propio z-index crea otro contexto, y el hijo no puede salirse de él por mucho número que lleve. Miraría qué ancestro forma ese contexto antes de subir el z-index.',
    explanation:
      'La pregunta no pide la lista completa de propiedades. Pide que no trates z-index como una cola global.',
  }),
  choice({
    id: 'scss-junior-1',
    topicId: 'scss',
    level: 'junior',
    prompt: '¿Cómo se declara una variable de Sass?',
    options: opts('$primario: #9a3412;', '--primario: #9a3412;', '@primario: #9a3412;', 'var primario = #9a3412;'),
    answerId: 'a',
    explanation:
      'Las variables Sass usan $. Las custom properties usan -- y viven en el CSS resultante. Sass resuelve $primario al compilar; el navegador no la ve con ese nombre.',
  }),
  choice({
    id: 'scss-junior-2',
    topicId: 'scss',
    level: 'junior',
    prompt: 'Anidar .titulo dentro de .card en SCSS acaba compilando, en el caso habitual, a…',
    options: opts('.card .titulo', '.card.titulo', 'dos reglas sueltas', 'una variable CSS'),
    answerId: 'a',
    explanation:
      'El anidado sin & genera un descendiente. .card { &.titulo } sería la misma clase junta. Conviene saberlo porque el anidado parece inocente y cambia el selector.',
  }),
  choice({
    id: 'scss-mid-1',
    topicId: 'scss',
    level: 'mid',
    prompt: 'Tras @use "colores" as c, ¿cómo lees una variable de ese archivo?',
    options: opts('c.$primario', '$primario', 'colores.primario', 'var(c.primario)'),
    answerId: 'a',
    explanation:
      'Con @use el archivo tiene namespace. as c lo acorta y el miembro se lee c.$primario. @import antiguo volcaba las variables al ámbito global; @use no.',
  }),
  openEnded({
    id: 'scss-mid-2',
    topicId: 'scss',
    level: 'mid',
    kind: 'written',
    prompt: '¿Qué diferencia práctica hay entre una variable Sass y una custom property?',
    modelAnswer:
      'La variable Sass se sustituye al compilar y no cambia en el navegador. La custom property viaja en el CSS, hereda por la cascada y se puede cambiar en un media query, un tema o con JavaScript. Sass no ve el estado de la página; la custom property sí.',
    explanation:
      'No son intercambiables. Un token de tema que depende del modo oscuro encaja en una custom property. Un valor que solo necesita el build puede quedarse en Sass.',
  }),
  openEnded({
    id: 'scss-senior-1',
    topicId: 'scss',
    level: 'senior',
    kind: 'written',
    prompt: '¿Por qué un anidado profundo de SCSS se vuelve un problema en un proyecto grande?',
    modelAnswer:
      'Cada nivel suma especificidad o alarga el selector, así que para cambiar un estilo hay que igualar o superar esa cadena. El archivo imita el HTML y se rompe cuando el marcado se mueve. Cuesta reutilizar la regla fuera de ese bloque y los overrides acaban con más anidado todavía.',
    explanation:
      'La recruiter quiere oír especificidad y acoplamiento al HTML, no solo «queda feo». Una guía habitual es no bajar de tres niveles sin un motivo.',
  }),
  openEnded({
    id: 'scss-senior-2',
    topicId: 'scss',
    level: 'senior',
    kind: 'voice',
    prompt: 'Explica, como si se lo contaras a un compañero, qué cambia @use respecto a @import en Sass.',
    modelAnswer:
      '@import está en desuso: mete todo en el ámbito global y puede repetir CSS si se importa varias veces. @use carga el módulo una vez y obliga a usar su namespace, así que se ve de dónde sale cada variable o mixin. El archivo deja de contaminar al resto.',
    explanation:
      'Con nombrar el namespace y la carga única basta. El detalle de as * o de @forward puede salir, pero no es obligatorio para considerar la respuesta válida.',
  }),
  choice({
    id: 'typescript-junior-1',
    topicId: 'typescript',
    level: 'junior',
    prompt: 'En function label(name: string), ¿qué aporta : string?',
    options: opts(
      'Anota el tipo del parámetro y el editor avisa si pasas otro',
      'Convierte el valor a string en tiempo de ejecución',
      'Hace que el parámetro sea opcional',
      'Declara una variable global llamada string',
    ),
    answerId: 'a',
    explanation:
      'La anotación es una comprobación de compilación. TypeScript no convierte el argumento al ejecutar: si el valor llega como any o desde fuera del tipado, la anotación no lo transforma sola.',
  }),
  choice({
    id: 'typescript-junior-2',
    topicId: 'typescript',
    level: 'junior',
    prompt: 'Una función declara que devuelve number y el return es "3". ¿Qué ocurre?',
    options: opts(
      'TypeScript marca un error al compilar',
      'JavaScript convierte "3" a 3 sin avisar',
      'El tipo de retorno se amplía solo a string',
      'No pasa nada: el retorno no se comprueba',
    ),
    answerId: 'a',
    explanation:
      'El tipo de retorno es un contrato. "3" no es asignable a number, y el error aparece antes de ejecutar. Por eso el tipo de retorno documenta y a la vez frena un refactor a medias.',
  }),
  choice({
    id: 'typescript-mid-1',
    topicId: 'typescript',
    level: 'mid',
    prompt: 'Recibes un JSON como unknown. ¿Qué puedes hacer con él justo después?',
    options: opts(
      'Nada específico hasta estrechar el tipo con una comprobación',
      'Leer cualquier propiedad, como con any',
      'Asignarlo a string sin comprobar',
      'Llamar a sus métodos porque unknown significa objeto',
    ),
    answerId: 'a',
    explanation:
      'unknown es el any honesto: el valor puede ser cualquier cosa, pero no dejas usarlo hasta comprobarlo. any apaga el chequeo. En un límite con la red, unknown obliga a validar.',
  }),
  openEnded({
    id: 'typescript-mid-2',
    topicId: 'typescript',
    level: 'mid',
    kind: 'written',
    prompt: '¿Para qué sirve una unión discriminada con un campo kind?',
    modelAnswer:
      'Varios objetos comparten un campo literal, por ejemplo kind: "choice" o kind: "written". Al comprobar kind, TypeScript estrecha el resto de campos de esa rama. Así un switch cubre cada forma y avisa si falta un caso.',
    explanation:
      'Es el patrón que usa esta propia aplicación en el estado de la entrevista. No hace falta nombrar el proyecto: basta con explicar el estrechamiento.',
  }),
  openEnded({
    id: 'typescript-senior-1',
    topicId: 'typescript',
    level: 'senior',
    kind: 'written',
    prompt: '¿Por qué un genérico y no any en una función que devuelve el mismo tipo que recibe?',
    modelAnswer:
      'any acepta todo y el retorno deja de tener tipo, así que quien llama pierde el autocompletado y los errores. Un genérico enlaza entrada y salida: si entra un User, sale un User. La función sigue siendo reutilizable sin apagar el chequeo.',
    explanation:
      'La respuesta corta que se busca es que el genérico conserva la relación entre tipos. any compila y traslada el fallo al uso.',
  }),
  openEnded({
    id: 'typescript-senior-2',
    topicId: 'typescript',
    level: 'senior',
    kind: 'voice',
    prompt: 'Un proyecto JavaScript va a activar strict. ¿Qué le contarías al equipo, en un minuto?',
    modelAnswer:
      'strict agrupa comprobaciones como noImplicitAny y strictNullChecks. Van a aparecer null que el código daba por buenos y parámetros sin tipo. No cambia el JavaScript que acaba en el navegador: cambia lo que el compilador se niega a dejar pasar. Conviene activarlo al empezar o por carpetas, no apagarlo en los archivos que chillen.',
    explanation:
      'Se valora que no prometas que strict arregla bugs en runtime por arte de magia, y que nombres null o any implícito.',
  }),
  choice({
    id: 'javascript-junior-1',
    topicId: 'javascript',
    level: 'junior',
    prompt: '¿Qué comparación evita convertir los tipos antes de comparar?',
    options: opts('===', '==', '=', 'Object.is solo para strings'),
    answerId: 'a',
    snippet: {
      language: 'javascript',
      source: "console.log(1 == '1')\nconsole.log(1 === '1')",
    },
    explanation:
      '== aplica coerción: "1" == 1 es true. === compara sin esa conversión. El igual simple asigna. En código de aplicación, === es el valor por defecto salvo que la coerción sea deliberada.',
  }),
  choice({
    id: 'javascript-junior-2',
    topicId: 'javascript',
    level: 'junior',
    prompt: 'Declaras const user = { name: "Ada" } y luego haces user.name = "Grace". ¿Qué pasa?',
    options: opts(
      'El objeto cambia, porque const impide reasignar la variable, no mutar el valor',
      'Lanza un error: const congela el objeto',
      'name sigue siendo Ada',
      'La línea no compila',
    ),
    answerId: 'a',
    explanation:
      'const fija el binding. El objeto sigue siendo mutable. Para impedir la mutación haría falta Object.freeze, y aun así no es profundo. Es una confusión muy habitual en entrevistas junior.',
  }),
  choice({
    id: 'javascript-mid-1',
    topicId: 'javascript',
    level: 'mid',
    prompt: 'Una función interior usa una variable de la función que la creó, y esa variable sigue viva después. Eso es…',
    options: opts(
      'un closure',
      'un hoisting de const',
      'el prototype',
      'una promesa implícita',
    ),
    answerId: 'a',
    explanation:
      'El closure es la función junto con el ámbito léxico donde nació. Por eso un contador privado o un callback recuerdan variables que en la pila ya habrían terminado. No depende de this ni de una promesa.',
  }),
  openEnded({
    id: 'javascript-mid-2',
    topicId: 'javascript',
    level: 'mid',
    kind: 'written',
    prompt: '¿Qué devuelve map y qué le pasa al array original?',
    modelAnswer:
      'map devuelve un array nuevo con el resultado de la función en cada posición. No muta el array original ni lo recorre para descartar elementos: para eso está filter. Si la función muta el ítem porque es un objeto, el original sí se entera, porque el objeto es el mismo.',
    snippet: {
      language: 'javascript',
      source: 'const numbers = [1, 2, 3]\nconst doubled = numbers.map((n) => n * 2)\nconsole.log(doubled)\nconsole.log(numbers)',
    },
    explanation:
      'La segunda frase separa el array de los objetos que contiene. Quedarse solo en «devuelve un array nuevo» es correcto y suficiente para mid; el matiz del objeto suma.',
  }),
  openEnded({
    id: 'javascript-senior-1',
    topicId: 'javascript',
    level: 'senior',
    kind: 'written',
    prompt: 'Ordena qué se ve antes en consola: un console.log síncrono, un .then de una promesa ya resuelta y un setTimeout de 0.',
    modelAnswer:
      'Primero el código síncrono. Después las microtareas, así que el then de la promesa. Al final la macrotarea del setTimeout, aunque el retraso sea 0. El cero solo encola el callback detrás de lo que ya está pendiente en la cola de tareas.',
    snippet: {
      language: 'javascript',
      source:
        "console.log('sync')\nPromise.resolve().then(() => console.log('promise'))\nsetTimeout(() => console.log('timeout'), 0)",
    },
    explanation:
      'El orden es síncrono, microtareas, macrotareas. Confundir el then con el timeout es la respuesta que esta pregunta quiere destapar.',
  }),
  openEnded({
    id: 'javascript-senior-2',
    topicId: 'javascript',
    level: 'senior',
    kind: 'voice',
    prompt: 'Pasas objeto.metodo a un botón como callback y this deja de ser el objeto. ¿Qué ha pasado y cómo lo fijas?',
    modelAnswer:
      'Al extraer el método se pierde el receptor: this depende de cómo se llama la función, no de dónde se escribió. Se fija con bind, envolviendo la llamada en una arrow que sí cierra el objeto, o definiendo el método como arrow si debe recordar la instancia. Una arrow no tiene this propio: usa el de fuera.',
    explanation:
      'No hace falta enumerar call y apply. Sí hace falta decir que this no viaja con la función al pasarla sola.',
  }),
  choice({
    id: 'angular-junior-1',
    topicId: 'angular',
    level: 'junior',
    prompt: 'En una plantilla de Angular, ¿cómo se interpola una propiedad del componente?',
    options: opts('{{ name }}', '[[name]]', '{name}', '@name'),
    answerId: 'a',
    explanation:
      'La interpolación es {{ }}. Los corchetes simples enlazan una propiedad del elemento, [title]="name", que no es lo mismo que pintar el texto. [[ ]] no es sintaxis de plantilla de Angular.',
  }),
  choice({
    id: 'angular-junior-2',
    topicId: 'angular',
    level: 'junior',
    prompt: 'En la sintaxis de plantilla actual, ¿cómo escribes un condicional?',
    options: opts('@if (visible)', '*ngIf="visible" como única forma vigente', 'v-if="visible"', '{#if visible}'),
    answerId: 'a',
    explanation:
      'El control flow actual es @if, @for y @switch. *ngIf sigue viéndose en código antiguo, pero no es la forma que pediríamos hoy en un archivo nuevo. v-if es de Vue.',
  }),
  choice({
    id: 'angular-mid-1',
    topicId: 'angular',
    level: 'mid',
    prompt: '¿Cómo se declara hoy una entrada de un componente, como signal?',
    options: opts('name = input<string>()', '@Input() name: string', 'props: { name: string }', 'this.name = signal()'),
    answerId: 'a',
    explanation:
      'input() declara la entrada y se lee llamándola, name(). El decorador @Input sigue existiendo en código previo. props es el nombre que usarías en React, no en Angular.',
  }),
  openEnded({
    id: 'angular-mid-2',
    topicId: 'angular',
    level: 'mid',
    kind: 'written',
    prompt: '¿Cuándo usarías inject() en lugar de recibir el servicio por el constructor?',
    modelAnswer:
      'inject() pide una dependencia en un contexto de inyección: el constructor, un campo del componente o una función que se ejecute ahí, como un guard o una factory. Equivale a declararla en el constructor y permite reutilizar esa petición dentro de una función. Fuera de ese contexto, inject() falla.',
    explanation:
      'No sustitute al constructor por moda. La respuesta útil es «mismo injector, y puedo usarlo en funciones que corren en ese contexto».',
  }),
  openEnded({
    id: 'angular-senior-1',
    topicId: 'angular',
    level: 'senior',
    kind: 'written',
    prompt: '¿Qué problema resuelve takeUntilDestroyed en una suscripción que abres a mano?',
    modelAnswer:
      'Corta la suscripción cuando se destruye el injector del componente. Sin eso, la respuesta puede llegar después y ejecutar lógica sobre una vista que ya no está, o dejar la suscripción viva al salir de la ruta. takeUntilDestroyed(destroyRef) se engancha a ese ciclo. Si el dato puede ser un signal o un async pipe, ni siquiera hace falta suscribirse a mano.',
    explanation:
      'La pregunta asume una suscripción manual. Sumaría quien diga que a veces la suscripción sobra. No hace falta recitar el operador de RxJS interno.',
  }),
  openEnded({
    id: 'angular-senior-2',
    topicId: 'angular',
    level: 'senior',
    kind: 'voice',
    prompt: '¿Cuándo dejarías un estado en signal y cuándo en un Observable?',
    modelAnswer:
      'El signal guarda un valor que la vista lee y que cambia de forma síncrona: un campo, una lista ya cargada, un flag. El Observable encaja en un flujo que emite a lo largo del tiempo: eventos del usuario, un websocket, reintentos. Puedo convertir uno en el otro en el borde, pero no modelaría un click continuo como un signal suelto ni un nombre de formulario como un stream.',
    explanation:
      'Se busca el criterio de valor frente a flujo, no un ganador. Decir que signals sustituyen a RxJS entero es la respuesta que no encaja.',
  }),
  choice({
    id: 'vue-junior-1',
    topicId: 'vue',
    level: 'junior',
    prompt: 'Entre v-if y v-show, ¿cuál quita el nodo del DOM cuando la condición es falsa?',
    options: opts('v-if', 'v-show', 'los dos', 'ninguno: solo ocultan con opacity'),
    answerId: 'a',
    explanation:
      'v-if no renderiza el bloque. v-show lo deja en el DOM y alterna display. v-if es más barato si casi nunca se muestra; v-show es más barato si se alterna a menudo, porque no destruye el estado del subárbol.',
  }),
  choice({
    id: 'vue-junior-2',
    topicId: 'vue',
    level: 'junior',
    prompt: '¿Cómo se pinta en la plantilla el valor de una ref llamada title?',
    options: opts('{{ title }}', '{{ title.value }}', '[[title]]', '{title}'),
    answerId: 'a',
    explanation:
      'En la plantilla Vue desenvuelve la ref: se escribe title, no title.value. En el script sí se lee y se escribe con .value. Es la diferencia que más se confunde al empezar con Composition API.',
  }),
  choice({
    id: 'vue-mid-1',
    topicId: 'vue',
    level: 'mid',
    prompt: 'En el script, ¿cómo lees el contenido de const title = ref("Hola")?',
    options: opts('title.value', 'title()', 'title', 'title.get()'),
    answerId: 'a',
    explanation:
      'ref devuelve un objeto con value. Sin .value estarías pasando el contenedor, no el string. En la plantilla el .value no se escribe. computed también se lee con .value en el script.',
  }),
  openEnded({
    id: 'vue-mid-2',
    topicId: 'vue',
    level: 'mid',
    kind: 'written',
    prompt: '¿Qué ventaja tiene computed frente a recalcular el valor dentro del template o de un método que se llama siempre?',
    modelAnswer:
      'computed guarda el resultado y lo vuelve a calcular solo cuando cambia alguna dependencia reactiva que leyó. Un método en la plantilla se ejecuta en cada render. Así el derivado queda con nombre y no repite trabajo si sus entradas siguen igual.',
    explanation:
      'La palabra que se espera es caché o dependencia. No hace falta hablar del algoritmo de tracking.',
  }),
  openEnded({
    id: 'vue-senior-1',
    topicId: 'vue',
    level: 'senior',
    kind: 'written',
    prompt: '¿Por qué un composable suele ser mejor sitio que un mixin para reutilizar lógica?',
    modelAnswer:
      'Un composable es una función: se ve qué recibe, qué devuelve y con qué nombre lo guardas. Un mixin mezcla estado y opciones en el componente, y dos mixins pueden pisarse claves sin que el conflicto se lea en el call site. El composable se importa y se llama; el origen de cada dato queda explícito.',
    explanation:
      'La queja del mixin es el acoplamiento implícito. No hace falta decir que los mixins están prohibidos: sí que dejan de ser la herramienta por defecto en Vue 3.',
  }),
  openEnded({
    id: 'vue-senior-2',
    topicId: 'vue',
    level: 'senior',
    kind: 'voice',
    prompt: '¿Cómo bajan los datos y cómo suben los avisos en un componente Vue, y cuándo meterías un store?',
    modelAnswer:
      'Los datos bajan por props y los avisos suben con emits. El padre es dueño del estado compartido entre hijos directos. Un store aparece cuando componentes que no son padre e hijo tienen que leer y cambiar lo mismo, o cuando ese estado vive más que una pantalla. Meter en un store el estado de un input local solo añade un camino opaco.',
    explanation:
      'El paralelo con Angular es input y output, y con React props y callbacks. El store no es el primer cajón.',
  }),
  choice({
    id: 'react-junior-1',
    topicId: 'react',
    level: 'junior',
    prompt: '¿Qué devuelve useState?',
    options: opts(
      'El valor actual y una función para actualizarlo',
      'Solo el valor, que se muta directamente',
      'Una promesa con el estado',
      'El ciclo de vida del componente',
    ),
    answerId: 'a',
    explanation:
      'const [count, setCount] = useState(0) guarda el valor y el setter. Mutar count no vuelve a pintar. El setter pide el siguiente valor, o una función que recibe el anterior si el nuevo depende de él.',
  }),
  choice({
    id: 'react-junior-2',
    topicId: 'react',
    level: 'junior',
    prompt: 'En JSX, ¿cómo se escribe la clase CSS de un elemento?',
    options: opts('className', 'class', 'styleName', 'css'),
    answerId: 'a',
    explanation:
      'JSX se acerca a la API del DOM, donde la propiedad es className, porque class es una palabra reservada en JavaScript. El HTML que acaba en el navegador sigue llevando class.',
  }),
  choice({
    id: 'react-mid-1',
    topicId: 'react',
    level: 'mid',
    prompt: 'En una lista que se reordena o filtra, ¿qué key evita estados cruzados entre ítems?',
    options: opts(
      'Un id estable del propio ítem',
      'El índice del array',
      'Math.random() en cada render',
      'El texto visible, aunque se repita',
    ),
    answerId: 'a',
    explanation:
      'La key identifica el ítem entre renders. El índice falla cuando el orden cambia: React reutiliza el componente de esa posición y el estado interno se queda en el sitio. Un random cambia la key siempre y destruye el nodo en cada render. El id del dato es la key.',
  }),
  openEnded({
    id: 'react-mid-2',
    topicId: 'react',
    level: 'mid',
    kind: 'written',
    prompt: '¿Para qué sirve el array de dependencias de useEffect?',
    modelAnswer:
      'Le dice a React cuándo tiene que volver a ejecutar el efecto: cuando cambia alguno de esos valores respecto al render anterior. Un array vacío lo deja en el montaje. Si omites una variable que el efecto usa, el efecto puede ver un valor viejo. La función que devuelve el efecto limpia el anterior antes de repetirlo y al desmontar.',
    explanation:
      'No hace falta recitar la regla del linter. Sí distinguir «dependencias» de «cuándo se ejecuta el componente», que es en cada render.',
  }),
  openEnded({
    id: 'react-senior-1',
    topicId: 'react',
    level: 'senior',
    kind: 'written',
    prompt:
      'Vienes de Angular. ¿Qué problema tiene cargar datos en un useEffect comparado con un resolver que corre antes de activar la ruta?',
    modelAnswer:
      'El efecto corre después de pintar, así que la primera vista está vacía o en loading. Si el id de la ruta cambia, hay que ignorar la respuesta vieja o cancelarla, porque si no una petición lenta pisa a la nueva. El resolver de Angular espera antes de mostrar la ruta. En React ese trabajo suele vivir en el router o en una librería de datos, no en un efecto que se arregla a mano en cada pantalla.',
    explanation:
      'La respuesta madura nombra el primer pintado y la condición de carrera. No pide que condenes useEffect: pide que no sea el sitio por defecto para la carga de una ruta.',
  }),
  openEnded({
    id: 'react-senior-2',
    topicId: 'react',
    level: 'senior',
    kind: 'voice',
    prompt: '¿Por qué en React se compone con componentes hijos en lugar de heredar de un componente base?',
    modelAnswer:
      'La herencia de una clase base mezcla ciclo de vida y obliga a los hijos a conocer ese padre. La composición mete un children o un render en un hueco y el componente reutilizable no sabe quién lo usa. El estado compartido sube al padre que corresponde, o se pasa por props. Heredar para «tener el mismo método» suele esconder un hook o un componente que faltaba.',
    explanation:
      'Es la misma idea que preferir composición a una clase base de páginas en Angular. Aquí el mecanismo son props y children, no una jerarquía de componentes.',
  }),
  choice({
    id: 'ai-junior-1',
    topicId: 'ai',
    level: 'junior',
    prompt: 'Una respuesta suena segura y bien escrita, pero el dato no está en el material que le pasaste al modelo. ¿Cómo se llama ese fallo?',
    options: opts(
      'Alucinación',
      'Un error de sintaxis del prompt',
      'Que se haya agotado la ventana de contexto',
      'Un 429 de la API',
    ),
    answerId: 'a',
    explanation:
      'Alucinar es afirmar algo que no se sostiene en el contexto ni en una fuente. El texto puede ser fluido. Un 429 es límite de uso, y quedarse sin contexto suele cortar o ignorar el principio, no inventar un dato con aplomo.',
  }),
  choice({
    id: 'ai-junior-2',
    topicId: 'ai',
    level: 'junior',
    prompt: '¿Qué limita cuánto texto puede tener en cuenta el modelo en una sola petición?',
    options: opts('La ventana de contexto', 'El número de usuarios en la sala', 'El idioma de la pregunta', 'El tamaño de la hoja de estilos'),
    answerId: 'a',
    explanation:
      'La ventana de contexto es el cupo de tokens de esa llamada: instrucciones, historial y respuesta. Lo que no entra no lo ve. El idioma cambia el coste en tokens, pero el límite es la ventana.',
  }),
  choice({
    id: 'ai-mid-1',
    topicId: 'ai',
    level: 'mid',
    prompt: '¿Qué cambia la temperatura al generar una respuesta?',
    options: opts(
      'Cuánto se aparta el modelo de las continuaciones más probables',
      'El modelo que atiende la petición',
      'El cifrado del prompt',
      'El número fijo de tokens de salida',
    ),
    answerId: 'a',
    explanation:
      'Temperatura baja se queda cerca de lo más probable y repite menos. Temperatura alta admite opciones menos probables y la salida varía más. No elige el modelo ni reserva un tamaño de respuesta: eso son otros parámetros.',
  }),
  openEnded({
    id: 'ai-mid-2',
    topicId: 'ai',
    level: 'mid',
    kind: 'written',
    prompt: '¿Qué problema intenta resolver RAG frente a pegar todo el conocimiento en el prompt del sistema?',
    modelAnswer:
      'RAG recupera fragmentos relevantes de una base y los mete en el contexto de esa pregunta. Así no reentrenas el modelo ni intentas caber el corpus entero en la ventana. Si el recuperador trae el trozo equivocado, la respuesta se apoya en eso y también falla.',
    explanation:
      'La idea es recuperar y luego generar. Decir que RAG «entrena el modelo con tus PDF» mezcla el mecanismo: el modelo no se reentrena en cada pregunta.',
  }),
  openEnded({
    id: 'ai-senior-1',
    topicId: 'ai',
    level: 'senior',
    kind: 'written',
    prompt: '¿Cuándo afinarías un modelo y cuándo bastaría con un prompt más recuperación?',
    modelAnswer:
      'Prompt y RAG bastan para hechos, formato y ejemplos que cambian a menudo. Afinar compensa cuando la tarea o el estilo se repiten tanto que el prompt se vuelve enorme e inestable, y hay datos etiquetados de calidad. Afinar no sustituye una fuente que cambia cada día: esos datos siguen yendo por recuperación.',
    explanation:
      'Se busca separar comportamiento estable de conocimiento que caduca. Afinar «para que sepa la documentación de ayer» es la respuesta que no encaja.',
  }),
  openEnded({
    id: 'ai-senior-2',
    topicId: 'ai',
    level: 'senior',
    kind: 'voice',
    prompt: 'El chatbot cita una frase y el documento no la contiene. ¿Qué mirarías, en una respuesta breve?',
    modelAnswer:
      'Si el fragmento recuperado estaba en el contexto, si el modelo se lo inventó encima y si la cita se puede comprobar. Separaría un fallo de recuperación, uno de generación y uno de evaluación. Si no hay soporte, la respuesta debería decir que no lo sabe en lugar de atribuir la frase.',
    explanation:
      'No hace falta nombrar un proveedor. Sí distinguir de dónde sale la afirmación y qué pasa cuando no hay soporte.',
  }),
  choice({
    id: 'laravel-junior-1',
    topicId: 'laravel',
    level: 'junior',
    prompt: 'En una aplicación Laravel típica, ¿dónde declaras la URL que apunta a un controlador?',
    options: opts('En routes, por ejemplo web.php o api.php', 'En el archivo .env', 'En composer.json', 'En una migración'),
    answerId: 'a',
    explanation:
      'Las rutas viven en routes. .env guarda configuración, composer.json las dependencias y una migración cambia el esquema. Una ruta puede apuntar a un controlador, a un closure o a un invokable.',
  }),
  choice({
    id: 'laravel-junior-2',
    topicId: 'laravel',
    level: 'junior',
    prompt: '¿Qué describe una migración?',
    options: opts(
      'Un cambio de esquema de base de datos, en código',
      'La compilación de los assets',
      'Un job que se encola',
      'El reemplazo del controlador',
    ),
    answerId: 'a',
    explanation:
      'La migración versiona tablas y columnas. Se aplica con el esquema y se puede revertir. No compila frontend ni sustituye a la ruta. El seeder, si hace falta, carga datos aparte.',
  }),
  choice({
    id: 'laravel-mid-1',
    topicId: 'laravel',
    level: 'mid',
    prompt: 'Este bucle escribe el nombre del autor de cada post. ¿Qué problema tiene?',
    options: opts(
      'Una consulta por cada autor: el N+1',
      'Un índice único duplicado',
      'Un middleware que se ejecuta dos veces',
      'Dos rutas con el mismo nombre',
    ),
    answerId: 'a',
    snippet: {
      language: 'php',
      source: `<?php
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->author->name;
}`,
    },
    explanation:
      'Post::all() trae los posts. Cada $post->author dispara otra consulta si la relación no se cargó antes. with(\'author\') las trae juntas. No es un problema de rutas ni de índices.',
  }),
  openEnded({
    id: 'laravel-mid-2',
    topicId: 'laravel',
    level: 'mid',
    kind: 'written',
    prompt: '¿Para qué usarías un Form Request en lugar de validar a mano al principio del controlador?',
    modelAnswer:
      'El Form Request junta las reglas y la autorización. Si no pasa, la petición no entra en la acción y Laravel responde el 422. El controlador recibe datos ya validados. Validar a mano funciona, pero reparte reglas y respuestas por cada método.',
    explanation:
      'Basta con decir que las reglas salen del controlador y que el fallo corta antes. No hace falta recitar la firma de rules().',
  }),
  openEnded({
    id: 'laravel-senior-1',
    topicId: 'laravel',
    level: 'senior',
    kind: 'written',
    prompt: '¿Cuándo mandarías un trabajo a una cola en lugar de hacerlo dentro de la petición HTTP?',
    modelAnswer:
      'Cuando es lento o puede reintentarse sin que el usuario espere: un correo, un PDF, una llamada a un tercero. La petición encola y responde. Hacerlo en la misma petición alarga el timeout y acopla el fallo externo a la respuesta. Hace falta un worker, y el job debería aguantar ejecutarse más de una vez.',
    explanation:
      'La respuesta útil nombra la espera del usuario y el reintento. Encolar un if trivial solo mueve complejidad.',
  }),
  openEnded({
    id: 'laravel-senior-2',
    topicId: 'laravel',
    level: 'senior',
    kind: 'voice',
    prompt: 'Antes de devolver un modelo en un API resource, ¿qué revisarías?',
    modelAnswer:
      'Qué campos salen y si hay datos sensibles que no deberían ir en la respuesta. Si las relaciones se cargan de una vez para no caer en N+1. Y si una policy autoriza a ese usuario: el resource da forma a la salida, no decide quién puede verla.',
    explanation:
      'Con nombrar campos, carga de relaciones y autorización ya se ve el criterio. No hace falta dictar la clase JsonResource.',
  }),
  choice({
    id: 'kotlin-junior-1',
    topicId: 'kotlin',
    level: 'junior',
    prompt: '¿Qué diferencia hay entre String y String??',
    options: opts('String? admite null; String no', 'String? es una lista', 'String? es mutable', 'No hay diferencia'),
    answerId: 'a',
    explanation:
      'El ? marca un tipo nulo. Asignar null a un String es un error de compilación. Para usar un String? hay que comprobar el null, con un safe call o un early return, antes de tratarlo como texto.',
  }),
  choice({
    id: 'kotlin-junior-2',
    topicId: 'kotlin',
    level: 'junior',
    prompt: '¿Qué te da una data class a partir de las propiedades del constructor primario?',
    options: opts(
      'equals, hashCode, copy y los componentN',
      'Un hilo nuevo',
      'Una Activity de Android',
      'Serialización JSON a cualquier formato, sin más código',
    ),
    answerId: 'a',
    explanation:
      'La data class genera igualdad, hash, copy y el desempaquetado por el orden del constructor. No abre un hilo ni escribe JSON sola: la serialización es otra librería. Una clase normal no recibe esos métodos por declarar propiedades.',
  }),
  choice({
    id: 'kotlin-mid-1',
    topicId: 'kotlin',
    level: 'mid',
    prompt: '¿Qué devuelve name?.length cuando name es null?',
    options: opts('null', '0', 'Una excepción', 'La cadena "null"'),
    answerId: 'a',
    snippet: {
      language: 'kotlin',
      source: `fun lengthOf(name: String?): Int? {
    return name?.length
}`,
    },
    explanation:
      'El safe call ?. solo entra si el receptor no es null. Si lo es, toda la expresión vale null y no llama a length. !! sí lanzaría. Un ?: 0 convertiría ese null en cero, y aquí no está.',
  }),
  openEnded({
    id: 'kotlin-mid-2',
    topicId: 'kotlin',
    level: 'mid',
    kind: 'written',
    prompt: '¿Por qué una sealed class encaja mejor que una jerarquía abierta para un resultado de éxito o error?',
    modelAnswer:
      'El compilador conoce los subtipos. Un when sobre el resultado tiene que cubrir éxito y error, y avisa si añades un caso. Con una clase abierta pueden aparecer herederos en otro sitio y ese when deja de poder ser exhaustivo.',
    explanation:
      'La palabra que se espera es exhaustivo. No hace falta comparar sealed con enum más allá de que el sealed puede llevar datos distintos en cada caso.',
  }),
  openEnded({
    id: 'kotlin-senior-1',
    topicId: 'kotlin',
    level: 'senior',
    kind: 'written',
    prompt: '¿Qué diferencia hay entre lanzar una corrutina con launch y con async?',
    modelAnswer:
      'launch arranca un trabajo y devuelve un Job: encaja en un efecto del que no esperas un valor. async devuelve un Deferred y el resultado se lee con await. Lanzar async y no esperar el valor deja el error sin recoger. El scope decide si un fallo cancela al resto.',
    explanation:
      'No hace falta recitar dispatchers. Sí decir que async es para un resultado y launch para un efecto, y que el scope forma parte de la decisión.',
  }),
  openEnded({
    id: 'kotlin-senior-2',
    topicId: 'kotlin',
    level: 'senior',
    kind: 'voice',
    prompt: '¿Cuándo usarías un object y cuándo un companion object?',
    modelAnswer:
      'object declara un singleton. companion object agrupa lo que pertenece al tipo y no a una instancia, como una fábrica, y se usa con el nombre de la clase. Un estado con ciclo de vida de la app no debería vivir en un singleton global: ahí encaja mejor inyectarlo.',
    explanation:
      'La distinción es instancia única frente a miembros del tipo. Rechazar el singleton para todo el estado de la app suma, sin hacer falta un framework.',
  }),
  choice({
    id: 'swift-junior-1',
    topicId: 'swift',
    level: 'junior',
    prompt: '¿Qué tipo admite que el valor no esté?',
    options: opts('Un opcional, escrito con ?', 'Cualquier struct', 'Solo una clase llamada Optional', 'Un protocolo vacío'),
    answerId: 'a',
    explanation:
      'Int? es un opcional de Int y puede ser nil. Un Int a secas no. Optional es un enum de la librería estándar, no una clase que tengas que heredar. Para usarlo hay que desempaquetarlo.',
  }),
  choice({
    id: 'swift-junior-2',
    topicId: 'swift',
    level: 'junior',
    prompt: '¿Qué hace guard let value = optional else { return }?',
    options: opts(
      'Sale si es nil y, si no, deja value desempaquetado',
      'Convierte nil en 0',
      'Fuerza el unwrap y puede petar',
      'Comparte la referencia con quien llamó',
    ),
    answerId: 'a',
    explanation:
      'guard exige la condición para seguir. Si el opcional es nil, entra en el else y tiene que salir del ámbito. value queda disponible debajo, ya desempaquetado. El force unwrap es !, no guard.',
  }),
  choice({
    id: 'swift-mid-1',
    topicId: 'swift',
    level: 'mid',
    prompt: 'Counter es un struct. Después de estas líneas, ¿qué ha pasado?',
    options: opts(
      'b es una copia: a.value sigue siendo 0',
      'a y b son la misma instancia: a.value también es 1',
      'El compilador lo rechaza porque un struct no se puede asignar',
      'b.value no cambia porque los struct son inmutables siempre',
    ),
    answerId: 'a',
    snippet: {
      language: 'swift',
      source: `struct Counter {
    var value = 0
}
var a = Counter()
var b = a
b.value += 1`,
    },
    explanation:
      'Un struct se copia al asignar. Mutar b no toca a. Si Counter fuera class, las dos variables apuntarían a la misma instancia. var permite mutar la copia; let en b no dejaría cambiar value.',
  }),
  openEnded({
    id: 'swift-mid-2',
    topicId: 'swift',
    level: 'mid',
    kind: 'written',
    prompt: '¿Qué aporta una extensión de protocolo con una implementación por defecto, y cuándo estorba?',
    modelAnswer:
      'Los tipos que adoptan el protocolo reciben ese comportamiento sin escribirlo. Estorba cuando el defecto esconde un requisito y el tipo parece completo sin haber pensado su caso. El requisito sigue en el protocolo; el defecto es una comodidad, no una prueba de que el tipo es el correcto.',
    explanation:
      'Se espera «implementación por defecto» y el riesgo de que tape un caso. No hace falta hablar de la tabla de métodos.',
  }),
  openEnded({
    id: 'swift-senior-1',
    topicId: 'swift',
    level: 'senior',
    kind: 'written',
    prompt: 'En una API nueva, ¿cuándo usarías async/await y cuándo un callback?',
    modelAnswer:
      'async/await en código nuevo: la espera se lee en secuencia y el fallo va por throw. Un callback encaja si la API ya es así o si hay varios eventos a lo largo del tiempo, no un solo resultado. Envolver el callback viejo en una continuación está bien en el borde, no en cada llamada nueva.',
    explanation:
      'La respuesta separa un resultado único de un flujo de eventos. No pide condenar los callbacks que ya existen.',
  }),
  openEnded({
    id: 'swift-senior-2',
    topicId: 'swift',
    level: 'senior',
    kind: 'voice',
    prompt: 'String es un tipo por valor. Si lo pasas a una función y lo mutas dentro, ¿qué le pasa a la variable de quien llamó?',
    modelAnswer:
      'La función trabaja con su copia. Mutarla no cambia la variable de fuera, salvo que el parámetro sea inout. No compartes la referencia como con una clase, así que otra función no te modifica el string por el hecho de haberlo recibido.',
    explanation:
      'Basta con decir copia y la excepción de inout. El copy-on-write es un matiz de implementación, no la respuesta.',
  }),
]

function cited(question: Question): Question {
  if (question.sourceUrl) return question
  const sourceUrl = fallbackSources[question.id]
  if (!sourceUrl?.startsWith('https://')) {
    throw new Error(`falta la fuente de ${question.id}`)
  }
  return { ...question, sourceUrl }
}

function extra(
  topicId: string,
  junior: readonly Line[],
  mid: readonly Line[],
  senior: readonly Line[],
  start = 3,
): Question[] {
  return [
    ...lines(topicId, 'junior', start, junior),
    ...lines(topicId, 'mid', start, mid),
    ...lines(topicId, 'senior', start, senior),
  ]
}

export const fallbackBank: readonly Question[] = [
  ...drafted,
  ...htmlBank,
  ...extra('html', htmlJunior, htmlMid, htmlSenior, 31),
  ...extra('html', htmlBatchJunior, htmlBatchMid, htmlBatchSenior, 101),
  ...extra('ai', aiJunior, aiMid, aiSenior),
  ...extra('ai', aiBatchJunior, aiBatchMid, aiBatchSenior, 101),
  ...extra('angular', angularJunior, angularMid, angularSenior),
  ...extra('angular', angularBatchJunior, angularBatchMid, angularBatchSenior, 101),
  ...extra('css', cssJunior, cssMid, cssSenior),
  ...extra('css', cssBatchJunior, cssBatchMid, cssBatchSenior, 101),
  ...extra('javascript', javascriptJunior, javascriptMid, javascriptSenior),
  ...extra('javascript', javascriptBatchJunior, javascriptBatchMid, javascriptBatchSenior, 101),
  ...extra('kotlin', kotlinJunior, kotlinMid, kotlinSenior),
  ...extra('kotlin', kotlinBatchJunior, kotlinBatchMid, kotlinBatchSenior, 101),
  ...extra('laravel', laravelJunior, laravelMid, laravelSenior),
  ...extra('laravel', laravelBatchJunior, laravelBatchMid, laravelBatchSenior, 101),
  ...extra('react', reactJunior, reactMid, reactSenior),
  ...extra('react', reactBatchJunior, reactBatchMid, reactBatchSenior, 101),
  ...extra('scss', scssJunior, scssMid, scssSenior),
  ...extra('scss', scssBatchJunior, scssBatchMid, scssBatchSenior, 101),
  ...extra('swift', swiftJunior, swiftMid, swiftSenior),
  ...extra('swift', swiftBatchJunior, swiftBatchMid, swiftBatchSenior, 101),
  ...extra('typescript', typescriptJunior, typescriptMid, typescriptSenior),
  ...extra('typescript', typescriptBatchJunior, typescriptBatchMid, typescriptBatchSenior, 101),
  ...extra('vue', vueJunior, vueMid, vueSenior),
  ...extra('vue', vueBatchJunior, vueBatchMid, vueBatchSenior, 101),
].map(cited)
