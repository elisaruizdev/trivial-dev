function b(...rows) {
  return rows.map((row) => `  ${row}`).join('\n')
}

const noMax = [{ pattern: 'Math\\s*\\.\\s*max\\b', message: 'No uses Math.max. Recorre el array y quédate con el mayor.' }]
const noMin = [{ pattern: 'Math\\s*\\.\\s*min\\b', message: 'No uses Math.min. Recorre el array y quédate con el menor.' }]
const noAbs = [{ pattern: 'Math\\s*\\.\\s*abs\\b', message: 'No uses Math.abs. Compara los dos números.' }]

const loopProbe = `
if (__practiceLogs.length !== 100) throw new Error("Se esperaban 100 líneas (del 1 al 100) y hay " + __practiceLogs.length + ".");
for (var __i = 0; __i < 100; __i++) {
  if (__practiceLogs[__i] !== String(__i + 1)) {
    throw new Error("La línea " + (__i + 1) + " debería ser " + (__i + 1) + " y es «" + __practiceLogs[__i] + "».");
  }
}
console.log("Correcto. Del 1 al 100.");
`

/** @type {any[]} */
export const specs = []

function add(spec) {
  specs.push(spec)
}

add({
  title: 'Del 1 al 100',
  prompt:
    'Escribe un bucle del 1 al 100. No hace falta una función. Cada número sale con console.log, uno por línea, en orden.',
  used: 'bucle for y console.log',
  explanation:
    'Un contador empieza en 1 y se incrementa mientras sea menor o igual que 100. En cada vuelta se escribe el contador. No hace falta guardar los números en un array ni envolverlos en una función.',
  starter: '// Bucle del 1 al 100. Un console.log por número.\n\n',
  javascript: 'for (let i = 1; i <= 100; i++) {\n  console.log(i)\n}\n',
  typescript: 'const limit: number = 100\nfor (let i = 1; i <= limit; i++) {\n  console.log(i)\n}\n',
  captureLogs: true,
  probe: loopProbe,
})

add({
  title: 'Máximo sin max',
  name: 'findMax',
  params: 't',
  ts: 't: number[]): number',
  prompt:
    'Write a function to find the maximum value in array t, without using the max function.\nEscribe findMax. El array t tiene al menos un número. No uses Math.max.',
  used: 'bucle for y una variable que guarda el mayor visto',
  explanation:
    'Se toma el primer elemento como candidato. Cada número siguiente lo sustituye solo si es mayor. Así se recorre el array una vez, también cuando todos son negativos: el máximo no es cero, es el menos negativo.',
  body: b(
    'let best = t[0]',
    'for (let i = 1; i < t.length; i++) {',
    '  if (t[i] > best) best = t[i]',
    '}',
    'return best',
  ),
  cases: [
    [[[3, 9, 4]], 9],
    [[[-5, -1, -8]], -1],
    [[[7]], 7],
  ],
  forbid: noMax,
})

add({
  title: 'Producto 30',
  name: 'hasProduct30',
  names: ['hasProduct30', 'isThirtiable'],
  params: 't',
  ts: 't: number[]): boolean',
  prompt:
    'Write a function that determines whether there are three integers in the array T whose product is 30.\nNombres válidos: hasProduct30 o isThirtiable. Los tres números ocupan índices distintos.\nEjemplo: [2, 3, 5] → true. [2, 3, 4] → false.',
  used: 'tres bucles anidados, índices distintos y una comparación con 30',
  explanation:
    'Hay que mirar cada trío de posiciones i < j < k. Si el producto de esos tres valores es 30, la respuesta es true. Si se acaban los tríos sin encontrarlo, es false. Con tres bucles el coste es cúbico y para un array corto sobra. Un número puede repetirse solo si aparece varias veces en el array.',
  body: b(
    'for (let i = 0; i < t.length; i++) {',
    '  for (let j = i + 1; j < t.length; j++) {',
    '    for (let k = j + 1; k < t.length; k++) {',
    '      if (t[i] * t[j] * t[k] === 30) return true',
    '    }',
    '  }',
    '}',
    'return false',
  ),
  extraJs: 'function isThirtiable(t) {\n  return hasProduct30(t)\n}\n',
  extraTs: 'function isThirtiable(t: number[]): boolean {\n  return hasProduct30(t)\n}\n',
  cases: [
    [[[2, 3, 5]], true],
    [[[2, 3, 4]], false],
    [[[10, 3, 1]], true],
    [[[6, 5, 1]], true],
    [[[-5, -3, 2]], true],
    [[[30]], false],
    [[[5, 6]], false],
    [[[0, 5, 6, 1]], true],
    [[[0, 5, 6]], false],
  ],
})

add({
  title: 'Suma del array',
  name: 'sumArray',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Suma todos los números de t. El array vacío suma 0.\nEjemplo: [1, 2, 3] → 6.',
  used: 'bucle for...of y un acumulador',
  explanation: 'Un acumulador empieza en 0. Cada elemento se le suma. Al terminar el recorrido, el acumulador es la suma.',
  body: b('let total = 0', 'for (const n of t) total += n', 'return total'),
  cases: [
    [[[1, 2, 3]], 6],
    [[[]], 0],
    [[[-1, 5]], 4],
  ],
})

add({
  title: 'Contar pares',
  name: 'countEvens',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Cuenta cuántos números de t son pares.\nEjemplo: [1, 2, 4, 5] → 2.',
  used: 'bucle y el resto de dividir entre 2',
  explanation: 'Un número es par cuando el resto de dividirlo entre 2 es 0. Se recorre el array y se cuenta cada vez que eso ocurre.',
  body: b('let total = 0', 'for (const n of t) if (n % 2 === 0) total++', 'return total'),
  cases: [
    [[[1, 2, 4, 5]], 2],
    [[[]], 0],
    [[[1, 3, 5]], 0],
  ],
})

add({
  title: 'Invertir texto',
  name: 'reverseText',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Devuelve text al revés, carácter a carácter.\nEjemplo: "hola" → "aloh".',
  used: 'bucle hacia atrás y concatenación de strings',
  explanation: 'Se recorre el string desde el último índice hasta el 0 y se van pegando los caracteres en un string nuevo. El original no se modifica.',
  body: b(
    "let out = ''",
    'for (let i = text.length - 1; i >= 0; i--) out += text[i]',
    'return out',
  ),
  cases: [
    [['hola'], 'aloh'],
    [[''], ''],
    [['ab'], 'ba'],
  ],
})

add({
  title: 'Palíndromo exacto',
  name: 'isPalindrome',
  params: 'text',
  ts: 'text: string): boolean',
  prompt: 'Di si text se lee igual al derecho y al revés. No quites espacios. Ignora mayúsculas.\nEjemplo: "Ana" → true. "hola" → false.',
  used: 'dos índices que se acercan y comparación de caracteres',
  explanation: 'Se pasa el texto a minúsculas. Un índice empieza al principio y otro al final. Mientras no se crucen, los caracteres deben coincidir. Si uno falla, no es palíndromo.',
  body: b(
    'const clean = text.toLowerCase()',
    'let i = 0',
    'let j = clean.length - 1',
    'while (i < j) {',
    '  if (clean[i] !== clean[j]) return false',
    '  i++',
    '  j--',
    '}',
    'return true',
  ),
  cases: [
    [['Ana'], true],
    [['hola'], false],
    [[''], true],
    [['a a'], true],
  ],
})

add({
  title: 'FizzBuzz',
  name: 'fizzBuzz',
  params: 'n',
  ts: 'n: number): string[]',
  prompt: 'Devuelve los textos del 1 a n. Múltiplo de 3: "Fizz". De 5: "Buzz". De ambos: "FizzBuzz". El resto, el número como texto.\nEjemplo: 5 → ["1", "2", "Fizz", "4", "Buzz"].',
  used: 'bucle for y el resto de dividir entre 3, 5 y 15',
  explanation: 'Se comprueba primero el múltiplo de 15, porque también lo es de 3 y de 5. Si no, el de 3, luego el de 5, y si nada encaja se convierte el número a string.',
  body: b(
    'const out = []',
    'for (let i = 1; i <= n; i++) {',
    "  if (i % 15 === 0) out.push('FizzBuzz')",
    "  else if (i % 3 === 0) out.push('Fizz')",
    "  else if (i % 5 === 0) out.push('Buzz')",
    '  else out.push(String(i))',
    '}',
    'return out',
  ),
  cases: [
    [[5], ['1', '2', 'Fizz', '4', 'Buzz']],
    [[15], ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']],
  ],
})

add({
  title: 'Factorial',
  name: 'factorial',
  params: 'n',
  ts: 'n: number): number',
  prompt: 'Devuelve n! para n mayor o igual que 0. 0! es 1.\nEjemplo: 5 → 120.',
  used: 'bucle que multiplica un acumulador',
  explanation: 'El acumulador empieza en 1. Se multiplica por 2, por 3, y así hasta n. Si n es 0 o 1, el bucle no da vueltas y se queda 1.',
  body: b('let total = 1', 'for (let i = 2; i <= n; i++) total *= i', 'return total'),
  cases: [
    [[0], 1],
    [[1], 1],
    [[5], 120],
    [[6], 720],
  ],
})

add({
  title: 'Contar vocales',
  name: 'countVowels',
  params: 'text',
  ts: 'text: string): number',
  prompt: 'Cuenta las vocales a, e, i, o, u. Ignora mayúsculas. La y no cuenta.\nEjemplo: "Hola" → 2.',
  used: 'bucle, toLowerCase e includes',
  explanation: 'Se recorre el texto en minúsculas. Cada carácter que esté en "aeiou" suma uno. El resto se ignora.',
  body: b(
    'let total = 0',
    "for (const ch of text.toLowerCase()) if ('aeiou'.includes(ch)) total++",
    'return total',
  ),
  cases: [
    [['Hola'], 2],
    [['xyz'], 0],
    [['AEIOU'], 5],
  ],
})

add({
  title: 'Primera mayúscula',
  name: 'capitalizeWord',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Devuelve text con la primera letra en mayúscula y el resto igual.\nEjemplo: "hola" → "Hola". "" → "".',
  used: 'índice 0, toUpperCase y slice',
  explanation: 'Si el texto está vacío no hay primera letra. Si no, se pone en mayúscula el carácter 0 y se concatena el resto con slice(1).',
  body: b("if (!text) return ''", 'return text[0].toUpperCase() + text.slice(1)'),
  cases: [
    [['hola'], 'Hola'],
    [[''], ''],
    [['Ya'], 'Ya'],
  ],
})

add({
  title: 'Repetir texto',
  name: 'repeatText',
  params: 'text, times',
  ts: 'text: string, times: number): string',
  prompt: 'Devuelve text repetido times veces. times es 0 o más.\nEjemplo: "ab", 3 → "ababab".',
  used: 'bucle for y concatenación',
  explanation: 'Se parte de un string vacío y se le añade text tantas veces como indique times. Con 0 vueltas el resultado es vacío.',
  body: b("let out = ''", 'for (let i = 0; i < times; i++) out += text', 'return out'),
  cases: [
    [['ab', 3], 'ababab'],
    [['x', 0], ''],
    [['no', 1], 'no'],
  ],
})

add({
  title: 'Mínimo sin min',
  name: 'findMin',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Devuelve el menor número de t. El array tiene al menos uno. No uses Math.min.\nEjemplo: [3, 1, 4] → 1.',
  used: 'bucle y una variable con el menor visto',
  explanation: 'Igual que el máximo, pero la comparación es menor que. El primer elemento es el candidato inicial, así que un array de negativos también funciona.',
  body: b(
    'let best = t[0]',
    'for (let i = 1; i < t.length; i++) {',
    '  if (t[i] < best) best = t[i]',
    '}',
    'return best',
  ),
  cases: [
    [[[3, 1, 4]], 1],
    [[[-2, -8, -1]], -8],
    [[[4]], 4],
  ],
  forbid: noMin,
})

add({
  title: 'Media',
  name: 'average',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Devuelve la media de t. El array tiene al menos un número.\nEjemplo: [2, 4] → 3. [1, 2] → 1.5.',
  used: 'suma, length y división',
  explanation: 'Se suma el array y se divide entre la cantidad de elementos. En JavaScript la división no es entera: 3/2 es 1.5.',
  body: b('let total = 0', 'for (const n of t) total += n', 'return total / t.length'),
  cases: [
    [[[2, 4]], 3],
    [[[1, 2]], 1.5],
    [[[5]], 5],
  ],
})

add({
  title: '¿Está el valor?',
  name: 'includesValue',
  params: 't, value',
  ts: 't: number[], value: number): boolean',
  prompt: 'Di si value aparece en t.\nEjemplo: [1, 2, 3], 2 → true.',
  used: 'bucle y comparación estricta',
  explanation: 'Se recorre el array. En cuanto un elemento es === value se devuelve true. Si se termina el recorrido, false.',
  body: b('for (const n of t) if (n === value) return true', 'return false'),
  cases: [
    [[[1, 2, 3], 2], true],
    [[[1, 2, 3], 4], false],
    [[[], 0], false],
  ],
})

add({
  title: 'Índice del valor',
  name: 'indexOfValue',
  params: 't, value',
  ts: 't: number[], value: number): number',
  prompt: 'Devuelve el primer índice de value en t, o -1 si no está.\nEjemplo: [4, 5, 4], 4 → 0.',
  used: 'bucle con índice',
  explanation: 'Hace falta el índice, así que el bucle es por posición y no solo por valor. Se devuelve en cuanto hay coincidencia. Si no aparece, el convenio es -1.',
  body: b('for (let i = 0; i < t.length; i++) if (t[i] === value) return i', 'return -1'),
  cases: [
    [[[4, 5, 4], 4], 0],
    [[[4, 5, 4], 5], 1],
    [[[4, 5, 4], 9], -1],
  ],
})

add({
  title: 'Números únicos',
  name: 'uniqueNumbers',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Devuelve los números de t sin repetir, en el orden de la primera aparición.\nEjemplo: [1, 2, 1, 3, 2] → [1, 2, 3].',
  used: 'array resultado e includes',
  explanation: 'Se construye otro array. Un número se añade solo si todavía no está. includes busca en lo ya guardado, así que el orden de llegada se mantiene.',
  body: b(
    'const out = []',
    'for (const n of t) if (!out.includes(n)) out.push(n)',
    'return out',
  ),
  cases: [
    [[[1, 2, 1, 3, 2]], [1, 2, 3]],
    [[[]], []],
    [[[5, 5]], [5]],
  ],
})

add({
  title: '¿Es par?',
  name: 'isEven',
  params: 'n',
  ts: 'n: number): boolean',
  prompt: 'Di si n es par.\nEjemplo: 4 → true. 7 → false.',
  used: 'operador resto %',
  explanation: 'El resto de dividir entre 2 es 0 cuando el número es par. Sirve también para el 0.',
  body: b('return n % 2 === 0'),
  cases: [
    [[4], true],
    [[7], false],
    [[0], true],
  ],
})

add({
  title: 'Valor absoluto',
  name: 'absoluteValue',
  params: 'n',
  ts: 'n: number): number',
  prompt: 'Devuelve el valor absoluto de n sin Math.abs.\nEjemplo: -4 → 4. 3 → 3.',
  used: 'un if que cambia el signo',
  explanation: 'Si n es negativo, se devuelve su opuesto. Si no, se devuelve tal cual. El cero se queda en cero.',
  body: b('return n < 0 ? -n : n'),
  cases: [
    [[-4], 4],
    [[3], 3],
    [[0], 0],
  ],
  forbid: noAbs,
})

add({
  title: 'Acotar',
  name: 'clamp',
  params: 'n, low, high',
  ts: 'n: number, low: number, high: number): number',
  prompt: 'Devuelve n limitado al intervalo [low, high]. low es menor o igual que high.\nEjemplo: 5, 0, 3 → 3. -1, 0, 3 → 0.',
  used: 'dos comparaciones',
  explanation: 'Si n se pasa por debajo, el resultado es low. Si se pasa por arriba, high. En medio se queda n.',
  body: b('if (n < low) return low', 'if (n > high) return high', 'return n'),
  cases: [
    [[5, 0, 3], 3],
    [[-1, 0, 3], 0],
    [[2, 0, 3], 2],
  ],
})

add({
  title: 'Signo',
  name: 'signOf',
  params: 'n',
  ts: 'n: number): number',
  prompt: 'Devuelve 1 si n es positivo, -1 si es negativo y 0 si es cero.\nEjemplo: -8 → -1.',
  used: 'if / else',
  explanation: 'Son tres casos excluyentes. El orden da igual mientras el cero tenga su propia rama y no se cuele en los positivos.',
  body: b('if (n > 0) return 1', 'if (n < 0) return -1', 'return 0'),
  cases: [
    [[-8], -1],
    [[4], 1],
    [[0], 0],
  ],
})

add({
  title: 'Último elemento',
  name: 'lastItem',
  params: 't',
  ts: 't: number[]): number | null',
  prompt: 'Devuelve el último número de t, o null si está vacío.\nEjemplo: [1, 2, 3] → 3.',
  used: 'length y el índice length - 1',
  explanation: 'El último índice válido es length - 1. Si length es 0, no hay ese índice y se devuelve null para no leer fuera del array.',
  body: b('if (t.length === 0) return null', 'return t[t.length - 1]'),
  cases: [
    [[[1, 2, 3]], 3],
    [[[]], null],
    [[[8]], 8],
  ],
})

add({
  title: 'Primer elemento',
  name: 'firstItem',
  params: 't',
  ts: 't: string[]): string | null',
  prompt: 'Devuelve el primer texto de t, o null si está vacío.\nEjemplo: ["a", "b"] → "a".',
  used: 'comprobar length y el índice 0',
  explanation: 'El primer elemento está en la posición 0, pero solo si el array tiene algo. El vacío no tiene posición 0.',
  body: b('if (t.length === 0) return null', 'return t[0]'),
  cases: [
    [[['a', 'b']], 'a'],
    [[[]], null],
  ],
})

add({
  title: 'Suma de cifras',
  name: 'sumDigits',
  params: 'n',
  ts: 'n: number): number',
  prompt: 'Suma las cifras de n. n es un entero mayor o igual que 0.\nEjemplo: 405 → 9.',
  used: 'resto entre 10 y división entera',
  explanation: 'El resto entre 10 es la última cifra. Math.floor(n / 10) quita esa cifra. Se repite hasta que el número se queda en 0. El propio 0 suma 0.',
  body: b(
    'let total = 0',
    'let rest = n',
    'while (rest > 0) {',
    '  total += rest % 10',
    '  rest = Math.floor(rest / 10)',
    '}',
    'return total',
  ),
  cases: [
    [[405], 9],
    [[0], 0],
    [[19], 10],
  ],
})

add({
  title: '¿Es primo?',
  name: 'isPrime',
  params: 'n',
  ts: 'n: number): boolean',
  prompt: 'Di si n es primo. Los menores que 2 no lo son.\nEjemplo: 17 → true. 9 → false. 1 → false.',
  used: 'bucle hasta la raíz y el resto',
  explanation: 'Si n es menor que 2, no es primo. Si algún entero desde 2 hasta la raíz divide a n, tampoco. No hace falta probar más allá de la raíz: un factor mayor tendría pareja menor.',
  body: b(
    'if (n < 2) return false',
    'for (let i = 2; i * i <= n; i++) if (n % i === 0) return false',
    'return true',
  ),
  cases: [
    [[17], true],
    [[9], false],
    [[1], false],
    [[2], true],
  ],
})

add({
  title: 'Del 1 a n',
  name: 'rangeTo',
  params: 'n',
  ts: 'n: number): number[]',
  prompt: 'Devuelve un array con los enteros del 1 a n, inclusive. Si n es menor que 1, el array va vacío.\nEjemplo: 4 → [1, 2, 3, 4].',
  used: 'bucle for y push',
  explanation: 'El contador va de 1 a n y cada valor se mete en el array. Si n es 0, la condición i <= n nunca se cumple.',
  body: b('const out = []', 'for (let i = 1; i <= n; i++) out.push(i)', 'return out'),
  cases: [
    [[4], [1, 2, 3, 4]],
    [[0], []],
    [[1], [1]],
  ],
})

add({
  title: 'Contar un carácter',
  name: 'countChar',
  params: 'text, ch',
  ts: 'text: string, ch: string): number',
  prompt: 'Cuenta cuántas veces aparece ch en text. ch es un solo carácter.\nEjemplo: "banana", "a" → 3.',
  used: 'bucle for...of y comparación',
  explanation: 'Se mira cada carácter del texto. Cada coincidencia exacta suma uno. Mayúsculas y minúsculas son distintas.',
  body: b("let total = 0", 'for (const item of text) if (item === ch) total++', 'return total'),
  cases: [
    [['banana', 'a'], 3],
    [['banana', 'n'], 2],
    [['banana', 'z'], 0],
  ],
})

add({
  title: 'Cortar texto',
  name: 'truncate',
  params: 'text, max',
  ts: 'text: string, max: number): string',
  prompt: 'Devuelve como mucho los primeros max caracteres de text. Si ya es más corto, se deja igual.\nEjemplo: "hola mundo", 4 → "hola".',
  used: 'length y slice',
  explanation: 'slice(0, max) corta sin pasarse del final si el texto es más corto, así que el if es opcional. Aquí se deja explícito: si cabe entero, se devuelve el original.',
  body: b('if (text.length <= max) return text', 'return text.slice(0, max)'),
  cases: [
    [['hola mundo', 4], 'hola'],
    [['ok', 10], 'ok'],
    [['abc', 0], ''],
  ],
})

add({
  title: 'Empieza por',
  name: 'startsWithText',
  params: 'text, prefix',
  ts: 'text: string, prefix: string): boolean',
  prompt: 'Di si text empieza por prefix, sin usar startsWith.\nEjemplo: "hola", "ho" → true.',
  used: 'slice de la misma longitud que el prefijo',
  explanation: 'Se comparan los primeros prefix.length caracteres con el prefijo. Si el prefijo es más largo que el texto, slice devuelve el texto entero y la comparación falla, que es lo correcto.',
  body: b('return text.slice(0, prefix.length) === prefix'),
  cases: [
    [['hola', 'ho'], true],
    [['hola', 'la'], false],
    [['hola', ''], true],
    [['hi', 'hola'], false],
  ],
})

add({
  title: 'Termina por',
  name: 'endsWithText',
  params: 'text, suffix',
  ts: 'text: string, suffix: string): boolean',
  prompt: 'Di si text termina por suffix, sin usar endsWith.\nEjemplo: "hola", "la" → true.',
  used: 'slice desde el final',
  explanation: 'Si el sufijo es más largo que el texto, no puede terminar así. Si no, se compara el tramo final de esa longitud.',
  body: b(
    'if (suffix.length > text.length) return false',
    'return text.slice(text.length - suffix.length) === suffix',
  ),
  cases: [
    [['hola', 'la'], true],
    [['hola', 'ho'], false],
    [['hola', ''], true],
    [['a', 'abc'], false],
  ],
})

add({
  title: 'Gritar',
  name: 'shout',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Devuelve text en mayúsculas.\nEjemplo: "hola" → "HOLA".',
  used: 'toUpperCase',
  explanation: 'toUpperCase recorre el string y pasa cada letra a mayúscula. Los signos se quedan igual. Es el método del propio string, no hace falta un bucle a mano.',
  body: b('return text.toUpperCase()'),
  cases: [
    [['hola'], 'HOLA'],
    [['Ya!'], 'YA!'],
  ],
})

add({
  title: 'Solo dígitos',
  name: 'onlyDigits',
  params: 'text',
  ts: 'text: string): boolean',
  prompt: 'Di si text no está vacío y todos sus caracteres son dígitos del 0 al 9.\nEjemplo: "2026" → true. "12a" → false. "" → false.',
  used: 'bucle y comparación con los caracteres 0 y 9',
  explanation: 'El vacío se rechaza porque no hay ningún dígito. En cada carácter se comprueba que esté entre "0" y "9" en el orden del código Unicode, que en los dígitos es el orden numérico.',
  body: b(
    'if (!text) return false',
    "for (const ch of text) if (ch < '0' || ch > '9') return false",
    'return true',
  ),
  cases: [
    [['2026'], true],
    [['12a'], false],
    [[''], false],
  ],
})

add({
  title: 'Contar palabras',
  name: 'wordCount',
  params: 'text',
  ts: 'text: string): number',
  prompt: 'Cuenta las palabras de text. Las separan uno o más espacios. Un texto en blanco tiene 0.\nEjemplo: "hola  mundo" → 2.',
  used: 'trim, split con una expresión regular y length',
  explanation: 'trim quita los espacios de los extremos. split(/\\s+/) parte por cualquier bloque de espacio. Si después de trim no queda nada, no hay palabras: split de un string vacío daría un array engañoso, por eso se corta antes.',
  body: b("if (!text.trim()) return 0", 'return text.trim().split(/\\s+/).length'),
  cases: [
    [['hola  mundo'], 2],
    [['   '], 0],
    [['una'], 1],
  ],
})

add({
  title: 'Palabra más larga',
  name: 'longestWord',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Devuelve la palabra más larga de text. Si empatan, la primera. Si no hay palabras, "".\nEjemplo: "un día largo" → "largo".',
  used: 'split, un bucle y la longitud',
  explanation: 'Se parten las palabras y se guarda la más larga vista. La comparación es estrictamente mayor, así que un empate no sustituye a la que ya estaba.',
  body: b(
    "const words = text.trim() ? text.trim().split(/\\s+/) : []",
    "let best = ''",
    'for (const word of words) if (word.length > best.length) best = word',
    'return best',
  ),
  cases: [
    [['un día largo'], 'largo'],
    [['aa bb'], 'aa'],
    [['   '], ''],
  ],
})

add({
  title: 'Doblar',
  name: 'doubleAll',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Devuelve un array nuevo con cada número de t multiplicado por 2.\nEjemplo: [1, 2, 3] → [2, 4, 6].',
  used: 'bucle y push sobre un array nuevo',
  explanation: 'No se modifica t. Se crea otro array y se mete el doble de cada elemento, en el mismo orden.',
  body: b('const out = []', 'for (const n of t) out.push(n * 2)', 'return out'),
  cases: [
    [[[1, 2, 3]], [2, 4, 6]],
    [[[]], []],
    [[[-2]], [-4]],
  ],
})

add({
  title: 'Solo positivos',
  name: 'onlyPositives',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Devuelve los números de t que son mayores que 0, en el mismo orden.\nEjemplo: [-1, 2, 0, 3] → [2, 3].',
  used: 'filtro con un bucle',
  explanation: 'El cero y los negativos se descartan. Los positivos se copian a un array nuevo.',
  body: b('const out = []', 'for (const n of t) if (n > 0) out.push(n)', 'return out'),
  cases: [
    [[[-1, 2, 0, 3]], [2, 3]],
    [[[-5, 0]], []],
  ],
})

add({
  title: 'Suma de positivos',
  name: 'sumPositives',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Suma solo los números de t que son mayores que 0.\nEjemplo: [-2, 4, 1] → 5.',
  used: 'bucle, if y acumulador',
  explanation: 'Es la suma de siempre, con un if que ignora lo que no es positivo. Si no hay positivos, el acumulador se queda en 0.',
  body: b('let total = 0', 'for (const n of t) if (n > 0) total += n', 'return total'),
  cases: [
    [[[-2, 4, 1]], 5],
    [[[-1, 0]], 0],
  ],
})

add({
  title: 'Producto del array',
  name: 'productAll',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Multiplica todos los números de t. El array vacío da 1.\nEjemplo: [2, 3, 4] → 24.',
  used: 'acumulador que empieza en 1',
  explanation: 'El neutro de la multiplicación es 1, no 0. Si se empezara en 0, el producto siempre sería 0. Cada elemento multiplica al acumulador.',
  body: b('let total = 1', 'for (const n of t) total *= n', 'return total'),
  cases: [
    [[[2, 3, 4]], 24],
    [[[]], 1],
    [[[-2, 5]], -10],
  ],
})

add({
  title: '¿Hay negativo?',
  name: 'hasNegative',
  params: 't',
  ts: 't: number[]): boolean',
  prompt: 'Di si algún número de t es menor que 0.\nEjemplo: [1, -2, 3] → true.',
  used: 'bucle con return anticipado',
  explanation: 'No hace falta recorrer todo si ya apareció un negativo. En cuanto se ve uno, se devuelve true. Si se acaba el array, false.',
  body: b('for (const n of t) if (n < 0) return true', 'return false'),
  cases: [
    [[[1, -2, 3]], true],
    [[[1, 0, 2]], false],
    [[[]], false],
  ],
})

add({
  title: 'Todos positivos',
  name: 'allPositive',
  params: 't',
  ts: 't: number[]): boolean',
  prompt: 'Di si todos los números de t son mayores que 0. El array vacío devuelve true.\nEjemplo: [1, 2] → true. [1, 0] → false.',
  used: 'bucle que falla en cuanto encuentra uno que no cumple',
  explanation: 'El cero no es positivo. Si aparece un número que no es mayor que 0, la respuesta es false. Si no aparece ninguno, es true. En el array vacío no hay ningún contraejemplo, así que es true.',
  body: b('for (const n of t) if (n <= 0) return false', 'return true'),
  cases: [
    [[[1, 2]], true],
    [[[1, 0]], false],
    [[[]], true],
  ],
})

add({
  title: 'Mayores que',
  name: 'countGreaterThan',
  params: 't, min',
  ts: 't: number[], min: number): number',
  prompt: 'Cuenta cuántos números de t son estrictamente mayores que min.\nEjemplo: [1, 5, 3], 3 → 1.',
  used: 'bucle y comparación',
  explanation: 'La comparación es estricta: un número igual a min no cuenta. El resto del patrón es un contador.',
  body: b('let total = 0', 'for (const n of t) if (n > min) total++', 'return total'),
  cases: [
    [[[1, 5, 3], 3], 1],
    [[[1, 5, 3], 0], 3],
    [[[1, 5, 3], 9], 0],
  ],
})

add({
  title: 'Elemento n',
  name: 'nthItem',
  params: 't, n',
  ts: 't: string[], n: number): string | null',
  prompt: 'Devuelve el elemento en la posición n, contando desde 1. Si n no existe, null.\nEjemplo: ["a", "b", "c"], 2 → "b".',
  used: 'traducir una posición humana al índice del array',
  explanation: 'Los arrays empiezan en 0, pero el enunciado cuenta desde 1. El índice es n - 1, y hay que rechazar n menor que 1 o mayor que la longitud.',
  body: b('if (n < 1 || n > t.length) return null', 'return t[n - 1]'),
  cases: [
    [[['a', 'b', 'c'], 2], 'b'],
    [[['a', 'b', 'c'], 4], null],
    [[['a', 'b', 'c'], 0], null],
  ],
})

add({
  title: 'Quitar en un índice',
  name: 'removeAt',
  params: 't, index',
  ts: 't: number[], index: number): number[]',
  prompt: 'Devuelve un array nuevo sin el elemento de index. index es válido.\nEjemplo: [1, 2, 3], 1 → [1, 3].',
  used: 'slice y concat',
  explanation: 'slice(0, index) copia lo de antes. slice(index + 1) copia lo de después. concat los junta. t no se modifica porque slice copia.',
  body: b('return t.slice(0, index).concat(t.slice(index + 1))'),
  cases: [
    [[[1, 2, 3], 1], [1, 3]],
    [[[1, 2, 3], 0], [2, 3]],
    [[[1, 2, 3], 2], [1, 2]],
  ],
})

add({
  title: 'Insertar en un índice',
  name: 'insertAt',
  params: 't, index, value',
  ts: 't: number[], index: number, value: number): number[]',
  prompt: 'Devuelve un array nuevo con value insertado en index. El elemento que estaba ahí se desplaza a la derecha.\nEjemplo: [1, 2, 4], 2, 3 → [1, 2, 3, 4].',
  used: 'slice para copiar y splice para insertar en la copia',
  explanation: 'splice modifica el array sobre el que se llama. Por eso primero se copia con slice. En la copia, splice(index, 0, value) inserta sin borrar.',
  body: b('const out = t.slice()', 'out.splice(index, 0, value)', 'return out'),
  cases: [
    [[[1, 2, 4], 2, 3], [1, 2, 3, 4]],
    [[[1, 2], 0, 9], [9, 1, 2]],
  ],
})

add({
  title: 'Juntar arrays',
  name: 'joinArrays',
  params: 'a, b',
  ts: 'a: number[], b: number[]): number[]',
  prompt: 'Devuelve un array con los elementos de a seguidos de los de b.\nEjemplo: [1, 2], [3] → [1, 2, 3].',
  used: 'concat',
  explanation: 'concat devuelve un array nuevo. No modifica a ni b. El orden es el de a y después el de b.',
  body: b('return a.concat(b)'),
  cases: [
    [[[1, 2], [3]], [1, 2, 3]],
    [[[], [4]], [4]],
  ],
})

add({
  title: 'Texto vacío',
  name: 'isEmptyText',
  params: 'text',
  ts: 'text: string): boolean',
  prompt: 'Di si text es exactamente "". Un espacio no cuenta como vacío.\nEjemplo: "" → true. " " → false.',
  used: 'comparación estricta',
  explanation: '=== compara el valor y el tipo. "" es vacío. " " tiene un carácter, así que no lo es. trim sería otra pregunta: aquí no se recortan espacios.',
  body: b("return text === ''"),
  cases: [
    [[''], true],
    [[' '], false],
    [['a'], false],
  ],
})

add({
  title: 'Rellenar por la izquierda',
  name: 'padLeft',
  params: 'text, length, ch',
  ts: 'text: string, length: number, ch: string): string',
  prompt: 'Rellena text por la izquierda con el carácter ch hasta llegar a length. Si ya es más largo, se deja igual. ch es un carácter.\nEjemplo: "7", 3, "0" → "007".',
  used: 'bucle while y concatenación por delante',
  explanation: 'Mientras el resultado sea más corto que length, se pone ch delante. Añadir por delante, y no por detrás, es lo que hace que los ceros queden a la izquierda.',
  body: b('let out = text', 'while (out.length < length) out = ch + out', 'return out'),
  cases: [
    [['7', 3, '0'], '007'],
    [['1234', 2, '0'], '1234'],
    [['', 2, 'x'], 'xx'],
  ],
})

add({
  title: 'Invertir palabras',
  name: 'reverseWords',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Invierte el orden de las palabras. Hay un solo espacio entre ellas y no hay espacios en los extremos.\nEjemplo: "hola mundo cruel" → "cruel mundo hola".',
  used: 'split, reverse y join',
  explanation: 'split(" ") parte por cada espacio y deja las palabras en un array. reverse cambia ese orden. join(" ") las vuelve a pegar con un espacio.',
  body: b("return text.split(' ').reverse().join(' ')"),
  cases: [
    [['hola mundo cruel'], 'cruel mundo hola'],
    [['sola'], 'sola'],
  ],
})

add({
  title: 'Iniciales',
  name: 'initials',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Devuelve las iniciales en mayúscula, sin separadores. Las palabras van separadas por un espacio.\nEjemplo: "Ada Lovelace" → "AL".',
  used: 'split y la primera letra de cada palabra',
  explanation: 'Cada palabra aporta su carácter 0, pasado a mayúscula. Se concatenan sin espacios. Una palabra vacía, si la hubiera, no aporta inicial.',
  body: b(
    "let out = ''",
    "for (const word of text.split(' ')) {",
    '  if (word) out += word[0].toUpperCase()',
    '}',
    'return out',
  ),
  cases: [
    [['Ada Lovelace'], 'AL'],
    [['un'], 'U'],
  ],
})

add({
  title: 'Celsius a Fahrenheit',
  name: 'celsiusToFahrenheit',
  params: 'c',
  ts: 'c: number): number',
  prompt: 'Pasa grados Celsius a Fahrenheit: c * 9 / 5 + 32.\nEjemplo: 0 → 32. 100 → 212.',
  used: 'una fórmula aritmética',
  explanation: 'No hay bucle. Es la conversión directa. El orden de las operaciones importa: primero el producto y la división, después se suma 32.',
  body: b('return c * 9 / 5 + 32'),
  cases: [
    [[0], 32],
    [[100], 212],
    [[-40], -40],
  ],
})

add({
  title: 'Área del rectángulo',
  name: 'rectangleArea',
  params: 'width, height',
  ts: 'width: number, height: number): number',
  prompt: 'Devuelve el área de un rectángulo. width y height son positivos.\nEjemplo: 3, 4 → 12.',
  used: 'multiplicación',
  explanation: 'El área es base por altura. No hace falta Math ni un bucle.',
  body: b('return width * height'),
  cases: [
    [[3, 4], 12],
    [[1, 8], 8],
  ],
})

add({
  title: 'Año bisiesto',
  name: 'isLeapYear',
  params: 'year',
  ts: 'year: number): boolean',
  prompt: 'Di si year es bisiesto. Lo es si es divisible entre 4, salvo los divisibles entre 100, que no lo son, salvo los divisibles entre 400, que sí.\nEjemplo: 2024 → true. 1900 → false. 2000 → true.',
  used: 'resto y el orden de las reglas',
  explanation: 'La excepción de los siglos se mira antes que la regla general de cada 4 años. Si es divisible entre 400, es bisiesto. Si lo es entre 100, no. Si lo es entre 4, sí. Si no, no.',
  body: b(
    'if (year % 400 === 0) return true',
    'if (year % 100 === 0) return false',
    'return year % 4 === 0',
  ),
  cases: [
    [[2024], true],
    [[1900], false],
    [[2000], true],
    [[2023], false],
  ],
})

add({
  title: 'Nota en letra',
  name: 'letterGrade',
  params: 'score',
  ts: 'score: number): string',
  prompt: 'Pasa una nota de 0 a 100 a letra. 90 o más: "A". 80: "B". 70: "C". 60: "D". Por debajo: "F".\nEjemplo: 90 → "A". 89 → "B". 59 → "F".',
  used: 'if en cascada, de mayor a menor',
  explanation: 'El orden importa. Si se mirara primero el 60, un 95 también pasaría ese if. Se pregunta de la nota más alta a la más baja y la última rama es el suspenso.',
  body: b(
    "if (score >= 90) return 'A'",
    "if (score >= 80) return 'B'",
    "if (score >= 70) return 'C'",
    "if (score >= 60) return 'D'",
    "return 'F'",
  ),
  cases: [
    [[90], 'A'],
    [[89], 'B'],
    [[70], 'C'],
    [[60], 'D'],
    [[59], 'F'],
  ],
})

add({
  title: 'Mayor de dos',
  name: 'maxOfTwo',
  params: 'a, b',
  ts: 'a: number, b: number): number',
  prompt: 'Devuelve el mayor de a y b. Si son iguales, da igual cuál. No uses Math.max.\nEjemplo: 3, 8 → 8.',
  used: 'una comparación',
  explanation: 'Con dos números basta un if. No hace falta un array ni un bucle.',
  body: b('return a > b ? a : b'),
  cases: [
    [[3, 8], 8],
    [[8, 3], 8],
    [[4, 4], 4],
  ],
  forbid: noMax,
})

add({
  title: 'Menor de tres',
  name: 'minOfThree',
  params: 'a, b, c',
  ts: 'a: number, b: number, c: number): number',
  prompt: 'Devuelve el menor de a, b y c. No uses Math.min ni Math.max.\nEjemplo: 3, 1, 2 → 1.',
  used: 'una variable candidato y dos comparaciones',
  explanation: 'Se empieza creyendo que a es el menor. Si b es más pequeño, pasa a ser el candidato. Lo mismo con c. Es el mismo patrón que findMin, con tres valores sueltos.',
  body: b('let best = a', 'if (b < best) best = b', 'if (c < best) best = c', 'return best'),
  cases: [
    [[3, 1, 2], 1],
    [[9, 9, 4], 4],
    [[2, 2, 2], 2],
  ],
  forbid: [...noMin, ...noMax],
})

add({
  title: 'Suma hasta n',
  name: 'sumTo',
  params: 'n',
  ts: 'n: number): number',
  prompt: 'Suma los enteros del 1 a n. Si n es menor que 1, devuelve 0.\nEjemplo: 4 → 10.',
  used: 'bucle y acumulador',
  explanation: 'Es 1 + 2 + ... + n. Un bucle lo hace explícito. Existe la fórmula n * (n + 1) / 2, pero el bucle enseña el recorrido.',
  body: b('let total = 0', 'for (let i = 1; i <= n; i++) total += i', 'return total'),
  cases: [
    [[4], 10],
    [[1], 1],
    [[0], 0],
  ],
})

add({
  title: 'Potencia',
  name: 'power',
  params: 'base, exp',
  ts: 'base: number, exp: number): number',
  prompt: 'Devuelve base elevado a exp. exp es un entero mayor o igual que 0. No uses ** ni Math.pow.\nEjemplo: 2, 8 → 256. 2, 0 → 1.',
  used: 'bucle que multiplica',
  explanation: 'Cualquier número elevado a 0 es 1, así que el acumulador empieza en 1. Se multiplica por base, exp veces.',
  body: b('let total = 1', 'for (let i = 0; i < exp; i++) total *= base', 'return total'),
  cases: [
    [[2, 8], 256],
    [[2, 0], 1],
    [[5, 1], 5],
    [[3, 3], 27],
  ],
})

add({
  title: 'Cuenta atrás',
  name: 'countdown',
  params: 'n',
  ts: 'n: number): number[]',
  prompt: 'Devuelve un array desde n hasta 1. Si n es menor que 1, el array va vacío.\nEjemplo: 3 → [3, 2, 1].',
  used: 'bucle que decrementa',
  explanation: 'El contador baja de uno en uno. La condición es i >= 1 para no meter el 0.',
  body: b('const out = []', 'for (let i = n; i >= 1; i--) out.push(i)', 'return out'),
  cases: [
    [[3], [3, 2, 1]],
    [[0], []],
    [[1], [1]],
  ],
})

add({
  title: 'Impares hasta n',
  name: 'oddsUntil',
  params: 'n',
  ts: 'n: number): number[]',
  prompt: 'Devuelve los impares desde 1 hasta n, inclusive si n es impar.\nEjemplo: 8 → [1, 3, 5, 7].',
  used: 'bucle con paso 2',
  explanation: 'Se empieza en 1 y se suma 2 cada vez. Así solo salen impares y no hace falta un if dentro.',
  body: b('const out = []', 'for (let i = 1; i <= n; i += 2) out.push(i)', 'return out'),
  cases: [
    [[8], [1, 3, 5, 7]],
    [[1], [1]],
    [[0], []],
  ],
})

add({
  title: 'Pares hasta n',
  name: 'evensUntil',
  params: 'n',
  ts: 'n: number): number[]',
  prompt: 'Devuelve los pares desde 2 hasta n, inclusive si n es par.\nEjemplo: 8 → [2, 4, 6, 8].',
  used: 'bucle con paso 2 desde 2',
  explanation: 'Igual que los impares, pero el origen es 2. El 0 no entra porque el enunciado empieza en 2.',
  body: b('const out = []', 'for (let i = 2; i <= n; i += 2) out.push(i)', 'return out'),
  cases: [
    [[8], [2, 4, 6, 8]],
    [[1], []],
    [[2], [2]],
  ],
})

add({
  title: 'Tabla de multiplicar',
  name: 'multiplyTable',
  params: 'n',
  ts: 'n: number): number[]',
  prompt: 'Devuelve n*1, n*2, ... n*10.\nEjemplo: 3 → [3, 6, 9, 12, 15, 18, 21, 24, 27, 30].',
  used: 'bucle de 1 a 10',
  explanation: 'El contador es el multiplicador, no el resultado. En cada vuelta se guarda n * i.',
  body: b('const out = []', 'for (let i = 1; i <= 10; i++) out.push(n * i)', 'return out'),
  cases: [
    [[3], [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]],
    [[1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
  ],
})

add({
  title: '¿Está ordenado?',
  name: 'isSortedAsc',
  params: 't',
  ts: 't: number[]): boolean',
  prompt: 'Di si t está ordenado de menor a mayor. Los empates valen. El array vacío es true.\nEjemplo: [1, 2, 2] → true. [1, 3, 2] → false.',
  used: 'comparar cada elemento con el anterior',
  explanation: 'Basta mirar parejas vecinas. Si alguno es menor que el de su izquierda, el array no está ordenado. Un array de 0 o 1 elementos no tiene parejas que fallen.',
  body: b('for (let i = 1; i < t.length; i++) if (t[i] < t[i - 1]) return false', 'return true'),
  cases: [
    [[[1, 2, 2]], true],
    [[[1, 3, 2]], false],
    [[[]], true],
  ],
})

add({
  title: 'Contar un valor',
  name: 'countValue',
  params: 't, value',
  ts: 't: number[], value: number): number',
  prompt: 'Cuenta cuántas veces aparece value en t.\nEjemplo: [1, 2, 1, 1], 1 → 3.',
  used: 'bucle y contador',
  explanation: 'A diferencia de includes, aquí no se sale en la primera coincidencia: hay que contarlas todas.',
  body: b('let total = 0', 'for (const n of t) if (n === value) total++', 'return total'),
  cases: [
    [[[1, 2, 1, 1], 1], 3],
    [[[1, 2, 1, 1], 4], 0],
  ],
})

add({
  title: 'Sustituir carácter',
  name: 'replaceAllChar',
  params: 'text, from, to',
  ts: 'text: string, from: string, to: string): string',
  prompt: 'Sustituye cada aparición de from por to. from y to son un carácter.\nEjemplo: "hola", "o", "a" → "hala".',
  used: 'bucle que construye un string nuevo',
  explanation: 'Los strings no se editan por dentro. Se recorre el original y se va armando otro: si el carácter es from, se escribe to; si no, el mismo carácter.',
  body: b(
    "let out = ''",
    'for (const ch of text) out += ch === from ? to : ch',
    'return out',
  ),
  cases: [
    [['hola', 'o', 'a'], 'hala'],
    [['aaa', 'a', 'b'], 'bbb'],
    [['abc', 'z', 'y'], 'abc'],
  ],
})

add({
  title: 'Quitar carácter',
  name: 'removeChar',
  params: 'text, ch',
  ts: 'text: string, ch: string): string',
  prompt: 'Quita todas las apariciones de ch.\nEjemplo: "banana", "a" → "bnn".',
  used: 'bucle que omite un carácter',
  explanation: 'Es el mismo recorrido que sustituir, pero el carácter prohibido no se copia. El resto sí.',
  body: b("let out = ''", 'for (const item of text) if (item !== ch) out += item', 'return out'),
  cases: [
    [['banana', 'a'], 'bnn'],
    [['abc', 'z'], 'abc'],
  ],
})

add({
  title: 'Caracteres únicos',
  name: 'uniqueChars',
  params: 'text',
  ts: 'text: string): string[]',
  prompt: 'Devuelve los caracteres de text sin repetir, en orden de aparición.\nEjemplo: "abca" → ["a", "b", "c"].',
  used: 'array e includes',
  explanation: 'Igual que los números únicos, carácter a carácter. includes evita meter un carácter que ya salió.',
  body: b(
    'const out = []',
    'for (const ch of text) if (!out.includes(ch)) out.push(ch)',
    'return out',
  ),
  cases: [
    [['abca'], ['a', 'b', 'c']],
    [[''], []],
    [['bb'], ['b']],
  ],
})

add({
  title: 'Todo mayúsculas',
  name: 'isUppercase',
  params: 'text',
  ts: 'text: string): boolean',
  prompt: 'Di si text no está vacío y todas sus letras son mayúsculas de la A a la Z. Cualquier otro carácter lo invalida.\nEjemplo: "AB" → true. "Ab" → false. "" → false.',
  used: 'bucle y el rango A-Z',
  explanation: 'No vale toUpperCase() === text si hay que rechazar números o espacios. Cada carácter tiene que caer entre "A" y "Z". El vacío se rechaza aparte.',
  body: b(
    'if (!text) return false',
    "for (const ch of text) if (ch < 'A' || ch > 'Z') return false",
    'return true',
  ),
  cases: [
    [['AB'], true],
    [['Ab'], false],
    [[''], false],
    [['A1'], false],
  ],
})

add({
  title: 'Title case',
  name: 'titleCase',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Pon en mayúscula la primera letra de cada palabra y el resto en minúscula. Hay un solo espacio entre palabras.\nEjemplo: "hola MUNDO" → "Hola Mundo".',
  used: 'split, map, toUpperCase, toLowerCase y join',
  explanation: 'Cada palabra se parte. La primera letra pasa a mayúscula y el resto a minúscula, para corregir un "MUNDO" entero. join recupera el espacio.',
  body: b(
    "return text.split(' ').map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')",
  ),
  cases: [
    [['hola MUNDO'], 'Hola Mundo'],
    [['una'], 'Una'],
  ],
})

add({
  title: 'Slug',
  name: 'slugify',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Pasa text a un slug: minúsculas, solo letras y dígitos, y los demás caracteres se convierten en un único guion. Sin guion al principio ni al final.\nEjemplo: "Hola, mundo!" → "hola-mundo".',
  used: 'toLowerCase, un bucle y una bandera para no repetir guiones',
  explanation: 'Se recorre el texto en minúsculas. Letras y dígitos se copian. Cualquier otra cosa abre un guion, pero solo si ya hay texto y no se acaba de poner otro. Al final se quita un guion sobrante.',
  body: b(
    'const lower = text.toLowerCase()',
    "let out = ''",
    'let dash = false',
    'for (const ch of lower) {',
    "  if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')) {",
    '    out += ch',
    '    dash = false',
    '  } else if (!dash && out.length > 0) {',
    "    out += '-'",
    '    dash = true',
    '  }',
    '}',
    "if (out.endsWith('-')) out = out.slice(0, -1)",
    'return out',
  ),
  cases: [
    [['Hola, mundo!'], 'hola-mundo'],
    [['  Hola!!'], 'hola'],
    [['a--b'], 'a-b'],
  ],
})

add({
  title: 'Segundo mayor',
  name: 'secondLargest',
  params: 't',
  ts: 't: number[]): number | null',
  prompt: 'Devuelve el segundo mayor distinto. Si no hay dos valores distintos, null.\nEjemplo: [1, 5, 3, 5] → 3. [5, 5] → null.',
  used: 'un recorrido y dos variables, primero y segundo',
  explanation: 'No basta ordenar y coger el penúltimo, porque los repetidos ocuparían ese sitio. Se guardan el mayor y el siguiente distinto. Un valor igual al mayor se ignora. Uno que queda entre los dos actualiza el segundo.',
  body: b(
    'let first = null',
    'let second = null',
    'for (const n of t) {',
    '  if (first === null || n > first) {',
    '    second = first',
    '    first = n',
    '  } else if (n < first && (second === null || n > second)) {',
    '    second = n',
    '  }',
    '}',
    'return second',
  ),
  cases: [
    [[[1, 5, 3, 5]], 3],
    [[[5, 5]], null],
    [[[1]], null],
    [[[4, 2, 9, 2]], 4],
  ],
})

add({
  title: 'Amplitud',
  name: 'span',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Devuelve la diferencia entre el máximo y el mínimo de t. El array tiene al menos un número. No uses Math.max ni Math.min.\nEjemplo: [3, 10, 4] → 7.',
  used: 'un bucle que actualiza el menor y el mayor',
  explanation: 'En el mismo recorrido se guardan los dos extremos, empezando por el primer elemento. La amplitud es mayor menos menor.',
  body: b(
    'let low = t[0]',
    'let high = t[0]',
    'for (const n of t) {',
    '  if (n < low) low = n',
    '  if (n > high) high = n',
    '}',
    'return high - low',
  ),
  cases: [
    [[[3, 10, 4]], 7],
    [[[5]], 0],
    [[[-2, 3]], 5],
  ],
  forbid: [...noMax, ...noMin],
})

add({
  title: 'Dentro del intervalo',
  name: 'isBetween',
  params: 'n, low, high',
  ts: 'n: number, low: number, high: number): boolean',
  prompt: 'Di si n está entre low y high, inclusive.\nEjemplo: 3, 1, 3 → true. 0, 1, 3 → false.',
  used: 'dos comparaciones unidas con &&',
  explanation: 'Inclusive quiere decir que los extremos cuentan. >= y <= lo expresan. Las dos condiciones tienen que cumplirse a la vez.',
  body: b('return n >= low && n <= high'),
  cases: [
    [[3, 1, 3], true],
    [[0, 1, 3], false],
    [[1, 1, 3], true],
  ],
})

add({
  title: 'Rotar a la izquierda',
  name: 'rotateLeft',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Devuelve t rotado un puesto a la izquierda. El primero pasa al final. El vacío se queda vacío.\nEjemplo: [1, 2, 3] → [2, 3, 1].',
  used: 'slice y concat',
  explanation: 'slice(1) es todo menos el primero. Se le concatena el primero al final. En el vacío no hay primero, así que se devuelve otro array vacío.',
  body: b('if (t.length === 0) return []', 'return t.slice(1).concat(t[0])'),
  cases: [
    [[[1, 2, 3]], [2, 3, 1]],
    [[[1]], [1]],
    [[[]], []],
  ],
})

add({
  title: 'Rotar a la derecha',
  name: 'rotateRight',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Devuelve t rotado un puesto a la derecha. El último pasa al principio.\nEjemplo: [1, 2, 3] → [3, 1, 2].',
  used: 'el último índice, un array de un elemento y slice',
  explanation: 'El último elemento forma un array de una pieza y delante se concatena el resto, que es slice(0, -1): todo menos el último.',
  body: b('if (t.length === 0) return []', 'return [t[t.length - 1]].concat(t.slice(0, -1))'),
  cases: [
    [[[1, 2, 3]], [3, 1, 2]],
    [[[]], []],
  ],
})

add({
  title: 'Suma de índices pares',
  name: 'sumEvenIndexes',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Suma los elementos que están en índices pares: 0, 2, 4...\nEjemplo: [1, 2, 3, 4] → 4.',
  used: 'bucle con paso 2',
  explanation: 'El índice 0 es par. Sumar 2 salta los impares. No se mira el valor, se mira la posición.',
  body: b('let total = 0', 'for (let i = 0; i < t.length; i += 2) total += t[i]', 'return total'),
  cases: [
    [[[1, 2, 3, 4]], 4],
    [[[10]], 10],
    [[[]], 0],
  ],
})

add({
  title: 'Saludo',
  name: 'hello',
  params: 'name',
  ts: 'name: string): string',
  prompt: 'Si name está vacío, devuelve "Hola". Si no, "Hola, " seguido del nombre.\nEjemplo: "Ana" → "Hola, Ana".',
  used: 'if y concatenación',
  explanation: 'El string vacío es falsy, así que !name distingue el saludo sin nombre. El otro caso añade una coma y un espacio, que forman parte del texto pedido.',
  body: b("if (!name) return 'Hola'", "return 'Hola, ' + name"),
  cases: [
    [['Ana'], 'Hola, Ana'],
    [[''], 'Hola'],
  ],
})

add({
  title: 'Plural simple',
  name: 'pluralize',
  params: 'word, n',
  ts: 'word: string, n: number): string',
  prompt: 'Si n es 1, devuelve word. En cualquier otro caso, word más una s.\nEjemplo: "gato", 1 → "gato". "gato", 2 → "gatos".',
  used: 'un if sobre el número',
  explanation: 'Es un plural mecánico, no el del diccionario: no contempla "luz" ni "lápices". La única excepción es el singular, n === 1.',
  body: b("if (n === 1) return word", "return word + 's'"),
  cases: [
    [['gato', 1], 'gato'],
    [['gato', 2], 'gatos'],
    [['gato', 0], 'gatos'],
  ],
})

add({
  title: 'Diferencia absoluta',
  name: 'absDiff',
  params: 'a, b',
  ts: 'a: number, b: number): number',
  prompt: 'Devuelve la distancia entre a y b, siempre positiva o cero. No uses Math.abs.\nEjemplo: 3, 10 → 7.',
  used: 'restar en el orden que no da negativo',
  explanation: 'Si a es mayor, a - b ya es positivo. Si no, se resta al revés. No importa el orden de entrada.',
  body: b('return a > b ? a - b : b - a'),
  cases: [
    [[3, 10], 7],
    [[10, 3], 7],
    [[4, 4], 0],
  ],
  forbid: noAbs,
})

add({
  title: 'Cifras',
  name: 'digits',
  params: 'n',
  ts: 'n: number): number[]',
  prompt: 'Devuelve las cifras de n, de izquierda a derecha. n es un entero mayor o igual que 0.\nEjemplo: 405 → [4, 0, 5]. 0 → [0].',
  used: 'resto entre 10, un array y reverse',
  explanation: 'El resto entre 10 saca las cifras de derecha a izquierda. Se guardan así y al final se invierte el array. El 0 es un caso aparte: el bucle no daría ninguna vuelta y perderíamos la cifra.',
  body: b(
    'if (n === 0) return [0]',
    'const out = []',
    'let rest = n',
    'while (rest > 0) {',
    '  out.push(rest % 10)',
    '  rest = Math.floor(rest / 10)',
    '}',
    'return out.reverse()',
  ),
  cases: [
    [[405], [4, 0, 5]],
    [[0], [0]],
    [[8], [8]],
  ],
})

add({
  title: 'Número al revés',
  name: 'reverseNumber',
  params: 'n',
  ts: 'n: number): number',
  prompt: 'Invierte las cifras de n y devuelve el número. n es un entero mayor o igual que 0. Los ceros a la izquierda del resultado desaparecen.\nEjemplo: 120 → 21.',
  used: 'resto entre 10 y construir el número multiplicando por 10',
  explanation: 'Cada cifra nueva se coloca a la derecha: resultado * 10 + cifra. Un cero a la izquierda del resultado no cambia el valor numérico, por eso 100 acaba en 1.',
  body: b(
    'let rest = n',
    'let out = 0',
    'while (rest > 0) {',
    '  out = out * 10 + (rest % 10)',
    '  rest = Math.floor(rest / 10)',
    '}',
    'return out',
  ),
  cases: [
    [[120], 21],
    [[100], 1],
    [[0], 0],
    [[45], 54],
  ],
})

add({
  title: 'Número de Armstrong',
  name: 'isArmstrong',
  params: 'n',
  ts: 'n: number): boolean',
  prompt: 'Di si n es igual a la suma de sus cifras elevadas al número de cifras. n es un entero mayor o igual que 0. Los de una cifra cuentan.\nEjemplo: 153 → true, porque 1³ + 5³ + 3³ = 153.',
  used: 'String(n), un bucle para la potencia y un acumulador',
  explanation: 'La potencia no es siempre 3: depende de cuántas cifras haya. Cada cifra se eleva a esa longitud multiplicando en un bucle, y se suma. Al final se compara con n.',
  body: b(
    'const text = String(n)',
    'let total = 0',
    'for (const ch of text) {',
    '  let power = 1',
    '  const digit = Number(ch)',
    '  for (let i = 0; i < text.length; i++) power *= digit',
    '  total += power',
    '}',
    'return total === n',
  ),
  cases: [
    [[153], true],
    [[154], false],
    [[370], true],
    [[5], true],
  ],
})

add({
  title: 'Pasos de Collatz',
  name: 'collatzSteps',
  params: 'n',
  ts: 'n: number): number',
  prompt: 'Cuenta cuántos pasos hacen falta para llegar a 1. Si n es par se divide entre 2; si es impar, pasa a 3n + 1. n es un entero mayor o igual que 1. Desde 1 hay 0 pasos.\nEjemplo: 3 → 7.',
  used: 'bucle while y el resto para saber si es par',
  explanation: 'Mientras el valor no sea 1, se aplica una de las dos reglas y se cuenta un paso. El 1 ya está en el destino, así que el bucle no entra.',
  body: b(
    'let steps = 0',
    'let rest = n',
    'while (rest !== 1) {',
    '  rest = rest % 2 === 0 ? rest / 2 : rest * 3 + 1',
    '  steps++',
    '}',
    'return steps',
  ),
  cases: [
    [[1], 0],
    [[2], 1],
    [[3], 7],
  ],
})

add({
  title: 'Suma de cuadrados',
  name: 'sumOfSquares',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Suma el cuadrado de cada número de t.\nEjemplo: [2, 3] → 13.',
  used: 'bucle y multiplicación del número por sí mismo',
  explanation: 'El cuadrado es n * n. Se acumula igual que una suma normal. El array vacío da 0.',
  body: b('let total = 0', 'for (const n of t) total += n * n', 'return total'),
  cases: [
    [[[2, 3]], 13],
    [[[]], 0],
    [[[-2]], 4],
  ],
})

add({
  title: 'Palabras largas',
  name: 'filterLongerThan',
  params: 'words, n',
  ts: 'words: string[], n: number): string[]',
  prompt: 'Devuelve las palabras cuya longitud es mayor que n, en el mismo orden.\nEjemplo: ["a", "hola"], 2 → ["hola"].',
  used: 'bucle y length',
  explanation: 'Se copia la palabra solo si tiene más caracteres que n. "mayor que" deja fuera a las que miden exactamente n.',
  body: b('const out = []', 'for (const word of words) if (word.length > n) out.push(word)', 'return out'),
  cases: [
    [[['a', 'hola'], 2], ['hola']],
    [[['aa', 'bb'], 2], []],
  ],
})

add({
  title: 'Empieza por vocal',
  name: 'startsWithVowel',
  params: 'text',
  ts: 'text: string): boolean',
  prompt: 'Di si text empieza por vocal, sin contar la y. Ignora mayúsculas. El vacío es false.\nEjemplo: "Ola" → true. "sol" → false.',
  used: 'el primer carácter e includes',
  explanation: 'Solo importa text[0]. Se busca en un string con las vocales en los dos casos. Si no hay primer carácter, es false.',
  body: b("if (!text) return false", "return 'aeiouAEIOU'.includes(text[0])"),
  cases: [
    [['Ola'], true],
    [['Hola'], false],
    [['sol'], false],
    [[''], false],
    [['y'], false],
  ],
})

add({
  title: 'Palabras con inicial',
  name: 'countWordsStartingWith',
  params: 'words, ch',
  ts: 'words: string[], ch: string): number',
  prompt: 'Cuenta cuántas palabras empiezan por ch. Ignora mayúsculas. ch es una letra.\nEjemplo: ["ana", "aro", "sol"], "a" → 2.',
  used: 'bucle, el índice 0 y toLowerCase',
  explanation: 'De cada palabra se mira solo la primera letra, en minúsculas, y se compara con ch también en minúsculas. Una palabra vacía no cuenta.',
  body: b(
    'let total = 0',
    'const needle = ch.toLowerCase()',
    'for (const word of words) {',
    '  if (word && word[0].toLowerCase() === needle) total++',
    '}',
    'return total',
  ),
  cases: [
    [[['ana', 'aro', 'sol'], 'a'], 2],
    [[['Ana'], 'a'], 1],
    [[['', 'sol'], 's'], 1],
  ],
})

add({
  title: 'Sumar en paralelo',
  name: 'zipAdd',
  params: 'a, b',
  ts: 'a: number[], b: number[]): number[]',
  prompt: 'Suma a[i] + b[i] mientras haya pareja. Si uno es más corto, se ignora el resto del otro.\nEjemplo: [1, 2, 3], [10, 20] → [11, 22].',
  used: 'un índice compartido y el mínimo de las dos longitudes',
  explanation: 'No se puede leer más allá del array corto. El límite del bucle es la menor de las dos longitudes. Cada posición produce una suma.',
  body: b(
    'const out = []',
    'const size = a.length < b.length ? a.length : b.length',
    'for (let i = 0; i < size; i++) out.push(a[i] + b[i])',
    'return out',
  ),
  cases: [
    [[[1, 2, 3], [10, 20]], [11, 22]],
    [[[1], [2, 3]], [3]],
    [[[], [1]], []],
  ],
})

add({
  title: 'Intercalar',
  name: 'interleave',
  params: 'a, b',
  ts: 'a: number[], b: number[]): number[]',
  prompt: 'Intercala a y b. Si uno se acaba, se copian los que queden del otro.\nEjemplo: [1, 2], [3, 4, 5] → [1, 3, 2, 4, 5].',
  used: 'un bucle hasta la longitud mayor y dos if',
  explanation: 'En cada índice se intenta coger de a y de b. El if evita leer una posición que ya no existe. Por eso el resultado no corta en el array más corto, a diferencia de zipAdd.',
  body: b(
    'const out = []',
    'const size = a.length > b.length ? a.length : b.length',
    'for (let i = 0; i < size; i++) {',
    '  if (i < a.length) out.push(a[i])',
    '  if (i < b.length) out.push(b[i])',
    '}',
    'return out',
  ),
  cases: [
    [[[1, 2], [3, 4, 5]], [1, 3, 2, 4, 5]],
    [[[1], []], [1]],
    [[[], []], []],
  ],
})

add({
  title: 'Todos iguales',
  name: 'allEqual',
  params: 't',
  ts: 't: number[]): boolean',
  prompt: 'Di si todos los elementos de t son iguales. El vacío es true.\nEjemplo: [2, 2, 2] → true. [2, 3] → false.',
  used: 'comparar cada elemento con el primero',
  explanation: 'Si todos son iguales al primero, son iguales entre sí. El vacío no tiene un contraejemplo. Un solo elemento también es true.',
  body: b('for (let i = 1; i < t.length; i++) if (t[i] !== t[0]) return false', 'return true'),
  cases: [
    [[[2, 2, 2]], true],
    [[[2, 3]], false],
    [[[]], true],
  ],
})

add({
  title: 'De uno en uno',
  name: 'increasingByOne',
  params: 't',
  ts: 't: number[]): boolean',
  prompt: 'Di si cada número es exactamente el anterior más 1. El vacío y un solo elemento son true.\nEjemplo: [3, 4, 5] → true. [3, 5] → false.',
  used: 'bucle que mira la diferencia con el anterior',
  explanation: 'No basta con que crezca: tiene que crecer de uno en uno. Se compara t[i] con t[i - 1] + 1.',
  body: b('for (let i = 1; i < t.length; i++) if (t[i] !== t[i - 1] + 1) return false', 'return true'),
  cases: [
    [[[3, 4, 5]], true],
    [[[3, 5]], false],
    [[[9]], true],
  ],
})

add({
  title: 'Positivos a uno',
  name: 'positivesToOne',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Devuelve una copia de t donde cada positivo pasa a ser 1. Cero y negativos se quedan igual.\nEjemplo: [-2, 0, 5] → [-2, 0, 1].',
  used: 'map y un ternario',
  explanation: 'map recorre y construye el array nuevo. El ternario distingue el positivo del resto. El cero no es positivo, así que se conserva.',
  body: b('return t.map((n) => (n > 0 ? 1 : n))'),
  cases: [
    [[[-2, 0, 5]], [-2, 0, 1]],
    [[[]], []],
  ],
})

add({
  title: 'Contar impares',
  name: 'countOdds',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Cuenta los impares de t. Los números son enteros, también negativos.\nEjemplo: [1, 2, -3] → 2.',
  used: 'bucle y el resto distinto de 0',
  explanation: 'En JavaScript, -3 % 2 es -1, no 1. Por eso la condición no es === 1, sino !== 0: cualquier resto no nulo es impar.',
  body: b('let total = 0', 'for (const n of t) if (n % 2 !== 0) total++', 'return total'),
  cases: [
    [[[1, 2, -3]], 2],
    [[[2, 4]], 0],
    [[[]], 0],
  ],
})

add({
  title: 'Pareja que suma',
  name: 'hasPairSum',
  params: 't, target',
  ts: 't: number[], target: number): boolean',
  prompt: 'Di si hay dos índices distintos cuyos valores suman target.\nEjemplo: [2, 7, 4], 6 → true. [1, 2], 4 → false.',
  used: 'dos bucles anidados con j = i + 1',
  explanation: 'Cada pareja se mira una vez: j empieza después de i, así que no se usa el mismo índice dos veces ni se repite la pareja al revés. Es el mismo esquema que el producto 30, con dos niveles en vez de tres.',
  body: b(
    'for (let i = 0; i < t.length; i++) {',
    '  for (let j = i + 1; j < t.length; j++) {',
    '    if (t[i] + t[j] === target) return true',
    '  }',
    '}',
    'return false',
  ),
  cases: [
    [[[2, 7, 4], 6], true],
    [[[1, 2], 4], false],
    [[[3, 3], 6], true],
  ],
})

add({
  title: 'Enmascarar el final',
  name: 'maskTail',
  params: 'text, n',
  ts: 'text: string, n: number): string',
  prompt: 'Sustituye los últimos n caracteres por asteriscos. Si n es mayor o igual que la longitud, todo el texto pasa a asteriscos. n es 0 o más.\nEjemplo: "secreto", 3 → "secr***".',
  used: 'slice y repeat',
  explanation: 'El prefijo visible es todo menos los n últimos caracteres. repeat construye la máscara de esa longitud. Si n se pasa de la longitud, no hay prefijo y el resultado son tantos asteriscos como caracteres había.',
  body: b(
    "if (n >= text.length) return '*'.repeat(text.length)",
    "return text.slice(0, text.length - n) + '*'.repeat(n)",
  ),
  cases: [
    [['secreto', 3], 'secr***'],
    [['ab', 5], '**'],
    [['ab', 0], 'ab'],
  ],
})

add({
  title: 'Triángulo de asteriscos',
  name: 'triangleStars',
  params: 'n',
  ts: 'n: number): string[]',
  prompt: 'Devuelve n líneas. La primera es "*", la segunda "**", y así hasta n asteriscos. Si n es 0, el array va vacío.\nEjemplo: 3 → ["*", "**", "***"].',
  used: 'bucle y repeat',
  explanation: 'La línea i tiene i asteriscos. repeat evita un bucle interno. El contador va de 1 a n.',
  body: b('const out = []', "for (let i = 1; i <= n; i++) out.push('*'.repeat(i))", 'return out'),
  cases: [
    [[3], ['*', '**', '***']],
    [[0], []],
  ],
})

add({
  title: 'César de una letra',
  name: 'caesar',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Desplaza cada letra una posición. La z pasa a ser a, y la Z pasa a ser A. El resto de caracteres se queda igual.\nEjemplo: "Az!" → "Ba!".',
  used: 'charCodeAt, fromCharCode y un caso para el borde z',
  explanation: 'Las letras ocupan códigos consecutivos. Sumar 1 al código avanza una letra. La z no tiene siguiente dentro del alfabeto, así que vuelve a la a. Mayúsculas y minúsculas son dos rangos distintos.',
  body: b(
    "let out = ''",
    'for (const ch of text) {',
    "  if (ch >= 'a' && ch <= 'z') out += ch === 'z' ? 'a' : String.fromCharCode(ch.charCodeAt(0) + 1)",
    "  else if (ch >= 'A' && ch <= 'Z') out += ch === 'Z' ? 'A' : String.fromCharCode(ch.charCodeAt(0) + 1)",
    '  else out += ch',
    '}',
    'return out',
  ),
  cases: [
    [['Az!'], 'Ba!'],
    [['abz'], 'bca'],
    [[''], ''],
  ],
})

add({
  title: 'Carácter central',
  name: 'middleChar',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Si text tiene longitud impar, devuelve el carácter central. Si es par, los dos centrales. text no está vacío.\nEjemplo: "abc" → "b". "abcd" → "bc".',
  used: 'length, división entera y slice o índices',
  explanation: 'Math.floor(length / 2) cae en el centro si la longitud es impar, y en el segundo de los dos centrales si es par. En el caso par hay que retroceder una posición para coger la pareja.',
  body: b(
    'const mid = Math.floor(text.length / 2)',
    'if (text.length % 2 === 1) return text[mid]',
    'return text[mid - 1] + text[mid]',
  ),
  cases: [
    [['abc'], 'b'],
    [['abcd'], 'bc'],
    [['ab'], 'ab'],
  ],
})

add({
  title: 'Cambiar extremos',
  name: 'swapEnds',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Devuelve una copia de t con el primero y el último intercambiados. Si hay menos de dos elementos, devuelve una copia igual.\nEjemplo: [1, 2, 3, 4] → [4, 2, 3, 1].',
  used: 'slice para copiar y un intercambio con una variable temporal',
  explanation: 'No se puede hacer a = b; b = a, porque se pierde el valor original. Una variable temporal guarda el primero, se copia el último encima y luego la temporal va al final. slice evita modificar t.',
  body: b(
    'if (t.length < 2) return t.slice()',
    'const out = t.slice()',
    'const first = out[0]',
    'out[0] = out[out.length - 1]',
    'out[out.length - 1] = first',
    'return out',
  ),
  cases: [
    [[[1, 2, 3, 4]], [4, 2, 3, 1]],
    [[[7]], [7]],
    [[[]], []],
  ],
})

add({
  title: 'Suma entre dos',
  name: 'sumBetween',
  params: 'a, b',
  ts: 'a: number, b: number): number',
  prompt: 'Suma los enteros desde el menor de a y b hasta el mayor, inclusive. a y b son enteros.\nEjemplo: 3, 5 → 12. 5, 3 → 12.',
  used: 'ordenar los extremos y un bucle',
  explanation: 'El enunciado no dice que a sea el menor. Se calculan low y high y se suma el rango cerrado. Si son iguales, el bucle da una vuelta y devuelve ese número.',
  body: b(
    'let total = 0',
    'const low = a < b ? a : b',
    'const high = a < b ? b : a',
    'for (let i = low; i <= high; i++) total += i',
    'return total',
  ),
  cases: [
    [[3, 5], 12],
    [[5, 3], 12],
    [[4, 4], 4],
  ],
})

add({
  title: 'Repetir carácter',
  name: 'repeatChar',
  params: 'ch, times',
  ts: 'ch: string, times: number): string',
  prompt: 'Devuelve ch repetido times veces. times es 0 o más y ch es un carácter.\nEjemplo: "*", 4 → "****".',
  used: 'bucle y concatenación',
  explanation: 'Es el mismo acumulador de repeatText, con un carácter. times 0 deja el string vacío porque el bucle no entra.',
  body: b("let out = ''", 'for (let i = 0; i < times; i++) out += ch', 'return out'),
  cases: [
    [['*', 4], '****'],
    [['a', 0], ''],
    [['b', 1], 'b'],
  ],
})

if (specs.length !== 100) {
  throw new Error(`junior tiene ${specs.length}`)
}
