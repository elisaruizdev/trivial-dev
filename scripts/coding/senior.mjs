function b(...rows) {
  return rows.map((row) => `  ${row}`).join('\n')
}

/** @type {any[]} */
export const specs = []
function add(spec) {
  specs.push(spec)
}

const composeProbe = `
if (typeof compose !== "function") throw new Error("Define compose.");
var fn = compose([function (n) { return n + 1 }, function (n) { return n * 2 }]);
if (fn(3) !== 7) throw new Error("compose aplica de derecha a izquierda: (3 * 2) + 1 = 7.");
console.log("Correcto. compose encadena de derecha a izquierda.");
`

const curryProbe = `
if (typeof curry3 !== "function") throw new Error("Define curry3.");
var sum = curry3(function (a, b, c) { return a + b + c });
if (sum(1)(2)(3) !== 6) throw new Error("curry3(suma)(1)(2)(3) debe ser 6.");
console.log("Correcto. curry3 parte la función en tres llamadas.");
`

add({
  title: 'Caché LRU',
  name: 'runLru',
  params: 'capacity, operations',
  ts: 'capacity: number, operations: Array<["put", number, number] | ["get", number]>): Array<number | null>',
  prompt:
    'Simula una caché LRU de capacidad capacity. "put" guarda clave y valor y refresca el uso. "get" devuelve el valor o null, y también refresca. Si se pasa la capacidad, se expulsa el menos reciente. Devuelve solo los resultados de los get, en orden.\nEjemplo: capacidad 2 y put(1,1), put(2,2), get(1), put(3,3), get(2), get(3) → [1, null, 3].',
  used: 'Map de JavaScript, que conserva el orden de inserción',
  explanation:
    'Borrar y volver a insertar mueve la clave al final, que aquí es lo más reciente. Al pasar la capacidad se borra la primera clave del Map, la más antigua. Un objeto plano no serviría: no garantiza orden. El coste de cada operación es amortizado constante. La alternativa es una lista doblemente enlazada más un mapa, que es lo que el Map esconde.',
  body: b(
    'const map = new Map()',
    'const out = []',
    'for (const op of operations) {',
    "  if (op[0] === 'put') {",
    '    if (map.has(op[1])) map.delete(op[1])',
    '    map.set(op[1], op[2])',
    '    if (map.size > capacity) map.delete(map.keys().next().value)',
    '  } else if (!map.has(op[1])) out.push(null)',
    '  else {',
    '    const value = map.get(op[1])',
    '    map.delete(op[1])',
    '    map.set(op[1], value)',
    '    out.push(value)',
    '  }',
    '}',
    'return out',
  ),
  cases: [
    [[2, [['put', 1, 1], ['put', 2, 2], ['get', 1], ['put', 3, 3], ['get', 2], ['get', 3]]], [1, null, 3]],
  ],
})

add({
  title: 'Pila con mínimo',
  name: 'runMinStack',
  params: 'operations',
  ts: 'operations: Array<["push", number] | ["pop"] | ["top"] | ["min"]>): number[]',
  prompt:
    'Simula una pila. "push" apila un número. "pop" desapila. "top" devuelve la cima. "min" devuelve el mínimo actual. Las operaciones son válidas. Devuelve los resultados de top y min, en orden.\nEjemplo: push -2, push 0, push -3, min, pop, top, min → [-3, 0, -2].',
  used: 'dos pilas: los valores y el mínimo hasta cada altura',
  explanation:
    'Mirar toda la pila en cada min sería lineal. La segunda pila guarda el mínimo de todo lo que hay debajo, incluida la cima. Al apilar, el nuevo mínimo es el menor entre el valor y el mínimo anterior. Al desapilar se tiran las dos cimas. top y min quedan en tiempo constante.',
  body: b(
    'const stack = []',
    'const mins = []',
    'const out = []',
    'for (const op of operations) {',
    "  if (op[0] === 'push') {",
    '    stack.push(op[1])',
    '    const min = mins.length === 0 || op[1] < mins[mins.length - 1] ? op[1] : mins[mins.length - 1]',
    '    mins.push(min)',
    "  } else if (op[0] === 'pop') {",
    '    stack.pop()',
    '    mins.pop()',
    "  } else if (op[0] === 'top') out.push(stack[stack.length - 1])",
    '  else out.push(mins[mins.length - 1])',
    '}',
    'return out',
  ),
  cases: [
    [[[['push', -2], ['push', 0], ['push', -3], ['min'], ['pop'], ['top'], ['min']]], [-3, 0, -2]],
  ],
})

add({
  title: 'Cola con dos pilas',
  name: 'queueTwoStacks',
  params: 'operations',
  ts: 'operations: Array<["push", number] | ["pop"] | ["peek"]>): number[]',
  prompt:
    'Simula una cola usando la idea de dos pilas. "push" encola. "pop" desencola. "peek" mira el primero sin quitarlo. Devuelve los resultados de pop y peek.\nEjemplo: push 1, push 2, peek, pop, peek → [1, 1, 2].',
  used: 'una pila de entrada y otra de salida',
  explanation:
    'La entrada apila los push. Para sacar por el frente hay que invertirla en la salida, y solo cuando la salida está vacía: si se invirtiera en cada operación se rompería el orden. pop y peek comparten ese volcado. Cada elemento se mueve como mucho una vez de una pila a la otra, así que el coste amortizado es constante.',
  body: b(
    'const inbox = []',
    'const outbox = []',
    'const out = []',
    'function move() {',
    '  if (outbox.length === 0) while (inbox.length) outbox.push(inbox.pop())',
    '}',
    'for (const op of operations) {',
    "  if (op[0] === 'push') inbox.push(op[1])",
    "  else if (op[0] === 'pop') {",
    '    move()',
    '    out.push(outbox.pop())',
    '  } else {',
    '    move()',
    '    out.push(outbox[outbox.length - 1])',
    '  }',
    '}',
    'return out',
  ),
  cases: [
    [[[['push', 1], ['push', 2], ['peek'], ['pop'], ['peek']]], [1, 1, 2]],
  ],
})

add({
  title: 'Historial del navegador',
  name: 'browserHistory',
  params: 'start, operations',
  ts: 'start: string, operations: Array<["visit", string] | ["back", number] | ["forward", number]>): string[]',
  prompt:
    'Empiezas en start. "visit" abre una url y borra el adelante. "back" y "forward" se mueven como mucho los pasos pedidos, sin salirse. Devuelve la url después de cada operación.\nEjemplo: start "A"; visit B, visit C, back 1, back 1, forward 1 → ["B", "C", "B", "A", "B"].',
  used: 'dos pilas, atrás y adelante, y la url actual',
  explanation:
    'Visitar apila la actual en atrás, cambia la actual y vacía adelante: el futuro anterior ya no existe. Atrás mueve la actual a adelante. Adelante hace el camino inverso. El while corta solo si se acaban los pasos o la pila.',
  body: b(
    'const back = []',
    'let current = start',
    'const forward = []',
    'const out = []',
    'for (const op of operations) {',
    "  if (op[0] === 'visit') {",
    '    back.push(current)',
    '    current = op[1]',
    '    forward.length = 0',
    "  } else if (op[0] === 'back') {",
    '    let steps = op[1]',
    '    while (steps > 0 && back.length) {',
    '      forward.push(current)',
    '      current = back.pop()',
    '      steps--',
    '    }',
    '  } else {',
    '    let steps = op[1]',
    '    while (steps > 0 && forward.length) {',
    '      back.push(current)',
    '      current = forward.pop()',
    '      steps--',
    '    }',
    '  }',
    '  out.push(current)',
    '}',
    'return out',
  ),
  cases: [
    [['A', [['visit', 'B'], ['visit', 'C'], ['back', 1], ['back', 1], ['forward', 1]]], ['B', 'C', 'B', 'A', 'B']],
  ],
})

add({
  title: 'Autocompletar',
  name: 'trieSuggest',
  params: 'operations',
  ts: 'operations: Array<["add", string] | ["suggest", string]>): string[][]',
  prompt:
    '"add" mete una palabra. "suggest" devuelve las palabras con ese prefijo, ordenadas. Devuelve solo los resultados de suggest.\nEjemplo: add cat, add car, suggest ca, suggest z → [["car", "cat"], []].',
  used: 'un trie: objeto anidado por carácter y una marca de fin de palabra',
  explanation:
    'Cada carácter es una arista. La marca word guarda la palabra completa en el nodo final, para no reconstruirla. suggest baja por el prefijo y luego recorre el subárbol en orden de clave. Un array filtrado con startsWith también vale y es más corto, pero es lineal en el diccionario; el trie solo mira el prefijo y lo que cuelga de él.',
  body: b(
    'const root = {}',
    'const out = []',
    'function add(word) {',
    '  let node = root',
    '  for (const ch of word) {',
    '    node[ch] = node[ch] ?? {}',
    '    node = node[ch]',
    '  }',
    '  node.word = word',
    '}',
    'function suggest(prefix) {',
    '  let node = root',
    '  for (const ch of prefix) {',
    '    if (!node[ch]) return []',
    '    node = node[ch]',
    '  }',
    '  const found = []',
    '  function walk(current) {',
    '    if (current.word) found.push(current.word)',
    '    for (const key of Object.keys(current).sort()) if (key !== "word") walk(current[key])',
    '  }',
    '  walk(node)',
    '  return found',
    '}',
    'for (const op of operations) {',
    "  if (op[0] === 'add') add(op[1])",
    '  else out.push(suggest(op[1]))',
    '}',
    'return out',
  ),
  cases: [
    [[[['add', 'cat'], ['add', 'car'], ['suggest', 'ca'], ['suggest', 'z']]], [['car', 'cat'], []]],
  ],
})

add({
  title: 'Sumas y restas',
  name: 'evalPlusMinus',
  params: 'text',
  ts: 'text: string): number',
  prompt: 'Evalúa una expresión de enteros no negativos con + y -, sin paréntesis ni espacios obligatorios, aunque puede haberlos.\nEjemplo: "10 - 2 + 3" → 11. "1+2-3" → 0.',
  used: 'un número en construcción, un signo pendiente y un barrido',
  explanation:
    'No hace falta un parser completo si solo hay suma y resta, que asocian a la izquierda y tienen la misma prioridad. Se acumula la cifra mientras salen dígitos. Al ver un operador, se aplica el signo anterior al número ya cerrado. Un operador ficticio al final fuerza el último volcado.',
  body: b(
    "let total = 0",
    'let number = 0',
    'let sign = 1',
    "const source = text.replace(/\\s/g, '') + '+'",
    'for (const ch of source) {',
    "  if (ch >= '0' && ch <= '9') number = number * 10 + Number(ch)",
    '  else {',
    '    total += sign * number',
    '    number = 0',
    "    sign = ch === '-' ? -1 : 1",
    '  }',
    '}',
    'return total',
  ),
  cases: [
    [['10 - 2 + 3'], 11],
    [['1+2-3'], 0],
    [['42'], 42],
  ],
})

add({
  title: 'Calculadora con prioridad',
  name: 'calcII',
  params: 'text',
  ts: 'text: string): number',
  prompt: 'Evalúa enteros no negativos con +, -, * y /. La división trunca hacia cero. * y / van antes que + y -. Puede haber espacios. No hay paréntesis.\nEjemplo: "3+2*2" → 7. " 3/2 " → 1. " 3+5 / 2 " → 5.',
  used: 'una pila de términos ya resueltos y el operador anterior',
  explanation:
    'Suma y resta se dejan en la pila como números con signo. Multiplicación y división se aplican ya, contra la cima, porque tienen prioridad. Al final se suman los términos. Math.trunc tira hacia cero, que es lo que se pide de la división entera aquí.',
  body: b(
    'const tokens = []',
    'let number = 0',
    "let sign = '+'",
    "const source = text.replace(/\\s/g, '')",
    'for (let i = 0; i < source.length; i++) {',
    '  const ch = source[i]',
    "  if (ch >= '0' && ch <= '9') number = number * 10 + Number(ch)",
    "  if (ch < '0' || i === source.length - 1) {",
    "    if (sign === '+') tokens.push(number)",
    "    else if (sign === '-') tokens.push(-number)",
    "    else if (sign === '*') tokens.push(tokens.pop() * number)",
    '    else tokens.push(Math.trunc(tokens.pop() / number))',
    '    sign = ch',
    '    number = 0',
    '  }',
    '}',
    'let total = 0',
    'for (const n of tokens) total += n',
    'return total',
  ),
  cases: [
    [['3+2*2'], 7],
    [[' 3/2 '], 1],
    [[' 3+5 / 2 '], 5],
  ],
})

add({
  title: 'Orden topológico',
  name: 'topologicalSort',
  params: 'n, edges',
  ts: 'n: number, edges: number[][]): number[] | null',
  prompt: 'Hay n nodos, del 0 a n - 1. edges son pares [desde, hasta]. Devuelve un orden en el que cada arista va de un nodo ya listado a uno posterior. Si hay varias opciones, elige siempre el nodo de número menor disponible. Si hay ciclo, null.\nEjemplo: 4, [[1, 0], [2, 0], [3, 1], [3, 2]] → [3, 1, 2, 0].',
  used: 'el algoritmo de Kahn: grados de entrada y una cola',
  explanation:
    'Un nodo puede salir cuando ya salieron todos los que apuntan a él, es decir, cuando su grado de entrada llega a 0. Se empieza por los de grado 0. Ordenar la cola en cada extracción fuerza el desempate por número menor, que deja el resultado único. Si al final no han salido n nodos, había un ciclo.',
  body: b(
    'const next = Array.from({ length: n }, () => [])',
    'const indegree = new Array(n).fill(0)',
    'for (const [from, to] of edges) {',
    '  next[from].push(to)',
    '  indegree[to]++',
    '}',
    'const queue = []',
    'for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i)',
    'const out = []',
    'while (queue.length) {',
    '  queue.sort((a, b) => a - b)',
    '  const node = queue.shift()',
    '  out.push(node)',
    '  for (const to of next[node]) {',
    '    indegree[to]--',
    '    if (indegree[to] === 0) queue.push(to)',
    '  }',
    '}',
    'return out.length === n ? out : null',
  ),
  cases: [
    [[4, [[1, 0], [2, 0], [3, 1], [3, 2]]], [3, 1, 2, 0]],
    [[2, [[0, 1], [1, 0]]], null],
  ],
})

add({
  title: 'Caminos mínimos',
  name: 'dijkstra',
  params: 'n, edges, start',
  ts: 'n: number, edges: number[][], start: number): Array<number | null>',
  prompt: 'Grafo dirigido de n nodos, del 0 a n - 1. edges son [desde, hasta, peso] con pesos positivos. Devuelve la distancia mínima desde start a cada nodo, o null si no se llega.\nEjemplo: 3, [[0, 1, 5]], 0 → [0, 5, null].',
  used: 'Dijkstra con un array de distancias y la elección lineal del nodo más cercano',
  explanation:
    'Cada nodo se fija una vez, cuando es el no visitado de menor distancia conocida. Desde él se relajan las aristas. Con pesos negativos el algoritmo no vale: haría falta Bellman-Ford. La versión con montículo es O((V + E) log V); aquí elegir el mínimo a mano es O(V²) y se lee mejor en un grafo pequeño.',
  body: b(
    'const next = Array.from({ length: n }, () => [])',
    'for (const [from, to, weight] of edges) next[from].push([to, weight])',
    'const dist = new Array(n).fill(null)',
    'dist[start] = 0',
    'const used = new Array(n).fill(false)',
    'for (let step = 0; step < n; step++) {',
    '  let node = -1',
    '  for (let i = 0; i < n; i++) {',
    '    if (!used[i] && dist[i] !== null && (node === -1 || dist[i] < dist[node])) node = i',
    '  }',
    '  if (node === -1) break',
    '  used[node] = true',
    '  for (const [to, weight] of next[node]) {',
    '    const nextDist = dist[node] + weight',
    '    if (dist[to] === null || nextDist < dist[to]) dist[to] = nextDist',
    '  }',
    '}',
    'return dist',
  ),
  cases: [
    [[3, [[0, 1, 5]], 0], [0, 5, null]],
    [[4, [[0, 1, 1], [0, 2, 4], [1, 2, 1], [1, 3, 2]], 0], [0, 1, 2, 3]],
  ],
})

add({
  title: 'Islas',
  name: 'numIslands',
  params: 'grid',
  ts: 'grid: string[][]): number',
  prompt: 'grid está hecha de "1" tierra y "0" agua. Una isla es un grupo de tierras unidas en cruz, no en diagonal. ¿Cuántas hay? Hay al menos una fila.\nEjemplo: [["1","1","0"],["1","0","0"],["0","0","1"]] → 2.',
  used: 'búsqueda en profundidad que marca lo visitado',
  explanation:
    'Cada tierra no visitada abre una isla. Desde ella se recorren las cuatro direcciones y se marcan, para no contarla otra vez. El coste es el tamaño de la cuadrícula. La marca puede ser sobre una copia o sobre otro array: aquí seen evita mutar el argumento.',
  body: b(
    'const rows = grid.length',
    'const cols = grid[0].length',
    'const seen = grid.map((row) => row.map(() => false))',
    'let total = 0',
    'function walk(r, c) {',
    "  if (r < 0 || c < 0 || r >= rows || c >= cols || seen[r][c] || grid[r][c] !== '1') return",
    '  seen[r][c] = true',
    '  walk(r + 1, c)',
    '  walk(r - 1, c)',
    '  walk(r, c + 1)',
    '  walk(r, c - 1)',
    '}',
    'for (let r = 0; r < rows; r++) {',
    '  for (let c = 0; c < cols; c++) {',
    "    if (grid[r][c] === '1' && !seen[r][c]) {",
    '      total++',
    '      walk(r, c)',
    '    }',
    '  }',
    '}',
    'return total',
  ),
  cases: [
    [[[['1', '1', '0'], ['1', '0', '0'], ['0', '0', '1']]], 2],
    [[[['0']]], 0],
  ],
})

add({
  title: 'Camino más corto en la cuadrícula',
  name: 'shortestPathBinary',
  params: 'grid',
  ts: 'grid: number[][]): number',
  prompt: '0 es casilla libre y 1 es muro. Solo se camina en cruz. Devuelve la longitud del camino más corto de la esquina superior izquierda a la inferior derecha, contando las dos. Si no hay, -1.\nEjemplo: [[0, 0], [1, 0]] → 3.',
  used: 'búsqueda en anchura',
  explanation:
    'En un grafo sin pesos, la anchura da el mínimo de aristas. La profundidad no, porque el primer camino que llega puede ser un rodeo. Se marca al encolar, no al sacar, para no meter la misma casilla varias veces.',
  body: b(
    'const rows = grid.length',
    'const cols = grid[0].length',
    'if (grid[0][0] === 1) return -1',
    'const queue = [[0, 0, 1]]',
    "const seen = new Set(['0,0'])",
    'let head = 0',
    'while (head < queue.length) {',
    '  const [r, c, dist] = queue[head++]',
    '  if (r === rows - 1 && c === cols - 1) return dist',
    '  for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {',
    '    const nr = r + dr',
    '    const nc = c + dc',
    "    const key = nr + ',' + nc",
    '    if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || grid[nr][nc] === 1 || seen.has(key)) continue',
    '    seen.add(key)',
    '    queue.push([nr, nc, dist + 1])',
    '  }',
    '}',
    'return -1',
  ),
  cases: [
    [[[[0, 0], [1, 0]]], 3],
    [[[[1]]], -1],
  ],
})

add({
  title: 'Se pueden cursar',
  name: 'canFinish',
  params: 'n, prerequisites',
  ts: 'n: number, prerequisites: number[][]): boolean',
  prompt: 'Hay n cursos, del 0 a n - 1. prerequisites son pares [curso, requisito]. Di si se puede cursar todo, es decir, si el grafo no tiene ciclo.\nEjemplo: 2, [[1, 0]] → true. 2, [[1, 0], [0, 1]] → false.',
  used: 'orden topológico de Kahn',
  explanation:
    'Es el mismo recuento de grados que el orden topológico, pero aquí no importa el orden: importa si se vacía el grafo. Un ciclo deja algún grado por encima de cero para siempre.',
  body: b(
    'const next = Array.from({ length: n }, () => [])',
    'const indegree = new Array(n).fill(0)',
    'for (const [course, req] of prerequisites) {',
    '  next[req].push(course)',
    '  indegree[course]++',
    '}',
    'const queue = []',
    'for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i)',
    'let seen = 0',
    'while (queue.length) {',
    '  const node = queue.shift()',
    '  seen++',
    '  for (const to of next[node]) {',
    '    indegree[to]--',
    '    if (indegree[to] === 0) queue.push(to)',
    '  }',
    '}',
    'return seen === n',
  ),
  cases: [
    [[2, [[1, 0]]], true],
    [[2, [[1, 0], [0, 1]]], false],
  ],
})

add({
  title: 'Componentes conexas',
  name: 'connectedComponents',
  params: 'n, edges',
  ts: 'n: number, edges: number[][]): number',
  prompt: 'Grafo no dirigido de n nodos, del 0 a n - 1. edges son pares [a, b]. ¿Cuántas componentes conexas hay?\nEjemplo: 5, [[0, 1], [1, 2], [3, 4]] → 2.',
  used: 'union-find con compresión de camino',
  explanation:
    'Cada arista une dos conjuntos. find baja hasta la raíz y aprovecha para aplanar el camino. Al final, el número de raíces distintas es el de componentes. Una DFS por nodo también vale; union-find brilla cuando las uniones llegan sueltas, no como un grafo ya montado.',
  body: b(
    'const parent = Array.from({ length: n }, (_, i) => i)',
    'function find(x) {',
    '  if (parent[x] !== x) parent[x] = find(parent[x])',
    '  return parent[x]',
    '}',
    'for (const [a, b] of edges) parent[find(a)] = find(b)',
    'const roots = new Set()',
    'for (let i = 0; i < n; i++) roots.add(find(i))',
    'return roots.size',
  ),
  cases: [
    [[5, [[0, 1], [1, 2], [3, 4]]], 2],
    [[1, []], 1],
  ],
})

add({
  title: 'K-ésimo mayor',
  name: 'kthLargest',
  params: 't, k',
  ts: 't: number[], k: number): number',
  prompt: 'Devuelve el k-ésimo mayor. k empieza en 1. t no está vacío y k es válido.\nEjemplo: [3, 2, 1, 5, 6, 4], 2 → 5.',
  used: 'ordenar de mayor a menor',
  explanation:
    'Ordenar es O(n log n) y deja el k-ésimo en el índice k - 1. Quickselect lo haría en tiempo medio lineal, sin ordenar el resto, y es la herramienta cuando n es enorme y solo se pide un puesto. Para leer el algoritmo, el sort dice lo mismo con menos código.',
  body: b('const sorted = t.slice().sort((a, b) => b - a)', 'return sorted[k - 1]'),
  cases: [
    [[[3, 2, 1, 5, 6, 4], 2], 5],
    [[[7], 1], 7],
  ],
})

add({
  title: 'Mezclar k listas',
  name: 'mergeKLists',
  params: 'lists',
  ts: 'lists: number[][]): number[]',
  prompt: 'Cada lista está ordenada de menor a mayor. Devuelve la mezcla ordenada.\nEjemplo: [[1, 4, 5], [1, 3, 4], [2, 6]] → [1, 1, 2, 3, 4, 4, 5, 6].',
  used: 'k punteros y, en cada paso, la cabeza mínima',
  explanation:
    'Es el merge de dos listas, generalizado. Elegir el mínimo entre k cabezas a mano es O(k) por elemento. Un montículo lo bajaría a O(log k). El resultado es el mismo; cambia el coste cuando k crece.',
  body: b(
    'const out = []',
    'const idx = lists.map(() => 0)',
    'while (true) {',
    '  let best = -1',
    '  for (let i = 0; i < lists.length; i++) {',
    '    if (idx[i] >= lists[i].length) continue',
    '    if (best === -1 || lists[i][idx[i]] < lists[best][idx[best]]) best = i',
    '  }',
    '  if (best === -1) break',
    '  out.push(lists[best][idx[best]])',
    '  idx[best]++',
    '}',
    'return out',
  ),
  cases: [
    [[[[1, 4, 5], [1, 3, 4], [2, 6]]], [1, 1, 2, 3, 4, 4, 5, 6]],
    [[[]], []],
  ],
})

add({
  title: 'Salas de reuniones',
  name: 'minMeetingRooms',
  params: 'intervals',
  ts: 'intervals: number[][]): number',
  prompt: 'Cada reunión es [inicio, fin). Devuelve cuántas salas hacen falta para que ninguna se solape en la misma sala.\nEjemplo: [[0, 30], [5, 10], [15, 20]] → 2.',
  used: 'dos arrays ordenados, inicios y fines, y dos punteros',
  explanation:
    'Se recorren los inicios en orden. Si el inicio ya alcanza o pasa el fin más temprano pendiente, esa sala se libera. Si no, hace falta otra. Es el máximo de reuniones abiertas a la vez.',
  body: b(
    'const starts = intervals.map((item) => item[0]).sort((a, b) => a - b)',
    'const ends = intervals.map((item) => item[1]).sort((a, b) => a - b)',
    'let rooms = 0',
    'let best = 0',
    'let j = 0',
    'for (const start of starts) {',
    '  while (ends[j] <= start) {',
    '    rooms--',
    '    j++',
    '  }',
    '  rooms++',
    '  if (rooms > best) best = rooms',
    '}',
    'return best',
  ),
  cases: [
    [[[[0, 30], [5, 10], [15, 20]]], 2],
    [[[[1, 2], [2, 3]]], 1],
  ],
})

add({
  title: 'Máximo de intervalos compatibles',
  name: 'maxEventsNonOverlap',
  params: 'intervals',
  ts: 'intervals: number[][]): number',
  prompt: 'Cada intervalo es [inicio, fin). Devuelve cuántos se pueden elegir sin que se solapen. Tocar en el fin está permitido.\nEjemplo: [[1, 2], [2, 3], [3, 4], [1, 3]] → 3.',
  used: 'ordenar por el fin y quedarse el que antes termina',
  explanation:
    'Ordenar por el fin y coger el primero que no choca con el último elegido es óptimo: deja libre el hueco más pronto. Ordenar por el inicio no lo sería. Es el problema clásico de selección de actividades.',
  body: b(
    'const sorted = intervals.slice().sort((a, b) => a[1] - b[1])',
    'let total = 0',
    'let end = -1e15',
    'for (const interval of sorted) {',
    '  if (interval[0] >= end) {',
    '    total++',
    '    end = interval[1]',
    '  }',
    '}',
    'return total',
  ),
  cases: [
    [[[[1, 2], [2, 3], [3, 4], [1, 3]]], 3],
    [[[[1, 5], [2, 3]]], 1],
  ],
})

add({
  title: 'Agua atrapada',
  name: 'trapRain',
  params: 'height',
  ts: 'height: number[]): number',
  prompt: 'height[i] es la altura de una barra. ¿Cuánta agua queda atrapada entre ellas después de llover?\nEjemplo: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] → 6.',
  used: 'dos punteros y el máximo visto por cada lado',
  explanation:
    'El agua sobre una barra es el mínimo de los máximos a izquierda y derecha, menos su altura. Con dos punteros no hace falta guardar esos máximos en arrays: el lado de menor máximo es el que limita, y se avanza ese puntero. Es lineal y usa memoria constante.',
  body: b(
    'let left = 0',
    'let right = height.length - 1',
    'let leftMax = 0',
    'let rightMax = 0',
    'let water = 0',
    'while (left < right) {',
    '  if (height[left] < height[right]) {',
    '    if (height[left] >= leftMax) leftMax = height[left]',
    '    else water += leftMax - height[left]',
    '    left++',
    '  } else {',
    '    if (height[right] >= rightMax) rightMax = height[right]',
    '    else water += rightMax - height[right]',
    '    right--',
    '  }',
    '}',
    'return water',
  ),
  cases: [
    [[[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], 6],
    [[[1, 2]], 0],
  ],
})

add({
  title: 'Rectángulo en el histograma',
  name: 'largestRectangle',
  params: 'heights',
  ts: 'heights: number[]): number',
  prompt: 'Cada barra tiene ancho 1. Devuelve el área del rectángulo más grande que cabe en el histograma.\nEjemplo: [2, 1, 5, 6, 2, 3] → 10.',
  used: 'pila creciente de índices y un centinela 0 al final',
  explanation:
    'La pila guarda barras en orden creciente de altura. Cuando llega una más baja, las que quedan por encima ya conocen su límite derecho y se puede calcular su área. El 0 final vacía la pila. Cada barra entra y sale una vez.',
  body: b(
    'const stack = [-1]',
    'let best = 0',
    'const bars = heights.concat(0)',
    'for (let i = 0; i < bars.length; i++) {',
    '  while (stack.length > 1 && bars[stack[stack.length - 1]] > bars[i]) {',
    '    const height = bars[stack.pop()]',
    '    const width = i - stack[stack.length - 1] - 1',
    '    if (height * width > best) best = height * width',
    '  }',
    '  stack.push(i)',
    '}',
    'return best',
  ),
  cases: [
    [[[2, 1, 5, 6, 2, 3]], 10],
    [[[2, 4]], 4],
  ],
})

add({
  title: 'Máximo de la ventana',
  name: 'slidingWindowMax',
  params: 't, k',
  ts: 't: number[], k: number): number[]',
  prompt: 'Devuelve el máximo de cada ventana de tamaño k. k está entre 1 y t.length.\nEjemplo: [1, 3, -1, -3, 5, 3, 6, 7], 3 → [3, 3, 5, 5, 6, 7].',
  used: 'deque de índices, de mayor a menor valor',
  explanation:
    'La cabeza de la deque es el índice del máximo de la ventana. Se tiran los índices que ya salieron de la ventana y los que son menores o iguales que el nuevo valor, porque nunca volverán a ser el máximo. Cada índice entra y sale una vez, así que es lineal. Recalcular el máximo en cada ventana sería O(nk).',
  body: b(
    'const out = []',
    'const deque = []',
    'for (let i = 0; i < t.length; i++) {',
    '  while (deque.length && deque[0] <= i - k) deque.shift()',
    '  while (deque.length && t[deque[deque.length - 1]] <= t[i]) deque.pop()',
    '  deque.push(i)',
    '  if (i >= k - 1) out.push(t[deque[0]])',
    '}',
    'return out',
  ),
  cases: [
    [[[1, 3, -1, -3, 5, 3, 6, 7], 3], [3, 3, 5, 5, 6, 7]],
  ],
})

add({
  title: 'Palíndromo más largo',
  name: 'longestPalindrome',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Devuelve el substring palíndromo más largo. Si hay varios de la misma longitud, el que empieza antes. text puede estar vacío.\nEjemplo: "babad" → "bab".',
  used: 'expandir desde cada centro, impar y par',
  explanation:
    'Todo palíndromo tiene un centro: una letra, o el hueco entre dos letras iguales. Desde cada centro se crece mientras los lados coincidan. Guardar el mejor evita la tabla de programación dinámica, que también vale y usa más memoria. Manacher lo haría en lineal estricto; esta versión es cuadrática y clara.',
  body: b(
    'let start = 0',
    'let end = 0',
    'function grow(left, right) {',
    '  while (left >= 0 && right < text.length && text[left] === text[right]) {',
    '    left--',
    '    right++',
    '  }',
    '  return [left + 1, right - 1]',
    '}',
    'for (let i = 0; i < text.length; i++) {',
    '  const odd = grow(i, i)',
    '  const even = grow(i, i + 1)',
    '  const best = odd[1] - odd[0] > even[1] - even[0] ? odd : even',
    '  if (best[1] - best[0] > end - start) {',
    '    start = best[0]',
    '    end = best[1]',
    '  }',
    '}',
    'return text.slice(start, end + 1)',
  ),
  cases: [
    [['babad'], 'bab'],
    [['cbbd'], 'bb'],
    [[''], ''],
  ],
})

add({
  title: 'Distancia de edición',
  name: 'editDistance',
  params: 'a, b',
  ts: 'a: string, b: string): number',
  prompt: 'Devuelve el mínimo de inserciones, borrados y sustituciones para convertir a en b.\nEjemplo: "horse", "ros" → 3.',
  used: 'programación dinámica sobre prefijos',
  explanation:
    'dp[i][j] es el coste de convertir los primeros i de a en los primeros j de b. Si las letras coinciden, se copia la diagonal. Si no, se toma el mínimo de borrar, insertar o sustituir, más uno. La primera fila y la primera columna son los costes de construir desde vacío.',
  body: b(
    'const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))',
    'for (let i = 0; i <= a.length; i++) dp[i][0] = i',
    'for (let j = 0; j <= b.length; j++) dp[0][j] = j',
    'for (let i = 1; i <= a.length; i++) {',
    '  for (let j = 1; j <= b.length; j++) {',
    '    const cost = a[i - 1] === b[j - 1] ? 0 : 1',
    '    dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)',
    '  }',
    '}',
    'return dp[a.length][b.length]',
  ),
  cases: [
    [['horse', 'ros'], 3],
    [['', 'a'], 1],
  ],
})

add({
  title: 'Mochila 0/1',
  name: 'knapsack',
  params: 'weights, values, capacity',
  ts: 'weights: number[], values: number[], capacity: number): number',
  prompt: 'Cada objeto se puede coger una vez. Devuelve el máximo valor sin pasar de capacity. capacity es 0 o más.\nEjemplo: pesos [1, 3, 4], valores [15, 20, 30], capacidad 4 → 35.',
  used: 'programación dinámica unidimensional, recorriendo la capacidad hacia atrás',
  explanation:
    'best[cap] es el mejor valor con esa capacidad. Se recorre hacia atrás para que el mismo objeto no se use dos veces en esta vuelta: hacia delante sería la mochila ilimitada. Cada objeto decide, para cada capacidad que lo admite, si mejora lo ya guardado.',
  body: b(
    'const best = new Array(capacity + 1).fill(0)',
    'for (let i = 0; i < weights.length; i++) {',
    '  for (let cap = capacity; cap >= weights[i]; cap--) {',
    '    const next = best[cap - weights[i]] + values[i]',
    '    if (next > best[cap]) best[cap] = next',
    '  }',
    '}',
    'return best[capacity]',
  ),
  cases: [
    [[[1, 3, 4], [15, 20, 30], 4], 35],
    [[[2], [10], 1], 0],
  ],
})

add({
  title: 'Formas de dar el cambio',
  name: 'coinWays',
  params: 'coins, amount',
  ts: 'coins: number[], amount: number): number',
  prompt: 'Cuenta de cuántas formas se puede sumar amount con esas monedas. El orden no importa: 1+2 y 2+1 son la misma forma. amount es 0 o más. amount 0 tiene una forma, no usar nada.\nEjemplo: [1, 2, 5], 5 → 4.',
  used: 'programación dinámica por moneda, no por importe primero',
  explanation:
    'Si el bucle exterior fuera el importe, se contarían permutaciones. Al recorrer moneda a moneda, cada combinación se construye en el orden de las monedas y se cuenta una vez. ways[0] es 1 para poder empezar.',
  body: b(
    'const ways = [1]',
    'for (let i = 1; i <= amount; i++) ways.push(0)',
    'for (const coin of coins) {',
    '  for (let i = coin; i <= amount; i++) ways[i] += ways[i - coin]',
    '}',
    'return ways[amount]',
  ),
  cases: [
    [[[1, 2, 5], 5], 4],
    [[[2], 3], 0],
    [[[1], 0], 1],
  ],
})

add({
  title: 'Partir en palabras',
  name: 'wordBreak',
  params: 'text, words',
  ts: 'text: string, words: string[]): boolean',
  prompt: 'Di si text se puede partir en palabras del diccionario, sin solapes ni letras sueltas. Se pueden reutilizar.\nEjemplo: "leetcode", ["leet", "code"] → true. "catsandog", ["cats", "dog", "sand", "and", "cat"] → false.',
  used: 'programación dinámica sobre prefijos y un Set',
  explanation:
    'ok[i] dice si los primeros i caracteres se pueden partir. Se prueba cada corte anterior que ya era válido y cuyo trozo está en el diccionario. El Set evita buscar la palabra en el array. Es cuadrático en la longitud del texto.',
  body: b(
    'const set = new Set(words)',
    'const ok = [true]',
    'for (let i = 1; i <= text.length; i++) {',
    '  ok.push(false)',
    '  for (let j = 0; j < i; j++) {',
    '    if (ok[j] && set.has(text.slice(j, i))) {',
    '      ok[i] = true',
    '      break',
    '    }',
    '  }',
    '}',
    'return ok[text.length]',
  ),
  cases: [
    [['leetcode', ['leet', 'code']], true],
    [['catsandog', ['cats', 'dog', 'sand', 'and', 'cat']], false],
  ],
})

add({
  title: 'Normalizar ruta',
  name: 'pathNormalize',
  params: 'path',
  ts: 'path: string): string',
  prompt: 'Simplifica una ruta. "." es la carpeta actual, ".." sube, y las barras repetidas se colapsan. Si empezaba por /, el resultado también. No hace falta conservar una barra final.\nEjemplo: "/a/b/../c" → "/a/c". "a//b/./c" → "a/b/c".',
  used: 'una pila de segmentos',
  explanation:
    'Se ignoran los vacíos y los puntos. ".." desapila un segmento, si hay. El resto se apila. La barra inicial se recuerda aparte porque split la convertiría en un segmento vacío. Esta versión no se sale por encima de la raíz: un ".." de más en una ruta absoluta se pierde.',
  body: b(
    "const absolute = path.startsWith('/')",
    'const parts = []',
    "for (const part of path.split('/')) {",
    "  if (part === '' || part === '.') continue",
    "  if (part === '..') parts.pop()",
    '  else parts.push(part)',
    '}',
    "return (absolute ? '/' : '') + parts.join('/')",
  ),
  cases: [
    [['/a/b/../c'], '/a/c'],
    [['a//b/./c'], 'a/b/c'],
    [['/../a'], '/a'],
  ],
})

add({
  title: 'Comparar semver',
  name: 'semverCompare',
  params: 'a, b',
  ts: 'a: string, b: string): number',
  prompt: 'Compara dos versiones major.minor.patch. Devuelve -1 si a es menor, 1 si es mayor y 0 si son iguales. No hay etiquetas ni ceros a la izquierda raros: son tres enteros.\nEjemplo: "1.2.3", "1.2.10" → -1.',
  used: 'partir por el punto y comparar número a número',
  explanation:
    'Comparar los textos ordenaría "1.2.10" antes que "1.2.3", porque "1" va antes que "3" como carácter. Hay que pasar cada tramo a número y parar en la primera diferencia. El orden es major, luego minor, luego patch.',
  body: b(
    'const pa = a.split(".").map(Number)',
    'const pb = b.split(".").map(Number)',
    'for (let i = 0; i < 3; i++) {',
    '  const da = pa[i] ?? 0',
    '  const db = pb[i] ?? 0',
    '  if (da < db) return -1',
    '  if (da > db) return 1',
    '}',
    'return 0',
  ),
  cases: [
    [['1.2.3', '1.2.10'], -1],
    [['1.2.3', '1.2.3'], 0],
    [['2.0.0', '1.9.9'], 1],
  ],
})

add({
  title: 'Leer query string',
  name: 'parseQuery',
  params: 'text',
  ts: 'text: string): Record<string, string>',
  prompt: 'Convierte una query, con o sin ? inicial, en un objeto. Los valores van decodificados. Una clave sin = vale "". Si la clave se repite, gana la última.\nEjemplo: "?a=1&b=hola%20x" → { a: "1", b: "hola x" }.',
  used: 'split, indexOf y decodeURIComponent',
  explanation:
    'Se quita el ? si está. Cada trozo separado por & es una pareja. indexOf("=") distingue una clave sola de un valor vacío. decodeURIComponent deshace el %20. No se usa URLSearchParams para ver el recorrido.',
  body: b(
    'const out = {}',
    "const source = text.startsWith('?') ? text.slice(1) : text",
    'if (!source) return out',
    "for (const part of source.split('&')) {",
    '  if (!part) continue',
    "  const index = part.indexOf('=')",
    '  const key = decodeURIComponent(index === -1 ? part : part.slice(0, index))',
    "  const value = decodeURIComponent(index === -1 ? '' : part.slice(index + 1))",
    '  out[key] = value',
    '}',
    'return out',
  ),
  cases: [
    [['?a=1&b=hola%20x'], { a: '1', b: 'hola x' }],
    [['flag'], { flag: '' }],
    [[''], {}],
  ],
})

add({
  title: 'Escribir query string',
  name: 'buildQuery',
  params: 'obj',
  ts: 'obj: Record<string, string>): string',
  prompt: 'Convierte un objeto de strings en query, sin ? inicial. Las claves salen en orden de inserción y los valores van codificados.\nEjemplo: { a: "1", b: "hola x" } → "a=1&b=hola%20x".',
  used: 'Object.keys, encodeURIComponent y join',
  explanation:
    'Es el inverso de parseQuery para este subconjunto: una clave, un valor, sin arrays. encodeURIComponent escapa el espacio. El orden de Object.keys en un objeto plano es el de inserción.',
  body: b(
    "return Object.keys(obj).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&')",
  ),
  cases: [
    [[{ a: '1', b: 'hola x' }], 'a=1&b=hola%20x'],
    [[{}], ''],
  ],
})

add({
  title: 'Leer un INI',
  name: 'parseIni',
  params: 'text',
  ts: 'text: string): Record<string, Record<string, string>>',
  prompt:
    'Lee un INI pequeño. [seccion] abre una sección. clave=valor guarda un string ya recortado. Las líneas vacías y las que empiezan por ; o # se ignoran. Las claves de antes de cualquier sección caen en "default".\nEjemplo: "[db]\\nhost=localhost" → { db: { host: "localhost" } }.',
  used: 'split por líneas, una sección actual y objetos anidados',
  explanation:
    'El parser es una máquina de un estado: la sección actual. Una línea entre corchetes la cambia. Una línea con = parte clave y valor. No hay comillas ni valores multilínea: es el INI mínimo con el que se ve la idea, no el formato completo.',
  body: b(
    'const out = {}',
    "let section = ''",
    "for (const raw of text.split('\\n')) {",
    '  const line = raw.trim()',
    "  if (!line || line.startsWith(';') || line.startsWith('#')) continue",
    "  if (line.startsWith('[') && line.endsWith(']')) {",
    '    section = line.slice(1, -1)',
    '    out[section] = out[section] ?? {}',
    '    continue',
    '  }',
    "  const index = line.indexOf('=')",
    '  const key = line.slice(0, index).trim()',
    '  const value = line.slice(index + 1).trim()',
    "  const bucket = section || 'default'",
    '  out[bucket] = out[bucket] ?? {}',
    '  out[bucket][key] = value',
    '}',
    'return out',
  ),
  cases: [
    [['[db]\nhost=localhost\nport=5432'], { db: { host: 'localhost', port: '5432' } }],
    [['# nota\nnombre = Ana'], { default: { nombre: 'Ana' } }],
  ],
})

add({
  title: 'Títulos de markdown',
  name: 'markdownHeadings',
  params: 'text',
  ts: 'text: string): Array<{ level: number, text: string }>',
  prompt: 'Devuelve los títulos ATX. Una línea es título si empieza por 1 a 6 #, un espacio y el texto.\nEjemplo: "# Hola\\ntexto\\n## Sub" → [{ level: 1, text: "Hola" }, { level: 2, text: "Sub" }].',
  used: 'una expresión regular por línea',
  explanation:
    '^(#{1,6})\\s+(.*)$ exige los almohadillados al principio, luego espacio, luego el resto de la línea. El número de # es el nivel. Las líneas que no encajan se ignoran. No se interpretan títulos con cierre ## al final: es el caso simple.',
  body: b(
    'const out = []',
    "for (const line of text.split('\\n')) {",
    '  const match = /^(#{1,6})\\s+(.*)$/.exec(line)',
    '  if (match) out.push({ level: match[1].length, text: match[2] })',
    '}',
    'return out',
  ),
  cases: [
    [['# Hola\ntexto\n## Sub'], [{ level: 1, text: 'Hola' }, { level: 2, text: 'Sub' }]],
    [['sin titulo'], []],
  ],
})

add({
  title: 'Partir líneas',
  name: 'wrapText',
  params: 'text, width',
  ts: 'text: string, width: number): string[]',
  prompt: 'Parte text en líneas de como mucho width caracteres, cortando por espacios. Las palabras caben en width. No dejes espacios al final de la línea.\nEjemplo: "uno dos tres", 7 → ["uno dos", "tres"].',
  used: 'un bucle de palabras y una línea en construcción',
  explanation:
    'Si la palabra cabe en la línea actual más un espacio, se añade. Si no, la línea se cierra y la palabra abre la siguiente. No se parten palabras. Es el ajuste de un editor de texto en su versión más simple, sin justificar.',
  body: b(
    "const words = text.split(' ')",
    'const lines = []',
    "let line = ''",
    'for (const word of words) {',
    '  if (!line) line = word',
    '  else if (line.length + 1 + word.length <= width) line += " " + word',
    '  else {',
    '    lines.push(line)',
    '    line = word',
    '  }',
    '}',
    'if (line) lines.push(line)',
    'return lines',
  ),
  cases: [
    [['uno dos tres', 7], ['uno dos', 'tres']],
    [['hola', 10], ['hola']],
  ],
})

add({
  title: 'Palabra más cercana',
  name: 'closestWord',
  params: 'word, dict',
  ts: 'word: string, dict: string[]): string',
  prompt: 'Devuelve la palabra del diccionario con menor distancia de edición a word. Si empatan, la que aparece antes. dict no está vacío.\nEjemplo: "cat", ["car", "dog", "cart"] → "car".',
  used: 'la distancia de edición y un mínimo',
  explanation:
    'La distancia es la de insertar, borrar y sustituir, la misma tabla que editDistance. Se calcula contra cada candidata y se guarda la menor. El empate no sustituye, así que gana la primera del diccionario. Con un diccionario enorme se usaría un BK-tree o un índice; aquí el diccionario es corto.',
  body: b(
    'function dist(a, b) {',
    '  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))',
    '  for (let i = 0; i <= a.length; i++) dp[i][0] = i',
    '  for (let j = 0; j <= b.length; j++) dp[0][j] = j',
    '  for (let i = 1; i <= a.length; i++) {',
    '    for (let j = 1; j <= b.length; j++) {',
    '      const cost = a[i - 1] === b[j - 1] ? 0 : 1',
    '      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)',
    '    }',
    '  }',
    '  return dp[a.length][b.length]',
    '}',
    'let best = dict[0]',
    'let bestDist = dist(word, best)',
    'for (const item of dict) {',
    '  const next = dist(word, item)',
    '  if (next < bestDist) {',
    '    bestDist = next',
    '    best = item',
    '  }',
    '}',
    'return best',
  ),
  cases: [
    [['cat', ['car', 'dog', 'cart']], 'car'],
    [['a', ['a', 'b']], 'a'],
  ],
})

add({
  title: 'Barajar con semilla',
  name: 'shuffleSeed',
  params: 't, seed',
  ts: 't: number[], seed: number): number[]',
  prompt:
    'Devuelve una copia de t barajada con Fisher-Yates. El aleatorio es este LCG: state empieza en seed % 2147483647 (si queda <= 0, súmale 2147483646). Cada número es state = (state * 16807) % 2147483647 y el valor en [0, 1) es (state - 1) / 2147483646. El índice j de la vuelta i es floor(valor * (i + 1)).\nEjemplo: [0, 1, 2, 3, 4], semilla 1 → [1, 3, 2, 4, 0].',
  used: 'Fisher-Yates y un generador lineal congruente',
  explanation:
    'Fisher-Yates intercambia cada posición i, desde el final, con una posición aleatoria entre 0 e i inclusive. Así cada permutación es igual de probable si el aleatorio lo es. Math.random no se puede probar, por eso la semilla fija la secuencia. El LCG de 16807 es el mínimo estándar histórico: no es criptográfico, y no hace falta que lo sea para un barajado de práctica.',
  body: b(
    'const out = t.slice()',
    'let state = seed % 2147483647',
    'if (state <= 0) state += 2147483646',
    'function next() {',
    '  state = (state * 16807) % 2147483647',
    '  return (state - 1) / 2147483646',
    '}',
    'for (let i = out.length - 1; i > 0; i--) {',
    '  const j = Math.floor(next() * (i + 1))',
    '  const tmp = out[i]',
    '  out[i] = out[j]',
    '  out[j] = tmp',
    '}',
    'return out',
  ),
  cases: [
    [[[0, 1, 2, 3, 4], 1], [1, 3, 2, 4, 0]],
  ],
})

add({
  title: 'Mediana en streaming',
  name: 'medianOfStream',
  params: 't',
  ts: 't: number[]): number[]',
  prompt: 'Devuelve la mediana después de leer cada número, en orden. Si hay pares, la mediana es la media de los dos centrales.\nEjemplo: [1, 2, 3] → [1, 1.5, 2]. [5, 15, 1, 3] → [5, 10, 5, 4].',
  used: 'dos mitades ordenadas: la baja como montón máximo y la alta como montón mínimo',
  explanation:
    'La mitad baja guarda los menores y su cima es el mayor de ellos. La alta guarda los mayores y su cima es el menor. Se reequilibran para que la baja tenga un elemento más como mucho. La mediana es la cima de la baja, o la media de las dos cimas. Aquí cada mitad se ordena al insertar para que el código quepa en una pantalla; un heap binario hace la inserción en log n en vez de n log n.',
  body: b(
    'const low = []',
    'const high = []',
    'const out = []',
    'function push(heap, n, asc) {',
    '  heap.push(n)',
    '  heap.sort(asc ? (a, b) => a - b : (a, b) => b - a)',
    '}',
    'for (const n of t) {',
    '  if (low.length === 0 || n <= low[0]) push(low, n, false)',
    '  else push(high, n, true)',
    '  if (low.length > high.length + 1) push(high, low.shift(), true)',
    '  else if (high.length > low.length) push(low, high.shift(), false)',
    '  if (low.length === high.length) out.push((low[0] + high[0]) / 2)',
    '  else out.push(low[0])',
    '}',
    'return out',
  ),
  cases: [
    [[[1, 2, 3]], [1, 1.5, 2]],
    [[[5, 15, 1, 3]], [5, 10, 5, 4]],
  ],
})

add({
  title: 'Codificar strings',
  name: 'encodeStrings',
  params: 'words',
  ts: 'words: string[]): string',
  prompt: 'Codifica una lista de strings en uno solo. Cada palabra va como su longitud, una almohadilla y el texto.\nEjemplo: ["ab", "c"] → "2#ab1#c". ["a#b"] → "3#a#b".',
  used: 'longitud prefijada, para que el separador pueda aparecer dentro',
  explanation:
    'Un separador fijo se rompe si la palabra lo contiene. Prefijar la longitud dice cuántos caracteres leer después de la almohadilla, y la almohadilla de dentro de la palabra ya no es especial. Es el mismo truco que un framing de red.',
  body: b("return words.map((word) => word.length + '#' + word).join('')"),
  cases: [
    [[['ab', 'c']], '2#ab1#c'],
    [[['a#b']], '3#a#b'],
    [[[]], ''],
  ],
})

add({
  title: 'Decodificar strings',
  name: 'decodeStrings',
  params: 'text',
  ts: 'text: string): string[]',
  prompt: 'Invierte encodeStrings. El texto vacío es la lista vacía.\nEjemplo: "2#ab1#c" → ["ab", "c"]. "3#a#b" → ["a#b"].',
  used: 'leer la longitud hasta la almohadilla y luego slice de esa longitud',
  explanation:
    'Se lee dígitos hasta #. Esa longitud dice dónde acaba la palabra, aunque contenga almohadillas. El cursor salta al carácter siguiente y se repite. Sin la longitud no habría forma de saber si una # es separador o dato.',
  body: b(
    'const out = []',
    'let i = 0',
    'while (i < text.length) {',
    '  let length = 0',
    "  while (text[i] !== '#') {",
    '    length = length * 10 + Number(text[i])',
    '    i++',
    '  }',
    '  i++',
    '  out.push(text.slice(i, i + length))',
    '  i += length',
    '}',
    'return out',
  ),
  cases: [
    [['2#ab1#c'], ['ab', 'c']],
    [['3#a#b'], ['a#b']],
    [[''], []],
  ],
})

add({
  title: 'Aplanar hasta una profundidad',
  name: 'flattenDepth',
  params: 't, depth',
  ts: 't: unknown[], depth: number): unknown[]',
  prompt: 'Aplana depth niveles. depth 0 devuelve una copia superficial de t.\nEjemplo: [1, [2, [3]]], 1 → [1, 2, [3]]. El mismo array con 2 → [1, 2, 3].',
  used: 'recursión con un contador de niveles que quedan',
  explanation:
    'Si quedan niveles y el valor es un array, se aplana cada hijo con un nivel menos. Si no, el valor es una hoja de este aplanado, aunque sea un array: ya no toca abrirlo. flat y flatMap hacen lo mismo en una línea; la recursión enseña el contador.',
  body: b(
    'function walk(value, left) {',
    '  if (Array.isArray(value) && left > 0) return value.flatMap((item) => walk(item, left - 1))',
    '  return [value]',
    '}',
    'return t.flatMap((item) => walk(item, depth))',
  ),
  cases: [
    [[[1, [2, [3]]], 1], [1, 2, [3]]],
    [[[1, [2, [3]]], 2], [1, 2, 3]],
    [[[1, [2]], 0], [1, [2]]],
  ],
})

add({
  title: 'Claves distintas',
  name: 'diffKeys',
  params: 'a, b',
  ts: 'a: Record<string, unknown>, b: Record<string, unknown>): string[]',
  prompt: 'Devuelve, ordenadas, las claves cuyo valor no es profundamente igual, incluyendo las que solo están en uno de los dos. Los valores son JSON.\nEjemplo: { a: 1, b: 2 } y { a: 1, b: 3, c: 4 } → ["b", "c"].',
  used: 'la unión de las claves y JSON.stringify para el valor',
  explanation:
    'Una clave que falta en un lado se ve como undefined y no coincide con el otro valor. JSON.stringify sirve aquí porque los valores son JSON y no nos importa el orden interno más allá de lo que stringify fija. Para objetos con claves en distinto orden habría que comparar en profundidad, como en deepEqual.',
  body: b(
    'const keys = new Set([...Object.keys(a), ...Object.keys(b)])',
    'const out = []',
    'for (const key of keys) {',
    '  if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) out.push(key)',
    '}',
    'return out.sort()',
  ),
  cases: [
    [[{ a: 1, b: 2 }, { a: 1, b: 3, c: 4 }], ['b', 'c']],
    [[{ a: 1 }, { a: 1 }], []],
  ],
})

add({
  title: 'Escribir una ruta sin mutar',
  name: 'setPath',
  params: 'obj, path, value',
  ts: 'obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown>',
  prompt: 'Devuelve una copia de obj con value escrito en la ruta de puntos. Los objetos del camino se copian. Los que no están en el camino se comparten. Si falta un tramo, se crea un objeto.\nEjemplo: { a: { b: 1 } }, "a.c", 2 → { a: { b: 1, c: 2 } }.',
  used: 'recursión y copia superficial en cada nivel del camino',
  explanation:
    'Copiar el objeto entero sería correcto y más caro. Solo se duplican los objetos que hay que modificar: el resto conserva la referencia. Es la idea de la actualización inmutable. El objeto original no ve la clave nueva porque su hijo a fue sustituido por una copia en el resultado, no mutado.',
  body: b(
    "const keys = path.split('.')",
    'function write(current, index) {',
    '  if (index === keys.length) return value',
    '  const key = keys[index]',
    '  const source = current && typeof current === "object" ? current : {}',
    '  const copy = Array.isArray(source) ? source.slice() : { ...source }',
    '  copy[key] = write(source[key], index + 1)',
    '  return copy',
    '}',
    'return write(obj, 0)',
  ),
  cases: [
    [[{ a: { b: 1 } }, 'a.c', 2], { a: { b: 1, c: 2 } }],
    [[{}, 'a.b', 1], { a: { b: 1 } }],
  ],
})

add({
  title: 'Componer funciones',
  name: 'compose',
  params: 'fns',
  ts: 'fns: Array<(value: number) => number>): (value: number) => number',
  prompt: 'Devuelve una función que aplica fns de derecha a izquierda. compose([sumar1, doble])(3) es sumar1(doble(3)).',
  used: 'un cierre y un bucle desde el final del array',
  explanation:
    'Componer f y g es hacer f(g(x)). El array se recorre al revés para que la función de la derecha sea la primera en ver el valor. Un reduceRight dice lo mismo. El closure guarda la lista; no se ejecuta nada hasta la llamada.',
  javascript:
    'function compose(fns) {\n  return function (value) {\n    let current = value\n    for (let i = fns.length - 1; i >= 0; i--) current = fns[i](current)\n    return current\n  }\n}\n',
  typescript:
    'function compose(fns: Array<(value: number) => number>): (value: number) => number {\n  return (value) => {\n    let current = value\n    for (let i = fns.length - 1; i >= 0; i--) current = fns[i](current)\n    return current\n  }\n}\n',
  probe: composeProbe,
})

add({
  title: 'Currificar en tres',
  name: 'curry3',
  params: 'fn',
  ts: 'fn: (a: number, b: number, c: number) => number): (a: number) => (b: number) => (c: number) => number',
  prompt: 'Devuelve una versión de fn que se llama curry3(fn)(a)(b)(c) en vez de fn(a, b, c).',
  used: 'tres funciones anidadas que cierran sobre los argumentos',
  explanation:
    'Cada llamada devuelve la siguiente y guarda su argumento en el closure. La última tiene los tres y llama a fn. Currificar una función de n argumentos es el mismo patrón con un contador; aquí n es 3 para que se vea sin abstracción de más. Sirve para fijar argumentos y pasar la función a medias.',
  javascript:
    'function curry3(fn) {\n  return function (a) {\n    return function (b) {\n      return function (c) {\n        return fn(a, b, c)\n      }\n    }\n  }\n}\n',
  typescript:
    'function curry3(fn: (a: number, b: number, c: number) => number): (a: number) => (b: number) => (c: number) => number {\n  return (a) => (b) => (c) => fn(a, b, c)\n}\n',
  probe: curryProbe,
})

add({
  title: 'Plantilla mínima',
  name: 'renderTemplate',
  params: 'text, data',
  ts: 'text: string, data: Record<string, string>): string',
  prompt: 'Sustituye cada ${clave} por data[clave]. Si la clave no está, se sustituye por "". No hay llaves anidadas.\nEjemplo: "Hola ${name}", { name: "Ana" } → "Hola Ana".',
  used: 'replace con una expresión regular y una función de reemplazo',
  explanation:
    'La expresión busca ${ y luego todo lo que no sea } hasta la llave de cierre. La función de reemplazo recibe la clave y mira el objeto. No es un lenguaje de plantillas: no evalúa código, solo lee claves. Por eso no se usa eval, que ejecutaría lo que hubiera dentro.',
  body: '  return text.replace(/\\$\\{([^}]+)\\}/g, function (_, key) { return data[key] ?? "" })',
  cases: [
    [['Hola ${name}', { name: 'Ana' }], 'Hola Ana'],
    [['${a}-${b}', { a: 'x' }], 'x-'],
  ],
})

add({
  title: 'Glob simple',
  name: 'globMatch',
  params: 'pattern, text',
  ts: 'pattern: string, text: string): boolean',
  prompt: '* sustituye cualquier secuencia, incluida la vacía. ? sustituye un carácter. El resto es literal.\nEjemplo: "a*c", "abbc" → true. "a?c", "ac" → false. "a?c", "abc" → true.',
  used: 'recursión sobre dos índices, con backtracking en el asterisco',
  explanation:
    'El asterisco prueba quedarse con cero caracteres y también con uno más, y así hasta el final. ? y el literal avanzan los dos índices si coinciden. Con muchos asteriscos el backtracking puede ser exponencial; un autómata o programación dinámica lo deja polinómico. Para un patrón corto, la recursión se entiende.',
  body: b(
    'function walk(p, t) {',
    '  if (p === pattern.length) return t === text.length',
    "  if (pattern[p] === '*') {",
    '    for (let i = t; i <= text.length; i++) if (walk(p + 1, i)) return true',
    '    return false',
    '  }',
    '  if (t === text.length) return false',
    "  if (pattern[p] === '?' || pattern[p] === text[t]) return walk(p + 1, t + 1)",
    '  return false',
    '}',
    'return walk(0, 0)',
  ),
  cases: [
    [['a*c', 'abbc'], true],
    [['a?c', 'ac'], false],
    [['a?c', 'abc'], true],
    [['*', ''], true],
  ],
})

add({
  title: 'CSV con comillas',
  name: 'parseCsv',
  params: 'text',
  ts: 'text: string): string[][]',
  prompt:
    'Lee un CSV. La coma separa celdas y el salto de línea separa filas. Un campo entre comillas puede contener comas y saltos no: en estos casos no hay saltos dentro. Una comilla escapada es dos comillas seguidas. El texto no termina en salto de línea de más.\nEjemplo: "a,\\"b,c\\"\\nd,e" → [["a", "b,c"], ["d", "e"]].',
  used: 'una máquina de estados con el modo entre comillas',
  explanation:
    'Hay dos modos: fuera y dentro de comillas. Fuera, la coma cierra celda y el salto cierra fila. Dentro, la coma es texto, y "" es una comilla literal. Un split por comas rompería el campo citado. El estado es lo mínimo que el split no puede recordar.',
  body: b(
    'const rows = []',
    'let row = []',
    "let cell = ''",
    'let quoted = false',
    'for (let i = 0; i < text.length; i++) {',
    '  const ch = text[i]',
    '  if (quoted) {',
    '    if (ch === \'"\' && text[i + 1] === \'"\') {',
    '      cell += \'"\'',
    '      i++',
    '    } else if (ch === \'"\') quoted = false',
    '    else cell += ch',
    '  } else if (ch === \'"\') quoted = true',
    "  else if (ch === ',') {",
    '    row.push(cell)',
    "    cell = ''",
    "  } else if (ch === '\\n') {",
    '    row.push(cell)',
    '    rows.push(row)',
    '    row = []',
    "    cell = ''",
    '  } else cell += ch',
    '}',
    'if (cell.length || row.length) {',
    '  row.push(cell)',
    '  rows.push(row)',
    '}',
    'return rows',
  ),
  cases: [
    [['a,"b,c"\nd,e'], [['a', 'b,c'], ['d', 'e']]],
    [['a,"b""c"\nd'], [['a', 'b"c'], ['d']]],
  ],
})

add({
  title: 'Tachar palabras',
  name: 'redact',
  params: 'text, words',
  ts: 'text: string, words: string[]): string',
  prompt: 'Sustituye cada aparición exacta de cada palabra por asteriscos de la misma longitud. Distingue mayúsculas. No es una expresión con bordes de palabra: es un reemplazo de substring.\nEjemplo: "la clave es clave", ["clave"] → "la ***** es *****".',
  used: 'split y join, que sustituyen todas las apariciones',
  explanation:
    'split por la palabra y join con la máscara reemplaza todas las copias sin solaparse de izquierda a derecha. repeat construye tantos asteriscos como caracteres tenía la palabra, para no cambiar la longitud visible. Se hace palabra a palabra, en el orden dado.',
  body: b(
    'let out = text',
    'for (const word of words) {',
    "  const mask = '*'.repeat(word.length)",
    '  out = out.split(word).join(mask)',
    '}',
    'return out',
  ),
  cases: [
    [['la clave es clave', ['clave']], 'la ***** es *****'],
    [['abc', ['a', 'b']], '**c'],
  ],
})

add({
  title: 'Quitar etiquetas',
  name: 'stripTags',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Quita las etiquetas HTML de la forma <...>, sin anidar < dentro. No interpreta entidades.\nEjemplo: "<p>Hola</p>" → "Hola".',
  used: 'replace con /<[^>]*>/g',
  explanation:
    '[^>]* consume hasta el siguiente >, así que una etiqueta simple desaparece. No es un parser HTML: un < dentro de un atributo citado o un comentario raro lo engañan. Para texto controlado basta. Para HTML de verdad haría falta un parser, no una expresión regular.',
  body: "  return text.replace(/<[^>]*>/g, '')",
  cases: [
    [['<p>Hola</p>'], 'Hola'],
    [['a<br>b'], 'ab'],
  ],
})

add({
  title: 'Intersección de intervalos',
  name: 'intervalIntersection',
  params: 'a, b',
  ts: 'a: number[][], b: number[][]): number[][]',
  prompt: 'a y b son listas de intervalos [inicio, fin] cerrados, ordenadas y sin solapes internos. Devuelve su intersección, también ordenada.\nEjemplo: [[0, 2], [5, 10]] y [[1, 5], [8, 12]] → [[1, 2], [5, 5], [8, 10]].',
  used: 'dos punteros',
  explanation:
    'El solape de dos intervalos es el mayor inicio y el menor fin, si ese inicio no pasa del fin. Como ambas listas están ordenadas, se avanza la que antes termina: la otra todavía podría cortar al siguiente de esta. Es lineal.',
  body: b(
    'const out = []',
    'let i = 0',
    'let j = 0',
    'while (i < a.length && j < b.length) {',
    '  const start = a[i][0] > b[j][0] ? a[i][0] : b[j][0]',
    '  const end = a[i][1] < b[j][1] ? a[i][1] : b[j][1]',
    '  if (start <= end) out.push([start, end])',
    '  if (a[i][1] < b[j][1]) i++',
    '  else j++',
    '}',
    'return out',
  ),
  cases: [
    [[[[0, 2], [5, 10]], [[1, 5], [8, 12]]], [[1, 2], [5, 5], [8, 10]]],
  ],
})

add({
  title: '¿Se puede asistir?',
  name: 'canAttend',
  params: 'intervals',
  ts: 'intervals: number[][]): boolean',
  prompt: 'Cada reunión es [inicio, fin). Di si una persona puede asistir a todas, es decir, si no hay solapes. Tocar en el fin está permitido.\nEjemplo: [[7, 10], [2, 4]] → true. [[0, 30], [5, 10]] → false.',
  used: 'ordenar por el inicio y comparar con el fin anterior',
  explanation:
    'Ordenadas por el inicio, cada reunión solo puede chocar con la anterior. Si empieza antes de que la anterior acabe, hay solape. Es el mismo dato que minMeetingRooms, preguntando si el máximo de salas es 1.',
  body: b(
    'const sorted = intervals.slice().sort((a, b) => a[0] - b[0])',
    'for (let i = 1; i < sorted.length; i++) {',
    '  if (sorted[i][0] < sorted[i - 1][1]) return false',
    '}',
    'return true',
  ),
  cases: [
    [[[[7, 10], [2, 4]]], true],
    [[[[0, 30], [5, 10]]], false],
  ],
})

add({
  title: 'Orden alienígena',
  name: 'alienOrder',
  params: 'words',
  ts: 'words: string[]): string',
  prompt:
    'words está ordenada según un alfabeto desconocido de letras minúsculas. Devuelve un orden válido de las letras que aparecen. Si hay varias, elige siempre la menor disponible. Si el orden es imposible, "".\nEjemplo: ["wrt", "wrf", "er", "ett", "rftt"] → "wertf".',
  used: 'grafo de precedencias y Kahn con desempate',
  explanation:
    'La primera letra distinta entre dos palabras consecutivas dice que una va antes que la otra. Si una palabra más larga empieza por una más corta que va después, el orden es imposible. Con esas aristas se hace un orden topológico. El desempate por letra menor deja un único string.',
  body: b(
    'const next = new Map()',
    'const indegree = new Map()',
    'for (const word of words) {',
    '  for (const ch of word) {',
    '    if (!next.has(ch)) next.set(ch, new Set())',
    '    if (!indegree.has(ch)) indegree.set(ch, 0)',
    '  }',
    '}',
    'for (let i = 0; i < words.length - 1; i++) {',
    '  const a = words[i]',
    '  const b = words[i + 1]',
    '  if (a.length > b.length && a.startsWith(b)) return ""',
    '  const size = Math.min(a.length, b.length)',
    '  for (let j = 0; j < size; j++) {',
    '    if (a[j] !== b[j]) {',
    '      if (!next.get(a[j]).has(b[j])) {',
    '        next.get(a[j]).add(b[j])',
    '        indegree.set(b[j], indegree.get(b[j]) + 1)',
    '      }',
    '      break',
    '    }',
    '  }',
    '}',
    'const queue = []',
    'for (const [ch, degree] of indegree) if (degree === 0) queue.push(ch)',
    "let out = ''",
    'while (queue.length) {',
    '  queue.sort()',
    '  const ch = queue.shift()',
    '  out += ch',
    '  for (const to of next.get(ch)) {',
    '    indegree.set(to, indegree.get(to) - 1)',
    '    if (indegree.get(to) === 0) queue.push(to)',
    '  }',
    '}',
    "return out.length === indegree.size ? out : ''",
  ),
  cases: [
    [[['wrt', 'wrf', 'er', 'ett', 'rftt']], 'wertf'],
    [[['z', 'x']], 'zx'],
  ],
})

add({
  title: 'Fusionar cuentas',
  name: 'accountsMerge',
  params: 'accounts',
  ts: 'accounts: string[][]): string[][]',
  prompt:
    'Cada cuenta es [nombre, email, ...]. Si dos cuentas comparten un email, son la misma persona. Devuelve las cuentas fusionadas: nombre y emails ordenados. Ordena las cuentas por su primer email.\nEjemplo: John con johnsmith y john_newyork, John con johnsmith y john00, Mary con mary, John con johnnybravo.',
  used: 'union-find sobre los emails',
  explanation:
    'El nombre no identifica: hay varios John. El email sí. Se unen todos los emails de una fila a su primer email. Al final cada raíz agrupa un buzón. Se ordenan los emails y luego las cuentas, para que el resultado no dependa del orden de recorrido del Map.',
  body: b(
    'const parent = new Map()',
    'const emailName = new Map()',
    'function find(x) {',
    '  if (parent.get(x) !== x) parent.set(x, find(parent.get(x)))',
    '  return parent.get(x)',
    '}',
    'for (const account of accounts) {',
    '  const name = account[0]',
    '  for (let i = 1; i < account.length; i++) {',
    '    if (!parent.has(account[i])) parent.set(account[i], account[i])',
    '    emailName.set(account[i], name)',
    '  }',
    '  for (let i = 2; i < account.length; i++) parent.set(find(account[i]), find(account[1]))',
    '}',
    'const groups = new Map()',
    'for (const email of parent.keys()) {',
    '  const root = find(email)',
    '  const list = groups.get(root) ?? []',
    '  list.push(email)',
    '  groups.set(root, list)',
    '}',
    'const out = []',
    'for (const [root, emails] of groups) {',
    '  emails.sort()',
    '  out.push([emailName.get(root), ...emails])',
    '}',
    'out.sort((a, b) => a[1].localeCompare(b[1]))',
    'return out',
  ),
  cases: [
    [
      [[
        ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
        ['John', 'johnsmith@mail.com', 'john00@mail.com'],
        ['Mary', 'mary@mail.com'],
        ['John', 'johnnybravo@mail.com'],
      ]],
      [
        ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],
        ['John', 'johnnybravo@mail.com'],
        ['Mary', 'mary@mail.com'],
      ],
    ],
  ],
})

add({
  title: 'Provincias',
  name: 'numProvinces',
  params: 'isConnected',
  ts: 'isConnected: number[][]): number',
  prompt: 'isConnected es una matriz simétrica. 1 significa que dos ciudades están conectadas, directa o hay que cerrar la transitiva. ¿Cuántas provincias hay?\nEjemplo: [[1, 1, 0], [1, 1, 0], [0, 0, 1]] → 2.',
  used: 'DFS o BFS sobre la matriz',
  explanation:
    'Es el número de componentes conexas, con la matriz en vez de la lista de aristas. Se visita cada ciudad no vista y se recorren sus vecinas. Cada recorrido es una provincia. Union-find daría el mismo número.',
  body: b(
    'const n = isConnected.length',
    'const seen = new Array(n).fill(false)',
    'let total = 0',
    'function walk(city) {',
    '  seen[city] = true',
    '  for (let other = 0; other < n; other++) {',
    '    if (isConnected[city][other] === 1 && !seen[other]) walk(other)',
    '  }',
    '}',
    'for (let city = 0; city < n; city++) {',
    '  if (!seen[city]) {',
    '    total++',
    '    walk(city)',
    '  }',
    '}',
    'return total',
  ),
  cases: [
    [[[[1, 1, 0], [1, 1, 0], [0, 0, 1]]], 2],
    [[[[1]]], 1],
  ],
})

add({
  title: 'Arista redundante',
  name: 'findRedundant',
  params: 'edges',
  ts: 'edges: number[][]): number[]',
  prompt: 'edges forma un árbol no dirigido de n nodos, numerados desde 1, más una arista de más, en algún orden. Devuelve la arista que, al añadirla en ese orden, cierra el primer ciclo.\nEjemplo: [[1, 2], [1, 3], [2, 3]] → [2, 3].',
  used: 'union-find: si los dos extremos ya están unidos, esa arista sobra',
  explanation:
    'Un árbol no tiene ciclos. Cada arista une dos componentes. Si sus extremos ya comparten raíz, esa arista es la que cierra el ciclo en este orden. No es "cualquier" arista del ciclo: es la que llega cuando el ciclo ya se podía formar.',
  body: b(
    'const parent = new Map()',
    'function find(x) {',
    '  if (!parent.has(x)) parent.set(x, x)',
    '  if (parent.get(x) !== x) parent.set(x, find(parent.get(x)))',
    '  return parent.get(x)',
    '}',
    'for (const [a, b] of edges) {',
    '  const ra = find(a)',
    '  const rb = find(b)',
    '  if (ra === rb) return [a, b]',
    '  parent.set(ra, rb)',
    '}',
    'return []',
  ),
  cases: [
    [[[[1, 2], [1, 3], [2, 3]]], [2, 3]],
    [[[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]], [1, 4]],
  ],
})

add({
  title: 'Orden de los cursos',
  name: 'courseOrder',
  params: 'n, prerequisites',
  ts: 'n: number, prerequisites: number[][]): number[] | null',
  prompt: 'Igual que canFinish, pero devuelve un orden válido. Si hay varios, elige siempre el curso de número menor disponible. Si es imposible, null.\nEjemplo: 2, [[1, 0]] → [0, 1].',
  used: 'Kahn con la cola ordenada',
  explanation:
    'Es el orden topológico del grafo de requisitos. El requisito apunta al curso. Ordenar la cola deja un único orden para las pruebas y también es una política razonable: cursar antes el de número menor cuando los dos están libres.',
  body: b(
    'const next = Array.from({ length: n }, () => [])',
    'const indegree = new Array(n).fill(0)',
    'for (const [course, req] of prerequisites) {',
    '  next[req].push(course)',
    '  indegree[course]++',
    '}',
    'const queue = []',
    'for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i)',
    'const out = []',
    'while (queue.length) {',
    '  queue.sort((a, b) => a - b)',
    '  const node = queue.shift()',
    '  out.push(node)',
    '  for (const to of next[node]) {',
    '    indegree[to]--',
    '    if (indegree[to] === 0) queue.push(to)',
    '  }',
    '}',
    'return out.length === n ? out : null',
  ),
  cases: [
    [[2, [[1, 0]]], [0, 1]],
    [[2, [[1, 0], [0, 1]]], null],
  ],
})

add({
  title: 'Naranjas podridas',
  name: 'orangesRotting',
  params: 'grid',
  ts: 'grid: number[][]): number',
  prompt: '0 es vacío, 1 es naranja fresca y 2 es podrida. Cada minuto, una podrida pudre a las frescas de sus cuatro vecinos. ¿Cuántos minutos hasta que no quede ninguna fresca? Si es imposible, -1. Hay al menos una fila.\nEjemplo: [[2, 1, 1], [1, 1, 0], [0, 1, 1]] → 4.',
  used: 'búsqueda en anchura multisource',
  explanation:
    'Todas las podridas iniciales entran a la vez en la cola: el minuto 0 tiene varios orígenes. Cada capa de la anchura es un minuto. Si al acabar queda alguna fresca, estaba aislada y la respuesta es -1. Se trabaja sobre una copia para no depender de mutar el argumento.',
  body: b(
    'const rows = grid.length',
    'const cols = grid[0].length',
    'const board = grid.map((row) => row.slice())',
    'const queue = []',
    'let fresh = 0',
    'for (let r = 0; r < rows; r++) {',
    '  for (let c = 0; c < cols; c++) {',
    '    if (board[r][c] === 2) queue.push([r, c])',
    '    if (board[r][c] === 1) fresh++',
    '  }',
    '}',
    'let minutes = 0',
    'let head = 0',
    'while (head < queue.length && fresh > 0) {',
    '  const size = queue.length - head',
    '  for (let s = 0; s < size; s++) {',
    '    const [r, c] = queue[head++]',
    '    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {',
    '      const nr = r + dr',
    '      const nc = c + dc',
    '      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || board[nr][nc] !== 1) continue',
    '      board[nr][nc] = 2',
    '      fresh--',
    '      queue.push([nr, nc])',
    '    }',
    '  }',
    '  minutes++',
    '}',
    'return fresh === 0 ? minutes : -1',
  ),
  cases: [
    [[[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], 4],
    [[[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], -1],
    [[[[0]]], 0],
  ],
})

add({
  title: 'Pacífico y Atlántico',
  name: 'pacificAtlantic',
  params: 'heights',
  ts: 'heights: number[][]): number[][]',
  prompt:
    'El agua baja o se queda, nunca sube, y se mueve en cruz. El borde izquierdo y el de arriba tocan el Pacífico. El derecho y el de abajo, el Atlántico. Devuelve las casillas desde las que se llega a los dos, en orden de fila y luego columna.\nEjemplo: [[1, 1], [1, 1]] → las cuatro casillas.',
  used: 'dos BFS desde los océanos, subiendo',
  explanation:
    'Recorrer desde cada casilla hasta los océanos repite trabajo. Es más barato partir de cada océano y subir hacia las casillas de altura mayor o igual: el agua habría podido bajar por ese camino. La intersección de los dos recorridos es la respuesta.',
  body: b(
    'const rows = heights.length',
    'const cols = heights[0].length',
    'function reach(starts) {',
    '  const seen = Array.from({ length: rows }, () => new Array(cols).fill(false))',
    '  const queue = starts.slice()',
    '  for (const [r, c] of starts) seen[r][c] = true',
    '  let head = 0',
    '  while (head < queue.length) {',
    '    const [r, c] = queue[head++]',
    '    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {',
    '      const nr = r + dr',
    '      const nc = c + dc',
    '      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || seen[nr][nc] || heights[nr][nc] < heights[r][c]) continue',
    '      seen[nr][nc] = true',
    '      queue.push([nr, nc])',
    '    }',
    '  }',
    '  return seen',
    '}',
    'const pacific = []',
    'const atlantic = []',
    'for (let r = 0; r < rows; r++) {',
    '  pacific.push([r, 0])',
    '  atlantic.push([r, cols - 1])',
    '}',
    'for (let c = 0; c < cols; c++) {',
    '  pacific.push([0, c])',
    '  atlantic.push([rows - 1, c])',
    '}',
    'const left = reach(pacific)',
    'const right = reach(atlantic)',
    'const out = []',
    'for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (left[r][c] && right[r][c]) out.push([r, c])',
    'return out',
  ),
  cases: [
    [[[[1, 1], [1, 1]]], [[0, 0], [0, 1], [1, 0], [1, 1]]],
  ],
})

add({
  title: 'Buscar palabra en el tablero',
  name: 'wordSearch',
  params: 'board, word',
  ts: 'board: string[][], word: string): boolean',
  prompt: 'Di si word se puede leer en el tablero moviéndose en cruz, sin reutilizar la misma casilla. Hay al menos una fila.\nEjemplo: [["A", "B"], ["C", "D"]], "ABD" → true. "ABC" → false.',
  used: 'DFS con retroceso',
  explanation:
    'Desde cada casilla se intenta la palabra. La casilla se marca para no reutilizarla y se restaura al volver: es backtracking, no un marcado definitivo. Sin restaurar, un intento fallido contaminaría el siguiente.',
  body: b(
    'const rows = board.length',
    'const cols = board[0].length',
    'const grid = board.map((row) => row.slice())',
    'function walk(r, c, i) {',
    '  if (i === word.length) return true',
    '  if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== word[i]) return false',
    '  const saved = grid[r][c]',
    "  grid[r][c] = '#'",
    '  const ok = walk(r + 1, c, i + 1) || walk(r - 1, c, i + 1) || walk(r, c + 1, i + 1) || walk(r, c - 1, i + 1)',
    '  grid[r][c] = saved',
    '  return ok',
    '}',
    'for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (walk(r, c, 0)) return true',
    'return false',
  ),
  cases: [
    [[[['A', 'B'], ['C', 'D']], 'ABD'], true],
    [[[['A', 'B'], ['C', 'D']], 'ABC'], false],
  ],
})

add({
  title: 'Rodear regiones',
  name: 'surroundRegions',
  params: 'board',
  ts: 'board: string[][]): string[][]',
  prompt: 'El tablero tiene "X" y "O". Captura las O que están rodeadas: las que no tocan el borde por un camino de O en cruz. Devuelve el tablero nuevo.\nEjemplo: una O en el centro de un 3x3 de X pasa a X. Una columna de O que toca el borde se queda.',
  used: 'DFS desde los bordes y un marcado temporal',
  explanation:
    'Es más fácil marcar las O que se salvan, las del borde y sus vecinas, que buscar las rodeadas. Se marcan como E, luego las O que quedan pasan a X y las E vuelven a O. Se devuelve una copia.',
  body: b(
    'const rows = board.length',
    'const cols = board[0].length',
    'const out = board.map((row) => row.slice())',
    'function walk(r, c) {',
    "  if (r < 0 || c < 0 || r >= rows || c >= cols || out[r][c] !== 'O') return",
    "  out[r][c] = 'E'",
    '  walk(r + 1, c)',
    '  walk(r - 1, c)',
    '  walk(r, c + 1)',
    '  walk(r, c - 1)',
    '}',
    'for (let r = 0; r < rows; r++) {',
    '  walk(r, 0)',
    '  walk(r, cols - 1)',
    '}',
    'for (let c = 0; c < cols; c++) {',
    '  walk(0, c)',
    '  walk(rows - 1, c)',
    '}',
    'for (let r = 0; r < rows; r++) {',
    '  for (let c = 0; c < cols; c++) {',
    "    if (out[r][c] === 'O') out[r][c] = 'X'",
    "    else if (out[r][c] === 'E') out[r][c] = 'O'",
    '  }',
    '}',
    'return out',
  ),
  cases: [
    [[[['X', 'X', 'X'], ['X', 'O', 'X'], ['X', 'X', 'X']]], [['X', 'X', 'X'], ['X', 'X', 'X'], ['X', 'X', 'X']]],
    [[[['X', 'O', 'X'], ['X', 'O', 'X'], ['X', 'O', 'X']]], [['X', 'O', 'X'], ['X', 'O', 'X'], ['X', 'O', 'X']]],
  ],
})

add({
  title: 'Escalera de palabras',
  name: 'ladderLength',
  params: 'begin, end, wordList',
  ts: 'begin: string, end: string, wordList: string[]): number',
  prompt: 'Cada paso cambia una letra y tiene que caer en wordList. Devuelve la longitud de la escalera más corta de begin a end, contando las dos. Si end no está en la lista o no hay camino, 0.\nEjemplo: "hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"] → 5.',
  used: 'BFS sobre las palabras a distancia de una letra',
  explanation:
    'Cada palabra es un nodo y hay arista si difieren en una letra. La anchura da el mínimo de pasos. Generar los 26 vecinos de cada posición evita comparar todas las parejas del diccionario. Se marca al encolar.',
  body: b(
    'const set = new Set(wordList)',
    'if (!set.has(end)) return 0',
    'const queue = [[begin, 1]]',
    'const seen = new Set([begin])',
    'let head = 0',
    'while (head < queue.length) {',
    '  const [word, dist] = queue[head++]',
    '  if (word === end) return dist',
    '  for (let i = 0; i < word.length; i++) {',
    '    for (let code = 97; code <= 122; code++) {',
    '      const next = word.slice(0, i) + String.fromCharCode(code) + word.slice(i + 1)',
    '      if (!set.has(next) || seen.has(next)) continue',
    '      seen.add(next)',
    '      queue.push([next, dist + 1])',
    '    }',
    '  }',
    '}',
    'return 0',
  ),
  cases: [
    [['hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']], 5],
    [['hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']], 0],
  ],
})

add({
  title: 'Calculadora con paréntesis',
  name: 'calcParen',
  params: 'text',
  ts: 'text: string): number',
  prompt: 'Evalúa enteros no negativos con +, -, paréntesis y espacios. No hay * ni /.\nEjemplo: "(1+(4+5+2)-3)+(6+8)" → 23.',
  used: 'una pila que guarda el total y el signo de fuera del paréntesis',
  explanation:
    'Dentro de un paréntesis se calcula como si fuera una expresión nueva. Al abrirlo se guarda lo acumulado fuera y el signo con el que ese paréntesis se va a sumar. Al cerrarlo, el total interior se multiplica por ese signo y se suma a lo de fuera. Es una pila de contextos, no de todos los caracteres.',
  body: b(
    'const stack = []',
    'let number = 0',
    'let sign = 1',
    'let total = 0',
    'for (const ch of text) {',
    "  if (ch === ' ') continue",
    "  if (ch >= '0' && ch <= '9') number = number * 10 + Number(ch)",
    "  else if (ch === '+') { total += sign * number; number = 0; sign = 1 }",
    "  else if (ch === '-') { total += sign * number; number = 0; sign = -1 }",
    "  else if (ch === '(') { stack.push(total); stack.push(sign); total = 0; sign = 1; number = 0 }",
    '  else if (ch === ")") {',
    '    total += sign * number',
    '    number = 0',
    '    total *= stack.pop()',
    '    total += stack.pop()',
    '  }',
    '}',
    'return total + sign * number',
  ),
  cases: [
    [['(1+(4+5+2)-3)+(6+8)'], 23],
    [['1 + 1'], 2],
  ],
})

add({
  title: 'Decodificar patrón',
  name: 'decodeString',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'k[texto] significa texto repetido k veces. Puede anidar. k es un entero positivo.\nEjemplo: "3[a2[c]]" → "accaccacc". "3[a]2[bc]" → "aaabcbc".',
  used: 'dos pilas: los multiplicadores y los prefijos',
  explanation:
    'Al ver [ se guarda el número y el texto que ya había, y se empieza un trozo nuevo. Al ver ] se repite el trozo actual y se pega al prefijo guardado. Las pilas encajan con el anidado: lo último abierto es lo primero que se cierra.',
  body: b(
    'const counts = []',
    'const parts = []',
    "let current = ''",
    'let number = 0',
    'for (const ch of text) {',
    "  if (ch >= '0' && ch <= '9') number = number * 10 + Number(ch)",
    "  else if (ch === '[') {",
    '    counts.push(number)',
    '    parts.push(current)',
    '    number = 0',
    "    current = ''",
    "  } else if (ch === ']') current = parts.pop() + current.repeat(counts.pop())",
    '  else current += ch',
    '}',
    'return current',
  ),
  cases: [
    [['3[a2[c]]'], 'accaccacc'],
    [['3[a]2[bc]'], 'aaabcbc'],
  ],
})

add({
  title: 'Quitar k cifras',
  name: 'removeKdigits',
  params: 'num, k',
  ts: 'num: string, k: number): string',
  prompt: 'num es un entero sin ceros a la izquierda, salvo el propio "0", escrito como texto. Quita k cifras para que el número resultante sea el menor posible. Sin ceros a la izquierda. Si no queda nada, "0".\nEjemplo: "1432219", 3 → "1219". "10200", 1 → "200".',
  used: 'pila creciente y quitar ceros al final',
  explanation:
    'Mientras se pueda quitar y la cima sea mayor que la cifra nueva, se quita la cima: un dígito grande a la izquierda pesa más. Lo que sobre de k se quita por el final. Los ceros a la izquierda del texto resultante no forman parte del número.',
  body: b(
    'const stack = []',
    'let left = k',
    'for (const ch of num) {',
    '  while (left > 0 && stack.length && stack[stack.length - 1] > ch) {',
    '    stack.pop()',
    '    left--',
    '  }',
    '  stack.push(ch)',
    '}',
    'while (left > 0) {',
    '  stack.pop()',
    '  left--',
    '}',
    "const out = stack.join('').replace(/^0+/, '')",
    "return out || '0'",
  ),
  cases: [
    [['1432219', 3], '1219'],
    [['10200', 1], '200'],
    [['10', 2], '0'],
  ],
})

add({
  title: 'El mayor número',
  name: 'largestNumber',
  params: 't',
  ts: 't: number[]): string',
  prompt: 'Reordena los números para formar el mayor número posible y devuélvelo como texto. Sin ceros a la izquierda salvo el propio 0.\nEjemplo: [10, 2] → "210". [3, 30, 34, 5, 9] → "9534330".',
  used: 'ordenar comparando a+b contra b+a',
  explanation:
    'El orden numérico no sirve: 30 antes que 3 daría 303 en vez de 330. Se compara la concatenación en los dos órdenes. Si todo son ceros, el resultado es "0", no "000". El comparador tiene que ser transitivo con esta regla; con enteros positivos lo es.',
  body: b(
    'const texts = t.map(String).sort((a, b) => (a + b > b + a ? -1 : 1))',
    "const out = texts.join('')",
    "return out[0] === '0' ? '0' : out",
  ),
  cases: [
    [[[10, 2]], '210'],
    [[[3, 30, 34, 5, 9]], '9534330'],
    [[[0, 0]], '0'],
  ],
})

add({
  title: 'Flotas de coches',
  name: 'carFleet',
  params: 'target, position, speed',
  ts: 'target: number, position: number[], speed: number[]): number',
  prompt: 'Hay un coche en position[i] con velocidad speed[i], yendo hacia target. Un coche más rápido no puede adelantar: si alcanza al de delante, forma flota y adopta su velocidad. ¿Cuántas flotas llegan?\nEjemplo: destino 12, posiciones [10, 8, 0, 5, 3], velocidades [2, 4, 1, 1, 3] → 3.',
  used: 'ordenar por posición de mayor a menor y comparar el tiempo de llegada',
  explanation:
    'El coche de más adelante marca el ritmo. Si el de detrás tarda menos o igual, lo alcanza y se funde en su flota. Si tarda más, abre una flota nueva. Por eso se mira de derecha a izquierda y solo cuenta un tiempo estrictamente mayor que el de la flota actual.',
  body: b(
    'const cars = position.map((pos, i) => [pos, (target - pos) / speed[i]])',
    'cars.sort((a, b) => b[0] - a[0])',
    'let fleets = 0',
    'let time = -1',
    'for (const car of cars) {',
    '  if (car[1] > time) {',
    '    fleets++',
    '    time = car[1]',
    '  }',
    '}',
    'return fleets',
  ),
  cases: [
    [[12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]], 3],
    [[10, [3], [3]], 1],
  ],
})

add({
  title: 'Planificar tareas',
  name: 'leastInterval',
  params: 'tasks, n',
  ts: 'tasks: string[], n: number): number',
  prompt: 'Entre dos tareas iguales tienen que pasar al menos n huecos. En un hueco se puede hacer otra tarea o estar idle. Devuelve el mínimo de intervalos para acabarlas.\nEjemplo: ["A", "A", "A", "B", "B", "B"], 2 → 8.',
  used: 'la frecuencia máxima y cuántas tareas la alcanzan',
  explanation:
    'La tarea más repetida marca el esqueleto: (frecuencia - 1) grupos de tamaño n + 1, más un sitio final por cada tarea que empata en ese máximo. Si hay tantas tareas distintas que no hace falta idle, el resultado es simplemente el número de tareas. No hace falta simular la cola.',
  body: b(
    'const count = new Map()',
    'for (const task of tasks) count.set(task, (count.get(task) ?? 0) + 1)',
    'let max = 0',
    'let maxCount = 0',
    'for (const value of count.values()) {',
    '  if (value > max) {',
    '    max = value',
    '    maxCount = 1',
    '  } else if (value === max) maxCount++',
    '}',
    'const slots = (max - 1) * (n + 1) + maxCount',
    'return slots > tasks.length ? slots : tasks.length',
  ),
  cases: [
    [[['A', 'A', 'A', 'B', 'B', 'B'], 2], 8],
    [[['A', 'A', 'A'], 0], 3],
  ],
})

add({
  title: 'Árbol binario de búsqueda válido',
  name: 'isValidBST',
  params: 'node',
  ts: 'node: { v: number, l: any, r: any } | null): boolean',
  prompt:
    'Un nodo es { v, l, r }. l y r son otro nodo o null. Di si es un BST: todo lo de la izquierda es menor que el nodo y todo lo de la derecha es mayor, también respecto a los ancestros. null es válido.\nEjemplo: { v: 2, l: { v: 1, l: null, r: null }, r: { v: 3, l: null, r: null } } → true.',
  used: 'recursión con un intervalo (low, high) abierto',
  explanation:
    'No basta con comparar el nodo con sus dos hijos: un 3 en el subárbol derecho de un 4 puede ser menor que el ancestro 5. Cada llamada estrecha el intervalo permitido. El hijo izquierdo hereda el valor del nodo como máximo exclusivo, y el derecho como mínimo exclusivo.',
  body: b(
    'function walk(current, low, high) {',
    '  if (current === null) return true',
    '  if (current.v <= low || current.v >= high) return false',
    '  return walk(current.l, low, current.v) && walk(current.r, current.v, high)',
    '}',
    'return walk(node, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)',
  ),
  cases: [
    [[{ v: 2, l: { v: 1, l: null, r: null }, r: { v: 3, l: null, r: null } }], true],
    [[{ v: 5, l: { v: 1, l: null, r: null }, r: { v: 4, l: { v: 3, l: null, r: null }, r: { v: 6, l: null, r: null } } }], false],
    [[null], true],
  ],
})

add({
  title: 'Recorrido por niveles',
  name: 'levelOrder',
  params: 'node',
  ts: 'node: { v: number, l: any, r: any } | null): number[][]',
  prompt: 'Un nodo es { v, l, r }. Devuelve los valores nivel a nivel, de izquierda a derecha. null → [].\nEjemplo: raíz 2 con hijos 1 y 3 → [[2], [1, 3]].',
  used: 'BFS por capas',
  explanation:
    'La cola de un nivel produce el array de valores y, a la vez, la cola del siguiente con los hijos no nulos. Separar por el tamaño de la capa evita mezclar niveles. La DFS con la profundidad también vale; la anchura coincide con el orden pedido.',
  body: b(
    'if (node === null) return []',
    'const out = []',
    'let level = [node]',
    'while (level.length) {',
    '  out.push(level.map((item) => item.v))',
    '  const next = []',
    '  for (const item of level) {',
    '    if (item.l) next.push(item.l)',
    '    if (item.r) next.push(item.r)',
    '  }',
    '  level = next',
    '}',
    'return out',
  ),
  cases: [
    [[{ v: 2, l: { v: 1, l: null, r: null }, r: { v: 3, l: null, r: null } }], [[2], [1, 3]]],
    [[null], []],
  ],
})

add({
  title: 'Diámetro del árbol',
  name: 'diameter',
  params: 'node',
  ts: 'node: { v: number, l: any, r: any } | null): number',
  prompt: 'Un nodo es { v, l, r }. El diámetro es el número de aristas del camino más largo entre dos nodos. null → 0.\nEjemplo: raíz 1, hijo izquierdo 2 con hijos 4 y 5, hijo derecho 3 → 3.',
  used: 'la altura de cada subárbol y un máximo global',
  explanation:
    'El mejor camino que pasa por un nodo es la altura izquierda más la derecha. Se calcula la altura de abajo arriba y se actualiza ese máximo. No hace falta reconstruir el camino, solo su longitud. Es lineal.',
  body: b(
    'let best = 0',
    'function height(current) {',
    '  if (current === null) return 0',
    '  const left = height(current.l)',
    '  const right = height(current.r)',
    '  if (left + right > best) best = left + right',
    '  return 1 + (left > right ? left : right)',
    '}',
    'height(node)',
    'return best',
  ),
  cases: [
    [[{ v: 1, l: { v: 2, l: { v: 4, l: null, r: null }, r: { v: 5, l: null, r: null } }, r: { v: 3, l: null, r: null } }], 3],
    [[null], 0],
  ],
})

add({
  title: 'Ancestro común',
  name: 'lca',
  params: 'node, p, q',
  ts: 'node: { v: number, l: any, r: any } | null, p: number, q: number): number | null',
  prompt: 'Un nodo es { v, l, r } y los valores son únicos. p y q existen en el árbol. Devuelve el valor del ancestro común más bajo. Un nodo puede ser ancestro de sí mismo.\nEjemplo: en el árbol de raíz 1, con 2 (hijos 4 y 5) y 3, lca(4, 5) es 2 y lca(4, 3) es 1.',
  used: 'recursión que sube el lado donde encontró los valores',
  explanation:
    'Si el nodo es null o es p o q, se devuelve. Si los dos lados encuentran algo, este nodo es el cruce. Si solo un lado encuentra, el ancestro está en ese lado, o es el propio nodo encontrado. No hace falta la lista de padres.',
  body: b(
    'if (node === null || node.v === p || node.v === q) return node ? node.v : null',
    'const left = lca(node.l, p, q)',
    'const right = lca(node.r, p, q)',
    'if (left !== null && right !== null) return node.v',
    'return left !== null ? left : right',
  ),
  cases: [
    [[{ v: 1, l: { v: 2, l: { v: 4, l: null, r: null }, r: { v: 5, l: null, r: null } }, r: { v: 3, l: null, r: null } }, 4, 5], 2],
    [[{ v: 1, l: { v: 2, l: { v: 4, l: null, r: null }, r: { v: 5, l: null, r: null } }, r: { v: 3, l: null, r: null } }, 4, 3], 1],
  ],
})

add({
  title: 'Construir el árbol',
  name: 'buildTree',
  params: 'preorder, inorder',
  ts: 'preorder: number[], inorder: number[]): { v: number, l: any, r: any } | null',
  prompt: 'Los valores son únicos. preorder es raíz, izquierda, derecha. inorder es izquierda, raíz, derecha. Reconstruye el árbol como { v, l, r }.\nEjemplo: preorder [3, 9, 20, 15, 7], inorder [9, 3, 15, 20, 7].',
  used: 'el preorder da la raíz y el inorder parte los subárboles',
  explanation:
    'El primer valor pendiente del preorder es la raíz del tramo. En el inorder, lo que queda a su izquierda es el subárbol izquierdo y lo de la derecha, el derecho. Un Map de valor a índice evita buscar la raíz en cada llamada. El cursor del preorder avanza en el mismo orden en que se crean las raíces.',
  body: b(
    'const index = new Map(inorder.map((value, i) => [value, i]))',
    'let cursor = 0',
    'function walk(left, right) {',
    '  if (left > right) return null',
    '  const value = preorder[cursor++]',
    '  const mid = index.get(value)',
    '  return { v: value, l: walk(left, mid - 1), r: walk(mid + 1, right) }',
    '}',
    'return walk(0, inorder.length - 1)',
  ),
  cases: [
    [[[3, 9, 20, 15, 7], [9, 3, 15, 20, 7]], { v: 3, l: { v: 9, l: null, r: null }, r: { v: 20, l: { v: 15, l: null, r: null }, r: { v: 7, l: null, r: null } } }],
  ],
})

add({
  title: 'K-ésimo del BST',
  name: 'kthSmallest',
  params: 'node, k',
  ts: 'node: { v: number, l: any, r: any }, k: number): number',
  prompt: 'El árbol es un BST con valores únicos, nodo { v, l, r }. Devuelve el k-ésimo menor. k empieza en 1.\nEjemplo: raíz 3, izquierda 1, derecha 4, k 1 → 1.',
  used: 'recorrido inorder, que en un BST sale ordenado',
  explanation:
    'Izquierda, nodo, derecha visita los valores de menor a mayor. Se puede parar al llegar a k. Si el árbol está equilibrado y se guardan tamaños de subárbol, se baja en log n sin listar; este recorrido es lineal en k más la altura, y es el que hay que entender primero.',
  body: b(
    'const values = []',
    'function walk(current) {',
    '  if (current === null || values.length >= k) return',
    '  walk(current.l)',
    '  values.push(current.v)',
    '  walk(current.r)',
    '}',
    'walk(node)',
    'return values[k - 1]',
  ),
  cases: [
    [[{ v: 3, l: { v: 1, l: null, r: null }, r: { v: 4, l: null, r: null } }, 1], 1],
    [[{ v: 3, l: { v: 1, l: null, r: null }, r: { v: 4, l: null, r: null } }, 3], 4],
  ],
})

add({
  title: 'Serializar el árbol',
  name: 'serializeTree',
  params: 'node',
  ts: 'node: { v: number, l: any, r: any } | null): Array<number | null>',
  prompt: 'Serializa el árbol en preorder. null es un hueco explícito, para poder reconstruirlo.\nEjemplo: raíz 3, izquierda 1, derecha 4 → [3, 1, null, null, 4, null, null].',
  used: 'preorder con null marcado',
  explanation:
    'Sin los null, varios árboles distintos compartirían la lista de valores. Cada null cierra una rama. El preorder pone la raíz antes que los hijos, que es el orden en el que un deserializador volvería a leer. Aquí solo se pide serializar.',
  body: b(
    'const out = []',
    'function walk(current) {',
    '  if (current === null) {',
    '    out.push(null)',
    '    return',
    '  }',
    '  out.push(current.v)',
    '  walk(current.l)',
    '  walk(current.r)',
    '}',
    'walk(node)',
    'return out',
  ),
  cases: [
    [[{ v: 3, l: { v: 1, l: null, r: null }, r: { v: 4, l: null, r: null } }], [3, 1, null, null, 4, null, null]],
    [[null], [null]],
  ],
})

add({
  title: 'Caminos con obstáculos',
  name: 'uniquePathsObstacles',
  params: 'grid',
  ts: 'grid: number[][]): number',
  prompt: 'Solo se baja o se va a la derecha. 1 es obstáculo. ¿Cuántos caminos hay de la esquina superior izquierda a la inferior derecha?\nEjemplo: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] → 2.',
  used: 'programación dinámica sobre la cuadrícula',
  explanation:
    'Los caminos a una casilla libre son la suma de los que llegan desde arriba y desde la izquierda. Un obstáculo tiene 0. Si el origen está bloqueado, no hay ninguno. Se reutiliza la misma idea que sin obstáculos, con ese cero que corta.',
  body: b(
    'const rows = grid.length',
    'const cols = grid[0].length',
    'const dp = Array.from({ length: rows }, () => new Array(cols).fill(0))',
    'if (grid[0][0] === 1) return 0',
    'dp[0][0] = 1',
    'for (let r = 0; r < rows; r++) {',
    '  for (let c = 0; c < cols; c++) {',
    '    if (grid[r][c] === 1) dp[r][c] = 0',
    '    else {',
    '      if (r > 0) dp[r][c] += dp[r - 1][c]',
    '      if (c > 0) dp[r][c] += dp[r][c - 1]',
    '    }',
    '  }',
    '}',
    'return dp[rows - 1][cols - 1]',
  ),
  cases: [
    [[[[0, 0, 0], [0, 1, 0], [0, 0, 0]]], 2],
    [[[[1, 0]]], 0],
  ],
})

add({
  title: 'Camino de coste mínimo',
  name: 'minPathSum',
  params: 'grid',
  ts: 'grid: number[][]): number',
  prompt: 'Solo se baja o se va a la derecha. Cada casilla suma su valor. Devuelve el coste mínimo hasta la esquina inferior derecha.\nEjemplo: [[1, 3, 1], [1, 5, 1], [4, 2, 1]] → 7.',
  used: 'programación dinámica: mínimo de llegar desde arriba o desde la izquierda',
  explanation:
    'La primera fila solo puede venir de la izquierda, y la primera columna solo de arriba. El resto elige el mínimo de esos dos vecinos y suma su propio valor. No hay ciclos porque solo se avanza a la derecha o abajo, así que el orden de llenado es válido.',
  body: b(
    'const rows = grid.length',
    'const cols = grid[0].length',
    'const dp = Array.from({ length: rows }, () => new Array(cols).fill(0))',
    'dp[0][0] = grid[0][0]',
    'for (let c = 1; c < cols; c++) dp[0][c] = dp[0][c - 1] + grid[0][c]',
    'for (let r = 1; r < rows; r++) dp[r][0] = dp[r - 1][0] + grid[r][0]',
    'for (let r = 1; r < rows; r++) {',
    '  for (let c = 1; c < cols; c++) dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c]',
    '}',
    'return dp[rows - 1][cols - 1]',
  ),
  cases: [
    [[[[1, 3, 1], [1, 5, 1], [4, 2, 1]]], 7],
    [[[[5]]], 5],
  ],
})

add({
  title: 'Subsecuencia común',
  name: 'longestCommonSubsequence',
  params: 'a, b',
  ts: 'a: string, b: string): number',
  prompt: 'Devuelve la longitud de la subsecuencia común más larga. No tiene que ser contigua.\nEjemplo: "abcde", "ace" → 3.',
  used: 'programación dinámica sobre prefijos',
  explanation:
    'Si los caracteres finales coinciden, la respuesta crece desde la diagonal. Si no, es el máximo de ignorar un carácter de a o uno de b. No se reconstruye el texto, solo la longitud. La tabla es (n + 1) por (m + 1).',
  body: b(
    'const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))',
    'for (let i = 1; i <= a.length; i++) {',
    '  for (let j = 1; j <= b.length; j++) {',
    '    if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1',
    '    else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])',
    '  }',
    '}',
    'return dp[a.length][b.length]',
  ),
  cases: [
    [['abcde', 'ace'], 3],
    [['abc', 'def'], 0],
  ],
})

add({
  title: 'Cuadrado de unos',
  name: 'maximalSquare',
  params: 'matrix',
  ts: 'matrix: string[][]): number',
  prompt: 'La matriz tiene "0" y "1". Devuelve el área del cuadrado de unos más grande.\nEjemplo: [["1", "0"], ["1", "1"]] → 1.',
  used: 'programación dinámica: el lado que termina en cada casilla',
  explanation:
    'Si la casilla es "1", el lado del cuadrado que acaba ahí es 1 más el mínimo de los lados de arriba, izquierda y diagonal. Un "0" no sostiene ningún cuadrado. El área es el lado máximo al cuadrado.',
  body: b(
    'const rows = matrix.length',
    'const cols = matrix[0].length',
    'let best = 0',
    'const dp = Array.from({ length: rows }, () => new Array(cols).fill(0))',
    'for (let r = 0; r < rows; r++) {',
    '  for (let c = 0; c < cols; c++) {',
    "    if (matrix[r][c] !== '1') continue",
    '    const up = r > 0 ? dp[r - 1][c] : 0',
    '    const left = c > 0 ? dp[r][c - 1] : 0',
    '    const diag = r > 0 && c > 0 ? dp[r - 1][c - 1] : 0',
    '    dp[r][c] = 1 + Math.min(up, left, diag)',
    '    if (dp[r][c] > best) best = dp[r][c]',
    '  }',
    '}',
    'return best * best',
  ),
  cases: [
    [[[['1', '0'], ['1', '1']]], 1],
    [[[['1', '1'], ['1', '1']]], 4],
  ],
})

add({
  title: 'Coste mínimo de subir',
  name: 'minCostClimb',
  params: 'cost',
  ts: 'cost: number[]): number',
  prompt: 'cost[i] es el coste de pisar el escalón i. Desde ahí se sube 1 o 2. Se puede empezar en el 0 o en el 1. El destino está justo después del último escalón y no cuesta. Devuelve el coste mínimo.\nEjemplo: [10, 15, 20] → 15. [1, 100, 1, 1, 1, 100, 1, 1, 100, 1] → 6.',
  used: 'dos variables con el coste de llegar un paso atrás y dos atrás',
  explanation:
    'Pagar el escalón i deja continuar desde ahí, así que el coste de usarlo es el escalón más el mínimo de haber llegado desde uno o dos antes. Al final se puede haber llegado al destino desde el último o desde el penúltimo, y se elige el menor. No hace falta el array entero.',
  body: b(
    'let prev = 0',
    'let curr = 0',
    'for (const step of cost) {',
    '  const next = step + (prev < curr ? prev : curr)',
    '  prev = curr',
    '  curr = next',
    '}',
    'return prev < curr ? prev : curr',
  ),
  cases: [
    [[[10, 15, 20]], 15],
    [[[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]], 6],
  ],
})

add({
  title: 'Decodificar dígitos',
  name: 'numDecodings',
  params: 'text',
  ts: 'text: string): number',
  prompt: 'A es 1, B es 2, ..., Z es 26. ¿De cuántas formas se puede decodificar text? Un 0 solo no es válido. text tiene al menos un carácter.\nEjemplo: "12" → 2. "226" → 3. "06" → 0.',
  used: 'programación dinámica de uno y dos dígitos',
  explanation:
    'Una cifra de 1 a 9 abre una forma a partir de las del prefijo anterior. Un par entre 10 y 26 abre otra a partir de dos posiciones atrás. El 0 solo no abre la de una cifra. Se guardan solo los dos totales anteriores.',
  body: b(
    "if (text[0] === '0') return 0",
    'let prev = 1',
    'let curr = 1',
    'for (let i = 1; i < text.length; i++) {',
    '  let next = 0',
    "  if (text[i] !== '0') next += curr",
    '  const pair = Number(text.slice(i - 1, i + 1))',
    '  if (pair >= 10 && pair <= 26) next += prev',
    '  prev = curr',
    '  curr = next',
    '}',
    'return curr',
  ),
  cases: [
    [['12'], 2],
    [['226'], 3],
    [['06'], 0],
  ],
})

add({
  title: 'Robo en círculo',
  name: 'robCircular',
  params: 't',
  ts: 't: number[]): number',
  prompt: 'Las casas forman un círculo: la primera y la última son vecinas y no se pueden robar juntas. Por lo demás es el robo lineal. t tiene al menos una casa.\nEjemplo: [2, 3, 2] → 3. [1, 2, 3, 1] → 4.',
  used: 'el robo lineal dos veces: sin la última casa y sin la primera',
  explanation:
    'En un círculo, una solución óptima no roba las dos puntas a la vez. Entonces es el máximo entre el problema lineal que excluye la última y el que excluye la primera. El caso de una sola casa se aparta porque los dos rangos quedarían vacíos.',
  body: b(
    'if (t.length === 1) return t[0]',
    'function rob(start, end) {',
    '  let prev = 0',
    '  let curr = 0',
    '  for (let i = start; i <= end; i++) {',
    '    const next = curr > prev + t[i] ? curr : prev + t[i]',
    '    prev = curr',
    '    curr = next',
    '  }',
    '  return curr',
    '}',
    'const skipLast = rob(0, t.length - 2)',
    'const skipFirst = rob(1, t.length - 1)',
    'return skipLast > skipFirst ? skipLast : skipFirst',
  ),
  cases: [
    [[[2, 3, 2]], 3],
    [[[1, 2, 3, 1]], 4],
    [[[5]], 5],
  ],
})

add({
  title: 'Partir en dos sumas iguales',
  name: 'canPartition',
  params: 't',
  ts: 't: number[]): boolean',
  prompt: 'Di si t se puede partir en dos grupos con la misma suma. Los números son positivos.\nEjemplo: [1, 5, 11, 5] → true. [1, 2, 3, 5] → false.',
  used: 'mochila booleana hacia la mitad de la suma',
  explanation:
    'Si la suma total es impar, es imposible. Si es par, hay que saber si un subconjunto suma exactamente la mitad. Es la mochila 0/1 con valor booleano: ok[s] dice si alguna selección suma s. El recorrido hacia atrás evita reutilizar el mismo número.',
  body: b(
    'let total = 0',
    'for (const n of t) total += n',
    'if (total % 2 !== 0) return false',
    'const target = total / 2',
    'const ok = new Array(target + 1).fill(false)',
    'ok[0] = true',
    'for (const n of t) {',
    '  for (let sum = target; sum >= n; sum--) if (ok[sum - n]) ok[sum] = true',
    '}',
    'return ok[target]',
  ),
  cases: [
    [[[1, 5, 11, 5]], true],
    [[[1, 2, 3, 5]], false],
  ],
})

add({
  title: 'Patrón con punto y asterisco',
  name: 'regexIsMatch',
  params: 'text, pattern',
  ts: 'text: string, pattern: string): boolean',
  prompt: 'El patrón usa letras, "." (un carácter) y "*" (cero o más del carácter anterior). El patrón es válido. Di si encaja con todo text.\nEjemplo: "aa", "a*" → true. "ab", ".*" → true. "aa", "a" → false.',
  used: 'programación dinámica sobre texto y patrón',
  explanation:
    'dp[i][j] dice si los primeros i del texto encajan con los primeros j del patrón. Un * puede significar cero veces el carácter anterior, que es dp de dos columnas atrás, o una vez más si el carácter coincide, que es la fila anterior en la misma columna. Sin el caso de cero veces, "a*" no encajaría con el texto vacío.',
  body: b(
    'const dp = Array.from({ length: text.length + 1 }, () => new Array(pattern.length + 1).fill(false))',
    'dp[0][0] = true',
    'for (let j = 2; j <= pattern.length; j++) {',
    "  if (pattern[j - 1] === '*') dp[0][j] = dp[0][j - 2]",
    '}',
    'for (let i = 1; i <= text.length; i++) {',
    '  for (let j = 1; j <= pattern.length; j++) {',
    "    if (pattern[j - 1] === '*') {",
    '      dp[i][j] = dp[i][j - 2]',
    '      const prev = pattern[j - 2]',
    "      if (prev === '.' || prev === text[i - 1]) dp[i][j] = dp[i][j] || dp[i - 1][j]",
    "    } else if (pattern[j - 1] === '.' || pattern[j - 1] === text[i - 1]) dp[i][j] = dp[i - 1][j - 1]",
    '  }',
    '}',
    'return dp[text.length][pattern.length]',
  ),
  cases: [
    [['aa', 'a*'], true],
    [['ab', '.*'], true],
    [['aa', 'a'], false],
    [['', 'a*'], true],
  ],
})

add({
  title: 'Insertar intervalo',
  name: 'insertInterval',
  params: 'intervals, next',
  ts: 'intervals: number[][], next: number[]): number[][]',
  prompt: 'intervals está ordenado y sin solapes. Inserta next y fusiona lo que haga falta. Los intervalos son [inicio, fin] cerrados.\nEjemplo: [[1, 3], [6, 9]], [2, 5] → [[1, 5], [6, 9]].',
  used: 'un recorrido en tres tramos: antes, solape y después',
  explanation:
    'Lo que acaba antes de next se copia. Lo que empieza después se copia cuando next ya se ha colocado. Lo que solapa ensancha start y end. Al final, si next no se ha emitido, se añade. Es lineal porque la lista ya venía ordenada.',
  body: b(
    'const out = []',
    'let start = next[0]',
    'let end = next[1]',
    'let placed = false',
    'for (const interval of intervals) {',
    '  if (interval[1] < start) out.push(interval.slice())',
    '  else if (interval[0] > end) {',
    '    if (!placed) {',
    '      out.push([start, end])',
    '      placed = true',
    '    }',
    '    out.push(interval.slice())',
    '  } else {',
    '    if (interval[0] < start) start = interval[0]',
    '    if (interval[1] > end) end = interval[1]',
    '  }',
    '}',
    'if (!placed) out.push([start, end])',
    'return out',
  ),
  cases: [
    [[[[1, 3], [6, 9]], [2, 5]], [[1, 5], [6, 9]]],
    [[[],[2,5]],[[2,5]]],
  ],
})

add({
  title: 'Quitar solapes',
  name: 'eraseOverlapCount',
  params: 'intervals',
  ts: 'intervals: number[][]): number',
  prompt: 'Devuelve el mínimo de intervalos que hay que quitar para que no queden solapes. [inicio, fin) : tocar en el fin no es solape.\nEjemplo: [[1, 2], [2, 3], [3, 4], [1, 3]] → 1.',
  used: 'el máximo de compatibles, restado del total',
  explanation:
    'Quitar el mínimo es quedarse con el máximo de intervalos compatibles, que es el problema de ordenar por el fin. La respuesta es la longitud menos los que se pudieron conservar.',
  body: b(
    'const sorted = intervals.slice().sort((a, b) => a[1] - b[1])',
    'let end = -1e15',
    'let kept = 0',
    'for (const interval of sorted) {',
    '  if (interval[0] >= end) {',
    '    kept++',
    '    end = interval[1]',
    '  }',
    '}',
    'return intervals.length - kept',
  ),
  cases: [
    [[[[1, 2], [2, 3], [3, 4], [1, 3]]], 1],
    [[[[1, 2], [2, 3]]], 0],
  ],
})

add({
  title: 'Flechas a los globos',
  name: 'findMinArrow',
  params: 'points',
  ts: 'points: number[][]): number',
  prompt: 'Cada globo es [inicio, fin], cerrado. Una flecha en la posición x revienta los globos con inicio <= x <= fin. ¿Cuántas flechas hacen falta como mínimo?\nEjemplo: [[10, 16], [2, 8], [1, 6], [7, 12]] → 2.',
  used: 'ordenar por el fin y disparar en ese fin',
  explanation:
    'Ordenados por el fin, la primera flecha se dispara en el fin del primero: revienta a todos los que lo cubren y deja vivos a los que empiezan después. Cada globo que empieza después de la última flecha necesita otra. Es el mismo avaro que los intervalos, con la desigualdad estricta porque el extremo está incluido.',
  body: b(
    'const sorted = points.slice().sort((a, b) => a[1] - b[1])',
    'let arrows = 0',
    'let end = -1e15',
    'for (const point of sorted) {',
    '  if (point[0] > end) {',
    '    arrows++',
    '    end = point[1]',
    '  }',
    '}',
    'return arrows',
  ),
  cases: [
    [[[[10, 16], [2, 8], [1, 6], [7, 12]]], 2],
    [[[[1, 2], [2, 3]]], 1],
  ],
})

add({
  title: 'Partir en etiquetas',
  name: 'partitionLabels',
  params: 'text',
  ts: 'text: string): number[]',
  prompt: 'Parte text en el mayor número de trozos tal que cada letra aparezca en un solo trozo. Devuelve las longitudes.\nEjemplo: "ababcbacadefegdehijhklij" → [9, 7, 8].',
  used: 'el último índice de cada letra y un fin de trozo que se va alargando',
  explanation:
    'Un trozo no puede cerrarse antes del último índice de ninguna letra que ya haya entrado. Se guarda ese último índice y se avanza el fin del trozo. Cuando el índice actual alcanza el fin, la letra no vuelve a salir y el trozo se cierra.',
  body: b(
    'const last = new Map()',
    'for (let i = 0; i < text.length; i++) last.set(text[i], i)',
    'const out = []',
    'let start = 0',
    'let end = 0',
    'for (let i = 0; i < text.length; i++) {',
    '  if (last.get(text[i]) > end) end = last.get(text[i])',
    '  if (i === end) {',
    '    out.push(end - start + 1)',
    '    start = i + 1',
    '  }',
    '}',
    'return out',
  ),
  cases: [
    [['ababcbacadefegdehijhklij'], [9, 7, 8]],
    [['abc'], [1, 1, 1]],
  ],
})

add({
  title: 'Reorganizar sin vecinos iguales',
  name: 'reorganizeString',
  params: 'text',
  ts: 'text: string): string',
  prompt: 'Reorganiza text para que dos caracteres iguales no queden vecinos. Si es imposible, "". Cualquier organización válida vale; esta solución rellena primero las posiciones pares.\nEjemplo: "aab" → "aba". "aaab" → "".',
  used: 'el conteo, un límite de frecuencia y un relleno en dos pasadas',
  explanation:
    'Si una letra aparece más de la mitad redondeada hacia arriba, es imposible: no hay huecos para separarla. Si cabe, se colocan las letras de más frecuente a menos frecuente en las posiciones pares y luego en las impares. Así las copias de la más frecuente no se tocan.',
  body: b(
    'const count = new Map()',
    'for (const ch of text) count.set(ch, (count.get(ch) ?? 0) + 1)',
    'const letters = [...count.entries()].sort((a, b) => b[1] - a[1])',
    'if (letters[0][1] > Math.floor((text.length + 1) / 2)) return ""',
    'const out = new Array(text.length)',
    'let index = 0',
    'for (const [ch, times] of letters) {',
    '  for (let i = 0; i < times; i++) {',
    '    out[index] = ch',
    '    index += 2',
    '    if (index >= text.length) index = 1',
    '  }',
    '}',
    "return out.join('')",
  ),
  cases: [
    [['aab'], 'aba'],
    [['aaab'], ''],
  ],
})

add({
  title: 'Orden personalizado',
  name: 'customSortString',
  params: 'order, text',
  ts: 'order: string, text: string): string',
  prompt: 'Ordena los caracteres de text según la primera aparición en order. Los que no están van al final, entre ellos por código de carácter. order no repite letras.\nEjemplo: "cba", "abcd" → "cbad".',
  used: 'un Map de rangos y sort',
  explanation:
    'order define la prioridad. Una letra ausente recibe un rango alto para ir al final, y el código del carácter desempata esas. sort es estable en la práctica con este comparador total. Un conteo y un recorrido de order también valen y son lineales en el alfabeto.',
  body: b(
    'const rank = new Map()',
    'for (let i = 0; i < order.length; i++) rank.set(order[i], i)',
    "return text.split('').sort((a, b) => (rank.get(a) ?? 1000) - (rank.get(b) ?? 1000) || a.charCodeAt(0) - b.charCodeAt(0)).join('')",
  ),
  cases: [
    [['cba', 'abcd'], 'cbad'],
    [['', 'ba'], 'ab'],
  ],
})

add({
  title: 'Sumar a un objetivo con signos',
  name: 'findTargetSum',
  params: 't, target',
  ts: 't: number[], target: number): number',
  prompt: 'A cada número se le pone + o -. ¿De cuántas formas la expresión suma target?\nEjemplo: [1, 1, 1, 1, 1], 3 → 5.',
  used: 'un Map de sumas alcanzadas y de cuántas formas',
  explanation:
    'Después de cada número, cada suma conocida se bifurca en más n y menos n. El Map acumula las formas. Es el problema de la mochila de signos, exponencial en el peor caso si las sumas no se repiten, y mucho mejor cuando coinciden. Probar los 2^n signos a mano solo cabe con n pequeño; aquí n de los ejemplos es 5, pero el Map escala mejor.',
  body: b(
    'let ways = new Map([[0, 1]])',
    'for (const n of t) {',
    '  const next = new Map()',
    '  for (const [sum, count] of ways) {',
    '    next.set(sum + n, (next.get(sum + n) ?? 0) + count)',
    '    next.set(sum - n, (next.get(sum - n) ?? 0) + count)',
    '  }',
    '  ways = next',
    '}',
    'return ways.get(target) ?? 0',
  ),
  cases: [
    [[[1, 1, 1, 1, 1], 3], 5],
    [[[1], 2], 0],
  ],
})

add({
  title: 'Zigzag',
  name: 'zigzag',
  params: 'text, rows',
  ts: 'text: string, rows: number): string',
  prompt: 'Escribe text en zigzag de rows filas y léelo por filas. Si rows es 1, el texto no cambia.\nEjemplo: "PAYPALISHIRING", 3 → "PAHNAPLSIIGYIR".',
  used: 'una dirección que rebota en los extremos',
  explanation:
    'Se baja fila a fila y, al tocar el borde, la dirección cambia. Cada carácter se concatena a su fila. Unir las filas da la lectura. Con una sola fila no hay rebote y el resultado es el original.',
  body: b(
    'if (rows === 1 || rows >= text.length) return text',
    "const lines = Array.from({ length: rows }, () => '')",
    'let row = 0',
    'let dir = 1',
    'for (const ch of text) {',
    '  lines[row] += ch',
    '  if (row === 0) dir = 1',
    '  else if (row === rows - 1) dir = -1',
    '  row += dir',
    '}',
    "return lines.join('')",
  ),
  cases: [
    [['PAYPALISHIRING', 3], 'PAHNAPLSIIGYIR'],
    [['AB', 1], 'AB'],
  ],
})

add({
  title: 'Espiral',
  name: 'spiralOrder',
  params: 'matrix',
  ts: 'matrix: number[][]): number[]',
  prompt: 'Recorre la matriz en espiral, en el sentido de las agujas del reloj.\nEjemplo: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] → [1, 2, 3, 6, 9, 8, 7, 4, 5].',
  used: 'cuatro bordes que se encogen',
  explanation:
    'Se recorre la fila de arriba de izquierda a derecha, la columna derecha de arriba abajo, la fila de abajo de derecha a izquierda y la columna izquierda de abajo arriba. Después los bordes se acercan. Hay que comprobar que la fila o la columna todavía existen antes del tramo de vuelta, para no repetir el centro.',
  body: b(
    'const out = []',
    'let top = 0',
    'let bottom = matrix.length - 1',
    'let left = 0',
    'let right = matrix[0].length - 1',
    'while (top <= bottom && left <= right) {',
    '  for (let c = left; c <= right; c++) out.push(matrix[top][c])',
    '  top++',
    '  for (let r = top; r <= bottom; r++) out.push(matrix[r][right])',
    '  right--',
    '  if (top <= bottom) {',
    '    for (let c = right; c >= left; c--) out.push(matrix[bottom][c])',
    '    bottom--',
    '  }',
    '  if (left <= right) {',
    '    for (let r = bottom; r >= top; r--) out.push(matrix[r][left])',
    '    left++',
    '  }',
    '}',
    'return out',
  ),
  cases: [
    [[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], [1, 2, 3, 6, 9, 8, 7, 4, 5]],
    [[[[1, 2, 3]]], [1, 2, 3]],
  ],
})

add({
  title: 'Mapa con tiempo',
  name: 'runTimeMap',
  params: 'operations',
  ts: 'operations: Array<["set", string, string, number] | ["get", string, number]>): string[]',
  prompt:
    '"set" guarda clave, valor y timestamp. Los timestamp de cada clave llegan en orden creciente. "get" devuelve el valor de esa clave con el mayor timestamp menor o igual que el pedido, o "" si no hay. Devuelve solo los get.\nEjemplo: set foo bar 1, set foo bar2 4, get foo 4, get foo 3 → ["bar2", "bar"].',
  used: 'un Map de listas ordenadas por tiempo y una búsqueda lineal',
  explanation:
    'Como los timestamp llegan ordenados, se pueden añadir al final de la lista de la clave. get recorre hasta pasar el tiempo pedido y se queda con el último que cabía. Con muchas lecturas, una búsqueda binaria sobre la lista baja cada get a log n. La lista ordenada es lo que lo permite; un Map de timestamp sueltos no daría el anterior.',
  body: b(
    'const store = new Map()',
    'const out = []',
    'for (const op of operations) {',
    "  if (op[0] === 'set') {",
    '    const list = store.get(op[1]) ?? []',
    '    list.push([op[3], op[2]])',
    '    store.set(op[1], list)',
    '  } else {',
    '    const list = store.get(op[1]) ?? []',
    "    let value = ''",
    '    for (const [time, stored] of list) {',
    '      if (time <= op[2]) value = stored',
    '      else break',
    '    }',
    '    out.push(value)',
    '  }',
    '}',
    'return out',
  ),
  cases: [
    [[[['set', 'foo', 'bar', 1], ['set', 'foo', 'bar2', 4], ['get', 'foo', 4], ['get', 'foo', 3], ['get', 'foo', 0]]], ['bar2', 'bar', '']],
  ],
})

add({
  title: 'Área máxima de isla',
  name: 'maxAreaOfIsland',
  params: 'grid',
  ts: 'grid: number[][]): number',
  prompt: '1 es tierra y 0 es agua. Las islas se unen en cruz. Devuelve el área de la isla más grande, o 0 si no hay tierra.\nEjemplo: [[0, 1], [1, 1]] → 3.',
  used: 'DFS que devuelve el tamaño y marca lo visitado',
  explanation:
    'Es numIslands, pero cada recorrido suma casillas en vez de contar islas. El máximo de esas sumas es el área. Marcar al entrar evita contar dos veces la misma tierra.',
  body: b(
    'const rows = grid.length',
    'const cols = grid[0].length',
    'const seen = grid.map((row) => row.map(() => false))',
    'function area(r, c) {',
    '  if (r < 0 || c < 0 || r >= rows || c >= cols || seen[r][c] || grid[r][c] !== 1) return 0',
    '  seen[r][c] = true',
    '  return 1 + area(r + 1, c) + area(r - 1, c) + area(r, c + 1) + area(r, c - 1)',
    '}',
    'let best = 0',
    'for (let r = 0; r < rows; r++) {',
    '  for (let c = 0; c < cols; c++) {',
    '    const next = area(r, c)',
    '    if (next > best) best = next',
    '  }',
    '}',
    'return best',
  ),
  cases: [
    [[[[0, 1], [1, 1]]], 3],
    [[[[0, 0]]], 0],
  ],
})

add({
  title: 'Retardo de la red',
  name: 'networkDelay',
  params: 'n, edges, start',
  ts: 'n: number, edges: number[][], start: number): number',
  prompt: 'Hay n nodos, del 1 a n. edges son [desde, hasta, peso] dirigidos y positivos. Devuelve el tiempo mínimo para que la señal desde start llegue a todos, o -1 si alguno no es alcanzable.\nEjemplo: 4, [[2, 1, 1], [2, 3, 1], [3, 4, 1]], 2 → 2.',
  used: 'Dijkstra y el máximo de las distancias',
  explanation:
    'El tiempo para avisar a todos es la distancia del nodo más lejano, no la suma. Si alguno queda a null, la red no está cubierta y la respuesta es -1. Los nodos van de 1 a n, así que el array tiene un hueco en el índice 0.',
  body: b(
    'const next = Array.from({ length: n + 1 }, () => [])',
    'for (const [from, to, weight] of edges) next[from].push([to, weight])',
    'const dist = new Array(n + 1).fill(null)',
    'dist[start] = 0',
    'const used = new Array(n + 1).fill(false)',
    'for (let step = 0; step < n; step++) {',
    '  let node = -1',
    '  for (let i = 1; i <= n; i++) {',
    '    if (!used[i] && dist[i] !== null && (node === -1 || dist[i] < dist[node])) node = i',
    '  }',
    '  if (node === -1) break',
    '  used[node] = true',
    '  for (const [to, weight] of next[node]) {',
    '    const nextDist = dist[node] + weight',
    '    if (dist[to] === null || nextDist < dist[to]) dist[to] = nextDist',
    '  }',
    '}',
    'let max = 0',
    'for (let i = 1; i <= n; i++) {',
    '  if (dist[i] === null) return -1',
    '  if (dist[i] > max) max = dist[i]',
    '}',
    'return max',
  ),
  cases: [
    [[4, [[2, 1, 1], [2, 3, 1], [3, 4, 1]], 2], 2],
    [[2, [[1, 2, 1]], 2], -1],
  ],
})

add({
  title: 'Ventana mínima',
  name: 'minWindow',
  params: 'text, needle',
  ts: 'text: string, needle: string): string',
  prompt: 'Devuelve el substring más corto de text que contiene todas las letras de needle, con sus repeticiones. Si hay varios de esa longitud, el que empieza antes. Si no hay, "".\nEjemplo: "ADOBECODEBANC", "ABC" → "BANC".',
  used: 'ventana deslizante y un contador de letras que faltan',
  explanation:
    'Se amplía por la derecha hasta cubrir la aguja. Entonces se encoge por la izquierda mientras siga cubierta, y se guarda la ventana si es más corta. need cuenta cuántas letras siguen faltando, no solo si la letra existe. Es lineal.',
  body: b(
    'if (!needle) return ""',
    'const need = new Map()',
    'for (const ch of needle) need.set(ch, (need.get(ch) ?? 0) + 1)',
    'let missing = needle.length',
    'let best = ""',
    'let start = 0',
    'for (let i = 0; i < text.length; i++) {',
    '  if ((need.get(text[i]) ?? 0) > 0) missing--',
    '  need.set(text[i], (need.get(text[i]) ?? 0) - 1)',
    '  while (missing === 0) {',
    '    const size = i - start + 1',
    '    if (!best || size < best.length) best = text.slice(start, i + 1)',
    '    need.set(text[start], need.get(text[start]) + 1)',
    '    if (need.get(text[start]) > 0) missing++',
    '    start++',
    '  }',
    '}',
    'return best',
  ),
  cases: [
    [['ADOBECODEBANC', 'ABC'], 'BANC'],
    [['a', 'aa'], ''],
  ],
})

add({
  title: 'Paréntesis válidos más largos',
  name: 'longestValidParentheses',
  params: 'text',
  ts: 'text: string): number',
  prompt: 'Devuelve la longitud del substring más largo de paréntesis válidos. Solo hay ( y ).\nEjemplo: "(()" → 2. ")()())" → 4.',
  used: 'una pila de índices, con un centinela -1',
  explanation:
    'La pila guarda índices, no solo paréntesis. El -1 es el borde anterior a un trozo válido. Un cierre con la pila vacía después de desapilar reinicia el borde. Un cierre con algo debajo mide i - cima. Esa longitud es un bloque válido contiguo.',
  body: b(
    'const stack = [-1]',
    'let best = 0',
    'for (let i = 0; i < text.length; i++) {',
    "  if (text[i] === '(') stack.push(i)",
    '  else {',
    '    stack.pop()',
    '    if (stack.length === 0) stack.push(i)',
    '    else {',
    '      const size = i - stack[stack.length - 1]',
    '      if (size > best) best = size',
    '    }',
    '  }',
    '}',
    'return best',
  ),
  cases: [
    [['(()'], 2],
    [[')()())'], 4],
    [[''], 0],
  ],
})

add({
  title: 'Suma de combinaciones',
  name: 'combinationSum',
  params: 'candidates, target',
  ts: 'candidates: number[], target: number): number[][]',
  prompt: 'candidates no tiene repetidos y son positivos. Devuelve las combinaciones que suman target. Se puede reutilizar un número. Dentro de cada combinación van en orden no decreciente. Las combinaciones salen en el orden del backtracking que prueba los candidatos de menor a mayor.\nEjemplo: [2, 3, 6, 7], 7 → [[2, 2, 3], [7]].',
  used: 'backtracking con un índice de inicio para no repetir permutaciones',
  explanation:
    'Cada llamada puede volver a usar el candidato actual, por eso el siguiente start es i y no i + 1. No puede usar uno anterior, y eso evita contar 2,2,3 y 2,3,2 como dos soluciones. Se ordena al principio para que el orden de salida quede fijado. Si el candidato ya pasa del resto, se corta la rama.',
  body: b(
    'const out = []',
    'const nums = candidates.slice().sort((a, b) => a - b)',
    'function walk(start, left, cur) {',
    '  if (left === 0) {',
    '    out.push(cur.slice())',
    '    return',
    '  }',
    '  for (let i = start; i < nums.length; i++) {',
    '    if (nums[i] > left) break',
    '    cur.push(nums[i])',
    '    walk(i, left - nums[i], cur)',
    '    cur.pop()',
    '  }',
    '}',
    'walk(0, target, [])',
    'return out',
  ),
  cases: [
    [[[2, 3, 6, 7], 7], [[2, 2, 3], [7]]],
    [[[2], 1], []],
  ],
})

add({
  title: 'Permutaciones',
  name: 'permute',
  params: 't',
  ts: 't: number[]): number[][]',
  prompt: 'Devuelve todas las permutaciones de t, que no tiene repetidos. El orden es el del backtracking que intercambia desde la posición actual hacia la derecha.\nEjemplo: [1, 2] → [[1, 2], [2, 1]]. [1, 2, 3] empieza por [1, 2, 3] y [1, 3, 2].',
  used: 'backtracking con intercambio y deshacer',
  explanation:
    'En la posición start se prueba cada candidato que queda a la derecha, se intercambia, se baja, y se deshace el intercambio. Sin deshacer, la siguiente rama vería el array ya revuelto. El número de hojas es n!.',
  body: b(
    'const out = []',
    'const nums = t.slice()',
    'function walk(start) {',
    '  if (start === nums.length) {',
    '    out.push(nums.slice())',
    '    return',
    '  }',
    '  for (let i = start; i < nums.length; i++) {',
    '    const tmp = nums[start]',
    '    nums[start] = nums[i]',
    '    nums[i] = tmp',
    '    walk(start + 1)',
    '    nums[i] = nums[start]',
    '    nums[start] = tmp',
    '  }',
    '}',
    'walk(0)',
    'return out',
  ),
  cases: [
    [[[1, 2]], [[1, 2], [2, 1]]],
    [[[1, 2, 3]], [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 2, 1], [3, 1, 2]]],
  ],
})

add({
  title: 'Subconjuntos',
  name: 'subsets',
  params: 't',
  ts: 't: number[]): number[][]',
  prompt: 'Devuelve todos los subconjuntos de t, que no tiene repetidos. El orden es el del backtracking que decide incluir los elementos de izquierda a derecha. Incluye el vacío.\nEjemplo: [1, 2] → [[], [1], [1, 2], [2]].',
  used: 'backtracking que avanza el índice de inicio',
  explanation:
    'Cada llamada guarda la selección actual, vacío incluido, y luego prueba añadir cada elemento que todavía no se ha considerado. El índice de inicio impide repetir {1, 2} como {2, 1}. Hay 2^n subconjuntos.',
  body: b(
    'const out = []',
    'function walk(start, cur) {',
    '  out.push(cur.slice())',
    '  for (let i = start; i < t.length; i++) {',
    '    cur.push(t[i])',
    '    walk(i + 1, cur)',
    '    cur.pop()',
    '  }',
    '}',
    'walk(0, [])',
    'return out',
  ),
  cases: [
    [[[1, 2]], [[], [1], [1, 2], [2]]],
    [[[]], [[]]],
  ],
})

add({
  title: 'Generar paréntesis',
  name: 'generateParentheses',
  params: 'n',
  ts: 'n: number): string[]',
  prompt: 'Devuelve todas las cadenas de n parejas de paréntesis bien formadas, en el orden del backtracking que prefiere abrir.\nEjemplo: 3 → ["((()))", "(()())", "(())()", "()(())", "()()()"].',
  used: 'backtracking con el número de abiertos y cerrados',
  explanation:
    'Se puede abrir mientras no se hayan usado las n aperturas. Se puede cerrar solo si hay más abiertos que cerrados: si no, la cadena quedaría inválida y no hace falta explorar esa rama. Al llegar a 2n caracteres, la cadena es una solución.',
  body: b(
    'const out = []',
    'function walk(open, close, cur) {',
    '  if (cur.length === n * 2) {',
    '    out.push(cur)',
    '    return',
    '  }',
    '  if (open < n) walk(open + 1, close, cur + "(")',
    '  if (close < open) walk(open, close + 1, cur + ")")',
    '}',
    "walk(0, 0, '')",
    'return out',
  ),
  cases: [
    [[3], ['((()))', '(()())', '(())()', '()(())', '()()()']],
    [[1], ['()']],
  ],
})

add({
  title: 'Rotar la matriz',
  name: 'rotateMatrix',
  params: 'matrix',
  ts: 'matrix: number[][]): number[][]',
  prompt: 'Devuelve la matriz rotada 90 grados en el sentido de las agujas del reloj. Es cuadrada.\nEjemplo: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] → [[7, 4, 1], [8, 5, 2], [9, 6, 3]].',
  used: 'la posición (r, c) pasa a (c, n - 1 - r)',
  explanation:
    'Rotar en el sitio se hace por ciclos de cuatro casillas y no usa memoria extra. Construir una matriz nueva hace la misma transformación y es más fácil de comprobar: la fila nueva c sale de la columna c leída de abajo arriba. Aquí se construye la nueva para no mutar el argumento.',
  body: b(
    'const n = matrix.length',
    'const out = Array.from({ length: n }, () => new Array(n).fill(0))',
    'for (let r = 0; r < n; r++) {',
    '  for (let c = 0; c < n; c++) out[c][n - 1 - r] = matrix[r][c]',
    '}',
    'return out',
  ),
  cases: [
    [[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], [[7, 4, 1], [8, 5, 2], [9, 6, 3]]],
    [[[[1]]], [[1]]],
  ],
})

if (specs.length !== 100) {
  throw new Error(`senior tiene ${specs.length}`)
}
