function b(...rows) {
  return rows.map((row) => `  ${row}`).join('\n')
}

/** @type {any[]} */
export const specs = []
function add(spec) {
  specs.push(spec)
}

const memoProbe = `
if (typeof memoize !== "function") throw new Error("Define memoize.");
var calls = 0;
var double = memoize(function (n) { calls++; return n * 2; });
if (double(2) !== 4 || double(2) !== 4 || calls !== 1) throw new Error("La segunda llamada con el mismo argumento debe salir de la caché.");
if (double(3) !== 6 || calls !== 2) throw new Error("Un argumento nuevo sí se calcula.");
console.log("Correcto. La caché evita repetir el cálculo.");
`

const onceProbe = `
if (typeof once !== "function") throw new Error("Define once.");
var calls = 0;
var greet = once(function (name) { calls++; return "Hola, " + name; });
if (greet("Ana") !== "Hola, Ana") throw new Error("La primera llamada debe ejecutar la función.");
if (greet("Luis") !== "Hola, Ana" || calls !== 1) throw new Error("Las siguientes devuelven el primer resultado sin volver a llamar.");
console.log("Correcto. once solo ejecuta la función una vez.");
`

add({
  title: 'Palabras concatenadas',
  name: 'findAllConcatenatedWordsInADict',
  params: 'words',
  ts: 'words: string[]): string[]',
  prompt:
    'Given a table of unique words, return those that can be formed by concatenating at least two other words from the array.\nExample: ["cat", "dog", "catdog"] → ["catdog"].\nNombre: findAllConcatenatedWordsInADict. Conserva el orden del array.',
  used: 'Set para buscar en O(1) de media y una función recursiva que parte la palabra',
  explanation:
    'Una palabra vale si se puede cortar en un prefijo que está en el diccionario y un resto que también está, o que a su vez se puede construir. El corte tiene al menos un carácter a cada lado, así que la palabra no se forma sola. El Set evita recorrer el array en cada búsqueda.',
  body: b(
    'const set = new Set(words)',
    'function canBuild(word) {',
    '  for (let i = 1; i < word.length; i++) {',
    '    const left = word.slice(0, i)',
    '    const right = word.slice(i)',
    '    if (set.has(left) && (set.has(right) || canBuild(right))) return true',
    '  }',
    '  return false',
    '}',
    'const out = []',
    'for (const word of words) if (canBuild(word)) out.push(word)',
    'return out',
  ),
  cases: [
    [[['cat', 'dog', 'catdog']], ['catdog']],
    [[['cat', 'dog', 'catdog', 'dogcat']], ['catdog', 'dogcat']],
    [[['cat', 'catcat']], ['catcat']],
    [[['a', 'b', 'ab', 'abc']], ['ab']],
  ],
})

add({
  title: 'Two sum',
  name: 'twoSum',
  params: 't, target',
  ts: 't: number[], target: number): number[] | null',
  prompt: 'Devuelve los índices de dos números que suman target, el menor primero. Si no hay pareja, null. Hay como mucho una.\nEjemplo: [2, 7, 11], 9 → [0, 1].',
  used: 'Map de valor a índice, un solo recorrido',
  explanation:
    'Para cada número se busca el complementario target - n en lo ya visto. Si está, esos dos índices son la respuesta. Si no, se guarda el número actual. Un Map da la búsqueda en tiempo medio constante, frente a dos bucles.',
  body: b(
    'const seen = new Map()',
    'for (let i = 0; i < t.length; i++) {',
    '  const need = target - t[i]',
    '  if (seen.has(need)) return [seen.get(need), i]',
    '  seen.set(t[i], i)',
    '}',
    'return null',
  ),
  cases: [
    [[[2, 7, 11], 9], [0, 1]],
    [[[3, 3], 6], [0, 1]],
    [[[1, 2, 3], 7], null],
  ],
})

add({
  title: 'Anagrama',
  name: 'isAnagram',
  params: 'a, b',
  ts: 'a: string, b: string): boolean',
  prompt: 'Di si a y b tienen las mismas letras con las mismas repeticiones. Importan mayúsculas.\nEjemplo: "roma", "amor" → true. "aab", "abb" → false.',
  used: 'Map de conteos',
  explanation:
    'Si las longitudes difieren, no pueden ser anagramas. Se cuenta cada letra de a y se descuenta con b. Un conteo negativo significa que b trae una letra de más.',
  body: b(
    'if (a.length !== b.length) return false',
    'const count = new Map()',
    'for (const ch of a) count.set(ch, (count.get(ch) ?? 0) + 1)',
    'for (const ch of b) {',
    '  const next = (count.get(ch) ?? 0) - 1',
    '  if (next < 0) return false',
    '  count.set(ch, next)',
    '}',
    'return true',
  ),
  cases: [
    [['roma', 'amor'], true],
    [['aab', 'abb'], false],
    [['ab', 'abc'], false],
  ],
})

add({
  title: 'Agrupar anagramas',
  name: 'groupAnagrams',
  params: 'words',
  ts: 'words: string[]): string[][]',
  prompt: 'Agrupa las palabras que son anagramas. El orden de los grupos es el de la primera palabra de cada uno. Dentro del grupo, el orden de entrada.\nEjemplo: ["eat", "tea", "tan", "bat"] → [["eat", "tea"], ["tan"], ["bat"]].',
  used: 'Map cuya clave es la palabra ordenada',
  explanation:
    'Dos anagramas, al ordenar sus letras, producen la misma clave. Se meten en la lista de esa clave. Las claves salen en orden de aparición porque Map conserva la inserción.',
  body: b(
    'const groups = new Map()',
    'for (const word of words) {',
    "  const key = word.split('').sort().join('')",
    '  const list = groups.get(key) ?? []',
    '  list.push(word)',
    '  groups.set(key, list)',
    '}',
    'return [...groups.values()]',
  ),
  cases: [
    [[['eat', 'tea', 'tan', 'bat']], [['eat', 'tea'], ['tan'], ['bat']]],
    [[[]], []],
  ],
})

add({
  title: 'Aplanar un nivel',
  name: 'flattenOnce',
  params: 't',
  ts: 't: unknown[]): unknown[]',
  prompt: 'Aplana solo un nivel. Un array dentro de un array interior se queda como array.\nEjemplo: [[1, 2], [3], 4] → [1, 2, 3, 4]. [1, [2, [3]]] → [1, 2, [3]].',
  used: 'Array.isArray y un bucle',
  explanation:
    'Si el elemento es un array, se copian sus hijos. Si no, se copia el elemento. No se vuelve a mirar si esos hijos son arrays: por eso es un solo nivel.',
  body: b(
    'const out = []',
    'for (const item of t) {',
    '  if (Array.isArray(item)) {',
    '    for (const inner of item) out.push(inner)',
    '  } else out.push(item)',
    '}',
    'return out',
  ),
  cases: [
    [[[[1, 2], [3], 4]], [1, 2, 3, 4]],
    [[[1, [2, [3]]]], [1, 2, [3]]],
  ],
})

add({
  title: 'Aplanar del todo',
  name: 'flattenDeep',
  params: 't',
  ts: 't: unknown[]): unknown[]',
  prompt: 'Aplana todos los niveles de arrays.\nEjemplo: [1, [2, [3]], 4] → [1, 2, 3, 4].',
  used: 'recursión y Array.isArray',
  explanation:
    'Si el valor es un array, se aplana cada hijo. Si no, es una hoja y se guarda. La recursión baja hasta que ya no quedan arrays.',
  body: b(
    'const out = []',
    'function walk(value) {',
    '  if (Array.isArray(value)) {',
    '    for (const item of value) walk(item)',
    '  } else out.push(value)',
    '}',
    'walk(t)',
    'return out',
  ),
  cases: [
    [[[1, [2, [3]], 4]], [1, 2, 3, 4]],
    [[[]], []],
  ],
})

add({
  title: 'Trocear',
  name: 'chunk',
  params: 't, size',
  ts: 't: number[], size: number): number[][]',
  prompt: 'Parte t en trozos de size. El último puede ser más corto. size es al menos 1.\nEjemplo: [1, 2, 3, 4, 5], 2 → [[1, 2], [3, 4], [5]].',
  used: 'bucle con paso size y slice',
  explanation:
    'El índice salta de size en size. slice(i, i + size) corta sin pasarse del final, así que el último trozo sale más corto solo.',
  body: b(
    'const out = []',
    'for (let i = 0; i < t.length; i += size) out.push(t.slice(i, i + size))',
    'return out',
  ),
  cases: [
    [[[1, 2, 3, 4, 5], 2], [[1, 2], [3, 4], [5]]],
    [[[1, 2], 5], [[1, 2]]],
  ],
})

add({
  title: 'Intersección',
  name: 'intersection',
  params: 'a, b',
  ts: 'a: number[], b: number[]): number[]',
  prompt: 'Devuelve los valores que están en a y en b, sin repetir, en el orden de a.\nEjemplo: [1, 2, 2, 3], [2, 4, 2] → [2].',
  used: 'dos Set',
  explanation:
    'El Set de b responde en tiempo medio constante si un valor de a existe. El segundo Set evita devolver dos veces un valor que se repite en a.',
  body: b(
    'const set = new Set(b)',
    'const out = []',
    'const seen = new Set()',
    'for (const n of a) {',
    '  if (set.has(n) && !seen.has(n)) {',
    '    seen.add(n)',
    '    out.push(n)',
    '  }',
    '}',
    'return out',
  ),
  cases: [
    [[[1, 2, 2, 3], [2, 4, 2]], [2]],
    [[[1], [2]], []],
  ],
})

add({
  title: 'Diferencia',
  name: 'difference',
  params: 'a, b',
  ts: 'a: number[], b: number[]): number[]',
  prompt: 'Devuelve los valores de a que no están en b, sin repetir, en el orden de a.\nEjemplo: [1, 2, 2, 3], [2] → [1, 3].',
  used: 'Set de b y Set de lo ya emitido',
  explanation:
    'Se recorre a. Si el valor no está en b y no se ha emitido ya, entra en el resultado. b solo sirve de consulta.',
  body: b(
    'const set = new Set(b)',
    'const out = []',
    'const seen = new Set()',
    'for (const n of a) {',
    '  if (!set.has(n) && !seen.has(n)) {',
    '    seen.add(n)',
    '    out.push(n)',
    '  }',
    '}',
    'return out',
  ),
  cases: [
    [[[1, 2, 2, 3], [2]], [1, 3]],
    [[[1, 2], []], [1, 2]],
  ],
})

add({
  title: 'Unión',
  name: 'union',
  params: 'a, b',
  ts: 'a: number[], b: number[]): number[]',
  prompt: 'Devuelve los valores de a y luego los de b que aún no estaban, sin repetir.\nEjemplo: [1, 2, 2], [2, 3] → [1, 2, 3].',
  used: 'concat y un Set de vistos',
  explanation:
    'Se recorre a y después b. El Set recuerda lo ya añadido, así que la primera aparición gana y el orden se conserva.',
  body: b(
    'const out = []',
    'const seen = new Set()',
    'for (const n of a.concat(b)) {',
    '  if (!seen.has(n)) {',
    '    seen.add(n)',
    '    out.push(n)',
    '  }',
    '}',
    'return out',
  ),
  cases: [
    [[[1, 2, 2], [2, 3]], [1, 2, 3]],
    [[[], [4, 4]], [4]],
  ],
})

add({
  title: 'Frecuencias',
  name: 'frequency',
  params: 't',
  ts: 't: number[]): Record<string, number>',
  prompt: 'Devuelve un objeto con cuántas veces aparece cada número. Las claves salen en orden de aparición.\nEjemplo: [3, 1, 3] → { "3": 2, "1": 1 }.',
  used: 'objeto como mapa y el operador ??',
  explanation:
    'Las claves de un objeto son strings, aunque el array sea de números. Cada valor suma 1 a su contador. El orden de inserción de las claves es el de la primera vez que aparecen.',
  body: b(
    'const out = {}',
    'for (const n of t) out[n] = (out[n] ?? 0) + 1',
    'return out',
  ),
  cases: [
    [[[3, 1, 3]], { 3: 2, 1: 1 }],
    [[[]], {}],
  ],
})

add({
  title: 'El más frecuente',
  name: 'mostFrequent',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Devuelve el número que más se repite. t no está vacío. Si empatan, el que llegó antes a ese conteo.\nEjemplo: [1, 2, 2, 1] → 2. [1, 1, 2, 2] → 1.',
  used: 'Map de conteos y una comparación estricta',
  explanation:
    'Se incrementa el conteo de cada valor. Solo se cambia el ganador si el nuevo conteo es mayor, no si empata. Por eso el que alcanzó antes esa cifra se queda.',
  body: b(
    'const count = new Map()',
    'let best = t[0]',
    'let times = 0',
    'for (const n of t) {',
    '  const next = (count.get(n) ?? 0) + 1',
    '  count.set(n, next)',
    '  if (next > times) {',
    '    times = next',
    '    best = n',
    '  }',
    '}',
    'return best',
  ),
  cases: [
    [[[1, 2, 2, 1]], 2],
    [[[1, 1, 2, 2]], 1],
    [[[7]], 7],
  ],
})

add({
  title: 'Primera letra única',
  name: 'firstUniqueChar',
  params: 'text',
  ts: 'text: string): number',
  prompt: 'Devuelve el índice de la primera letra que aparece una sola vez, o -1.\nEjemplo: "leetcode" → 0. "aabb" → -1. "loveleetcode" → 2.',
  used: 'Map de conteos y un segundo recorrido',
  explanation:
    'El primer recorrido cuenta. El segundo busca el primer índice cuyo conteo es 1. Hacen falta los dos: durante el primero todavía no se sabe si la letra se repetirá.',
  body: b(
    'const count = new Map()',
    'for (const ch of text) count.set(ch, (count.get(ch) ?? 0) + 1)',
    'for (let i = 0; i < text.length; i++) if (count.get(text[i]) === 1) return i',
    'return -1',
  ),
  cases: [
    [['leetcode'], 0],
    [['aabb'], -1],
    [['loveleetcode'], 2],
  ],
})

add({
  title: 'Paréntesis válidos',
  name: 'validParentheses',
  params: 'text',
  ts: 'text: string): boolean',
  prompt: 'Di si (), [] y {} están bien cerrados y en orden. Otros caracteres se ignoran.\nEjemplo: "([])" → true. "([)]" → false. "" → true.',
  used: 'pila',
  explanation:
    'Cada apertura se apila. Cada cierre tiene que coincidir con la cima: lo último que se abrió es lo primero que se cierra. Al final la pila debe quedar vacía, si no quedó algo sin cerrar.',
  body: b(
    "const pairs = { ')': '(', ']': '[', '}': '{' }",
    'const stack = []',
    'for (const ch of text) {',
    "  if (ch === '(' || ch === '[' || ch === '{') stack.push(ch)",
    '  else if (pairs[ch]) {',
    '    if (stack.pop() !== pairs[ch]) return false',
    '  }',
    '}',
    'return stack.length === 0',
  ),
  cases: [
    [['([])'], true],
    [['([)]'], false],
    [[''], true],
    [['('], false],
    [['a(b)c'], true],
  ],
})

add({
  title: 'Comprimir repeticiones',
  name: 'compressRle',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Comprime las rachas. Una letra sola no lleva número.\nEjemplo: "aaabbc" → "a3b2c". "abc" → "abc". "" → "".',
  used: 'un contador de racha y un bucle hasta length inclusive',
  explanation:
    'Se cuenta mientras el carácter sea el mismo que el anterior. Al cambiar, se vuelca la letra y, si la racha es mayor que 1, el número. El bucle llega una posición más allá del final para volcar la última racha.',
  body: b(
    "if (!text) return ''",
    "let out = ''",
    'let count = 1',
    'for (let i = 1; i <= text.length; i++) {',
    '  if (text[i] === text[i - 1]) count++',
    '  else {',
    '    out += text[i - 1] + (count > 1 ? String(count) : "")',
    '    count = 1',
    '  }',
    '}',
    'return out',
  ),
  cases: [
    [['aaabbc'], 'a3b2c'],
    [['abc'], 'abc'],
    [[''], ''],
    [['aaaa'], 'a4'],
  ],
})

add({
  title: 'Prefijo común',
  name: 'longestCommonPrefix',
  params: 'words',
  ts: 'words: string[]): string',
  prompt: 'Devuelve el prefijo más largo compartido por todas las palabras. Si no hay palabras, "".\nEjemplo: ["flor", "flujo", "florista"] → "fl".',
  used: 'un candidato que se acorta con slice y startsWith',
  explanation:
    'Se toma la primera palabra como candidato. Mientras la siguiente no empiece por ese candidato, se le quita la última letra. Al final sobrevive solo lo común.',
  body: b(
    "if (words.length === 0) return ''",
    'let prefix = words[0]',
    'for (const word of words) {',
    '  while (!word.startsWith(prefix)) prefix = prefix.slice(0, -1)',
    '}',
    'return prefix',
  ),
  cases: [
    [[['flor', 'flujo', 'florista']], 'fl'],
    [[['a', 'b']], ''],
    [[[]], ''],
  ],
})

add({
  title: 'Ceros al final',
  name: 'moveZeroes',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Devuelve un array nuevo con los no ceros en el mismo orden y los ceros al final.\nEjemplo: [0, 1, 0, 3] → [1, 3, 0, 0].',
  used: 'dos pasadas: copiar no ceros y rellenar ceros',
  explanation:
    'Primero se copian los valores distintos de cero, conservando el orden. Después se añaden ceros hasta recuperar la longitud original.',
  body: b(
    'const out = []',
    'for (const n of t) if (n !== 0) out.push(n)',
    'while (out.length < t.length) out.push(0)',
    'return out',
  ),
  cases: [
    [[[0, 1, 0, 3]], [1, 3, 0, 0]],
    [[[1, 2]], [1, 2]],
  ],
})

add({
  title: 'Sumar uno',
  name: 'plusOne',
  params: 'digits',
  ts: 'digits: number[]): number[]',
  prompt: 'digits es un número grande, una cifra por posición, sin ceros a la izquierda salvo el propio 0. Devuelve ese número más 1, en el mismo formato.\nEjemplo: [1, 2, 9] → [1, 3, 0]. [9, 9] → [1, 0, 0].',
  used: 'recorrido desde el final y acarreo',
  explanation:
    'Se suma 1 a la última cifra. Si no es 9, se acaba. Si es 9, pasa a 0 y el acarreo sigue hacia la izquierda. Si todas eran 9, hay que añadir un 1 delante.',
  body: b(
    'const out = digits.slice()',
    'for (let i = out.length - 1; i >= 0; i--) {',
    '  if (out[i] < 9) {',
    '    out[i]++',
    '    return out',
    '  }',
    '  out[i] = 0',
    '}',
    'out.unshift(1)',
    'return out',
  ),
  cases: [
    [[[1, 2, 9]], [1, 3, 0]],
    [[[9, 9]], [1, 0, 0]],
    [[[0]], [1]],
  ],
})

add({
  title: 'El que no se repite',
  name: 'singleNumber',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Todos los números aparecen dos veces menos uno, que aparece una. Devuélvelo.\nEjemplo: [4, 1, 2, 1, 2] → 4.',
  used: 'XOR, el operador ^',
  explanation:
    'XOR de un número consigo mismo es 0, y XOR con 0 es el propio número. Al mezclar todos, las parejas se anulan y queda el que estaba solo. Es lineal y no usa memoria extra.',
  body: b('let acc = 0', 'for (const n of t) acc ^= n', 'return acc'),
  cases: [
    [[[4, 1, 2, 1, 2]], 4],
    [[[7]], 7],
  ],
})

add({
  title: 'Número que falta',
  name: 'missingNumber',
  params: 't',
  ts: 't: number[]): number',
  prompt: 't contiene n números distintos tomados de 0 a n, y falta uno. Devuélvelo. n es t.length.\nEjemplo: [3, 0, 1] → 2.',
  used: 'la suma de Gauss  n * (n + 1) / 2',
  explanation:
    'La suma de 0 a n es n * (n + 1) / 2. Si se restan los valores que sí están, lo que queda es el que falta. También valdría un Set, con más memoria.',
  body: b(
    'const n = t.length',
    'let total = (n * (n + 1)) / 2',
    'for (const value of t) total -= value',
    'return total',
  ),
  cases: [
    [[[3, 0, 1]], 2],
    [[[0, 1]], 2],
    [[[1]], 0],
  ],
})

add({
  title: '¿Hay duplicado?',
  name: 'containsDuplicate',
  params: 't',
  ts: 't: number[]): boolean',
  prompt: 'Di si algún número aparece más de una vez.\nEjemplo: [1, 2, 3, 1] → true. [1, 2, 3] → false.',
  used: 'Set y comparar tamaños',
  explanation:
    'Un Set guarda cada valor una sola vez. Si el Set es más pequeño que el array, algo se repitió.',
  body: b('return new Set(t).size !== t.length'),
  cases: [
    [[[1, 2, 3, 1]], true],
    [[[1, 2, 3]], false],
    [[[]], false],
  ],
})

add({
  title: 'Two sum ordenado',
  name: 'twoSumSorted',
  params: 't, target',
  ts: 't: number[], target: number): number[] | null',
  prompt: 't está ordenado de menor a mayor. Devuelve dos índices distintos que suman target, o null.\nEjemplo: [1, 2, 4, 6], 6 → [1, 2].',
  used: 'dos punteros, uno a cada extremo',
  explanation:
    'Como está ordenado, si la suma se pasa se baja el extremo derecho, y si se queda corta se sube el izquierdo. No hace falta un Map: el orden da la dirección.',
  body: b(
    'let i = 0',
    'let j = t.length - 1',
    'while (i < j) {',
    '  const sum = t[i] + t[j]',
    '  if (sum === target) return [i, j]',
    '  if (sum < target) i++',
    '  else j--',
    '}',
    'return null',
  ),
  cases: [
    [[[1, 2, 4, 6], 6], [1, 2]],
    [[[1, 2, 3], 10], null],
  ],
})

add({
  title: 'Subarray de suma máxima',
  name: 'maxSubarraySum',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Devuelve la suma máxima de un subarray contiguo. t no está vacío y puede tener negativos.\nEjemplo: [-2, 1, -3, 4, -1, 2, 1, -5, 4] → 6.',
  used: 'Kadane: la mejor suma que termina en cada posición',
  explanation:
    'En cada posición se elige entre empezar de nuevo en ese número o alargar la suma anterior. El máximo de esas decisiones es la respuesta. Es lineal y no prueba todos los subarrays.',
  body: b(
    'let best = t[0]',
    'let current = t[0]',
    'for (let i = 1; i < t.length; i++) {',
    '  current = current + t[i] > t[i] ? current + t[i] : t[i]',
    '  if (current > best) best = current',
    '}',
    'return best',
  ),
  cases: [
    [[[-2, 1, -3, 4, -1, 2, 1, -5, 4]], 6],
    [[[-3, -1, -2]], -1],
    [[[5]], 5],
  ],
})

add({
  title: 'Mejor momento para vender',
  name: 'maxProfit',
  params: 'prices',
  ts: 'prices: number[]): number',
  prompt: 'prices[i] es el precio el día i. Una compra y una venta, la venta después. Devuelve el máximo beneficio, o 0 si no hay.\nEjemplo: [7, 1, 5, 3, 6, 4] → 5.',
  used: 'el mínimo visto hasta ahora y un bucle',
  explanation:
    'No se puede vender antes de comprar. Se guarda el precio más bajo visto y, cada día, se mira la ganancia si se vendiera hoy. El mejor de esos beneficios es la respuesta.',
  body: b(
    'let best = 0',
    'let low = prices[0]',
    'for (const price of prices) {',
    '  if (price < low) low = price',
    '  const gain = price - low',
    '  if (gain > best) best = gain',
    '}',
    'return best',
  ),
  cases: [
    [[[7, 1, 5, 3, 6, 4]], 5],
    [[[7, 6, 4]], 0],
  ],
})

add({
  title: 'Subir escaleras',
  name: 'climbStairs',
  params: 'n',
  ts: 'n: number): number',
  prompt: 'Para subir n escalones se puede avanzar 1 o 2. ¿De cuántas formas? n es al menos 1.\nEjemplo: 3 → 3. 5 → 8.',
  used: 'programación dinámica con dos variables, la sucesión de Fibonacci',
  explanation:
    'Las formas de llegar al escalón i son las de llegar a i-1 (y subir 1) más las de llegar a i-2 (y subir 2). No hace falta guardar todo el array: bastan los dos anteriores.',
  body: b(
    'if (n <= 2) return n',
    'let a = 1',
    'let b = 2',
    'for (let i = 3; i <= n; i++) {',
    '  const next = a + b',
    '  a = b',
    '  b = next',
    '}',
    'return b',
  ),
  cases: [
    [[1], 1],
    [[2], 2],
    [[3], 3],
    [[5], 8],
  ],
})

add({
  title: 'Robar casas',
  name: 'houseRobber',
  params: 't',
  ts: 't: number[]): number',
  prompt: 't[i] es el dinero de la casa i. No se pueden robar dos casas seguidas. Devuelve el máximo. El array puede estar vacío.\nEjemplo: [1, 2, 3, 1] → 4. [2, 7, 9, 3, 1] → 12.',
  used: 'programación dinámica: mejor hasta la casa anterior y hasta la de antes',
  explanation:
    'En cada casa se elige el máximo entre no robarla (se queda lo anterior) o robarla (lo de dos casas atrás más esta). Se avanza con dos variables, sin guardar toda la tabla.',
  body: b(
    'let prev = 0',
    'let curr = 0',
    'for (const n of t) {',
    '  const next = curr > prev + n ? curr : prev + n',
    '  prev = curr',
    '  curr = next',
    '}',
    'return curr',
  ),
  cases: [
    [[[1, 2, 3, 1]], 4],
    [[[2, 7, 9, 3, 1]], 12],
    [[[]], 0],
  ],
})

add({
  title: 'Fibonacci',
  name: 'fib',
  params: 'n',
  ts: 'n: number): number',
  prompt: 'Devuelve el término n de Fibonacci. fib(0) es 0, fib(1) es 1, y cada uno es la suma de los dos anteriores. n es 0 o más.\nEjemplo: 6 → 8.',
  used: 'bucle con dos variables, sin recursión',
  explanation:
    'La versión recursiva repite los mismos cálculos. El bucle guarda solo los dos últimos términos y avanza hasta n. El coste es lineal y la memoria, constante.',
  body: b(
    'if (n <= 1) return n',
    'let a = 0',
    'let b = 1',
    'for (let i = 2; i <= n; i++) {',
    '  const next = a + b',
    '  a = b',
    '  b = next',
    '}',
    'return b',
  ),
  cases: [
    [[0], 0],
    [[1], 1],
    [[6], 8],
  ],
})

add({
  title: 'Búsqueda binaria',
  name: 'binarySearch',
  params: 't, target',
  ts: 't: number[], target: number): number',
  prompt: 't está ordenado de menor a mayor. Devuelve un índice de target, o -1.\nEjemplo: [1, 3, 5, 7], 5 → 2.',
  used: 'dos límites y el punto medio',
  explanation:
    'En cada paso se mira el centro del tramo que queda. Si el centro es menor, el objetivo está a la derecha; si es mayor, a la izquierda. El tramo se parte por la mitad, así que el coste es logarítmico. Solo funciona porque el array está ordenado.',
  body: b(
    'let low = 0',
    'let high = t.length - 1',
    'while (low <= high) {',
    '  const mid = Math.floor((low + high) / 2)',
    '  if (t[mid] === target) return mid',
    '  if (t[mid] < target) low = mid + 1',
    '  else high = mid - 1',
    '}',
    'return -1',
  ),
  cases: [
    [[[1, 3, 5, 7], 5], 2],
    [[[1, 3, 5, 7], 4], -1],
    [[[1], 1], 0],
  ],
})

add({
  title: 'Dónde insertar',
  name: 'searchInsert',
  params: 't, target',
  ts: 't: number[], target: number): number',
  prompt: 't está ordenado y no tiene repetidos. Devuelve el índice de target, o el índice donde habría que insertarlo para que siga ordenado.\nEjemplo: [1, 3, 5], 2 → 1. [1, 3, 5], 6 → 3.',
  used: 'búsqueda binaria del límite inferior',
  explanation:
    'El límite derecho empieza en length, no en length - 1, porque la inserción puede caer al final. Se busca el primer índice cuyo valor no es menor que target. Ese es el sitio.',
  body: b(
    'let low = 0',
    'let high = t.length',
    'while (low < high) {',
    '  const mid = Math.floor((low + high) / 2)',
    '  if (t[mid] < target) low = mid + 1',
    '  else high = mid',
    '}',
    'return low',
  ),
  cases: [
    [[[1, 3, 5], 2], 1],
    [[[1, 3, 5], 6], 3],
    [[[1, 3, 5], 1], 0],
  ],
})

add({
  title: 'Fusionar intervalos',
  name: 'mergeIntervals',
  params: 'intervals',
  ts: 'intervals: number[][]): number[][]',
  prompt: 'Cada intervalo es [inicio, fin], con inicio <= fin. Fusiona los que se solapan o se tocan. Devuélvelos ordenados por el inicio.\nEjemplo: [[1, 3], [2, 6], [8, 10]] → [[1, 6], [8, 10]].',
  used: 'ordenar por el inicio y extender el último intervalo',
  explanation:
    'Ordenados por el inicio, un intervalo solo puede solaparse con el último ya fusionado. Si empieza después de que ese acabe, es uno nuevo. Si no, se alarga el fin si hace falta.',
  body: b(
    'const sorted = intervals.slice().sort((a, b) => a[0] - b[0])',
    'const out = []',
    'for (const interval of sorted) {',
    '  const last = out[out.length - 1]',
    '  if (!last || interval[0] > last[1]) out.push(interval.slice())',
    '  else if (interval[1] > last[1]) last[1] = interval[1]',
    '}',
    'return out',
  ),
  cases: [
    [[[[1, 3], [2, 6], [8, 10]]], [[1, 6], [8, 10]]],
    [[[[1, 4], [4, 5]]], [[1, 5]]],
    [[[]], []],
  ],
})

add({
  title: 'Memoizar',
  name: 'memoize',
  params: 'fn',
  ts: 'fn: (arg: number) => number): (arg: number) => number',
  prompt:
    'Devuelve una función que llama a fn la primera vez para cada argumento numérico y, después, devuelve el resultado guardado.\nEjemplo: si fn cuenta sus llamadas, la segunda vez con el mismo número el contador no sube.',
  used: 'closure y Map',
  explanation:
    'La función devuelta cierra sobre un Map. La clave es el argumento. Si ya está, se devuelve el valor guardado y fn no se vuelve a llamar. Sirve para cálculos puros: si fn depende de algo externo, la caché mentiría.',
  javascript:
    'function memoize(fn) {\n  const cache = new Map()\n  return function (arg) {\n    if (cache.has(arg)) return cache.get(arg)\n    const value = fn(arg)\n    cache.set(arg, value)\n    return value\n  }\n}\n',
  typescript:
    'function memoize(fn: (arg: number) => number): (arg: number) => number {\n  const cache = new Map<number, number>()\n  return (arg) => {\n    if (cache.has(arg)) return cache.get(arg) as number\n    const value = fn(arg)\n    cache.set(arg, value)\n    return value\n  }\n}\n',
  probe: memoProbe,
})

add({
  title: 'Solo una vez',
  name: 'once',
  params: 'fn',
  ts: 'fn: (...args: string[]) => string): (...args: string[]) => string',
  prompt: 'Devuelve una función que ejecuta fn solo en la primera llamada. Las demás devuelven ese mismo resultado, aunque cambien los argumentos.',
  used: 'closure, una bandera y apply',
  explanation:
    'La bandera used vive en el closure, no en la función original. La primera llamada guarda el resultado. Las siguientes ni siquiera miran los argumentos nuevos: devuelven lo guardado.',
  javascript:
    'function once(fn) {\n  let used = false\n  let value\n  return function () {\n    if (used) return value\n    used = true\n    value = fn.apply(null, arguments)\n    return value\n  }\n}\n',
  typescript:
    'function once(fn: (...args: string[]) => string): (...args: string[]) => string {\n  let used = false\n  let value: string\n  return (...args) => {\n    if (used) return value\n    used = true\n    value = fn(...args)\n    return value\n  }\n}\n',
  probe: onceProbe,
})

add({
  title: 'Igualdad profunda',
  name: 'deepEqual',
  params: 'a, b',
  ts: 'a: unknown, b: unknown): boolean',
  prompt: 'Compara valores, arrays y objetos planos en profundidad. El orden de las claves no importa. No hay funciones ni fechas.\nEjemplo: { b: 1, a: [2] } y { a: [2], b: 1 } → true.',
  used: 'recursión, Object.keys y Array.isArray',
  explanation:
    '=== basta para números, strings y null. Para objetos hay que comparar cada clave, y para arrays el orden sí importa porque las claves son los índices. La recursión baja por los anidados. JSON.stringify no sirve si las claves van en distinto orden.',
  body: b(
    'if (a === b) return true',
    "if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false",
    'if (Array.isArray(a) !== Array.isArray(b)) return false',
    'const keysA = Object.keys(a)',
    'const keysB = Object.keys(b)',
    'if (keysA.length !== keysB.length) return false',
    'for (const key of keysA) {',
    '  if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEqual(a[key], b[key])) return false',
    '}',
    'return true',
  ),
  cases: [
    [[{ b: 1, a: [2] }, { a: [2], b: 1 }], true],
    [[[1, 2], [2, 1]], false],
    [[null, {}], false],
  ],
})

add({
  title: 'Clonar en profundidad',
  name: 'deepClone',
  params: 'value',
  ts: 'value: unknown): unknown',
  prompt: 'Devuelve una copia profunda de un valor JSON: objetos planos, arrays, números, strings, booleanos y null. Cambiar la copia no cambia el original.',
  used: 'recursión, Array.isArray y Object.keys',
  explanation:
    'JSON.parse(JSON.stringify(value)) clona este subconjunto, pero esconde el recorrido. Aquí cada array y cada objeto se crean de nuevo y sus hijos se clonan. Los primitivos se devuelven tal cual porque no se comparten.',
  body: b(
    "if (typeof value !== 'object' || value === null) return value",
    'if (Array.isArray(value)) return value.map((item) => deepClone(item))',
    'const out = {}',
    'for (const key of Object.keys(value)) out[key] = deepClone(value[key])',
    'return out',
  ),
  cases: [
    [[[{ a: [1] }]], [{ a: [1] }]],
    [[null], null],
    [['hola'], 'hola'],
  ],
})

add({
  title: 'Leer una ruta',
  name: 'getPath',
  params: 'obj, path',
  ts: 'obj: unknown, path: string): unknown',
  prompt: 'Lee un valor siguiendo una ruta con puntos. Si un tramo no existe, devuelve null. La ruta vacía devuelve obj.\nEjemplo: { a: { b: 2 } }, "a.b" → 2. { a: 1 }, "a.c" → null.',
  used: 'split y un bucle que baja por el objeto',
  explanation:
    'Se parte la ruta por el punto. En cada tramo, si el valor actual no es un objeto o no tiene esa clave, se corta con null. Si la tiene, se baja. Así "a.b" es dos pasos, no una clave literal.',
  body: b(
    'let current = obj',
    "if (!path) return obj",
    "for (const key of path.split('.')) {",
    "  if (current === null || typeof current !== 'object' || !Object.prototype.hasOwnProperty.call(current, key)) return null",
    '  current = current[key]',
    '}',
    'return current',
  ),
  cases: [
    [[{ a: { b: 2 } }, 'a.b'], 2],
    [[{ a: 1 }, 'a.c'], null],
    [[{ a: 1 }, ''], { a: 1 }],
  ],
})

add({
  title: 'Agrupar por clave',
  name: 'groupBy',
  params: 'items, key',
  ts: 'items: Array<Record<string, string>>, key: string): Record<string, Array<Record<string, string>>>',
  prompt: 'Agrupa los objetos por el valor de key. Las claves del resultado salen en orden de aparición.\nEjemplo: [{ t: "a", n: "1" }, { t: "b", n: "2" }, { t: "a", n: "3" }], "t" → grupos a y b.',
  used: 'objeto de arrays',
  explanation:
    'Cada objeto cae en la lista de su grupo. Si la lista no existe, se crea. El orden dentro del grupo es el de entrada, y el de las claves es el de la primera vez que aparece ese grupo.',
  body: b(
    'const out = {}',
    'for (const item of items) {',
    '  const group = item[key]',
    '  if (!out[group]) out[group] = []',
    '  out[group].push(item)',
    '}',
    'return out',
  ),
  cases: [
    [
      [[{ t: 'a', n: '1' }, { t: 'b', n: '2' }, { t: 'a', n: '3' }], 't'],
      { a: [{ t: 'a', n: '1' }, { t: 'a', n: '3' }], b: [{ t: 'b', n: '2' }] },
    ],
  ],
})

add({
  title: 'Partir por un umbral',
  name: 'partition',
  params: 't, min',
  ts: 't: number[], min: number): number[][]',
  prompt: 'Devuelve dos arrays: los valores >= min y los demás, cada uno en el orden original.\nEjemplo: [1, 4, 2, 5], 3 → [[4, 5], [1, 2]].',
  used: 'dos arrays y un if',
  explanation:
    'Un predicado de función no viaja bien en los casos de prueba, así que el corte es un número. Cada elemento va a un lado o al otro, sin reordenar dentro del lado.',
  body: b(
    'const yes = []',
    'const no = []',
    'for (const n of t) {',
    '  if (n >= min) yes.push(n)',
    '  else no.push(n)',
    '}',
    'return [yes, no]',
  ),
  cases: [
    [[[1, 4, 2, 5], 3], [[4, 5], [1, 2]]],
    [[[1], 3], [[], [1]]],
  ],
})

add({
  title: 'Emparejar',
  name: 'zip',
  params: 'a, b',
  ts: 'a: number[], b: string[]): Array<[number, string]>',
  prompt: 'Devuelve parejas [a[i], b[i]] hasta que uno de los dos se acabe.\nEjemplo: [1, 2], ["a", "b", "c"] → [[1, "a"], [2, "b"]].',
  used: 'el mínimo de las longitudes',
  explanation:
    'Igual que sumar en paralelo, pero en vez de sumar se guarda la pareja. El array más largo pierde el resto.',
  body: b(
    'const out = []',
    'const size = a.length < b.length ? a.length : b.length',
    'for (let i = 0; i < size; i++) out.push([a[i], b[i]])',
    'return out',
  ),
  cases: [
    [[[1, 2], ['a', 'b', 'c']], [[1, 'a'], [2, 'b']]],
    [[[], ['a']], []],
  ],
})

add({
  title: 'Sumar un campo',
  name: 'sumBy',
  params: 'items, key',
  ts: 'items: Array<Record<string, number>>, key: string): number',
  prompt: 'Suma el campo numérico key de cada objeto.\nEjemplo: [{ n: 2 }, { n: 5 }], "n" → 7.',
  used: 'bucle y acceso por clave',
  explanation:
    'key es el nombre del campo, no el valor. item[key] saca el número y se acumula. Si la lista está vacía, la suma es 0.',
  body: b('let total = 0', 'for (const item of items) total += item[key]', 'return total'),
  cases: [
    [[[{ n: 2 }, { n: 5 }], 'n'], 7],
    [[[], 'n'], 0],
  ],
})

add({
  title: 'Isograma',
  name: 'isIsogram',
  params: 'text',
  ts: 'text: string): boolean',
  prompt: 'Di si ninguna letra se repite. Ignora mayúsculas y los caracteres que no son letras.\nEjemplo: "lumberjack" → true. "hello" → false.',
  used: 'Set y toLowerCase',
  explanation:
    'Se normaliza a minúsculas. Cada letra se mete en un Set. Si ya estaba, hay repetición. Espacios y signos no cuentan como letras.',
  body: b(
    'const seen = new Set()',
    'for (const ch of text.toLowerCase()) {',
    "  if (ch < 'a' || ch > 'z') continue",
    '  if (seen.has(ch)) return false',
    '  seen.add(ch)',
    '}',
    'return true',
  ),
  cases: [
    [['lumberjack'], true],
    [['hello'], false],
    [['Aa'], false],
  ],
})

add({
  title: 'Romano a entero',
  name: 'romanToInt',
  params: 'text',
  ts: 'text: string): number',
  prompt: 'Pasa un romano válido a entero. Si una letra menor va delante de una mayor, resta.\nEjemplo: "MCMXCIV" → 1994. "IV" → 4.',
  used: 'un objeto de valores y comparar con la letra siguiente',
  explanation:
    'I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Si el valor actual es menor que el siguiente, se resta; si no, se suma. Por eso IV es 5 - 1 y VI es 5 + 1.',
  body: b(
    'const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }',
    'let total = 0',
    'for (let i = 0; i < text.length; i++) {',
    '  const current = values[text[i]]',
    '  const next = values[text[i + 1]] ?? 0',
    '  total += current < next ? -current : current',
    '}',
    'return total',
  ),
  cases: [
    [['MCMXCIV'], 1994],
    [['IV'], 4],
    [['III'], 3],
  ],
})

add({
  title: 'Entero a romano',
  name: 'intToRoman',
  params: 'n',
  ts: 'n: number): string',
  prompt: 'Pasa n, entre 1 y 3999, a romano.\nEjemplo: 1994 → "MCMXCIV". 4 → "IV".',
  used: 'una tabla de valores de mayor a menor, incluidos los restadores',
  explanation:
    'La tabla incluye 900, 400, 90, 40, 9 y 4, no solo los símbolos sueltos. Se resta el mayor valor que quepa, tantas veces como se pueda, y se concatena su símbolo. El orden de la tabla evita combinaciones ilegales.',
  body: b(
    "const table = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]",
    'let rest = n',
    "let out = ''",
    'for (const [value, symbol] of table) {',
    '  while (rest >= value) {',
    '    out += symbol',
    '    rest -= value',
    '  }',
    '}',
    'return out',
  ),
  cases: [
    [[1994], 'MCMXCIV'],
    [[4], 'IV'],
    [[58], 'LVIII'],
  ],
})

add({
  title: 'Substring sin repetir',
  name: 'longestUniqueSubstring',
  params: 'text',
  ts: 'text: string): number',
  prompt: 'Devuelve la longitud del substring más largo sin caracteres repetidos.\nEjemplo: "abcabcbb" → 3. "bbbb" → 1. "" → 0.',
  used: 'ventana deslizante y Map con el último índice de cada carácter',
  explanation:
    'La ventana es el tramo sin repetidos que termina en i. Si el carácter ya estaba dentro de la ventana, el inicio salta a justo después de esa aparición. La longitud máxima de la ventana es la respuesta. Es lineal.',
  body: b(
    'const last = new Map()',
    'let best = 0',
    'let start = 0',
    'for (let i = 0; i < text.length; i++) {',
    '  const prev = last.get(text[i])',
    '  if (prev !== undefined && prev >= start) start = prev + 1',
    '  last.set(text[i], i)',
    '  const size = i - start + 1',
    '  if (size > best) best = size',
    '}',
    'return best',
  ),
  cases: [
    [['abcabcbb'], 3],
    [['bbbb'], 1],
    [[''], 0],
    [['pwwkew'], 3],
  ],
})

add({
  title: 'Palíndromo de frase',
  name: 'isPalindromePhrase',
  params: 'text',
  ts: 'text: string): boolean',
  prompt: 'Ignora mayúsculas y todo lo que no sea letra o dígito. Di si lo que queda es palíndromo.\nEjemplo: "A man, a plan, a canal: Panama" → true.',
  used: 'replace con una expresión regular y dos índices',
  explanation:
    'Primero se limpia el texto. Después es el palíndromo de dos punteros. La expresión /[^a-z0-9]/g quita lo que no sea letra o dígito ya en minúsculas.',
  body: b(
    "const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '')",
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
    [['A man, a plan, a canal: Panama'], true],
    [['race a car'], false],
    [[''], true],
  ],
})

add({
  title: 'Nota con recortes',
  name: 'canConstruct',
  params: 'note, magazine',
  ts: 'note: string, magazine: string): boolean',
  prompt: 'Di si se puede formar note usando letras de magazine. Cada letra del magazine se usa una vez como mucho.\nEjemplo: "aa", "aab" → true. "aa", "ab" → false.',
  used: 'Map de conteos',
  explanation:
    'Se cuenta el magazine. Cada letra de la nota descuenta uno. Si alguna se queda sin stock, no se puede construir. El orden no importa, solo las cantidades.',
  body: b(
    'const count = new Map()',
    'for (const ch of magazine) count.set(ch, (count.get(ch) ?? 0) + 1)',
    'for (const ch of note) {',
    '  const left = count.get(ch) ?? 0',
    '  if (left === 0) return false',
    '  count.set(ch, left - 1)',
    '}',
    'return true',
  ),
  cases: [
    [['aa', 'aab'], true],
    [['aa', 'ab'], false],
    [['', 'abc'], true],
  ],
})

add({
  title: 'Sumas acumuladas',
  name: 'runningSum',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Devuelve las sumas parciales: out[i] es la suma de t[0] a t[i].\nEjemplo: [1, 2, 3] → [1, 3, 6].',
  used: 'un acumulador y push',
  explanation:
    'Cada posición es la anterior más el valor nuevo. No hace falta volver a sumar desde el principio.',
  body: b(
    'const out = []',
    'let total = 0',
    'for (const n of t) {',
    '  total += n',
    '  out.push(total)',
    '}',
    'return out',
  ),
  cases: [
    [[[1, 2, 3]], [1, 3, 6]],
    [[[]], []],
  ],
})

add({
  title: 'Índice pivote',
  name: 'pivotIndex',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Devuelve el índice cuya suma a la izquierda es igual a la suma a la derecha. Si hay varios, el menor. Si no hay, -1.\nEjemplo: [1, 7, 3, 6, 5, 6] → 3.',
  used: 'la suma total y una suma izquierda que avanza',
  explanation:
    'La suma derecha es total - izquierda - valor actual. Si coinciden, ese índice es el pivote. La izquierda se actualiza después de la comparación, para no incluir el pivote en ningún lado.',
  body: b(
    'let total = 0',
    'for (const n of t) total += n',
    'let left = 0',
    'for (let i = 0; i < t.length; i++) {',
    '  if (left === total - left - t[i]) return i',
    '  left += t[i]',
    '}',
    'return -1',
  ),
  cases: [
    [[[1, 7, 3, 6, 5, 6]], 3],
    [[[1, 2, 3]], -1],
    [[[2, 1, -1]], 0],
  ],
})

add({
  title: 'Cuadrados ordenados',
  name: 'sortedSquares',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 't está ordenado y puede tener negativos. Devuelve los cuadrados, ordenados de menor a mayor.\nEjemplo: [-4, -1, 0, 3, 10] → [0, 1, 9, 16, 100].',
  used: 'dos punteros desde los extremos',
  explanation:
    'El cuadrado más grande está en un extremo, porque los negativos grandes, al cuadrado, superan a los positivos pequeños. Se comparan los valores absolutos de los extremos y se coloca el mayor al final del resultado. Es lineal; ordenar después de cuadrar sería n log n.',
  body: b(
    'const out = []',
    'let i = 0',
    'let j = t.length - 1',
    'while (i <= j) {',
    '  if (Math.abs(t[i]) > Math.abs(t[j])) {',
    '    out.push(t[i] * t[i])',
    '    i++',
    '  } else {',
    '    out.push(t[j] * t[j])',
    '    j--',
    '  }',
    '}',
    'return out.reverse()',
  ),
  cases: [
    [[[-4, -1, 0, 3, 10]], [0, 1, 9, 16, 100]],
    [[[-2, -1]], [1, 4]],
  ],
})

add({
  title: 'Invertir vocales',
  name: 'reverseVowels',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Invierte solo las vocales, mayúsculas incluidas. La y no es vocal.\nEjemplo: "hello" → "holle". "leetcode" → "leotcede".',
  used: 'dos punteros sobre un array de caracteres',
  explanation:
    'Un puntero busca una vocal desde la izquierda y otro desde la derecha. Cuando los dos están sobre vocales, se intercambian. Las consonantes no se mueven.',
  body: b(
    "const chars = text.split('')",
    "const vowel = (ch) => 'aeiouAEIOU'.includes(ch)",
    'let i = 0',
    'let j = chars.length - 1',
    'while (i < j) {',
    '  if (!vowel(chars[i])) i++',
    '  else if (!vowel(chars[j])) j--',
    '  else {',
    '    const tmp = chars[i]',
    '    chars[i] = chars[j]',
    '    chars[j] = tmp',
    '    i++',
    '    j--',
    '  }',
    '}',
    "return chars.join('')",
  ),
  cases: [
    [['hello'], 'holle'],
    [['leetcode'], 'leotcede'],
    [['a'], 'a'],
  ],
})

add({
  title: 'Alternar strings',
  name: 'mergeAlternately',
  params: 'a, b',
  ts: 'a: string, b: string): string',
  prompt: 'Intercala los caracteres de a y b. El que sobre, se copia al final.\nEjemplo: "abc", "pqr" → "apbqcr". "ab", "pqrs" → "apbqrs".',
  used: 'un índice hasta la longitud mayor',
  explanation:
    'En cada posición se añade el carácter de a si existe y el de b si existe. Cuando uno se acaba, el if correspondiente deja de aportar y el otro sigue.',
  body: b(
    "let out = ''",
    'const size = a.length > b.length ? a.length : b.length',
    'for (let i = 0; i < size; i++) {',
    '  if (i < a.length) out += a[i]',
    '  if (i < b.length) out += b[i]',
    '}',
    'return out',
  ),
  cases: [
    [['abc', 'pqr'], 'apbqcr'],
    [['ab', 'pqrs'], 'apbqrs'],
  ],
})

add({
  title: 'Divisor de strings',
  name: 'gcdOfStrings',
  params: 'a, b',
  ts: 'a: string, b: string): string',
  prompt: 'Devuelve el string más largo que, repetido, forma tanto a como b. Si no existe, "".\nEjemplo: "ABCABC", "ABC" → "ABC". "ABABAB", "ABAB" → "AB". "LEET", "CODE" → "".',
  used: 'el máximo común divisor de las longitudes y la comprobación a + b === b + a',
  explanation:
    'Si a y b no están hechos del mismo bloque, a + b y b + a difieren. Si coinciden, el bloque más grande mide el mcd de las dos longitudes. El mcd se calcula con el algoritmo de Euclides.',
  body: b(
    "if (a + b !== b + a) return ''",
    'function gcd(x, y) {',
    '  return y === 0 ? x : gcd(y, x % y)',
    '}',
    'return a.slice(0, gcd(a.length, b.length))',
  ),
  cases: [
    [['ABCABC', 'ABC'], 'ABC'],
    [['ABABAB', 'ABAB'], 'AB'],
    [['LEET', 'CODE'], ''],
  ],
})

add({
  title: 'Caramelos extra',
  name: 'kidsWithCandies',
  params: 'candies, extra',
  ts: 'candies: number[], extra: number): boolean[]',
  prompt: 'candies[i] son los caramelos del niño i. Di, para cada uno, si al darle extra caramelos alcanza o supera al que más tiene ahora.\nEjemplo: [2, 3, 5, 1, 3], 3 → [true, true, true, false, true].',
  used: 'el máximo y map',
  explanation:
    'El máximo actual no cambia al repartir el extra en la hipótesis de cada niño: se calcula una vez. Luego cada niño cumple si su cantidad más extra llega a ese máximo.',
  body: b(
    'let max = candies[0]',
    'for (const n of candies) if (n > max) max = n',
    'return candies.map((n) => n + extra >= max)',
  ),
  cases: [
    [[[2, 3, 5, 1, 3], 3], [true, true, true, false, true]],
  ],
})

add({
  title: 'Cuántos son menores',
  name: 'smallerNumbersThanCurrent',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Para cada número, cuenta cuántos del array son estrictamente menores.\nEjemplo: [8, 1, 2, 2, 3] → [4, 0, 1, 1, 3].',
  used: 'doble bucle',
  explanation:
    'Para cada posición se recorre el array entero y se cuentan los menores. Es cuadrático y claro. Ordenar y buscar el índice también vale, con cuidado de los repetidos.',
  body: b(
    'return t.map((n) => {',
    '  let total = 0',
    '  for (const other of t) if (other < n) total++',
    '  return total',
    '})',
  ),
  cases: [
    [[[8, 1, 2, 2, 3]], [4, 0, 1, 1, 3]],
  ],
})

add({
  title: 'Pasos hasta cero',
  name: 'numberOfSteps',
  params: 'n',
  ts: 'n: number): number',
  prompt: 'Cuenta los pasos para llegar a 0. Si es par se divide entre 2; si es impar se le resta 1. n es 0 o más.\nEjemplo: 14 → 6.',
  used: 'bucle while y el resto',
  explanation:
    'Es una variante de Collatz más simple: impar resta 1, par divide. Cada operación es un paso. El 0 ya está, así que no entra al bucle.',
  body: b(
    'let steps = 0',
    'let rest = n',
    'while (rest > 0) {',
    '  rest = rest % 2 === 0 ? rest / 2 : rest - 1',
    '  steps++',
    '}',
    'return steps',
  ),
  cases: [
    [[14], 6],
    [[0], 0],
    [[3], 3],
  ],
})

add({
  title: 'Producto de los dos mayores',
  name: 'maxProductTwo',
  params: 't',
  ts: 't: number[]): number',
  prompt: 't tiene al menos dos números, todos positivos. Devuelve el producto de los dos mayores.\nEjemplo: [3, 4, 5, 2] → 20.',
  used: 'un recorrido que guarda el mayor y el segundo',
  explanation:
    'No hace falta ordenar. Se mantienen el mayor y el siguiente. Cuando aparece uno nuevo en cabeza, el antiguo mayor pasa a segundo.',
  body: b(
    'let first = -Infinity',
    'let second = -Infinity',
    'for (const n of t) {',
    '  if (n > first) {',
    '    second = first',
    '    first = n',
    '  } else if (n > second) second = n',
    '}',
    'return first * second',
  ),
  cases: [
    [[[3, 4, 5, 2]], 20],
    [[[1, 8]], 8],
  ],
})

add({
  title: 'Longitud de la última palabra',
  name: 'lengthOfLastWord',
  params: 'text',
  ts: 'text: string): number',
  prompt: 'Devuelve la longitud de la última palabra. Puede haber espacios de más.\nEjemplo: "  fly me to the moon  " → 4.',
  used: 'trim y split',
  explanation:
    'trim quita los espacios de los extremos para que la última pieza del split sea la palabra, no un string vacío.',
  body: b(
    'const words = text.trim().split(/\\s+/)',
    'return words[words.length - 1].length',
  ),
  cases: [
    [['Hello World'], 5],
    [['  fly me to the moon  '], 4],
  ],
})

add({
  title: 'Buscar aguja',
  name: 'strStr',
  params: 'text, needle',
  ts: 'text: string, needle: string): number',
  prompt: 'Devuelve el primer índice de needle en text, o -1. La aguja vacía está en el índice 0. No uses indexOf.\nEjemplo: "hola", "la" → 2.',
  used: 'bucle y slice de la longitud de la aguja',
  explanation:
    'Se prueba cada inicio donde la aguja todavía cabe. slice compara ese tramo. Es la búsqueda ingenua, cuadrática en el peor caso. KMP lo bajaría a lineal, a cambio de una tabla de fallos.',
  body: b(
    "if (needle === '') return 0",
    'for (let i = 0; i <= text.length - needle.length; i++) {',
    '  if (text.slice(i, i + needle.length) === needle) return i',
    '}',
    'return -1',
  ),
  cases: [
    [['hola', 'la'], 2],
    [['hola', 'z'], -1],
    [['hola', ''], 0],
  ],
})

add({
  title: 'Sumar números enormes',
  name: 'addStrings',
  params: 'a, b',
  ts: 'a: string, b: string): string',
  prompt: 'a y b son enteros no negativos escritos como texto, sin ceros a la izquierda salvo "0". Devuelve la suma como texto, sin convertir el número entero completo.\nEjemplo: "999", "1" → "1000".',
  used: 'dos índices desde el final y acarreo',
  explanation:
    'Un número de cien cifras no cabe bien en un Number. Se suman cifra a cifra desde la derecha, como en papel, y el acarreo pasa a la siguiente. El resultado se construye por delante.',
  body: b(
    'let i = a.length - 1',
    'let j = b.length - 1',
    'let carry = 0',
    "let out = ''",
    'while (i >= 0 || j >= 0 || carry) {',
    '  const sum = (i >= 0 ? Number(a[i]) : 0) + (j >= 0 ? Number(b[j]) : 0) + carry',
    '  out = String(sum % 10) + out',
    '  carry = Math.floor(sum / 10)',
    '  i--',
    '  j--',
    '}',
    'return out',
  ),
  cases: [
    [['999', '1'], '1000'],
    [['11', '123'], '134'],
    [['0', '0'], '0'],
  ],
})

add({
  title: 'Columna de Excel',
  name: 'excelColumn',
  params: 'n',
  ts: 'n: number): string',
  prompt: 'Convierte un número de columna, desde 1, a letras de Excel. 1 → "A", 26 → "Z", 27 → "AA", 28 → "AB".',
  used: 'base 26 que empieza en 1, restando 1 antes del resto',
  explanation:
    'No es una base 26 normal porque no hay cifra cero: A es 1, no 0. Por eso se resta 1 antes de tomar el resto entre 26. Ese ajuste hace que 26 sea Z y 27 vuelva a empezar en AA.',
  body: b(
    "let rest = n",
    "let out = ''",
    'while (rest > 0) {',
    '  rest--',
    '  out = String.fromCharCode(65 + (rest % 26)) + out',
    '  rest = Math.floor(rest / 26)',
    '}',
    'return out',
  ),
  cases: [
    [[1], 'A'],
    [[26], 'Z'],
    [[27], 'AA'],
    [[28], 'AB'],
  ],
})

add({
  title: 'Unos en binario',
  name: 'countBits',
  params: 'n',
  ts: 'n: number): number[]',
  prompt: 'Devuelve un array de longitud n + 1. La posición i dice cuántos unos tiene i en binario.\nEjemplo: 2 → [0, 1, 1].',
  used: 'máscara de bits & 1 y desplazamiento',
  explanation:
    'x & 1 es el bit menos significativo. x >>= 1 lo descarta. Se cuenta hasta que el número se queda en 0. El 0 tiene cero unos.',
  body: b(
    'const out = []',
    'for (let i = 0; i <= n; i++) {',
    '  let x = i',
    '  let bits = 0',
    '  while (x > 0) {',
    '    bits += x & 1',
    '    x >>= 1',
    '  }',
    '  out.push(bits)',
    '}',
    'return out',
  ),
  cases: [
    [[2], [0, 1, 1]],
    [[5], [0, 1, 1, 2, 1, 2]],
  ],
})

add({
  title: 'Peso de Hamming',
  name: 'hammingWeight',
  params: 'n',
  ts: 'n: number): number',
  prompt: 'Cuenta los unos de n en binario. n es un entero mayor o igual que 0.\nEjemplo: 11 → 3, porque 1011.',
  used: 'resto entre 2 o máscara, y división entera',
  explanation:
    'Es el mismo conteo que en countBits, para un solo número. Math.floor(x / 2) evita sorpresas de signo con el desplazamiento, aunque aquí n no es negativo.',
  body: b(
    'let bits = 0',
    'let x = n',
    'while (x > 0) {',
    '  bits += x & 1',
    '  x = Math.floor(x / 2)',
    '}',
    'return bits',
  ),
  cases: [
    [[11], 3],
    [[0], 0],
    [[8], 1],
  ],
})

add({
  title: 'Potencia de dos',
  name: 'isPowerOfTwo',
  params: 'n',
  ts: 'n: number): boolean',
  prompt: 'Di si n es una potencia de dos. n es un entero. Los negativos y el 0 no lo son.\nEjemplo: 16 → true. 12 → false.',
  used: 'el truco n & (n - 1)',
  explanation:
    'Una potencia de dos en binario es un único uno. Restar 1 pone ese uno a cero y los bits de su derecha a uno. El AND de los dos es 0 solo en ese caso. Hay que excluir n <= 0, porque el truco no habla de ellos.',
  body: b('return n > 0 && (n & (n - 1)) === 0'),
  cases: [
    [[16], true],
    [[12], false],
    [[1], true],
    [[0], false],
  ],
})

add({
  title: 'Triángulo de Pascal',
  name: 'pascalTriangle',
  params: 'n',
  ts: 'n: number): number[][]',
  prompt: 'Devuelve las primeras n filas del triángulo de Pascal. Cada número es la suma de los dos que tiene encima. n es 0 o más.\nEjemplo: 3 → [[1], [1, 1], [1, 2, 1]].',
  used: 'la fila anterior y un bucle',
  explanation:
    'Los extremos de cada fila son 1. El interior suma el vecino izquierdo y el derecho de la fila de arriba. Si el de la derecha no existe, cuenta como 0: eso cubre el final de la fila.',
  body: b(
    'const out = []',
    'for (let row = 0; row < n; row++) {',
    '  const line = [1]',
    '  for (let col = 1; col <= row; col++) {',
    '    const prev = out[row - 1]',
    '    const left = prev[col - 1] ?? 0',
    '    const right = prev[col] ?? 0',
    '    line.push(left + right)',
    '  }',
    '  out.push(line)',
    '}',
    'return out',
  ),
  cases: [
    [[3], [[1], [1, 1], [1, 2, 1]]],
    [[1], [[1]]],
    [[0], []],
  ],
})

add({
  title: 'Número feliz',
  name: 'isHappy',
  params: 'n',
  ts: 'n: number): boolean',
  prompt: 'Sustituye n por la suma de los cuadrados de sus cifras, y repite. Es feliz si llega a 1. Si entra en un ciclo, no. n es un entero positivo.\nEjemplo: 19 → true. 2 → false.',
  used: 'un Set de vistos para cortar el ciclo',
  explanation:
    'Sin memoria, un ciclo infinito no se detecta. Se guardan los números ya vistos. Si reaparece uno antes de llegar a 1, no es feliz. El 1 sí lo es.',
  body: b(
    'const seen = new Set()',
    'let rest = n',
    'while (rest !== 1 && !seen.has(rest)) {',
    '  seen.add(rest)',
    '  let next = 0',
    '  while (rest > 0) {',
    '    const digit = rest % 10',
    '    next += digit * digit',
    '    rest = Math.floor(rest / 10)',
    '  }',
    '  rest = next',
    '}',
    'return rest === 1',
  ),
  cases: [
    [[19], true],
    [[2], false],
    [[1], true],
  ],
})

add({
  title: 'Elemento mayoritario',
  name: 'majorityElement',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Hay un número que aparece más de t.length / 2 veces. Devuélvelo. t no está vacío.\nEjemplo: [2, 2, 1, 1, 1, 2, 2] → 2.',
  used: 'voto de Boyer-Moore',
  explanation:
    'Se lleva un candidato y un conteo. Un valor igual suma; uno distinto resta. Cuando el conteo llega a 0, el siguiente valor es el nuevo candidato. El mayoritario sobrevive porque tiene más apariciones que el resto junto. No comprueba el resultado: el enunciado garantiza que existe.',
  body: b(
    'let candidate = t[0]',
    'let count = 0',
    'for (const n of t) {',
    '  if (count === 0) candidate = n',
    '  count += n === candidate ? 1 : -1',
    '}',
    'return candidate',
  ),
  cases: [
    [[[3, 2, 3]], 3],
    [[[2, 2, 1, 1, 1, 2, 2]], 2],
  ],
})

add({
  title: 'Producto excepto uno',
  name: 'productExceptSelf',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'out[i] es el producto de todos los de t menos t[i]. No uses división. t tiene al menos dos números.\nEjemplo: [1, 2, 3, 4] → [24, 12, 8, 6].',
  used: 'un prefijo por la izquierda y un sufijo por la derecha',
  explanation:
    'La división fallaría con ceros y el enunciado la prohíbe. Primero cada posición guarda el producto de lo que hay a su izquierda. Después se multiplica por el producto de lo que hay a la derecha, de atrás hacia delante.',
  body: b(
    'const out = []',
    'let left = 1',
    'for (let i = 0; i < t.length; i++) {',
    '  out.push(left)',
    '  left *= t[i]',
    '}',
    'let right = 1',
    'for (let i = t.length - 1; i >= 0; i--) {',
    '  out[i] *= right',
    '  right *= t[i]',
    '}',
    'return out',
  ),
  cases: [
    [[[1, 2, 3, 4]], [24, 12, 8, 6]],
    [[[2, 3]], [3, 2]],
  ],
})

add({
  title: 'Números desaparecidos',
  name: 'findDisappeared',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 't tiene n números, cada uno entre 1 y n, y puede repetir. Devuelve los de 1 a n que no aparecen, en orden.\nEjemplo: [4, 3, 2, 7, 8, 2, 3, 1] → [5, 6].',
  used: 'Set y un bucle de 1 a n',
  explanation:
    'El Set dice en tiempo medio constante si un número del rango está. Se recorre el rango, no el array, para devolverlos en orden.',
  body: b(
    'const seen = new Set(t)',
    'const out = []',
    'for (let n = 1; n <= t.length; n++) if (!seen.has(n)) out.push(n)',
    'return out',
  ),
  cases: [
    [[[4, 3, 2, 7, 8, 2, 3, 1]], [5, 6]],
    [[[1, 1]], [2]],
  ],
})

add({
  title: 'Plantar flores',
  name: 'canPlaceFlowers',
  params: 'bed, n',
  ts: 'bed: number[], n: number): boolean',
  prompt: 'bed es un arriate: 1 ocupado, 0 vacío. No se pueden plantar dos flores en celdas adyacentes, ni junto a una ya plantada. ¿Caben n flores nuevas?\nEjemplo: [1, 0, 0, 0, 1], 1 → true. El mismo arriate con 2 → false.',
  used: 'un recorrido que planta en una copia cuando los vecinos están libres',
  explanation:
    'Una celda vacía sirve si la de la izquierda y la de la derecha también lo están. Los extremos no tienen un vecino: ese lado cuenta como libre. Se planta de inmediato para que la siguiente celda lo vea. Se trabaja sobre una copia para no depender de mutar el argumento.',
  body: b(
    'const row = bed.slice()',
    'let placed = 0',
    'for (let i = 0; i < row.length; i++) {',
    '  const empty = row[i] === 0',
    '  const left = i === 0 || row[i - 1] === 0',
    '  const right = i === row.length - 1 || row[i + 1] === 0',
    '  if (empty && left && right) {',
    '    row[i] = 1',
    '    placed++',
    '  }',
    '}',
    'return placed >= n',
  ),
  cases: [
    [[[1, 0, 0, 0, 1], 1], true],
    [[[1, 0, 0, 0, 1], 2], false],
    [[[0, 0, 0], 2], true],
  ],
})

add({
  title: 'Saltar el array',
  name: 'jumpGame',
  params: 't',
  ts: 't: number[]): boolean',
  prompt: 'Desde el índice i se puede avanzar hasta t[i] pasos. Di si se puede llegar al último índice.\nEjemplo: [2, 3, 1, 1, 4] → true. [3, 2, 1, 0, 4] → false.',
  used: 'el alcance máximo visto',
  explanation:
    'No hace falta simular cada salto. Se guarda hasta dónde se ha podido llegar. Si el índice actual ya está más allá de ese alcance, hay un cero que no se puede cruzar. Si el alcance llega al final, se puede.',
  body: b(
    'let reach = 0',
    'for (let i = 0; i < t.length; i++) {',
    '  if (i > reach) return false',
    '  if (i + t[i] > reach) reach = i + t[i]',
    '}',
    'return true',
  ),
  cases: [
    [[[2, 3, 1, 1, 4]], true],
    [[[3, 2, 1, 0, 4]], false],
    [[[0]], true],
  ],
})

add({
  title: 'Subsecuencia creciente',
  name: 'lengthOfLIS',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Devuelve la longitud de la subsecuencia estrictamente creciente más larga. No tiene que ser contigua.\nEjemplo: [10, 9, 2, 5, 3, 7, 101, 18] → 4. [] → 0.',
  used: 'programación dinámica cuadrática',
  explanation:
    'best[i] es la mejor subsecuencia que termina en i. Se mira cada j anterior menor que t[i] y se alarga. El máximo de best es la respuesta. Hay una versión n log n con paciencia y búsqueda binaria; esta es la que se lee de un vistazo y basta para arrays cortos.',
  body: b(
    'const best = t.map(() => 1)',
    'let answer = 0',
    'for (let i = 0; i < t.length; i++) {',
    '  for (let j = 0; j < i; j++) {',
    '    if (t[j] < t[i] && best[j] + 1 > best[i]) best[i] = best[j] + 1',
    '  }',
    '  if (best[i] > answer) answer = best[i]',
    '}',
    'return answer',
  ),
  cases: [
    [[[10, 9, 2, 5, 3, 7, 101, 18]], 4],
    [[[]], 0],
    [[[7, 7, 7]], 1],
  ],
})

add({
  title: 'Cambio de monedas',
  name: 'coinChange',
  params: 'coins, amount',
  ts: 'coins: number[], amount: number): number',
  prompt: 'Devuelve el mínimo de monedas para sumar amount. Se puede reutilizar cada valor. Si es imposible, -1. amount es 0 o más.\nEjemplo: [1, 2, 5], 11 → 3. [2], 3 → -1.',
  used: 'programación dinámica: mínimo para cada importe',
  explanation:
    'best[x] es el mínimo de monedas para sumar x. Se prueba cada moneda que quepa y se mira best[x - moneda] + 1. Un valor centinela mayor que amount marca lo imposible. amount 0 necesita 0 monedas.',
  body: b(
    'const best = [0]',
    'for (let i = 1; i <= amount; i++) best.push(amount + 1)',
    'for (let i = 1; i <= amount; i++) {',
    '  for (const coin of coins) {',
    '    if (coin <= i && best[i - coin] + 1 < best[i]) best[i] = best[i - coin] + 1',
    '  }',
    '}',
    'return best[amount] > amount ? -1 : best[amount]',
  ),
  cases: [
    [[[1, 2, 5], 11], 3],
    [[[2], 3], -1],
    [[[1], 0], 0],
  ],
})

add({
  title: 'Letras del teléfono',
  name: 'letterCombinations',
  params: 'digits',
  ts: 'digits: string): string[]',
  prompt: 'digits usa cifras del 2 al 9, como un teléfono. Devuelve todas las combinaciones de letras, en el orden del teclado y de las cifras. "" → [].\nEjemplo: "23" → ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].',
  used: 'un array que crece cifra a cifra',
  explanation:
    'Se empieza con el string vacío. Cada cifra sustituye la lista actual por todas las formas de añadirle una de sus letras. El orden del string del teclado fija el orden del resultado.',
  body: b(
    'if (!digits) return []',
    "const map = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' }",
    "let out = ['']",
    'for (const digit of digits) {',
    '  const next = []',
    '  for (const prefix of out) for (const ch of map[digit]) next.push(prefix + ch)',
    '  out = next',
    '}',
    'return out',
  ),
  cases: [
    [['23'], ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']],
    [[''], []],
  ],
})

add({
  title: 'Rotar string',
  name: 'rotateString',
  params: 'text, goal',
  ts: 'text: string, goal: string): boolean',
  prompt: 'Di si goal es text rotado. Rotar mueve el primer carácter al final, las veces que haga falta.\nEjemplo: "abcde", "cdeab" → true. "abcde", "abced" → false.',
  used: 'text + text e includes',
  explanation:
    'Todas las rotaciones de text aparecen como substring de text pegado consigo mismo, y tienen la misma longitud. Si las longitudes difieren, es imposible.',
  body: b('return text.length === goal.length && (text + text).includes(goal)'),
  cases: [
    [['abcde', 'cdeab'], true],
    [['abcde', 'abced'], false],
    [['', ''], true],
  ],
})

add({
  title: 'Tecla de borrar',
  name: 'backspaceCompare',
  params: 'a, b',
  ts: 'a: string, b: string): boolean',
  prompt: '# borra el carácter anterior, si lo hay. Di si a y b quedan iguales después de borrar.\nEjemplo: "ab#c", "ad#c" → true. "a#c", "b" → false.',
  used: 'una pila por string',
  explanation:
    'Cada letra se apila. Cada # desapila, si hay algo. Al final se comparan los dos textos reconstruidos. Una pila encaja porque borrar deshace lo último escrito.',
  body: b(
    'function build(text) {',
    '  const out = []',
    "  for (const ch of text) {",
    "    if (ch === '#') out.pop()",
    '    else out.push(ch)',
    '  }',
    "  return out.join('')",
    '}',
    'return build(a) === build(b)',
  ),
  cases: [
    [['ab#c', 'ad#c'], true],
    [['a#c', 'b'], false],
    [['##a', 'a'], true],
  ],
})

add({
  title: 'Strings isomorfos',
  name: 'isomorphic',
  params: 'a, b',
  ts: 'a: string, b: string): boolean',
  prompt: 'Di si se puede sustituir cada carácter de a por uno de b, siempre el mismo, y al revés.\nEjemplo: "egg", "add" → true. "foo", "bar" → false. "paper", "title" → true.',
  used: 'dos Map, uno en cada dirección',
  explanation:
    'Un solo mapa no basta: "ab" y "aa" mapearían a y b hacia a, y chocarían al volver. Se exige que la letra de a fije la de b y que la de b fije la de a. Las longitudes tienen que coincidir.',
  body: b(
    'if (a.length !== b.length) return false',
    'const ab = new Map()',
    'const ba = new Map()',
    'for (let i = 0; i < a.length; i++) {',
    '  if (ab.has(a[i]) && ab.get(a[i]) !== b[i]) return false',
    '  if (ba.has(b[i]) && ba.get(b[i]) !== a[i]) return false',
    '  ab.set(a[i], b[i])',
    '  ba.set(b[i], a[i])',
    '}',
    'return true',
  ),
  cases: [
    [['egg', 'add'], true],
    [['foo', 'bar'], false],
    [['paper', 'title'], true],
  ],
})

add({
  title: 'Patrón de palabras',
  name: 'wordPattern',
  params: 'pattern, text',
  ts: 'pattern: string, text: string): boolean',
  prompt: 'Di si text sigue pattern: cada letra corresponde a una palabra, y cada palabra a una letra. Las palabras van separadas por un espacio.\nEjemplo: "abba", "dog cat cat dog" → true. "abba", "dog cat cat fish" → false. "aaaa", "dog cat cat dog" → false.',
  used: 'dos Map, como en los isomorfos',
  explanation:
    'Es el isomorfismo entre letras y palabras. Si el número de palabras no coincide con el patrón, ya es false. Las dos direcciones del mapa impiden que dos letras compartan palabra o al revés.',
  body: b(
    "const words = text.split(' ')",
    'if (words.length !== pattern.length) return false',
    'const pw = new Map()',
    'const wp = new Map()',
    'for (let i = 0; i < pattern.length; i++) {',
    '  const p = pattern[i]',
    '  const w = words[i]',
    '  if (pw.has(p) && pw.get(p) !== w) return false',
    '  if (wp.has(w) && wp.get(w) !== p) return false',
    '  pw.set(p, w)',
    '  wp.set(w, p)',
    '}',
    'return true',
  ),
  cases: [
    [['abba', 'dog cat cat dog'], true],
    [['abba', 'dog cat cat fish'], false],
    [['aaaa', 'dog cat cat dog'], false],
  ],
})

add({
  title: 'Rangos resumidos',
  name: 'summaryRanges',
  params: 't',
  ts: 't: number[]): string[]',
  prompt: 't está ordenado y no tiene repetidos. Resume los tramos consecutivos. Un número solo va sin flecha.\nEjemplo: [0, 1, 2, 4, 5, 7] → ["0->2", "4->5", "7"].',
  used: 'un puntero que alarga el tramo mientras la diferencia sea 1',
  explanation:
    'Se avanza mientras el siguiente sea el actual más 1. Al cortarse el tramo, se escribe el inicio y el fin. Si coinciden, es un número suelto.',
  body: b(
    'const out = []',
    'let i = 0',
    'while (i < t.length) {',
    '  const start = t[i]',
    '  while (i + 1 < t.length && t[i + 1] === t[i] + 1) i++',
    '  out.push(start === t[i] ? String(start) : start + "->" + t[i])',
    '  i++',
    '}',
    'return out',
  ),
  cases: [
    [[[0, 1, 2, 4, 5, 7]], ['0->2', '4->5', '7']],
    [[[]], []],
  ],
})

add({
  title: 'Duplicado cercano',
  name: 'containsNearbyDuplicate',
  params: 't, k',
  ts: 't: number[], k: number): boolean',
  prompt: 'Di si hay dos índices i y j, distintos, con el mismo valor y |i - j| <= k.\nEjemplo: [1, 2, 3, 1], 3 → true. [1, 2, 3, 1, 2, 3], 2 → false.',
  used: 'Map del último índice de cada valor',
  explanation:
    'Solo importa la aparición anterior más reciente. Si la distancia hasta ella cabe en k, ya hay pareja. Luego se actualiza el índice. No hace falta guardar todas las posiciones.',
  body: b(
    'const last = new Map()',
    'for (let i = 0; i < t.length; i++) {',
    '  if (last.has(t[i]) && i - last.get(t[i]) <= k) return true',
    '  last.set(t[i], i)',
    '}',
    'return false',
  ),
  cases: [
    [[[1, 2, 3, 1], 3], true],
    [[[1, 2, 3, 1, 2, 3], 2], false],
    [[[1, 0, 1, 1], 1], true],
  ],
})

add({
  title: 'Subsecuencia',
  name: 'isSubsequence',
  params: 'needle, text',
  ts: 'needle: string, text: string): boolean',
  prompt: 'Di si needle es subsecuencia de text: sus caracteres aparecen en orden, no hace falta que vayan seguidos.\nEjemplo: "abc", "ahbgdc" → true. "axc", "ahbgdc" → false.',
  used: 'un índice que avanza sobre la aguja',
  explanation:
    'Se recorre text una vez. Cada vez que sale el carácter que toca de needle, se avanza en la aguja. Si el índice llega al final, todos encontraron sitio en orden.',
  body: b(
    'let i = 0',
    'for (const ch of text) {',
    '  if (ch === needle[i]) i++',
    '}',
    'return i === needle.length',
  ),
  cases: [
    [['abc', 'ahbgdc'], true],
    [['axc', 'ahbgdc'], false],
    [['', 'abc'], true],
  ],
})

add({
  title: 'Pares delante',
  name: 'sortByParity',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Devuelve los pares y después los impares, cada grupo en el orden original.\nEjemplo: [3, 1, 2, 4] → [2, 4, 3, 1].',
  used: 'dos arrays y concat',
  explanation:
    'Un sort genérico reordenaría dentro de los pares. Aquí se hace una partición estable: primero se copian los pares en orden, luego los impares.',
  body: b(
    'const even = []',
    'const odd = []',
    'for (const n of t) {',
    '  if (n % 2 === 0) even.push(n)',
    '  else odd.push(n)',
    '}',
    'return even.concat(odd)',
  ),
  cases: [
    [[[3, 1, 2, 4]], [2, 4, 3, 1]],
    [[[1, 3]], [1, 3]],
  ],
})

add({
  title: 'Mezclar ordenados',
  name: 'mergeSorted',
  params: 'a, b',
  ts: 'a: number[], b: number[]): number[]',
  prompt: 'a y b están ordenados de menor a mayor. Devuelve la mezcla ordenada.\nEjemplo: [1, 3], [2, 2, 4] → [1, 2, 2, 3, 4].',
  used: 'dos índices, como el merge del mergesort',
  explanation:
    'Se compara la cabeza de cada lista y se toma la menor. Cuando una se acaba, se copia el resto de la otra. Es lineal en la suma de las longitudes. Ordenar la concatenación sería más caro y no usa que ya venían ordenadas.',
  body: b(
    'const out = []',
    'let i = 0',
    'let j = 0',
    'while (i < a.length && j < b.length) {',
    '  if (a[i] <= b[j]) out.push(a[i++])',
    '  else out.push(b[j++])',
    '}',
    'while (i < a.length) out.push(a[i++])',
    'while (j < b.length) out.push(b[j++])',
    'return out',
  ),
  cases: [
    [[[1, 3], [2, 2, 4]], [1, 2, 2, 3, 4]],
    [[[], [1]], [1]],
  ],
})

add({
  title: 'Quitar un valor',
  name: 'withoutValue',
  params: 't, value',
  ts: 't: number[], value: number): number[]',
  prompt: 'Devuelve un array nuevo sin las apariciones de value. El resto conserva el orden.\nEjemplo: [3, 2, 2, 3], 3 → [2, 2].',
  used: 'filtro con un bucle',
  explanation:
    'Es un filter escrito a mano. Se copia todo lo que no es value. El array original no se toca.',
  body: b('const out = []', 'for (const n of t) if (n !== value) out.push(n)', 'return out'),
  cases: [
    [[[3, 2, 2, 3], 3], [2, 2]],
    [[[1, 2], 9], [1, 2]],
  ],
})

add({
  title: 'Tercer máximo',
  name: 'thirdMax',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Devuelve el tercer valor distinto más grande. Si no hay tres distintos, devuelve el máximo. t no está vacío.\nEjemplo: [3, 2, 1] → 1. [2, 2, 3, 1] → 1. [1, 2] → 2.',
  used: 'quitar repetidos, ordenar de mayor a menor',
  explanation:
    'Los repetidos no cuentan como otro máximo. Se dejan los distintos, se ordenan de mayor a menor y se coge el índice 2 si existe. Si no, el índice 0, que es el mayor.',
  body: b(
    'const uniq = []',
    'for (const n of t) if (!uniq.includes(n)) uniq.push(n)',
    'uniq.sort((a, b) => b - a)',
    'return uniq.length >= 3 ? uniq[2] : uniq[0]',
  ),
  cases: [
    [[[3, 2, 1]], 1],
    [[[2, 2, 3, 1]], 1],
    [[[1, 2]], 2],
  ],
})

add({
  title: 'Uso de mayúsculas',
  name: 'detectCapital',
  params: 'word',
  ts: 'word: string): boolean',
  prompt: 'El uso es correcto si todo va en mayúsculas, todo en minúsculas, o solo la primera en mayúscula.\nEjemplo: "USA" → true. "FlaG" → false. "Google" → true.',
  used: 'toUpperCase y toLowerCase',
  explanation:
    'Los tres patrones válidos se comparan con el texto transformado. "Google" cumple el tercero: la inicial ya es mayúscula y el resto coincide con su versión en minúsculas.',
  body: b(
    'if (word === word.toUpperCase()) return true',
    'if (word === word.toLowerCase()) return true',
    'return word[0] === word[0].toUpperCase() && word.slice(1) === word.slice(1).toLowerCase()',
  ),
  cases: [
    [['USA'], true],
    [['FlaG'], false],
    [['Google'], true],
    [['leetcode'], true],
  ],
})

add({
  title: 'La letra añadida',
  name: 'findTheDifference',
  params: 'a, b',
  ts: 'a: string, b: string): string',
  prompt: 'b es a con una letra extra, en cualquier sitio. Devuelve esa letra.\nEjemplo: "abcd", "abcde" → "e".',
  used: 'XOR de los códigos de carácter',
  explanation:
    'Las letras compartidas se anulan al hacer XOR de sus códigos. Queda el código de la letra extra. También valdría un conteo; el XOR no usa memoria extra.',
  body: b(
    'let code = 0',
    'for (const ch of a) code ^= ch.charCodeAt(0)',
    'for (const ch of b) code ^= ch.charCodeAt(0)',
    'return String.fromCharCode(code)',
  ),
  cases: [
    [['abcd', 'abcde'], 'e'],
    [['', 'y'], 'y'],
  ],
})

add({
  title: 'Morse único',
  name: 'uniqueMorse',
  params: 'words',
  ts: 'words: string[]): number',
  prompt: 'Cada letra minúscula tiene un código morse, de la a a la z en este orden: ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..". Devuelve cuántas transformaciones distintas hay.\nEjemplo: ["gin", "zen", "gig", "msg"] → 2.',
  used: 'tabla de 26 códigos y un Set',
  explanation:
    'La posición de la letra es su código menos 97, el código de "a". Se concatena el morse de cada letra y se mete en un Set. El tamaño del Set es el número de resultados distintos.',
  body: b(
    'const morse = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."]',
    'const seen = new Set()',
    'for (const word of words) {',
    "  let code = ''",
    '  for (const ch of word) code += morse[ch.charCodeAt(0) - 97]',
    '  seen.add(code)',
    '}',
    'return seen.size',
  ),
  cases: [
    [[['gin', 'zen', 'gig', 'msg']], 2],
    [[['a']], 1],
  ],
})

add({
  title: 'Vuelta al origen',
  name: 'judgeCircle',
  params: 'moves',
  ts: 'moves: string): boolean',
  prompt: 'moves usa U, D, L y R. Di si se acaba en el origen.\nEjemplo: "UD" → true. "LL" → false.',
  used: 'dos contadores, x e y',
  explanation:
    'Arriba suma 1 a y, abajo resta, izquierda resta a x y derecha suma. Al origen se vuelve si ambos contadores acaban en 0. No hace falta simular el camino completo, solo el balance.',
  body: b(
    'let x = 0',
    'let y = 0',
    'for (const move of moves) {',
    "  if (move === 'U') y++",
    "  else if (move === 'D') y--",
    "  else if (move === 'L') x--",
    "  else if (move === 'R') x++",
    '}',
    'return x === 0 && y === 0',
  ),
  cases: [
    [['UD'], true],
    [['LL'], false],
    [['URDL'], true],
  ],
})

add({
  title: 'Suma de parejas',
  name: 'arrayPairSum',
  params: 't',
  ts: 't: number[]): number',
  prompt: 't tiene longitud par. Se forman parejas y se suma el mínimo de cada una. Devuelve la mayor suma posible.\nEjemplo: [1, 4, 3, 2] → 4, con las parejas (1, 2) y (3, 4).',
  used: 'ordenar y sumar las posiciones pares',
  explanation:
    'Ordenado, la mejor estrategia es emparejar vecinos: el mínimo de cada pareja es el de la izquierda. Sumar los índices pares del array ordenado da ese total. Emparejar el mayor con el menor desperdicia al mayor.',
  body: b(
    'const sorted = t.slice().sort((a, b) => a - b)',
    'let total = 0',
    'for (let i = 0; i < sorted.length; i += 2) total += sorted[i]',
    'return total',
  ),
  cases: [
    [[[1, 4, 3, 2]], 4],
    [[[6, 2, 6, 5, 1, 2]], 9],
  ],
})

add({
  title: 'Producto de tres',
  name: 'maximumProductThree',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Devuelve el máximo producto de tres números distintos de t. Puede haber negativos. t tiene al menos tres.\nEjemplo: [1, 2, 3, 4] → 24. [-10, -10, 1, 3, 2] → 300.',
  used: 'ordenar y comparar el producto de los tres mayores con el de los dos menores y el mayor',
  explanation:
    'El producto máximo o sale de los tres mayores, o de los dos negativos más pequeños (su producto es positivo) por el mayor. Ordenar deja esos candidatos en los extremos. No hace falta probar todas las tripletas.',
  body: b(
    'const sorted = t.slice().sort((a, b) => a - b)',
    'const n = sorted.length',
    'const last = sorted[n - 1] * sorted[n - 2] * sorted[n - 3]',
    'const withNeg = sorted[0] * sorted[1] * sorted[n - 1]',
    'return last > withNeg ? last : withNeg',
  ),
  cases: [
    [[[1, 2, 3, 4]], 24],
    [[[-10, -10, 1, 3, 2]], 300],
  ],
})

add({
  title: 'Triplete creciente',
  name: 'increasingTriplet',
  params: 't',
  ts: 't: number[]): boolean',
  prompt: 'Di si hay tres índices i < j < k con t[i] < t[j] < t[k].\nEjemplo: [1, 2, 3, 4, 5] → true. [5, 4, 3, 2, 1] → false. [2, 1, 5, 0, 4, 6] → true.',
  used: 'el menor visto y el segundo menor de una creciente',
  explanation:
    'Se guardan el menor número que podría ser el primero y el menor que podría ser el segundo. Si aparece uno mayor que ese segundo, ya hay triplete. No se guardan los índices: el orden del recorrido garantiza i < j < k.',
  body: b(
    'let first = Infinity',
    'let second = Infinity',
    'for (const n of t) {',
    '  if (n <= first) first = n',
    '  else if (n <= second) second = n',
    '  else return true',
    '}',
    'return false',
  ),
  cases: [
    [[[1, 2, 3, 4, 5]], true],
    [[[5, 4, 3, 2, 1]], false],
    [[[2, 1, 5, 0, 4, 6]], true],
  ],
})

add({
  title: 'Subarray mínimo que suma',
  name: 'minSubArrayLen',
  params: 'target, t',
  ts: 'target: number, t: number[]): number',
  prompt: 't tiene números positivos. Devuelve la longitud mínima de un subarray contiguo que sume al menos target. Si no hay, 0.\nEjemplo: 7, [2, 3, 1, 2, 4, 3] → 2.',
  used: 'ventana deslizante',
  explanation:
    'La ventana suma lo que hay entre start e i. Cuando llega al objetivo, se intenta encoger por la izquierda y se guarda la longitud mínima. Los números son positivos, así que mover el inicio siempre resta. Es lineal.',
  body: b(
    'let best = t.length + 1',
    'let sum = 0',
    'let start = 0',
    'for (let i = 0; i < t.length; i++) {',
    '  sum += t[i]',
    '  while (sum >= target) {',
    '    const size = i - start + 1',
    '    if (size < best) best = size',
    '    sum -= t[start]',
    '    start++',
    '  }',
    '}',
    'return best > t.length ? 0 : best',
  ),
  cases: [
    [[7, [2, 3, 1, 2, 4, 3]], 2],
    [[4, [1, 1]], 0],
  ],
})

add({
  title: 'Días más cálidos',
  name: 'dailyTemperatures',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Para cada día, devuelve cuántos días hay que esperar hasta uno más cálido. Si no llega, 0.\nEjemplo: [73, 74, 75, 71, 69, 72, 76, 73] → [1, 1, 4, 2, 1, 1, 0, 0].',
  used: 'pila de índices decreciente',
  explanation:
    'La pila guarda días que todavía no han encontrado uno más cálido, de temperatura decreciente. Cuando llega un día más cálido que la cima, se resuelve ese índice y se desapila. Cada índice entra y sale una vez.',
  body: b(
    'const out = t.map(() => 0)',
    'const stack = []',
    'for (let i = 0; i < t.length; i++) {',
    '  while (stack.length && t[i] > t[stack[stack.length - 1]]) {',
    '    const prev = stack.pop()',
    '    out[prev] = i - prev',
    '  }',
    '  stack.push(i)',
    '}',
    'return out',
  ),
  cases: [
    [[[73, 74, 75, 71, 69, 72, 76, 73]], [1, 1, 4, 2, 1, 1, 0, 0]],
  ],
})

add({
  title: 'Notación polaca',
  name: 'evalRPN',
  params: 'tokens',
  ts: 'tokens: string[]): number',
  prompt: 'Evalúa una expresión en notación polaca inversa. Los operadores son +, -, * y /. La división trunca hacia cero.\nEjemplo: ["2", "1", "+", "3", "*"] → 9. ["4", "13", "5", "/", "+"] → 6.',
  used: 'pila de operandos y Math.trunc',
  explanation:
    'Un número se apila. Un operador desapila dos operandos, el derecho es el último, y apila el resultado. Math.trunc tira hacia cero, que no es lo mismo que Math.floor con negativos. Al final queda un solo valor.',
  body: b(
    'const stack = []',
    'for (const token of tokens) {',
    "  if (token !== '+' && token !== '-' && token !== '*' && token !== '/') {",
    '    stack.push(Number(token))',
    '    continue',
    '  }',
    '  const b = stack.pop()',
    '  const a = stack.pop()',
    "  if (token === '+') stack.push(a + b)",
    "  else if (token === '-') stack.push(a - b)",
    "  else if (token === '*') stack.push(a * b)",
    '  else stack.push(Math.trunc(a / b))',
    '}',
    'return stack[0]',
  ),
  cases: [
    [[['2', '1', '+', '3', '*']], 9],
    [[['4', '13', '5', '/', '+']], 6],
    [[['-4', '2', '/']], -2],
  ],
})

add({
  title: 'Siguiente mayor',
  name: 'nextGreater',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Para cada posición, devuelve el primer valor de su derecha que sea mayor. Si no hay, -1.\nEjemplo: [2, 1, 2, 4, 3] → [4, 2, 4, -1, -1].',
  used: 'pila monótona de índices',
  explanation:
    'Es el mismo esqueleto que los días más cálidos, pero se guarda el valor, no la distancia. La pila mantiene índices cuyo siguiente mayor todavía no ha llegado, en orden decreciente de valor.',
  body: b(
    'const out = t.map(() => -1)',
    'const stack = []',
    'for (let i = 0; i < t.length; i++) {',
    '  while (stack.length && t[i] > t[stack[stack.length - 1]]) {',
    '    out[stack.pop()] = t[i]',
    '  }',
    '  stack.push(i)',
    '}',
    'return out',
  ),
  cases: [
    [[[2, 1, 2, 4, 3]], [4, 2, 4, -1, -1]],
  ],
})

add({
  title: 'Los k más frecuentes',
  name: 'topKFrequent',
  params: 't, k',
  ts: 't: number[], k: number): number[]',
  prompt: 'Devuelve los k números más frecuentes. Si empatan en frecuencia, va antes el número menor. k es al menos 1 y no supera a los distintos.\nEjemplo: [1, 1, 1, 2, 2, 3], 2 → [1, 2].',
  used: 'Map de conteos y sort',
  explanation:
    'Se cuenta y se ordena por frecuencia descendente. El desempate por número menor deja el resultado estable para las pruebas. Un heap de tamaño k bajaría el coste si k es pequeño; ordenar es más corto y suficiente aquí.',
  body: b(
    'const count = new Map()',
    'for (const n of t) count.set(n, (count.get(n) ?? 0) + 1)',
    'return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]).slice(0, k).map((pair) => pair[0])',
  ),
  cases: [
    [[[1, 1, 1, 2, 2, 3], 2], [1, 2]],
    [[[4, 4, 5, 5], 2], [4, 5]],
  ],
})

add({
  title: 'Subarrays que suman k',
  name: 'subarraySum',
  params: 't, k',
  ts: 't: number[], k: number): number',
  prompt: 'Cuenta los subarrays contiguos que suman k. Puede haber negativos.\nEjemplo: [1, 1, 1], 2 → 2. [1, 2, 3], 3 → 2.',
  used: 'suma prefijo y Map de cuántas veces se ha visto cada suma',
  explanation:
    'Si la suma hasta i menos la suma hasta j es k, el tramo (j, i] suma k. El Map dice cuántos prefijos valen suma - k. El prefijo 0 aparece una vez antes de empezar, para los subarrays que parten del inicio.',
  body: b(
    'const seen = new Map([[0, 1]])',
    'let sum = 0',
    'let total = 0',
    'for (const n of t) {',
    '  sum += n',
    '  total += seen.get(sum - k) ?? 0',
    '  seen.set(sum, (seen.get(sum) ?? 0) + 1)',
    '}',
    'return total',
  ),
  cases: [
    [[[1, 1, 1], 2], 2],
    [[[1, 2, 3], 3], 2],
    [[[1], 0], 0],
  ],
})

add({
  title: 'Índices de anagramas',
  name: 'findAnagrams',
  params: 'text, needle',
  ts: 'text: string, needle: string): number[]',
  prompt: 'Devuelve los índices donde empieza un anagrama de needle dentro de text. Las letras son minúsculas.\nEjemplo: "cbaebabacd", "abc" → [0, 6].',
  used: 'ventana del tamaño de la aguja y dos Map',
  explanation:
    'Se compara el conteo de la ventana con el de la aguja. Al avanzar, entra una letra y sale la que queda fuera. Así no se reordena cada substring. El índice que se guarda es el inicio de la ventana.',
  body: b(
    'const out = []',
    'if (needle.length > text.length) return out',
    'const need = new Map()',
    'for (const ch of needle) need.set(ch, (need.get(ch) ?? 0) + 1)',
    'const window = new Map()',
    'const same = () => {',
    '  if (window.size !== need.size) return false',
    '  for (const [key, value] of need) if (window.get(key) !== value) return false',
    '  return true',
    '}',
    'for (let i = 0; i < text.length; i++) {',
    '  window.set(text[i], (window.get(text[i]) ?? 0) + 1)',
    '  if (i >= needle.length) {',
    '    const left = text[i - needle.length]',
    '    const next = window.get(left) - 1',
    '    if (next === 0) window.delete(left)',
    '    else window.set(left, next)',
    '  }',
    '  if (i >= needle.length - 1 && same()) out.push(i - needle.length + 1)',
    '}',
    'return out',
  ),
  cases: [
    [['cbaebabacd', 'abc'], [0, 6]],
    [['abc', 'abcd'], []],
  ],
})

add({
  title: 'Reemplazos en la ventana',
  name: 'characterReplacement',
  params: 'text, k',
  ts: 'text: string, k: number): number',
  prompt: 'Puedes cambiar hasta k letras. Devuelve la longitud del substring más largo que puede quedar con todas las letras iguales. Las letras son mayúsculas.\nEjemplo: "ABAB", 2 → 4. "AABABBA", 1 → 4.',
  used: 'ventana deslizante y el conteo de la letra más repetida dentro',
  explanation:
    'En una ventana, los cambios necesarios son longitud menos la letra que más se repite. Si pasan de k, se mueve el inicio. La letra dominante no se recalcula hacia abajo al encoger: en este problema eso no estropea el máximo, porque una ventana mejor ya se habría visto.',
  body: b(
    'const count = new Map()',
    'let best = 0',
    'let maxCount = 0',
    'let start = 0',
    'for (let i = 0; i < text.length; i++) {',
    '  const next = (count.get(text[i]) ?? 0) + 1',
    '  count.set(text[i], next)',
    '  if (next > maxCount) maxCount = next',
    '  while (i - start + 1 - maxCount > k) {',
    '    count.set(text[start], count.get(text[start]) - 1)',
    '    start++',
    '  }',
    '  const size = i - start + 1',
    '  if (size > best) best = size',
    '}',
    'return best',
  ),
  cases: [
    [['ABAB', 2], 4],
    [['AABABBA', 1], 4],
  ],
})

add({
  title: 'Permutación en el texto',
  name: 'checkInclusion',
  params: 'needle, text',
  ts: 'needle: string, text: string): boolean',
  prompt: 'Di si algún substring de text es una permutación de needle. Letras minúsculas.\nEjemplo: "ab", "eidbaooo" → true. "ab", "eidboaoo" → false.',
  used: 'ventana fija y dos conteos de 26 letras',
  explanation:
    'Como el alfabeto es fijo, dos arrays de 26 bastan. La ventana tiene el tamaño de la aguja. Se compara el conteo; al avanzar, una letra entra y otra sale. Es el mismo criterio que findAnagrams, pero aquí solo importa si existe.',
  body: b(
    'if (needle.length > text.length) return false',
    'const need = new Array(26).fill(0)',
    'const window = new Array(26).fill(0)',
    'for (let i = 0; i < needle.length; i++) {',
    '  need[needle.charCodeAt(i) - 97]++',
    '  window[text.charCodeAt(i) - 97]++',
    '}',
    'const equal = () => need.every((value, index) => value === window[index])',
    'if (equal()) return true',
    'for (let i = needle.length; i < text.length; i++) {',
    '  window[text.charCodeAt(i) - 97]++',
    '  window[text.charCodeAt(i - needle.length) - 97]--',
    '  if (equal()) return true',
    '}',
    'return false',
  ),
  cases: [
    [['ab', 'eidbaooo'], true],
    [['ab', 'eidboaoo'], false],
  ],
})

add({
  title: 'Cuatro arrays que suman cero',
  name: 'fourSumCount',
  params: 'a, b, c, d',
  ts: 'a: number[], b: number[], c: number[], d: number[]): number',
  prompt: 'Cuenta cuántas tuplas (i, j, k, l) cumplen a[i] + b[j] + c[k] + d[l] = 0.\nEjemplo: [1, 2], [-2, -1], [-1, 2], [0, 2] → 2.',
  used: 'Map de las sumas de los dos primeros arrays',
  explanation:
    'Probar las cuatro combinaciones es n⁴. Se guardan las sumas de a y b, y luego cada suma de c y d busca su negativo. Baja a n² en tiempo y memoria.',
  body: b(
    'const sums = new Map()',
    'for (const x of a) for (const y of b) sums.set(x + y, (sums.get(x + y) ?? 0) + 1)',
    'let total = 0',
    'for (const x of c) for (const y of d) total += sums.get(-(x + y)) ?? 0',
    'return total',
  ),
  cases: [
    [[[1, 2], [-2, -1], [-1, 2], [0, 2]], 2],
  ],
})

if (specs.length !== 100) {
  throw new Error(`mid tiene ${specs.length}`)
}
