import type { CodingExercise } from '../../domain/coding-exercise.ts'
import type { Level } from '../../domain/level.ts'

/** Catálogo de práctica. Se regenera con node scripts/coding/build.mjs */
export const codingExercises: readonly CodingExercise[] = [
  {
    "id": "junior-001",
    "level": "junior",
    "title": "Del 1 al 100",
    "prompt": "Escribe un bucle del 1 al 100. No hace falta una función. Cada número sale con console.log, uno por línea, en orden.",
    "names": [],
    "starter": "// Bucle del 1 al 100. Un console.log por número.\n\n",
    "explanation": "Un contador empieza en 1 y se incrementa mientras sea menor o igual que 100. En cada vuelta se escribe el contador. No hace falta guardar los números en un array ni envolverlos en una función. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle for y console.log",
    "javascript": "for (let i = 1; i <= 100; i++) {\n  console.log(i)\n}\n",
    "typescript": "const limit: number = 100\nfor (let i = 1; i <= limit; i++) {\n  console.log(i)\n}\n",
    "probe": "\nif (__practiceLogs.length !== 100) throw new Error(\"Se esperaban 100 líneas (del 1 al 100) y hay \" + __practiceLogs.length + \".\");\nfor (var __i = 0; __i < 100; __i++) {\n  if (__practiceLogs[__i] !== String(__i + 1)) {\n    throw new Error(\"La línea \" + (__i + 1) + \" debería ser \" + (__i + 1) + \" y es «\" + __practiceLogs[__i] + \"».\");\n  }\n}\nconsole.log(\"Correcto. Del 1 al 100.\");\n",
    "captureLogs": true
  },
  {
    "id": "junior-002",
    "level": "junior",
    "title": "Máximo sin max",
    "prompt": "Write a function to find the maximum value in array t, without using the max function.\nEscribe findMax. El array t tiene al menos un número. No uses Math.max.",
    "names": [
      "findMax"
    ],
    "starter": "function findMax(t) {\n  \n}\n",
    "explanation": "Se toma el primer elemento como candidato. Cada número siguiente lo sustituye solo si es mayor. Así se recorre el array una vez, también cuando todos son negativos: el máximo no es cero, es el menos negativo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle for y una variable que guarda el mayor visto",
    "javascript": "function findMax(t) {\n  let best = t[0]\n  for (let i = 1; i < t.length; i++) {\n    if (t[i] > best) best = t[i]\n  }\n  return best\n}\n",
    "typescript": "function findMax(t: number[]): number) {\n  let best = t[0]\n  for (let i = 1; i < t.length; i++) {\n    if (t[i] > best) best = t[i]\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            9,
            4
          ]
        ],
        "expected": 9
      },
      {
        "args": [
          [
            -5,
            -1,
            -8
          ]
        ],
        "expected": -1
      },
      {
        "args": [
          [
            7
          ]
        ],
        "expected": 7
      }
    ],
    "forbid": [
      {
        "pattern": "Math\\s*\\.\\s*max\\b",
        "message": "No uses Math.max. Recorre el array y quédate con el mayor."
      }
    ]
  },
  {
    "id": "junior-003",
    "level": "junior",
    "title": "Producto 30",
    "prompt": "Write a function that determines whether there are three integers in the array T whose product is 30.\nNombres válidos: hasProduct30 o isThirtiable. Los tres números ocupan índices distintos.\nEjemplo: [2, 3, 5] → true. [2, 3, 4] → false.",
    "names": [
      "hasProduct30",
      "isThirtiable"
    ],
    "starter": "function hasProduct30(t) {\n  \n}\n",
    "explanation": "Hay que mirar cada trío de posiciones i < j < k. Si el producto de esos tres valores es 30, la respuesta es true. Si se acaban los tríos sin encontrarlo, es false. Con tres bucles el coste es cúbico y para un array corto sobra. Un número puede repetirse solo si aparece varias veces en el array. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "tres bucles anidados, índices distintos y una comparación con 30",
    "javascript": "function hasProduct30(t) {\n  for (let i = 0; i < t.length; i++) {\n    for (let j = i + 1; j < t.length; j++) {\n      for (let k = j + 1; k < t.length; k++) {\n        if (t[i] * t[j] * t[k] === 30) return true\n      }\n    }\n  }\n  return false\n}\nfunction isThirtiable(t) {\n  return hasProduct30(t)\n}\n",
    "typescript": "function hasProduct30(t: number[]): boolean) {\n  for (let i = 0; i < t.length; i++) {\n    for (let j = i + 1; j < t.length; j++) {\n      for (let k = j + 1; k < t.length; k++) {\n        if (t[i] * t[j] * t[k] === 30) return true\n      }\n    }\n  }\n  return false\n}\nfunction isThirtiable(t: number[]): boolean {\n  return hasProduct30(t)\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            3,
            5
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            2,
            3,
            4
          ]
        ],
        "expected": false
      },
      {
        "args": [
          [
            10,
            3,
            1
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            6,
            5,
            1
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            -5,
            -3,
            2
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            30
          ]
        ],
        "expected": false
      },
      {
        "args": [
          [
            5,
            6
          ]
        ],
        "expected": false
      },
      {
        "args": [
          [
            0,
            5,
            6,
            1
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            0,
            5,
            6
          ]
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "junior-004",
    "level": "junior",
    "title": "Suma del array",
    "prompt": "Suma todos los números de t. El array vacío suma 0.\nEjemplo: [1, 2, 3] → 6.",
    "names": [
      "sumArray"
    ],
    "starter": "function sumArray(t) {\n  \n}\n",
    "explanation": "Un acumulador empieza en 0. Cada elemento se le suma. Al terminar el recorrido, el acumulador es la suma. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle for...of y un acumulador",
    "javascript": "function sumArray(t) {\n  let total = 0\n  for (const n of t) total += n\n  return total\n}\n",
    "typescript": "function sumArray(t: number[]): number) {\n  let total = 0\n  for (const n of t) total += n\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 6
      },
      {
        "args": [
          []
        ],
        "expected": 0
      },
      {
        "args": [
          [
            -1,
            5
          ]
        ],
        "expected": 4
      }
    ]
  },
  {
    "id": "junior-005",
    "level": "junior",
    "title": "Contar pares",
    "prompt": "Cuenta cuántos números de t son pares.\nEjemplo: [1, 2, 4, 5] → 2.",
    "names": [
      "countEvens"
    ],
    "starter": "function countEvens(t) {\n  \n}\n",
    "explanation": "Un número es par cuando el resto de dividirlo entre 2 es 0. Se recorre el array y se cuenta cada vez que eso ocurre. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y el resto de dividir entre 2",
    "javascript": "function countEvens(t) {\n  let total = 0\n  for (const n of t) if (n % 2 === 0) total++\n  return total\n}\n",
    "typescript": "function countEvens(t: number[]): number) {\n  let total = 0\n  for (const n of t) if (n % 2 === 0) total++\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            4,
            5
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          []
        ],
        "expected": 0
      },
      {
        "args": [
          [
            1,
            3,
            5
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "junior-006",
    "level": "junior",
    "title": "Invertir texto",
    "prompt": "Devuelve text al revés, carácter a carácter.\nEjemplo: \"hola\" → \"aloh\".",
    "names": [
      "reverseText"
    ],
    "starter": "function reverseText(text) {\n  \n}\n",
    "explanation": "Se recorre el string desde el último índice hasta el 0 y se van pegando los caracteres en un string nuevo. El original no se modifica. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle hacia atrás y concatenación de strings",
    "javascript": "function reverseText(text) {\n  let out = ''\n  for (let i = text.length - 1; i >= 0; i--) out += text[i]\n  return out\n}\n",
    "typescript": "function reverseText(text: string): string) {\n  let out = ''\n  for (let i = text.length - 1; i >= 0; i--) out += text[i]\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "hola"
        ],
        "expected": "aloh"
      },
      {
        "args": [
          ""
        ],
        "expected": ""
      },
      {
        "args": [
          "ab"
        ],
        "expected": "ba"
      }
    ]
  },
  {
    "id": "junior-007",
    "level": "junior",
    "title": "Palíndromo exacto",
    "prompt": "Di si text se lee igual al derecho y al revés. No quites espacios. Ignora mayúsculas.\nEjemplo: \"Ana\" → true. \"hola\" → false.",
    "names": [
      "isPalindrome"
    ],
    "starter": "function isPalindrome(text) {\n  \n}\n",
    "explanation": "Se pasa el texto a minúsculas. Un índice empieza al principio y otro al final. Mientras no se crucen, los caracteres deben coincidir. Si uno falla, no es palíndromo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos índices que se acercan y comparación de caracteres",
    "javascript": "function isPalindrome(text) {\n  const clean = text.toLowerCase()\n  let i = 0\n  let j = clean.length - 1\n  while (i < j) {\n    if (clean[i] !== clean[j]) return false\n    i++\n    j--\n  }\n  return true\n}\n",
    "typescript": "function isPalindrome(text: string): boolean) {\n  const clean = text.toLowerCase()\n  let i = 0\n  let j = clean.length - 1\n  while (i < j) {\n    if (clean[i] !== clean[j]) return false\n    i++\n    j--\n  }\n  return true\n}\n",
    "cases": [
      {
        "args": [
          "Ana"
        ],
        "expected": true
      },
      {
        "args": [
          "hola"
        ],
        "expected": false
      },
      {
        "args": [
          ""
        ],
        "expected": true
      },
      {
        "args": [
          "a a"
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "junior-008",
    "level": "junior",
    "title": "FizzBuzz",
    "prompt": "Devuelve los textos del 1 a n. Múltiplo de 3: \"Fizz\". De 5: \"Buzz\". De ambos: \"FizzBuzz\". El resto, el número como texto.\nEjemplo: 5 → [\"1\", \"2\", \"Fizz\", \"4\", \"Buzz\"].",
    "names": [
      "fizzBuzz"
    ],
    "starter": "function fizzBuzz(n) {\n  \n}\n",
    "explanation": "Se comprueba primero el múltiplo de 15, porque también lo es de 3 y de 5. Si no, el de 3, luego el de 5, y si nada encaja se convierte el número a string. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle for y el resto de dividir entre 3, 5 y 15",
    "javascript": "function fizzBuzz(n) {\n  const out = []\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) out.push('FizzBuzz')\n    else if (i % 3 === 0) out.push('Fizz')\n    else if (i % 5 === 0) out.push('Buzz')\n    else out.push(String(i))\n  }\n  return out\n}\n",
    "typescript": "function fizzBuzz(n: number): string[]) {\n  const out = []\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) out.push('FizzBuzz')\n    else if (i % 3 === 0) out.push('Fizz')\n    else if (i % 5 === 0) out.push('Buzz')\n    else out.push(String(i))\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          5
        ],
        "expected": [
          "1",
          "2",
          "Fizz",
          "4",
          "Buzz"
        ]
      },
      {
        "args": [
          15
        ],
        "expected": [
          "1",
          "2",
          "Fizz",
          "4",
          "Buzz",
          "Fizz",
          "7",
          "8",
          "Fizz",
          "Buzz",
          "11",
          "Fizz",
          "13",
          "14",
          "FizzBuzz"
        ]
      }
    ]
  },
  {
    "id": "junior-009",
    "level": "junior",
    "title": "Factorial",
    "prompt": "Devuelve n! para n mayor o igual que 0. 0! es 1.\nEjemplo: 5 → 120.",
    "names": [
      "factorial"
    ],
    "starter": "function factorial(n) {\n  \n}\n",
    "explanation": "El acumulador empieza en 1. Se multiplica por 2, por 3, y así hasta n. Si n es 0 o 1, el bucle no da vueltas y se queda 1. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle que multiplica un acumulador",
    "javascript": "function factorial(n) {\n  let total = 1\n  for (let i = 2; i <= n; i++) total *= i\n  return total\n}\n",
    "typescript": "function factorial(n: number): number) {\n  let total = 1\n  for (let i = 2; i <= n; i++) total *= i\n  return total\n}\n",
    "cases": [
      {
        "args": [
          0
        ],
        "expected": 1
      },
      {
        "args": [
          1
        ],
        "expected": 1
      },
      {
        "args": [
          5
        ],
        "expected": 120
      },
      {
        "args": [
          6
        ],
        "expected": 720
      }
    ]
  },
  {
    "id": "junior-010",
    "level": "junior",
    "title": "Contar vocales",
    "prompt": "Cuenta las vocales a, e, i, o, u. Ignora mayúsculas. La y no cuenta.\nEjemplo: \"Hola\" → 2.",
    "names": [
      "countVowels"
    ],
    "starter": "function countVowels(text) {\n  \n}\n",
    "explanation": "Se recorre el texto en minúsculas. Cada carácter que esté en \"aeiou\" suma uno. El resto se ignora. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle, toLowerCase e includes",
    "javascript": "function countVowels(text) {\n  let total = 0\n  for (const ch of text.toLowerCase()) if ('aeiou'.includes(ch)) total++\n  return total\n}\n",
    "typescript": "function countVowels(text: string): number) {\n  let total = 0\n  for (const ch of text.toLowerCase()) if ('aeiou'.includes(ch)) total++\n  return total\n}\n",
    "cases": [
      {
        "args": [
          "Hola"
        ],
        "expected": 2
      },
      {
        "args": [
          "xyz"
        ],
        "expected": 0
      },
      {
        "args": [
          "AEIOU"
        ],
        "expected": 5
      }
    ]
  },
  {
    "id": "junior-011",
    "level": "junior",
    "title": "Primera mayúscula",
    "prompt": "Devuelve text con la primera letra en mayúscula y el resto igual.\nEjemplo: \"hola\" → \"Hola\". \"\" → \"\".",
    "names": [
      "capitalizeWord"
    ],
    "starter": "function capitalizeWord(text) {\n  \n}\n",
    "explanation": "Si el texto está vacío no hay primera letra. Si no, se pone en mayúscula el carácter 0 y se concatena el resto con slice(1). En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "índice 0, toUpperCase y slice",
    "javascript": "function capitalizeWord(text) {\n  if (!text) return ''\n  return text[0].toUpperCase() + text.slice(1)\n}\n",
    "typescript": "function capitalizeWord(text: string): string) {\n  if (!text) return ''\n  return text[0].toUpperCase() + text.slice(1)\n}\n",
    "cases": [
      {
        "args": [
          "hola"
        ],
        "expected": "Hola"
      },
      {
        "args": [
          ""
        ],
        "expected": ""
      },
      {
        "args": [
          "Ya"
        ],
        "expected": "Ya"
      }
    ]
  },
  {
    "id": "junior-012",
    "level": "junior",
    "title": "Repetir texto",
    "prompt": "Devuelve text repetido times veces. times es 0 o más.\nEjemplo: \"ab\", 3 → \"ababab\".",
    "names": [
      "repeatText"
    ],
    "starter": "function repeatText(text, times) {\n  \n}\n",
    "explanation": "Se parte de un string vacío y se le añade text tantas veces como indique times. Con 0 vueltas el resultado es vacío. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle for y concatenación",
    "javascript": "function repeatText(text, times) {\n  let out = ''\n  for (let i = 0; i < times; i++) out += text\n  return out\n}\n",
    "typescript": "function repeatText(text: string, times: number): string) {\n  let out = ''\n  for (let i = 0; i < times; i++) out += text\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "ab",
          3
        ],
        "expected": "ababab"
      },
      {
        "args": [
          "x",
          0
        ],
        "expected": ""
      },
      {
        "args": [
          "no",
          1
        ],
        "expected": "no"
      }
    ]
  },
  {
    "id": "junior-013",
    "level": "junior",
    "title": "Mínimo sin min",
    "prompt": "Devuelve el menor número de t. El array tiene al menos uno. No uses Math.min.\nEjemplo: [3, 1, 4] → 1.",
    "names": [
      "findMin"
    ],
    "starter": "function findMin(t) {\n  \n}\n",
    "explanation": "Igual que el máximo, pero la comparación es menor que. El primer elemento es el candidato inicial, así que un array de negativos también funciona. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y una variable con el menor visto",
    "javascript": "function findMin(t) {\n  let best = t[0]\n  for (let i = 1; i < t.length; i++) {\n    if (t[i] < best) best = t[i]\n  }\n  return best\n}\n",
    "typescript": "function findMin(t: number[]): number) {\n  let best = t[0]\n  for (let i = 1; i < t.length; i++) {\n    if (t[i] < best) best = t[i]\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            1,
            4
          ]
        ],
        "expected": 1
      },
      {
        "args": [
          [
            -2,
            -8,
            -1
          ]
        ],
        "expected": -8
      },
      {
        "args": [
          [
            4
          ]
        ],
        "expected": 4
      }
    ],
    "forbid": [
      {
        "pattern": "Math\\s*\\.\\s*min\\b",
        "message": "No uses Math.min. Recorre el array y quédate con el menor."
      }
    ]
  },
  {
    "id": "junior-014",
    "level": "junior",
    "title": "Media",
    "prompt": "Devuelve la media de t. El array tiene al menos un número.\nEjemplo: [2, 4] → 3. [1, 2] → 1.5.",
    "names": [
      "average"
    ],
    "starter": "function average(t) {\n  \n}\n",
    "explanation": "Se suma el array y se divide entre la cantidad de elementos. En JavaScript la división no es entera: 3/2 es 1.5. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "suma, length y división",
    "javascript": "function average(t) {\n  let total = 0\n  for (const n of t) total += n\n  return total / t.length\n}\n",
    "typescript": "function average(t: number[]): number) {\n  let total = 0\n  for (const n of t) total += n\n  return total / t.length\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            4
          ]
        ],
        "expected": 3
      },
      {
        "args": [
          [
            1,
            2
          ]
        ],
        "expected": 1.5
      },
      {
        "args": [
          [
            5
          ]
        ],
        "expected": 5
      }
    ]
  },
  {
    "id": "junior-015",
    "level": "junior",
    "title": "¿Está el valor?",
    "prompt": "Di si value aparece en t.\nEjemplo: [1, 2, 3], 2 → true.",
    "names": [
      "includesValue"
    ],
    "starter": "function includesValue(t, value) {\n  \n}\n",
    "explanation": "Se recorre el array. En cuanto un elemento es === value se devuelve true. Si se termina el recorrido, false. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y comparación estricta",
    "javascript": "function includesValue(t, value) {\n  for (const n of t) if (n === value) return true\n  return false\n}\n",
    "typescript": "function includesValue(t: number[], value: number): boolean) {\n  for (const n of t) if (n === value) return true\n  return false\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3
          ],
          2
        ],
        "expected": true
      },
      {
        "args": [
          [
            1,
            2,
            3
          ],
          4
        ],
        "expected": false
      },
      {
        "args": [
          [],
          0
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "junior-016",
    "level": "junior",
    "title": "Índice del valor",
    "prompt": "Devuelve el primer índice de value en t, o -1 si no está.\nEjemplo: [4, 5, 4], 4 → 0.",
    "names": [
      "indexOfValue"
    ],
    "starter": "function indexOfValue(t, value) {\n  \n}\n",
    "explanation": "Hace falta el índice, así que el bucle es por posición y no solo por valor. Se devuelve en cuanto hay coincidencia. Si no aparece, el convenio es -1. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle con índice",
    "javascript": "function indexOfValue(t, value) {\n  for (let i = 0; i < t.length; i++) if (t[i] === value) return i\n  return -1\n}\n",
    "typescript": "function indexOfValue(t: number[], value: number): number) {\n  for (let i = 0; i < t.length; i++) if (t[i] === value) return i\n  return -1\n}\n",
    "cases": [
      {
        "args": [
          [
            4,
            5,
            4
          ],
          4
        ],
        "expected": 0
      },
      {
        "args": [
          [
            4,
            5,
            4
          ],
          5
        ],
        "expected": 1
      },
      {
        "args": [
          [
            4,
            5,
            4
          ],
          9
        ],
        "expected": -1
      }
    ]
  },
  {
    "id": "junior-017",
    "level": "junior",
    "title": "Números únicos",
    "prompt": "Devuelve los números de t sin repetir, en el orden de la primera aparición.\nEjemplo: [1, 2, 1, 3, 2] → [1, 2, 3].",
    "names": [
      "uniqueNumbers"
    ],
    "starter": "function uniqueNumbers(t) {\n  \n}\n",
    "explanation": "Se construye otro array. Un número se añade solo si todavía no está. includes busca en lo ya guardado, así que el orden de llegada se mantiene. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "array resultado e includes",
    "javascript": "function uniqueNumbers(t) {\n  const out = []\n  for (const n of t) if (!out.includes(n)) out.push(n)\n  return out\n}\n",
    "typescript": "function uniqueNumbers(t: number[]): number[]) {\n  const out = []\n  for (const n of t) if (!out.includes(n)) out.push(n)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            1,
            3,
            2
          ]
        ],
        "expected": [
          1,
          2,
          3
        ]
      },
      {
        "args": [
          []
        ],
        "expected": []
      },
      {
        "args": [
          [
            5,
            5
          ]
        ],
        "expected": [
          5
        ]
      }
    ]
  },
  {
    "id": "junior-018",
    "level": "junior",
    "title": "¿Es par?",
    "prompt": "Di si n es par.\nEjemplo: 4 → true. 7 → false.",
    "names": [
      "isEven"
    ],
    "starter": "function isEven(n) {\n  \n}\n",
    "explanation": "El resto de dividir entre 2 es 0 cuando el número es par. Sirve también para el 0. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "operador resto %",
    "javascript": "function isEven(n) {\n  return n % 2 === 0\n}\n",
    "typescript": "function isEven(n: number): boolean) {\n  return n % 2 === 0\n}\n",
    "cases": [
      {
        "args": [
          4
        ],
        "expected": true
      },
      {
        "args": [
          7
        ],
        "expected": false
      },
      {
        "args": [
          0
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "junior-019",
    "level": "junior",
    "title": "Valor absoluto",
    "prompt": "Devuelve el valor absoluto de n sin Math.abs.\nEjemplo: -4 → 4. 3 → 3.",
    "names": [
      "absoluteValue"
    ],
    "starter": "function absoluteValue(n) {\n  \n}\n",
    "explanation": "Si n es negativo, se devuelve su opuesto. Si no, se devuelve tal cual. El cero se queda en cero. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un if que cambia el signo",
    "javascript": "function absoluteValue(n) {\n  return n < 0 ? -n : n\n}\n",
    "typescript": "function absoluteValue(n: number): number) {\n  return n < 0 ? -n : n\n}\n",
    "cases": [
      {
        "args": [
          -4
        ],
        "expected": 4
      },
      {
        "args": [
          3
        ],
        "expected": 3
      },
      {
        "args": [
          0
        ],
        "expected": 0
      }
    ],
    "forbid": [
      {
        "pattern": "Math\\s*\\.\\s*abs\\b",
        "message": "No uses Math.abs. Compara los dos números."
      }
    ]
  },
  {
    "id": "junior-020",
    "level": "junior",
    "title": "Acotar",
    "prompt": "Devuelve n limitado al intervalo [low, high]. low es menor o igual que high.\nEjemplo: 5, 0, 3 → 3. -1, 0, 3 → 0.",
    "names": [
      "clamp"
    ],
    "starter": "function clamp(n, low, high) {\n  \n}\n",
    "explanation": "Si n se pasa por debajo, el resultado es low. Si se pasa por arriba, high. En medio se queda n. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos comparaciones",
    "javascript": "function clamp(n, low, high) {\n  if (n < low) return low\n  if (n > high) return high\n  return n\n}\n",
    "typescript": "function clamp(n: number, low: number, high: number): number) {\n  if (n < low) return low\n  if (n > high) return high\n  return n\n}\n",
    "cases": [
      {
        "args": [
          5,
          0,
          3
        ],
        "expected": 3
      },
      {
        "args": [
          -1,
          0,
          3
        ],
        "expected": 0
      },
      {
        "args": [
          2,
          0,
          3
        ],
        "expected": 2
      }
    ]
  },
  {
    "id": "junior-021",
    "level": "junior",
    "title": "Signo",
    "prompt": "Devuelve 1 si n es positivo, -1 si es negativo y 0 si es cero.\nEjemplo: -8 → -1.",
    "names": [
      "signOf"
    ],
    "starter": "function signOf(n) {\n  \n}\n",
    "explanation": "Son tres casos excluyentes. El orden da igual mientras el cero tenga su propia rama y no se cuele en los positivos. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "if / else",
    "javascript": "function signOf(n) {\n  if (n > 0) return 1\n  if (n < 0) return -1\n  return 0\n}\n",
    "typescript": "function signOf(n: number): number) {\n  if (n > 0) return 1\n  if (n < 0) return -1\n  return 0\n}\n",
    "cases": [
      {
        "args": [
          -8
        ],
        "expected": -1
      },
      {
        "args": [
          4
        ],
        "expected": 1
      },
      {
        "args": [
          0
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "junior-022",
    "level": "junior",
    "title": "Último elemento",
    "prompt": "Devuelve el último número de t, o null si está vacío.\nEjemplo: [1, 2, 3] → 3.",
    "names": [
      "lastItem"
    ],
    "starter": "function lastItem(t) {\n  \n}\n",
    "explanation": "El último índice válido es length - 1. Si length es 0, no hay ese índice y se devuelve null para no leer fuera del array. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "length y el índice length - 1",
    "javascript": "function lastItem(t) {\n  if (t.length === 0) return null\n  return t[t.length - 1]\n}\n",
    "typescript": "function lastItem(t: number[]): number | null) {\n  if (t.length === 0) return null\n  return t[t.length - 1]\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "args": [
          []
        ],
        "expected": null
      },
      {
        "args": [
          [
            8
          ]
        ],
        "expected": 8
      }
    ]
  },
  {
    "id": "junior-023",
    "level": "junior",
    "title": "Primer elemento",
    "prompt": "Devuelve el primer texto de t, o null si está vacío.\nEjemplo: [\"a\", \"b\"] → \"a\".",
    "names": [
      "firstItem"
    ],
    "starter": "function firstItem(t) {\n  \n}\n",
    "explanation": "El primer elemento está en la posición 0, pero solo si el array tiene algo. El vacío no tiene posición 0. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "comprobar length y el índice 0",
    "javascript": "function firstItem(t) {\n  if (t.length === 0) return null\n  return t[0]\n}\n",
    "typescript": "function firstItem(t: string[]): string | null) {\n  if (t.length === 0) return null\n  return t[0]\n}\n",
    "cases": [
      {
        "args": [
          [
            "a",
            "b"
          ]
        ],
        "expected": "a"
      },
      {
        "args": [
          []
        ],
        "expected": null
      }
    ]
  },
  {
    "id": "junior-024",
    "level": "junior",
    "title": "Suma de cifras",
    "prompt": "Suma las cifras de n. n es un entero mayor o igual que 0.\nEjemplo: 405 → 9.",
    "names": [
      "sumDigits"
    ],
    "starter": "function sumDigits(n) {\n  \n}\n",
    "explanation": "El resto entre 10 es la última cifra. Math.floor(n / 10) quita esa cifra. Se repite hasta que el número se queda en 0. El propio 0 suma 0. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "resto entre 10 y división entera",
    "javascript": "function sumDigits(n) {\n  let total = 0\n  let rest = n\n  while (rest > 0) {\n    total += rest % 10\n    rest = Math.floor(rest / 10)\n  }\n  return total\n}\n",
    "typescript": "function sumDigits(n: number): number) {\n  let total = 0\n  let rest = n\n  while (rest > 0) {\n    total += rest % 10\n    rest = Math.floor(rest / 10)\n  }\n  return total\n}\n",
    "cases": [
      {
        "args": [
          405
        ],
        "expected": 9
      },
      {
        "args": [
          0
        ],
        "expected": 0
      },
      {
        "args": [
          19
        ],
        "expected": 10
      }
    ]
  },
  {
    "id": "junior-025",
    "level": "junior",
    "title": "¿Es primo?",
    "prompt": "Di si n es primo. Los menores que 2 no lo son.\nEjemplo: 17 → true. 9 → false. 1 → false.",
    "names": [
      "isPrime"
    ],
    "starter": "function isPrime(n) {\n  \n}\n",
    "explanation": "Si n es menor que 2, no es primo. Si algún entero desde 2 hasta la raíz divide a n, tampoco. No hace falta probar más allá de la raíz: un factor mayor tendría pareja menor. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle hasta la raíz y el resto",
    "javascript": "function isPrime(n) {\n  if (n < 2) return false\n  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false\n  return true\n}\n",
    "typescript": "function isPrime(n: number): boolean) {\n  if (n < 2) return false\n  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false\n  return true\n}\n",
    "cases": [
      {
        "args": [
          17
        ],
        "expected": true
      },
      {
        "args": [
          9
        ],
        "expected": false
      },
      {
        "args": [
          1
        ],
        "expected": false
      },
      {
        "args": [
          2
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "junior-026",
    "level": "junior",
    "title": "Del 1 a n",
    "prompt": "Devuelve un array con los enteros del 1 a n, inclusive. Si n es menor que 1, el array va vacío.\nEjemplo: 4 → [1, 2, 3, 4].",
    "names": [
      "rangeTo"
    ],
    "starter": "function rangeTo(n) {\n  \n}\n",
    "explanation": "El contador va de 1 a n y cada valor se mete en el array. Si n es 0, la condición i <= n nunca se cumple. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle for y push",
    "javascript": "function rangeTo(n) {\n  const out = []\n  for (let i = 1; i <= n; i++) out.push(i)\n  return out\n}\n",
    "typescript": "function rangeTo(n: number): number[]) {\n  const out = []\n  for (let i = 1; i <= n; i++) out.push(i)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          4
        ],
        "expected": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "args": [
          0
        ],
        "expected": []
      },
      {
        "args": [
          1
        ],
        "expected": [
          1
        ]
      }
    ]
  },
  {
    "id": "junior-027",
    "level": "junior",
    "title": "Contar un carácter",
    "prompt": "Cuenta cuántas veces aparece ch en text. ch es un solo carácter.\nEjemplo: \"banana\", \"a\" → 3.",
    "names": [
      "countChar"
    ],
    "starter": "function countChar(text, ch) {\n  \n}\n",
    "explanation": "Se mira cada carácter del texto. Cada coincidencia exacta suma uno. Mayúsculas y minúsculas son distintas. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle for...of y comparación",
    "javascript": "function countChar(text, ch) {\n  let total = 0\n  for (const item of text) if (item === ch) total++\n  return total\n}\n",
    "typescript": "function countChar(text: string, ch: string): number) {\n  let total = 0\n  for (const item of text) if (item === ch) total++\n  return total\n}\n",
    "cases": [
      {
        "args": [
          "banana",
          "a"
        ],
        "expected": 3
      },
      {
        "args": [
          "banana",
          "n"
        ],
        "expected": 2
      },
      {
        "args": [
          "banana",
          "z"
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "junior-028",
    "level": "junior",
    "title": "Cortar texto",
    "prompt": "Devuelve como mucho los primeros max caracteres de text. Si ya es más corto, se deja igual.\nEjemplo: \"hola mundo\", 4 → \"hola\".",
    "names": [
      "truncate"
    ],
    "starter": "function truncate(text, max) {\n  \n}\n",
    "explanation": "slice(0, max) corta sin pasarse del final si el texto es más corto, así que el if es opcional. Aquí se deja explícito: si cabe entero, se devuelve el original. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "length y slice",
    "javascript": "function truncate(text, max) {\n  if (text.length <= max) return text\n  return text.slice(0, max)\n}\n",
    "typescript": "function truncate(text: string, max: number): string) {\n  if (text.length <= max) return text\n  return text.slice(0, max)\n}\n",
    "cases": [
      {
        "args": [
          "hola mundo",
          4
        ],
        "expected": "hola"
      },
      {
        "args": [
          "ok",
          10
        ],
        "expected": "ok"
      },
      {
        "args": [
          "abc",
          0
        ],
        "expected": ""
      }
    ]
  },
  {
    "id": "junior-029",
    "level": "junior",
    "title": "Empieza por",
    "prompt": "Di si text empieza por prefix, sin usar startsWith.\nEjemplo: \"hola\", \"ho\" → true.",
    "names": [
      "startsWithText"
    ],
    "starter": "function startsWithText(text, prefix) {\n  \n}\n",
    "explanation": "Se comparan los primeros prefix.length caracteres con el prefijo. Si el prefijo es más largo que el texto, slice devuelve el texto entero y la comparación falla, que es lo correcto. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "slice de la misma longitud que el prefijo",
    "javascript": "function startsWithText(text, prefix) {\n  return text.slice(0, prefix.length) === prefix\n}\n",
    "typescript": "function startsWithText(text: string, prefix: string): boolean) {\n  return text.slice(0, prefix.length) === prefix\n}\n",
    "cases": [
      {
        "args": [
          "hola",
          "ho"
        ],
        "expected": true
      },
      {
        "args": [
          "hola",
          "la"
        ],
        "expected": false
      },
      {
        "args": [
          "hola",
          ""
        ],
        "expected": true
      },
      {
        "args": [
          "hi",
          "hola"
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "junior-030",
    "level": "junior",
    "title": "Termina por",
    "prompt": "Di si text termina por suffix, sin usar endsWith.\nEjemplo: \"hola\", \"la\" → true.",
    "names": [
      "endsWithText"
    ],
    "starter": "function endsWithText(text, suffix) {\n  \n}\n",
    "explanation": "Si el sufijo es más largo que el texto, no puede terminar así. Si no, se compara el tramo final de esa longitud. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "slice desde el final",
    "javascript": "function endsWithText(text, suffix) {\n  if (suffix.length > text.length) return false\n  return text.slice(text.length - suffix.length) === suffix\n}\n",
    "typescript": "function endsWithText(text: string, suffix: string): boolean) {\n  if (suffix.length > text.length) return false\n  return text.slice(text.length - suffix.length) === suffix\n}\n",
    "cases": [
      {
        "args": [
          "hola",
          "la"
        ],
        "expected": true
      },
      {
        "args": [
          "hola",
          "ho"
        ],
        "expected": false
      },
      {
        "args": [
          "hola",
          ""
        ],
        "expected": true
      },
      {
        "args": [
          "a",
          "abc"
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "junior-031",
    "level": "junior",
    "title": "Gritar",
    "prompt": "Devuelve text en mayúsculas.\nEjemplo: \"hola\" → \"HOLA\".",
    "names": [
      "shout"
    ],
    "starter": "function shout(text) {\n  \n}\n",
    "explanation": "toUpperCase recorre el string y pasa cada letra a mayúscula. Los signos se quedan igual. Es el método del propio string, no hace falta un bucle a mano. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "toUpperCase",
    "javascript": "function shout(text) {\n  return text.toUpperCase()\n}\n",
    "typescript": "function shout(text: string): string) {\n  return text.toUpperCase()\n}\n",
    "cases": [
      {
        "args": [
          "hola"
        ],
        "expected": "HOLA"
      },
      {
        "args": [
          "Ya!"
        ],
        "expected": "YA!"
      }
    ]
  },
  {
    "id": "junior-032",
    "level": "junior",
    "title": "Solo dígitos",
    "prompt": "Di si text no está vacío y todos sus caracteres son dígitos del 0 al 9.\nEjemplo: \"2026\" → true. \"12a\" → false. \"\" → false.",
    "names": [
      "onlyDigits"
    ],
    "starter": "function onlyDigits(text) {\n  \n}\n",
    "explanation": "El vacío se rechaza porque no hay ningún dígito. En cada carácter se comprueba que esté entre \"0\" y \"9\" en el orden del código Unicode, que en los dígitos es el orden numérico. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y comparación con los caracteres 0 y 9",
    "javascript": "function onlyDigits(text) {\n  if (!text) return false\n  for (const ch of text) if (ch < '0' || ch > '9') return false\n  return true\n}\n",
    "typescript": "function onlyDigits(text: string): boolean) {\n  if (!text) return false\n  for (const ch of text) if (ch < '0' || ch > '9') return false\n  return true\n}\n",
    "cases": [
      {
        "args": [
          "2026"
        ],
        "expected": true
      },
      {
        "args": [
          "12a"
        ],
        "expected": false
      },
      {
        "args": [
          ""
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "junior-033",
    "level": "junior",
    "title": "Contar palabras",
    "prompt": "Cuenta las palabras de text. Las separan uno o más espacios. Un texto en blanco tiene 0.\nEjemplo: \"hola  mundo\" → 2.",
    "names": [
      "wordCount"
    ],
    "starter": "function wordCount(text) {\n  \n}\n",
    "explanation": "trim quita los espacios de los extremos. split(/\\s+/) parte por cualquier bloque de espacio. Si después de trim no queda nada, no hay palabras: split de un string vacío daría un array engañoso, por eso se corta antes. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "trim, split con una expresión regular y length",
    "javascript": "function wordCount(text) {\n  if (!text.trim()) return 0\n  return text.trim().split(/\\s+/).length\n}\n",
    "typescript": "function wordCount(text: string): number) {\n  if (!text.trim()) return 0\n  return text.trim().split(/\\s+/).length\n}\n",
    "cases": [
      {
        "args": [
          "hola  mundo"
        ],
        "expected": 2
      },
      {
        "args": [
          "   "
        ],
        "expected": 0
      },
      {
        "args": [
          "una"
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "junior-034",
    "level": "junior",
    "title": "Palabra más larga",
    "prompt": "Devuelve la palabra más larga de text. Si empatan, la primera. Si no hay palabras, \"\".\nEjemplo: \"un día largo\" → \"largo\".",
    "names": [
      "longestWord"
    ],
    "starter": "function longestWord(text) {\n  \n}\n",
    "explanation": "Se parten las palabras y se guarda la más larga vista. La comparación es estrictamente mayor, así que un empate no sustituye a la que ya estaba. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "split, un bucle y la longitud",
    "javascript": "function longestWord(text) {\n  const words = text.trim() ? text.trim().split(/\\s+/) : []\n  let best = ''\n  for (const word of words) if (word.length > best.length) best = word\n  return best\n}\n",
    "typescript": "function longestWord(text: string): string) {\n  const words = text.trim() ? text.trim().split(/\\s+/) : []\n  let best = ''\n  for (const word of words) if (word.length > best.length) best = word\n  return best\n}\n",
    "cases": [
      {
        "args": [
          "un día largo"
        ],
        "expected": "largo"
      },
      {
        "args": [
          "aa bb"
        ],
        "expected": "aa"
      },
      {
        "args": [
          "   "
        ],
        "expected": ""
      }
    ]
  },
  {
    "id": "junior-035",
    "level": "junior",
    "title": "Doblar",
    "prompt": "Devuelve un array nuevo con cada número de t multiplicado por 2.\nEjemplo: [1, 2, 3] → [2, 4, 6].",
    "names": [
      "doubleAll"
    ],
    "starter": "function doubleAll(t) {\n  \n}\n",
    "explanation": "No se modifica t. Se crea otro array y se mete el doble de cada elemento, en el mismo orden. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y push sobre un array nuevo",
    "javascript": "function doubleAll(t) {\n  const out = []\n  for (const n of t) out.push(n * 2)\n  return out\n}\n",
    "typescript": "function doubleAll(t: number[]): number[]) {\n  const out = []\n  for (const n of t) out.push(n * 2)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          2,
          4,
          6
        ]
      },
      {
        "args": [
          []
        ],
        "expected": []
      },
      {
        "args": [
          [
            -2
          ]
        ],
        "expected": [
          -4
        ]
      }
    ]
  },
  {
    "id": "junior-036",
    "level": "junior",
    "title": "Solo positivos",
    "prompt": "Devuelve los números de t que son mayores que 0, en el mismo orden.\nEjemplo: [-1, 2, 0, 3] → [2, 3].",
    "names": [
      "onlyPositives"
    ],
    "starter": "function onlyPositives(t) {\n  \n}\n",
    "explanation": "El cero y los negativos se descartan. Los positivos se copian a un array nuevo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "filtro con un bucle",
    "javascript": "function onlyPositives(t) {\n  const out = []\n  for (const n of t) if (n > 0) out.push(n)\n  return out\n}\n",
    "typescript": "function onlyPositives(t: number[]): number[]) {\n  const out = []\n  for (const n of t) if (n > 0) out.push(n)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            -1,
            2,
            0,
            3
          ]
        ],
        "expected": [
          2,
          3
        ]
      },
      {
        "args": [
          [
            -5,
            0
          ]
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "junior-037",
    "level": "junior",
    "title": "Suma de positivos",
    "prompt": "Suma solo los números de t que son mayores que 0.\nEjemplo: [-2, 4, 1] → 5.",
    "names": [
      "sumPositives"
    ],
    "starter": "function sumPositives(t) {\n  \n}\n",
    "explanation": "Es la suma de siempre, con un if que ignora lo que no es positivo. Si no hay positivos, el acumulador se queda en 0. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle, if y acumulador",
    "javascript": "function sumPositives(t) {\n  let total = 0\n  for (const n of t) if (n > 0) total += n\n  return total\n}\n",
    "typescript": "function sumPositives(t: number[]): number) {\n  let total = 0\n  for (const n of t) if (n > 0) total += n\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            -2,
            4,
            1
          ]
        ],
        "expected": 5
      },
      {
        "args": [
          [
            -1,
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "junior-038",
    "level": "junior",
    "title": "Producto del array",
    "prompt": "Multiplica todos los números de t. El array vacío da 1.\nEjemplo: [2, 3, 4] → 24.",
    "names": [
      "productAll"
    ],
    "starter": "function productAll(t) {\n  \n}\n",
    "explanation": "El neutro de la multiplicación es 1, no 0. Si se empezara en 0, el producto siempre sería 0. Cada elemento multiplica al acumulador. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "acumulador que empieza en 1",
    "javascript": "function productAll(t) {\n  let total = 1\n  for (const n of t) total *= n\n  return total\n}\n",
    "typescript": "function productAll(t: number[]): number) {\n  let total = 1\n  for (const n of t) total *= n\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            3,
            4
          ]
        ],
        "expected": 24
      },
      {
        "args": [
          []
        ],
        "expected": 1
      },
      {
        "args": [
          [
            -2,
            5
          ]
        ],
        "expected": -10
      }
    ]
  },
  {
    "id": "junior-039",
    "level": "junior",
    "title": "¿Hay negativo?",
    "prompt": "Di si algún número de t es menor que 0.\nEjemplo: [1, -2, 3] → true.",
    "names": [
      "hasNegative"
    ],
    "starter": "function hasNegative(t) {\n  \n}\n",
    "explanation": "No hace falta recorrer todo si ya apareció un negativo. En cuanto se ve uno, se devuelve true. Si se acaba el array, false. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle con return anticipado",
    "javascript": "function hasNegative(t) {\n  for (const n of t) if (n < 0) return true\n  return false\n}\n",
    "typescript": "function hasNegative(t: number[]): boolean) {\n  for (const n of t) if (n < 0) return true\n  return false\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            -2,
            3
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            1,
            0,
            2
          ]
        ],
        "expected": false
      },
      {
        "args": [
          []
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "junior-040",
    "level": "junior",
    "title": "Todos positivos",
    "prompt": "Di si todos los números de t son mayores que 0. El array vacío devuelve true.\nEjemplo: [1, 2] → true. [1, 0] → false.",
    "names": [
      "allPositive"
    ],
    "starter": "function allPositive(t) {\n  \n}\n",
    "explanation": "El cero no es positivo. Si aparece un número que no es mayor que 0, la respuesta es false. Si no aparece ninguno, es true. En el array vacío no hay ningún contraejemplo, así que es true. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle que falla en cuanto encuentra uno que no cumple",
    "javascript": "function allPositive(t) {\n  for (const n of t) if (n <= 0) return false\n  return true\n}\n",
    "typescript": "function allPositive(t: number[]): boolean) {\n  for (const n of t) if (n <= 0) return false\n  return true\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            1,
            0
          ]
        ],
        "expected": false
      },
      {
        "args": [
          []
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "junior-041",
    "level": "junior",
    "title": "Mayores que",
    "prompt": "Cuenta cuántos números de t son estrictamente mayores que min.\nEjemplo: [1, 5, 3], 3 → 1.",
    "names": [
      "countGreaterThan"
    ],
    "starter": "function countGreaterThan(t, min) {\n  \n}\n",
    "explanation": "La comparación es estricta: un número igual a min no cuenta. El resto del patrón es un contador. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y comparación",
    "javascript": "function countGreaterThan(t, min) {\n  let total = 0\n  for (const n of t) if (n > min) total++\n  return total\n}\n",
    "typescript": "function countGreaterThan(t: number[], min: number): number) {\n  let total = 0\n  for (const n of t) if (n > min) total++\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            5,
            3
          ],
          3
        ],
        "expected": 1
      },
      {
        "args": [
          [
            1,
            5,
            3
          ],
          0
        ],
        "expected": 3
      },
      {
        "args": [
          [
            1,
            5,
            3
          ],
          9
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "junior-042",
    "level": "junior",
    "title": "Elemento n",
    "prompt": "Devuelve el elemento en la posición n, contando desde 1. Si n no existe, null.\nEjemplo: [\"a\", \"b\", \"c\"], 2 → \"b\".",
    "names": [
      "nthItem"
    ],
    "starter": "function nthItem(t, n) {\n  \n}\n",
    "explanation": "Los arrays empiezan en 0, pero el enunciado cuenta desde 1. El índice es n - 1, y hay que rechazar n menor que 1 o mayor que la longitud. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "traducir una posición humana al índice del array",
    "javascript": "function nthItem(t, n) {\n  if (n < 1 || n > t.length) return null\n  return t[n - 1]\n}\n",
    "typescript": "function nthItem(t: string[], n: number): string | null) {\n  if (n < 1 || n > t.length) return null\n  return t[n - 1]\n}\n",
    "cases": [
      {
        "args": [
          [
            "a",
            "b",
            "c"
          ],
          2
        ],
        "expected": "b"
      },
      {
        "args": [
          [
            "a",
            "b",
            "c"
          ],
          4
        ],
        "expected": null
      },
      {
        "args": [
          [
            "a",
            "b",
            "c"
          ],
          0
        ],
        "expected": null
      }
    ]
  },
  {
    "id": "junior-043",
    "level": "junior",
    "title": "Quitar en un índice",
    "prompt": "Devuelve un array nuevo sin el elemento de index. index es válido.\nEjemplo: [1, 2, 3], 1 → [1, 3].",
    "names": [
      "removeAt"
    ],
    "starter": "function removeAt(t, index) {\n  \n}\n",
    "explanation": "slice(0, index) copia lo de antes. slice(index + 1) copia lo de después. concat los junta. t no se modifica porque slice copia. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "slice y concat",
    "javascript": "function removeAt(t, index) {\n  return t.slice(0, index).concat(t.slice(index + 1))\n}\n",
    "typescript": "function removeAt(t: number[], index: number): number[]) {\n  return t.slice(0, index).concat(t.slice(index + 1))\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3
          ],
          1
        ],
        "expected": [
          1,
          3
        ]
      },
      {
        "args": [
          [
            1,
            2,
            3
          ],
          0
        ],
        "expected": [
          2,
          3
        ]
      },
      {
        "args": [
          [
            1,
            2,
            3
          ],
          2
        ],
        "expected": [
          1,
          2
        ]
      }
    ]
  },
  {
    "id": "junior-044",
    "level": "junior",
    "title": "Insertar en un índice",
    "prompt": "Devuelve un array nuevo con value insertado en index. El elemento que estaba ahí se desplaza a la derecha.\nEjemplo: [1, 2, 4], 2, 3 → [1, 2, 3, 4].",
    "names": [
      "insertAt"
    ],
    "starter": "function insertAt(t, index, value) {\n  \n}\n",
    "explanation": "splice modifica el array sobre el que se llama. Por eso primero se copia con slice. En la copia, splice(index, 0, value) inserta sin borrar. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "slice para copiar y splice para insertar en la copia",
    "javascript": "function insertAt(t, index, value) {\n  const out = t.slice()\n  out.splice(index, 0, value)\n  return out\n}\n",
    "typescript": "function insertAt(t: number[], index: number, value: number): number[]) {\n  const out = t.slice()\n  out.splice(index, 0, value)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            4
          ],
          2,
          3
        ],
        "expected": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "args": [
          [
            1,
            2
          ],
          0,
          9
        ],
        "expected": [
          9,
          1,
          2
        ]
      }
    ]
  },
  {
    "id": "junior-045",
    "level": "junior",
    "title": "Juntar arrays",
    "prompt": "Devuelve un array con los elementos de a seguidos de los de b.\nEjemplo: [1, 2], [3] → [1, 2, 3].",
    "names": [
      "joinArrays"
    ],
    "starter": "function joinArrays(a, b) {\n  \n}\n",
    "explanation": "concat devuelve un array nuevo. No modifica a ni b. El orden es el de a y después el de b. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "concat",
    "javascript": "function joinArrays(a, b) {\n  return a.concat(b)\n}\n",
    "typescript": "function joinArrays(a: number[], b: number[]): number[]) {\n  return a.concat(b)\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2
          ],
          [
            3
          ]
        ],
        "expected": [
          1,
          2,
          3
        ]
      },
      {
        "args": [
          [],
          [
            4
          ]
        ],
        "expected": [
          4
        ]
      }
    ]
  },
  {
    "id": "junior-046",
    "level": "junior",
    "title": "Texto vacío",
    "prompt": "Di si text es exactamente \"\". Un espacio no cuenta como vacío.\nEjemplo: \"\" → true. \" \" → false.",
    "names": [
      "isEmptyText"
    ],
    "starter": "function isEmptyText(text) {\n  \n}\n",
    "explanation": "=== compara el valor y el tipo. \"\" es vacío. \" \" tiene un carácter, así que no lo es. trim sería otra pregunta: aquí no se recortan espacios. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "comparación estricta",
    "javascript": "function isEmptyText(text) {\n  return text === ''\n}\n",
    "typescript": "function isEmptyText(text: string): boolean) {\n  return text === ''\n}\n",
    "cases": [
      {
        "args": [
          ""
        ],
        "expected": true
      },
      {
        "args": [
          " "
        ],
        "expected": false
      },
      {
        "args": [
          "a"
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "junior-047",
    "level": "junior",
    "title": "Rellenar por la izquierda",
    "prompt": "Rellena text por la izquierda con el carácter ch hasta llegar a length. Si ya es más largo, se deja igual. ch es un carácter.\nEjemplo: \"7\", 3, \"0\" → \"007\".",
    "names": [
      "padLeft"
    ],
    "starter": "function padLeft(text, length, ch) {\n  \n}\n",
    "explanation": "Mientras el resultado sea más corto que length, se pone ch delante. Añadir por delante, y no por detrás, es lo que hace que los ceros queden a la izquierda. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle while y concatenación por delante",
    "javascript": "function padLeft(text, length, ch) {\n  let out = text\n  while (out.length < length) out = ch + out\n  return out\n}\n",
    "typescript": "function padLeft(text: string, length: number, ch: string): string) {\n  let out = text\n  while (out.length < length) out = ch + out\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "7",
          3,
          "0"
        ],
        "expected": "007"
      },
      {
        "args": [
          "1234",
          2,
          "0"
        ],
        "expected": "1234"
      },
      {
        "args": [
          "",
          2,
          "x"
        ],
        "expected": "xx"
      }
    ]
  },
  {
    "id": "junior-048",
    "level": "junior",
    "title": "Invertir palabras",
    "prompt": "Invierte el orden de las palabras. Hay un solo espacio entre ellas y no hay espacios en los extremos.\nEjemplo: \"hola mundo cruel\" → \"cruel mundo hola\".",
    "names": [
      "reverseWords"
    ],
    "starter": "function reverseWords(text) {\n  \n}\n",
    "explanation": "split(\" \") parte por cada espacio y deja las palabras en un array. reverse cambia ese orden. join(\" \") las vuelve a pegar con un espacio. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "split, reverse y join",
    "javascript": "function reverseWords(text) {\n  return text.split(' ').reverse().join(' ')\n}\n",
    "typescript": "function reverseWords(text: string): string) {\n  return text.split(' ').reverse().join(' ')\n}\n",
    "cases": [
      {
        "args": [
          "hola mundo cruel"
        ],
        "expected": "cruel mundo hola"
      },
      {
        "args": [
          "sola"
        ],
        "expected": "sola"
      }
    ]
  },
  {
    "id": "junior-049",
    "level": "junior",
    "title": "Iniciales",
    "prompt": "Devuelve las iniciales en mayúscula, sin separadores. Las palabras van separadas por un espacio.\nEjemplo: \"Ada Lovelace\" → \"AL\".",
    "names": [
      "initials"
    ],
    "starter": "function initials(text) {\n  \n}\n",
    "explanation": "Cada palabra aporta su carácter 0, pasado a mayúscula. Se concatenan sin espacios. Una palabra vacía, si la hubiera, no aporta inicial. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "split y la primera letra de cada palabra",
    "javascript": "function initials(text) {\n  let out = ''\n  for (const word of text.split(' ')) {\n    if (word) out += word[0].toUpperCase()\n  }\n  return out\n}\n",
    "typescript": "function initials(text: string): string) {\n  let out = ''\n  for (const word of text.split(' ')) {\n    if (word) out += word[0].toUpperCase()\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "Ada Lovelace"
        ],
        "expected": "AL"
      },
      {
        "args": [
          "un"
        ],
        "expected": "U"
      }
    ]
  },
  {
    "id": "junior-050",
    "level": "junior",
    "title": "Celsius a Fahrenheit",
    "prompt": "Pasa grados Celsius a Fahrenheit: c * 9 / 5 + 32.\nEjemplo: 0 → 32. 100 → 212.",
    "names": [
      "celsiusToFahrenheit"
    ],
    "starter": "function celsiusToFahrenheit(c) {\n  \n}\n",
    "explanation": "No hay bucle. Es la conversión directa. El orden de las operaciones importa: primero el producto y la división, después se suma 32. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una fórmula aritmética",
    "javascript": "function celsiusToFahrenheit(c) {\n  return c * 9 / 5 + 32\n}\n",
    "typescript": "function celsiusToFahrenheit(c: number): number) {\n  return c * 9 / 5 + 32\n}\n",
    "cases": [
      {
        "args": [
          0
        ],
        "expected": 32
      },
      {
        "args": [
          100
        ],
        "expected": 212
      },
      {
        "args": [
          -40
        ],
        "expected": -40
      }
    ]
  },
  {
    "id": "junior-051",
    "level": "junior",
    "title": "Área del rectángulo",
    "prompt": "Devuelve el área de un rectángulo. width y height son positivos.\nEjemplo: 3, 4 → 12.",
    "names": [
      "rectangleArea"
    ],
    "starter": "function rectangleArea(width, height) {\n  \n}\n",
    "explanation": "El área es base por altura. No hace falta Math ni un bucle. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "multiplicación",
    "javascript": "function rectangleArea(width, height) {\n  return width * height\n}\n",
    "typescript": "function rectangleArea(width: number, height: number): number) {\n  return width * height\n}\n",
    "cases": [
      {
        "args": [
          3,
          4
        ],
        "expected": 12
      },
      {
        "args": [
          1,
          8
        ],
        "expected": 8
      }
    ]
  },
  {
    "id": "junior-052",
    "level": "junior",
    "title": "Año bisiesto",
    "prompt": "Di si year es bisiesto. Lo es si es divisible entre 4, salvo los divisibles entre 100, que no lo son, salvo los divisibles entre 400, que sí.\nEjemplo: 2024 → true. 1900 → false. 2000 → true.",
    "names": [
      "isLeapYear"
    ],
    "starter": "function isLeapYear(year) {\n  \n}\n",
    "explanation": "La excepción de los siglos se mira antes que la regla general de cada 4 años. Si es divisible entre 400, es bisiesto. Si lo es entre 100, no. Si lo es entre 4, sí. Si no, no. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "resto y el orden de las reglas",
    "javascript": "function isLeapYear(year) {\n  if (year % 400 === 0) return true\n  if (year % 100 === 0) return false\n  return year % 4 === 0\n}\n",
    "typescript": "function isLeapYear(year: number): boolean) {\n  if (year % 400 === 0) return true\n  if (year % 100 === 0) return false\n  return year % 4 === 0\n}\n",
    "cases": [
      {
        "args": [
          2024
        ],
        "expected": true
      },
      {
        "args": [
          1900
        ],
        "expected": false
      },
      {
        "args": [
          2000
        ],
        "expected": true
      },
      {
        "args": [
          2023
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "junior-053",
    "level": "junior",
    "title": "Nota en letra",
    "prompt": "Pasa una nota de 0 a 100 a letra. 90 o más: \"A\". 80: \"B\". 70: \"C\". 60: \"D\". Por debajo: \"F\".\nEjemplo: 90 → \"A\". 89 → \"B\". 59 → \"F\".",
    "names": [
      "letterGrade"
    ],
    "starter": "function letterGrade(score) {\n  \n}\n",
    "explanation": "El orden importa. Si se mirara primero el 60, un 95 también pasaría ese if. Se pregunta de la nota más alta a la más baja y la última rama es el suspenso. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "if en cascada, de mayor a menor",
    "javascript": "function letterGrade(score) {\n  if (score >= 90) return 'A'\n  if (score >= 80) return 'B'\n  if (score >= 70) return 'C'\n  if (score >= 60) return 'D'\n  return 'F'\n}\n",
    "typescript": "function letterGrade(score: number): string) {\n  if (score >= 90) return 'A'\n  if (score >= 80) return 'B'\n  if (score >= 70) return 'C'\n  if (score >= 60) return 'D'\n  return 'F'\n}\n",
    "cases": [
      {
        "args": [
          90
        ],
        "expected": "A"
      },
      {
        "args": [
          89
        ],
        "expected": "B"
      },
      {
        "args": [
          70
        ],
        "expected": "C"
      },
      {
        "args": [
          60
        ],
        "expected": "D"
      },
      {
        "args": [
          59
        ],
        "expected": "F"
      }
    ]
  },
  {
    "id": "junior-054",
    "level": "junior",
    "title": "Mayor de dos",
    "prompt": "Devuelve el mayor de a y b. Si son iguales, da igual cuál. No uses Math.max.\nEjemplo: 3, 8 → 8.",
    "names": [
      "maxOfTwo"
    ],
    "starter": "function maxOfTwo(a, b) {\n  \n}\n",
    "explanation": "Con dos números basta un if. No hace falta un array ni un bucle. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una comparación",
    "javascript": "function maxOfTwo(a, b) {\n  return a > b ? a : b\n}\n",
    "typescript": "function maxOfTwo(a: number, b: number): number) {\n  return a > b ? a : b\n}\n",
    "cases": [
      {
        "args": [
          3,
          8
        ],
        "expected": 8
      },
      {
        "args": [
          8,
          3
        ],
        "expected": 8
      },
      {
        "args": [
          4,
          4
        ],
        "expected": 4
      }
    ],
    "forbid": [
      {
        "pattern": "Math\\s*\\.\\s*max\\b",
        "message": "No uses Math.max. Recorre el array y quédate con el mayor."
      }
    ]
  },
  {
    "id": "junior-055",
    "level": "junior",
    "title": "Menor de tres",
    "prompt": "Devuelve el menor de a, b y c. No uses Math.min ni Math.max.\nEjemplo: 3, 1, 2 → 1.",
    "names": [
      "minOfThree"
    ],
    "starter": "function minOfThree(a, b, c) {\n  \n}\n",
    "explanation": "Se empieza creyendo que a es el menor. Si b es más pequeño, pasa a ser el candidato. Lo mismo con c. Es el mismo patrón que findMin, con tres valores sueltos. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una variable candidato y dos comparaciones",
    "javascript": "function minOfThree(a, b, c) {\n  let best = a\n  if (b < best) best = b\n  if (c < best) best = c\n  return best\n}\n",
    "typescript": "function minOfThree(a: number, b: number, c: number): number) {\n  let best = a\n  if (b < best) best = b\n  if (c < best) best = c\n  return best\n}\n",
    "cases": [
      {
        "args": [
          3,
          1,
          2
        ],
        "expected": 1
      },
      {
        "args": [
          9,
          9,
          4
        ],
        "expected": 4
      },
      {
        "args": [
          2,
          2,
          2
        ],
        "expected": 2
      }
    ],
    "forbid": [
      {
        "pattern": "Math\\s*\\.\\s*min\\b",
        "message": "No uses Math.min. Recorre el array y quédate con el menor."
      },
      {
        "pattern": "Math\\s*\\.\\s*max\\b",
        "message": "No uses Math.max. Recorre el array y quédate con el mayor."
      }
    ]
  },
  {
    "id": "junior-056",
    "level": "junior",
    "title": "Suma hasta n",
    "prompt": "Suma los enteros del 1 a n. Si n es menor que 1, devuelve 0.\nEjemplo: 4 → 10.",
    "names": [
      "sumTo"
    ],
    "starter": "function sumTo(n) {\n  \n}\n",
    "explanation": "Es 1 + 2 + ... + n. Un bucle lo hace explícito. Existe la fórmula n * (n + 1) / 2, pero el bucle enseña el recorrido. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y acumulador",
    "javascript": "function sumTo(n) {\n  let total = 0\n  for (let i = 1; i <= n; i++) total += i\n  return total\n}\n",
    "typescript": "function sumTo(n: number): number) {\n  let total = 0\n  for (let i = 1; i <= n; i++) total += i\n  return total\n}\n",
    "cases": [
      {
        "args": [
          4
        ],
        "expected": 10
      },
      {
        "args": [
          1
        ],
        "expected": 1
      },
      {
        "args": [
          0
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "junior-057",
    "level": "junior",
    "title": "Potencia",
    "prompt": "Devuelve base elevado a exp. exp es un entero mayor o igual que 0. No uses ** ni Math.pow.\nEjemplo: 2, 8 → 256. 2, 0 → 1.",
    "names": [
      "power"
    ],
    "starter": "function power(base, exp) {\n  \n}\n",
    "explanation": "Cualquier número elevado a 0 es 1, así que el acumulador empieza en 1. Se multiplica por base, exp veces. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle que multiplica",
    "javascript": "function power(base, exp) {\n  let total = 1\n  for (let i = 0; i < exp; i++) total *= base\n  return total\n}\n",
    "typescript": "function power(base: number, exp: number): number) {\n  let total = 1\n  for (let i = 0; i < exp; i++) total *= base\n  return total\n}\n",
    "cases": [
      {
        "args": [
          2,
          8
        ],
        "expected": 256
      },
      {
        "args": [
          2,
          0
        ],
        "expected": 1
      },
      {
        "args": [
          5,
          1
        ],
        "expected": 5
      },
      {
        "args": [
          3,
          3
        ],
        "expected": 27
      }
    ]
  },
  {
    "id": "junior-058",
    "level": "junior",
    "title": "Cuenta atrás",
    "prompt": "Devuelve un array desde n hasta 1. Si n es menor que 1, el array va vacío.\nEjemplo: 3 → [3, 2, 1].",
    "names": [
      "countdown"
    ],
    "starter": "function countdown(n) {\n  \n}\n",
    "explanation": "El contador baja de uno en uno. La condición es i >= 1 para no meter el 0. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle que decrementa",
    "javascript": "function countdown(n) {\n  const out = []\n  for (let i = n; i >= 1; i--) out.push(i)\n  return out\n}\n",
    "typescript": "function countdown(n: number): number[]) {\n  const out = []\n  for (let i = n; i >= 1; i--) out.push(i)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          3
        ],
        "expected": [
          3,
          2,
          1
        ]
      },
      {
        "args": [
          0
        ],
        "expected": []
      },
      {
        "args": [
          1
        ],
        "expected": [
          1
        ]
      }
    ]
  },
  {
    "id": "junior-059",
    "level": "junior",
    "title": "Impares hasta n",
    "prompt": "Devuelve los impares desde 1 hasta n, inclusive si n es impar.\nEjemplo: 8 → [1, 3, 5, 7].",
    "names": [
      "oddsUntil"
    ],
    "starter": "function oddsUntil(n) {\n  \n}\n",
    "explanation": "Se empieza en 1 y se suma 2 cada vez. Así solo salen impares y no hace falta un if dentro. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle con paso 2",
    "javascript": "function oddsUntil(n) {\n  const out = []\n  for (let i = 1; i <= n; i += 2) out.push(i)\n  return out\n}\n",
    "typescript": "function oddsUntil(n: number): number[]) {\n  const out = []\n  for (let i = 1; i <= n; i += 2) out.push(i)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          8
        ],
        "expected": [
          1,
          3,
          5,
          7
        ]
      },
      {
        "args": [
          1
        ],
        "expected": [
          1
        ]
      },
      {
        "args": [
          0
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "junior-060",
    "level": "junior",
    "title": "Pares hasta n",
    "prompt": "Devuelve los pares desde 2 hasta n, inclusive si n es par.\nEjemplo: 8 → [2, 4, 6, 8].",
    "names": [
      "evensUntil"
    ],
    "starter": "function evensUntil(n) {\n  \n}\n",
    "explanation": "Igual que los impares, pero el origen es 2. El 0 no entra porque el enunciado empieza en 2. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle con paso 2 desde 2",
    "javascript": "function evensUntil(n) {\n  const out = []\n  for (let i = 2; i <= n; i += 2) out.push(i)\n  return out\n}\n",
    "typescript": "function evensUntil(n: number): number[]) {\n  const out = []\n  for (let i = 2; i <= n; i += 2) out.push(i)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          8
        ],
        "expected": [
          2,
          4,
          6,
          8
        ]
      },
      {
        "args": [
          1
        ],
        "expected": []
      },
      {
        "args": [
          2
        ],
        "expected": [
          2
        ]
      }
    ]
  },
  {
    "id": "junior-061",
    "level": "junior",
    "title": "Tabla de multiplicar",
    "prompt": "Devuelve n*1, n*2, ... n*10.\nEjemplo: 3 → [3, 6, 9, 12, 15, 18, 21, 24, 27, 30].",
    "names": [
      "multiplyTable"
    ],
    "starter": "function multiplyTable(n) {\n  \n}\n",
    "explanation": "El contador es el multiplicador, no el resultado. En cada vuelta se guarda n * i. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle de 1 a 10",
    "javascript": "function multiplyTable(n) {\n  const out = []\n  for (let i = 1; i <= 10; i++) out.push(n * i)\n  return out\n}\n",
    "typescript": "function multiplyTable(n: number): number[]) {\n  const out = []\n  for (let i = 1; i <= 10; i++) out.push(n * i)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          3
        ],
        "expected": [
          3,
          6,
          9,
          12,
          15,
          18,
          21,
          24,
          27,
          30
        ]
      },
      {
        "args": [
          1
        ],
        "expected": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ]
      }
    ]
  },
  {
    "id": "junior-062",
    "level": "junior",
    "title": "¿Está ordenado?",
    "prompt": "Di si t está ordenado de menor a mayor. Los empates valen. El array vacío es true.\nEjemplo: [1, 2, 2] → true. [1, 3, 2] → false.",
    "names": [
      "isSortedAsc"
    ],
    "starter": "function isSortedAsc(t) {\n  \n}\n",
    "explanation": "Basta mirar parejas vecinas. Si alguno es menor que el de su izquierda, el array no está ordenado. Un array de 0 o 1 elementos no tiene parejas que fallen. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "comparar cada elemento con el anterior",
    "javascript": "function isSortedAsc(t) {\n  for (let i = 1; i < t.length; i++) if (t[i] < t[i - 1]) return false\n  return true\n}\n",
    "typescript": "function isSortedAsc(t: number[]): boolean) {\n  for (let i = 1; i < t.length; i++) if (t[i] < t[i - 1]) return false\n  return true\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            2
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            1,
            3,
            2
          ]
        ],
        "expected": false
      },
      {
        "args": [
          []
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "junior-063",
    "level": "junior",
    "title": "Contar un valor",
    "prompt": "Cuenta cuántas veces aparece value en t.\nEjemplo: [1, 2, 1, 1], 1 → 3.",
    "names": [
      "countValue"
    ],
    "starter": "function countValue(t, value) {\n  \n}\n",
    "explanation": "A diferencia de includes, aquí no se sale en la primera coincidencia: hay que contarlas todas. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y contador",
    "javascript": "function countValue(t, value) {\n  let total = 0\n  for (const n of t) if (n === value) total++\n  return total\n}\n",
    "typescript": "function countValue(t: number[], value: number): number) {\n  let total = 0\n  for (const n of t) if (n === value) total++\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            1,
            1
          ],
          1
        ],
        "expected": 3
      },
      {
        "args": [
          [
            1,
            2,
            1,
            1
          ],
          4
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "junior-064",
    "level": "junior",
    "title": "Sustituir carácter",
    "prompt": "Sustituye cada aparición de from por to. from y to son un carácter.\nEjemplo: \"hola\", \"o\", \"a\" → \"hala\".",
    "names": [
      "replaceAllChar"
    ],
    "starter": "function replaceAllChar(text, from, to) {\n  \n}\n",
    "explanation": "Los strings no se editan por dentro. Se recorre el original y se va armando otro: si el carácter es from, se escribe to; si no, el mismo carácter. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle que construye un string nuevo",
    "javascript": "function replaceAllChar(text, from, to) {\n  let out = ''\n  for (const ch of text) out += ch === from ? to : ch\n  return out\n}\n",
    "typescript": "function replaceAllChar(text: string, from: string, to: string): string) {\n  let out = ''\n  for (const ch of text) out += ch === from ? to : ch\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "hola",
          "o",
          "a"
        ],
        "expected": "hala"
      },
      {
        "args": [
          "aaa",
          "a",
          "b"
        ],
        "expected": "bbb"
      },
      {
        "args": [
          "abc",
          "z",
          "y"
        ],
        "expected": "abc"
      }
    ]
  },
  {
    "id": "junior-065",
    "level": "junior",
    "title": "Quitar carácter",
    "prompt": "Quita todas las apariciones de ch.\nEjemplo: \"banana\", \"a\" → \"bnn\".",
    "names": [
      "removeChar"
    ],
    "starter": "function removeChar(text, ch) {\n  \n}\n",
    "explanation": "Es el mismo recorrido que sustituir, pero el carácter prohibido no se copia. El resto sí. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle que omite un carácter",
    "javascript": "function removeChar(text, ch) {\n  let out = ''\n  for (const item of text) if (item !== ch) out += item\n  return out\n}\n",
    "typescript": "function removeChar(text: string, ch: string): string) {\n  let out = ''\n  for (const item of text) if (item !== ch) out += item\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "banana",
          "a"
        ],
        "expected": "bnn"
      },
      {
        "args": [
          "abc",
          "z"
        ],
        "expected": "abc"
      }
    ]
  },
  {
    "id": "junior-066",
    "level": "junior",
    "title": "Caracteres únicos",
    "prompt": "Devuelve los caracteres de text sin repetir, en orden de aparición.\nEjemplo: \"abca\" → [\"a\", \"b\", \"c\"].",
    "names": [
      "uniqueChars"
    ],
    "starter": "function uniqueChars(text) {\n  \n}\n",
    "explanation": "Igual que los números únicos, carácter a carácter. includes evita meter un carácter que ya salió. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "array e includes",
    "javascript": "function uniqueChars(text) {\n  const out = []\n  for (const ch of text) if (!out.includes(ch)) out.push(ch)\n  return out\n}\n",
    "typescript": "function uniqueChars(text: string): string[]) {\n  const out = []\n  for (const ch of text) if (!out.includes(ch)) out.push(ch)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "abca"
        ],
        "expected": [
          "a",
          "b",
          "c"
        ]
      },
      {
        "args": [
          ""
        ],
        "expected": []
      },
      {
        "args": [
          "bb"
        ],
        "expected": [
          "b"
        ]
      }
    ]
  },
  {
    "id": "junior-067",
    "level": "junior",
    "title": "Todo mayúsculas",
    "prompt": "Di si text no está vacío y todas sus letras son mayúsculas de la A a la Z. Cualquier otro carácter lo invalida.\nEjemplo: \"AB\" → true. \"Ab\" → false. \"\" → false.",
    "names": [
      "isUppercase"
    ],
    "starter": "function isUppercase(text) {\n  \n}\n",
    "explanation": "No vale toUpperCase() === text si hay que rechazar números o espacios. Cada carácter tiene que caer entre \"A\" y \"Z\". El vacío se rechaza aparte. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y el rango A-Z",
    "javascript": "function isUppercase(text) {\n  if (!text) return false\n  for (const ch of text) if (ch < 'A' || ch > 'Z') return false\n  return true\n}\n",
    "typescript": "function isUppercase(text: string): boolean) {\n  if (!text) return false\n  for (const ch of text) if (ch < 'A' || ch > 'Z') return false\n  return true\n}\n",
    "cases": [
      {
        "args": [
          "AB"
        ],
        "expected": true
      },
      {
        "args": [
          "Ab"
        ],
        "expected": false
      },
      {
        "args": [
          ""
        ],
        "expected": false
      },
      {
        "args": [
          "A1"
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "junior-068",
    "level": "junior",
    "title": "Title case",
    "prompt": "Pon en mayúscula la primera letra de cada palabra y el resto en minúscula. Hay un solo espacio entre palabras.\nEjemplo: \"hola MUNDO\" → \"Hola Mundo\".",
    "names": [
      "titleCase"
    ],
    "starter": "function titleCase(text) {\n  \n}\n",
    "explanation": "Cada palabra se parte. La primera letra pasa a mayúscula y el resto a minúscula, para corregir un \"MUNDO\" entero. join recupera el espacio. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "split, map, toUpperCase, toLowerCase y join",
    "javascript": "function titleCase(text) {\n  return text.split(' ').map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')\n}\n",
    "typescript": "function titleCase(text: string): string) {\n  return text.split(' ').map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')\n}\n",
    "cases": [
      {
        "args": [
          "hola MUNDO"
        ],
        "expected": "Hola Mundo"
      },
      {
        "args": [
          "una"
        ],
        "expected": "Una"
      }
    ]
  },
  {
    "id": "junior-069",
    "level": "junior",
    "title": "Slug",
    "prompt": "Pasa text a un slug: minúsculas, solo letras y dígitos, y los demás caracteres se convierten en un único guion. Sin guion al principio ni al final.\nEjemplo: \"Hola, mundo!\" → \"hola-mundo\".",
    "names": [
      "slugify"
    ],
    "starter": "function slugify(text) {\n  \n}\n",
    "explanation": "Se recorre el texto en minúsculas. Letras y dígitos se copian. Cualquier otra cosa abre un guion, pero solo si ya hay texto y no se acaba de poner otro. Al final se quita un guion sobrante. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "toLowerCase, un bucle y una bandera para no repetir guiones",
    "javascript": "function slugify(text) {\n  const lower = text.toLowerCase()\n  let out = ''\n  let dash = false\n  for (const ch of lower) {\n    if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')) {\n      out += ch\n      dash = false\n    } else if (!dash && out.length > 0) {\n      out += '-'\n      dash = true\n    }\n  }\n  if (out.endsWith('-')) out = out.slice(0, -1)\n  return out\n}\n",
    "typescript": "function slugify(text: string): string) {\n  const lower = text.toLowerCase()\n  let out = ''\n  let dash = false\n  for (const ch of lower) {\n    if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')) {\n      out += ch\n      dash = false\n    } else if (!dash && out.length > 0) {\n      out += '-'\n      dash = true\n    }\n  }\n  if (out.endsWith('-')) out = out.slice(0, -1)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "Hola, mundo!"
        ],
        "expected": "hola-mundo"
      },
      {
        "args": [
          "  Hola!!"
        ],
        "expected": "hola"
      },
      {
        "args": [
          "a--b"
        ],
        "expected": "a-b"
      }
    ]
  },
  {
    "id": "junior-070",
    "level": "junior",
    "title": "Segundo mayor",
    "prompt": "Devuelve el segundo mayor distinto. Si no hay dos valores distintos, null.\nEjemplo: [1, 5, 3, 5] → 3. [5, 5] → null.",
    "names": [
      "secondLargest"
    ],
    "starter": "function secondLargest(t) {\n  \n}\n",
    "explanation": "No basta ordenar y coger el penúltimo, porque los repetidos ocuparían ese sitio. Se guardan el mayor y el siguiente distinto. Un valor igual al mayor se ignora. Uno que queda entre los dos actualiza el segundo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un recorrido y dos variables, primero y segundo",
    "javascript": "function secondLargest(t) {\n  let first = null\n  let second = null\n  for (const n of t) {\n    if (first === null || n > first) {\n      second = first\n      first = n\n    } else if (n < first && (second === null || n > second)) {\n      second = n\n    }\n  }\n  return second\n}\n",
    "typescript": "function secondLargest(t: number[]): number | null) {\n  let first = null\n  let second = null\n  for (const n of t) {\n    if (first === null || n > first) {\n      second = first\n      first = n\n    } else if (n < first && (second === null || n > second)) {\n      second = n\n    }\n  }\n  return second\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            5,
            3,
            5
          ]
        ],
        "expected": 3
      },
      {
        "args": [
          [
            5,
            5
          ]
        ],
        "expected": null
      },
      {
        "args": [
          [
            1
          ]
        ],
        "expected": null
      },
      {
        "args": [
          [
            4,
            2,
            9,
            2
          ]
        ],
        "expected": 4
      }
    ]
  },
  {
    "id": "junior-071",
    "level": "junior",
    "title": "Amplitud",
    "prompt": "Devuelve la diferencia entre el máximo y el mínimo de t. El array tiene al menos un número. No uses Math.max ni Math.min.\nEjemplo: [3, 10, 4] → 7.",
    "names": [
      "span"
    ],
    "starter": "function span(t) {\n  \n}\n",
    "explanation": "En el mismo recorrido se guardan los dos extremos, empezando por el primer elemento. La amplitud es mayor menos menor. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un bucle que actualiza el menor y el mayor",
    "javascript": "function span(t) {\n  let low = t[0]\n  let high = t[0]\n  for (const n of t) {\n    if (n < low) low = n\n    if (n > high) high = n\n  }\n  return high - low\n}\n",
    "typescript": "function span(t: number[]): number) {\n  let low = t[0]\n  let high = t[0]\n  for (const n of t) {\n    if (n < low) low = n\n    if (n > high) high = n\n  }\n  return high - low\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            10,
            4
          ]
        ],
        "expected": 7
      },
      {
        "args": [
          [
            5
          ]
        ],
        "expected": 0
      },
      {
        "args": [
          [
            -2,
            3
          ]
        ],
        "expected": 5
      }
    ],
    "forbid": [
      {
        "pattern": "Math\\s*\\.\\s*max\\b",
        "message": "No uses Math.max. Recorre el array y quédate con el mayor."
      },
      {
        "pattern": "Math\\s*\\.\\s*min\\b",
        "message": "No uses Math.min. Recorre el array y quédate con el menor."
      }
    ]
  },
  {
    "id": "junior-072",
    "level": "junior",
    "title": "Dentro del intervalo",
    "prompt": "Di si n está entre low y high, inclusive.\nEjemplo: 3, 1, 3 → true. 0, 1, 3 → false.",
    "names": [
      "isBetween"
    ],
    "starter": "function isBetween(n, low, high) {\n  \n}\n",
    "explanation": "Inclusive quiere decir que los extremos cuentan. >= y <= lo expresan. Las dos condiciones tienen que cumplirse a la vez. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos comparaciones unidas con &&",
    "javascript": "function isBetween(n, low, high) {\n  return n >= low && n <= high\n}\n",
    "typescript": "function isBetween(n: number, low: number, high: number): boolean) {\n  return n >= low && n <= high\n}\n",
    "cases": [
      {
        "args": [
          3,
          1,
          3
        ],
        "expected": true
      },
      {
        "args": [
          0,
          1,
          3
        ],
        "expected": false
      },
      {
        "args": [
          1,
          1,
          3
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "junior-073",
    "level": "junior",
    "title": "Rotar a la izquierda",
    "prompt": "Devuelve t rotado un puesto a la izquierda. El primero pasa al final. El vacío se queda vacío.\nEjemplo: [1, 2, 3] → [2, 3, 1].",
    "names": [
      "rotateLeft"
    ],
    "starter": "function rotateLeft(t) {\n  \n}\n",
    "explanation": "slice(1) es todo menos el primero. Se le concatena el primero al final. En el vacío no hay primero, así que se devuelve otro array vacío. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "slice y concat",
    "javascript": "function rotateLeft(t) {\n  if (t.length === 0) return []\n  return t.slice(1).concat(t[0])\n}\n",
    "typescript": "function rotateLeft(t: number[]): number[]) {\n  if (t.length === 0) return []\n  return t.slice(1).concat(t[0])\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          2,
          3,
          1
        ]
      },
      {
        "args": [
          [
            1
          ]
        ],
        "expected": [
          1
        ]
      },
      {
        "args": [
          []
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "junior-074",
    "level": "junior",
    "title": "Rotar a la derecha",
    "prompt": "Devuelve t rotado un puesto a la derecha. El último pasa al principio.\nEjemplo: [1, 2, 3] → [3, 1, 2].",
    "names": [
      "rotateRight"
    ],
    "starter": "function rotateRight(t) {\n  \n}\n",
    "explanation": "El último elemento forma un array de una pieza y delante se concatena el resto, que es slice(0, -1): todo menos el último. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el último índice, un array de un elemento y slice",
    "javascript": "function rotateRight(t) {\n  if (t.length === 0) return []\n  return [t[t.length - 1]].concat(t.slice(0, -1))\n}\n",
    "typescript": "function rotateRight(t: number[]): number[]) {\n  if (t.length === 0) return []\n  return [t[t.length - 1]].concat(t.slice(0, -1))\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          3,
          1,
          2
        ]
      },
      {
        "args": [
          []
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "junior-075",
    "level": "junior",
    "title": "Suma de índices pares",
    "prompt": "Suma los elementos que están en índices pares: 0, 2, 4...\nEjemplo: [1, 2, 3, 4] → 4.",
    "names": [
      "sumEvenIndexes"
    ],
    "starter": "function sumEvenIndexes(t) {\n  \n}\n",
    "explanation": "El índice 0 es par. Sumar 2 salta los impares. No se mira el valor, se mira la posición. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle con paso 2",
    "javascript": "function sumEvenIndexes(t) {\n  let total = 0\n  for (let i = 0; i < t.length; i += 2) total += t[i]\n  return total\n}\n",
    "typescript": "function sumEvenIndexes(t: number[]): number) {\n  let total = 0\n  for (let i = 0; i < t.length; i += 2) total += t[i]\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": 4
      },
      {
        "args": [
          [
            10
          ]
        ],
        "expected": 10
      },
      {
        "args": [
          []
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "junior-076",
    "level": "junior",
    "title": "Saludo",
    "prompt": "Si name está vacío, devuelve \"Hola\". Si no, \"Hola, \" seguido del nombre.\nEjemplo: \"Ana\" → \"Hola, Ana\".",
    "names": [
      "hello"
    ],
    "starter": "function hello(name) {\n  \n}\n",
    "explanation": "El string vacío es falsy, así que !name distingue el saludo sin nombre. El otro caso añade una coma y un espacio, que forman parte del texto pedido. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "if y concatenación",
    "javascript": "function hello(name) {\n  if (!name) return 'Hola'\n  return 'Hola, ' + name\n}\n",
    "typescript": "function hello(name: string): string) {\n  if (!name) return 'Hola'\n  return 'Hola, ' + name\n}\n",
    "cases": [
      {
        "args": [
          "Ana"
        ],
        "expected": "Hola, Ana"
      },
      {
        "args": [
          ""
        ],
        "expected": "Hola"
      }
    ]
  },
  {
    "id": "junior-077",
    "level": "junior",
    "title": "Plural simple",
    "prompt": "Si n es 1, devuelve word. En cualquier otro caso, word más una s.\nEjemplo: \"gato\", 1 → \"gato\". \"gato\", 2 → \"gatos\".",
    "names": [
      "pluralize"
    ],
    "starter": "function pluralize(word, n) {\n  \n}\n",
    "explanation": "Es un plural mecánico, no el del diccionario: no contempla \"luz\" ni \"lápices\". La única excepción es el singular, n === 1. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un if sobre el número",
    "javascript": "function pluralize(word, n) {\n  if (n === 1) return word\n  return word + 's'\n}\n",
    "typescript": "function pluralize(word: string, n: number): string) {\n  if (n === 1) return word\n  return word + 's'\n}\n",
    "cases": [
      {
        "args": [
          "gato",
          1
        ],
        "expected": "gato"
      },
      {
        "args": [
          "gato",
          2
        ],
        "expected": "gatos"
      },
      {
        "args": [
          "gato",
          0
        ],
        "expected": "gatos"
      }
    ]
  },
  {
    "id": "junior-078",
    "level": "junior",
    "title": "Diferencia absoluta",
    "prompt": "Devuelve la distancia entre a y b, siempre positiva o cero. No uses Math.abs.\nEjemplo: 3, 10 → 7.",
    "names": [
      "absDiff"
    ],
    "starter": "function absDiff(a, b) {\n  \n}\n",
    "explanation": "Si a es mayor, a - b ya es positivo. Si no, se resta al revés. No importa el orden de entrada. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "restar en el orden que no da negativo",
    "javascript": "function absDiff(a, b) {\n  return a > b ? a - b : b - a\n}\n",
    "typescript": "function absDiff(a: number, b: number): number) {\n  return a > b ? a - b : b - a\n}\n",
    "cases": [
      {
        "args": [
          3,
          10
        ],
        "expected": 7
      },
      {
        "args": [
          10,
          3
        ],
        "expected": 7
      },
      {
        "args": [
          4,
          4
        ],
        "expected": 0
      }
    ],
    "forbid": [
      {
        "pattern": "Math\\s*\\.\\s*abs\\b",
        "message": "No uses Math.abs. Compara los dos números."
      }
    ]
  },
  {
    "id": "junior-079",
    "level": "junior",
    "title": "Cifras",
    "prompt": "Devuelve las cifras de n, de izquierda a derecha. n es un entero mayor o igual que 0.\nEjemplo: 405 → [4, 0, 5]. 0 → [0].",
    "names": [
      "digits"
    ],
    "starter": "function digits(n) {\n  \n}\n",
    "explanation": "El resto entre 10 saca las cifras de derecha a izquierda. Se guardan así y al final se invierte el array. El 0 es un caso aparte: el bucle no daría ninguna vuelta y perderíamos la cifra. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "resto entre 10, un array y reverse",
    "javascript": "function digits(n) {\n  if (n === 0) return [0]\n  const out = []\n  let rest = n\n  while (rest > 0) {\n    out.push(rest % 10)\n    rest = Math.floor(rest / 10)\n  }\n  return out.reverse()\n}\n",
    "typescript": "function digits(n: number): number[]) {\n  if (n === 0) return [0]\n  const out = []\n  let rest = n\n  while (rest > 0) {\n    out.push(rest % 10)\n    rest = Math.floor(rest / 10)\n  }\n  return out.reverse()\n}\n",
    "cases": [
      {
        "args": [
          405
        ],
        "expected": [
          4,
          0,
          5
        ]
      },
      {
        "args": [
          0
        ],
        "expected": [
          0
        ]
      },
      {
        "args": [
          8
        ],
        "expected": [
          8
        ]
      }
    ]
  },
  {
    "id": "junior-080",
    "level": "junior",
    "title": "Número al revés",
    "prompt": "Invierte las cifras de n y devuelve el número. n es un entero mayor o igual que 0. Los ceros a la izquierda del resultado desaparecen.\nEjemplo: 120 → 21.",
    "names": [
      "reverseNumber"
    ],
    "starter": "function reverseNumber(n) {\n  \n}\n",
    "explanation": "Cada cifra nueva se coloca a la derecha: resultado * 10 + cifra. Un cero a la izquierda del resultado no cambia el valor numérico, por eso 100 acaba en 1. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "resto entre 10 y construir el número multiplicando por 10",
    "javascript": "function reverseNumber(n) {\n  let rest = n\n  let out = 0\n  while (rest > 0) {\n    out = out * 10 + (rest % 10)\n    rest = Math.floor(rest / 10)\n  }\n  return out\n}\n",
    "typescript": "function reverseNumber(n: number): number) {\n  let rest = n\n  let out = 0\n  while (rest > 0) {\n    out = out * 10 + (rest % 10)\n    rest = Math.floor(rest / 10)\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          120
        ],
        "expected": 21
      },
      {
        "args": [
          100
        ],
        "expected": 1
      },
      {
        "args": [
          0
        ],
        "expected": 0
      },
      {
        "args": [
          45
        ],
        "expected": 54
      }
    ]
  },
  {
    "id": "junior-081",
    "level": "junior",
    "title": "Número de Armstrong",
    "prompt": "Di si n es igual a la suma de sus cifras elevadas al número de cifras. n es un entero mayor o igual que 0. Los de una cifra cuentan.\nEjemplo: 153 → true, porque 1³ + 5³ + 3³ = 153.",
    "names": [
      "isArmstrong"
    ],
    "starter": "function isArmstrong(n) {\n  \n}\n",
    "explanation": "La potencia no es siempre 3: depende de cuántas cifras haya. Cada cifra se eleva a esa longitud multiplicando en un bucle, y se suma. Al final se compara con n. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "String(n), un bucle para la potencia y un acumulador",
    "javascript": "function isArmstrong(n) {\n  const text = String(n)\n  let total = 0\n  for (const ch of text) {\n    let power = 1\n    const digit = Number(ch)\n    for (let i = 0; i < text.length; i++) power *= digit\n    total += power\n  }\n  return total === n\n}\n",
    "typescript": "function isArmstrong(n: number): boolean) {\n  const text = String(n)\n  let total = 0\n  for (const ch of text) {\n    let power = 1\n    const digit = Number(ch)\n    for (let i = 0; i < text.length; i++) power *= digit\n    total += power\n  }\n  return total === n\n}\n",
    "cases": [
      {
        "args": [
          153
        ],
        "expected": true
      },
      {
        "args": [
          154
        ],
        "expected": false
      },
      {
        "args": [
          370
        ],
        "expected": true
      },
      {
        "args": [
          5
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "junior-082",
    "level": "junior",
    "title": "Pasos de Collatz",
    "prompt": "Cuenta cuántos pasos hacen falta para llegar a 1. Si n es par se divide entre 2; si es impar, pasa a 3n + 1. n es un entero mayor o igual que 1. Desde 1 hay 0 pasos.\nEjemplo: 3 → 7.",
    "names": [
      "collatzSteps"
    ],
    "starter": "function collatzSteps(n) {\n  \n}\n",
    "explanation": "Mientras el valor no sea 1, se aplica una de las dos reglas y se cuenta un paso. El 1 ya está en el destino, así que el bucle no entra. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle while y el resto para saber si es par",
    "javascript": "function collatzSteps(n) {\n  let steps = 0\n  let rest = n\n  while (rest !== 1) {\n    rest = rest % 2 === 0 ? rest / 2 : rest * 3 + 1\n    steps++\n  }\n  return steps\n}\n",
    "typescript": "function collatzSteps(n: number): number) {\n  let steps = 0\n  let rest = n\n  while (rest !== 1) {\n    rest = rest % 2 === 0 ? rest / 2 : rest * 3 + 1\n    steps++\n  }\n  return steps\n}\n",
    "cases": [
      {
        "args": [
          1
        ],
        "expected": 0
      },
      {
        "args": [
          2
        ],
        "expected": 1
      },
      {
        "args": [
          3
        ],
        "expected": 7
      }
    ]
  },
  {
    "id": "junior-083",
    "level": "junior",
    "title": "Suma de cuadrados",
    "prompt": "Suma el cuadrado de cada número de t.\nEjemplo: [2, 3] → 13.",
    "names": [
      "sumOfSquares"
    ],
    "starter": "function sumOfSquares(t) {\n  \n}\n",
    "explanation": "El cuadrado es n * n. Se acumula igual que una suma normal. El array vacío da 0. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y multiplicación del número por sí mismo",
    "javascript": "function sumOfSquares(t) {\n  let total = 0\n  for (const n of t) total += n * n\n  return total\n}\n",
    "typescript": "function sumOfSquares(t: number[]): number) {\n  let total = 0\n  for (const n of t) total += n * n\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            3
          ]
        ],
        "expected": 13
      },
      {
        "args": [
          []
        ],
        "expected": 0
      },
      {
        "args": [
          [
            -2
          ]
        ],
        "expected": 4
      }
    ]
  },
  {
    "id": "junior-084",
    "level": "junior",
    "title": "Palabras largas",
    "prompt": "Devuelve las palabras cuya longitud es mayor que n, en el mismo orden.\nEjemplo: [\"a\", \"hola\"], 2 → [\"hola\"].",
    "names": [
      "filterLongerThan"
    ],
    "starter": "function filterLongerThan(words, n) {\n  \n}\n",
    "explanation": "Se copia la palabra solo si tiene más caracteres que n. \"mayor que\" deja fuera a las que miden exactamente n. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y length",
    "javascript": "function filterLongerThan(words, n) {\n  const out = []\n  for (const word of words) if (word.length > n) out.push(word)\n  return out\n}\n",
    "typescript": "function filterLongerThan(words: string[], n: number): string[]) {\n  const out = []\n  for (const word of words) if (word.length > n) out.push(word)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            "a",
            "hola"
          ],
          2
        ],
        "expected": [
          "hola"
        ]
      },
      {
        "args": [
          [
            "aa",
            "bb"
          ],
          2
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "junior-085",
    "level": "junior",
    "title": "Empieza por vocal",
    "prompt": "Di si text empieza por vocal, sin contar la y. Ignora mayúsculas. El vacío es false.\nEjemplo: \"Ola\" → true. \"sol\" → false.",
    "names": [
      "startsWithVowel"
    ],
    "starter": "function startsWithVowel(text) {\n  \n}\n",
    "explanation": "Solo importa text[0]. Se busca en un string con las vocales en los dos casos. Si no hay primer carácter, es false. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el primer carácter e includes",
    "javascript": "function startsWithVowel(text) {\n  if (!text) return false\n  return 'aeiouAEIOU'.includes(text[0])\n}\n",
    "typescript": "function startsWithVowel(text: string): boolean) {\n  if (!text) return false\n  return 'aeiouAEIOU'.includes(text[0])\n}\n",
    "cases": [
      {
        "args": [
          "Ola"
        ],
        "expected": true
      },
      {
        "args": [
          "Hola"
        ],
        "expected": false
      },
      {
        "args": [
          "sol"
        ],
        "expected": false
      },
      {
        "args": [
          ""
        ],
        "expected": false
      },
      {
        "args": [
          "y"
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "junior-086",
    "level": "junior",
    "title": "Palabras con inicial",
    "prompt": "Cuenta cuántas palabras empiezan por ch. Ignora mayúsculas. ch es una letra.\nEjemplo: [\"ana\", \"aro\", \"sol\"], \"a\" → 2.",
    "names": [
      "countWordsStartingWith"
    ],
    "starter": "function countWordsStartingWith(words, ch) {\n  \n}\n",
    "explanation": "De cada palabra se mira solo la primera letra, en minúsculas, y se compara con ch también en minúsculas. Una palabra vacía no cuenta. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle, el índice 0 y toLowerCase",
    "javascript": "function countWordsStartingWith(words, ch) {\n  let total = 0\n  const needle = ch.toLowerCase()\n  for (const word of words) {\n    if (word && word[0].toLowerCase() === needle) total++\n  }\n  return total\n}\n",
    "typescript": "function countWordsStartingWith(words: string[], ch: string): number) {\n  let total = 0\n  const needle = ch.toLowerCase()\n  for (const word of words) {\n    if (word && word[0].toLowerCase() === needle) total++\n  }\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            "ana",
            "aro",
            "sol"
          ],
          "a"
        ],
        "expected": 2
      },
      {
        "args": [
          [
            "Ana"
          ],
          "a"
        ],
        "expected": 1
      },
      {
        "args": [
          [
            "",
            "sol"
          ],
          "s"
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "junior-087",
    "level": "junior",
    "title": "Sumar en paralelo",
    "prompt": "Suma a[i] + b[i] mientras haya pareja. Si uno es más corto, se ignora el resto del otro.\nEjemplo: [1, 2, 3], [10, 20] → [11, 22].",
    "names": [
      "zipAdd"
    ],
    "starter": "function zipAdd(a, b) {\n  \n}\n",
    "explanation": "No se puede leer más allá del array corto. El límite del bucle es la menor de las dos longitudes. Cada posición produce una suma. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un índice compartido y el mínimo de las dos longitudes",
    "javascript": "function zipAdd(a, b) {\n  const out = []\n  const size = a.length < b.length ? a.length : b.length\n  for (let i = 0; i < size; i++) out.push(a[i] + b[i])\n  return out\n}\n",
    "typescript": "function zipAdd(a: number[], b: number[]): number[]) {\n  const out = []\n  const size = a.length < b.length ? a.length : b.length\n  for (let i = 0; i < size; i++) out.push(a[i] + b[i])\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3
          ],
          [
            10,
            20
          ]
        ],
        "expected": [
          11,
          22
        ]
      },
      {
        "args": [
          [
            1
          ],
          [
            2,
            3
          ]
        ],
        "expected": [
          3
        ]
      },
      {
        "args": [
          [],
          [
            1
          ]
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "junior-088",
    "level": "junior",
    "title": "Intercalar",
    "prompt": "Intercala a y b. Si uno se acaba, se copian los que queden del otro.\nEjemplo: [1, 2], [3, 4, 5] → [1, 3, 2, 4, 5].",
    "names": [
      "interleave"
    ],
    "starter": "function interleave(a, b) {\n  \n}\n",
    "explanation": "En cada índice se intenta coger de a y de b. El if evita leer una posición que ya no existe. Por eso el resultado no corta en el array más corto, a diferencia de zipAdd. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un bucle hasta la longitud mayor y dos if",
    "javascript": "function interleave(a, b) {\n  const out = []\n  const size = a.length > b.length ? a.length : b.length\n  for (let i = 0; i < size; i++) {\n    if (i < a.length) out.push(a[i])\n    if (i < b.length) out.push(b[i])\n  }\n  return out\n}\n",
    "typescript": "function interleave(a: number[], b: number[]): number[]) {\n  const out = []\n  const size = a.length > b.length ? a.length : b.length\n  for (let i = 0; i < size; i++) {\n    if (i < a.length) out.push(a[i])\n    if (i < b.length) out.push(b[i])\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2
          ],
          [
            3,
            4,
            5
          ]
        ],
        "expected": [
          1,
          3,
          2,
          4,
          5
        ]
      },
      {
        "args": [
          [
            1
          ],
          []
        ],
        "expected": [
          1
        ]
      },
      {
        "args": [
          [],
          []
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "junior-089",
    "level": "junior",
    "title": "Todos iguales",
    "prompt": "Di si todos los elementos de t son iguales. El vacío es true.\nEjemplo: [2, 2, 2] → true. [2, 3] → false.",
    "names": [
      "allEqual"
    ],
    "starter": "function allEqual(t) {\n  \n}\n",
    "explanation": "Si todos son iguales al primero, son iguales entre sí. El vacío no tiene un contraejemplo. Un solo elemento también es true. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "comparar cada elemento con el primero",
    "javascript": "function allEqual(t) {\n  for (let i = 1; i < t.length; i++) if (t[i] !== t[0]) return false\n  return true\n}\n",
    "typescript": "function allEqual(t: number[]): boolean) {\n  for (let i = 1; i < t.length; i++) if (t[i] !== t[0]) return false\n  return true\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            2,
            2
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            2,
            3
          ]
        ],
        "expected": false
      },
      {
        "args": [
          []
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "junior-090",
    "level": "junior",
    "title": "De uno en uno",
    "prompt": "Di si cada número es exactamente el anterior más 1. El vacío y un solo elemento son true.\nEjemplo: [3, 4, 5] → true. [3, 5] → false.",
    "names": [
      "increasingByOne"
    ],
    "starter": "function increasingByOne(t) {\n  \n}\n",
    "explanation": "No basta con que crezca: tiene que crecer de uno en uno. Se compara t[i] con t[i - 1] + 1. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle que mira la diferencia con el anterior",
    "javascript": "function increasingByOne(t) {\n  for (let i = 1; i < t.length; i++) if (t[i] !== t[i - 1] + 1) return false\n  return true\n}\n",
    "typescript": "function increasingByOne(t: number[]): boolean) {\n  for (let i = 1; i < t.length; i++) if (t[i] !== t[i - 1] + 1) return false\n  return true\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            4,
            5
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            3,
            5
          ]
        ],
        "expected": false
      },
      {
        "args": [
          [
            9
          ]
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "junior-091",
    "level": "junior",
    "title": "Positivos a uno",
    "prompt": "Devuelve una copia de t donde cada positivo pasa a ser 1. Cero y negativos se quedan igual.\nEjemplo: [-2, 0, 5] → [-2, 0, 1].",
    "names": [
      "positivesToOne"
    ],
    "starter": "function positivesToOne(t) {\n  \n}\n",
    "explanation": "map recorre y construye el array nuevo. El ternario distingue el positivo del resto. El cero no es positivo, así que se conserva. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "map y un ternario",
    "javascript": "function positivesToOne(t) {\n  return t.map((n) => (n > 0 ? 1 : n))\n}\n",
    "typescript": "function positivesToOne(t: number[]): number[]) {\n  return t.map((n) => (n > 0 ? 1 : n))\n}\n",
    "cases": [
      {
        "args": [
          [
            -2,
            0,
            5
          ]
        ],
        "expected": [
          -2,
          0,
          1
        ]
      },
      {
        "args": [
          []
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "junior-092",
    "level": "junior",
    "title": "Contar impares",
    "prompt": "Cuenta los impares de t. Los números son enteros, también negativos.\nEjemplo: [1, 2, -3] → 2.",
    "names": [
      "countOdds"
    ],
    "starter": "function countOdds(t) {\n  \n}\n",
    "explanation": "En JavaScript, -3 % 2 es -1, no 1. Por eso la condición no es === 1, sino !== 0: cualquier resto no nulo es impar. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y el resto distinto de 0",
    "javascript": "function countOdds(t) {\n  let total = 0\n  for (const n of t) if (n % 2 !== 0) total++\n  return total\n}\n",
    "typescript": "function countOdds(t: number[]): number) {\n  let total = 0\n  for (const n of t) if (n % 2 !== 0) total++\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            -3
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            2,
            4
          ]
        ],
        "expected": 0
      },
      {
        "args": [
          []
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "junior-093",
    "level": "junior",
    "title": "Pareja que suma",
    "prompt": "Di si hay dos índices distintos cuyos valores suman target.\nEjemplo: [2, 7, 4], 6 → true. [1, 2], 4 → false.",
    "names": [
      "hasPairSum"
    ],
    "starter": "function hasPairSum(t, target) {\n  \n}\n",
    "explanation": "Cada pareja se mira una vez: j empieza después de i, así que no se usa el mismo índice dos veces ni se repite la pareja al revés. Es el mismo esquema que el producto 30, con dos niveles en vez de tres. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos bucles anidados con j = i + 1",
    "javascript": "function hasPairSum(t, target) {\n  for (let i = 0; i < t.length; i++) {\n    for (let j = i + 1; j < t.length; j++) {\n      if (t[i] + t[j] === target) return true\n    }\n  }\n  return false\n}\n",
    "typescript": "function hasPairSum(t: number[], target: number): boolean) {\n  for (let i = 0; i < t.length; i++) {\n    for (let j = i + 1; j < t.length; j++) {\n      if (t[i] + t[j] === target) return true\n    }\n  }\n  return false\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            7,
            4
          ],
          6
        ],
        "expected": true
      },
      {
        "args": [
          [
            1,
            2
          ],
          4
        ],
        "expected": false
      },
      {
        "args": [
          [
            3,
            3
          ],
          6
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "junior-094",
    "level": "junior",
    "title": "Enmascarar el final",
    "prompt": "Sustituye los últimos n caracteres por asteriscos. Si n es mayor o igual que la longitud, todo el texto pasa a asteriscos. n es 0 o más.\nEjemplo: \"secreto\", 3 → \"secr***\".",
    "names": [
      "maskTail"
    ],
    "starter": "function maskTail(text, n) {\n  \n}\n",
    "explanation": "El prefijo visible es todo menos los n últimos caracteres. repeat construye la máscara de esa longitud. Si n se pasa de la longitud, no hay prefijo y el resultado son tantos asteriscos como caracteres había. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "slice y repeat",
    "javascript": "function maskTail(text, n) {\n  if (n >= text.length) return '*'.repeat(text.length)\n  return text.slice(0, text.length - n) + '*'.repeat(n)\n}\n",
    "typescript": "function maskTail(text: string, n: number): string) {\n  if (n >= text.length) return '*'.repeat(text.length)\n  return text.slice(0, text.length - n) + '*'.repeat(n)\n}\n",
    "cases": [
      {
        "args": [
          "secreto",
          3
        ],
        "expected": "secr***"
      },
      {
        "args": [
          "ab",
          5
        ],
        "expected": "**"
      },
      {
        "args": [
          "ab",
          0
        ],
        "expected": "ab"
      }
    ]
  },
  {
    "id": "junior-095",
    "level": "junior",
    "title": "Triángulo de asteriscos",
    "prompt": "Devuelve n líneas. La primera es \"*\", la segunda \"**\", y así hasta n asteriscos. Si n es 0, el array va vacío.\nEjemplo: 3 → [\"*\", \"**\", \"***\"].",
    "names": [
      "triangleStars"
    ],
    "starter": "function triangleStars(n) {\n  \n}\n",
    "explanation": "La línea i tiene i asteriscos. repeat evita un bucle interno. El contador va de 1 a n. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y repeat",
    "javascript": "function triangleStars(n) {\n  const out = []\n  for (let i = 1; i <= n; i++) out.push('*'.repeat(i))\n  return out\n}\n",
    "typescript": "function triangleStars(n: number): string[]) {\n  const out = []\n  for (let i = 1; i <= n; i++) out.push('*'.repeat(i))\n  return out\n}\n",
    "cases": [
      {
        "args": [
          3
        ],
        "expected": [
          "*",
          "**",
          "***"
        ]
      },
      {
        "args": [
          0
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "junior-096",
    "level": "junior",
    "title": "César de una letra",
    "prompt": "Desplaza cada letra una posición. La z pasa a ser a, y la Z pasa a ser A. El resto de caracteres se queda igual.\nEjemplo: \"Az!\" → \"Ba!\".",
    "names": [
      "caesar"
    ],
    "starter": "function caesar(text) {\n  \n}\n",
    "explanation": "Las letras ocupan códigos consecutivos. Sumar 1 al código avanza una letra. La z no tiene siguiente dentro del alfabeto, así que vuelve a la a. Mayúsculas y minúsculas son dos rangos distintos. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "charCodeAt, fromCharCode y un caso para el borde z",
    "javascript": "function caesar(text) {\n  let out = ''\n  for (const ch of text) {\n    if (ch >= 'a' && ch <= 'z') out += ch === 'z' ? 'a' : String.fromCharCode(ch.charCodeAt(0) + 1)\n    else if (ch >= 'A' && ch <= 'Z') out += ch === 'Z' ? 'A' : String.fromCharCode(ch.charCodeAt(0) + 1)\n    else out += ch\n  }\n  return out\n}\n",
    "typescript": "function caesar(text: string): string) {\n  let out = ''\n  for (const ch of text) {\n    if (ch >= 'a' && ch <= 'z') out += ch === 'z' ? 'a' : String.fromCharCode(ch.charCodeAt(0) + 1)\n    else if (ch >= 'A' && ch <= 'Z') out += ch === 'Z' ? 'A' : String.fromCharCode(ch.charCodeAt(0) + 1)\n    else out += ch\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "Az!"
        ],
        "expected": "Ba!"
      },
      {
        "args": [
          "abz"
        ],
        "expected": "bca"
      },
      {
        "args": [
          ""
        ],
        "expected": ""
      }
    ]
  },
  {
    "id": "junior-097",
    "level": "junior",
    "title": "Carácter central",
    "prompt": "Si text tiene longitud impar, devuelve el carácter central. Si es par, los dos centrales. text no está vacío.\nEjemplo: \"abc\" → \"b\". \"abcd\" → \"bc\".",
    "names": [
      "middleChar"
    ],
    "starter": "function middleChar(text) {\n  \n}\n",
    "explanation": "Math.floor(length / 2) cae en el centro si la longitud es impar, y en el segundo de los dos centrales si es par. En el caso par hay que retroceder una posición para coger la pareja. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "length, división entera y slice o índices",
    "javascript": "function middleChar(text) {\n  const mid = Math.floor(text.length / 2)\n  if (text.length % 2 === 1) return text[mid]\n  return text[mid - 1] + text[mid]\n}\n",
    "typescript": "function middleChar(text: string): string) {\n  const mid = Math.floor(text.length / 2)\n  if (text.length % 2 === 1) return text[mid]\n  return text[mid - 1] + text[mid]\n}\n",
    "cases": [
      {
        "args": [
          "abc"
        ],
        "expected": "b"
      },
      {
        "args": [
          "abcd"
        ],
        "expected": "bc"
      },
      {
        "args": [
          "ab"
        ],
        "expected": "ab"
      }
    ]
  },
  {
    "id": "junior-098",
    "level": "junior",
    "title": "Cambiar extremos",
    "prompt": "Devuelve una copia de t con el primero y el último intercambiados. Si hay menos de dos elementos, devuelve una copia igual.\nEjemplo: [1, 2, 3, 4] → [4, 2, 3, 1].",
    "names": [
      "swapEnds"
    ],
    "starter": "function swapEnds(t) {\n  \n}\n",
    "explanation": "No se puede hacer a = b; b = a, porque se pierde el valor original. Una variable temporal guarda el primero, se copia el último encima y luego la temporal va al final. slice evita modificar t. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "slice para copiar y un intercambio con una variable temporal",
    "javascript": "function swapEnds(t) {\n  if (t.length < 2) return t.slice()\n  const out = t.slice()\n  const first = out[0]\n  out[0] = out[out.length - 1]\n  out[out.length - 1] = first\n  return out\n}\n",
    "typescript": "function swapEnds(t: number[]): number[]) {\n  if (t.length < 2) return t.slice()\n  const out = t.slice()\n  const first = out[0]\n  out[0] = out[out.length - 1]\n  out[out.length - 1] = first\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": [
          4,
          2,
          3,
          1
        ]
      },
      {
        "args": [
          [
            7
          ]
        ],
        "expected": [
          7
        ]
      },
      {
        "args": [
          []
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "junior-099",
    "level": "junior",
    "title": "Suma entre dos",
    "prompt": "Suma los enteros desde el menor de a y b hasta el mayor, inclusive. a y b son enteros.\nEjemplo: 3, 5 → 12. 5, 3 → 12.",
    "names": [
      "sumBetween"
    ],
    "starter": "function sumBetween(a, b) {\n  \n}\n",
    "explanation": "El enunciado no dice que a sea el menor. Se calculan low y high y se suma el rango cerrado. Si son iguales, el bucle da una vuelta y devuelve ese número. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ordenar los extremos y un bucle",
    "javascript": "function sumBetween(a, b) {\n  let total = 0\n  const low = a < b ? a : b\n  const high = a < b ? b : a\n  for (let i = low; i <= high; i++) total += i\n  return total\n}\n",
    "typescript": "function sumBetween(a: number, b: number): number) {\n  let total = 0\n  const low = a < b ? a : b\n  const high = a < b ? b : a\n  for (let i = low; i <= high; i++) total += i\n  return total\n}\n",
    "cases": [
      {
        "args": [
          3,
          5
        ],
        "expected": 12
      },
      {
        "args": [
          5,
          3
        ],
        "expected": 12
      },
      {
        "args": [
          4,
          4
        ],
        "expected": 4
      }
    ]
  },
  {
    "id": "junior-100",
    "level": "junior",
    "title": "Repetir carácter",
    "prompt": "Devuelve ch repetido times veces. times es 0 o más y ch es un carácter.\nEjemplo: \"*\", 4 → \"****\".",
    "names": [
      "repeatChar"
    ],
    "starter": "function repeatChar(ch, times) {\n  \n}\n",
    "explanation": "Es el mismo acumulador de repeatText, con un carácter. times 0 deja el string vacío porque el bucle no entra. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y concatenación",
    "javascript": "function repeatChar(ch, times) {\n  let out = ''\n  for (let i = 0; i < times; i++) out += ch\n  return out\n}\n",
    "typescript": "function repeatChar(ch: string, times: number): string) {\n  let out = ''\n  for (let i = 0; i < times; i++) out += ch\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "*",
          4
        ],
        "expected": "****"
      },
      {
        "args": [
          "a",
          0
        ],
        "expected": ""
      },
      {
        "args": [
          "b",
          1
        ],
        "expected": "b"
      }
    ]
  },
  {
    "id": "mid-001",
    "level": "mid",
    "title": "Palabras concatenadas",
    "prompt": "Given a table of unique words, return those that can be formed by concatenating at least two other words from the array.\nExample: [\"cat\", \"dog\", \"catdog\"] → [\"catdog\"].\nNombre: findAllConcatenatedWordsInADict. Conserva el orden del array.",
    "names": [
      "findAllConcatenatedWordsInADict"
    ],
    "starter": "function findAllConcatenatedWordsInADict(words) {\n  \n}\n",
    "explanation": "Una palabra vale si se puede cortar en un prefijo que está en el diccionario y un resto que también está, o que a su vez se puede construir. El corte tiene al menos un carácter a cada lado, así que la palabra no se forma sola. El Set evita recorrer el array en cada búsqueda. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Set para buscar en O(1) de media y una función recursiva que parte la palabra",
    "javascript": "function findAllConcatenatedWordsInADict(words) {\n  const set = new Set(words)\n  function canBuild(word) {\n    for (let i = 1; i < word.length; i++) {\n      const left = word.slice(0, i)\n      const right = word.slice(i)\n      if (set.has(left) && (set.has(right) || canBuild(right))) return true\n    }\n    return false\n  }\n  const out = []\n  for (const word of words) if (canBuild(word)) out.push(word)\n  return out\n}\n",
    "typescript": "function findAllConcatenatedWordsInADict(words: string[]): string[]) {\n  const set = new Set(words)\n  function canBuild(word) {\n    for (let i = 1; i < word.length; i++) {\n      const left = word.slice(0, i)\n      const right = word.slice(i)\n      if (set.has(left) && (set.has(right) || canBuild(right))) return true\n    }\n    return false\n  }\n  const out = []\n  for (const word of words) if (canBuild(word)) out.push(word)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            "cat",
            "dog",
            "catdog"
          ]
        ],
        "expected": [
          "catdog"
        ]
      },
      {
        "args": [
          [
            "cat",
            "dog",
            "catdog",
            "dogcat"
          ]
        ],
        "expected": [
          "catdog",
          "dogcat"
        ]
      },
      {
        "args": [
          [
            "cat",
            "catcat"
          ]
        ],
        "expected": [
          "catcat"
        ]
      },
      {
        "args": [
          [
            "a",
            "b",
            "ab",
            "abc"
          ]
        ],
        "expected": [
          "ab"
        ]
      }
    ]
  },
  {
    "id": "mid-002",
    "level": "mid",
    "title": "Two sum",
    "prompt": "Devuelve los índices de dos números que suman target, el menor primero. Si no hay pareja, null. Hay como mucho una.\nEjemplo: [2, 7, 11], 9 → [0, 1].",
    "names": [
      "twoSum"
    ],
    "starter": "function twoSum(t, target) {\n  \n}\n",
    "explanation": "Para cada número se busca el complementario target - n en lo ya visto. Si está, esos dos índices son la respuesta. Si no, se guarda el número actual. Un Map da la búsqueda en tiempo medio constante, frente a dos bucles. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Map de valor a índice, un solo recorrido",
    "javascript": "function twoSum(t, target) {\n  const seen = new Map()\n  for (let i = 0; i < t.length; i++) {\n    const need = target - t[i]\n    if (seen.has(need)) return [seen.get(need), i]\n    seen.set(t[i], i)\n  }\n  return null\n}\n",
    "typescript": "function twoSum(t: number[], target: number): number[] | null) {\n  const seen = new Map()\n  for (let i = 0; i < t.length; i++) {\n    const need = target - t[i]\n    if (seen.has(need)) return [seen.get(need), i]\n    seen.set(t[i], i)\n  }\n  return null\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            7,
            11
          ],
          9
        ],
        "expected": [
          0,
          1
        ]
      },
      {
        "args": [
          [
            3,
            3
          ],
          6
        ],
        "expected": [
          0,
          1
        ]
      },
      {
        "args": [
          [
            1,
            2,
            3
          ],
          7
        ],
        "expected": null
      }
    ]
  },
  {
    "id": "mid-003",
    "level": "mid",
    "title": "Anagrama",
    "prompt": "Di si a y b tienen las mismas letras con las mismas repeticiones. Importan mayúsculas.\nEjemplo: \"roma\", \"amor\" → true. \"aab\", \"abb\" → false.",
    "names": [
      "isAnagram"
    ],
    "starter": "function isAnagram(a, b) {\n  \n}\n",
    "explanation": "Si las longitudes difieren, no pueden ser anagramas. Se cuenta cada letra de a y se descuenta con b. Un conteo negativo significa que b trae una letra de más. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Map de conteos",
    "javascript": "function isAnagram(a, b) {\n  if (a.length !== b.length) return false\n  const count = new Map()\n  for (const ch of a) count.set(ch, (count.get(ch) ?? 0) + 1)\n  for (const ch of b) {\n    const next = (count.get(ch) ?? 0) - 1\n    if (next < 0) return false\n    count.set(ch, next)\n  }\n  return true\n}\n",
    "typescript": "function isAnagram(a: string, b: string): boolean) {\n  if (a.length !== b.length) return false\n  const count = new Map()\n  for (const ch of a) count.set(ch, (count.get(ch) ?? 0) + 1)\n  for (const ch of b) {\n    const next = (count.get(ch) ?? 0) - 1\n    if (next < 0) return false\n    count.set(ch, next)\n  }\n  return true\n}\n",
    "cases": [
      {
        "args": [
          "roma",
          "amor"
        ],
        "expected": true
      },
      {
        "args": [
          "aab",
          "abb"
        ],
        "expected": false
      },
      {
        "args": [
          "ab",
          "abc"
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "mid-004",
    "level": "mid",
    "title": "Agrupar anagramas",
    "prompt": "Agrupa las palabras que son anagramas. El orden de los grupos es el de la primera palabra de cada uno. Dentro del grupo, el orden de entrada.\nEjemplo: [\"eat\", \"tea\", \"tan\", \"bat\"] → [[\"eat\", \"tea\"], [\"tan\"], [\"bat\"]].",
    "names": [
      "groupAnagrams"
    ],
    "starter": "function groupAnagrams(words) {\n  \n}\n",
    "explanation": "Dos anagramas, al ordenar sus letras, producen la misma clave. Se meten en la lista de esa clave. Las claves salen en orden de aparición porque Map conserva la inserción. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Map cuya clave es la palabra ordenada",
    "javascript": "function groupAnagrams(words) {\n  const groups = new Map()\n  for (const word of words) {\n    const key = word.split('').sort().join('')\n    const list = groups.get(key) ?? []\n    list.push(word)\n    groups.set(key, list)\n  }\n  return [...groups.values()]\n}\n",
    "typescript": "function groupAnagrams(words: string[]): string[][]) {\n  const groups = new Map()\n  for (const word of words) {\n    const key = word.split('').sort().join('')\n    const list = groups.get(key) ?? []\n    list.push(word)\n    groups.set(key, list)\n  }\n  return [...groups.values()]\n}\n",
    "cases": [
      {
        "args": [
          [
            "eat",
            "tea",
            "tan",
            "bat"
          ]
        ],
        "expected": [
          [
            "eat",
            "tea"
          ],
          [
            "tan"
          ],
          [
            "bat"
          ]
        ]
      },
      {
        "args": [
          []
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "mid-005",
    "level": "mid",
    "title": "Aplanar un nivel",
    "prompt": "Aplana solo un nivel. Un array dentro de un array interior se queda como array.\nEjemplo: [[1, 2], [3], 4] → [1, 2, 3, 4]. [1, [2, [3]]] → [1, 2, [3]].",
    "names": [
      "flattenOnce"
    ],
    "starter": "function flattenOnce(t) {\n  \n}\n",
    "explanation": "Si el elemento es un array, se copian sus hijos. Si no, se copia el elemento. No se vuelve a mirar si esos hijos son arrays: por eso es un solo nivel. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Array.isArray y un bucle",
    "javascript": "function flattenOnce(t) {\n  const out = []\n  for (const item of t) {\n    if (Array.isArray(item)) {\n      for (const inner of item) out.push(inner)\n    } else out.push(item)\n  }\n  return out\n}\n",
    "typescript": "function flattenOnce(t: unknown[]): unknown[]) {\n  const out = []\n  for (const item of t) {\n    if (Array.isArray(item)) {\n      for (const inner of item) out.push(inner)\n    } else out.push(item)\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              1,
              2
            ],
            [
              3
            ],
            4
          ]
        ],
        "expected": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "args": [
          [
            1,
            [
              2,
              [
                3
              ]
            ]
          ]
        ],
        "expected": [
          1,
          2,
          [
            3
          ]
        ]
      }
    ]
  },
  {
    "id": "mid-006",
    "level": "mid",
    "title": "Aplanar del todo",
    "prompt": "Aplana todos los niveles de arrays.\nEjemplo: [1, [2, [3]], 4] → [1, 2, 3, 4].",
    "names": [
      "flattenDeep"
    ],
    "starter": "function flattenDeep(t) {\n  \n}\n",
    "explanation": "Si el valor es un array, se aplana cada hijo. Si no, es una hoja y se guarda. La recursión baja hasta que ya no quedan arrays. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "recursión y Array.isArray",
    "javascript": "function flattenDeep(t) {\n  const out = []\n  function walk(value) {\n    if (Array.isArray(value)) {\n      for (const item of value) walk(item)\n    } else out.push(value)\n  }\n  walk(t)\n  return out\n}\n",
    "typescript": "function flattenDeep(t: unknown[]): unknown[]) {\n  const out = []\n  function walk(value) {\n    if (Array.isArray(value)) {\n      for (const item of value) walk(item)\n    } else out.push(value)\n  }\n  walk(t)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            [
              2,
              [
                3
              ]
            ],
            4
          ]
        ],
        "expected": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "args": [
          []
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "mid-007",
    "level": "mid",
    "title": "Trocear",
    "prompt": "Parte t en trozos de size. El último puede ser más corto. size es al menos 1.\nEjemplo: [1, 2, 3, 4, 5], 2 → [[1, 2], [3, 4], [5]].",
    "names": [
      "chunk"
    ],
    "starter": "function chunk(t, size) {\n  \n}\n",
    "explanation": "El índice salta de size en size. slice(i, i + size) corta sin pasarse del final, así que el último trozo sale más corto solo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle con paso size y slice",
    "javascript": "function chunk(t, size) {\n  const out = []\n  for (let i = 0; i < t.length; i += size) out.push(t.slice(i, i + size))\n  return out\n}\n",
    "typescript": "function chunk(t: number[], size: number): number[][]) {\n  const out = []\n  for (let i = 0; i < t.length; i += size) out.push(t.slice(i, i + size))\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3,
            4,
            5
          ],
          2
        ],
        "expected": [
          [
            1,
            2
          ],
          [
            3,
            4
          ],
          [
            5
          ]
        ]
      },
      {
        "args": [
          [
            1,
            2
          ],
          5
        ],
        "expected": [
          [
            1,
            2
          ]
        ]
      }
    ]
  },
  {
    "id": "mid-008",
    "level": "mid",
    "title": "Intersección",
    "prompt": "Devuelve los valores que están en a y en b, sin repetir, en el orden de a.\nEjemplo: [1, 2, 2, 3], [2, 4, 2] → [2].",
    "names": [
      "intersection"
    ],
    "starter": "function intersection(a, b) {\n  \n}\n",
    "explanation": "El Set de b responde en tiempo medio constante si un valor de a existe. El segundo Set evita devolver dos veces un valor que se repite en a. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos Set",
    "javascript": "function intersection(a, b) {\n  const set = new Set(b)\n  const out = []\n  const seen = new Set()\n  for (const n of a) {\n    if (set.has(n) && !seen.has(n)) {\n      seen.add(n)\n      out.push(n)\n    }\n  }\n  return out\n}\n",
    "typescript": "function intersection(a: number[], b: number[]): number[]) {\n  const set = new Set(b)\n  const out = []\n  const seen = new Set()\n  for (const n of a) {\n    if (set.has(n) && !seen.has(n)) {\n      seen.add(n)\n      out.push(n)\n    }\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            2,
            3
          ],
          [
            2,
            4,
            2
          ]
        ],
        "expected": [
          2
        ]
      },
      {
        "args": [
          [
            1
          ],
          [
            2
          ]
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "mid-009",
    "level": "mid",
    "title": "Diferencia",
    "prompt": "Devuelve los valores de a que no están en b, sin repetir, en el orden de a.\nEjemplo: [1, 2, 2, 3], [2] → [1, 3].",
    "names": [
      "difference"
    ],
    "starter": "function difference(a, b) {\n  \n}\n",
    "explanation": "Se recorre a. Si el valor no está en b y no se ha emitido ya, entra en el resultado. b solo sirve de consulta. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Set de b y Set de lo ya emitido",
    "javascript": "function difference(a, b) {\n  const set = new Set(b)\n  const out = []\n  const seen = new Set()\n  for (const n of a) {\n    if (!set.has(n) && !seen.has(n)) {\n      seen.add(n)\n      out.push(n)\n    }\n  }\n  return out\n}\n",
    "typescript": "function difference(a: number[], b: number[]): number[]) {\n  const set = new Set(b)\n  const out = []\n  const seen = new Set()\n  for (const n of a) {\n    if (!set.has(n) && !seen.has(n)) {\n      seen.add(n)\n      out.push(n)\n    }\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            2,
            3
          ],
          [
            2
          ]
        ],
        "expected": [
          1,
          3
        ]
      },
      {
        "args": [
          [
            1,
            2
          ],
          []
        ],
        "expected": [
          1,
          2
        ]
      }
    ]
  },
  {
    "id": "mid-010",
    "level": "mid",
    "title": "Unión",
    "prompt": "Devuelve los valores de a y luego los de b que aún no estaban, sin repetir.\nEjemplo: [1, 2, 2], [2, 3] → [1, 2, 3].",
    "names": [
      "union"
    ],
    "starter": "function union(a, b) {\n  \n}\n",
    "explanation": "Se recorre a y después b. El Set recuerda lo ya añadido, así que la primera aparición gana y el orden se conserva. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "concat y un Set de vistos",
    "javascript": "function union(a, b) {\n  const out = []\n  const seen = new Set()\n  for (const n of a.concat(b)) {\n    if (!seen.has(n)) {\n      seen.add(n)\n      out.push(n)\n    }\n  }\n  return out\n}\n",
    "typescript": "function union(a: number[], b: number[]): number[]) {\n  const out = []\n  const seen = new Set()\n  for (const n of a.concat(b)) {\n    if (!seen.has(n)) {\n      seen.add(n)\n      out.push(n)\n    }\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            2
          ],
          [
            2,
            3
          ]
        ],
        "expected": [
          1,
          2,
          3
        ]
      },
      {
        "args": [
          [],
          [
            4,
            4
          ]
        ],
        "expected": [
          4
        ]
      }
    ]
  },
  {
    "id": "mid-011",
    "level": "mid",
    "title": "Frecuencias",
    "prompt": "Devuelve un objeto con cuántas veces aparece cada número. Las claves salen en orden de aparición.\nEjemplo: [3, 1, 3] → { \"3\": 2, \"1\": 1 }.",
    "names": [
      "frequency"
    ],
    "starter": "function frequency(t) {\n  \n}\n",
    "explanation": "Las claves de un objeto son strings, aunque el array sea de números. Cada valor suma 1 a su contador. El orden de inserción de las claves es el de la primera vez que aparecen. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "objeto como mapa y el operador ??",
    "javascript": "function frequency(t) {\n  const out = {}\n  for (const n of t) out[n] = (out[n] ?? 0) + 1\n  return out\n}\n",
    "typescript": "function frequency(t: number[]): Record<string, number>) {\n  const out = {}\n  for (const n of t) out[n] = (out[n] ?? 0) + 1\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            1,
            3
          ]
        ],
        "expected": {
          "1": 1,
          "3": 2
        }
      },
      {
        "args": [
          []
        ],
        "expected": {}
      }
    ]
  },
  {
    "id": "mid-012",
    "level": "mid",
    "title": "El más frecuente",
    "prompt": "Devuelve el número que más se repite. t no está vacío. Si empatan, el que llegó antes a ese conteo.\nEjemplo: [1, 2, 2, 1] → 2. [1, 1, 2, 2] → 1.",
    "names": [
      "mostFrequent"
    ],
    "starter": "function mostFrequent(t) {\n  \n}\n",
    "explanation": "Se incrementa el conteo de cada valor. Solo se cambia el ganador si el nuevo conteo es mayor, no si empata. Por eso el que alcanzó antes esa cifra se queda. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Map de conteos y una comparación estricta",
    "javascript": "function mostFrequent(t) {\n  const count = new Map()\n  let best = t[0]\n  let times = 0\n  for (const n of t) {\n    const next = (count.get(n) ?? 0) + 1\n    count.set(n, next)\n    if (next > times) {\n      times = next\n      best = n\n    }\n  }\n  return best\n}\n",
    "typescript": "function mostFrequent(t: number[]): number) {\n  const count = new Map()\n  let best = t[0]\n  let times = 0\n  for (const n of t) {\n    const next = (count.get(n) ?? 0) + 1\n    count.set(n, next)\n    if (next > times) {\n      times = next\n      best = n\n    }\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            2,
            1
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            1,
            1,
            2,
            2
          ]
        ],
        "expected": 1
      },
      {
        "args": [
          [
            7
          ]
        ],
        "expected": 7
      }
    ]
  },
  {
    "id": "mid-013",
    "level": "mid",
    "title": "Primera letra única",
    "prompt": "Devuelve el índice de la primera letra que aparece una sola vez, o -1.\nEjemplo: \"leetcode\" → 0. \"aabb\" → -1. \"loveleetcode\" → 2.",
    "names": [
      "firstUniqueChar"
    ],
    "starter": "function firstUniqueChar(text) {\n  \n}\n",
    "explanation": "El primer recorrido cuenta. El segundo busca el primer índice cuyo conteo es 1. Hacen falta los dos: durante el primero todavía no se sabe si la letra se repetirá. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Map de conteos y un segundo recorrido",
    "javascript": "function firstUniqueChar(text) {\n  const count = new Map()\n  for (const ch of text) count.set(ch, (count.get(ch) ?? 0) + 1)\n  for (let i = 0; i < text.length; i++) if (count.get(text[i]) === 1) return i\n  return -1\n}\n",
    "typescript": "function firstUniqueChar(text: string): number) {\n  const count = new Map()\n  for (const ch of text) count.set(ch, (count.get(ch) ?? 0) + 1)\n  for (let i = 0; i < text.length; i++) if (count.get(text[i]) === 1) return i\n  return -1\n}\n",
    "cases": [
      {
        "args": [
          "leetcode"
        ],
        "expected": 0
      },
      {
        "args": [
          "aabb"
        ],
        "expected": -1
      },
      {
        "args": [
          "loveleetcode"
        ],
        "expected": 2
      }
    ]
  },
  {
    "id": "mid-014",
    "level": "mid",
    "title": "Paréntesis válidos",
    "prompt": "Di si (), [] y {} están bien cerrados y en orden. Otros caracteres se ignoran.\nEjemplo: \"([])\" → true. \"([)]\" → false. \"\" → true.",
    "names": [
      "validParentheses"
    ],
    "starter": "function validParentheses(text) {\n  \n}\n",
    "explanation": "Cada apertura se apila. Cada cierre tiene que coincidir con la cima: lo último que se abrió es lo primero que se cierra. Al final la pila debe quedar vacía, si no quedó algo sin cerrar. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "pila",
    "javascript": "function validParentheses(text) {\n  const pairs = { ')': '(', ']': '[', '}': '{' }\n  const stack = []\n  for (const ch of text) {\n    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch)\n    else if (pairs[ch]) {\n      if (stack.pop() !== pairs[ch]) return false\n    }\n  }\n  return stack.length === 0\n}\n",
    "typescript": "function validParentheses(text: string): boolean) {\n  const pairs = { ')': '(', ']': '[', '}': '{' }\n  const stack = []\n  for (const ch of text) {\n    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch)\n    else if (pairs[ch]) {\n      if (stack.pop() !== pairs[ch]) return false\n    }\n  }\n  return stack.length === 0\n}\n",
    "cases": [
      {
        "args": [
          "([])"
        ],
        "expected": true
      },
      {
        "args": [
          "([)]"
        ],
        "expected": false
      },
      {
        "args": [
          ""
        ],
        "expected": true
      },
      {
        "args": [
          "("
        ],
        "expected": false
      },
      {
        "args": [
          "a(b)c"
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-015",
    "level": "mid",
    "title": "Comprimir repeticiones",
    "prompt": "Comprime las rachas. Una letra sola no lleva número.\nEjemplo: \"aaabbc\" → \"a3b2c\". \"abc\" → \"abc\". \"\" → \"\".",
    "names": [
      "compressRle"
    ],
    "starter": "function compressRle(text) {\n  \n}\n",
    "explanation": "Se cuenta mientras el carácter sea el mismo que el anterior. Al cambiar, se vuelca la letra y, si la racha es mayor que 1, el número. El bucle llega una posición más allá del final para volcar la última racha. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un contador de racha y un bucle hasta length inclusive",
    "javascript": "function compressRle(text) {\n  if (!text) return ''\n  let out = ''\n  let count = 1\n  for (let i = 1; i <= text.length; i++) {\n    if (text[i] === text[i - 1]) count++\n    else {\n      out += text[i - 1] + (count > 1 ? String(count) : \"\")\n      count = 1\n    }\n  }\n  return out\n}\n",
    "typescript": "function compressRle(text: string): string) {\n  if (!text) return ''\n  let out = ''\n  let count = 1\n  for (let i = 1; i <= text.length; i++) {\n    if (text[i] === text[i - 1]) count++\n    else {\n      out += text[i - 1] + (count > 1 ? String(count) : \"\")\n      count = 1\n    }\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "aaabbc"
        ],
        "expected": "a3b2c"
      },
      {
        "args": [
          "abc"
        ],
        "expected": "abc"
      },
      {
        "args": [
          ""
        ],
        "expected": ""
      },
      {
        "args": [
          "aaaa"
        ],
        "expected": "a4"
      }
    ]
  },
  {
    "id": "mid-016",
    "level": "mid",
    "title": "Prefijo común",
    "prompt": "Devuelve el prefijo más largo compartido por todas las palabras. Si no hay palabras, \"\".\nEjemplo: [\"flor\", \"flujo\", \"florista\"] → \"fl\".",
    "names": [
      "longestCommonPrefix"
    ],
    "starter": "function longestCommonPrefix(words) {\n  \n}\n",
    "explanation": "Se toma la primera palabra como candidato. Mientras la siguiente no empiece por ese candidato, se le quita la última letra. Al final sobrevive solo lo común. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un candidato que se acorta con slice y startsWith",
    "javascript": "function longestCommonPrefix(words) {\n  if (words.length === 0) return ''\n  let prefix = words[0]\n  for (const word of words) {\n    while (!word.startsWith(prefix)) prefix = prefix.slice(0, -1)\n  }\n  return prefix\n}\n",
    "typescript": "function longestCommonPrefix(words: string[]): string) {\n  if (words.length === 0) return ''\n  let prefix = words[0]\n  for (const word of words) {\n    while (!word.startsWith(prefix)) prefix = prefix.slice(0, -1)\n  }\n  return prefix\n}\n",
    "cases": [
      {
        "args": [
          [
            "flor",
            "flujo",
            "florista"
          ]
        ],
        "expected": "fl"
      },
      {
        "args": [
          [
            "a",
            "b"
          ]
        ],
        "expected": ""
      },
      {
        "args": [
          []
        ],
        "expected": ""
      }
    ]
  },
  {
    "id": "mid-017",
    "level": "mid",
    "title": "Ceros al final",
    "prompt": "Devuelve un array nuevo con los no ceros en el mismo orden y los ceros al final.\nEjemplo: [0, 1, 0, 3] → [1, 3, 0, 0].",
    "names": [
      "moveZeroes"
    ],
    "starter": "function moveZeroes(t) {\n  \n}\n",
    "explanation": "Primero se copian los valores distintos de cero, conservando el orden. Después se añaden ceros hasta recuperar la longitud original. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos pasadas: copiar no ceros y rellenar ceros",
    "javascript": "function moveZeroes(t) {\n  const out = []\n  for (const n of t) if (n !== 0) out.push(n)\n  while (out.length < t.length) out.push(0)\n  return out\n}\n",
    "typescript": "function moveZeroes(t: number[]): number[]) {\n  const out = []\n  for (const n of t) if (n !== 0) out.push(n)\n  while (out.length < t.length) out.push(0)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            0,
            1,
            0,
            3
          ]
        ],
        "expected": [
          1,
          3,
          0,
          0
        ]
      },
      {
        "args": [
          [
            1,
            2
          ]
        ],
        "expected": [
          1,
          2
        ]
      }
    ]
  },
  {
    "id": "mid-018",
    "level": "mid",
    "title": "Sumar uno",
    "prompt": "digits es un número grande, una cifra por posición, sin ceros a la izquierda salvo el propio 0. Devuelve ese número más 1, en el mismo formato.\nEjemplo: [1, 2, 9] → [1, 3, 0]. [9, 9] → [1, 0, 0].",
    "names": [
      "plusOne"
    ],
    "starter": "function plusOne(digits) {\n  \n}\n",
    "explanation": "Se suma 1 a la última cifra. Si no es 9, se acaba. Si es 9, pasa a 0 y el acarreo sigue hacia la izquierda. Si todas eran 9, hay que añadir un 1 delante. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "recorrido desde el final y acarreo",
    "javascript": "function plusOne(digits) {\n  const out = digits.slice()\n  for (let i = out.length - 1; i >= 0; i--) {\n    if (out[i] < 9) {\n      out[i]++\n      return out\n    }\n    out[i] = 0\n  }\n  out.unshift(1)\n  return out\n}\n",
    "typescript": "function plusOne(digits: number[]): number[]) {\n  const out = digits.slice()\n  for (let i = out.length - 1; i >= 0; i--) {\n    if (out[i] < 9) {\n      out[i]++\n      return out\n    }\n    out[i] = 0\n  }\n  out.unshift(1)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            9
          ]
        ],
        "expected": [
          1,
          3,
          0
        ]
      },
      {
        "args": [
          [
            9,
            9
          ]
        ],
        "expected": [
          1,
          0,
          0
        ]
      },
      {
        "args": [
          [
            0
          ]
        ],
        "expected": [
          1
        ]
      }
    ]
  },
  {
    "id": "mid-019",
    "level": "mid",
    "title": "El que no se repite",
    "prompt": "Todos los números aparecen dos veces menos uno, que aparece una. Devuélvelo.\nEjemplo: [4, 1, 2, 1, 2] → 4.",
    "names": [
      "singleNumber"
    ],
    "starter": "function singleNumber(t) {\n  \n}\n",
    "explanation": "XOR de un número consigo mismo es 0, y XOR con 0 es el propio número. Al mezclar todos, las parejas se anulan y queda el que estaba solo. Es lineal y no usa memoria extra. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "XOR, el operador ^",
    "javascript": "function singleNumber(t) {\n  let acc = 0\n  for (const n of t) acc ^= n\n  return acc\n}\n",
    "typescript": "function singleNumber(t: number[]): number) {\n  let acc = 0\n  for (const n of t) acc ^= n\n  return acc\n}\n",
    "cases": [
      {
        "args": [
          [
            4,
            1,
            2,
            1,
            2
          ]
        ],
        "expected": 4
      },
      {
        "args": [
          [
            7
          ]
        ],
        "expected": 7
      }
    ]
  },
  {
    "id": "mid-020",
    "level": "mid",
    "title": "Número que falta",
    "prompt": "t contiene n números distintos tomados de 0 a n, y falta uno. Devuélvelo. n es t.length.\nEjemplo: [3, 0, 1] → 2.",
    "names": [
      "missingNumber"
    ],
    "starter": "function missingNumber(t) {\n  \n}\n",
    "explanation": "La suma de 0 a n es n * (n + 1) / 2. Si se restan los valores que sí están, lo que queda es el que falta. También valdría un Set, con más memoria. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "la suma de Gauss  n * (n + 1) / 2",
    "javascript": "function missingNumber(t) {\n  const n = t.length\n  let total = (n * (n + 1)) / 2\n  for (const value of t) total -= value\n  return total\n}\n",
    "typescript": "function missingNumber(t: number[]): number) {\n  const n = t.length\n  let total = (n * (n + 1)) / 2\n  for (const value of t) total -= value\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            0,
            1
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            0,
            1
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            1
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "mid-021",
    "level": "mid",
    "title": "¿Hay duplicado?",
    "prompt": "Di si algún número aparece más de una vez.\nEjemplo: [1, 2, 3, 1] → true. [1, 2, 3] → false.",
    "names": [
      "containsDuplicate"
    ],
    "starter": "function containsDuplicate(t) {\n  \n}\n",
    "explanation": "Un Set guarda cada valor una sola vez. Si el Set es más pequeño que el array, algo se repitió. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Set y comparar tamaños",
    "javascript": "function containsDuplicate(t) {\n  return new Set(t).size !== t.length\n}\n",
    "typescript": "function containsDuplicate(t: number[]): boolean) {\n  return new Set(t).size !== t.length\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3,
            1
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": false
      },
      {
        "args": [
          []
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "mid-022",
    "level": "mid",
    "title": "Two sum ordenado",
    "prompt": "t está ordenado de menor a mayor. Devuelve dos índices distintos que suman target, o null.\nEjemplo: [1, 2, 4, 6], 6 → [1, 2].",
    "names": [
      "twoSumSorted"
    ],
    "starter": "function twoSumSorted(t, target) {\n  \n}\n",
    "explanation": "Como está ordenado, si la suma se pasa se baja el extremo derecho, y si se queda corta se sube el izquierdo. No hace falta un Map: el orden da la dirección. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos punteros, uno a cada extremo",
    "javascript": "function twoSumSorted(t, target) {\n  let i = 0\n  let j = t.length - 1\n  while (i < j) {\n    const sum = t[i] + t[j]\n    if (sum === target) return [i, j]\n    if (sum < target) i++\n    else j--\n  }\n  return null\n}\n",
    "typescript": "function twoSumSorted(t: number[], target: number): number[] | null) {\n  let i = 0\n  let j = t.length - 1\n  while (i < j) {\n    const sum = t[i] + t[j]\n    if (sum === target) return [i, j]\n    if (sum < target) i++\n    else j--\n  }\n  return null\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            4,
            6
          ],
          6
        ],
        "expected": [
          1,
          2
        ]
      },
      {
        "args": [
          [
            1,
            2,
            3
          ],
          10
        ],
        "expected": null
      }
    ]
  },
  {
    "id": "mid-023",
    "level": "mid",
    "title": "Subarray de suma máxima",
    "prompt": "Devuelve la suma máxima de un subarray contiguo. t no está vacío y puede tener negativos.\nEjemplo: [-2, 1, -3, 4, -1, 2, 1, -5, 4] → 6.",
    "names": [
      "maxSubarraySum"
    ],
    "starter": "function maxSubarraySum(t) {\n  \n}\n",
    "explanation": "En cada posición se elige entre empezar de nuevo en ese número o alargar la suma anterior. El máximo de esas decisiones es la respuesta. Es lineal y no prueba todos los subarrays. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Kadane: la mejor suma que termina en cada posición",
    "javascript": "function maxSubarraySum(t) {\n  let best = t[0]\n  let current = t[0]\n  for (let i = 1; i < t.length; i++) {\n    current = current + t[i] > t[i] ? current + t[i] : t[i]\n    if (current > best) best = current\n  }\n  return best\n}\n",
    "typescript": "function maxSubarraySum(t: number[]): number) {\n  let best = t[0]\n  let current = t[0]\n  for (let i = 1; i < t.length; i++) {\n    current = current + t[i] > t[i] ? current + t[i] : t[i]\n    if (current > best) best = current\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          [
            -2,
            1,
            -3,
            4,
            -1,
            2,
            1,
            -5,
            4
          ]
        ],
        "expected": 6
      },
      {
        "args": [
          [
            -3,
            -1,
            -2
          ]
        ],
        "expected": -1
      },
      {
        "args": [
          [
            5
          ]
        ],
        "expected": 5
      }
    ]
  },
  {
    "id": "mid-024",
    "level": "mid",
    "title": "Mejor momento para vender",
    "prompt": "prices[i] es el precio el día i. Una compra y una venta, la venta después. Devuelve el máximo beneficio, o 0 si no hay.\nEjemplo: [7, 1, 5, 3, 6, 4] → 5.",
    "names": [
      "maxProfit"
    ],
    "starter": "function maxProfit(prices) {\n  \n}\n",
    "explanation": "No se puede vender antes de comprar. Se guarda el precio más bajo visto y, cada día, se mira la ganancia si se vendiera hoy. El mejor de esos beneficios es la respuesta. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el mínimo visto hasta ahora y un bucle",
    "javascript": "function maxProfit(prices) {\n  let best = 0\n  let low = prices[0]\n  for (const price of prices) {\n    if (price < low) low = price\n    const gain = price - low\n    if (gain > best) best = gain\n  }\n  return best\n}\n",
    "typescript": "function maxProfit(prices: number[]): number) {\n  let best = 0\n  let low = prices[0]\n  for (const price of prices) {\n    if (price < low) low = price\n    const gain = price - low\n    if (gain > best) best = gain\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          [
            7,
            1,
            5,
            3,
            6,
            4
          ]
        ],
        "expected": 5
      },
      {
        "args": [
          [
            7,
            6,
            4
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "mid-025",
    "level": "mid",
    "title": "Subir escaleras",
    "prompt": "Para subir n escalones se puede avanzar 1 o 2. ¿De cuántas formas? n es al menos 1.\nEjemplo: 3 → 3. 5 → 8.",
    "names": [
      "climbStairs"
    ],
    "starter": "function climbStairs(n) {\n  \n}\n",
    "explanation": "Las formas de llegar al escalón i son las de llegar a i-1 (y subir 1) más las de llegar a i-2 (y subir 2). No hace falta guardar todo el array: bastan los dos anteriores. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica con dos variables, la sucesión de Fibonacci",
    "javascript": "function climbStairs(n) {\n  if (n <= 2) return n\n  let a = 1\n  let b = 2\n  for (let i = 3; i <= n; i++) {\n    const next = a + b\n    a = b\n    b = next\n  }\n  return b\n}\n",
    "typescript": "function climbStairs(n: number): number) {\n  if (n <= 2) return n\n  let a = 1\n  let b = 2\n  for (let i = 3; i <= n; i++) {\n    const next = a + b\n    a = b\n    b = next\n  }\n  return b\n}\n",
    "cases": [
      {
        "args": [
          1
        ],
        "expected": 1
      },
      {
        "args": [
          2
        ],
        "expected": 2
      },
      {
        "args": [
          3
        ],
        "expected": 3
      },
      {
        "args": [
          5
        ],
        "expected": 8
      }
    ]
  },
  {
    "id": "mid-026",
    "level": "mid",
    "title": "Robar casas",
    "prompt": "t[i] es el dinero de la casa i. No se pueden robar dos casas seguidas. Devuelve el máximo. El array puede estar vacío.\nEjemplo: [1, 2, 3, 1] → 4. [2, 7, 9, 3, 1] → 12.",
    "names": [
      "houseRobber"
    ],
    "starter": "function houseRobber(t) {\n  \n}\n",
    "explanation": "En cada casa se elige el máximo entre no robarla (se queda lo anterior) o robarla (lo de dos casas atrás más esta). Se avanza con dos variables, sin guardar toda la tabla. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica: mejor hasta la casa anterior y hasta la de antes",
    "javascript": "function houseRobber(t) {\n  let prev = 0\n  let curr = 0\n  for (const n of t) {\n    const next = curr > prev + n ? curr : prev + n\n    prev = curr\n    curr = next\n  }\n  return curr\n}\n",
    "typescript": "function houseRobber(t: number[]): number) {\n  let prev = 0\n  let curr = 0\n  for (const n of t) {\n    const next = curr > prev + n ? curr : prev + n\n    prev = curr\n    curr = next\n  }\n  return curr\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3,
            1
          ]
        ],
        "expected": 4
      },
      {
        "args": [
          [
            2,
            7,
            9,
            3,
            1
          ]
        ],
        "expected": 12
      },
      {
        "args": [
          []
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "mid-027",
    "level": "mid",
    "title": "Fibonacci",
    "prompt": "Devuelve el término n de Fibonacci. fib(0) es 0, fib(1) es 1, y cada uno es la suma de los dos anteriores. n es 0 o más.\nEjemplo: 6 → 8.",
    "names": [
      "fib"
    ],
    "starter": "function fib(n) {\n  \n}\n",
    "explanation": "La versión recursiva repite los mismos cálculos. El bucle guarda solo los dos últimos términos y avanza hasta n. El coste es lineal y la memoria, constante. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle con dos variables, sin recursión",
    "javascript": "function fib(n) {\n  if (n <= 1) return n\n  let a = 0\n  let b = 1\n  for (let i = 2; i <= n; i++) {\n    const next = a + b\n    a = b\n    b = next\n  }\n  return b\n}\n",
    "typescript": "function fib(n: number): number) {\n  if (n <= 1) return n\n  let a = 0\n  let b = 1\n  for (let i = 2; i <= n; i++) {\n    const next = a + b\n    a = b\n    b = next\n  }\n  return b\n}\n",
    "cases": [
      {
        "args": [
          0
        ],
        "expected": 0
      },
      {
        "args": [
          1
        ],
        "expected": 1
      },
      {
        "args": [
          6
        ],
        "expected": 8
      }
    ]
  },
  {
    "id": "mid-028",
    "level": "mid",
    "title": "Búsqueda binaria",
    "prompt": "t está ordenado de menor a mayor. Devuelve un índice de target, o -1.\nEjemplo: [1, 3, 5, 7], 5 → 2.",
    "names": [
      "binarySearch"
    ],
    "starter": "function binarySearch(t, target) {\n  \n}\n",
    "explanation": "En cada paso se mira el centro del tramo que queda. Si el centro es menor, el objetivo está a la derecha; si es mayor, a la izquierda. El tramo se parte por la mitad, así que el coste es logarítmico. Solo funciona porque el array está ordenado. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos límites y el punto medio",
    "javascript": "function binarySearch(t, target) {\n  let low = 0\n  let high = t.length - 1\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2)\n    if (t[mid] === target) return mid\n    if (t[mid] < target) low = mid + 1\n    else high = mid - 1\n  }\n  return -1\n}\n",
    "typescript": "function binarySearch(t: number[], target: number): number) {\n  let low = 0\n  let high = t.length - 1\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2)\n    if (t[mid] === target) return mid\n    if (t[mid] < target) low = mid + 1\n    else high = mid - 1\n  }\n  return -1\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            3,
            5,
            7
          ],
          5
        ],
        "expected": 2
      },
      {
        "args": [
          [
            1,
            3,
            5,
            7
          ],
          4
        ],
        "expected": -1
      },
      {
        "args": [
          [
            1
          ],
          1
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "mid-029",
    "level": "mid",
    "title": "Dónde insertar",
    "prompt": "t está ordenado y no tiene repetidos. Devuelve el índice de target, o el índice donde habría que insertarlo para que siga ordenado.\nEjemplo: [1, 3, 5], 2 → 1. [1, 3, 5], 6 → 3.",
    "names": [
      "searchInsert"
    ],
    "starter": "function searchInsert(t, target) {\n  \n}\n",
    "explanation": "El límite derecho empieza en length, no en length - 1, porque la inserción puede caer al final. Se busca el primer índice cuyo valor no es menor que target. Ese es el sitio. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "búsqueda binaria del límite inferior",
    "javascript": "function searchInsert(t, target) {\n  let low = 0\n  let high = t.length\n  while (low < high) {\n    const mid = Math.floor((low + high) / 2)\n    if (t[mid] < target) low = mid + 1\n    else high = mid\n  }\n  return low\n}\n",
    "typescript": "function searchInsert(t: number[], target: number): number) {\n  let low = 0\n  let high = t.length\n  while (low < high) {\n    const mid = Math.floor((low + high) / 2)\n    if (t[mid] < target) low = mid + 1\n    else high = mid\n  }\n  return low\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            3,
            5
          ],
          2
        ],
        "expected": 1
      },
      {
        "args": [
          [
            1,
            3,
            5
          ],
          6
        ],
        "expected": 3
      },
      {
        "args": [
          [
            1,
            3,
            5
          ],
          1
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "mid-030",
    "level": "mid",
    "title": "Fusionar intervalos",
    "prompt": "Cada intervalo es [inicio, fin], con inicio <= fin. Fusiona los que se solapan o se tocan. Devuélvelos ordenados por el inicio.\nEjemplo: [[1, 3], [2, 6], [8, 10]] → [[1, 6], [8, 10]].",
    "names": [
      "mergeIntervals"
    ],
    "starter": "function mergeIntervals(intervals) {\n  \n}\n",
    "explanation": "Ordenados por el inicio, un intervalo solo puede solaparse con el último ya fusionado. Si empieza después de que ese acabe, es uno nuevo. Si no, se alarga el fin si hace falta. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ordenar por el inicio y extender el último intervalo",
    "javascript": "function mergeIntervals(intervals) {\n  const sorted = intervals.slice().sort((a, b) => a[0] - b[0])\n  const out = []\n  for (const interval of sorted) {\n    const last = out[out.length - 1]\n    if (!last || interval[0] > last[1]) out.push(interval.slice())\n    else if (interval[1] > last[1]) last[1] = interval[1]\n  }\n  return out\n}\n",
    "typescript": "function mergeIntervals(intervals: number[][]): number[][]) {\n  const sorted = intervals.slice().sort((a, b) => a[0] - b[0])\n  const out = []\n  for (const interval of sorted) {\n    const last = out[out.length - 1]\n    if (!last || interval[0] > last[1]) out.push(interval.slice())\n    else if (interval[1] > last[1]) last[1] = interval[1]\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              1,
              3
            ],
            [
              2,
              6
            ],
            [
              8,
              10
            ]
          ]
        ],
        "expected": [
          [
            1,
            6
          ],
          [
            8,
            10
          ]
        ]
      },
      {
        "args": [
          [
            [
              1,
              4
            ],
            [
              4,
              5
            ]
          ]
        ],
        "expected": [
          [
            1,
            5
          ]
        ]
      },
      {
        "args": [
          []
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "mid-031",
    "level": "mid",
    "title": "Memoizar",
    "prompt": "Devuelve una función que llama a fn la primera vez para cada argumento numérico y, después, devuelve el resultado guardado.\nEjemplo: si fn cuenta sus llamadas, la segunda vez con el mismo número el contador no sube.",
    "names": [
      "memoize"
    ],
    "starter": "function memoize(fn) {\n  \n}\n",
    "explanation": "La función devuelta cierra sobre un Map. La clave es el argumento. Si ya está, se devuelve el valor guardado y fn no se vuelve a llamar. Sirve para cálculos puros: si fn depende de algo externo, la caché mentiría. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "closure y Map",
    "javascript": "function memoize(fn) {\n  const cache = new Map()\n  return function (arg) {\n    if (cache.has(arg)) return cache.get(arg)\n    const value = fn(arg)\n    cache.set(arg, value)\n    return value\n  }\n}\n",
    "typescript": "function memoize(fn: (arg: number) => number): (arg: number) => number {\n  const cache = new Map<number, number>()\n  return (arg) => {\n    if (cache.has(arg)) return cache.get(arg) as number\n    const value = fn(arg)\n    cache.set(arg, value)\n    return value\n  }\n}\n",
    "probe": "\nif (typeof memoize !== \"function\") throw new Error(\"Define memoize.\");\nvar calls = 0;\nvar double = memoize(function (n) { calls++; return n * 2; });\nif (double(2) !== 4 || double(2) !== 4 || calls !== 1) throw new Error(\"La segunda llamada con el mismo argumento debe salir de la caché.\");\nif (double(3) !== 6 || calls !== 2) throw new Error(\"Un argumento nuevo sí se calcula.\");\nconsole.log(\"Correcto. La caché evita repetir el cálculo.\");\n"
  },
  {
    "id": "mid-032",
    "level": "mid",
    "title": "Solo una vez",
    "prompt": "Devuelve una función que ejecuta fn solo en la primera llamada. Las demás devuelven ese mismo resultado, aunque cambien los argumentos.",
    "names": [
      "once"
    ],
    "starter": "function once(fn) {\n  \n}\n",
    "explanation": "La bandera used vive en el closure, no en la función original. La primera llamada guarda el resultado. Las siguientes ni siquiera miran los argumentos nuevos: devuelven lo guardado. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "closure, una bandera y apply",
    "javascript": "function once(fn) {\n  let used = false\n  let value\n  return function () {\n    if (used) return value\n    used = true\n    value = fn.apply(null, arguments)\n    return value\n  }\n}\n",
    "typescript": "function once(fn: (...args: string[]) => string): (...args: string[]) => string {\n  let used = false\n  let value: string\n  return (...args) => {\n    if (used) return value\n    used = true\n    value = fn(...args)\n    return value\n  }\n}\n",
    "probe": "\nif (typeof once !== \"function\") throw new Error(\"Define once.\");\nvar calls = 0;\nvar greet = once(function (name) { calls++; return \"Hola, \" + name; });\nif (greet(\"Ana\") !== \"Hola, Ana\") throw new Error(\"La primera llamada debe ejecutar la función.\");\nif (greet(\"Luis\") !== \"Hola, Ana\" || calls !== 1) throw new Error(\"Las siguientes devuelven el primer resultado sin volver a llamar.\");\nconsole.log(\"Correcto. once solo ejecuta la función una vez.\");\n"
  },
  {
    "id": "mid-033",
    "level": "mid",
    "title": "Igualdad profunda",
    "prompt": "Compara valores, arrays y objetos planos en profundidad. El orden de las claves no importa. No hay funciones ni fechas.\nEjemplo: { b: 1, a: [2] } y { a: [2], b: 1 } → true.",
    "names": [
      "deepEqual"
    ],
    "starter": "function deepEqual(a, b) {\n  \n}\n",
    "explanation": "=== basta para números, strings y null. Para objetos hay que comparar cada clave, y para arrays el orden sí importa porque las claves son los índices. La recursión baja por los anidados. JSON.stringify no sirve si las claves van en distinto orden. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "recursión, Object.keys y Array.isArray",
    "javascript": "function deepEqual(a, b) {\n  if (a === b) return true\n  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false\n  if (Array.isArray(a) !== Array.isArray(b)) return false\n  const keysA = Object.keys(a)\n  const keysB = Object.keys(b)\n  if (keysA.length !== keysB.length) return false\n  for (const key of keysA) {\n    if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEqual(a[key], b[key])) return false\n  }\n  return true\n}\n",
    "typescript": "function deepEqual(a: unknown, b: unknown): boolean) {\n  if (a === b) return true\n  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false\n  if (Array.isArray(a) !== Array.isArray(b)) return false\n  const keysA = Object.keys(a)\n  const keysB = Object.keys(b)\n  if (keysA.length !== keysB.length) return false\n  for (const key of keysA) {\n    if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEqual(a[key], b[key])) return false\n  }\n  return true\n}\n",
    "cases": [
      {
        "args": [
          {
            "b": 1,
            "a": [
              2
            ]
          },
          {
            "a": [
              2
            ],
            "b": 1
          }
        ],
        "expected": true
      },
      {
        "args": [
          [
            1,
            2
          ],
          [
            2,
            1
          ]
        ],
        "expected": false
      },
      {
        "args": [
          null,
          {}
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "mid-034",
    "level": "mid",
    "title": "Clonar en profundidad",
    "prompt": "Devuelve una copia profunda de un valor JSON: objetos planos, arrays, números, strings, booleanos y null. Cambiar la copia no cambia el original.",
    "names": [
      "deepClone"
    ],
    "starter": "function deepClone(value) {\n  \n}\n",
    "explanation": "JSON.parse(JSON.stringify(value)) clona este subconjunto, pero esconde el recorrido. Aquí cada array y cada objeto se crean de nuevo y sus hijos se clonan. Los primitivos se devuelven tal cual porque no se comparten. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "recursión, Array.isArray y Object.keys",
    "javascript": "function deepClone(value) {\n  if (typeof value !== 'object' || value === null) return value\n  if (Array.isArray(value)) return value.map((item) => deepClone(item))\n  const out = {}\n  for (const key of Object.keys(value)) out[key] = deepClone(value[key])\n  return out\n}\n",
    "typescript": "function deepClone(value: unknown): unknown) {\n  if (typeof value !== 'object' || value === null) return value\n  if (Array.isArray(value)) return value.map((item) => deepClone(item))\n  const out = {}\n  for (const key of Object.keys(value)) out[key] = deepClone(value[key])\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            {
              "a": [
                1
              ]
            }
          ]
        ],
        "expected": [
          {
            "a": [
              1
            ]
          }
        ]
      },
      {
        "args": [
          null
        ],
        "expected": null
      },
      {
        "args": [
          "hola"
        ],
        "expected": "hola"
      }
    ]
  },
  {
    "id": "mid-035",
    "level": "mid",
    "title": "Leer una ruta",
    "prompt": "Lee un valor siguiendo una ruta con puntos. Si un tramo no existe, devuelve null. La ruta vacía devuelve obj.\nEjemplo: { a: { b: 2 } }, \"a.b\" → 2. { a: 1 }, \"a.c\" → null.",
    "names": [
      "getPath"
    ],
    "starter": "function getPath(obj, path) {\n  \n}\n",
    "explanation": "Se parte la ruta por el punto. En cada tramo, si el valor actual no es un objeto o no tiene esa clave, se corta con null. Si la tiene, se baja. Así \"a.b\" es dos pasos, no una clave literal. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "split y un bucle que baja por el objeto",
    "javascript": "function getPath(obj, path) {\n  let current = obj\n  if (!path) return obj\n  for (const key of path.split('.')) {\n    if (current === null || typeof current !== 'object' || !Object.prototype.hasOwnProperty.call(current, key)) return null\n    current = current[key]\n  }\n  return current\n}\n",
    "typescript": "function getPath(obj: unknown, path: string): unknown) {\n  let current = obj\n  if (!path) return obj\n  for (const key of path.split('.')) {\n    if (current === null || typeof current !== 'object' || !Object.prototype.hasOwnProperty.call(current, key)) return null\n    current = current[key]\n  }\n  return current\n}\n",
    "cases": [
      {
        "args": [
          {
            "a": {
              "b": 2
            }
          },
          "a.b"
        ],
        "expected": 2
      },
      {
        "args": [
          {
            "a": 1
          },
          "a.c"
        ],
        "expected": null
      },
      {
        "args": [
          {
            "a": 1
          },
          ""
        ],
        "expected": {
          "a": 1
        }
      }
    ]
  },
  {
    "id": "mid-036",
    "level": "mid",
    "title": "Agrupar por clave",
    "prompt": "Agrupa los objetos por el valor de key. Las claves del resultado salen en orden de aparición.\nEjemplo: [{ t: \"a\", n: \"1\" }, { t: \"b\", n: \"2\" }, { t: \"a\", n: \"3\" }], \"t\" → grupos a y b.",
    "names": [
      "groupBy"
    ],
    "starter": "function groupBy(items, key) {\n  \n}\n",
    "explanation": "Cada objeto cae en la lista de su grupo. Si la lista no existe, se crea. El orden dentro del grupo es el de entrada, y el de las claves es el de la primera vez que aparece ese grupo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "objeto de arrays",
    "javascript": "function groupBy(items, key) {\n  const out = {}\n  for (const item of items) {\n    const group = item[key]\n    if (!out[group]) out[group] = []\n    out[group].push(item)\n  }\n  return out\n}\n",
    "typescript": "function groupBy(items: Array<Record<string, string>>, key: string): Record<string, Array<Record<string, string>>>) {\n  const out = {}\n  for (const item of items) {\n    const group = item[key]\n    if (!out[group]) out[group] = []\n    out[group].push(item)\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            {
              "t": "a",
              "n": "1"
            },
            {
              "t": "b",
              "n": "2"
            },
            {
              "t": "a",
              "n": "3"
            }
          ],
          "t"
        ],
        "expected": {
          "a": [
            {
              "t": "a",
              "n": "1"
            },
            {
              "t": "a",
              "n": "3"
            }
          ],
          "b": [
            {
              "t": "b",
              "n": "2"
            }
          ]
        }
      }
    ]
  },
  {
    "id": "mid-037",
    "level": "mid",
    "title": "Partir por un umbral",
    "prompt": "Devuelve dos arrays: los valores >= min y los demás, cada uno en el orden original.\nEjemplo: [1, 4, 2, 5], 3 → [[4, 5], [1, 2]].",
    "names": [
      "partition"
    ],
    "starter": "function partition(t, min) {\n  \n}\n",
    "explanation": "Un predicado de función no viaja bien en los casos de prueba, así que el corte es un número. Cada elemento va a un lado o al otro, sin reordenar dentro del lado. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos arrays y un if",
    "javascript": "function partition(t, min) {\n  const yes = []\n  const no = []\n  for (const n of t) {\n    if (n >= min) yes.push(n)\n    else no.push(n)\n  }\n  return [yes, no]\n}\n",
    "typescript": "function partition(t: number[], min: number): number[][]) {\n  const yes = []\n  const no = []\n  for (const n of t) {\n    if (n >= min) yes.push(n)\n    else no.push(n)\n  }\n  return [yes, no]\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            4,
            2,
            5
          ],
          3
        ],
        "expected": [
          [
            4,
            5
          ],
          [
            1,
            2
          ]
        ]
      },
      {
        "args": [
          [
            1
          ],
          3
        ],
        "expected": [
          [],
          [
            1
          ]
        ]
      }
    ]
  },
  {
    "id": "mid-038",
    "level": "mid",
    "title": "Emparejar",
    "prompt": "Devuelve parejas [a[i], b[i]] hasta que uno de los dos se acabe.\nEjemplo: [1, 2], [\"a\", \"b\", \"c\"] → [[1, \"a\"], [2, \"b\"]].",
    "names": [
      "zip"
    ],
    "starter": "function zip(a, b) {\n  \n}\n",
    "explanation": "Igual que sumar en paralelo, pero en vez de sumar se guarda la pareja. El array más largo pierde el resto. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el mínimo de las longitudes",
    "javascript": "function zip(a, b) {\n  const out = []\n  const size = a.length < b.length ? a.length : b.length\n  for (let i = 0; i < size; i++) out.push([a[i], b[i]])\n  return out\n}\n",
    "typescript": "function zip(a: number[], b: string[]): Array<[number, string]>) {\n  const out = []\n  const size = a.length < b.length ? a.length : b.length\n  for (let i = 0; i < size; i++) out.push([a[i], b[i]])\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2
          ],
          [
            "a",
            "b",
            "c"
          ]
        ],
        "expected": [
          [
            1,
            "a"
          ],
          [
            2,
            "b"
          ]
        ]
      },
      {
        "args": [
          [],
          [
            "a"
          ]
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "mid-039",
    "level": "mid",
    "title": "Sumar un campo",
    "prompt": "Suma el campo numérico key de cada objeto.\nEjemplo: [{ n: 2 }, { n: 5 }], \"n\" → 7.",
    "names": [
      "sumBy"
    ],
    "starter": "function sumBy(items, key) {\n  \n}\n",
    "explanation": "key es el nombre del campo, no el valor. item[key] saca el número y se acumula. Si la lista está vacía, la suma es 0. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y acceso por clave",
    "javascript": "function sumBy(items, key) {\n  let total = 0\n  for (const item of items) total += item[key]\n  return total\n}\n",
    "typescript": "function sumBy(items: Array<Record<string, number>>, key: string): number) {\n  let total = 0\n  for (const item of items) total += item[key]\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            {
              "n": 2
            },
            {
              "n": 5
            }
          ],
          "n"
        ],
        "expected": 7
      },
      {
        "args": [
          [],
          "n"
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "mid-040",
    "level": "mid",
    "title": "Isograma",
    "prompt": "Di si ninguna letra se repite. Ignora mayúsculas y los caracteres que no son letras.\nEjemplo: \"lumberjack\" → true. \"hello\" → false.",
    "names": [
      "isIsogram"
    ],
    "starter": "function isIsogram(text) {\n  \n}\n",
    "explanation": "Se normaliza a minúsculas. Cada letra se mete en un Set. Si ya estaba, hay repetición. Espacios y signos no cuentan como letras. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Set y toLowerCase",
    "javascript": "function isIsogram(text) {\n  const seen = new Set()\n  for (const ch of text.toLowerCase()) {\n    if (ch < 'a' || ch > 'z') continue\n    if (seen.has(ch)) return false\n    seen.add(ch)\n  }\n  return true\n}\n",
    "typescript": "function isIsogram(text: string): boolean) {\n  const seen = new Set()\n  for (const ch of text.toLowerCase()) {\n    if (ch < 'a' || ch > 'z') continue\n    if (seen.has(ch)) return false\n    seen.add(ch)\n  }\n  return true\n}\n",
    "cases": [
      {
        "args": [
          "lumberjack"
        ],
        "expected": true
      },
      {
        "args": [
          "hello"
        ],
        "expected": false
      },
      {
        "args": [
          "Aa"
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "mid-041",
    "level": "mid",
    "title": "Romano a entero",
    "prompt": "Pasa un romano válido a entero. Si una letra menor va delante de una mayor, resta.\nEjemplo: \"MCMXCIV\" → 1994. \"IV\" → 4.",
    "names": [
      "romanToInt"
    ],
    "starter": "function romanToInt(text) {\n  \n}\n",
    "explanation": "I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Si el valor actual es menor que el siguiente, se resta; si no, se suma. Por eso IV es 5 - 1 y VI es 5 + 1. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un objeto de valores y comparar con la letra siguiente",
    "javascript": "function romanToInt(text) {\n  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }\n  let total = 0\n  for (let i = 0; i < text.length; i++) {\n    const current = values[text[i]]\n    const next = values[text[i + 1]] ?? 0\n    total += current < next ? -current : current\n  }\n  return total\n}\n",
    "typescript": "function romanToInt(text: string): number) {\n  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }\n  let total = 0\n  for (let i = 0; i < text.length; i++) {\n    const current = values[text[i]]\n    const next = values[text[i + 1]] ?? 0\n    total += current < next ? -current : current\n  }\n  return total\n}\n",
    "cases": [
      {
        "args": [
          "MCMXCIV"
        ],
        "expected": 1994
      },
      {
        "args": [
          "IV"
        ],
        "expected": 4
      },
      {
        "args": [
          "III"
        ],
        "expected": 3
      }
    ]
  },
  {
    "id": "mid-042",
    "level": "mid",
    "title": "Entero a romano",
    "prompt": "Pasa n, entre 1 y 3999, a romano.\nEjemplo: 1994 → \"MCMXCIV\". 4 → \"IV\".",
    "names": [
      "intToRoman"
    ],
    "starter": "function intToRoman(n) {\n  \n}\n",
    "explanation": "La tabla incluye 900, 400, 90, 40, 9 y 4, no solo los símbolos sueltos. Se resta el mayor valor que quepa, tantas veces como se pueda, y se concatena su símbolo. El orden de la tabla evita combinaciones ilegales. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una tabla de valores de mayor a menor, incluidos los restadores",
    "javascript": "function intToRoman(n) {\n  const table = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]\n  let rest = n\n  let out = ''\n  for (const [value, symbol] of table) {\n    while (rest >= value) {\n      out += symbol\n      rest -= value\n    }\n  }\n  return out\n}\n",
    "typescript": "function intToRoman(n: number): string) {\n  const table = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]\n  let rest = n\n  let out = ''\n  for (const [value, symbol] of table) {\n    while (rest >= value) {\n      out += symbol\n      rest -= value\n    }\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          1994
        ],
        "expected": "MCMXCIV"
      },
      {
        "args": [
          4
        ],
        "expected": "IV"
      },
      {
        "args": [
          58
        ],
        "expected": "LVIII"
      }
    ]
  },
  {
    "id": "mid-043",
    "level": "mid",
    "title": "Substring sin repetir",
    "prompt": "Devuelve la longitud del substring más largo sin caracteres repetidos.\nEjemplo: \"abcabcbb\" → 3. \"bbbb\" → 1. \"\" → 0.",
    "names": [
      "longestUniqueSubstring"
    ],
    "starter": "function longestUniqueSubstring(text) {\n  \n}\n",
    "explanation": "La ventana es el tramo sin repetidos que termina en i. Si el carácter ya estaba dentro de la ventana, el inicio salta a justo después de esa aparición. La longitud máxima de la ventana es la respuesta. Es lineal. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ventana deslizante y Map con el último índice de cada carácter",
    "javascript": "function longestUniqueSubstring(text) {\n  const last = new Map()\n  let best = 0\n  let start = 0\n  for (let i = 0; i < text.length; i++) {\n    const prev = last.get(text[i])\n    if (prev !== undefined && prev >= start) start = prev + 1\n    last.set(text[i], i)\n    const size = i - start + 1\n    if (size > best) best = size\n  }\n  return best\n}\n",
    "typescript": "function longestUniqueSubstring(text: string): number) {\n  const last = new Map()\n  let best = 0\n  let start = 0\n  for (let i = 0; i < text.length; i++) {\n    const prev = last.get(text[i])\n    if (prev !== undefined && prev >= start) start = prev + 1\n    last.set(text[i], i)\n    const size = i - start + 1\n    if (size > best) best = size\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          "abcabcbb"
        ],
        "expected": 3
      },
      {
        "args": [
          "bbbb"
        ],
        "expected": 1
      },
      {
        "args": [
          ""
        ],
        "expected": 0
      },
      {
        "args": [
          "pwwkew"
        ],
        "expected": 3
      }
    ]
  },
  {
    "id": "mid-044",
    "level": "mid",
    "title": "Palíndromo de frase",
    "prompt": "Ignora mayúsculas y todo lo que no sea letra o dígito. Di si lo que queda es palíndromo.\nEjemplo: \"A man, a plan, a canal: Panama\" → true.",
    "names": [
      "isPalindromePhrase"
    ],
    "starter": "function isPalindromePhrase(text) {\n  \n}\n",
    "explanation": "Primero se limpia el texto. Después es el palíndromo de dos punteros. La expresión /[^a-z0-9]/g quita lo que no sea letra o dígito ya en minúsculas. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "replace con una expresión regular y dos índices",
    "javascript": "function isPalindromePhrase(text) {\n  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '')\n  let i = 0\n  let j = clean.length - 1\n  while (i < j) {\n    if (clean[i] !== clean[j]) return false\n    i++\n    j--\n  }\n  return true\n}\n",
    "typescript": "function isPalindromePhrase(text: string): boolean) {\n  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '')\n  let i = 0\n  let j = clean.length - 1\n  while (i < j) {\n    if (clean[i] !== clean[j]) return false\n    i++\n    j--\n  }\n  return true\n}\n",
    "cases": [
      {
        "args": [
          "A man, a plan, a canal: Panama"
        ],
        "expected": true
      },
      {
        "args": [
          "race a car"
        ],
        "expected": false
      },
      {
        "args": [
          ""
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-045",
    "level": "mid",
    "title": "Nota con recortes",
    "prompt": "Di si se puede formar note usando letras de magazine. Cada letra del magazine se usa una vez como mucho.\nEjemplo: \"aa\", \"aab\" → true. \"aa\", \"ab\" → false.",
    "names": [
      "canConstruct"
    ],
    "starter": "function canConstruct(note, magazine) {\n  \n}\n",
    "explanation": "Se cuenta el magazine. Cada letra de la nota descuenta uno. Si alguna se queda sin stock, no se puede construir. El orden no importa, solo las cantidades. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Map de conteos",
    "javascript": "function canConstruct(note, magazine) {\n  const count = new Map()\n  for (const ch of magazine) count.set(ch, (count.get(ch) ?? 0) + 1)\n  for (const ch of note) {\n    const left = count.get(ch) ?? 0\n    if (left === 0) return false\n    count.set(ch, left - 1)\n  }\n  return true\n}\n",
    "typescript": "function canConstruct(note: string, magazine: string): boolean) {\n  const count = new Map()\n  for (const ch of magazine) count.set(ch, (count.get(ch) ?? 0) + 1)\n  for (const ch of note) {\n    const left = count.get(ch) ?? 0\n    if (left === 0) return false\n    count.set(ch, left - 1)\n  }\n  return true\n}\n",
    "cases": [
      {
        "args": [
          "aa",
          "aab"
        ],
        "expected": true
      },
      {
        "args": [
          "aa",
          "ab"
        ],
        "expected": false
      },
      {
        "args": [
          "",
          "abc"
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-046",
    "level": "mid",
    "title": "Sumas acumuladas",
    "prompt": "Devuelve las sumas parciales: out[i] es la suma de t[0] a t[i].\nEjemplo: [1, 2, 3] → [1, 3, 6].",
    "names": [
      "runningSum"
    ],
    "starter": "function runningSum(t) {\n  \n}\n",
    "explanation": "Cada posición es la anterior más el valor nuevo. No hace falta volver a sumar desde el principio. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un acumulador y push",
    "javascript": "function runningSum(t) {\n  const out = []\n  let total = 0\n  for (const n of t) {\n    total += n\n    out.push(total)\n  }\n  return out\n}\n",
    "typescript": "function runningSum(t: number[]): number[]) {\n  const out = []\n  let total = 0\n  for (const n of t) {\n    total += n\n    out.push(total)\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          1,
          3,
          6
        ]
      },
      {
        "args": [
          []
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "mid-047",
    "level": "mid",
    "title": "Índice pivote",
    "prompt": "Devuelve el índice cuya suma a la izquierda es igual a la suma a la derecha. Si hay varios, el menor. Si no hay, -1.\nEjemplo: [1, 7, 3, 6, 5, 6] → 3.",
    "names": [
      "pivotIndex"
    ],
    "starter": "function pivotIndex(t) {\n  \n}\n",
    "explanation": "La suma derecha es total - izquierda - valor actual. Si coinciden, ese índice es el pivote. La izquierda se actualiza después de la comparación, para no incluir el pivote en ningún lado. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "la suma total y una suma izquierda que avanza",
    "javascript": "function pivotIndex(t) {\n  let total = 0\n  for (const n of t) total += n\n  let left = 0\n  for (let i = 0; i < t.length; i++) {\n    if (left === total - left - t[i]) return i\n    left += t[i]\n  }\n  return -1\n}\n",
    "typescript": "function pivotIndex(t: number[]): number) {\n  let total = 0\n  for (const n of t) total += n\n  let left = 0\n  for (let i = 0; i < t.length; i++) {\n    if (left === total - left - t[i]) return i\n    left += t[i]\n  }\n  return -1\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            7,
            3,
            6,
            5,
            6
          ]
        ],
        "expected": 3
      },
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": -1
      },
      {
        "args": [
          [
            2,
            1,
            -1
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "mid-048",
    "level": "mid",
    "title": "Cuadrados ordenados",
    "prompt": "t está ordenado y puede tener negativos. Devuelve los cuadrados, ordenados de menor a mayor.\nEjemplo: [-4, -1, 0, 3, 10] → [0, 1, 9, 16, 100].",
    "names": [
      "sortedSquares"
    ],
    "starter": "function sortedSquares(t) {\n  \n}\n",
    "explanation": "El cuadrado más grande está en un extremo, porque los negativos grandes, al cuadrado, superan a los positivos pequeños. Se comparan los valores absolutos de los extremos y se coloca el mayor al final del resultado. Es lineal; ordenar después de cuadrar sería n log n. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos punteros desde los extremos",
    "javascript": "function sortedSquares(t) {\n  const out = []\n  let i = 0\n  let j = t.length - 1\n  while (i <= j) {\n    if (Math.abs(t[i]) > Math.abs(t[j])) {\n      out.push(t[i] * t[i])\n      i++\n    } else {\n      out.push(t[j] * t[j])\n      j--\n    }\n  }\n  return out.reverse()\n}\n",
    "typescript": "function sortedSquares(t: number[]): number[]) {\n  const out = []\n  let i = 0\n  let j = t.length - 1\n  while (i <= j) {\n    if (Math.abs(t[i]) > Math.abs(t[j])) {\n      out.push(t[i] * t[i])\n      i++\n    } else {\n      out.push(t[j] * t[j])\n      j--\n    }\n  }\n  return out.reverse()\n}\n",
    "cases": [
      {
        "args": [
          [
            -4,
            -1,
            0,
            3,
            10
          ]
        ],
        "expected": [
          0,
          1,
          9,
          16,
          100
        ]
      },
      {
        "args": [
          [
            -2,
            -1
          ]
        ],
        "expected": [
          1,
          4
        ]
      }
    ]
  },
  {
    "id": "mid-049",
    "level": "mid",
    "title": "Invertir vocales",
    "prompt": "Invierte solo las vocales, mayúsculas incluidas. La y no es vocal.\nEjemplo: \"hello\" → \"holle\". \"leetcode\" → \"leotcede\".",
    "names": [
      "reverseVowels"
    ],
    "starter": "function reverseVowels(text) {\n  \n}\n",
    "explanation": "Un puntero busca una vocal desde la izquierda y otro desde la derecha. Cuando los dos están sobre vocales, se intercambian. Las consonantes no se mueven. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos punteros sobre un array de caracteres",
    "javascript": "function reverseVowels(text) {\n  const chars = text.split('')\n  const vowel = (ch) => 'aeiouAEIOU'.includes(ch)\n  let i = 0\n  let j = chars.length - 1\n  while (i < j) {\n    if (!vowel(chars[i])) i++\n    else if (!vowel(chars[j])) j--\n    else {\n      const tmp = chars[i]\n      chars[i] = chars[j]\n      chars[j] = tmp\n      i++\n      j--\n    }\n  }\n  return chars.join('')\n}\n",
    "typescript": "function reverseVowels(text: string): string) {\n  const chars = text.split('')\n  const vowel = (ch) => 'aeiouAEIOU'.includes(ch)\n  let i = 0\n  let j = chars.length - 1\n  while (i < j) {\n    if (!vowel(chars[i])) i++\n    else if (!vowel(chars[j])) j--\n    else {\n      const tmp = chars[i]\n      chars[i] = chars[j]\n      chars[j] = tmp\n      i++\n      j--\n    }\n  }\n  return chars.join('')\n}\n",
    "cases": [
      {
        "args": [
          "hello"
        ],
        "expected": "holle"
      },
      {
        "args": [
          "leetcode"
        ],
        "expected": "leotcede"
      },
      {
        "args": [
          "a"
        ],
        "expected": "a"
      }
    ]
  },
  {
    "id": "mid-050",
    "level": "mid",
    "title": "Alternar strings",
    "prompt": "Intercala los caracteres de a y b. El que sobre, se copia al final.\nEjemplo: \"abc\", \"pqr\" → \"apbqcr\". \"ab\", \"pqrs\" → \"apbqrs\".",
    "names": [
      "mergeAlternately"
    ],
    "starter": "function mergeAlternately(a, b) {\n  \n}\n",
    "explanation": "En cada posición se añade el carácter de a si existe y el de b si existe. Cuando uno se acaba, el if correspondiente deja de aportar y el otro sigue. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un índice hasta la longitud mayor",
    "javascript": "function mergeAlternately(a, b) {\n  let out = ''\n  const size = a.length > b.length ? a.length : b.length\n  for (let i = 0; i < size; i++) {\n    if (i < a.length) out += a[i]\n    if (i < b.length) out += b[i]\n  }\n  return out\n}\n",
    "typescript": "function mergeAlternately(a: string, b: string): string) {\n  let out = ''\n  const size = a.length > b.length ? a.length : b.length\n  for (let i = 0; i < size; i++) {\n    if (i < a.length) out += a[i]\n    if (i < b.length) out += b[i]\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "abc",
          "pqr"
        ],
        "expected": "apbqcr"
      },
      {
        "args": [
          "ab",
          "pqrs"
        ],
        "expected": "apbqrs"
      }
    ]
  },
  {
    "id": "mid-051",
    "level": "mid",
    "title": "Divisor de strings",
    "prompt": "Devuelve el string más largo que, repetido, forma tanto a como b. Si no existe, \"\".\nEjemplo: \"ABCABC\", \"ABC\" → \"ABC\". \"ABABAB\", \"ABAB\" → \"AB\". \"LEET\", \"CODE\" → \"\".",
    "names": [
      "gcdOfStrings"
    ],
    "starter": "function gcdOfStrings(a, b) {\n  \n}\n",
    "explanation": "Si a y b no están hechos del mismo bloque, a + b y b + a difieren. Si coinciden, el bloque más grande mide el mcd de las dos longitudes. El mcd se calcula con el algoritmo de Euclides. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el máximo común divisor de las longitudes y la comprobación a + b === b + a",
    "javascript": "function gcdOfStrings(a, b) {\n  if (a + b !== b + a) return ''\n  function gcd(x, y) {\n    return y === 0 ? x : gcd(y, x % y)\n  }\n  return a.slice(0, gcd(a.length, b.length))\n}\n",
    "typescript": "function gcdOfStrings(a: string, b: string): string) {\n  if (a + b !== b + a) return ''\n  function gcd(x, y) {\n    return y === 0 ? x : gcd(y, x % y)\n  }\n  return a.slice(0, gcd(a.length, b.length))\n}\n",
    "cases": [
      {
        "args": [
          "ABCABC",
          "ABC"
        ],
        "expected": "ABC"
      },
      {
        "args": [
          "ABABAB",
          "ABAB"
        ],
        "expected": "AB"
      },
      {
        "args": [
          "LEET",
          "CODE"
        ],
        "expected": ""
      }
    ]
  },
  {
    "id": "mid-052",
    "level": "mid",
    "title": "Caramelos extra",
    "prompt": "candies[i] son los caramelos del niño i. Di, para cada uno, si al darle extra caramelos alcanza o supera al que más tiene ahora.\nEjemplo: [2, 3, 5, 1, 3], 3 → [true, true, true, false, true].",
    "names": [
      "kidsWithCandies"
    ],
    "starter": "function kidsWithCandies(candies, extra) {\n  \n}\n",
    "explanation": "El máximo actual no cambia al repartir el extra en la hipótesis de cada niño: se calcula una vez. Luego cada niño cumple si su cantidad más extra llega a ese máximo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el máximo y map",
    "javascript": "function kidsWithCandies(candies, extra) {\n  let max = candies[0]\n  for (const n of candies) if (n > max) max = n\n  return candies.map((n) => n + extra >= max)\n}\n",
    "typescript": "function kidsWithCandies(candies: number[], extra: number): boolean[]) {\n  let max = candies[0]\n  for (const n of candies) if (n > max) max = n\n  return candies.map((n) => n + extra >= max)\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            3,
            5,
            1,
            3
          ],
          3
        ],
        "expected": [
          true,
          true,
          true,
          false,
          true
        ]
      }
    ]
  },
  {
    "id": "mid-053",
    "level": "mid",
    "title": "Cuántos son menores",
    "prompt": "Para cada número, cuenta cuántos del array son estrictamente menores.\nEjemplo: [8, 1, 2, 2, 3] → [4, 0, 1, 1, 3].",
    "names": [
      "smallerNumbersThanCurrent"
    ],
    "starter": "function smallerNumbersThanCurrent(t) {\n  \n}\n",
    "explanation": "Para cada posición se recorre el array entero y se cuentan los menores. Es cuadrático y claro. Ordenar y buscar el índice también vale, con cuidado de los repetidos. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "doble bucle",
    "javascript": "function smallerNumbersThanCurrent(t) {\n  return t.map((n) => {\n    let total = 0\n    for (const other of t) if (other < n) total++\n    return total\n  })\n}\n",
    "typescript": "function smallerNumbersThanCurrent(t: number[]): number[]) {\n  return t.map((n) => {\n    let total = 0\n    for (const other of t) if (other < n) total++\n    return total\n  })\n}\n",
    "cases": [
      {
        "args": [
          [
            8,
            1,
            2,
            2,
            3
          ]
        ],
        "expected": [
          4,
          0,
          1,
          1,
          3
        ]
      }
    ]
  },
  {
    "id": "mid-054",
    "level": "mid",
    "title": "Pasos hasta cero",
    "prompt": "Cuenta los pasos para llegar a 0. Si es par se divide entre 2; si es impar se le resta 1. n es 0 o más.\nEjemplo: 14 → 6.",
    "names": [
      "numberOfSteps"
    ],
    "starter": "function numberOfSteps(n) {\n  \n}\n",
    "explanation": "Es una variante de Collatz más simple: impar resta 1, par divide. Cada operación es un paso. El 0 ya está, así que no entra al bucle. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle while y el resto",
    "javascript": "function numberOfSteps(n) {\n  let steps = 0\n  let rest = n\n  while (rest > 0) {\n    rest = rest % 2 === 0 ? rest / 2 : rest - 1\n    steps++\n  }\n  return steps\n}\n",
    "typescript": "function numberOfSteps(n: number): number) {\n  let steps = 0\n  let rest = n\n  while (rest > 0) {\n    rest = rest % 2 === 0 ? rest / 2 : rest - 1\n    steps++\n  }\n  return steps\n}\n",
    "cases": [
      {
        "args": [
          14
        ],
        "expected": 6
      },
      {
        "args": [
          0
        ],
        "expected": 0
      },
      {
        "args": [
          3
        ],
        "expected": 3
      }
    ]
  },
  {
    "id": "mid-055",
    "level": "mid",
    "title": "Producto de los dos mayores",
    "prompt": "t tiene al menos dos números, todos positivos. Devuelve el producto de los dos mayores.\nEjemplo: [3, 4, 5, 2] → 20.",
    "names": [
      "maxProductTwo"
    ],
    "starter": "function maxProductTwo(t) {\n  \n}\n",
    "explanation": "No hace falta ordenar. Se mantienen el mayor y el siguiente. Cuando aparece uno nuevo en cabeza, el antiguo mayor pasa a segundo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un recorrido que guarda el mayor y el segundo",
    "javascript": "function maxProductTwo(t) {\n  let first = -Infinity\n  let second = -Infinity\n  for (const n of t) {\n    if (n > first) {\n      second = first\n      first = n\n    } else if (n > second) second = n\n  }\n  return first * second\n}\n",
    "typescript": "function maxProductTwo(t: number[]): number) {\n  let first = -Infinity\n  let second = -Infinity\n  for (const n of t) {\n    if (n > first) {\n      second = first\n      first = n\n    } else if (n > second) second = n\n  }\n  return first * second\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            4,
            5,
            2
          ]
        ],
        "expected": 20
      },
      {
        "args": [
          [
            1,
            8
          ]
        ],
        "expected": 8
      }
    ]
  },
  {
    "id": "mid-056",
    "level": "mid",
    "title": "Longitud de la última palabra",
    "prompt": "Devuelve la longitud de la última palabra. Puede haber espacios de más.\nEjemplo: \"  fly me to the moon  \" → 4.",
    "names": [
      "lengthOfLastWord"
    ],
    "starter": "function lengthOfLastWord(text) {\n  \n}\n",
    "explanation": "trim quita los espacios de los extremos para que la última pieza del split sea la palabra, no un string vacío. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "trim y split",
    "javascript": "function lengthOfLastWord(text) {\n  const words = text.trim().split(/\\s+/)\n  return words[words.length - 1].length\n}\n",
    "typescript": "function lengthOfLastWord(text: string): number) {\n  const words = text.trim().split(/\\s+/)\n  return words[words.length - 1].length\n}\n",
    "cases": [
      {
        "args": [
          "Hello World"
        ],
        "expected": 5
      },
      {
        "args": [
          "  fly me to the moon  "
        ],
        "expected": 4
      }
    ]
  },
  {
    "id": "mid-057",
    "level": "mid",
    "title": "Buscar aguja",
    "prompt": "Devuelve el primer índice de needle en text, o -1. La aguja vacía está en el índice 0. No uses indexOf.\nEjemplo: \"hola\", \"la\" → 2.",
    "names": [
      "strStr"
    ],
    "starter": "function strStr(text, needle) {\n  \n}\n",
    "explanation": "Se prueba cada inicio donde la aguja todavía cabe. slice compara ese tramo. Es la búsqueda ingenua, cuadrática en el peor caso. KMP lo bajaría a lineal, a cambio de una tabla de fallos. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "bucle y slice de la longitud de la aguja",
    "javascript": "function strStr(text, needle) {\n  if (needle === '') return 0\n  for (let i = 0; i <= text.length - needle.length; i++) {\n    if (text.slice(i, i + needle.length) === needle) return i\n  }\n  return -1\n}\n",
    "typescript": "function strStr(text: string, needle: string): number) {\n  if (needle === '') return 0\n  for (let i = 0; i <= text.length - needle.length; i++) {\n    if (text.slice(i, i + needle.length) === needle) return i\n  }\n  return -1\n}\n",
    "cases": [
      {
        "args": [
          "hola",
          "la"
        ],
        "expected": 2
      },
      {
        "args": [
          "hola",
          "z"
        ],
        "expected": -1
      },
      {
        "args": [
          "hola",
          ""
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "mid-058",
    "level": "mid",
    "title": "Sumar números enormes",
    "prompt": "a y b son enteros no negativos escritos como texto, sin ceros a la izquierda salvo \"0\". Devuelve la suma como texto, sin convertir el número entero completo.\nEjemplo: \"999\", \"1\" → \"1000\".",
    "names": [
      "addStrings"
    ],
    "starter": "function addStrings(a, b) {\n  \n}\n",
    "explanation": "Un número de cien cifras no cabe bien en un Number. Se suman cifra a cifra desde la derecha, como en papel, y el acarreo pasa a la siguiente. El resultado se construye por delante. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos índices desde el final y acarreo",
    "javascript": "function addStrings(a, b) {\n  let i = a.length - 1\n  let j = b.length - 1\n  let carry = 0\n  let out = ''\n  while (i >= 0 || j >= 0 || carry) {\n    const sum = (i >= 0 ? Number(a[i]) : 0) + (j >= 0 ? Number(b[j]) : 0) + carry\n    out = String(sum % 10) + out\n    carry = Math.floor(sum / 10)\n    i--\n    j--\n  }\n  return out\n}\n",
    "typescript": "function addStrings(a: string, b: string): string) {\n  let i = a.length - 1\n  let j = b.length - 1\n  let carry = 0\n  let out = ''\n  while (i >= 0 || j >= 0 || carry) {\n    const sum = (i >= 0 ? Number(a[i]) : 0) + (j >= 0 ? Number(b[j]) : 0) + carry\n    out = String(sum % 10) + out\n    carry = Math.floor(sum / 10)\n    i--\n    j--\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "999",
          "1"
        ],
        "expected": "1000"
      },
      {
        "args": [
          "11",
          "123"
        ],
        "expected": "134"
      },
      {
        "args": [
          "0",
          "0"
        ],
        "expected": "0"
      }
    ]
  },
  {
    "id": "mid-059",
    "level": "mid",
    "title": "Columna de Excel",
    "prompt": "Convierte un número de columna, desde 1, a letras de Excel. 1 → \"A\", 26 → \"Z\", 27 → \"AA\", 28 → \"AB\".",
    "names": [
      "excelColumn"
    ],
    "starter": "function excelColumn(n) {\n  \n}\n",
    "explanation": "No es una base 26 normal porque no hay cifra cero: A es 1, no 0. Por eso se resta 1 antes de tomar el resto entre 26. Ese ajuste hace que 26 sea Z y 27 vuelva a empezar en AA. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "base 26 que empieza en 1, restando 1 antes del resto",
    "javascript": "function excelColumn(n) {\n  let rest = n\n  let out = ''\n  while (rest > 0) {\n    rest--\n    out = String.fromCharCode(65 + (rest % 26)) + out\n    rest = Math.floor(rest / 26)\n  }\n  return out\n}\n",
    "typescript": "function excelColumn(n: number): string) {\n  let rest = n\n  let out = ''\n  while (rest > 0) {\n    rest--\n    out = String.fromCharCode(65 + (rest % 26)) + out\n    rest = Math.floor(rest / 26)\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          1
        ],
        "expected": "A"
      },
      {
        "args": [
          26
        ],
        "expected": "Z"
      },
      {
        "args": [
          27
        ],
        "expected": "AA"
      },
      {
        "args": [
          28
        ],
        "expected": "AB"
      }
    ]
  },
  {
    "id": "mid-060",
    "level": "mid",
    "title": "Unos en binario",
    "prompt": "Devuelve un array de longitud n + 1. La posición i dice cuántos unos tiene i en binario.\nEjemplo: 2 → [0, 1, 1].",
    "names": [
      "countBits"
    ],
    "starter": "function countBits(n) {\n  \n}\n",
    "explanation": "x & 1 es el bit menos significativo. x >>= 1 lo descarta. Se cuenta hasta que el número se queda en 0. El 0 tiene cero unos. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "máscara de bits & 1 y desplazamiento",
    "javascript": "function countBits(n) {\n  const out = []\n  for (let i = 0; i <= n; i++) {\n    let x = i\n    let bits = 0\n    while (x > 0) {\n      bits += x & 1\n      x >>= 1\n    }\n    out.push(bits)\n  }\n  return out\n}\n",
    "typescript": "function countBits(n: number): number[]) {\n  const out = []\n  for (let i = 0; i <= n; i++) {\n    let x = i\n    let bits = 0\n    while (x > 0) {\n      bits += x & 1\n      x >>= 1\n    }\n    out.push(bits)\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          2
        ],
        "expected": [
          0,
          1,
          1
        ]
      },
      {
        "args": [
          5
        ],
        "expected": [
          0,
          1,
          1,
          2,
          1,
          2
        ]
      }
    ]
  },
  {
    "id": "mid-061",
    "level": "mid",
    "title": "Peso de Hamming",
    "prompt": "Cuenta los unos de n en binario. n es un entero mayor o igual que 0.\nEjemplo: 11 → 3, porque 1011.",
    "names": [
      "hammingWeight"
    ],
    "starter": "function hammingWeight(n) {\n  \n}\n",
    "explanation": "Es el mismo conteo que en countBits, para un solo número. Math.floor(x / 2) evita sorpresas de signo con el desplazamiento, aunque aquí n no es negativo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "resto entre 2 o máscara, y división entera",
    "javascript": "function hammingWeight(n) {\n  let bits = 0\n  let x = n\n  while (x > 0) {\n    bits += x & 1\n    x = Math.floor(x / 2)\n  }\n  return bits\n}\n",
    "typescript": "function hammingWeight(n: number): number) {\n  let bits = 0\n  let x = n\n  while (x > 0) {\n    bits += x & 1\n    x = Math.floor(x / 2)\n  }\n  return bits\n}\n",
    "cases": [
      {
        "args": [
          11
        ],
        "expected": 3
      },
      {
        "args": [
          0
        ],
        "expected": 0
      },
      {
        "args": [
          8
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "mid-062",
    "level": "mid",
    "title": "Potencia de dos",
    "prompt": "Di si n es una potencia de dos. n es un entero. Los negativos y el 0 no lo son.\nEjemplo: 16 → true. 12 → false.",
    "names": [
      "isPowerOfTwo"
    ],
    "starter": "function isPowerOfTwo(n) {\n  \n}\n",
    "explanation": "Una potencia de dos en binario es un único uno. Restar 1 pone ese uno a cero y los bits de su derecha a uno. El AND de los dos es 0 solo en ese caso. Hay que excluir n <= 0, porque el truco no habla de ellos. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el truco n & (n - 1)",
    "javascript": "function isPowerOfTwo(n) {\n  return n > 0 && (n & (n - 1)) === 0\n}\n",
    "typescript": "function isPowerOfTwo(n: number): boolean) {\n  return n > 0 && (n & (n - 1)) === 0\n}\n",
    "cases": [
      {
        "args": [
          16
        ],
        "expected": true
      },
      {
        "args": [
          12
        ],
        "expected": false
      },
      {
        "args": [
          1
        ],
        "expected": true
      },
      {
        "args": [
          0
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "mid-063",
    "level": "mid",
    "title": "Triángulo de Pascal",
    "prompt": "Devuelve las primeras n filas del triángulo de Pascal. Cada número es la suma de los dos que tiene encima. n es 0 o más.\nEjemplo: 3 → [[1], [1, 1], [1, 2, 1]].",
    "names": [
      "pascalTriangle"
    ],
    "starter": "function pascalTriangle(n) {\n  \n}\n",
    "explanation": "Los extremos de cada fila son 1. El interior suma el vecino izquierdo y el derecho de la fila de arriba. Si el de la derecha no existe, cuenta como 0: eso cubre el final de la fila. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "la fila anterior y un bucle",
    "javascript": "function pascalTriangle(n) {\n  const out = []\n  for (let row = 0; row < n; row++) {\n    const line = [1]\n    for (let col = 1; col <= row; col++) {\n      const prev = out[row - 1]\n      const left = prev[col - 1] ?? 0\n      const right = prev[col] ?? 0\n      line.push(left + right)\n    }\n    out.push(line)\n  }\n  return out\n}\n",
    "typescript": "function pascalTriangle(n: number): number[][]) {\n  const out = []\n  for (let row = 0; row < n; row++) {\n    const line = [1]\n    for (let col = 1; col <= row; col++) {\n      const prev = out[row - 1]\n      const left = prev[col - 1] ?? 0\n      const right = prev[col] ?? 0\n      line.push(left + right)\n    }\n    out.push(line)\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          3
        ],
        "expected": [
          [
            1
          ],
          [
            1,
            1
          ],
          [
            1,
            2,
            1
          ]
        ]
      },
      {
        "args": [
          1
        ],
        "expected": [
          [
            1
          ]
        ]
      },
      {
        "args": [
          0
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "mid-064",
    "level": "mid",
    "title": "Número feliz",
    "prompt": "Sustituye n por la suma de los cuadrados de sus cifras, y repite. Es feliz si llega a 1. Si entra en un ciclo, no. n es un entero positivo.\nEjemplo: 19 → true. 2 → false.",
    "names": [
      "isHappy"
    ],
    "starter": "function isHappy(n) {\n  \n}\n",
    "explanation": "Sin memoria, un ciclo infinito no se detecta. Se guardan los números ya vistos. Si reaparece uno antes de llegar a 1, no es feliz. El 1 sí lo es. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un Set de vistos para cortar el ciclo",
    "javascript": "function isHappy(n) {\n  const seen = new Set()\n  let rest = n\n  while (rest !== 1 && !seen.has(rest)) {\n    seen.add(rest)\n    let next = 0\n    while (rest > 0) {\n      const digit = rest % 10\n      next += digit * digit\n      rest = Math.floor(rest / 10)\n    }\n    rest = next\n  }\n  return rest === 1\n}\n",
    "typescript": "function isHappy(n: number): boolean) {\n  const seen = new Set()\n  let rest = n\n  while (rest !== 1 && !seen.has(rest)) {\n    seen.add(rest)\n    let next = 0\n    while (rest > 0) {\n      const digit = rest % 10\n      next += digit * digit\n      rest = Math.floor(rest / 10)\n    }\n    rest = next\n  }\n  return rest === 1\n}\n",
    "cases": [
      {
        "args": [
          19
        ],
        "expected": true
      },
      {
        "args": [
          2
        ],
        "expected": false
      },
      {
        "args": [
          1
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-065",
    "level": "mid",
    "title": "Elemento mayoritario",
    "prompt": "Hay un número que aparece más de t.length / 2 veces. Devuélvelo. t no está vacío.\nEjemplo: [2, 2, 1, 1, 1, 2, 2] → 2.",
    "names": [
      "majorityElement"
    ],
    "starter": "function majorityElement(t) {\n  \n}\n",
    "explanation": "Se lleva un candidato y un conteo. Un valor igual suma; uno distinto resta. Cuando el conteo llega a 0, el siguiente valor es el nuevo candidato. El mayoritario sobrevive porque tiene más apariciones que el resto junto. No comprueba el resultado: el enunciado garantiza que existe. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "voto de Boyer-Moore",
    "javascript": "function majorityElement(t) {\n  let candidate = t[0]\n  let count = 0\n  for (const n of t) {\n    if (count === 0) candidate = n\n    count += n === candidate ? 1 : -1\n  }\n  return candidate\n}\n",
    "typescript": "function majorityElement(t: number[]): number) {\n  let candidate = t[0]\n  let count = 0\n  for (const n of t) {\n    if (count === 0) candidate = n\n    count += n === candidate ? 1 : -1\n  }\n  return candidate\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "args": [
          [
            2,
            2,
            1,
            1,
            1,
            2,
            2
          ]
        ],
        "expected": 2
      }
    ]
  },
  {
    "id": "mid-066",
    "level": "mid",
    "title": "Producto excepto uno",
    "prompt": "out[i] es el producto de todos los de t menos t[i]. No uses división. t tiene al menos dos números.\nEjemplo: [1, 2, 3, 4] → [24, 12, 8, 6].",
    "names": [
      "productExceptSelf"
    ],
    "starter": "function productExceptSelf(t) {\n  \n}\n",
    "explanation": "La división fallaría con ceros y el enunciado la prohíbe. Primero cada posición guarda el producto de lo que hay a su izquierda. Después se multiplica por el producto de lo que hay a la derecha, de atrás hacia delante. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un prefijo por la izquierda y un sufijo por la derecha",
    "javascript": "function productExceptSelf(t) {\n  const out = []\n  let left = 1\n  for (let i = 0; i < t.length; i++) {\n    out.push(left)\n    left *= t[i]\n  }\n  let right = 1\n  for (let i = t.length - 1; i >= 0; i--) {\n    out[i] *= right\n    right *= t[i]\n  }\n  return out\n}\n",
    "typescript": "function productExceptSelf(t: number[]): number[]) {\n  const out = []\n  let left = 1\n  for (let i = 0; i < t.length; i++) {\n    out.push(left)\n    left *= t[i]\n  }\n  let right = 1\n  for (let i = t.length - 1; i >= 0; i--) {\n    out[i] *= right\n    right *= t[i]\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": [
          24,
          12,
          8,
          6
        ]
      },
      {
        "args": [
          [
            2,
            3
          ]
        ],
        "expected": [
          3,
          2
        ]
      }
    ]
  },
  {
    "id": "mid-067",
    "level": "mid",
    "title": "Números desaparecidos",
    "prompt": "t tiene n números, cada uno entre 1 y n, y puede repetir. Devuelve los de 1 a n que no aparecen, en orden.\nEjemplo: [4, 3, 2, 7, 8, 2, 3, 1] → [5, 6].",
    "names": [
      "findDisappeared"
    ],
    "starter": "function findDisappeared(t) {\n  \n}\n",
    "explanation": "El Set dice en tiempo medio constante si un número del rango está. Se recorre el rango, no el array, para devolverlos en orden. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Set y un bucle de 1 a n",
    "javascript": "function findDisappeared(t) {\n  const seen = new Set(t)\n  const out = []\n  for (let n = 1; n <= t.length; n++) if (!seen.has(n)) out.push(n)\n  return out\n}\n",
    "typescript": "function findDisappeared(t: number[]): number[]) {\n  const seen = new Set(t)\n  const out = []\n  for (let n = 1; n <= t.length; n++) if (!seen.has(n)) out.push(n)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            4,
            3,
            2,
            7,
            8,
            2,
            3,
            1
          ]
        ],
        "expected": [
          5,
          6
        ]
      },
      {
        "args": [
          [
            1,
            1
          ]
        ],
        "expected": [
          2
        ]
      }
    ]
  },
  {
    "id": "mid-068",
    "level": "mid",
    "title": "Plantar flores",
    "prompt": "bed es un arriate: 1 ocupado, 0 vacío. No se pueden plantar dos flores en celdas adyacentes, ni junto a una ya plantada. ¿Caben n flores nuevas?\nEjemplo: [1, 0, 0, 0, 1], 1 → true. El mismo arriate con 2 → false.",
    "names": [
      "canPlaceFlowers"
    ],
    "starter": "function canPlaceFlowers(bed, n) {\n  \n}\n",
    "explanation": "Una celda vacía sirve si la de la izquierda y la de la derecha también lo están. Los extremos no tienen un vecino: ese lado cuenta como libre. Se planta de inmediato para que la siguiente celda lo vea. Se trabaja sobre una copia para no depender de mutar el argumento. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un recorrido que planta en una copia cuando los vecinos están libres",
    "javascript": "function canPlaceFlowers(bed, n) {\n  const row = bed.slice()\n  let placed = 0\n  for (let i = 0; i < row.length; i++) {\n    const empty = row[i] === 0\n    const left = i === 0 || row[i - 1] === 0\n    const right = i === row.length - 1 || row[i + 1] === 0\n    if (empty && left && right) {\n      row[i] = 1\n      placed++\n    }\n  }\n  return placed >= n\n}\n",
    "typescript": "function canPlaceFlowers(bed: number[], n: number): boolean) {\n  const row = bed.slice()\n  let placed = 0\n  for (let i = 0; i < row.length; i++) {\n    const empty = row[i] === 0\n    const left = i === 0 || row[i - 1] === 0\n    const right = i === row.length - 1 || row[i + 1] === 0\n    if (empty && left && right) {\n      row[i] = 1\n      placed++\n    }\n  }\n  return placed >= n\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            0,
            0,
            0,
            1
          ],
          1
        ],
        "expected": true
      },
      {
        "args": [
          [
            1,
            0,
            0,
            0,
            1
          ],
          2
        ],
        "expected": false
      },
      {
        "args": [
          [
            0,
            0,
            0
          ],
          2
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-069",
    "level": "mid",
    "title": "Saltar el array",
    "prompt": "Desde el índice i se puede avanzar hasta t[i] pasos. Di si se puede llegar al último índice.\nEjemplo: [2, 3, 1, 1, 4] → true. [3, 2, 1, 0, 4] → false.",
    "names": [
      "jumpGame"
    ],
    "starter": "function jumpGame(t) {\n  \n}\n",
    "explanation": "No hace falta simular cada salto. Se guarda hasta dónde se ha podido llegar. Si el índice actual ya está más allá de ese alcance, hay un cero que no se puede cruzar. Si el alcance llega al final, se puede. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el alcance máximo visto",
    "javascript": "function jumpGame(t) {\n  let reach = 0\n  for (let i = 0; i < t.length; i++) {\n    if (i > reach) return false\n    if (i + t[i] > reach) reach = i + t[i]\n  }\n  return true\n}\n",
    "typescript": "function jumpGame(t: number[]): boolean) {\n  let reach = 0\n  for (let i = 0; i < t.length; i++) {\n    if (i > reach) return false\n    if (i + t[i] > reach) reach = i + t[i]\n  }\n  return true\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            3,
            1,
            1,
            4
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            3,
            2,
            1,
            0,
            4
          ]
        ],
        "expected": false
      },
      {
        "args": [
          [
            0
          ]
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-070",
    "level": "mid",
    "title": "Subsecuencia creciente",
    "prompt": "Devuelve la longitud de la subsecuencia estrictamente creciente más larga. No tiene que ser contigua.\nEjemplo: [10, 9, 2, 5, 3, 7, 101, 18] → 4. [] → 0.",
    "names": [
      "lengthOfLIS"
    ],
    "starter": "function lengthOfLIS(t) {\n  \n}\n",
    "explanation": "best[i] es la mejor subsecuencia que termina en i. Se mira cada j anterior menor que t[i] y se alarga. El máximo de best es la respuesta. Hay una versión n log n con paciencia y búsqueda binaria; esta es la que se lee de un vistazo y basta para arrays cortos. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica cuadrática",
    "javascript": "function lengthOfLIS(t) {\n  const best = t.map(() => 1)\n  let answer = 0\n  for (let i = 0; i < t.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (t[j] < t[i] && best[j] + 1 > best[i]) best[i] = best[j] + 1\n    }\n    if (best[i] > answer) answer = best[i]\n  }\n  return answer\n}\n",
    "typescript": "function lengthOfLIS(t: number[]): number) {\n  const best = t.map(() => 1)\n  let answer = 0\n  for (let i = 0; i < t.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (t[j] < t[i] && best[j] + 1 > best[i]) best[i] = best[j] + 1\n    }\n    if (best[i] > answer) answer = best[i]\n  }\n  return answer\n}\n",
    "cases": [
      {
        "args": [
          [
            10,
            9,
            2,
            5,
            3,
            7,
            101,
            18
          ]
        ],
        "expected": 4
      },
      {
        "args": [
          []
        ],
        "expected": 0
      },
      {
        "args": [
          [
            7,
            7,
            7
          ]
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "mid-071",
    "level": "mid",
    "title": "Cambio de monedas",
    "prompt": "Devuelve el mínimo de monedas para sumar amount. Se puede reutilizar cada valor. Si es imposible, -1. amount es 0 o más.\nEjemplo: [1, 2, 5], 11 → 3. [2], 3 → -1.",
    "names": [
      "coinChange"
    ],
    "starter": "function coinChange(coins, amount) {\n  \n}\n",
    "explanation": "best[x] es el mínimo de monedas para sumar x. Se prueba cada moneda que quepa y se mira best[x - moneda] + 1. Un valor centinela mayor que amount marca lo imposible. amount 0 necesita 0 monedas. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica: mínimo para cada importe",
    "javascript": "function coinChange(coins, amount) {\n  const best = [0]\n  for (let i = 1; i <= amount; i++) best.push(amount + 1)\n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (coin <= i && best[i - coin] + 1 < best[i]) best[i] = best[i - coin] + 1\n    }\n  }\n  return best[amount] > amount ? -1 : best[amount]\n}\n",
    "typescript": "function coinChange(coins: number[], amount: number): number) {\n  const best = [0]\n  for (let i = 1; i <= amount; i++) best.push(amount + 1)\n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (coin <= i && best[i - coin] + 1 < best[i]) best[i] = best[i - coin] + 1\n    }\n  }\n  return best[amount] > amount ? -1 : best[amount]\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            5
          ],
          11
        ],
        "expected": 3
      },
      {
        "args": [
          [
            2
          ],
          3
        ],
        "expected": -1
      },
      {
        "args": [
          [
            1
          ],
          0
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "mid-072",
    "level": "mid",
    "title": "Letras del teléfono",
    "prompt": "digits usa cifras del 2 al 9, como un teléfono. Devuelve todas las combinaciones de letras, en el orden del teclado y de las cifras. \"\" → [].\nEjemplo: \"23\" → [\"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\"].",
    "names": [
      "letterCombinations"
    ],
    "starter": "function letterCombinations(digits) {\n  \n}\n",
    "explanation": "Se empieza con el string vacío. Cada cifra sustituye la lista actual por todas las formas de añadirle una de sus letras. El orden del string del teclado fija el orden del resultado. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un array que crece cifra a cifra",
    "javascript": "function letterCombinations(digits) {\n  if (!digits) return []\n  const map = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' }\n  let out = ['']\n  for (const digit of digits) {\n    const next = []\n    for (const prefix of out) for (const ch of map[digit]) next.push(prefix + ch)\n    out = next\n  }\n  return out\n}\n",
    "typescript": "function letterCombinations(digits: string): string[]) {\n  if (!digits) return []\n  const map = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' }\n  let out = ['']\n  for (const digit of digits) {\n    const next = []\n    for (const prefix of out) for (const ch of map[digit]) next.push(prefix + ch)\n    out = next\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "23"
        ],
        "expected": [
          "ad",
          "ae",
          "af",
          "bd",
          "be",
          "bf",
          "cd",
          "ce",
          "cf"
        ]
      },
      {
        "args": [
          ""
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "mid-073",
    "level": "mid",
    "title": "Rotar string",
    "prompt": "Di si goal es text rotado. Rotar mueve el primer carácter al final, las veces que haga falta.\nEjemplo: \"abcde\", \"cdeab\" → true. \"abcde\", \"abced\" → false.",
    "names": [
      "rotateString"
    ],
    "starter": "function rotateString(text, goal) {\n  \n}\n",
    "explanation": "Todas las rotaciones de text aparecen como substring de text pegado consigo mismo, y tienen la misma longitud. Si las longitudes difieren, es imposible. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "text + text e includes",
    "javascript": "function rotateString(text, goal) {\n  return text.length === goal.length && (text + text).includes(goal)\n}\n",
    "typescript": "function rotateString(text: string, goal: string): boolean) {\n  return text.length === goal.length && (text + text).includes(goal)\n}\n",
    "cases": [
      {
        "args": [
          "abcde",
          "cdeab"
        ],
        "expected": true
      },
      {
        "args": [
          "abcde",
          "abced"
        ],
        "expected": false
      },
      {
        "args": [
          "",
          ""
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-074",
    "level": "mid",
    "title": "Tecla de borrar",
    "prompt": "# borra el carácter anterior, si lo hay. Di si a y b quedan iguales después de borrar.\nEjemplo: \"ab#c\", \"ad#c\" → true. \"a#c\", \"b\" → false.",
    "names": [
      "backspaceCompare"
    ],
    "starter": "function backspaceCompare(a, b) {\n  \n}\n",
    "explanation": "Cada letra se apila. Cada # desapila, si hay algo. Al final se comparan los dos textos reconstruidos. Una pila encaja porque borrar deshace lo último escrito. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una pila por string",
    "javascript": "function backspaceCompare(a, b) {\n  function build(text) {\n    const out = []\n    for (const ch of text) {\n      if (ch === '#') out.pop()\n      else out.push(ch)\n    }\n    return out.join('')\n  }\n  return build(a) === build(b)\n}\n",
    "typescript": "function backspaceCompare(a: string, b: string): boolean) {\n  function build(text) {\n    const out = []\n    for (const ch of text) {\n      if (ch === '#') out.pop()\n      else out.push(ch)\n    }\n    return out.join('')\n  }\n  return build(a) === build(b)\n}\n",
    "cases": [
      {
        "args": [
          "ab#c",
          "ad#c"
        ],
        "expected": true
      },
      {
        "args": [
          "a#c",
          "b"
        ],
        "expected": false
      },
      {
        "args": [
          "##a",
          "a"
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-075",
    "level": "mid",
    "title": "Strings isomorfos",
    "prompt": "Di si se puede sustituir cada carácter de a por uno de b, siempre el mismo, y al revés.\nEjemplo: \"egg\", \"add\" → true. \"foo\", \"bar\" → false. \"paper\", \"title\" → true.",
    "names": [
      "isomorphic"
    ],
    "starter": "function isomorphic(a, b) {\n  \n}\n",
    "explanation": "Un solo mapa no basta: \"ab\" y \"aa\" mapearían a y b hacia a, y chocarían al volver. Se exige que la letra de a fije la de b y que la de b fije la de a. Las longitudes tienen que coincidir. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos Map, uno en cada dirección",
    "javascript": "function isomorphic(a, b) {\n  if (a.length !== b.length) return false\n  const ab = new Map()\n  const ba = new Map()\n  for (let i = 0; i < a.length; i++) {\n    if (ab.has(a[i]) && ab.get(a[i]) !== b[i]) return false\n    if (ba.has(b[i]) && ba.get(b[i]) !== a[i]) return false\n    ab.set(a[i], b[i])\n    ba.set(b[i], a[i])\n  }\n  return true\n}\n",
    "typescript": "function isomorphic(a: string, b: string): boolean) {\n  if (a.length !== b.length) return false\n  const ab = new Map()\n  const ba = new Map()\n  for (let i = 0; i < a.length; i++) {\n    if (ab.has(a[i]) && ab.get(a[i]) !== b[i]) return false\n    if (ba.has(b[i]) && ba.get(b[i]) !== a[i]) return false\n    ab.set(a[i], b[i])\n    ba.set(b[i], a[i])\n  }\n  return true\n}\n",
    "cases": [
      {
        "args": [
          "egg",
          "add"
        ],
        "expected": true
      },
      {
        "args": [
          "foo",
          "bar"
        ],
        "expected": false
      },
      {
        "args": [
          "paper",
          "title"
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-076",
    "level": "mid",
    "title": "Patrón de palabras",
    "prompt": "Di si text sigue pattern: cada letra corresponde a una palabra, y cada palabra a una letra. Las palabras van separadas por un espacio.\nEjemplo: \"abba\", \"dog cat cat dog\" → true. \"abba\", \"dog cat cat fish\" → false. \"aaaa\", \"dog cat cat dog\" → false.",
    "names": [
      "wordPattern"
    ],
    "starter": "function wordPattern(pattern, text) {\n  \n}\n",
    "explanation": "Es el isomorfismo entre letras y palabras. Si el número de palabras no coincide con el patrón, ya es false. Las dos direcciones del mapa impiden que dos letras compartan palabra o al revés. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos Map, como en los isomorfos",
    "javascript": "function wordPattern(pattern, text) {\n  const words = text.split(' ')\n  if (words.length !== pattern.length) return false\n  const pw = new Map()\n  const wp = new Map()\n  for (let i = 0; i < pattern.length; i++) {\n    const p = pattern[i]\n    const w = words[i]\n    if (pw.has(p) && pw.get(p) !== w) return false\n    if (wp.has(w) && wp.get(w) !== p) return false\n    pw.set(p, w)\n    wp.set(w, p)\n  }\n  return true\n}\n",
    "typescript": "function wordPattern(pattern: string, text: string): boolean) {\n  const words = text.split(' ')\n  if (words.length !== pattern.length) return false\n  const pw = new Map()\n  const wp = new Map()\n  for (let i = 0; i < pattern.length; i++) {\n    const p = pattern[i]\n    const w = words[i]\n    if (pw.has(p) && pw.get(p) !== w) return false\n    if (wp.has(w) && wp.get(w) !== p) return false\n    pw.set(p, w)\n    wp.set(w, p)\n  }\n  return true\n}\n",
    "cases": [
      {
        "args": [
          "abba",
          "dog cat cat dog"
        ],
        "expected": true
      },
      {
        "args": [
          "abba",
          "dog cat cat fish"
        ],
        "expected": false
      },
      {
        "args": [
          "aaaa",
          "dog cat cat dog"
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "mid-077",
    "level": "mid",
    "title": "Rangos resumidos",
    "prompt": "t está ordenado y no tiene repetidos. Resume los tramos consecutivos. Un número solo va sin flecha.\nEjemplo: [0, 1, 2, 4, 5, 7] → [\"0->2\", \"4->5\", \"7\"].",
    "names": [
      "summaryRanges"
    ],
    "starter": "function summaryRanges(t) {\n  \n}\n",
    "explanation": "Se avanza mientras el siguiente sea el actual más 1. Al cortarse el tramo, se escribe el inicio y el fin. Si coinciden, es un número suelto. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un puntero que alarga el tramo mientras la diferencia sea 1",
    "javascript": "function summaryRanges(t) {\n  const out = []\n  let i = 0\n  while (i < t.length) {\n    const start = t[i]\n    while (i + 1 < t.length && t[i + 1] === t[i] + 1) i++\n    out.push(start === t[i] ? String(start) : start + \"->\" + t[i])\n    i++\n  }\n  return out\n}\n",
    "typescript": "function summaryRanges(t: number[]): string[]) {\n  const out = []\n  let i = 0\n  while (i < t.length) {\n    const start = t[i]\n    while (i + 1 < t.length && t[i + 1] === t[i] + 1) i++\n    out.push(start === t[i] ? String(start) : start + \"->\" + t[i])\n    i++\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            0,
            1,
            2,
            4,
            5,
            7
          ]
        ],
        "expected": [
          "0->2",
          "4->5",
          "7"
        ]
      },
      {
        "args": [
          []
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "mid-078",
    "level": "mid",
    "title": "Duplicado cercano",
    "prompt": "Di si hay dos índices i y j, distintos, con el mismo valor y |i - j| <= k.\nEjemplo: [1, 2, 3, 1], 3 → true. [1, 2, 3, 1, 2, 3], 2 → false.",
    "names": [
      "containsNearbyDuplicate"
    ],
    "starter": "function containsNearbyDuplicate(t, k) {\n  \n}\n",
    "explanation": "Solo importa la aparición anterior más reciente. Si la distancia hasta ella cabe en k, ya hay pareja. Luego se actualiza el índice. No hace falta guardar todas las posiciones. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Map del último índice de cada valor",
    "javascript": "function containsNearbyDuplicate(t, k) {\n  const last = new Map()\n  for (let i = 0; i < t.length; i++) {\n    if (last.has(t[i]) && i - last.get(t[i]) <= k) return true\n    last.set(t[i], i)\n  }\n  return false\n}\n",
    "typescript": "function containsNearbyDuplicate(t: number[], k: number): boolean) {\n  const last = new Map()\n  for (let i = 0; i < t.length; i++) {\n    if (last.has(t[i]) && i - last.get(t[i]) <= k) return true\n    last.set(t[i], i)\n  }\n  return false\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3,
            1
          ],
          3
        ],
        "expected": true
      },
      {
        "args": [
          [
            1,
            2,
            3,
            1,
            2,
            3
          ],
          2
        ],
        "expected": false
      },
      {
        "args": [
          [
            1,
            0,
            1,
            1
          ],
          1
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-079",
    "level": "mid",
    "title": "Subsecuencia",
    "prompt": "Di si needle es subsecuencia de text: sus caracteres aparecen en orden, no hace falta que vayan seguidos.\nEjemplo: \"abc\", \"ahbgdc\" → true. \"axc\", \"ahbgdc\" → false.",
    "names": [
      "isSubsequence"
    ],
    "starter": "function isSubsequence(needle, text) {\n  \n}\n",
    "explanation": "Se recorre text una vez. Cada vez que sale el carácter que toca de needle, se avanza en la aguja. Si el índice llega al final, todos encontraron sitio en orden. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un índice que avanza sobre la aguja",
    "javascript": "function isSubsequence(needle, text) {\n  let i = 0\n  for (const ch of text) {\n    if (ch === needle[i]) i++\n  }\n  return i === needle.length\n}\n",
    "typescript": "function isSubsequence(needle: string, text: string): boolean) {\n  let i = 0\n  for (const ch of text) {\n    if (ch === needle[i]) i++\n  }\n  return i === needle.length\n}\n",
    "cases": [
      {
        "args": [
          "abc",
          "ahbgdc"
        ],
        "expected": true
      },
      {
        "args": [
          "axc",
          "ahbgdc"
        ],
        "expected": false
      },
      {
        "args": [
          "",
          "abc"
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-080",
    "level": "mid",
    "title": "Pares delante",
    "prompt": "Devuelve los pares y después los impares, cada grupo en el orden original.\nEjemplo: [3, 1, 2, 4] → [2, 4, 3, 1].",
    "names": [
      "sortByParity"
    ],
    "starter": "function sortByParity(t) {\n  \n}\n",
    "explanation": "Un sort genérico reordenaría dentro de los pares. Aquí se hace una partición estable: primero se copian los pares en orden, luego los impares. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos arrays y concat",
    "javascript": "function sortByParity(t) {\n  const even = []\n  const odd = []\n  for (const n of t) {\n    if (n % 2 === 0) even.push(n)\n    else odd.push(n)\n  }\n  return even.concat(odd)\n}\n",
    "typescript": "function sortByParity(t: number[]): number[]) {\n  const even = []\n  const odd = []\n  for (const n of t) {\n    if (n % 2 === 0) even.push(n)\n    else odd.push(n)\n  }\n  return even.concat(odd)\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            1,
            2,
            4
          ]
        ],
        "expected": [
          2,
          4,
          3,
          1
        ]
      },
      {
        "args": [
          [
            1,
            3
          ]
        ],
        "expected": [
          1,
          3
        ]
      }
    ]
  },
  {
    "id": "mid-081",
    "level": "mid",
    "title": "Mezclar ordenados",
    "prompt": "a y b están ordenados de menor a mayor. Devuelve la mezcla ordenada.\nEjemplo: [1, 3], [2, 2, 4] → [1, 2, 2, 3, 4].",
    "names": [
      "mergeSorted"
    ],
    "starter": "function mergeSorted(a, b) {\n  \n}\n",
    "explanation": "Se compara la cabeza de cada lista y se toma la menor. Cuando una se acaba, se copia el resto de la otra. Es lineal en la suma de las longitudes. Ordenar la concatenación sería más caro y no usa que ya venían ordenadas. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos índices, como el merge del mergesort",
    "javascript": "function mergeSorted(a, b) {\n  const out = []\n  let i = 0\n  let j = 0\n  while (i < a.length && j < b.length) {\n    if (a[i] <= b[j]) out.push(a[i++])\n    else out.push(b[j++])\n  }\n  while (i < a.length) out.push(a[i++])\n  while (j < b.length) out.push(b[j++])\n  return out\n}\n",
    "typescript": "function mergeSorted(a: number[], b: number[]): number[]) {\n  const out = []\n  let i = 0\n  let j = 0\n  while (i < a.length && j < b.length) {\n    if (a[i] <= b[j]) out.push(a[i++])\n    else out.push(b[j++])\n  }\n  while (i < a.length) out.push(a[i++])\n  while (j < b.length) out.push(b[j++])\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            3
          ],
          [
            2,
            2,
            4
          ]
        ],
        "expected": [
          1,
          2,
          2,
          3,
          4
        ]
      },
      {
        "args": [
          [],
          [
            1
          ]
        ],
        "expected": [
          1
        ]
      }
    ]
  },
  {
    "id": "mid-082",
    "level": "mid",
    "title": "Quitar un valor",
    "prompt": "Devuelve un array nuevo sin las apariciones de value. El resto conserva el orden.\nEjemplo: [3, 2, 2, 3], 3 → [2, 2].",
    "names": [
      "withoutValue"
    ],
    "starter": "function withoutValue(t, value) {\n  \n}\n",
    "explanation": "Es un filter escrito a mano. Se copia todo lo que no es value. El array original no se toca. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "filtro con un bucle",
    "javascript": "function withoutValue(t, value) {\n  const out = []\n  for (const n of t) if (n !== value) out.push(n)\n  return out\n}\n",
    "typescript": "function withoutValue(t: number[], value: number): number[]) {\n  const out = []\n  for (const n of t) if (n !== value) out.push(n)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            2,
            2,
            3
          ],
          3
        ],
        "expected": [
          2,
          2
        ]
      },
      {
        "args": [
          [
            1,
            2
          ],
          9
        ],
        "expected": [
          1,
          2
        ]
      }
    ]
  },
  {
    "id": "mid-083",
    "level": "mid",
    "title": "Tercer máximo",
    "prompt": "Devuelve el tercer valor distinto más grande. Si no hay tres distintos, devuelve el máximo. t no está vacío.\nEjemplo: [3, 2, 1] → 1. [2, 2, 3, 1] → 1. [1, 2] → 2.",
    "names": [
      "thirdMax"
    ],
    "starter": "function thirdMax(t) {\n  \n}\n",
    "explanation": "Los repetidos no cuentan como otro máximo. Se dejan los distintos, se ordenan de mayor a menor y se coge el índice 2 si existe. Si no, el índice 0, que es el mayor. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "quitar repetidos, ordenar de mayor a menor",
    "javascript": "function thirdMax(t) {\n  const uniq = []\n  for (const n of t) if (!uniq.includes(n)) uniq.push(n)\n  uniq.sort((a, b) => b - a)\n  return uniq.length >= 3 ? uniq[2] : uniq[0]\n}\n",
    "typescript": "function thirdMax(t: number[]): number) {\n  const uniq = []\n  for (const n of t) if (!uniq.includes(n)) uniq.push(n)\n  uniq.sort((a, b) => b - a)\n  return uniq.length >= 3 ? uniq[2] : uniq[0]\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            2,
            1
          ]
        ],
        "expected": 1
      },
      {
        "args": [
          [
            2,
            2,
            3,
            1
          ]
        ],
        "expected": 1
      },
      {
        "args": [
          [
            1,
            2
          ]
        ],
        "expected": 2
      }
    ]
  },
  {
    "id": "mid-084",
    "level": "mid",
    "title": "Uso de mayúsculas",
    "prompt": "El uso es correcto si todo va en mayúsculas, todo en minúsculas, o solo la primera en mayúscula.\nEjemplo: \"USA\" → true. \"FlaG\" → false. \"Google\" → true.",
    "names": [
      "detectCapital"
    ],
    "starter": "function detectCapital(word) {\n  \n}\n",
    "explanation": "Los tres patrones válidos se comparan con el texto transformado. \"Google\" cumple el tercero: la inicial ya es mayúscula y el resto coincide con su versión en minúsculas. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "toUpperCase y toLowerCase",
    "javascript": "function detectCapital(word) {\n  if (word === word.toUpperCase()) return true\n  if (word === word.toLowerCase()) return true\n  return word[0] === word[0].toUpperCase() && word.slice(1) === word.slice(1).toLowerCase()\n}\n",
    "typescript": "function detectCapital(word: string): boolean) {\n  if (word === word.toUpperCase()) return true\n  if (word === word.toLowerCase()) return true\n  return word[0] === word[0].toUpperCase() && word.slice(1) === word.slice(1).toLowerCase()\n}\n",
    "cases": [
      {
        "args": [
          "USA"
        ],
        "expected": true
      },
      {
        "args": [
          "FlaG"
        ],
        "expected": false
      },
      {
        "args": [
          "Google"
        ],
        "expected": true
      },
      {
        "args": [
          "leetcode"
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-085",
    "level": "mid",
    "title": "La letra añadida",
    "prompt": "b es a con una letra extra, en cualquier sitio. Devuelve esa letra.\nEjemplo: \"abcd\", \"abcde\" → \"e\".",
    "names": [
      "findTheDifference"
    ],
    "starter": "function findTheDifference(a, b) {\n  \n}\n",
    "explanation": "Las letras compartidas se anulan al hacer XOR de sus códigos. Queda el código de la letra extra. También valdría un conteo; el XOR no usa memoria extra. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "XOR de los códigos de carácter",
    "javascript": "function findTheDifference(a, b) {\n  let code = 0\n  for (const ch of a) code ^= ch.charCodeAt(0)\n  for (const ch of b) code ^= ch.charCodeAt(0)\n  return String.fromCharCode(code)\n}\n",
    "typescript": "function findTheDifference(a: string, b: string): string) {\n  let code = 0\n  for (const ch of a) code ^= ch.charCodeAt(0)\n  for (const ch of b) code ^= ch.charCodeAt(0)\n  return String.fromCharCode(code)\n}\n",
    "cases": [
      {
        "args": [
          "abcd",
          "abcde"
        ],
        "expected": "e"
      },
      {
        "args": [
          "",
          "y"
        ],
        "expected": "y"
      }
    ]
  },
  {
    "id": "mid-086",
    "level": "mid",
    "title": "Morse único",
    "prompt": "Cada letra minúscula tiene un código morse, de la a a la z en este orden: \".-\", \"-...\", \"-.-.\", \"-..\", \".\", \"..-.\", \"--.\", \"....\", \"..\", \".---\", \"-.-\", \".-..\", \"--\", \"-.\", \"---\", \".--.\", \"--.-\", \".-.\", \"...\", \"-\", \"..-\", \"...-\", \".--\", \"-..-\", \"-.--\", \"--..\". Devuelve cuántas transformaciones distintas hay.\nEjemplo: [\"gin\", \"zen\", \"gig\", \"msg\"] → 2.",
    "names": [
      "uniqueMorse"
    ],
    "starter": "function uniqueMorse(words) {\n  \n}\n",
    "explanation": "La posición de la letra es su código menos 97, el código de \"a\". Se concatena el morse de cada letra y se mete en un Set. El tamaño del Set es el número de resultados distintos. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "tabla de 26 códigos y un Set",
    "javascript": "function uniqueMorse(words) {\n  const morse = [\".-\", \"-...\", \"-.-.\", \"-..\", \".\", \"..-.\", \"--.\", \"....\", \"..\", \".---\", \"-.-\", \".-..\", \"--\", \"-.\", \"---\", \".--.\", \"--.-\", \".-.\", \"...\", \"-\", \"..-\", \"...-\", \".--\", \"-..-\", \"-.--\", \"--..\"]\n  const seen = new Set()\n  for (const word of words) {\n    let code = ''\n    for (const ch of word) code += morse[ch.charCodeAt(0) - 97]\n    seen.add(code)\n  }\n  return seen.size\n}\n",
    "typescript": "function uniqueMorse(words: string[]): number) {\n  const morse = [\".-\", \"-...\", \"-.-.\", \"-..\", \".\", \"..-.\", \"--.\", \"....\", \"..\", \".---\", \"-.-\", \".-..\", \"--\", \"-.\", \"---\", \".--.\", \"--.-\", \".-.\", \"...\", \"-\", \"..-\", \"...-\", \".--\", \"-..-\", \"-.--\", \"--..\"]\n  const seen = new Set()\n  for (const word of words) {\n    let code = ''\n    for (const ch of word) code += morse[ch.charCodeAt(0) - 97]\n    seen.add(code)\n  }\n  return seen.size\n}\n",
    "cases": [
      {
        "args": [
          [
            "gin",
            "zen",
            "gig",
            "msg"
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            "a"
          ]
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "mid-087",
    "level": "mid",
    "title": "Vuelta al origen",
    "prompt": "moves usa U, D, L y R. Di si se acaba en el origen.\nEjemplo: \"UD\" → true. \"LL\" → false.",
    "names": [
      "judgeCircle"
    ],
    "starter": "function judgeCircle(moves) {\n  \n}\n",
    "explanation": "Arriba suma 1 a y, abajo resta, izquierda resta a x y derecha suma. Al origen se vuelve si ambos contadores acaban en 0. No hace falta simular el camino completo, solo el balance. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos contadores, x e y",
    "javascript": "function judgeCircle(moves) {\n  let x = 0\n  let y = 0\n  for (const move of moves) {\n    if (move === 'U') y++\n    else if (move === 'D') y--\n    else if (move === 'L') x--\n    else if (move === 'R') x++\n  }\n  return x === 0 && y === 0\n}\n",
    "typescript": "function judgeCircle(moves: string): boolean) {\n  let x = 0\n  let y = 0\n  for (const move of moves) {\n    if (move === 'U') y++\n    else if (move === 'D') y--\n    else if (move === 'L') x--\n    else if (move === 'R') x++\n  }\n  return x === 0 && y === 0\n}\n",
    "cases": [
      {
        "args": [
          "UD"
        ],
        "expected": true
      },
      {
        "args": [
          "LL"
        ],
        "expected": false
      },
      {
        "args": [
          "URDL"
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-088",
    "level": "mid",
    "title": "Suma de parejas",
    "prompt": "t tiene longitud par. Se forman parejas y se suma el mínimo de cada una. Devuelve la mayor suma posible.\nEjemplo: [1, 4, 3, 2] → 4, con las parejas (1, 2) y (3, 4).",
    "names": [
      "arrayPairSum"
    ],
    "starter": "function arrayPairSum(t) {\n  \n}\n",
    "explanation": "Ordenado, la mejor estrategia es emparejar vecinos: el mínimo de cada pareja es el de la izquierda. Sumar los índices pares del array ordenado da ese total. Emparejar el mayor con el menor desperdicia al mayor. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ordenar y sumar las posiciones pares",
    "javascript": "function arrayPairSum(t) {\n  const sorted = t.slice().sort((a, b) => a - b)\n  let total = 0\n  for (let i = 0; i < sorted.length; i += 2) total += sorted[i]\n  return total\n}\n",
    "typescript": "function arrayPairSum(t: number[]): number) {\n  const sorted = t.slice().sort((a, b) => a - b)\n  let total = 0\n  for (let i = 0; i < sorted.length; i += 2) total += sorted[i]\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            4,
            3,
            2
          ]
        ],
        "expected": 4
      },
      {
        "args": [
          [
            6,
            2,
            6,
            5,
            1,
            2
          ]
        ],
        "expected": 9
      }
    ]
  },
  {
    "id": "mid-089",
    "level": "mid",
    "title": "Producto de tres",
    "prompt": "Devuelve el máximo producto de tres números distintos de t. Puede haber negativos. t tiene al menos tres.\nEjemplo: [1, 2, 3, 4] → 24. [-10, -10, 1, 3, 2] → 300.",
    "names": [
      "maximumProductThree"
    ],
    "starter": "function maximumProductThree(t) {\n  \n}\n",
    "explanation": "El producto máximo o sale de los tres mayores, o de los dos negativos más pequeños (su producto es positivo) por el mayor. Ordenar deja esos candidatos en los extremos. No hace falta probar todas las tripletas. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ordenar y comparar el producto de los tres mayores con el de los dos menores y el mayor",
    "javascript": "function maximumProductThree(t) {\n  const sorted = t.slice().sort((a, b) => a - b)\n  const n = sorted.length\n  const last = sorted[n - 1] * sorted[n - 2] * sorted[n - 3]\n  const withNeg = sorted[0] * sorted[1] * sorted[n - 1]\n  return last > withNeg ? last : withNeg\n}\n",
    "typescript": "function maximumProductThree(t: number[]): number) {\n  const sorted = t.slice().sort((a, b) => a - b)\n  const n = sorted.length\n  const last = sorted[n - 1] * sorted[n - 2] * sorted[n - 3]\n  const withNeg = sorted[0] * sorted[1] * sorted[n - 1]\n  return last > withNeg ? last : withNeg\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": 24
      },
      {
        "args": [
          [
            -10,
            -10,
            1,
            3,
            2
          ]
        ],
        "expected": 300
      }
    ]
  },
  {
    "id": "mid-090",
    "level": "mid",
    "title": "Triplete creciente",
    "prompt": "Di si hay tres índices i < j < k con t[i] < t[j] < t[k].\nEjemplo: [1, 2, 3, 4, 5] → true. [5, 4, 3, 2, 1] → false. [2, 1, 5, 0, 4, 6] → true.",
    "names": [
      "increasingTriplet"
    ],
    "starter": "function increasingTriplet(t) {\n  \n}\n",
    "explanation": "Se guardan el menor número que podría ser el primero y el menor que podría ser el segundo. Si aparece uno mayor que ese segundo, ya hay triplete. No se guardan los índices: el orden del recorrido garantiza i < j < k. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el menor visto y el segundo menor de una creciente",
    "javascript": "function increasingTriplet(t) {\n  let first = Infinity\n  let second = Infinity\n  for (const n of t) {\n    if (n <= first) first = n\n    else if (n <= second) second = n\n    else return true\n  }\n  return false\n}\n",
    "typescript": "function increasingTriplet(t: number[]): boolean) {\n  let first = Infinity\n  let second = Infinity\n  for (const n of t) {\n    if (n <= first) first = n\n    else if (n <= second) second = n\n    else return true\n  }\n  return false\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3,
            4,
            5
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            5,
            4,
            3,
            2,
            1
          ]
        ],
        "expected": false
      },
      {
        "args": [
          [
            2,
            1,
            5,
            0,
            4,
            6
          ]
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "mid-091",
    "level": "mid",
    "title": "Subarray mínimo que suma",
    "prompt": "t tiene números positivos. Devuelve la longitud mínima de un subarray contiguo que sume al menos target. Si no hay, 0.\nEjemplo: 7, [2, 3, 1, 2, 4, 3] → 2.",
    "names": [
      "minSubArrayLen"
    ],
    "starter": "function minSubArrayLen(target, t) {\n  \n}\n",
    "explanation": "La ventana suma lo que hay entre start e i. Cuando llega al objetivo, se intenta encoger por la izquierda y se guarda la longitud mínima. Los números son positivos, así que mover el inicio siempre resta. Es lineal. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ventana deslizante",
    "javascript": "function minSubArrayLen(target, t) {\n  let best = t.length + 1\n  let sum = 0\n  let start = 0\n  for (let i = 0; i < t.length; i++) {\n    sum += t[i]\n    while (sum >= target) {\n      const size = i - start + 1\n      if (size < best) best = size\n      sum -= t[start]\n      start++\n    }\n  }\n  return best > t.length ? 0 : best\n}\n",
    "typescript": "function minSubArrayLen(target: number, t: number[]): number) {\n  let best = t.length + 1\n  let sum = 0\n  let start = 0\n  for (let i = 0; i < t.length; i++) {\n    sum += t[i]\n    while (sum >= target) {\n      const size = i - start + 1\n      if (size < best) best = size\n      sum -= t[start]\n      start++\n    }\n  }\n  return best > t.length ? 0 : best\n}\n",
    "cases": [
      {
        "args": [
          7,
          [
            2,
            3,
            1,
            2,
            4,
            3
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          4,
          [
            1,
            1
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "mid-092",
    "level": "mid",
    "title": "Días más cálidos",
    "prompt": "Para cada día, devuelve cuántos días hay que esperar hasta uno más cálido. Si no llega, 0.\nEjemplo: [73, 74, 75, 71, 69, 72, 76, 73] → [1, 1, 4, 2, 1, 1, 0, 0].",
    "names": [
      "dailyTemperatures"
    ],
    "starter": "function dailyTemperatures(t) {\n  \n}\n",
    "explanation": "La pila guarda días que todavía no han encontrado uno más cálido, de temperatura decreciente. Cuando llega un día más cálido que la cima, se resuelve ese índice y se desapila. Cada índice entra y sale una vez. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "pila de índices decreciente",
    "javascript": "function dailyTemperatures(t) {\n  const out = t.map(() => 0)\n  const stack = []\n  for (let i = 0; i < t.length; i++) {\n    while (stack.length && t[i] > t[stack[stack.length - 1]]) {\n      const prev = stack.pop()\n      out[prev] = i - prev\n    }\n    stack.push(i)\n  }\n  return out\n}\n",
    "typescript": "function dailyTemperatures(t: number[]): number[]) {\n  const out = t.map(() => 0)\n  const stack = []\n  for (let i = 0; i < t.length; i++) {\n    while (stack.length && t[i] > t[stack[stack.length - 1]]) {\n      const prev = stack.pop()\n      out[prev] = i - prev\n    }\n    stack.push(i)\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            73,
            74,
            75,
            71,
            69,
            72,
            76,
            73
          ]
        ],
        "expected": [
          1,
          1,
          4,
          2,
          1,
          1,
          0,
          0
        ]
      }
    ]
  },
  {
    "id": "mid-093",
    "level": "mid",
    "title": "Notación polaca",
    "prompt": "Evalúa una expresión en notación polaca inversa. Los operadores son +, -, * y /. La división trunca hacia cero.\nEjemplo: [\"2\", \"1\", \"+\", \"3\", \"*\"] → 9. [\"4\", \"13\", \"5\", \"/\", \"+\"] → 6.",
    "names": [
      "evalRPN"
    ],
    "starter": "function evalRPN(tokens) {\n  \n}\n",
    "explanation": "Un número se apila. Un operador desapila dos operandos, el derecho es el último, y apila el resultado. Math.trunc tira hacia cero, que no es lo mismo que Math.floor con negativos. Al final queda un solo valor. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "pila de operandos y Math.trunc",
    "javascript": "function evalRPN(tokens) {\n  const stack = []\n  for (const token of tokens) {\n    if (token !== '+' && token !== '-' && token !== '*' && token !== '/') {\n      stack.push(Number(token))\n      continue\n    }\n    const b = stack.pop()\n    const a = stack.pop()\n    if (token === '+') stack.push(a + b)\n    else if (token === '-') stack.push(a - b)\n    else if (token === '*') stack.push(a * b)\n    else stack.push(Math.trunc(a / b))\n  }\n  return stack[0]\n}\n",
    "typescript": "function evalRPN(tokens: string[]): number) {\n  const stack = []\n  for (const token of tokens) {\n    if (token !== '+' && token !== '-' && token !== '*' && token !== '/') {\n      stack.push(Number(token))\n      continue\n    }\n    const b = stack.pop()\n    const a = stack.pop()\n    if (token === '+') stack.push(a + b)\n    else if (token === '-') stack.push(a - b)\n    else if (token === '*') stack.push(a * b)\n    else stack.push(Math.trunc(a / b))\n  }\n  return stack[0]\n}\n",
    "cases": [
      {
        "args": [
          [
            "2",
            "1",
            "+",
            "3",
            "*"
          ]
        ],
        "expected": 9
      },
      {
        "args": [
          [
            "4",
            "13",
            "5",
            "/",
            "+"
          ]
        ],
        "expected": 6
      },
      {
        "args": [
          [
            "-4",
            "2",
            "/"
          ]
        ],
        "expected": -2
      }
    ]
  },
  {
    "id": "mid-094",
    "level": "mid",
    "title": "Siguiente mayor",
    "prompt": "Para cada posición, devuelve el primer valor de su derecha que sea mayor. Si no hay, -1.\nEjemplo: [2, 1, 2, 4, 3] → [4, 2, 4, -1, -1].",
    "names": [
      "nextGreater"
    ],
    "starter": "function nextGreater(t) {\n  \n}\n",
    "explanation": "Es el mismo esqueleto que los días más cálidos, pero se guarda el valor, no la distancia. La pila mantiene índices cuyo siguiente mayor todavía no ha llegado, en orden decreciente de valor. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "pila monótona de índices",
    "javascript": "function nextGreater(t) {\n  const out = t.map(() => -1)\n  const stack = []\n  for (let i = 0; i < t.length; i++) {\n    while (stack.length && t[i] > t[stack[stack.length - 1]]) {\n      out[stack.pop()] = t[i]\n    }\n    stack.push(i)\n  }\n  return out\n}\n",
    "typescript": "function nextGreater(t: number[]): number[]) {\n  const out = t.map(() => -1)\n  const stack = []\n  for (let i = 0; i < t.length; i++) {\n    while (stack.length && t[i] > t[stack[stack.length - 1]]) {\n      out[stack.pop()] = t[i]\n    }\n    stack.push(i)\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            1,
            2,
            4,
            3
          ]
        ],
        "expected": [
          4,
          2,
          4,
          -1,
          -1
        ]
      }
    ]
  },
  {
    "id": "mid-095",
    "level": "mid",
    "title": "Los k más frecuentes",
    "prompt": "Devuelve los k números más frecuentes. Si empatan en frecuencia, va antes el número menor. k es al menos 1 y no supera a los distintos.\nEjemplo: [1, 1, 1, 2, 2, 3], 2 → [1, 2].",
    "names": [
      "topKFrequent"
    ],
    "starter": "function topKFrequent(t, k) {\n  \n}\n",
    "explanation": "Se cuenta y se ordena por frecuencia descendente. El desempate por número menor deja el resultado estable para las pruebas. Un heap de tamaño k bajaría el coste si k es pequeño; ordenar es más corto y suficiente aquí. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Map de conteos y sort",
    "javascript": "function topKFrequent(t, k) {\n  const count = new Map()\n  for (const n of t) count.set(n, (count.get(n) ?? 0) + 1)\n  return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]).slice(0, k).map((pair) => pair[0])\n}\n",
    "typescript": "function topKFrequent(t: number[], k: number): number[]) {\n  const count = new Map()\n  for (const n of t) count.set(n, (count.get(n) ?? 0) + 1)\n  return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]).slice(0, k).map((pair) => pair[0])\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            1,
            1,
            2,
            2,
            3
          ],
          2
        ],
        "expected": [
          1,
          2
        ]
      },
      {
        "args": [
          [
            4,
            4,
            5,
            5
          ],
          2
        ],
        "expected": [
          4,
          5
        ]
      }
    ]
  },
  {
    "id": "mid-096",
    "level": "mid",
    "title": "Subarrays que suman k",
    "prompt": "Cuenta los subarrays contiguos que suman k. Puede haber negativos.\nEjemplo: [1, 1, 1], 2 → 2. [1, 2, 3], 3 → 2.",
    "names": [
      "subarraySum"
    ],
    "starter": "function subarraySum(t, k) {\n  \n}\n",
    "explanation": "Si la suma hasta i menos la suma hasta j es k, el tramo (j, i] suma k. El Map dice cuántos prefijos valen suma - k. El prefijo 0 aparece una vez antes de empezar, para los subarrays que parten del inicio. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "suma prefijo y Map de cuántas veces se ha visto cada suma",
    "javascript": "function subarraySum(t, k) {\n  const seen = new Map([[0, 1]])\n  let sum = 0\n  let total = 0\n  for (const n of t) {\n    sum += n\n    total += seen.get(sum - k) ?? 0\n    seen.set(sum, (seen.get(sum) ?? 0) + 1)\n  }\n  return total\n}\n",
    "typescript": "function subarraySum(t: number[], k: number): number) {\n  const seen = new Map([[0, 1]])\n  let sum = 0\n  let total = 0\n  for (const n of t) {\n    sum += n\n    total += seen.get(sum - k) ?? 0\n    seen.set(sum, (seen.get(sum) ?? 0) + 1)\n  }\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            1,
            1
          ],
          2
        ],
        "expected": 2
      },
      {
        "args": [
          [
            1,
            2,
            3
          ],
          3
        ],
        "expected": 2
      },
      {
        "args": [
          [
            1
          ],
          0
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "mid-097",
    "level": "mid",
    "title": "Índices de anagramas",
    "prompt": "Devuelve los índices donde empieza un anagrama de needle dentro de text. Las letras son minúsculas.\nEjemplo: \"cbaebabacd\", \"abc\" → [0, 6].",
    "names": [
      "findAnagrams"
    ],
    "starter": "function findAnagrams(text, needle) {\n  \n}\n",
    "explanation": "Se compara el conteo de la ventana con el de la aguja. Al avanzar, entra una letra y sale la que queda fuera. Así no se reordena cada substring. El índice que se guarda es el inicio de la ventana. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ventana del tamaño de la aguja y dos Map",
    "javascript": "function findAnagrams(text, needle) {\n  const out = []\n  if (needle.length > text.length) return out\n  const need = new Map()\n  for (const ch of needle) need.set(ch, (need.get(ch) ?? 0) + 1)\n  const window = new Map()\n  const same = () => {\n    if (window.size !== need.size) return false\n    for (const [key, value] of need) if (window.get(key) !== value) return false\n    return true\n  }\n  for (let i = 0; i < text.length; i++) {\n    window.set(text[i], (window.get(text[i]) ?? 0) + 1)\n    if (i >= needle.length) {\n      const left = text[i - needle.length]\n      const next = window.get(left) - 1\n      if (next === 0) window.delete(left)\n      else window.set(left, next)\n    }\n    if (i >= needle.length - 1 && same()) out.push(i - needle.length + 1)\n  }\n  return out\n}\n",
    "typescript": "function findAnagrams(text: string, needle: string): number[]) {\n  const out = []\n  if (needle.length > text.length) return out\n  const need = new Map()\n  for (const ch of needle) need.set(ch, (need.get(ch) ?? 0) + 1)\n  const window = new Map()\n  const same = () => {\n    if (window.size !== need.size) return false\n    for (const [key, value] of need) if (window.get(key) !== value) return false\n    return true\n  }\n  for (let i = 0; i < text.length; i++) {\n    window.set(text[i], (window.get(text[i]) ?? 0) + 1)\n    if (i >= needle.length) {\n      const left = text[i - needle.length]\n      const next = window.get(left) - 1\n      if (next === 0) window.delete(left)\n      else window.set(left, next)\n    }\n    if (i >= needle.length - 1 && same()) out.push(i - needle.length + 1)\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "cbaebabacd",
          "abc"
        ],
        "expected": [
          0,
          6
        ]
      },
      {
        "args": [
          "abc",
          "abcd"
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "mid-098",
    "level": "mid",
    "title": "Reemplazos en la ventana",
    "prompt": "Puedes cambiar hasta k letras. Devuelve la longitud del substring más largo que puede quedar con todas las letras iguales. Las letras son mayúsculas.\nEjemplo: \"ABAB\", 2 → 4. \"AABABBA\", 1 → 4.",
    "names": [
      "characterReplacement"
    ],
    "starter": "function characterReplacement(text, k) {\n  \n}\n",
    "explanation": "En una ventana, los cambios necesarios son longitud menos la letra que más se repite. Si pasan de k, se mueve el inicio. La letra dominante no se recalcula hacia abajo al encoger: en este problema eso no estropea el máximo, porque una ventana mejor ya se habría visto. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ventana deslizante y el conteo de la letra más repetida dentro",
    "javascript": "function characterReplacement(text, k) {\n  const count = new Map()\n  let best = 0\n  let maxCount = 0\n  let start = 0\n  for (let i = 0; i < text.length; i++) {\n    const next = (count.get(text[i]) ?? 0) + 1\n    count.set(text[i], next)\n    if (next > maxCount) maxCount = next\n    while (i - start + 1 - maxCount > k) {\n      count.set(text[start], count.get(text[start]) - 1)\n      start++\n    }\n    const size = i - start + 1\n    if (size > best) best = size\n  }\n  return best\n}\n",
    "typescript": "function characterReplacement(text: string, k: number): number) {\n  const count = new Map()\n  let best = 0\n  let maxCount = 0\n  let start = 0\n  for (let i = 0; i < text.length; i++) {\n    const next = (count.get(text[i]) ?? 0) + 1\n    count.set(text[i], next)\n    if (next > maxCount) maxCount = next\n    while (i - start + 1 - maxCount > k) {\n      count.set(text[start], count.get(text[start]) - 1)\n      start++\n    }\n    const size = i - start + 1\n    if (size > best) best = size\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          "ABAB",
          2
        ],
        "expected": 4
      },
      {
        "args": [
          "AABABBA",
          1
        ],
        "expected": 4
      }
    ]
  },
  {
    "id": "mid-099",
    "level": "mid",
    "title": "Permutación en el texto",
    "prompt": "Di si algún substring de text es una permutación de needle. Letras minúsculas.\nEjemplo: \"ab\", \"eidbaooo\" → true. \"ab\", \"eidboaoo\" → false.",
    "names": [
      "checkInclusion"
    ],
    "starter": "function checkInclusion(needle, text) {\n  \n}\n",
    "explanation": "Como el alfabeto es fijo, dos arrays de 26 bastan. La ventana tiene el tamaño de la aguja. Se compara el conteo; al avanzar, una letra entra y otra sale. Es el mismo criterio que findAnagrams, pero aquí solo importa si existe. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ventana fija y dos conteos de 26 letras",
    "javascript": "function checkInclusion(needle, text) {\n  if (needle.length > text.length) return false\n  const need = new Array(26).fill(0)\n  const window = new Array(26).fill(0)\n  for (let i = 0; i < needle.length; i++) {\n    need[needle.charCodeAt(i) - 97]++\n    window[text.charCodeAt(i) - 97]++\n  }\n  const equal = () => need.every((value, index) => value === window[index])\n  if (equal()) return true\n  for (let i = needle.length; i < text.length; i++) {\n    window[text.charCodeAt(i) - 97]++\n    window[text.charCodeAt(i - needle.length) - 97]--\n    if (equal()) return true\n  }\n  return false\n}\n",
    "typescript": "function checkInclusion(needle: string, text: string): boolean) {\n  if (needle.length > text.length) return false\n  const need = new Array(26).fill(0)\n  const window = new Array(26).fill(0)\n  for (let i = 0; i < needle.length; i++) {\n    need[needle.charCodeAt(i) - 97]++\n    window[text.charCodeAt(i) - 97]++\n  }\n  const equal = () => need.every((value, index) => value === window[index])\n  if (equal()) return true\n  for (let i = needle.length; i < text.length; i++) {\n    window[text.charCodeAt(i) - 97]++\n    window[text.charCodeAt(i - needle.length) - 97]--\n    if (equal()) return true\n  }\n  return false\n}\n",
    "cases": [
      {
        "args": [
          "ab",
          "eidbaooo"
        ],
        "expected": true
      },
      {
        "args": [
          "ab",
          "eidboaoo"
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "mid-100",
    "level": "mid",
    "title": "Cuatro arrays que suman cero",
    "prompt": "Cuenta cuántas tuplas (i, j, k, l) cumplen a[i] + b[j] + c[k] + d[l] = 0.\nEjemplo: [1, 2], [-2, -1], [-1, 2], [0, 2] → 2.",
    "names": [
      "fourSumCount"
    ],
    "starter": "function fourSumCount(a, b, c, d) {\n  \n}\n",
    "explanation": "Probar las cuatro combinaciones es n⁴. Se guardan las sumas de a y b, y luego cada suma de c y d busca su negativo. Baja a n² en tiempo y memoria. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Map de las sumas de los dos primeros arrays",
    "javascript": "function fourSumCount(a, b, c, d) {\n  const sums = new Map()\n  for (const x of a) for (const y of b) sums.set(x + y, (sums.get(x + y) ?? 0) + 1)\n  let total = 0\n  for (const x of c) for (const y of d) total += sums.get(-(x + y)) ?? 0\n  return total\n}\n",
    "typescript": "function fourSumCount(a: number[], b: number[], c: number[], d: number[]): number) {\n  const sums = new Map()\n  for (const x of a) for (const y of b) sums.set(x + y, (sums.get(x + y) ?? 0) + 1)\n  let total = 0\n  for (const x of c) for (const y of d) total += sums.get(-(x + y)) ?? 0\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2
          ],
          [
            -2,
            -1
          ],
          [
            -1,
            2
          ],
          [
            0,
            2
          ]
        ],
        "expected": 2
      }
    ]
  },
  {
    "id": "senior-001",
    "level": "senior",
    "title": "Caché LRU",
    "prompt": "Simula una caché LRU de capacidad capacity. \"put\" guarda clave y valor y refresca el uso. \"get\" devuelve el valor o null, y también refresca. Si se pasa la capacidad, se expulsa el menos reciente. Devuelve solo los resultados de los get, en orden.\nEjemplo: capacidad 2 y put(1,1), put(2,2), get(1), put(3,3), get(2), get(3) → [1, null, 3].",
    "names": [
      "runLru"
    ],
    "starter": "function runLru(capacity, operations) {\n  \n}\n",
    "explanation": "Borrar y volver a insertar mueve la clave al final, que aquí es lo más reciente. Al pasar la capacidad se borra la primera clave del Map, la más antigua. Un objeto plano no serviría: no garantiza orden. El coste de cada operación es amortizado constante. La alternativa es una lista doblemente enlazada más un mapa, que es lo que el Map esconde. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Map de JavaScript, que conserva el orden de inserción",
    "javascript": "function runLru(capacity, operations) {\n  const map = new Map()\n  const out = []\n  for (const op of operations) {\n    if (op[0] === 'put') {\n      if (map.has(op[1])) map.delete(op[1])\n      map.set(op[1], op[2])\n      if (map.size > capacity) map.delete(map.keys().next().value)\n    } else if (!map.has(op[1])) out.push(null)\n    else {\n      const value = map.get(op[1])\n      map.delete(op[1])\n      map.set(op[1], value)\n      out.push(value)\n    }\n  }\n  return out\n}\n",
    "typescript": "function runLru(capacity: number, operations: Array<[\"put\", number, number] | [\"get\", number]>): Array<number | null>) {\n  const map = new Map()\n  const out = []\n  for (const op of operations) {\n    if (op[0] === 'put') {\n      if (map.has(op[1])) map.delete(op[1])\n      map.set(op[1], op[2])\n      if (map.size > capacity) map.delete(map.keys().next().value)\n    } else if (!map.has(op[1])) out.push(null)\n    else {\n      const value = map.get(op[1])\n      map.delete(op[1])\n      map.set(op[1], value)\n      out.push(value)\n    }\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          2,
          [
            [
              "put",
              1,
              1
            ],
            [
              "put",
              2,
              2
            ],
            [
              "get",
              1
            ],
            [
              "put",
              3,
              3
            ],
            [
              "get",
              2
            ],
            [
              "get",
              3
            ]
          ]
        ],
        "expected": [
          1,
          null,
          3
        ]
      }
    ]
  },
  {
    "id": "senior-002",
    "level": "senior",
    "title": "Pila con mínimo",
    "prompt": "Simula una pila. \"push\" apila un número. \"pop\" desapila. \"top\" devuelve la cima. \"min\" devuelve el mínimo actual. Las operaciones son válidas. Devuelve los resultados de top y min, en orden.\nEjemplo: push -2, push 0, push -3, min, pop, top, min → [-3, 0, -2].",
    "names": [
      "runMinStack"
    ],
    "starter": "function runMinStack(operations) {\n  \n}\n",
    "explanation": "Mirar toda la pila en cada min sería lineal. La segunda pila guarda el mínimo de todo lo que hay debajo, incluida la cima. Al apilar, el nuevo mínimo es el menor entre el valor y el mínimo anterior. Al desapilar se tiran las dos cimas. top y min quedan en tiempo constante. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos pilas: los valores y el mínimo hasta cada altura",
    "javascript": "function runMinStack(operations) {\n  const stack = []\n  const mins = []\n  const out = []\n  for (const op of operations) {\n    if (op[0] === 'push') {\n      stack.push(op[1])\n      const min = mins.length === 0 || op[1] < mins[mins.length - 1] ? op[1] : mins[mins.length - 1]\n      mins.push(min)\n    } else if (op[0] === 'pop') {\n      stack.pop()\n      mins.pop()\n    } else if (op[0] === 'top') out.push(stack[stack.length - 1])\n    else out.push(mins[mins.length - 1])\n  }\n  return out\n}\n",
    "typescript": "function runMinStack(operations: Array<[\"push\", number] | [\"pop\"] | [\"top\"] | [\"min\"]>): number[]) {\n  const stack = []\n  const mins = []\n  const out = []\n  for (const op of operations) {\n    if (op[0] === 'push') {\n      stack.push(op[1])\n      const min = mins.length === 0 || op[1] < mins[mins.length - 1] ? op[1] : mins[mins.length - 1]\n      mins.push(min)\n    } else if (op[0] === 'pop') {\n      stack.pop()\n      mins.pop()\n    } else if (op[0] === 'top') out.push(stack[stack.length - 1])\n    else out.push(mins[mins.length - 1])\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              "push",
              -2
            ],
            [
              "push",
              0
            ],
            [
              "push",
              -3
            ],
            [
              "min"
            ],
            [
              "pop"
            ],
            [
              "top"
            ],
            [
              "min"
            ]
          ]
        ],
        "expected": [
          -3,
          0,
          -2
        ]
      }
    ]
  },
  {
    "id": "senior-003",
    "level": "senior",
    "title": "Cola con dos pilas",
    "prompt": "Simula una cola usando la idea de dos pilas. \"push\" encola. \"pop\" desencola. \"peek\" mira el primero sin quitarlo. Devuelve los resultados de pop y peek.\nEjemplo: push 1, push 2, peek, pop, peek → [1, 1, 2].",
    "names": [
      "queueTwoStacks"
    ],
    "starter": "function queueTwoStacks(operations) {\n  \n}\n",
    "explanation": "La entrada apila los push. Para sacar por el frente hay que invertirla en la salida, y solo cuando la salida está vacía: si se invirtiera en cada operación se rompería el orden. pop y peek comparten ese volcado. Cada elemento se mueve como mucho una vez de una pila a la otra, así que el coste amortizado es constante. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una pila de entrada y otra de salida",
    "javascript": "function queueTwoStacks(operations) {\n  const inbox = []\n  const outbox = []\n  const out = []\n  function move() {\n    if (outbox.length === 0) while (inbox.length) outbox.push(inbox.pop())\n  }\n  for (const op of operations) {\n    if (op[0] === 'push') inbox.push(op[1])\n    else if (op[0] === 'pop') {\n      move()\n      out.push(outbox.pop())\n    } else {\n      move()\n      out.push(outbox[outbox.length - 1])\n    }\n  }\n  return out\n}\n",
    "typescript": "function queueTwoStacks(operations: Array<[\"push\", number] | [\"pop\"] | [\"peek\"]>): number[]) {\n  const inbox = []\n  const outbox = []\n  const out = []\n  function move() {\n    if (outbox.length === 0) while (inbox.length) outbox.push(inbox.pop())\n  }\n  for (const op of operations) {\n    if (op[0] === 'push') inbox.push(op[1])\n    else if (op[0] === 'pop') {\n      move()\n      out.push(outbox.pop())\n    } else {\n      move()\n      out.push(outbox[outbox.length - 1])\n    }\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              "push",
              1
            ],
            [
              "push",
              2
            ],
            [
              "peek"
            ],
            [
              "pop"
            ],
            [
              "peek"
            ]
          ]
        ],
        "expected": [
          1,
          1,
          2
        ]
      }
    ]
  },
  {
    "id": "senior-004",
    "level": "senior",
    "title": "Historial del navegador",
    "prompt": "Empiezas en start. \"visit\" abre una url y borra el adelante. \"back\" y \"forward\" se mueven como mucho los pasos pedidos, sin salirse. Devuelve la url después de cada operación.\nEjemplo: start \"A\"; visit B, visit C, back 1, back 1, forward 1 → [\"B\", \"C\", \"B\", \"A\", \"B\"].",
    "names": [
      "browserHistory"
    ],
    "starter": "function browserHistory(start, operations) {\n  \n}\n",
    "explanation": "Visitar apila la actual en atrás, cambia la actual y vacía adelante: el futuro anterior ya no existe. Atrás mueve la actual a adelante. Adelante hace el camino inverso. El while corta solo si se acaban los pasos o la pila. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos pilas, atrás y adelante, y la url actual",
    "javascript": "function browserHistory(start, operations) {\n  const back = []\n  let current = start\n  const forward = []\n  const out = []\n  for (const op of operations) {\n    if (op[0] === 'visit') {\n      back.push(current)\n      current = op[1]\n      forward.length = 0\n    } else if (op[0] === 'back') {\n      let steps = op[1]\n      while (steps > 0 && back.length) {\n        forward.push(current)\n        current = back.pop()\n        steps--\n      }\n    } else {\n      let steps = op[1]\n      while (steps > 0 && forward.length) {\n        back.push(current)\n        current = forward.pop()\n        steps--\n      }\n    }\n    out.push(current)\n  }\n  return out\n}\n",
    "typescript": "function browserHistory(start: string, operations: Array<[\"visit\", string] | [\"back\", number] | [\"forward\", number]>): string[]) {\n  const back = []\n  let current = start\n  const forward = []\n  const out = []\n  for (const op of operations) {\n    if (op[0] === 'visit') {\n      back.push(current)\n      current = op[1]\n      forward.length = 0\n    } else if (op[0] === 'back') {\n      let steps = op[1]\n      while (steps > 0 && back.length) {\n        forward.push(current)\n        current = back.pop()\n        steps--\n      }\n    } else {\n      let steps = op[1]\n      while (steps > 0 && forward.length) {\n        back.push(current)\n        current = forward.pop()\n        steps--\n      }\n    }\n    out.push(current)\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "A",
          [
            [
              "visit",
              "B"
            ],
            [
              "visit",
              "C"
            ],
            [
              "back",
              1
            ],
            [
              "back",
              1
            ],
            [
              "forward",
              1
            ]
          ]
        ],
        "expected": [
          "B",
          "C",
          "B",
          "A",
          "B"
        ]
      }
    ]
  },
  {
    "id": "senior-005",
    "level": "senior",
    "title": "Autocompletar",
    "prompt": "\"add\" mete una palabra. \"suggest\" devuelve las palabras con ese prefijo, ordenadas. Devuelve solo los resultados de suggest.\nEjemplo: add cat, add car, suggest ca, suggest z → [[\"car\", \"cat\"], []].",
    "names": [
      "trieSuggest"
    ],
    "starter": "function trieSuggest(operations) {\n  \n}\n",
    "explanation": "Cada carácter es una arista. La marca word guarda la palabra completa en el nodo final, para no reconstruirla. suggest baja por el prefijo y luego recorre el subárbol en orden de clave. Un array filtrado con startsWith también vale y es más corto, pero es lineal en el diccionario; el trie solo mira el prefijo y lo que cuelga de él. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un trie: objeto anidado por carácter y una marca de fin de palabra",
    "javascript": "function trieSuggest(operations) {\n  const root = {}\n  const out = []\n  function add(word) {\n    let node = root\n    for (const ch of word) {\n      node[ch] = node[ch] ?? {}\n      node = node[ch]\n    }\n    node.word = word\n  }\n  function suggest(prefix) {\n    let node = root\n    for (const ch of prefix) {\n      if (!node[ch]) return []\n      node = node[ch]\n    }\n    const found = []\n    function walk(current) {\n      if (current.word) found.push(current.word)\n      for (const key of Object.keys(current).sort()) if (key !== \"word\") walk(current[key])\n    }\n    walk(node)\n    return found\n  }\n  for (const op of operations) {\n    if (op[0] === 'add') add(op[1])\n    else out.push(suggest(op[1]))\n  }\n  return out\n}\n",
    "typescript": "function trieSuggest(operations: Array<[\"add\", string] | [\"suggest\", string]>): string[][]) {\n  const root = {}\n  const out = []\n  function add(word) {\n    let node = root\n    for (const ch of word) {\n      node[ch] = node[ch] ?? {}\n      node = node[ch]\n    }\n    node.word = word\n  }\n  function suggest(prefix) {\n    let node = root\n    for (const ch of prefix) {\n      if (!node[ch]) return []\n      node = node[ch]\n    }\n    const found = []\n    function walk(current) {\n      if (current.word) found.push(current.word)\n      for (const key of Object.keys(current).sort()) if (key !== \"word\") walk(current[key])\n    }\n    walk(node)\n    return found\n  }\n  for (const op of operations) {\n    if (op[0] === 'add') add(op[1])\n    else out.push(suggest(op[1]))\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              "add",
              "cat"
            ],
            [
              "add",
              "car"
            ],
            [
              "suggest",
              "ca"
            ],
            [
              "suggest",
              "z"
            ]
          ]
        ],
        "expected": [
          [
            "car",
            "cat"
          ],
          []
        ]
      }
    ]
  },
  {
    "id": "senior-006",
    "level": "senior",
    "title": "Sumas y restas",
    "prompt": "Evalúa una expresión de enteros no negativos con + y -, sin paréntesis ni espacios obligatorios, aunque puede haberlos.\nEjemplo: \"10 - 2 + 3\" → 11. \"1+2-3\" → 0.",
    "names": [
      "evalPlusMinus"
    ],
    "starter": "function evalPlusMinus(text) {\n  \n}\n",
    "explanation": "No hace falta un parser completo si solo hay suma y resta, que asocian a la izquierda y tienen la misma prioridad. Se acumula la cifra mientras salen dígitos. Al ver un operador, se aplica el signo anterior al número ya cerrado. Un operador ficticio al final fuerza el último volcado. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un número en construcción, un signo pendiente y un barrido",
    "javascript": "function evalPlusMinus(text) {\n  let total = 0\n  let number = 0\n  let sign = 1\n  const source = text.replace(/\\s/g, '') + '+'\n  for (const ch of source) {\n    if (ch >= '0' && ch <= '9') number = number * 10 + Number(ch)\n    else {\n      total += sign * number\n      number = 0\n      sign = ch === '-' ? -1 : 1\n    }\n  }\n  return total\n}\n",
    "typescript": "function evalPlusMinus(text: string): number) {\n  let total = 0\n  let number = 0\n  let sign = 1\n  const source = text.replace(/\\s/g, '') + '+'\n  for (const ch of source) {\n    if (ch >= '0' && ch <= '9') number = number * 10 + Number(ch)\n    else {\n      total += sign * number\n      number = 0\n      sign = ch === '-' ? -1 : 1\n    }\n  }\n  return total\n}\n",
    "cases": [
      {
        "args": [
          "10 - 2 + 3"
        ],
        "expected": 11
      },
      {
        "args": [
          "1+2-3"
        ],
        "expected": 0
      },
      {
        "args": [
          "42"
        ],
        "expected": 42
      }
    ]
  },
  {
    "id": "senior-007",
    "level": "senior",
    "title": "Calculadora con prioridad",
    "prompt": "Evalúa enteros no negativos con +, -, * y /. La división trunca hacia cero. * y / van antes que + y -. Puede haber espacios. No hay paréntesis.\nEjemplo: \"3+2*2\" → 7. \" 3/2 \" → 1. \" 3+5 / 2 \" → 5.",
    "names": [
      "calcII"
    ],
    "starter": "function calcII(text) {\n  \n}\n",
    "explanation": "Suma y resta se dejan en la pila como números con signo. Multiplicación y división se aplican ya, contra la cima, porque tienen prioridad. Al final se suman los términos. Math.trunc tira hacia cero, que es lo que se pide de la división entera aquí. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una pila de términos ya resueltos y el operador anterior",
    "javascript": "function calcII(text) {\n  const tokens = []\n  let number = 0\n  let sign = '+'\n  const source = text.replace(/\\s/g, '')\n  for (let i = 0; i < source.length; i++) {\n    const ch = source[i]\n    if (ch >= '0' && ch <= '9') number = number * 10 + Number(ch)\n    if (ch < '0' || i === source.length - 1) {\n      if (sign === '+') tokens.push(number)\n      else if (sign === '-') tokens.push(-number)\n      else if (sign === '*') tokens.push(tokens.pop() * number)\n      else tokens.push(Math.trunc(tokens.pop() / number))\n      sign = ch\n      number = 0\n    }\n  }\n  let total = 0\n  for (const n of tokens) total += n\n  return total\n}\n",
    "typescript": "function calcII(text: string): number) {\n  const tokens = []\n  let number = 0\n  let sign = '+'\n  const source = text.replace(/\\s/g, '')\n  for (let i = 0; i < source.length; i++) {\n    const ch = source[i]\n    if (ch >= '0' && ch <= '9') number = number * 10 + Number(ch)\n    if (ch < '0' || i === source.length - 1) {\n      if (sign === '+') tokens.push(number)\n      else if (sign === '-') tokens.push(-number)\n      else if (sign === '*') tokens.push(tokens.pop() * number)\n      else tokens.push(Math.trunc(tokens.pop() / number))\n      sign = ch\n      number = 0\n    }\n  }\n  let total = 0\n  for (const n of tokens) total += n\n  return total\n}\n",
    "cases": [
      {
        "args": [
          "3+2*2"
        ],
        "expected": 7
      },
      {
        "args": [
          " 3/2 "
        ],
        "expected": 1
      },
      {
        "args": [
          " 3+5 / 2 "
        ],
        "expected": 5
      }
    ]
  },
  {
    "id": "senior-008",
    "level": "senior",
    "title": "Orden topológico",
    "prompt": "Hay n nodos, del 0 a n - 1. edges son pares [desde, hasta]. Devuelve un orden en el que cada arista va de un nodo ya listado a uno posterior. Si hay varias opciones, elige siempre el nodo de número menor disponible. Si hay ciclo, null.\nEjemplo: 4, [[1, 0], [2, 0], [3, 1], [3, 2]] → [3, 1, 2, 0].",
    "names": [
      "topologicalSort"
    ],
    "starter": "function topologicalSort(n, edges) {\n  \n}\n",
    "explanation": "Un nodo puede salir cuando ya salieron todos los que apuntan a él, es decir, cuando su grado de entrada llega a 0. Se empieza por los de grado 0. Ordenar la cola en cada extracción fuerza el desempate por número menor, que deja el resultado único. Si al final no han salido n nodos, había un ciclo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el algoritmo de Kahn: grados de entrada y una cola",
    "javascript": "function topologicalSort(n, edges) {\n  const next = Array.from({ length: n }, () => [])\n  const indegree = new Array(n).fill(0)\n  for (const [from, to] of edges) {\n    next[from].push(to)\n    indegree[to]++\n  }\n  const queue = []\n  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i)\n  const out = []\n  while (queue.length) {\n    queue.sort((a, b) => a - b)\n    const node = queue.shift()\n    out.push(node)\n    for (const to of next[node]) {\n      indegree[to]--\n      if (indegree[to] === 0) queue.push(to)\n    }\n  }\n  return out.length === n ? out : null\n}\n",
    "typescript": "function topologicalSort(n: number, edges: number[][]): number[] | null) {\n  const next = Array.from({ length: n }, () => [])\n  const indegree = new Array(n).fill(0)\n  for (const [from, to] of edges) {\n    next[from].push(to)\n    indegree[to]++\n  }\n  const queue = []\n  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i)\n  const out = []\n  while (queue.length) {\n    queue.sort((a, b) => a - b)\n    const node = queue.shift()\n    out.push(node)\n    for (const to of next[node]) {\n      indegree[to]--\n      if (indegree[to] === 0) queue.push(to)\n    }\n  }\n  return out.length === n ? out : null\n}\n",
    "cases": [
      {
        "args": [
          4,
          [
            [
              1,
              0
            ],
            [
              2,
              0
            ],
            [
              3,
              1
            ],
            [
              3,
              2
            ]
          ]
        ],
        "expected": [
          3,
          1,
          2,
          0
        ]
      },
      {
        "args": [
          2,
          [
            [
              0,
              1
            ],
            [
              1,
              0
            ]
          ]
        ],
        "expected": null
      }
    ]
  },
  {
    "id": "senior-009",
    "level": "senior",
    "title": "Caminos mínimos",
    "prompt": "Grafo dirigido de n nodos, del 0 a n - 1. edges son [desde, hasta, peso] con pesos positivos. Devuelve la distancia mínima desde start a cada nodo, o null si no se llega.\nEjemplo: 3, [[0, 1, 5]], 0 → [0, 5, null].",
    "names": [
      "dijkstra"
    ],
    "starter": "function dijkstra(n, edges, start) {\n  \n}\n",
    "explanation": "Cada nodo se fija una vez, cuando es el no visitado de menor distancia conocida. Desde él se relajan las aristas. Con pesos negativos el algoritmo no vale: haría falta Bellman-Ford. La versión con montículo es O((V + E) log V); aquí elegir el mínimo a mano es O(V²) y se lee mejor en un grafo pequeño. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Dijkstra con un array de distancias y la elección lineal del nodo más cercano",
    "javascript": "function dijkstra(n, edges, start) {\n  const next = Array.from({ length: n }, () => [])\n  for (const [from, to, weight] of edges) next[from].push([to, weight])\n  const dist = new Array(n).fill(null)\n  dist[start] = 0\n  const used = new Array(n).fill(false)\n  for (let step = 0; step < n; step++) {\n    let node = -1\n    for (let i = 0; i < n; i++) {\n      if (!used[i] && dist[i] !== null && (node === -1 || dist[i] < dist[node])) node = i\n    }\n    if (node === -1) break\n    used[node] = true\n    for (const [to, weight] of next[node]) {\n      const nextDist = dist[node] + weight\n      if (dist[to] === null || nextDist < dist[to]) dist[to] = nextDist\n    }\n  }\n  return dist\n}\n",
    "typescript": "function dijkstra(n: number, edges: number[][], start: number): Array<number | null>) {\n  const next = Array.from({ length: n }, () => [])\n  for (const [from, to, weight] of edges) next[from].push([to, weight])\n  const dist = new Array(n).fill(null)\n  dist[start] = 0\n  const used = new Array(n).fill(false)\n  for (let step = 0; step < n; step++) {\n    let node = -1\n    for (let i = 0; i < n; i++) {\n      if (!used[i] && dist[i] !== null && (node === -1 || dist[i] < dist[node])) node = i\n    }\n    if (node === -1) break\n    used[node] = true\n    for (const [to, weight] of next[node]) {\n      const nextDist = dist[node] + weight\n      if (dist[to] === null || nextDist < dist[to]) dist[to] = nextDist\n    }\n  }\n  return dist\n}\n",
    "cases": [
      {
        "args": [
          3,
          [
            [
              0,
              1,
              5
            ]
          ],
          0
        ],
        "expected": [
          0,
          5,
          null
        ]
      },
      {
        "args": [
          4,
          [
            [
              0,
              1,
              1
            ],
            [
              0,
              2,
              4
            ],
            [
              1,
              2,
              1
            ],
            [
              1,
              3,
              2
            ]
          ],
          0
        ],
        "expected": [
          0,
          1,
          2,
          3
        ]
      }
    ]
  },
  {
    "id": "senior-010",
    "level": "senior",
    "title": "Islas",
    "prompt": "grid está hecha de \"1\" tierra y \"0\" agua. Una isla es un grupo de tierras unidas en cruz, no en diagonal. ¿Cuántas hay? Hay al menos una fila.\nEjemplo: [[\"1\",\"1\",\"0\"],[\"1\",\"0\",\"0\"],[\"0\",\"0\",\"1\"]] → 2.",
    "names": [
      "numIslands"
    ],
    "starter": "function numIslands(grid) {\n  \n}\n",
    "explanation": "Cada tierra no visitada abre una isla. Desde ella se recorren las cuatro direcciones y se marcan, para no contarla otra vez. El coste es el tamaño de la cuadrícula. La marca puede ser sobre una copia o sobre otro array: aquí seen evita mutar el argumento. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "búsqueda en profundidad que marca lo visitado",
    "javascript": "function numIslands(grid) {\n  const rows = grid.length\n  const cols = grid[0].length\n  const seen = grid.map((row) => row.map(() => false))\n  let total = 0\n  function walk(r, c) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || seen[r][c] || grid[r][c] !== '1') return\n    seen[r][c] = true\n    walk(r + 1, c)\n    walk(r - 1, c)\n    walk(r, c + 1)\n    walk(r, c - 1)\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === '1' && !seen[r][c]) {\n        total++\n        walk(r, c)\n      }\n    }\n  }\n  return total\n}\n",
    "typescript": "function numIslands(grid: string[][]): number) {\n  const rows = grid.length\n  const cols = grid[0].length\n  const seen = grid.map((row) => row.map(() => false))\n  let total = 0\n  function walk(r, c) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || seen[r][c] || grid[r][c] !== '1') return\n    seen[r][c] = true\n    walk(r + 1, c)\n    walk(r - 1, c)\n    walk(r, c + 1)\n    walk(r, c - 1)\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === '1' && !seen[r][c]) {\n        total++\n        walk(r, c)\n      }\n    }\n  }\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              "1",
              "1",
              "0"
            ],
            [
              "1",
              "0",
              "0"
            ],
            [
              "0",
              "0",
              "1"
            ]
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            [
              "0"
            ]
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-011",
    "level": "senior",
    "title": "Camino más corto en la cuadrícula",
    "prompt": "0 es casilla libre y 1 es muro. Solo se camina en cruz. Devuelve la longitud del camino más corto de la esquina superior izquierda a la inferior derecha, contando las dos. Si no hay, -1.\nEjemplo: [[0, 0], [1, 0]] → 3.",
    "names": [
      "shortestPathBinary"
    ],
    "starter": "function shortestPathBinary(grid) {\n  \n}\n",
    "explanation": "En un grafo sin pesos, la anchura da el mínimo de aristas. La profundidad no, porque el primer camino que llega puede ser un rodeo. Se marca al encolar, no al sacar, para no meter la misma casilla varias veces. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "búsqueda en anchura",
    "javascript": "function shortestPathBinary(grid) {\n  const rows = grid.length\n  const cols = grid[0].length\n  if (grid[0][0] === 1) return -1\n  const queue = [[0, 0, 1]]\n  const seen = new Set(['0,0'])\n  let head = 0\n  while (head < queue.length) {\n    const [r, c, dist] = queue[head++]\n    if (r === rows - 1 && c === cols - 1) return dist\n    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n      const nr = r + dr\n      const nc = c + dc\n      const key = nr + ',' + nc\n      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || grid[nr][nc] === 1 || seen.has(key)) continue\n      seen.add(key)\n      queue.push([nr, nc, dist + 1])\n    }\n  }\n  return -1\n}\n",
    "typescript": "function shortestPathBinary(grid: number[][]): number) {\n  const rows = grid.length\n  const cols = grid[0].length\n  if (grid[0][0] === 1) return -1\n  const queue = [[0, 0, 1]]\n  const seen = new Set(['0,0'])\n  let head = 0\n  while (head < queue.length) {\n    const [r, c, dist] = queue[head++]\n    if (r === rows - 1 && c === cols - 1) return dist\n    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n      const nr = r + dr\n      const nc = c + dc\n      const key = nr + ',' + nc\n      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || grid[nr][nc] === 1 || seen.has(key)) continue\n      seen.add(key)\n      queue.push([nr, nc, dist + 1])\n    }\n  }\n  return -1\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              0,
              0
            ],
            [
              1,
              0
            ]
          ]
        ],
        "expected": 3
      },
      {
        "args": [
          [
            [
              1
            ]
          ]
        ],
        "expected": -1
      }
    ]
  },
  {
    "id": "senior-012",
    "level": "senior",
    "title": "Se pueden cursar",
    "prompt": "Hay n cursos, del 0 a n - 1. prerequisites son pares [curso, requisito]. Di si se puede cursar todo, es decir, si el grafo no tiene ciclo.\nEjemplo: 2, [[1, 0]] → true. 2, [[1, 0], [0, 1]] → false.",
    "names": [
      "canFinish"
    ],
    "starter": "function canFinish(n, prerequisites) {\n  \n}\n",
    "explanation": "Es el mismo recuento de grados que el orden topológico, pero aquí no importa el orden: importa si se vacía el grafo. Un ciclo deja algún grado por encima de cero para siempre. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "orden topológico de Kahn",
    "javascript": "function canFinish(n, prerequisites) {\n  const next = Array.from({ length: n }, () => [])\n  const indegree = new Array(n).fill(0)\n  for (const [course, req] of prerequisites) {\n    next[req].push(course)\n    indegree[course]++\n  }\n  const queue = []\n  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i)\n  let seen = 0\n  while (queue.length) {\n    const node = queue.shift()\n    seen++\n    for (const to of next[node]) {\n      indegree[to]--\n      if (indegree[to] === 0) queue.push(to)\n    }\n  }\n  return seen === n\n}\n",
    "typescript": "function canFinish(n: number, prerequisites: number[][]): boolean) {\n  const next = Array.from({ length: n }, () => [])\n  const indegree = new Array(n).fill(0)\n  for (const [course, req] of prerequisites) {\n    next[req].push(course)\n    indegree[course]++\n  }\n  const queue = []\n  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i)\n  let seen = 0\n  while (queue.length) {\n    const node = queue.shift()\n    seen++\n    for (const to of next[node]) {\n      indegree[to]--\n      if (indegree[to] === 0) queue.push(to)\n    }\n  }\n  return seen === n\n}\n",
    "cases": [
      {
        "args": [
          2,
          [
            [
              1,
              0
            ]
          ]
        ],
        "expected": true
      },
      {
        "args": [
          2,
          [
            [
              1,
              0
            ],
            [
              0,
              1
            ]
          ]
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "senior-013",
    "level": "senior",
    "title": "Componentes conexas",
    "prompt": "Grafo no dirigido de n nodos, del 0 a n - 1. edges son pares [a, b]. ¿Cuántas componentes conexas hay?\nEjemplo: 5, [[0, 1], [1, 2], [3, 4]] → 2.",
    "names": [
      "connectedComponents"
    ],
    "starter": "function connectedComponents(n, edges) {\n  \n}\n",
    "explanation": "Cada arista une dos conjuntos. find baja hasta la raíz y aprovecha para aplanar el camino. Al final, el número de raíces distintas es el de componentes. Una DFS por nodo también vale; union-find brilla cuando las uniones llegan sueltas, no como un grafo ya montado. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "union-find con compresión de camino",
    "javascript": "function connectedComponents(n, edges) {\n  const parent = Array.from({ length: n }, (_, i) => i)\n  function find(x) {\n    if (parent[x] !== x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  for (const [a, b] of edges) parent[find(a)] = find(b)\n  const roots = new Set()\n  for (let i = 0; i < n; i++) roots.add(find(i))\n  return roots.size\n}\n",
    "typescript": "function connectedComponents(n: number, edges: number[][]): number) {\n  const parent = Array.from({ length: n }, (_, i) => i)\n  function find(x) {\n    if (parent[x] !== x) parent[x] = find(parent[x])\n    return parent[x]\n  }\n  for (const [a, b] of edges) parent[find(a)] = find(b)\n  const roots = new Set()\n  for (let i = 0; i < n; i++) roots.add(find(i))\n  return roots.size\n}\n",
    "cases": [
      {
        "args": [
          5,
          [
            [
              0,
              1
            ],
            [
              1,
              2
            ],
            [
              3,
              4
            ]
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          1,
          []
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "senior-014",
    "level": "senior",
    "title": "K-ésimo mayor",
    "prompt": "Devuelve el k-ésimo mayor. k empieza en 1. t no está vacío y k es válido.\nEjemplo: [3, 2, 1, 5, 6, 4], 2 → 5.",
    "names": [
      "kthLargest"
    ],
    "starter": "function kthLargest(t, k) {\n  \n}\n",
    "explanation": "Ordenar es O(n log n) y deja el k-ésimo en el índice k - 1. Quickselect lo haría en tiempo medio lineal, sin ordenar el resto, y es la herramienta cuando n es enorme y solo se pide un puesto. Para leer el algoritmo, el sort dice lo mismo con menos código. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ordenar de mayor a menor",
    "javascript": "function kthLargest(t, k) {\n  const sorted = t.slice().sort((a, b) => b - a)\n  return sorted[k - 1]\n}\n",
    "typescript": "function kthLargest(t: number[], k: number): number) {\n  const sorted = t.slice().sort((a, b) => b - a)\n  return sorted[k - 1]\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            2,
            1,
            5,
            6,
            4
          ],
          2
        ],
        "expected": 5
      },
      {
        "args": [
          [
            7
          ],
          1
        ],
        "expected": 7
      }
    ]
  },
  {
    "id": "senior-015",
    "level": "senior",
    "title": "Mezclar k listas",
    "prompt": "Cada lista está ordenada de menor a mayor. Devuelve la mezcla ordenada.\nEjemplo: [[1, 4, 5], [1, 3, 4], [2, 6]] → [1, 1, 2, 3, 4, 4, 5, 6].",
    "names": [
      "mergeKLists"
    ],
    "starter": "function mergeKLists(lists) {\n  \n}\n",
    "explanation": "Es el merge de dos listas, generalizado. Elegir el mínimo entre k cabezas a mano es O(k) por elemento. Un montículo lo bajaría a O(log k). El resultado es el mismo; cambia el coste cuando k crece. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "k punteros y, en cada paso, la cabeza mínima",
    "javascript": "function mergeKLists(lists) {\n  const out = []\n  const idx = lists.map(() => 0)\n  while (true) {\n    let best = -1\n    for (let i = 0; i < lists.length; i++) {\n      if (idx[i] >= lists[i].length) continue\n      if (best === -1 || lists[i][idx[i]] < lists[best][idx[best]]) best = i\n    }\n    if (best === -1) break\n    out.push(lists[best][idx[best]])\n    idx[best]++\n  }\n  return out\n}\n",
    "typescript": "function mergeKLists(lists: number[][]): number[]) {\n  const out = []\n  const idx = lists.map(() => 0)\n  while (true) {\n    let best = -1\n    for (let i = 0; i < lists.length; i++) {\n      if (idx[i] >= lists[i].length) continue\n      if (best === -1 || lists[i][idx[i]] < lists[best][idx[best]]) best = i\n    }\n    if (best === -1) break\n    out.push(lists[best][idx[best]])\n    idx[best]++\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              1,
              4,
              5
            ],
            [
              1,
              3,
              4
            ],
            [
              2,
              6
            ]
          ]
        ],
        "expected": [
          1,
          1,
          2,
          3,
          4,
          4,
          5,
          6
        ]
      },
      {
        "args": [
          []
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "senior-016",
    "level": "senior",
    "title": "Salas de reuniones",
    "prompt": "Cada reunión es [inicio, fin). Devuelve cuántas salas hacen falta para que ninguna se solape en la misma sala.\nEjemplo: [[0, 30], [5, 10], [15, 20]] → 2.",
    "names": [
      "minMeetingRooms"
    ],
    "starter": "function minMeetingRooms(intervals) {\n  \n}\n",
    "explanation": "Se recorren los inicios en orden. Si el inicio ya alcanza o pasa el fin más temprano pendiente, esa sala se libera. Si no, hace falta otra. Es el máximo de reuniones abiertas a la vez. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos arrays ordenados, inicios y fines, y dos punteros",
    "javascript": "function minMeetingRooms(intervals) {\n  const starts = intervals.map((item) => item[0]).sort((a, b) => a - b)\n  const ends = intervals.map((item) => item[1]).sort((a, b) => a - b)\n  let rooms = 0\n  let best = 0\n  let j = 0\n  for (const start of starts) {\n    while (ends[j] <= start) {\n      rooms--\n      j++\n    }\n    rooms++\n    if (rooms > best) best = rooms\n  }\n  return best\n}\n",
    "typescript": "function minMeetingRooms(intervals: number[][]): number) {\n  const starts = intervals.map((item) => item[0]).sort((a, b) => a - b)\n  const ends = intervals.map((item) => item[1]).sort((a, b) => a - b)\n  let rooms = 0\n  let best = 0\n  let j = 0\n  for (const start of starts) {\n    while (ends[j] <= start) {\n      rooms--\n      j++\n    }\n    rooms++\n    if (rooms > best) best = rooms\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              0,
              30
            ],
            [
              5,
              10
            ],
            [
              15,
              20
            ]
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ]
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "senior-017",
    "level": "senior",
    "title": "Máximo de intervalos compatibles",
    "prompt": "Cada intervalo es [inicio, fin). Devuelve cuántos se pueden elegir sin que se solapen. Tocar en el fin está permitido.\nEjemplo: [[1, 2], [2, 3], [3, 4], [1, 3]] → 3.",
    "names": [
      "maxEventsNonOverlap"
    ],
    "starter": "function maxEventsNonOverlap(intervals) {\n  \n}\n",
    "explanation": "Ordenar por el fin y coger el primero que no choca con el último elegido es óptimo: deja libre el hueco más pronto. Ordenar por el inicio no lo sería. Es el problema clásico de selección de actividades. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ordenar por el fin y quedarse el que antes termina",
    "javascript": "function maxEventsNonOverlap(intervals) {\n  const sorted = intervals.slice().sort((a, b) => a[1] - b[1])\n  let total = 0\n  let end = -1e15\n  for (const interval of sorted) {\n    if (interval[0] >= end) {\n      total++\n      end = interval[1]\n    }\n  }\n  return total\n}\n",
    "typescript": "function maxEventsNonOverlap(intervals: number[][]): number) {\n  const sorted = intervals.slice().sort((a, b) => a[1] - b[1])\n  let total = 0\n  let end = -1e15\n  for (const interval of sorted) {\n    if (interval[0] >= end) {\n      total++\n      end = interval[1]\n    }\n  }\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              1,
              2
            ],
            [
              2,
              3
            ],
            [
              3,
              4
            ],
            [
              1,
              3
            ]
          ]
        ],
        "expected": 3
      },
      {
        "args": [
          [
            [
              1,
              5
            ],
            [
              2,
              3
            ]
          ]
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "senior-018",
    "level": "senior",
    "title": "Agua atrapada",
    "prompt": "height[i] es la altura de una barra. ¿Cuánta agua queda atrapada entre ellas después de llover?\nEjemplo: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] → 6.",
    "names": [
      "trapRain"
    ],
    "starter": "function trapRain(height) {\n  \n}\n",
    "explanation": "El agua sobre una barra es el mínimo de los máximos a izquierda y derecha, menos su altura. Con dos punteros no hace falta guardar esos máximos en arrays: el lado de menor máximo es el que limita, y se avanza ese puntero. Es lineal y usa memoria constante. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos punteros y el máximo visto por cada lado",
    "javascript": "function trapRain(height) {\n  let left = 0\n  let right = height.length - 1\n  let leftMax = 0\n  let rightMax = 0\n  let water = 0\n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= leftMax) leftMax = height[left]\n      else water += leftMax - height[left]\n      left++\n    } else {\n      if (height[right] >= rightMax) rightMax = height[right]\n      else water += rightMax - height[right]\n      right--\n    }\n  }\n  return water\n}\n",
    "typescript": "function trapRain(height: number[]): number) {\n  let left = 0\n  let right = height.length - 1\n  let leftMax = 0\n  let rightMax = 0\n  let water = 0\n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= leftMax) leftMax = height[left]\n      else water += leftMax - height[left]\n      left++\n    } else {\n      if (height[right] >= rightMax) rightMax = height[right]\n      else water += rightMax - height[right]\n      right--\n    }\n  }\n  return water\n}\n",
    "cases": [
      {
        "args": [
          [
            0,
            1,
            0,
            2,
            1,
            0,
            1,
            3,
            2,
            1,
            2,
            1
          ]
        ],
        "expected": 6
      },
      {
        "args": [
          [
            1,
            2
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-019",
    "level": "senior",
    "title": "Rectángulo en el histograma",
    "prompt": "Cada barra tiene ancho 1. Devuelve el área del rectángulo más grande que cabe en el histograma.\nEjemplo: [2, 1, 5, 6, 2, 3] → 10.",
    "names": [
      "largestRectangle"
    ],
    "starter": "function largestRectangle(heights) {\n  \n}\n",
    "explanation": "La pila guarda barras en orden creciente de altura. Cuando llega una más baja, las que quedan por encima ya conocen su límite derecho y se puede calcular su área. El 0 final vacía la pila. Cada barra entra y sale una vez. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "pila creciente de índices y un centinela 0 al final",
    "javascript": "function largestRectangle(heights) {\n  const stack = [-1]\n  let best = 0\n  const bars = heights.concat(0)\n  for (let i = 0; i < bars.length; i++) {\n    while (stack.length > 1 && bars[stack[stack.length - 1]] > bars[i]) {\n      const height = bars[stack.pop()]\n      const width = i - stack[stack.length - 1] - 1\n      if (height * width > best) best = height * width\n    }\n    stack.push(i)\n  }\n  return best\n}\n",
    "typescript": "function largestRectangle(heights: number[]): number) {\n  const stack = [-1]\n  let best = 0\n  const bars = heights.concat(0)\n  for (let i = 0; i < bars.length; i++) {\n    while (stack.length > 1 && bars[stack[stack.length - 1]] > bars[i]) {\n      const height = bars[stack.pop()]\n      const width = i - stack[stack.length - 1] - 1\n      if (height * width > best) best = height * width\n    }\n    stack.push(i)\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            1,
            5,
            6,
            2,
            3
          ]
        ],
        "expected": 10
      },
      {
        "args": [
          [
            2,
            4
          ]
        ],
        "expected": 4
      }
    ]
  },
  {
    "id": "senior-020",
    "level": "senior",
    "title": "Máximo de la ventana",
    "prompt": "Devuelve el máximo de cada ventana de tamaño k. k está entre 1 y t.length.\nEjemplo: [1, 3, -1, -3, 5, 3, 6, 7], 3 → [3, 3, 5, 5, 6, 7].",
    "names": [
      "slidingWindowMax"
    ],
    "starter": "function slidingWindowMax(t, k) {\n  \n}\n",
    "explanation": "La cabeza de la deque es el índice del máximo de la ventana. Se tiran los índices que ya salieron de la ventana y los que son menores o iguales que el nuevo valor, porque nunca volverán a ser el máximo. Cada índice entra y sale una vez, así que es lineal. Recalcular el máximo en cada ventana sería O(nk). En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "deque de índices, de mayor a menor valor",
    "javascript": "function slidingWindowMax(t, k) {\n  const out = []\n  const deque = []\n  for (let i = 0; i < t.length; i++) {\n    while (deque.length && deque[0] <= i - k) deque.shift()\n    while (deque.length && t[deque[deque.length - 1]] <= t[i]) deque.pop()\n    deque.push(i)\n    if (i >= k - 1) out.push(t[deque[0]])\n  }\n  return out\n}\n",
    "typescript": "function slidingWindowMax(t: number[], k: number): number[]) {\n  const out = []\n  const deque = []\n  for (let i = 0; i < t.length; i++) {\n    while (deque.length && deque[0] <= i - k) deque.shift()\n    while (deque.length && t[deque[deque.length - 1]] <= t[i]) deque.pop()\n    deque.push(i)\n    if (i >= k - 1) out.push(t[deque[0]])\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            3,
            -1,
            -3,
            5,
            3,
            6,
            7
          ],
          3
        ],
        "expected": [
          3,
          3,
          5,
          5,
          6,
          7
        ]
      }
    ]
  },
  {
    "id": "senior-021",
    "level": "senior",
    "title": "Palíndromo más largo",
    "prompt": "Devuelve el substring palíndromo más largo. Si hay varios de la misma longitud, el que empieza antes. text puede estar vacío.\nEjemplo: \"babad\" → \"bab\".",
    "names": [
      "longestPalindrome"
    ],
    "starter": "function longestPalindrome(text) {\n  \n}\n",
    "explanation": "Todo palíndromo tiene un centro: una letra, o el hueco entre dos letras iguales. Desde cada centro se crece mientras los lados coincidan. Guardar el mejor evita la tabla de programación dinámica, que también vale y usa más memoria. Manacher lo haría en lineal estricto; esta versión es cuadrática y clara. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "expandir desde cada centro, impar y par",
    "javascript": "function longestPalindrome(text) {\n  let start = 0\n  let end = 0\n  function grow(left, right) {\n    while (left >= 0 && right < text.length && text[left] === text[right]) {\n      left--\n      right++\n    }\n    return [left + 1, right - 1]\n  }\n  for (let i = 0; i < text.length; i++) {\n    const odd = grow(i, i)\n    const even = grow(i, i + 1)\n    const best = odd[1] - odd[0] > even[1] - even[0] ? odd : even\n    if (best[1] - best[0] > end - start) {\n      start = best[0]\n      end = best[1]\n    }\n  }\n  return text.slice(start, end + 1)\n}\n",
    "typescript": "function longestPalindrome(text: string): string) {\n  let start = 0\n  let end = 0\n  function grow(left, right) {\n    while (left >= 0 && right < text.length && text[left] === text[right]) {\n      left--\n      right++\n    }\n    return [left + 1, right - 1]\n  }\n  for (let i = 0; i < text.length; i++) {\n    const odd = grow(i, i)\n    const even = grow(i, i + 1)\n    const best = odd[1] - odd[0] > even[1] - even[0] ? odd : even\n    if (best[1] - best[0] > end - start) {\n      start = best[0]\n      end = best[1]\n    }\n  }\n  return text.slice(start, end + 1)\n}\n",
    "cases": [
      {
        "args": [
          "babad"
        ],
        "expected": "bab"
      },
      {
        "args": [
          "cbbd"
        ],
        "expected": "bb"
      },
      {
        "args": [
          ""
        ],
        "expected": ""
      }
    ]
  },
  {
    "id": "senior-022",
    "level": "senior",
    "title": "Distancia de edición",
    "prompt": "Devuelve el mínimo de inserciones, borrados y sustituciones para convertir a en b.\nEjemplo: \"horse\", \"ros\" → 3.",
    "names": [
      "editDistance"
    ],
    "starter": "function editDistance(a, b) {\n  \n}\n",
    "explanation": "dp[i][j] es el coste de convertir los primeros i de a en los primeros j de b. Si las letras coinciden, se copia la diagonal. Si no, se toma el mínimo de borrar, insertar o sustituir, más uno. La primera fila y la primera columna son los costes de construir desde vacío. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica sobre prefijos",
    "javascript": "function editDistance(a, b) {\n  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))\n  for (let i = 0; i <= a.length; i++) dp[i][0] = i\n  for (let j = 0; j <= b.length; j++) dp[0][j] = j\n  for (let i = 1; i <= a.length; i++) {\n    for (let j = 1; j <= b.length; j++) {\n      const cost = a[i - 1] === b[j - 1] ? 0 : 1\n      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)\n    }\n  }\n  return dp[a.length][b.length]\n}\n",
    "typescript": "function editDistance(a: string, b: string): number) {\n  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))\n  for (let i = 0; i <= a.length; i++) dp[i][0] = i\n  for (let j = 0; j <= b.length; j++) dp[0][j] = j\n  for (let i = 1; i <= a.length; i++) {\n    for (let j = 1; j <= b.length; j++) {\n      const cost = a[i - 1] === b[j - 1] ? 0 : 1\n      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)\n    }\n  }\n  return dp[a.length][b.length]\n}\n",
    "cases": [
      {
        "args": [
          "horse",
          "ros"
        ],
        "expected": 3
      },
      {
        "args": [
          "",
          "a"
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "senior-023",
    "level": "senior",
    "title": "Mochila 0/1",
    "prompt": "Cada objeto se puede coger una vez. Devuelve el máximo valor sin pasar de capacity. capacity es 0 o más.\nEjemplo: pesos [1, 3, 4], valores [15, 20, 30], capacidad 4 → 35.",
    "names": [
      "knapsack"
    ],
    "starter": "function knapsack(weights, values, capacity) {\n  \n}\n",
    "explanation": "best[cap] es el mejor valor con esa capacidad. Se recorre hacia atrás para que el mismo objeto no se use dos veces en esta vuelta: hacia delante sería la mochila ilimitada. Cada objeto decide, para cada capacidad que lo admite, si mejora lo ya guardado. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica unidimensional, recorriendo la capacidad hacia atrás",
    "javascript": "function knapsack(weights, values, capacity) {\n  const best = new Array(capacity + 1).fill(0)\n  for (let i = 0; i < weights.length; i++) {\n    for (let cap = capacity; cap >= weights[i]; cap--) {\n      const next = best[cap - weights[i]] + values[i]\n      if (next > best[cap]) best[cap] = next\n    }\n  }\n  return best[capacity]\n}\n",
    "typescript": "function knapsack(weights: number[], values: number[], capacity: number): number) {\n  const best = new Array(capacity + 1).fill(0)\n  for (let i = 0; i < weights.length; i++) {\n    for (let cap = capacity; cap >= weights[i]; cap--) {\n      const next = best[cap - weights[i]] + values[i]\n      if (next > best[cap]) best[cap] = next\n    }\n  }\n  return best[capacity]\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            3,
            4
          ],
          [
            15,
            20,
            30
          ],
          4
        ],
        "expected": 35
      },
      {
        "args": [
          [
            2
          ],
          [
            10
          ],
          1
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-024",
    "level": "senior",
    "title": "Formas de dar el cambio",
    "prompt": "Cuenta de cuántas formas se puede sumar amount con esas monedas. El orden no importa: 1+2 y 2+1 son la misma forma. amount es 0 o más. amount 0 tiene una forma, no usar nada.\nEjemplo: [1, 2, 5], 5 → 4.",
    "names": [
      "coinWays"
    ],
    "starter": "function coinWays(coins, amount) {\n  \n}\n",
    "explanation": "Si el bucle exterior fuera el importe, se contarían permutaciones. Al recorrer moneda a moneda, cada combinación se construye en el orden de las monedas y se cuenta una vez. ways[0] es 1 para poder empezar. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica por moneda, no por importe primero",
    "javascript": "function coinWays(coins, amount) {\n  const ways = [1]\n  for (let i = 1; i <= amount; i++) ways.push(0)\n  for (const coin of coins) {\n    for (let i = coin; i <= amount; i++) ways[i] += ways[i - coin]\n  }\n  return ways[amount]\n}\n",
    "typescript": "function coinWays(coins: number[], amount: number): number) {\n  const ways = [1]\n  for (let i = 1; i <= amount; i++) ways.push(0)\n  for (const coin of coins) {\n    for (let i = coin; i <= amount; i++) ways[i] += ways[i - coin]\n  }\n  return ways[amount]\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            5
          ],
          5
        ],
        "expected": 4
      },
      {
        "args": [
          [
            2
          ],
          3
        ],
        "expected": 0
      },
      {
        "args": [
          [
            1
          ],
          0
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "senior-025",
    "level": "senior",
    "title": "Partir en palabras",
    "prompt": "Di si text se puede partir en palabras del diccionario, sin solapes ni letras sueltas. Se pueden reutilizar.\nEjemplo: \"leetcode\", [\"leet\", \"code\"] → true. \"catsandog\", [\"cats\", \"dog\", \"sand\", \"and\", \"cat\"] → false.",
    "names": [
      "wordBreak"
    ],
    "starter": "function wordBreak(text, words) {\n  \n}\n",
    "explanation": "ok[i] dice si los primeros i caracteres se pueden partir. Se prueba cada corte anterior que ya era válido y cuyo trozo está en el diccionario. El Set evita buscar la palabra en el array. Es cuadrático en la longitud del texto. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica sobre prefijos y un Set",
    "javascript": "function wordBreak(text, words) {\n  const set = new Set(words)\n  const ok = [true]\n  for (let i = 1; i <= text.length; i++) {\n    ok.push(false)\n    for (let j = 0; j < i; j++) {\n      if (ok[j] && set.has(text.slice(j, i))) {\n        ok[i] = true\n        break\n      }\n    }\n  }\n  return ok[text.length]\n}\n",
    "typescript": "function wordBreak(text: string, words: string[]): boolean) {\n  const set = new Set(words)\n  const ok = [true]\n  for (let i = 1; i <= text.length; i++) {\n    ok.push(false)\n    for (let j = 0; j < i; j++) {\n      if (ok[j] && set.has(text.slice(j, i))) {\n        ok[i] = true\n        break\n      }\n    }\n  }\n  return ok[text.length]\n}\n",
    "cases": [
      {
        "args": [
          "leetcode",
          [
            "leet",
            "code"
          ]
        ],
        "expected": true
      },
      {
        "args": [
          "catsandog",
          [
            "cats",
            "dog",
            "sand",
            "and",
            "cat"
          ]
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "senior-026",
    "level": "senior",
    "title": "Normalizar ruta",
    "prompt": "Simplifica una ruta. \".\" es la carpeta actual, \"..\" sube, y las barras repetidas se colapsan. Si empezaba por /, el resultado también. No hace falta conservar una barra final.\nEjemplo: \"/a/b/../c\" → \"/a/c\". \"a//b/./c\" → \"a/b/c\".",
    "names": [
      "pathNormalize"
    ],
    "starter": "function pathNormalize(path) {\n  \n}\n",
    "explanation": "Se ignoran los vacíos y los puntos. \"..\" desapila un segmento, si hay. El resto se apila. La barra inicial se recuerda aparte porque split la convertiría en un segmento vacío. Esta versión no se sale por encima de la raíz: un \"..\" de más en una ruta absoluta se pierde. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una pila de segmentos",
    "javascript": "function pathNormalize(path) {\n  const absolute = path.startsWith('/')\n  const parts = []\n  for (const part of path.split('/')) {\n    if (part === '' || part === '.') continue\n    if (part === '..') parts.pop()\n    else parts.push(part)\n  }\n  return (absolute ? '/' : '') + parts.join('/')\n}\n",
    "typescript": "function pathNormalize(path: string): string) {\n  const absolute = path.startsWith('/')\n  const parts = []\n  for (const part of path.split('/')) {\n    if (part === '' || part === '.') continue\n    if (part === '..') parts.pop()\n    else parts.push(part)\n  }\n  return (absolute ? '/' : '') + parts.join('/')\n}\n",
    "cases": [
      {
        "args": [
          "/a/b/../c"
        ],
        "expected": "/a/c"
      },
      {
        "args": [
          "a//b/./c"
        ],
        "expected": "a/b/c"
      },
      {
        "args": [
          "/../a"
        ],
        "expected": "/a"
      }
    ]
  },
  {
    "id": "senior-027",
    "level": "senior",
    "title": "Comparar semver",
    "prompt": "Compara dos versiones major.minor.patch. Devuelve -1 si a es menor, 1 si es mayor y 0 si son iguales. No hay etiquetas ni ceros a la izquierda raros: son tres enteros.\nEjemplo: \"1.2.3\", \"1.2.10\" → -1.",
    "names": [
      "semverCompare"
    ],
    "starter": "function semverCompare(a, b) {\n  \n}\n",
    "explanation": "Comparar los textos ordenaría \"1.2.10\" antes que \"1.2.3\", porque \"1\" va antes que \"3\" como carácter. Hay que pasar cada tramo a número y parar en la primera diferencia. El orden es major, luego minor, luego patch. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "partir por el punto y comparar número a número",
    "javascript": "function semverCompare(a, b) {\n  const pa = a.split(\".\").map(Number)\n  const pb = b.split(\".\").map(Number)\n  for (let i = 0; i < 3; i++) {\n    const da = pa[i] ?? 0\n    const db = pb[i] ?? 0\n    if (da < db) return -1\n    if (da > db) return 1\n  }\n  return 0\n}\n",
    "typescript": "function semverCompare(a: string, b: string): number) {\n  const pa = a.split(\".\").map(Number)\n  const pb = b.split(\".\").map(Number)\n  for (let i = 0; i < 3; i++) {\n    const da = pa[i] ?? 0\n    const db = pb[i] ?? 0\n    if (da < db) return -1\n    if (da > db) return 1\n  }\n  return 0\n}\n",
    "cases": [
      {
        "args": [
          "1.2.3",
          "1.2.10"
        ],
        "expected": -1
      },
      {
        "args": [
          "1.2.3",
          "1.2.3"
        ],
        "expected": 0
      },
      {
        "args": [
          "2.0.0",
          "1.9.9"
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "senior-028",
    "level": "senior",
    "title": "Leer query string",
    "prompt": "Convierte una query, con o sin ? inicial, en un objeto. Los valores van decodificados. Una clave sin = vale \"\". Si la clave se repite, gana la última.\nEjemplo: \"?a=1&b=hola%20x\" → { a: \"1\", b: \"hola x\" }.",
    "names": [
      "parseQuery"
    ],
    "starter": "function parseQuery(text) {\n  \n}\n",
    "explanation": "Se quita el ? si está. Cada trozo separado por & es una pareja. indexOf(\"=\") distingue una clave sola de un valor vacío. decodeURIComponent deshace el %20. No se usa URLSearchParams para ver el recorrido. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "split, indexOf y decodeURIComponent",
    "javascript": "function parseQuery(text) {\n  const out = {}\n  const source = text.startsWith('?') ? text.slice(1) : text\n  if (!source) return out\n  for (const part of source.split('&')) {\n    if (!part) continue\n    const index = part.indexOf('=')\n    const key = decodeURIComponent(index === -1 ? part : part.slice(0, index))\n    const value = decodeURIComponent(index === -1 ? '' : part.slice(index + 1))\n    out[key] = value\n  }\n  return out\n}\n",
    "typescript": "function parseQuery(text: string): Record<string, string>) {\n  const out = {}\n  const source = text.startsWith('?') ? text.slice(1) : text\n  if (!source) return out\n  for (const part of source.split('&')) {\n    if (!part) continue\n    const index = part.indexOf('=')\n    const key = decodeURIComponent(index === -1 ? part : part.slice(0, index))\n    const value = decodeURIComponent(index === -1 ? '' : part.slice(index + 1))\n    out[key] = value\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "?a=1&b=hola%20x"
        ],
        "expected": {
          "a": "1",
          "b": "hola x"
        }
      },
      {
        "args": [
          "flag"
        ],
        "expected": {
          "flag": ""
        }
      },
      {
        "args": [
          ""
        ],
        "expected": {}
      }
    ]
  },
  {
    "id": "senior-029",
    "level": "senior",
    "title": "Escribir query string",
    "prompt": "Convierte un objeto de strings en query, sin ? inicial. Las claves salen en orden de inserción y los valores van codificados.\nEjemplo: { a: \"1\", b: \"hola x\" } → \"a=1&b=hola%20x\".",
    "names": [
      "buildQuery"
    ],
    "starter": "function buildQuery(obj) {\n  \n}\n",
    "explanation": "Es el inverso de parseQuery para este subconjunto: una clave, un valor, sin arrays. encodeURIComponent escapa el espacio. El orden de Object.keys en un objeto plano es el de inserción. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Object.keys, encodeURIComponent y join",
    "javascript": "function buildQuery(obj) {\n  return Object.keys(obj).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&')\n}\n",
    "typescript": "function buildQuery(obj: Record<string, string>): string) {\n  return Object.keys(obj).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&')\n}\n",
    "cases": [
      {
        "args": [
          {
            "a": "1",
            "b": "hola x"
          }
        ],
        "expected": "a=1&b=hola%20x"
      },
      {
        "args": [
          {}
        ],
        "expected": ""
      }
    ]
  },
  {
    "id": "senior-030",
    "level": "senior",
    "title": "Leer un INI",
    "prompt": "Lee un INI pequeño. [seccion] abre una sección. clave=valor guarda un string ya recortado. Las líneas vacías y las que empiezan por ; o # se ignoran. Las claves de antes de cualquier sección caen en \"default\".\nEjemplo: \"[db]\\nhost=localhost\" → { db: { host: \"localhost\" } }.",
    "names": [
      "parseIni"
    ],
    "starter": "function parseIni(text) {\n  \n}\n",
    "explanation": "El parser es una máquina de un estado: la sección actual. Una línea entre corchetes la cambia. Una línea con = parte clave y valor. No hay comillas ni valores multilínea: es el INI mínimo con el que se ve la idea, no el formato completo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "split por líneas, una sección actual y objetos anidados",
    "javascript": "function parseIni(text) {\n  const out = {}\n  let section = ''\n  for (const raw of text.split('\\n')) {\n    const line = raw.trim()\n    if (!line || line.startsWith(';') || line.startsWith('#')) continue\n    if (line.startsWith('[') && line.endsWith(']')) {\n      section = line.slice(1, -1)\n      out[section] = out[section] ?? {}\n      continue\n    }\n    const index = line.indexOf('=')\n    const key = line.slice(0, index).trim()\n    const value = line.slice(index + 1).trim()\n    const bucket = section || 'default'\n    out[bucket] = out[bucket] ?? {}\n    out[bucket][key] = value\n  }\n  return out\n}\n",
    "typescript": "function parseIni(text: string): Record<string, Record<string, string>>) {\n  const out = {}\n  let section = ''\n  for (const raw of text.split('\\n')) {\n    const line = raw.trim()\n    if (!line || line.startsWith(';') || line.startsWith('#')) continue\n    if (line.startsWith('[') && line.endsWith(']')) {\n      section = line.slice(1, -1)\n      out[section] = out[section] ?? {}\n      continue\n    }\n    const index = line.indexOf('=')\n    const key = line.slice(0, index).trim()\n    const value = line.slice(index + 1).trim()\n    const bucket = section || 'default'\n    out[bucket] = out[bucket] ?? {}\n    out[bucket][key] = value\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "[db]\nhost=localhost\nport=5432"
        ],
        "expected": {
          "db": {
            "host": "localhost",
            "port": "5432"
          }
        }
      },
      {
        "args": [
          "# nota\nnombre = Ana"
        ],
        "expected": {
          "default": {
            "nombre": "Ana"
          }
        }
      }
    ]
  },
  {
    "id": "senior-031",
    "level": "senior",
    "title": "Títulos de markdown",
    "prompt": "Devuelve los títulos ATX. Una línea es título si empieza por 1 a 6 #, un espacio y el texto.\nEjemplo: \"# Hola\\ntexto\\n## Sub\" → [{ level: 1, text: \"Hola\" }, { level: 2, text: \"Sub\" }].",
    "names": [
      "markdownHeadings"
    ],
    "starter": "function markdownHeadings(text) {\n  \n}\n",
    "explanation": "^(#{1,6})\\s+(.*)$ exige los almohadillados al principio, luego espacio, luego el resto de la línea. El número de # es el nivel. Las líneas que no encajan se ignoran. No se interpretan títulos con cierre ## al final: es el caso simple. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una expresión regular por línea",
    "javascript": "function markdownHeadings(text) {\n  const out = []\n  for (const line of text.split('\\n')) {\n    const match = /^(#{1,6})\\s+(.*)$/.exec(line)\n    if (match) out.push({ level: match[1].length, text: match[2] })\n  }\n  return out\n}\n",
    "typescript": "function markdownHeadings(text: string): Array<{ level: number, text: string }>) {\n  const out = []\n  for (const line of text.split('\\n')) {\n    const match = /^(#{1,6})\\s+(.*)$/.exec(line)\n    if (match) out.push({ level: match[1].length, text: match[2] })\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "# Hola\ntexto\n## Sub"
        ],
        "expected": [
          {
            "level": 1,
            "text": "Hola"
          },
          {
            "level": 2,
            "text": "Sub"
          }
        ]
      },
      {
        "args": [
          "sin titulo"
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "senior-032",
    "level": "senior",
    "title": "Partir líneas",
    "prompt": "Parte text en líneas de como mucho width caracteres, cortando por espacios. Las palabras caben en width. No dejes espacios al final de la línea.\nEjemplo: \"uno dos tres\", 7 → [\"uno dos\", \"tres\"].",
    "names": [
      "wrapText"
    ],
    "starter": "function wrapText(text, width) {\n  \n}\n",
    "explanation": "Si la palabra cabe en la línea actual más un espacio, se añade. Si no, la línea se cierra y la palabra abre la siguiente. No se parten palabras. Es el ajuste de un editor de texto en su versión más simple, sin justificar. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un bucle de palabras y una línea en construcción",
    "javascript": "function wrapText(text, width) {\n  const words = text.split(' ')\n  const lines = []\n  let line = ''\n  for (const word of words) {\n    if (!line) line = word\n    else if (line.length + 1 + word.length <= width) line += \" \" + word\n    else {\n      lines.push(line)\n      line = word\n    }\n  }\n  if (line) lines.push(line)\n  return lines\n}\n",
    "typescript": "function wrapText(text: string, width: number): string[]) {\n  const words = text.split(' ')\n  const lines = []\n  let line = ''\n  for (const word of words) {\n    if (!line) line = word\n    else if (line.length + 1 + word.length <= width) line += \" \" + word\n    else {\n      lines.push(line)\n      line = word\n    }\n  }\n  if (line) lines.push(line)\n  return lines\n}\n",
    "cases": [
      {
        "args": [
          "uno dos tres",
          7
        ],
        "expected": [
          "uno dos",
          "tres"
        ]
      },
      {
        "args": [
          "hola",
          10
        ],
        "expected": [
          "hola"
        ]
      }
    ]
  },
  {
    "id": "senior-033",
    "level": "senior",
    "title": "Palabra más cercana",
    "prompt": "Devuelve la palabra del diccionario con menor distancia de edición a word. Si empatan, la que aparece antes. dict no está vacío.\nEjemplo: \"cat\", [\"car\", \"dog\", \"cart\"] → \"car\".",
    "names": [
      "closestWord"
    ],
    "starter": "function closestWord(word, dict) {\n  \n}\n",
    "explanation": "La distancia es la de insertar, borrar y sustituir, la misma tabla que editDistance. Se calcula contra cada candidata y se guarda la menor. El empate no sustituye, así que gana la primera del diccionario. Con un diccionario enorme se usaría un BK-tree o un índice; aquí el diccionario es corto. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "la distancia de edición y un mínimo",
    "javascript": "function closestWord(word, dict) {\n  function dist(a, b) {\n    const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))\n    for (let i = 0; i <= a.length; i++) dp[i][0] = i\n    for (let j = 0; j <= b.length; j++) dp[0][j] = j\n    for (let i = 1; i <= a.length; i++) {\n      for (let j = 1; j <= b.length; j++) {\n        const cost = a[i - 1] === b[j - 1] ? 0 : 1\n        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)\n      }\n    }\n    return dp[a.length][b.length]\n  }\n  let best = dict[0]\n  let bestDist = dist(word, best)\n  for (const item of dict) {\n    const next = dist(word, item)\n    if (next < bestDist) {\n      bestDist = next\n      best = item\n    }\n  }\n  return best\n}\n",
    "typescript": "function closestWord(word: string, dict: string[]): string) {\n  function dist(a, b) {\n    const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))\n    for (let i = 0; i <= a.length; i++) dp[i][0] = i\n    for (let j = 0; j <= b.length; j++) dp[0][j] = j\n    for (let i = 1; i <= a.length; i++) {\n      for (let j = 1; j <= b.length; j++) {\n        const cost = a[i - 1] === b[j - 1] ? 0 : 1\n        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)\n      }\n    }\n    return dp[a.length][b.length]\n  }\n  let best = dict[0]\n  let bestDist = dist(word, best)\n  for (const item of dict) {\n    const next = dist(word, item)\n    if (next < bestDist) {\n      bestDist = next\n      best = item\n    }\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          "cat",
          [
            "car",
            "dog",
            "cart"
          ]
        ],
        "expected": "car"
      },
      {
        "args": [
          "a",
          [
            "a",
            "b"
          ]
        ],
        "expected": "a"
      }
    ]
  },
  {
    "id": "senior-034",
    "level": "senior",
    "title": "Barajar con semilla",
    "prompt": "Devuelve una copia de t barajada con Fisher-Yates. El aleatorio es este LCG: state empieza en seed % 2147483647 (si queda <= 0, súmale 2147483646). Cada número es state = (state * 16807) % 2147483647 y el valor en [0, 1) es (state - 1) / 2147483646. El índice j de la vuelta i es floor(valor * (i + 1)).\nEjemplo: [0, 1, 2, 3, 4], semilla 1 → [1, 3, 2, 4, 0].",
    "names": [
      "shuffleSeed"
    ],
    "starter": "function shuffleSeed(t, seed) {\n  \n}\n",
    "explanation": "Fisher-Yates intercambia cada posición i, desde el final, con una posición aleatoria entre 0 e i inclusive. Así cada permutación es igual de probable si el aleatorio lo es. Math.random no se puede probar, por eso la semilla fija la secuencia. El LCG de 16807 es el mínimo estándar histórico: no es criptográfico, y no hace falta que lo sea para un barajado de práctica. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Fisher-Yates y un generador lineal congruente",
    "javascript": "function shuffleSeed(t, seed) {\n  const out = t.slice()\n  let state = seed % 2147483647\n  if (state <= 0) state += 2147483646\n  function next() {\n    state = (state * 16807) % 2147483647\n    return (state - 1) / 2147483646\n  }\n  for (let i = out.length - 1; i > 0; i--) {\n    const j = Math.floor(next() * (i + 1))\n    const tmp = out[i]\n    out[i] = out[j]\n    out[j] = tmp\n  }\n  return out\n}\n",
    "typescript": "function shuffleSeed(t: number[], seed: number): number[]) {\n  const out = t.slice()\n  let state = seed % 2147483647\n  if (state <= 0) state += 2147483646\n  function next() {\n    state = (state * 16807) % 2147483647\n    return (state - 1) / 2147483646\n  }\n  for (let i = out.length - 1; i > 0; i--) {\n    const j = Math.floor(next() * (i + 1))\n    const tmp = out[i]\n    out[i] = out[j]\n    out[j] = tmp\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            0,
            1,
            2,
            3,
            4
          ],
          1
        ],
        "expected": [
          1,
          3,
          2,
          4,
          0
        ]
      }
    ]
  },
  {
    "id": "senior-035",
    "level": "senior",
    "title": "Mediana en streaming",
    "prompt": "Devuelve la mediana después de leer cada número, en orden. Si hay pares, la mediana es la media de los dos centrales.\nEjemplo: [1, 2, 3] → [1, 1.5, 2]. [5, 15, 1, 3] → [5, 10, 5, 4].",
    "names": [
      "medianOfStream"
    ],
    "starter": "function medianOfStream(t) {\n  \n}\n",
    "explanation": "La mitad baja guarda los menores y su cima es el mayor de ellos. La alta guarda los mayores y su cima es el menor. Se reequilibran para que la baja tenga un elemento más como mucho. La mediana es la cima de la baja, o la media de las dos cimas. Aquí cada mitad se ordena al insertar para que el código quepa en una pantalla; un heap binario hace la inserción en log n en vez de n log n. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos mitades ordenadas: la baja como montón máximo y la alta como montón mínimo",
    "javascript": "function medianOfStream(t) {\n  const low = []\n  const high = []\n  const out = []\n  function push(heap, n, asc) {\n    heap.push(n)\n    heap.sort(asc ? (a, b) => a - b : (a, b) => b - a)\n  }\n  for (const n of t) {\n    if (low.length === 0 || n <= low[0]) push(low, n, false)\n    else push(high, n, true)\n    if (low.length > high.length + 1) push(high, low.shift(), true)\n    else if (high.length > low.length) push(low, high.shift(), false)\n    if (low.length === high.length) out.push((low[0] + high[0]) / 2)\n    else out.push(low[0])\n  }\n  return out\n}\n",
    "typescript": "function medianOfStream(t: number[]): number[]) {\n  const low = []\n  const high = []\n  const out = []\n  function push(heap, n, asc) {\n    heap.push(n)\n    heap.sort(asc ? (a, b) => a - b : (a, b) => b - a)\n  }\n  for (const n of t) {\n    if (low.length === 0 || n <= low[0]) push(low, n, false)\n    else push(high, n, true)\n    if (low.length > high.length + 1) push(high, low.shift(), true)\n    else if (high.length > low.length) push(low, high.shift(), false)\n    if (low.length === high.length) out.push((low[0] + high[0]) / 2)\n    else out.push(low[0])\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          1,
          1.5,
          2
        ]
      },
      {
        "args": [
          [
            5,
            15,
            1,
            3
          ]
        ],
        "expected": [
          5,
          10,
          5,
          4
        ]
      }
    ]
  },
  {
    "id": "senior-036",
    "level": "senior",
    "title": "Codificar strings",
    "prompt": "Codifica una lista de strings en uno solo. Cada palabra va como su longitud, una almohadilla y el texto.\nEjemplo: [\"ab\", \"c\"] → \"2#ab1#c\". [\"a#b\"] → \"3#a#b\".",
    "names": [
      "encodeStrings"
    ],
    "starter": "function encodeStrings(words) {\n  \n}\n",
    "explanation": "Un separador fijo se rompe si la palabra lo contiene. Prefijar la longitud dice cuántos caracteres leer después de la almohadilla, y la almohadilla de dentro de la palabra ya no es especial. Es el mismo truco que un framing de red. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "longitud prefijada, para que el separador pueda aparecer dentro",
    "javascript": "function encodeStrings(words) {\n  return words.map((word) => word.length + '#' + word).join('')\n}\n",
    "typescript": "function encodeStrings(words: string[]): string) {\n  return words.map((word) => word.length + '#' + word).join('')\n}\n",
    "cases": [
      {
        "args": [
          [
            "ab",
            "c"
          ]
        ],
        "expected": "2#ab1#c"
      },
      {
        "args": [
          [
            "a#b"
          ]
        ],
        "expected": "3#a#b"
      },
      {
        "args": [
          []
        ],
        "expected": ""
      }
    ]
  },
  {
    "id": "senior-037",
    "level": "senior",
    "title": "Decodificar strings",
    "prompt": "Invierte encodeStrings. El texto vacío es la lista vacía.\nEjemplo: \"2#ab1#c\" → [\"ab\", \"c\"]. \"3#a#b\" → [\"a#b\"].",
    "names": [
      "decodeStrings"
    ],
    "starter": "function decodeStrings(text) {\n  \n}\n",
    "explanation": "Se lee dígitos hasta #. Esa longitud dice dónde acaba la palabra, aunque contenga almohadillas. El cursor salta al carácter siguiente y se repite. Sin la longitud no habría forma de saber si una # es separador o dato. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "leer la longitud hasta la almohadilla y luego slice de esa longitud",
    "javascript": "function decodeStrings(text) {\n  const out = []\n  let i = 0\n  while (i < text.length) {\n    let length = 0\n    while (text[i] !== '#') {\n      length = length * 10 + Number(text[i])\n      i++\n    }\n    i++\n    out.push(text.slice(i, i + length))\n    i += length\n  }\n  return out\n}\n",
    "typescript": "function decodeStrings(text: string): string[]) {\n  const out = []\n  let i = 0\n  while (i < text.length) {\n    let length = 0\n    while (text[i] !== '#') {\n      length = length * 10 + Number(text[i])\n      i++\n    }\n    i++\n    out.push(text.slice(i, i + length))\n    i += length\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "2#ab1#c"
        ],
        "expected": [
          "ab",
          "c"
        ]
      },
      {
        "args": [
          "3#a#b"
        ],
        "expected": [
          "a#b"
        ]
      },
      {
        "args": [
          ""
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "senior-038",
    "level": "senior",
    "title": "Aplanar hasta una profundidad",
    "prompt": "Aplana depth niveles. depth 0 devuelve una copia superficial de t.\nEjemplo: [1, [2, [3]]], 1 → [1, 2, [3]]. El mismo array con 2 → [1, 2, 3].",
    "names": [
      "flattenDepth"
    ],
    "starter": "function flattenDepth(t, depth) {\n  \n}\n",
    "explanation": "Si quedan niveles y el valor es un array, se aplana cada hijo con un nivel menos. Si no, el valor es una hoja de este aplanado, aunque sea un array: ya no toca abrirlo. flat y flatMap hacen lo mismo en una línea; la recursión enseña el contador. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "recursión con un contador de niveles que quedan",
    "javascript": "function flattenDepth(t, depth) {\n  function walk(value, left) {\n    if (Array.isArray(value) && left > 0) return value.flatMap((item) => walk(item, left - 1))\n    return [value]\n  }\n  return t.flatMap((item) => walk(item, depth))\n}\n",
    "typescript": "function flattenDepth(t: unknown[], depth: number): unknown[]) {\n  function walk(value, left) {\n    if (Array.isArray(value) && left > 0) return value.flatMap((item) => walk(item, left - 1))\n    return [value]\n  }\n  return t.flatMap((item) => walk(item, depth))\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            [
              2,
              [
                3
              ]
            ]
          ],
          1
        ],
        "expected": [
          1,
          2,
          [
            3
          ]
        ]
      },
      {
        "args": [
          [
            1,
            [
              2,
              [
                3
              ]
            ]
          ],
          2
        ],
        "expected": [
          1,
          2,
          3
        ]
      },
      {
        "args": [
          [
            1,
            [
              2
            ]
          ],
          0
        ],
        "expected": [
          1,
          [
            2
          ]
        ]
      }
    ]
  },
  {
    "id": "senior-039",
    "level": "senior",
    "title": "Claves distintas",
    "prompt": "Devuelve, ordenadas, las claves cuyo valor no es profundamente igual, incluyendo las que solo están en uno de los dos. Los valores son JSON.\nEjemplo: { a: 1, b: 2 } y { a: 1, b: 3, c: 4 } → [\"b\", \"c\"].",
    "names": [
      "diffKeys"
    ],
    "starter": "function diffKeys(a, b) {\n  \n}\n",
    "explanation": "Una clave que falta en un lado se ve como undefined y no coincide con el otro valor. JSON.stringify sirve aquí porque los valores son JSON y no nos importa el orden interno más allá de lo que stringify fija. Para objetos con claves en distinto orden habría que comparar en profundidad, como en deepEqual. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "la unión de las claves y JSON.stringify para el valor",
    "javascript": "function diffKeys(a, b) {\n  const keys = new Set([...Object.keys(a), ...Object.keys(b)])\n  const out = []\n  for (const key of keys) {\n    if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) out.push(key)\n  }\n  return out.sort()\n}\n",
    "typescript": "function diffKeys(a: Record<string, unknown>, b: Record<string, unknown>): string[]) {\n  const keys = new Set([...Object.keys(a), ...Object.keys(b)])\n  const out = []\n  for (const key of keys) {\n    if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) out.push(key)\n  }\n  return out.sort()\n}\n",
    "cases": [
      {
        "args": [
          {
            "a": 1,
            "b": 2
          },
          {
            "a": 1,
            "b": 3,
            "c": 4
          }
        ],
        "expected": [
          "b",
          "c"
        ]
      },
      {
        "args": [
          {
            "a": 1
          },
          {
            "a": 1
          }
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "senior-040",
    "level": "senior",
    "title": "Escribir una ruta sin mutar",
    "prompt": "Devuelve una copia de obj con value escrito en la ruta de puntos. Los objetos del camino se copian. Los que no están en el camino se comparten. Si falta un tramo, se crea un objeto.\nEjemplo: { a: { b: 1 } }, \"a.c\", 2 → { a: { b: 1, c: 2 } }.",
    "names": [
      "setPath"
    ],
    "starter": "function setPath(obj, path, value) {\n  \n}\n",
    "explanation": "Copiar el objeto entero sería correcto y más caro. Solo se duplican los objetos que hay que modificar: el resto conserva la referencia. Es la idea de la actualización inmutable. El objeto original no ve la clave nueva porque su hijo a fue sustituido por una copia en el resultado, no mutado. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "recursión y copia superficial en cada nivel del camino",
    "javascript": "function setPath(obj, path, value) {\n  const keys = path.split('.')\n  function write(current, index) {\n    if (index === keys.length) return value\n    const key = keys[index]\n    const source = current && typeof current === \"object\" ? current : {}\n    const copy = Array.isArray(source) ? source.slice() : { ...source }\n    copy[key] = write(source[key], index + 1)\n    return copy\n  }\n  return write(obj, 0)\n}\n",
    "typescript": "function setPath(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown>) {\n  const keys = path.split('.')\n  function write(current, index) {\n    if (index === keys.length) return value\n    const key = keys[index]\n    const source = current && typeof current === \"object\" ? current : {}\n    const copy = Array.isArray(source) ? source.slice() : { ...source }\n    copy[key] = write(source[key], index + 1)\n    return copy\n  }\n  return write(obj, 0)\n}\n",
    "cases": [
      {
        "args": [
          {
            "a": {
              "b": 1
            }
          },
          "a.c",
          2
        ],
        "expected": {
          "a": {
            "b": 1,
            "c": 2
          }
        }
      },
      {
        "args": [
          {},
          "a.b",
          1
        ],
        "expected": {
          "a": {
            "b": 1
          }
        }
      }
    ]
  },
  {
    "id": "senior-041",
    "level": "senior",
    "title": "Componer funciones",
    "prompt": "Devuelve una función que aplica fns de derecha a izquierda. compose([sumar1, doble])(3) es sumar1(doble(3)).",
    "names": [
      "compose"
    ],
    "starter": "function compose(fns) {\n  \n}\n",
    "explanation": "Componer f y g es hacer f(g(x)). El array se recorre al revés para que la función de la derecha sea la primera en ver el valor. Un reduceRight dice lo mismo. El closure guarda la lista; no se ejecuta nada hasta la llamada. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un cierre y un bucle desde el final del array",
    "javascript": "function compose(fns) {\n  return function (value) {\n    let current = value\n    for (let i = fns.length - 1; i >= 0; i--) current = fns[i](current)\n    return current\n  }\n}\n",
    "typescript": "function compose(fns: Array<(value: number) => number>): (value: number) => number {\n  return (value) => {\n    let current = value\n    for (let i = fns.length - 1; i >= 0; i--) current = fns[i](current)\n    return current\n  }\n}\n",
    "probe": "\nif (typeof compose !== \"function\") throw new Error(\"Define compose.\");\nvar fn = compose([function (n) { return n + 1 }, function (n) { return n * 2 }]);\nif (fn(3) !== 7) throw new Error(\"compose aplica de derecha a izquierda: (3 * 2) + 1 = 7.\");\nconsole.log(\"Correcto. compose encadena de derecha a izquierda.\");\n"
  },
  {
    "id": "senior-042",
    "level": "senior",
    "title": "Currificar en tres",
    "prompt": "Devuelve una versión de fn que se llama curry3(fn)(a)(b)(c) en vez de fn(a, b, c).",
    "names": [
      "curry3"
    ],
    "starter": "function curry3(fn) {\n  \n}\n",
    "explanation": "Cada llamada devuelve la siguiente y guarda su argumento en el closure. La última tiene los tres y llama a fn. Currificar una función de n argumentos es el mismo patrón con un contador; aquí n es 3 para que se vea sin abstracción de más. Sirve para fijar argumentos y pasar la función a medias. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "tres funciones anidadas que cierran sobre los argumentos",
    "javascript": "function curry3(fn) {\n  return function (a) {\n    return function (b) {\n      return function (c) {\n        return fn(a, b, c)\n      }\n    }\n  }\n}\n",
    "typescript": "function curry3(fn: (a: number, b: number, c: number) => number): (a: number) => (b: number) => (c: number) => number {\n  return (a) => (b) => (c) => fn(a, b, c)\n}\n",
    "probe": "\nif (typeof curry3 !== \"function\") throw new Error(\"Define curry3.\");\nvar sum = curry3(function (a, b, c) { return a + b + c });\nif (sum(1)(2)(3) !== 6) throw new Error(\"curry3(suma)(1)(2)(3) debe ser 6.\");\nconsole.log(\"Correcto. curry3 parte la función en tres llamadas.\");\n"
  },
  {
    "id": "senior-043",
    "level": "senior",
    "title": "Plantilla mínima",
    "prompt": "Sustituye cada ${clave} por data[clave]. Si la clave no está, se sustituye por \"\". No hay llaves anidadas.\nEjemplo: \"Hola ${name}\", { name: \"Ana\" } → \"Hola Ana\".",
    "names": [
      "renderTemplate"
    ],
    "starter": "function renderTemplate(text, data) {\n  \n}\n",
    "explanation": "La expresión busca ${ y luego todo lo que no sea } hasta la llave de cierre. La función de reemplazo recibe la clave y mira el objeto. No es un lenguaje de plantillas: no evalúa código, solo lee claves. Por eso no se usa eval, que ejecutaría lo que hubiera dentro. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "replace con una expresión regular y una función de reemplazo",
    "javascript": "function renderTemplate(text, data) {\n  return text.replace(/\\$\\{([^}]+)\\}/g, function (_, key) { return data[key] ?? \"\" })\n}\n",
    "typescript": "function renderTemplate(text: string, data: Record<string, string>): string) {\n  return text.replace(/\\$\\{([^}]+)\\}/g, function (_, key) { return data[key] ?? \"\" })\n}\n",
    "cases": [
      {
        "args": [
          "Hola ${name}",
          {
            "name": "Ana"
          }
        ],
        "expected": "Hola Ana"
      },
      {
        "args": [
          "${a}-${b}",
          {
            "a": "x"
          }
        ],
        "expected": "x-"
      }
    ]
  },
  {
    "id": "senior-044",
    "level": "senior",
    "title": "Glob simple",
    "prompt": "* sustituye cualquier secuencia, incluida la vacía. ? sustituye un carácter. El resto es literal.\nEjemplo: \"a*c\", \"abbc\" → true. \"a?c\", \"ac\" → false. \"a?c\", \"abc\" → true.",
    "names": [
      "globMatch"
    ],
    "starter": "function globMatch(pattern, text) {\n  \n}\n",
    "explanation": "El asterisco prueba quedarse con cero caracteres y también con uno más, y así hasta el final. ? y el literal avanzan los dos índices si coinciden. Con muchos asteriscos el backtracking puede ser exponencial; un autómata o programación dinámica lo deja polinómico. Para un patrón corto, la recursión se entiende. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "recursión sobre dos índices, con backtracking en el asterisco",
    "javascript": "function globMatch(pattern, text) {\n  function walk(p, t) {\n    if (p === pattern.length) return t === text.length\n    if (pattern[p] === '*') {\n      for (let i = t; i <= text.length; i++) if (walk(p + 1, i)) return true\n      return false\n    }\n    if (t === text.length) return false\n    if (pattern[p] === '?' || pattern[p] === text[t]) return walk(p + 1, t + 1)\n    return false\n  }\n  return walk(0, 0)\n}\n",
    "typescript": "function globMatch(pattern: string, text: string): boolean) {\n  function walk(p, t) {\n    if (p === pattern.length) return t === text.length\n    if (pattern[p] === '*') {\n      for (let i = t; i <= text.length; i++) if (walk(p + 1, i)) return true\n      return false\n    }\n    if (t === text.length) return false\n    if (pattern[p] === '?' || pattern[p] === text[t]) return walk(p + 1, t + 1)\n    return false\n  }\n  return walk(0, 0)\n}\n",
    "cases": [
      {
        "args": [
          "a*c",
          "abbc"
        ],
        "expected": true
      },
      {
        "args": [
          "a?c",
          "ac"
        ],
        "expected": false
      },
      {
        "args": [
          "a?c",
          "abc"
        ],
        "expected": true
      },
      {
        "args": [
          "*",
          ""
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "senior-045",
    "level": "senior",
    "title": "CSV con comillas",
    "prompt": "Lee un CSV. La coma separa celdas y el salto de línea separa filas. Un campo entre comillas puede contener comas y saltos no: en estos casos no hay saltos dentro. Una comilla escapada es dos comillas seguidas. El texto no termina en salto de línea de más.\nEjemplo: \"a,\\\"b,c\\\"\\nd,e\" → [[\"a\", \"b,c\"], [\"d\", \"e\"]].",
    "names": [
      "parseCsv"
    ],
    "starter": "function parseCsv(text) {\n  \n}\n",
    "explanation": "Hay dos modos: fuera y dentro de comillas. Fuera, la coma cierra celda y el salto cierra fila. Dentro, la coma es texto, y \"\" es una comilla literal. Un split por comas rompería el campo citado. El estado es lo mínimo que el split no puede recordar. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una máquina de estados con el modo entre comillas",
    "javascript": "function parseCsv(text) {\n  const rows = []\n  let row = []\n  let cell = ''\n  let quoted = false\n  for (let i = 0; i < text.length; i++) {\n    const ch = text[i]\n    if (quoted) {\n      if (ch === '\"' && text[i + 1] === '\"') {\n        cell += '\"'\n        i++\n      } else if (ch === '\"') quoted = false\n      else cell += ch\n    } else if (ch === '\"') quoted = true\n    else if (ch === ',') {\n      row.push(cell)\n      cell = ''\n    } else if (ch === '\\n') {\n      row.push(cell)\n      rows.push(row)\n      row = []\n      cell = ''\n    } else cell += ch\n  }\n  if (cell.length || row.length) {\n    row.push(cell)\n    rows.push(row)\n  }\n  return rows\n}\n",
    "typescript": "function parseCsv(text: string): string[][]) {\n  const rows = []\n  let row = []\n  let cell = ''\n  let quoted = false\n  for (let i = 0; i < text.length; i++) {\n    const ch = text[i]\n    if (quoted) {\n      if (ch === '\"' && text[i + 1] === '\"') {\n        cell += '\"'\n        i++\n      } else if (ch === '\"') quoted = false\n      else cell += ch\n    } else if (ch === '\"') quoted = true\n    else if (ch === ',') {\n      row.push(cell)\n      cell = ''\n    } else if (ch === '\\n') {\n      row.push(cell)\n      rows.push(row)\n      row = []\n      cell = ''\n    } else cell += ch\n  }\n  if (cell.length || row.length) {\n    row.push(cell)\n    rows.push(row)\n  }\n  return rows\n}\n",
    "cases": [
      {
        "args": [
          "a,\"b,c\"\nd,e"
        ],
        "expected": [
          [
            "a",
            "b,c"
          ],
          [
            "d",
            "e"
          ]
        ]
      },
      {
        "args": [
          "a,\"b\"\"c\"\nd"
        ],
        "expected": [
          [
            "a",
            "b\"c"
          ],
          [
            "d"
          ]
        ]
      }
    ]
  },
  {
    "id": "senior-046",
    "level": "senior",
    "title": "Tachar palabras",
    "prompt": "Sustituye cada aparición exacta de cada palabra por asteriscos de la misma longitud. Distingue mayúsculas. No es una expresión con bordes de palabra: es un reemplazo de substring.\nEjemplo: \"la clave es clave\", [\"clave\"] → \"la ***** es *****\".",
    "names": [
      "redact"
    ],
    "starter": "function redact(text, words) {\n  \n}\n",
    "explanation": "split por la palabra y join con la máscara reemplaza todas las copias sin solaparse de izquierda a derecha. repeat construye tantos asteriscos como caracteres tenía la palabra, para no cambiar la longitud visible. Se hace palabra a palabra, en el orden dado. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "split y join, que sustituyen todas las apariciones",
    "javascript": "function redact(text, words) {\n  let out = text\n  for (const word of words) {\n    const mask = '*'.repeat(word.length)\n    out = out.split(word).join(mask)\n  }\n  return out\n}\n",
    "typescript": "function redact(text: string, words: string[]): string) {\n  let out = text\n  for (const word of words) {\n    const mask = '*'.repeat(word.length)\n    out = out.split(word).join(mask)\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "la clave es clave",
          [
            "clave"
          ]
        ],
        "expected": "la ***** es *****"
      },
      {
        "args": [
          "abc",
          [
            "a",
            "b"
          ]
        ],
        "expected": "**c"
      }
    ]
  },
  {
    "id": "senior-047",
    "level": "senior",
    "title": "Quitar etiquetas",
    "prompt": "Quita las etiquetas HTML de la forma <...>, sin anidar < dentro. No interpreta entidades.\nEjemplo: \"<p>Hola</p>\" → \"Hola\".",
    "names": [
      "stripTags"
    ],
    "starter": "function stripTags(text) {\n  \n}\n",
    "explanation": "[^>]* consume hasta el siguiente >, así que una etiqueta simple desaparece. No es un parser HTML: un < dentro de un atributo citado o un comentario raro lo engañan. Para texto controlado basta. Para HTML de verdad haría falta un parser, no una expresión regular. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "replace con /<[^>]*>/g",
    "javascript": "function stripTags(text) {\n  return text.replace(/<[^>]*>/g, '')\n}\n",
    "typescript": "function stripTags(text: string): string) {\n  return text.replace(/<[^>]*>/g, '')\n}\n",
    "cases": [
      {
        "args": [
          "<p>Hola</p>"
        ],
        "expected": "Hola"
      },
      {
        "args": [
          "a<br>b"
        ],
        "expected": "ab"
      }
    ]
  },
  {
    "id": "senior-048",
    "level": "senior",
    "title": "Intersección de intervalos",
    "prompt": "a y b son listas de intervalos [inicio, fin] cerrados, ordenadas y sin solapes internos. Devuelve su intersección, también ordenada.\nEjemplo: [[0, 2], [5, 10]] y [[1, 5], [8, 12]] → [[1, 2], [5, 5], [8, 10]].",
    "names": [
      "intervalIntersection"
    ],
    "starter": "function intervalIntersection(a, b) {\n  \n}\n",
    "explanation": "El solape de dos intervalos es el mayor inicio y el menor fin, si ese inicio no pasa del fin. Como ambas listas están ordenadas, se avanza la que antes termina: la otra todavía podría cortar al siguiente de esta. Es lineal. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos punteros",
    "javascript": "function intervalIntersection(a, b) {\n  const out = []\n  let i = 0\n  let j = 0\n  while (i < a.length && j < b.length) {\n    const start = a[i][0] > b[j][0] ? a[i][0] : b[j][0]\n    const end = a[i][1] < b[j][1] ? a[i][1] : b[j][1]\n    if (start <= end) out.push([start, end])\n    if (a[i][1] < b[j][1]) i++\n    else j++\n  }\n  return out\n}\n",
    "typescript": "function intervalIntersection(a: number[][], b: number[][]): number[][]) {\n  const out = []\n  let i = 0\n  let j = 0\n  while (i < a.length && j < b.length) {\n    const start = a[i][0] > b[j][0] ? a[i][0] : b[j][0]\n    const end = a[i][1] < b[j][1] ? a[i][1] : b[j][1]\n    if (start <= end) out.push([start, end])\n    if (a[i][1] < b[j][1]) i++\n    else j++\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              0,
              2
            ],
            [
              5,
              10
            ]
          ],
          [
            [
              1,
              5
            ],
            [
              8,
              12
            ]
          ]
        ],
        "expected": [
          [
            1,
            2
          ],
          [
            5,
            5
          ],
          [
            8,
            10
          ]
        ]
      }
    ]
  },
  {
    "id": "senior-049",
    "level": "senior",
    "title": "¿Se puede asistir?",
    "prompt": "Cada reunión es [inicio, fin). Di si una persona puede asistir a todas, es decir, si no hay solapes. Tocar en el fin está permitido.\nEjemplo: [[7, 10], [2, 4]] → true. [[0, 30], [5, 10]] → false.",
    "names": [
      "canAttend"
    ],
    "starter": "function canAttend(intervals) {\n  \n}\n",
    "explanation": "Ordenadas por el inicio, cada reunión solo puede chocar con la anterior. Si empieza antes de que la anterior acabe, hay solape. Es el mismo dato que minMeetingRooms, preguntando si el máximo de salas es 1. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ordenar por el inicio y comparar con el fin anterior",
    "javascript": "function canAttend(intervals) {\n  const sorted = intervals.slice().sort((a, b) => a[0] - b[0])\n  for (let i = 1; i < sorted.length; i++) {\n    if (sorted[i][0] < sorted[i - 1][1]) return false\n  }\n  return true\n}\n",
    "typescript": "function canAttend(intervals: number[][]): boolean) {\n  const sorted = intervals.slice().sort((a, b) => a[0] - b[0])\n  for (let i = 1; i < sorted.length; i++) {\n    if (sorted[i][0] < sorted[i - 1][1]) return false\n  }\n  return true\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              7,
              10
            ],
            [
              2,
              4
            ]
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            [
              0,
              30
            ],
            [
              5,
              10
            ]
          ]
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "senior-050",
    "level": "senior",
    "title": "Orden alienígena",
    "prompt": "words está ordenada según un alfabeto desconocido de letras minúsculas. Devuelve un orden válido de las letras que aparecen. Si hay varias, elige siempre la menor disponible. Si el orden es imposible, \"\".\nEjemplo: [\"wrt\", \"wrf\", \"er\", \"ett\", \"rftt\"] → \"wertf\".",
    "names": [
      "alienOrder"
    ],
    "starter": "function alienOrder(words) {\n  \n}\n",
    "explanation": "La primera letra distinta entre dos palabras consecutivas dice que una va antes que la otra. Si una palabra más larga empieza por una más corta que va después, el orden es imposible. Con esas aristas se hace un orden topológico. El desempate por letra menor deja un único string. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "grafo de precedencias y Kahn con desempate",
    "javascript": "function alienOrder(words) {\n  const next = new Map()\n  const indegree = new Map()\n  for (const word of words) {\n    for (const ch of word) {\n      if (!next.has(ch)) next.set(ch, new Set())\n      if (!indegree.has(ch)) indegree.set(ch, 0)\n    }\n  }\n  for (let i = 0; i < words.length - 1; i++) {\n    const a = words[i]\n    const b = words[i + 1]\n    if (a.length > b.length && a.startsWith(b)) return \"\"\n    const size = Math.min(a.length, b.length)\n    for (let j = 0; j < size; j++) {\n      if (a[j] !== b[j]) {\n        if (!next.get(a[j]).has(b[j])) {\n          next.get(a[j]).add(b[j])\n          indegree.set(b[j], indegree.get(b[j]) + 1)\n        }\n        break\n      }\n    }\n  }\n  const queue = []\n  for (const [ch, degree] of indegree) if (degree === 0) queue.push(ch)\n  let out = ''\n  while (queue.length) {\n    queue.sort()\n    const ch = queue.shift()\n    out += ch\n    for (const to of next.get(ch)) {\n      indegree.set(to, indegree.get(to) - 1)\n      if (indegree.get(to) === 0) queue.push(to)\n    }\n  }\n  return out.length === indegree.size ? out : ''\n}\n",
    "typescript": "function alienOrder(words: string[]): string) {\n  const next = new Map()\n  const indegree = new Map()\n  for (const word of words) {\n    for (const ch of word) {\n      if (!next.has(ch)) next.set(ch, new Set())\n      if (!indegree.has(ch)) indegree.set(ch, 0)\n    }\n  }\n  for (let i = 0; i < words.length - 1; i++) {\n    const a = words[i]\n    const b = words[i + 1]\n    if (a.length > b.length && a.startsWith(b)) return \"\"\n    const size = Math.min(a.length, b.length)\n    for (let j = 0; j < size; j++) {\n      if (a[j] !== b[j]) {\n        if (!next.get(a[j]).has(b[j])) {\n          next.get(a[j]).add(b[j])\n          indegree.set(b[j], indegree.get(b[j]) + 1)\n        }\n        break\n      }\n    }\n  }\n  const queue = []\n  for (const [ch, degree] of indegree) if (degree === 0) queue.push(ch)\n  let out = ''\n  while (queue.length) {\n    queue.sort()\n    const ch = queue.shift()\n    out += ch\n    for (const to of next.get(ch)) {\n      indegree.set(to, indegree.get(to) - 1)\n      if (indegree.get(to) === 0) queue.push(to)\n    }\n  }\n  return out.length === indegree.size ? out : ''\n}\n",
    "cases": [
      {
        "args": [
          [
            "wrt",
            "wrf",
            "er",
            "ett",
            "rftt"
          ]
        ],
        "expected": "wertf"
      },
      {
        "args": [
          [
            "z",
            "x"
          ]
        ],
        "expected": "zx"
      }
    ]
  },
  {
    "id": "senior-051",
    "level": "senior",
    "title": "Fusionar cuentas",
    "prompt": "Cada cuenta es [nombre, email, ...]. Si dos cuentas comparten un email, son la misma persona. Devuelve las cuentas fusionadas: nombre y emails ordenados. Ordena las cuentas por su primer email.\nEjemplo: John con johnsmith y john_newyork, John con johnsmith y john00, Mary con mary, John con johnnybravo.",
    "names": [
      "accountsMerge"
    ],
    "starter": "function accountsMerge(accounts) {\n  \n}\n",
    "explanation": "El nombre no identifica: hay varios John. El email sí. Se unen todos los emails de una fila a su primer email. Al final cada raíz agrupa un buzón. Se ordenan los emails y luego las cuentas, para que el resultado no dependa del orden de recorrido del Map. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "union-find sobre los emails",
    "javascript": "function accountsMerge(accounts) {\n  const parent = new Map()\n  const emailName = new Map()\n  function find(x) {\n    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)))\n    return parent.get(x)\n  }\n  for (const account of accounts) {\n    const name = account[0]\n    for (let i = 1; i < account.length; i++) {\n      if (!parent.has(account[i])) parent.set(account[i], account[i])\n      emailName.set(account[i], name)\n    }\n    for (let i = 2; i < account.length; i++) parent.set(find(account[i]), find(account[1]))\n  }\n  const groups = new Map()\n  for (const email of parent.keys()) {\n    const root = find(email)\n    const list = groups.get(root) ?? []\n    list.push(email)\n    groups.set(root, list)\n  }\n  const out = []\n  for (const [root, emails] of groups) {\n    emails.sort()\n    out.push([emailName.get(root), ...emails])\n  }\n  out.sort((a, b) => a[1].localeCompare(b[1]))\n  return out\n}\n",
    "typescript": "function accountsMerge(accounts: string[][]): string[][]) {\n  const parent = new Map()\n  const emailName = new Map()\n  function find(x) {\n    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)))\n    return parent.get(x)\n  }\n  for (const account of accounts) {\n    const name = account[0]\n    for (let i = 1; i < account.length; i++) {\n      if (!parent.has(account[i])) parent.set(account[i], account[i])\n      emailName.set(account[i], name)\n    }\n    for (let i = 2; i < account.length; i++) parent.set(find(account[i]), find(account[1]))\n  }\n  const groups = new Map()\n  for (const email of parent.keys()) {\n    const root = find(email)\n    const list = groups.get(root) ?? []\n    list.push(email)\n    groups.set(root, list)\n  }\n  const out = []\n  for (const [root, emails] of groups) {\n    emails.sort()\n    out.push([emailName.get(root), ...emails])\n  }\n  out.sort((a, b) => a[1].localeCompare(b[1]))\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              "John",
              "johnsmith@mail.com",
              "john_newyork@mail.com"
            ],
            [
              "John",
              "johnsmith@mail.com",
              "john00@mail.com"
            ],
            [
              "Mary",
              "mary@mail.com"
            ],
            [
              "John",
              "johnnybravo@mail.com"
            ]
          ]
        ],
        "expected": [
          [
            "John",
            "john00@mail.com",
            "john_newyork@mail.com",
            "johnsmith@mail.com"
          ],
          [
            "John",
            "johnnybravo@mail.com"
          ],
          [
            "Mary",
            "mary@mail.com"
          ]
        ]
      }
    ]
  },
  {
    "id": "senior-052",
    "level": "senior",
    "title": "Provincias",
    "prompt": "isConnected es una matriz simétrica. 1 significa que dos ciudades están conectadas, directa o hay que cerrar la transitiva. ¿Cuántas provincias hay?\nEjemplo: [[1, 1, 0], [1, 1, 0], [0, 0, 1]] → 2.",
    "names": [
      "numProvinces"
    ],
    "starter": "function numProvinces(isConnected) {\n  \n}\n",
    "explanation": "Es el número de componentes conexas, con la matriz en vez de la lista de aristas. Se visita cada ciudad no vista y se recorren sus vecinas. Cada recorrido es una provincia. Union-find daría el mismo número. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "DFS o BFS sobre la matriz",
    "javascript": "function numProvinces(isConnected) {\n  const n = isConnected.length\n  const seen = new Array(n).fill(false)\n  let total = 0\n  function walk(city) {\n    seen[city] = true\n    for (let other = 0; other < n; other++) {\n      if (isConnected[city][other] === 1 && !seen[other]) walk(other)\n    }\n  }\n  for (let city = 0; city < n; city++) {\n    if (!seen[city]) {\n      total++\n      walk(city)\n    }\n  }\n  return total\n}\n",
    "typescript": "function numProvinces(isConnected: number[][]): number) {\n  const n = isConnected.length\n  const seen = new Array(n).fill(false)\n  let total = 0\n  function walk(city) {\n    seen[city] = true\n    for (let other = 0; other < n; other++) {\n      if (isConnected[city][other] === 1 && !seen[other]) walk(other)\n    }\n  }\n  for (let city = 0; city < n; city++) {\n    if (!seen[city]) {\n      total++\n      walk(city)\n    }\n  }\n  return total\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              1,
              1,
              0
            ],
            [
              1,
              1,
              0
            ],
            [
              0,
              0,
              1
            ]
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            [
              1
            ]
          ]
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "senior-053",
    "level": "senior",
    "title": "Arista redundante",
    "prompt": "edges forma un árbol no dirigido de n nodos, numerados desde 1, más una arista de más, en algún orden. Devuelve la arista que, al añadirla en ese orden, cierra el primer ciclo.\nEjemplo: [[1, 2], [1, 3], [2, 3]] → [2, 3].",
    "names": [
      "findRedundant"
    ],
    "starter": "function findRedundant(edges) {\n  \n}\n",
    "explanation": "Un árbol no tiene ciclos. Cada arista une dos componentes. Si sus extremos ya comparten raíz, esa arista es la que cierra el ciclo en este orden. No es \"cualquier\" arista del ciclo: es la que llega cuando el ciclo ya se podía formar. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "union-find: si los dos extremos ya están unidos, esa arista sobra",
    "javascript": "function findRedundant(edges) {\n  const parent = new Map()\n  function find(x) {\n    if (!parent.has(x)) parent.set(x, x)\n    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)))\n    return parent.get(x)\n  }\n  for (const [a, b] of edges) {\n    const ra = find(a)\n    const rb = find(b)\n    if (ra === rb) return [a, b]\n    parent.set(ra, rb)\n  }\n  return []\n}\n",
    "typescript": "function findRedundant(edges: number[][]): number[]) {\n  const parent = new Map()\n  function find(x) {\n    if (!parent.has(x)) parent.set(x, x)\n    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)))\n    return parent.get(x)\n  }\n  for (const [a, b] of edges) {\n    const ra = find(a)\n    const rb = find(b)\n    if (ra === rb) return [a, b]\n    parent.set(ra, rb)\n  }\n  return []\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              1,
              2
            ],
            [
              1,
              3
            ],
            [
              2,
              3
            ]
          ]
        ],
        "expected": [
          2,
          3
        ]
      },
      {
        "args": [
          [
            [
              1,
              2
            ],
            [
              2,
              3
            ],
            [
              3,
              4
            ],
            [
              1,
              4
            ],
            [
              1,
              5
            ]
          ]
        ],
        "expected": [
          1,
          4
        ]
      }
    ]
  },
  {
    "id": "senior-054",
    "level": "senior",
    "title": "Orden de los cursos",
    "prompt": "Igual que canFinish, pero devuelve un orden válido. Si hay varios, elige siempre el curso de número menor disponible. Si es imposible, null.\nEjemplo: 2, [[1, 0]] → [0, 1].",
    "names": [
      "courseOrder"
    ],
    "starter": "function courseOrder(n, prerequisites) {\n  \n}\n",
    "explanation": "Es el orden topológico del grafo de requisitos. El requisito apunta al curso. Ordenar la cola deja un único orden para las pruebas y también es una política razonable: cursar antes el de número menor cuando los dos están libres. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Kahn con la cola ordenada",
    "javascript": "function courseOrder(n, prerequisites) {\n  const next = Array.from({ length: n }, () => [])\n  const indegree = new Array(n).fill(0)\n  for (const [course, req] of prerequisites) {\n    next[req].push(course)\n    indegree[course]++\n  }\n  const queue = []\n  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i)\n  const out = []\n  while (queue.length) {\n    queue.sort((a, b) => a - b)\n    const node = queue.shift()\n    out.push(node)\n    for (const to of next[node]) {\n      indegree[to]--\n      if (indegree[to] === 0) queue.push(to)\n    }\n  }\n  return out.length === n ? out : null\n}\n",
    "typescript": "function courseOrder(n: number, prerequisites: number[][]): number[] | null) {\n  const next = Array.from({ length: n }, () => [])\n  const indegree = new Array(n).fill(0)\n  for (const [course, req] of prerequisites) {\n    next[req].push(course)\n    indegree[course]++\n  }\n  const queue = []\n  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i)\n  const out = []\n  while (queue.length) {\n    queue.sort((a, b) => a - b)\n    const node = queue.shift()\n    out.push(node)\n    for (const to of next[node]) {\n      indegree[to]--\n      if (indegree[to] === 0) queue.push(to)\n    }\n  }\n  return out.length === n ? out : null\n}\n",
    "cases": [
      {
        "args": [
          2,
          [
            [
              1,
              0
            ]
          ]
        ],
        "expected": [
          0,
          1
        ]
      },
      {
        "args": [
          2,
          [
            [
              1,
              0
            ],
            [
              0,
              1
            ]
          ]
        ],
        "expected": null
      }
    ]
  },
  {
    "id": "senior-055",
    "level": "senior",
    "title": "Naranjas podridas",
    "prompt": "0 es vacío, 1 es naranja fresca y 2 es podrida. Cada minuto, una podrida pudre a las frescas de sus cuatro vecinos. ¿Cuántos minutos hasta que no quede ninguna fresca? Si es imposible, -1. Hay al menos una fila.\nEjemplo: [[2, 1, 1], [1, 1, 0], [0, 1, 1]] → 4.",
    "names": [
      "orangesRotting"
    ],
    "starter": "function orangesRotting(grid) {\n  \n}\n",
    "explanation": "Todas las podridas iniciales entran a la vez en la cola: el minuto 0 tiene varios orígenes. Cada capa de la anchura es un minuto. Si al acabar queda alguna fresca, estaba aislada y la respuesta es -1. Se trabaja sobre una copia para no depender de mutar el argumento. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "búsqueda en anchura multisource",
    "javascript": "function orangesRotting(grid) {\n  const rows = grid.length\n  const cols = grid[0].length\n  const board = grid.map((row) => row.slice())\n  const queue = []\n  let fresh = 0\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (board[r][c] === 2) queue.push([r, c])\n      if (board[r][c] === 1) fresh++\n    }\n  }\n  let minutes = 0\n  let head = 0\n  while (head < queue.length && fresh > 0) {\n    const size = queue.length - head\n    for (let s = 0; s < size; s++) {\n      const [r, c] = queue[head++]\n      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n        const nr = r + dr\n        const nc = c + dc\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || board[nr][nc] !== 1) continue\n        board[nr][nc] = 2\n        fresh--\n        queue.push([nr, nc])\n      }\n    }\n    minutes++\n  }\n  return fresh === 0 ? minutes : -1\n}\n",
    "typescript": "function orangesRotting(grid: number[][]): number) {\n  const rows = grid.length\n  const cols = grid[0].length\n  const board = grid.map((row) => row.slice())\n  const queue = []\n  let fresh = 0\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (board[r][c] === 2) queue.push([r, c])\n      if (board[r][c] === 1) fresh++\n    }\n  }\n  let minutes = 0\n  let head = 0\n  while (head < queue.length && fresh > 0) {\n    const size = queue.length - head\n    for (let s = 0; s < size; s++) {\n      const [r, c] = queue[head++]\n      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n        const nr = r + dr\n        const nc = c + dc\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || board[nr][nc] !== 1) continue\n        board[nr][nc] = 2\n        fresh--\n        queue.push([nr, nc])\n      }\n    }\n    minutes++\n  }\n  return fresh === 0 ? minutes : -1\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              2,
              1,
              1
            ],
            [
              1,
              1,
              0
            ],
            [
              0,
              1,
              1
            ]
          ]
        ],
        "expected": 4
      },
      {
        "args": [
          [
            [
              2,
              1,
              1
            ],
            [
              0,
              1,
              1
            ],
            [
              1,
              0,
              1
            ]
          ]
        ],
        "expected": -1
      },
      {
        "args": [
          [
            [
              0
            ]
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-056",
    "level": "senior",
    "title": "Pacífico y Atlántico",
    "prompt": "El agua baja o se queda, nunca sube, y se mueve en cruz. El borde izquierdo y el de arriba tocan el Pacífico. El derecho y el de abajo, el Atlántico. Devuelve las casillas desde las que se llega a los dos, en orden de fila y luego columna.\nEjemplo: [[1, 1], [1, 1]] → las cuatro casillas.",
    "names": [
      "pacificAtlantic"
    ],
    "starter": "function pacificAtlantic(heights) {\n  \n}\n",
    "explanation": "Recorrer desde cada casilla hasta los océanos repite trabajo. Es más barato partir de cada océano y subir hacia las casillas de altura mayor o igual: el agua habría podido bajar por ese camino. La intersección de los dos recorridos es la respuesta. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos BFS desde los océanos, subiendo",
    "javascript": "function pacificAtlantic(heights) {\n  const rows = heights.length\n  const cols = heights[0].length\n  function reach(starts) {\n    const seen = Array.from({ length: rows }, () => new Array(cols).fill(false))\n    const queue = starts.slice()\n    for (const [r, c] of starts) seen[r][c] = true\n    let head = 0\n    while (head < queue.length) {\n      const [r, c] = queue[head++]\n      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n        const nr = r + dr\n        const nc = c + dc\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || seen[nr][nc] || heights[nr][nc] < heights[r][c]) continue\n        seen[nr][nc] = true\n        queue.push([nr, nc])\n      }\n    }\n    return seen\n  }\n  const pacific = []\n  const atlantic = []\n  for (let r = 0; r < rows; r++) {\n    pacific.push([r, 0])\n    atlantic.push([r, cols - 1])\n  }\n  for (let c = 0; c < cols; c++) {\n    pacific.push([0, c])\n    atlantic.push([rows - 1, c])\n  }\n  const left = reach(pacific)\n  const right = reach(atlantic)\n  const out = []\n  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (left[r][c] && right[r][c]) out.push([r, c])\n  return out\n}\n",
    "typescript": "function pacificAtlantic(heights: number[][]): number[][]) {\n  const rows = heights.length\n  const cols = heights[0].length\n  function reach(starts) {\n    const seen = Array.from({ length: rows }, () => new Array(cols).fill(false))\n    const queue = starts.slice()\n    for (const [r, c] of starts) seen[r][c] = true\n    let head = 0\n    while (head < queue.length) {\n      const [r, c] = queue[head++]\n      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n        const nr = r + dr\n        const nc = c + dc\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || seen[nr][nc] || heights[nr][nc] < heights[r][c]) continue\n        seen[nr][nc] = true\n        queue.push([nr, nc])\n      }\n    }\n    return seen\n  }\n  const pacific = []\n  const atlantic = []\n  for (let r = 0; r < rows; r++) {\n    pacific.push([r, 0])\n    atlantic.push([r, cols - 1])\n  }\n  for (let c = 0; c < cols; c++) {\n    pacific.push([0, c])\n    atlantic.push([rows - 1, c])\n  }\n  const left = reach(pacific)\n  const right = reach(atlantic)\n  const out = []\n  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (left[r][c] && right[r][c]) out.push([r, c])\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              1,
              1
            ],
            [
              1,
              1
            ]
          ]
        ],
        "expected": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ]
      }
    ]
  },
  {
    "id": "senior-057",
    "level": "senior",
    "title": "Buscar palabra en el tablero",
    "prompt": "Di si word se puede leer en el tablero moviéndose en cruz, sin reutilizar la misma casilla. Hay al menos una fila.\nEjemplo: [[\"A\", \"B\"], [\"C\", \"D\"]], \"ABD\" → true. \"ABC\" → false.",
    "names": [
      "wordSearch"
    ],
    "starter": "function wordSearch(board, word) {\n  \n}\n",
    "explanation": "Desde cada casilla se intenta la palabra. La casilla se marca para no reutilizarla y se restaura al volver: es backtracking, no un marcado definitivo. Sin restaurar, un intento fallido contaminaría el siguiente. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "DFS con retroceso",
    "javascript": "function wordSearch(board, word) {\n  const rows = board.length\n  const cols = board[0].length\n  const grid = board.map((row) => row.slice())\n  function walk(r, c, i) {\n    if (i === word.length) return true\n    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== word[i]) return false\n    const saved = grid[r][c]\n    grid[r][c] = '#'\n    const ok = walk(r + 1, c, i + 1) || walk(r - 1, c, i + 1) || walk(r, c + 1, i + 1) || walk(r, c - 1, i + 1)\n    grid[r][c] = saved\n    return ok\n  }\n  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (walk(r, c, 0)) return true\n  return false\n}\n",
    "typescript": "function wordSearch(board: string[][], word: string): boolean) {\n  const rows = board.length\n  const cols = board[0].length\n  const grid = board.map((row) => row.slice())\n  function walk(r, c, i) {\n    if (i === word.length) return true\n    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== word[i]) return false\n    const saved = grid[r][c]\n    grid[r][c] = '#'\n    const ok = walk(r + 1, c, i + 1) || walk(r - 1, c, i + 1) || walk(r, c + 1, i + 1) || walk(r, c - 1, i + 1)\n    grid[r][c] = saved\n    return ok\n  }\n  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (walk(r, c, 0)) return true\n  return false\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              "A",
              "B"
            ],
            [
              "C",
              "D"
            ]
          ],
          "ABD"
        ],
        "expected": true
      },
      {
        "args": [
          [
            [
              "A",
              "B"
            ],
            [
              "C",
              "D"
            ]
          ],
          "ABC"
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "senior-058",
    "level": "senior",
    "title": "Rodear regiones",
    "prompt": "El tablero tiene \"X\" y \"O\". Captura las O que están rodeadas: las que no tocan el borde por un camino de O en cruz. Devuelve el tablero nuevo.\nEjemplo: una O en el centro de un 3x3 de X pasa a X. Una columna de O que toca el borde se queda.",
    "names": [
      "surroundRegions"
    ],
    "starter": "function surroundRegions(board) {\n  \n}\n",
    "explanation": "Es más fácil marcar las O que se salvan, las del borde y sus vecinas, que buscar las rodeadas. Se marcan como E, luego las O que quedan pasan a X y las E vuelven a O. Se devuelve una copia. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "DFS desde los bordes y un marcado temporal",
    "javascript": "function surroundRegions(board) {\n  const rows = board.length\n  const cols = board[0].length\n  const out = board.map((row) => row.slice())\n  function walk(r, c) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || out[r][c] !== 'O') return\n    out[r][c] = 'E'\n    walk(r + 1, c)\n    walk(r - 1, c)\n    walk(r, c + 1)\n    walk(r, c - 1)\n  }\n  for (let r = 0; r < rows; r++) {\n    walk(r, 0)\n    walk(r, cols - 1)\n  }\n  for (let c = 0; c < cols; c++) {\n    walk(0, c)\n    walk(rows - 1, c)\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (out[r][c] === 'O') out[r][c] = 'X'\n      else if (out[r][c] === 'E') out[r][c] = 'O'\n    }\n  }\n  return out\n}\n",
    "typescript": "function surroundRegions(board: string[][]): string[][]) {\n  const rows = board.length\n  const cols = board[0].length\n  const out = board.map((row) => row.slice())\n  function walk(r, c) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || out[r][c] !== 'O') return\n    out[r][c] = 'E'\n    walk(r + 1, c)\n    walk(r - 1, c)\n    walk(r, c + 1)\n    walk(r, c - 1)\n  }\n  for (let r = 0; r < rows; r++) {\n    walk(r, 0)\n    walk(r, cols - 1)\n  }\n  for (let c = 0; c < cols; c++) {\n    walk(0, c)\n    walk(rows - 1, c)\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (out[r][c] === 'O') out[r][c] = 'X'\n      else if (out[r][c] === 'E') out[r][c] = 'O'\n    }\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              "X",
              "X",
              "X"
            ],
            [
              "X",
              "O",
              "X"
            ],
            [
              "X",
              "X",
              "X"
            ]
          ]
        ],
        "expected": [
          [
            "X",
            "X",
            "X"
          ],
          [
            "X",
            "X",
            "X"
          ],
          [
            "X",
            "X",
            "X"
          ]
        ]
      },
      {
        "args": [
          [
            [
              "X",
              "O",
              "X"
            ],
            [
              "X",
              "O",
              "X"
            ],
            [
              "X",
              "O",
              "X"
            ]
          ]
        ],
        "expected": [
          [
            "X",
            "O",
            "X"
          ],
          [
            "X",
            "O",
            "X"
          ],
          [
            "X",
            "O",
            "X"
          ]
        ]
      }
    ]
  },
  {
    "id": "senior-059",
    "level": "senior",
    "title": "Escalera de palabras",
    "prompt": "Cada paso cambia una letra y tiene que caer en wordList. Devuelve la longitud de la escalera más corta de begin a end, contando las dos. Si end no está en la lista o no hay camino, 0.\nEjemplo: \"hit\", \"cog\", [\"hot\", \"dot\", \"dog\", \"lot\", \"log\", \"cog\"] → 5.",
    "names": [
      "ladderLength"
    ],
    "starter": "function ladderLength(begin, end, wordList) {\n  \n}\n",
    "explanation": "Cada palabra es un nodo y hay arista si difieren en una letra. La anchura da el mínimo de pasos. Generar los 26 vecinos de cada posición evita comparar todas las parejas del diccionario. Se marca al encolar. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "BFS sobre las palabras a distancia de una letra",
    "javascript": "function ladderLength(begin, end, wordList) {\n  const set = new Set(wordList)\n  if (!set.has(end)) return 0\n  const queue = [[begin, 1]]\n  const seen = new Set([begin])\n  let head = 0\n  while (head < queue.length) {\n    const [word, dist] = queue[head++]\n    if (word === end) return dist\n    for (let i = 0; i < word.length; i++) {\n      for (let code = 97; code <= 122; code++) {\n        const next = word.slice(0, i) + String.fromCharCode(code) + word.slice(i + 1)\n        if (!set.has(next) || seen.has(next)) continue\n        seen.add(next)\n        queue.push([next, dist + 1])\n      }\n    }\n  }\n  return 0\n}\n",
    "typescript": "function ladderLength(begin: string, end: string, wordList: string[]): number) {\n  const set = new Set(wordList)\n  if (!set.has(end)) return 0\n  const queue = [[begin, 1]]\n  const seen = new Set([begin])\n  let head = 0\n  while (head < queue.length) {\n    const [word, dist] = queue[head++]\n    if (word === end) return dist\n    for (let i = 0; i < word.length; i++) {\n      for (let code = 97; code <= 122; code++) {\n        const next = word.slice(0, i) + String.fromCharCode(code) + word.slice(i + 1)\n        if (!set.has(next) || seen.has(next)) continue\n        seen.add(next)\n        queue.push([next, dist + 1])\n      }\n    }\n  }\n  return 0\n}\n",
    "cases": [
      {
        "args": [
          "hit",
          "cog",
          [
            "hot",
            "dot",
            "dog",
            "lot",
            "log",
            "cog"
          ]
        ],
        "expected": 5
      },
      {
        "args": [
          "hit",
          "cog",
          [
            "hot",
            "dot",
            "dog",
            "lot",
            "log"
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-060",
    "level": "senior",
    "title": "Calculadora con paréntesis",
    "prompt": "Evalúa enteros no negativos con +, -, paréntesis y espacios. No hay * ni /.\nEjemplo: \"(1+(4+5+2)-3)+(6+8)\" → 23.",
    "names": [
      "calcParen"
    ],
    "starter": "function calcParen(text) {\n  \n}\n",
    "explanation": "Dentro de un paréntesis se calcula como si fuera una expresión nueva. Al abrirlo se guarda lo acumulado fuera y el signo con el que ese paréntesis se va a sumar. Al cerrarlo, el total interior se multiplica por ese signo y se suma a lo de fuera. Es una pila de contextos, no de todos los caracteres. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una pila que guarda el total y el signo de fuera del paréntesis",
    "javascript": "function calcParen(text) {\n  const stack = []\n  let number = 0\n  let sign = 1\n  let total = 0\n  for (const ch of text) {\n    if (ch === ' ') continue\n    if (ch >= '0' && ch <= '9') number = number * 10 + Number(ch)\n    else if (ch === '+') { total += sign * number; number = 0; sign = 1 }\n    else if (ch === '-') { total += sign * number; number = 0; sign = -1 }\n    else if (ch === '(') { stack.push(total); stack.push(sign); total = 0; sign = 1; number = 0 }\n    else if (ch === \")\") {\n      total += sign * number\n      number = 0\n      total *= stack.pop()\n      total += stack.pop()\n    }\n  }\n  return total + sign * number\n}\n",
    "typescript": "function calcParen(text: string): number) {\n  const stack = []\n  let number = 0\n  let sign = 1\n  let total = 0\n  for (const ch of text) {\n    if (ch === ' ') continue\n    if (ch >= '0' && ch <= '9') number = number * 10 + Number(ch)\n    else if (ch === '+') { total += sign * number; number = 0; sign = 1 }\n    else if (ch === '-') { total += sign * number; number = 0; sign = -1 }\n    else if (ch === '(') { stack.push(total); stack.push(sign); total = 0; sign = 1; number = 0 }\n    else if (ch === \")\") {\n      total += sign * number\n      number = 0\n      total *= stack.pop()\n      total += stack.pop()\n    }\n  }\n  return total + sign * number\n}\n",
    "cases": [
      {
        "args": [
          "(1+(4+5+2)-3)+(6+8)"
        ],
        "expected": 23
      },
      {
        "args": [
          "1 + 1"
        ],
        "expected": 2
      }
    ]
  },
  {
    "id": "senior-061",
    "level": "senior",
    "title": "Decodificar patrón",
    "prompt": "k[texto] significa texto repetido k veces. Puede anidar. k es un entero positivo.\nEjemplo: \"3[a2[c]]\" → \"accaccacc\". \"3[a]2[bc]\" → \"aaabcbc\".",
    "names": [
      "decodeString"
    ],
    "starter": "function decodeString(text) {\n  \n}\n",
    "explanation": "Al ver [ se guarda el número y el texto que ya había, y se empieza un trozo nuevo. Al ver ] se repite el trozo actual y se pega al prefijo guardado. Las pilas encajan con el anidado: lo último abierto es lo primero que se cierra. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos pilas: los multiplicadores y los prefijos",
    "javascript": "function decodeString(text) {\n  const counts = []\n  const parts = []\n  let current = ''\n  let number = 0\n  for (const ch of text) {\n    if (ch >= '0' && ch <= '9') number = number * 10 + Number(ch)\n    else if (ch === '[') {\n      counts.push(number)\n      parts.push(current)\n      number = 0\n      current = ''\n    } else if (ch === ']') current = parts.pop() + current.repeat(counts.pop())\n    else current += ch\n  }\n  return current\n}\n",
    "typescript": "function decodeString(text: string): string) {\n  const counts = []\n  const parts = []\n  let current = ''\n  let number = 0\n  for (const ch of text) {\n    if (ch >= '0' && ch <= '9') number = number * 10 + Number(ch)\n    else if (ch === '[') {\n      counts.push(number)\n      parts.push(current)\n      number = 0\n      current = ''\n    } else if (ch === ']') current = parts.pop() + current.repeat(counts.pop())\n    else current += ch\n  }\n  return current\n}\n",
    "cases": [
      {
        "args": [
          "3[a2[c]]"
        ],
        "expected": "accaccacc"
      },
      {
        "args": [
          "3[a]2[bc]"
        ],
        "expected": "aaabcbc"
      }
    ]
  },
  {
    "id": "senior-062",
    "level": "senior",
    "title": "Quitar k cifras",
    "prompt": "num es un entero sin ceros a la izquierda, salvo el propio \"0\", escrito como texto. Quita k cifras para que el número resultante sea el menor posible. Sin ceros a la izquierda. Si no queda nada, \"0\".\nEjemplo: \"1432219\", 3 → \"1219\". \"10200\", 1 → \"200\".",
    "names": [
      "removeKdigits"
    ],
    "starter": "function removeKdigits(num, k) {\n  \n}\n",
    "explanation": "Mientras se pueda quitar y la cima sea mayor que la cifra nueva, se quita la cima: un dígito grande a la izquierda pesa más. Lo que sobre de k se quita por el final. Los ceros a la izquierda del texto resultante no forman parte del número. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "pila creciente y quitar ceros al final",
    "javascript": "function removeKdigits(num, k) {\n  const stack = []\n  let left = k\n  for (const ch of num) {\n    while (left > 0 && stack.length && stack[stack.length - 1] > ch) {\n      stack.pop()\n      left--\n    }\n    stack.push(ch)\n  }\n  while (left > 0) {\n    stack.pop()\n    left--\n  }\n  const out = stack.join('').replace(/^0+/, '')\n  return out || '0'\n}\n",
    "typescript": "function removeKdigits(num: string, k: number): string) {\n  const stack = []\n  let left = k\n  for (const ch of num) {\n    while (left > 0 && stack.length && stack[stack.length - 1] > ch) {\n      stack.pop()\n      left--\n    }\n    stack.push(ch)\n  }\n  while (left > 0) {\n    stack.pop()\n    left--\n  }\n  const out = stack.join('').replace(/^0+/, '')\n  return out || '0'\n}\n",
    "cases": [
      {
        "args": [
          "1432219",
          3
        ],
        "expected": "1219"
      },
      {
        "args": [
          "10200",
          1
        ],
        "expected": "200"
      },
      {
        "args": [
          "10",
          2
        ],
        "expected": "0"
      }
    ]
  },
  {
    "id": "senior-063",
    "level": "senior",
    "title": "El mayor número",
    "prompt": "Reordena los números para formar el mayor número posible y devuélvelo como texto. Sin ceros a la izquierda salvo el propio 0.\nEjemplo: [10, 2] → \"210\". [3, 30, 34, 5, 9] → \"9534330\".",
    "names": [
      "largestNumber"
    ],
    "starter": "function largestNumber(t) {\n  \n}\n",
    "explanation": "El orden numérico no sirve: 30 antes que 3 daría 303 en vez de 330. Se compara la concatenación en los dos órdenes. Si todo son ceros, el resultado es \"0\", no \"000\". El comparador tiene que ser transitivo con esta regla; con enteros positivos lo es. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ordenar comparando a+b contra b+a",
    "javascript": "function largestNumber(t) {\n  const texts = t.map(String).sort((a, b) => (a + b > b + a ? -1 : 1))\n  const out = texts.join('')\n  return out[0] === '0' ? '0' : out\n}\n",
    "typescript": "function largestNumber(t: number[]): string) {\n  const texts = t.map(String).sort((a, b) => (a + b > b + a ? -1 : 1))\n  const out = texts.join('')\n  return out[0] === '0' ? '0' : out\n}\n",
    "cases": [
      {
        "args": [
          [
            10,
            2
          ]
        ],
        "expected": "210"
      },
      {
        "args": [
          [
            3,
            30,
            34,
            5,
            9
          ]
        ],
        "expected": "9534330"
      },
      {
        "args": [
          [
            0,
            0
          ]
        ],
        "expected": "0"
      }
    ]
  },
  {
    "id": "senior-064",
    "level": "senior",
    "title": "Flotas de coches",
    "prompt": "Hay un coche en position[i] con velocidad speed[i], yendo hacia target. Un coche más rápido no puede adelantar: si alcanza al de delante, forma flota y adopta su velocidad. ¿Cuántas flotas llegan?\nEjemplo: destino 12, posiciones [10, 8, 0, 5, 3], velocidades [2, 4, 1, 1, 3] → 3.",
    "names": [
      "carFleet"
    ],
    "starter": "function carFleet(target, position, speed) {\n  \n}\n",
    "explanation": "El coche de más adelante marca el ritmo. Si el de detrás tarda menos o igual, lo alcanza y se funde en su flota. Si tarda más, abre una flota nueva. Por eso se mira de derecha a izquierda y solo cuenta un tiempo estrictamente mayor que el de la flota actual. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ordenar por posición de mayor a menor y comparar el tiempo de llegada",
    "javascript": "function carFleet(target, position, speed) {\n  const cars = position.map((pos, i) => [pos, (target - pos) / speed[i]])\n  cars.sort((a, b) => b[0] - a[0])\n  let fleets = 0\n  let time = -1\n  for (const car of cars) {\n    if (car[1] > time) {\n      fleets++\n      time = car[1]\n    }\n  }\n  return fleets\n}\n",
    "typescript": "function carFleet(target: number, position: number[], speed: number[]): number) {\n  const cars = position.map((pos, i) => [pos, (target - pos) / speed[i]])\n  cars.sort((a, b) => b[0] - a[0])\n  let fleets = 0\n  let time = -1\n  for (const car of cars) {\n    if (car[1] > time) {\n      fleets++\n      time = car[1]\n    }\n  }\n  return fleets\n}\n",
    "cases": [
      {
        "args": [
          12,
          [
            10,
            8,
            0,
            5,
            3
          ],
          [
            2,
            4,
            1,
            1,
            3
          ]
        ],
        "expected": 3
      },
      {
        "args": [
          10,
          [
            3
          ],
          [
            3
          ]
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "senior-065",
    "level": "senior",
    "title": "Planificar tareas",
    "prompt": "Entre dos tareas iguales tienen que pasar al menos n huecos. En un hueco se puede hacer otra tarea o estar idle. Devuelve el mínimo de intervalos para acabarlas.\nEjemplo: [\"A\", \"A\", \"A\", \"B\", \"B\", \"B\"], 2 → 8.",
    "names": [
      "leastInterval"
    ],
    "starter": "function leastInterval(tasks, n) {\n  \n}\n",
    "explanation": "La tarea más repetida marca el esqueleto: (frecuencia - 1) grupos de tamaño n + 1, más un sitio final por cada tarea que empata en ese máximo. Si hay tantas tareas distintas que no hace falta idle, el resultado es simplemente el número de tareas. No hace falta simular la cola. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "la frecuencia máxima y cuántas tareas la alcanzan",
    "javascript": "function leastInterval(tasks, n) {\n  const count = new Map()\n  for (const task of tasks) count.set(task, (count.get(task) ?? 0) + 1)\n  let max = 0\n  let maxCount = 0\n  for (const value of count.values()) {\n    if (value > max) {\n      max = value\n      maxCount = 1\n    } else if (value === max) maxCount++\n  }\n  const slots = (max - 1) * (n + 1) + maxCount\n  return slots > tasks.length ? slots : tasks.length\n}\n",
    "typescript": "function leastInterval(tasks: string[], n: number): number) {\n  const count = new Map()\n  for (const task of tasks) count.set(task, (count.get(task) ?? 0) + 1)\n  let max = 0\n  let maxCount = 0\n  for (const value of count.values()) {\n    if (value > max) {\n      max = value\n      maxCount = 1\n    } else if (value === max) maxCount++\n  }\n  const slots = (max - 1) * (n + 1) + maxCount\n  return slots > tasks.length ? slots : tasks.length\n}\n",
    "cases": [
      {
        "args": [
          [
            "A",
            "A",
            "A",
            "B",
            "B",
            "B"
          ],
          2
        ],
        "expected": 8
      },
      {
        "args": [
          [
            "A",
            "A",
            "A"
          ],
          0
        ],
        "expected": 3
      }
    ]
  },
  {
    "id": "senior-066",
    "level": "senior",
    "title": "Árbol binario de búsqueda válido",
    "prompt": "Un nodo es { v, l, r }. l y r son otro nodo o null. Di si es un BST: todo lo de la izquierda es menor que el nodo y todo lo de la derecha es mayor, también respecto a los ancestros. null es válido.\nEjemplo: { v: 2, l: { v: 1, l: null, r: null }, r: { v: 3, l: null, r: null } } → true.",
    "names": [
      "isValidBST"
    ],
    "starter": "function isValidBST(node) {\n  \n}\n",
    "explanation": "No basta con comparar el nodo con sus dos hijos: un 3 en el subárbol derecho de un 4 puede ser menor que el ancestro 5. Cada llamada estrecha el intervalo permitido. El hijo izquierdo hereda el valor del nodo como máximo exclusivo, y el derecho como mínimo exclusivo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "recursión con un intervalo (low, high) abierto",
    "javascript": "function isValidBST(node) {\n  function walk(current, low, high) {\n    if (current === null) return true\n    if (current.v <= low || current.v >= high) return false\n    return walk(current.l, low, current.v) && walk(current.r, current.v, high)\n  }\n  return walk(node, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)\n}\n",
    "typescript": "function isValidBST(node: { v: number, l: any, r: any } | null): boolean) {\n  function walk(current, low, high) {\n    if (current === null) return true\n    if (current.v <= low || current.v >= high) return false\n    return walk(current.l, low, current.v) && walk(current.r, current.v, high)\n  }\n  return walk(node, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)\n}\n",
    "cases": [
      {
        "args": [
          {
            "v": 2,
            "l": {
              "v": 1,
              "l": null,
              "r": null
            },
            "r": {
              "v": 3,
              "l": null,
              "r": null
            }
          }
        ],
        "expected": true
      },
      {
        "args": [
          {
            "v": 5,
            "l": {
              "v": 1,
              "l": null,
              "r": null
            },
            "r": {
              "v": 4,
              "l": {
                "v": 3,
                "l": null,
                "r": null
              },
              "r": {
                "v": 6,
                "l": null,
                "r": null
              }
            }
          }
        ],
        "expected": false
      },
      {
        "args": [
          null
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "senior-067",
    "level": "senior",
    "title": "Recorrido por niveles",
    "prompt": "Un nodo es { v, l, r }. Devuelve los valores nivel a nivel, de izquierda a derecha. null → [].\nEjemplo: raíz 2 con hijos 1 y 3 → [[2], [1, 3]].",
    "names": [
      "levelOrder"
    ],
    "starter": "function levelOrder(node) {\n  \n}\n",
    "explanation": "La cola de un nivel produce el array de valores y, a la vez, la cola del siguiente con los hijos no nulos. Separar por el tamaño de la capa evita mezclar niveles. La DFS con la profundidad también vale; la anchura coincide con el orden pedido. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "BFS por capas",
    "javascript": "function levelOrder(node) {\n  if (node === null) return []\n  const out = []\n  let level = [node]\n  while (level.length) {\n    out.push(level.map((item) => item.v))\n    const next = []\n    for (const item of level) {\n      if (item.l) next.push(item.l)\n      if (item.r) next.push(item.r)\n    }\n    level = next\n  }\n  return out\n}\n",
    "typescript": "function levelOrder(node: { v: number, l: any, r: any } | null): number[][]) {\n  if (node === null) return []\n  const out = []\n  let level = [node]\n  while (level.length) {\n    out.push(level.map((item) => item.v))\n    const next = []\n    for (const item of level) {\n      if (item.l) next.push(item.l)\n      if (item.r) next.push(item.r)\n    }\n    level = next\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          {
            "v": 2,
            "l": {
              "v": 1,
              "l": null,
              "r": null
            },
            "r": {
              "v": 3,
              "l": null,
              "r": null
            }
          }
        ],
        "expected": [
          [
            2
          ],
          [
            1,
            3
          ]
        ]
      },
      {
        "args": [
          null
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "senior-068",
    "level": "senior",
    "title": "Diámetro del árbol",
    "prompt": "Un nodo es { v, l, r }. El diámetro es el número de aristas del camino más largo entre dos nodos. null → 0.\nEjemplo: raíz 1, hijo izquierdo 2 con hijos 4 y 5, hijo derecho 3 → 3.",
    "names": [
      "diameter"
    ],
    "starter": "function diameter(node) {\n  \n}\n",
    "explanation": "El mejor camino que pasa por un nodo es la altura izquierda más la derecha. Se calcula la altura de abajo arriba y se actualiza ese máximo. No hace falta reconstruir el camino, solo su longitud. Es lineal. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "la altura de cada subárbol y un máximo global",
    "javascript": "function diameter(node) {\n  let best = 0\n  function height(current) {\n    if (current === null) return 0\n    const left = height(current.l)\n    const right = height(current.r)\n    if (left + right > best) best = left + right\n    return 1 + (left > right ? left : right)\n  }\n  height(node)\n  return best\n}\n",
    "typescript": "function diameter(node: { v: number, l: any, r: any } | null): number) {\n  let best = 0\n  function height(current) {\n    if (current === null) return 0\n    const left = height(current.l)\n    const right = height(current.r)\n    if (left + right > best) best = left + right\n    return 1 + (left > right ? left : right)\n  }\n  height(node)\n  return best\n}\n",
    "cases": [
      {
        "args": [
          {
            "v": 1,
            "l": {
              "v": 2,
              "l": {
                "v": 4,
                "l": null,
                "r": null
              },
              "r": {
                "v": 5,
                "l": null,
                "r": null
              }
            },
            "r": {
              "v": 3,
              "l": null,
              "r": null
            }
          }
        ],
        "expected": 3
      },
      {
        "args": [
          null
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-069",
    "level": "senior",
    "title": "Ancestro común",
    "prompt": "Un nodo es { v, l, r } y los valores son únicos. p y q existen en el árbol. Devuelve el valor del ancestro común más bajo. Un nodo puede ser ancestro de sí mismo.\nEjemplo: en el árbol de raíz 1, con 2 (hijos 4 y 5) y 3, lca(4, 5) es 2 y lca(4, 3) es 1.",
    "names": [
      "lca"
    ],
    "starter": "function lca(node, p, q) {\n  \n}\n",
    "explanation": "Si el nodo es null o es p o q, se devuelve. Si los dos lados encuentran algo, este nodo es el cruce. Si solo un lado encuentra, el ancestro está en ese lado, o es el propio nodo encontrado. No hace falta la lista de padres. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "recursión que sube el lado donde encontró los valores",
    "javascript": "function lca(node, p, q) {\n  if (node === null || node.v === p || node.v === q) return node ? node.v : null\n  const left = lca(node.l, p, q)\n  const right = lca(node.r, p, q)\n  if (left !== null && right !== null) return node.v\n  return left !== null ? left : right\n}\n",
    "typescript": "function lca(node: { v: number, l: any, r: any } | null, p: number, q: number): number | null) {\n  if (node === null || node.v === p || node.v === q) return node ? node.v : null\n  const left = lca(node.l, p, q)\n  const right = lca(node.r, p, q)\n  if (left !== null && right !== null) return node.v\n  return left !== null ? left : right\n}\n",
    "cases": [
      {
        "args": [
          {
            "v": 1,
            "l": {
              "v": 2,
              "l": {
                "v": 4,
                "l": null,
                "r": null
              },
              "r": {
                "v": 5,
                "l": null,
                "r": null
              }
            },
            "r": {
              "v": 3,
              "l": null,
              "r": null
            }
          },
          4,
          5
        ],
        "expected": 2
      },
      {
        "args": [
          {
            "v": 1,
            "l": {
              "v": 2,
              "l": {
                "v": 4,
                "l": null,
                "r": null
              },
              "r": {
                "v": 5,
                "l": null,
                "r": null
              }
            },
            "r": {
              "v": 3,
              "l": null,
              "r": null
            }
          },
          4,
          3
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "senior-070",
    "level": "senior",
    "title": "Construir el árbol",
    "prompt": "Los valores son únicos. preorder es raíz, izquierda, derecha. inorder es izquierda, raíz, derecha. Reconstruye el árbol como { v, l, r }.\nEjemplo: preorder [3, 9, 20, 15, 7], inorder [9, 3, 15, 20, 7].",
    "names": [
      "buildTree"
    ],
    "starter": "function buildTree(preorder, inorder) {\n  \n}\n",
    "explanation": "El primer valor pendiente del preorder es la raíz del tramo. En el inorder, lo que queda a su izquierda es el subárbol izquierdo y lo de la derecha, el derecho. Un Map de valor a índice evita buscar la raíz en cada llamada. El cursor del preorder avanza en el mismo orden en que se crean las raíces. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el preorder da la raíz y el inorder parte los subárboles",
    "javascript": "function buildTree(preorder, inorder) {\n  const index = new Map(inorder.map((value, i) => [value, i]))\n  let cursor = 0\n  function walk(left, right) {\n    if (left > right) return null\n    const value = preorder[cursor++]\n    const mid = index.get(value)\n    return { v: value, l: walk(left, mid - 1), r: walk(mid + 1, right) }\n  }\n  return walk(0, inorder.length - 1)\n}\n",
    "typescript": "function buildTree(preorder: number[], inorder: number[]): { v: number, l: any, r: any } | null) {\n  const index = new Map(inorder.map((value, i) => [value, i]))\n  let cursor = 0\n  function walk(left, right) {\n    if (left > right) return null\n    const value = preorder[cursor++]\n    const mid = index.get(value)\n    return { v: value, l: walk(left, mid - 1), r: walk(mid + 1, right) }\n  }\n  return walk(0, inorder.length - 1)\n}\n",
    "cases": [
      {
        "args": [
          [
            3,
            9,
            20,
            15,
            7
          ],
          [
            9,
            3,
            15,
            20,
            7
          ]
        ],
        "expected": {
          "v": 3,
          "l": {
            "v": 9,
            "l": null,
            "r": null
          },
          "r": {
            "v": 20,
            "l": {
              "v": 15,
              "l": null,
              "r": null
            },
            "r": {
              "v": 7,
              "l": null,
              "r": null
            }
          }
        }
      }
    ]
  },
  {
    "id": "senior-071",
    "level": "senior",
    "title": "K-ésimo del BST",
    "prompt": "El árbol es un BST con valores únicos, nodo { v, l, r }. Devuelve el k-ésimo menor. k empieza en 1.\nEjemplo: raíz 3, izquierda 1, derecha 4, k 1 → 1.",
    "names": [
      "kthSmallest"
    ],
    "starter": "function kthSmallest(node, k) {\n  \n}\n",
    "explanation": "Izquierda, nodo, derecha visita los valores de menor a mayor. Se puede parar al llegar a k. Si el árbol está equilibrado y se guardan tamaños de subárbol, se baja en log n sin listar; este recorrido es lineal en k más la altura, y es el que hay que entender primero. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "recorrido inorder, que en un BST sale ordenado",
    "javascript": "function kthSmallest(node, k) {\n  const values = []\n  function walk(current) {\n    if (current === null || values.length >= k) return\n    walk(current.l)\n    values.push(current.v)\n    walk(current.r)\n  }\n  walk(node)\n  return values[k - 1]\n}\n",
    "typescript": "function kthSmallest(node: { v: number, l: any, r: any }, k: number): number) {\n  const values = []\n  function walk(current) {\n    if (current === null || values.length >= k) return\n    walk(current.l)\n    values.push(current.v)\n    walk(current.r)\n  }\n  walk(node)\n  return values[k - 1]\n}\n",
    "cases": [
      {
        "args": [
          {
            "v": 3,
            "l": {
              "v": 1,
              "l": null,
              "r": null
            },
            "r": {
              "v": 4,
              "l": null,
              "r": null
            }
          },
          1
        ],
        "expected": 1
      },
      {
        "args": [
          {
            "v": 3,
            "l": {
              "v": 1,
              "l": null,
              "r": null
            },
            "r": {
              "v": 4,
              "l": null,
              "r": null
            }
          },
          3
        ],
        "expected": 4
      }
    ]
  },
  {
    "id": "senior-072",
    "level": "senior",
    "title": "Serializar el árbol",
    "prompt": "Serializa el árbol en preorder. null es un hueco explícito, para poder reconstruirlo.\nEjemplo: raíz 3, izquierda 1, derecha 4 → [3, 1, null, null, 4, null, null].",
    "names": [
      "serializeTree"
    ],
    "starter": "function serializeTree(node) {\n  \n}\n",
    "explanation": "Sin los null, varios árboles distintos compartirían la lista de valores. Cada null cierra una rama. El preorder pone la raíz antes que los hijos, que es el orden en el que un deserializador volvería a leer. Aquí solo se pide serializar. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "preorder con null marcado",
    "javascript": "function serializeTree(node) {\n  const out = []\n  function walk(current) {\n    if (current === null) {\n      out.push(null)\n      return\n    }\n    out.push(current.v)\n    walk(current.l)\n    walk(current.r)\n  }\n  walk(node)\n  return out\n}\n",
    "typescript": "function serializeTree(node: { v: number, l: any, r: any } | null): Array<number | null>) {\n  const out = []\n  function walk(current) {\n    if (current === null) {\n      out.push(null)\n      return\n    }\n    out.push(current.v)\n    walk(current.l)\n    walk(current.r)\n  }\n  walk(node)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          {
            "v": 3,
            "l": {
              "v": 1,
              "l": null,
              "r": null
            },
            "r": {
              "v": 4,
              "l": null,
              "r": null
            }
          }
        ],
        "expected": [
          3,
          1,
          null,
          null,
          4,
          null,
          null
        ]
      },
      {
        "args": [
          null
        ],
        "expected": [
          null
        ]
      }
    ]
  },
  {
    "id": "senior-073",
    "level": "senior",
    "title": "Caminos con obstáculos",
    "prompt": "Solo se baja o se va a la derecha. 1 es obstáculo. ¿Cuántos caminos hay de la esquina superior izquierda a la inferior derecha?\nEjemplo: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] → 2.",
    "names": [
      "uniquePathsObstacles"
    ],
    "starter": "function uniquePathsObstacles(grid) {\n  \n}\n",
    "explanation": "Los caminos a una casilla libre son la suma de los que llegan desde arriba y desde la izquierda. Un obstáculo tiene 0. Si el origen está bloqueado, no hay ninguno. Se reutiliza la misma idea que sin obstáculos, con ese cero que corta. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica sobre la cuadrícula",
    "javascript": "function uniquePathsObstacles(grid) {\n  const rows = grid.length\n  const cols = grid[0].length\n  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0))\n  if (grid[0][0] === 1) return 0\n  dp[0][0] = 1\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === 1) dp[r][c] = 0\n      else {\n        if (r > 0) dp[r][c] += dp[r - 1][c]\n        if (c > 0) dp[r][c] += dp[r][c - 1]\n      }\n    }\n  }\n  return dp[rows - 1][cols - 1]\n}\n",
    "typescript": "function uniquePathsObstacles(grid: number[][]): number) {\n  const rows = grid.length\n  const cols = grid[0].length\n  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0))\n  if (grid[0][0] === 1) return 0\n  dp[0][0] = 1\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === 1) dp[r][c] = 0\n      else {\n        if (r > 0) dp[r][c] += dp[r - 1][c]\n        if (c > 0) dp[r][c] += dp[r][c - 1]\n      }\n    }\n  }\n  return dp[rows - 1][cols - 1]\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              0,
              0,
              0
            ],
            [
              0,
              1,
              0
            ],
            [
              0,
              0,
              0
            ]
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            [
              1,
              0
            ]
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-074",
    "level": "senior",
    "title": "Camino de coste mínimo",
    "prompt": "Solo se baja o se va a la derecha. Cada casilla suma su valor. Devuelve el coste mínimo hasta la esquina inferior derecha.\nEjemplo: [[1, 3, 1], [1, 5, 1], [4, 2, 1]] → 7.",
    "names": [
      "minPathSum"
    ],
    "starter": "function minPathSum(grid) {\n  \n}\n",
    "explanation": "La primera fila solo puede venir de la izquierda, y la primera columna solo de arriba. El resto elige el mínimo de esos dos vecinos y suma su propio valor. No hay ciclos porque solo se avanza a la derecha o abajo, así que el orden de llenado es válido. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica: mínimo de llegar desde arriba o desde la izquierda",
    "javascript": "function minPathSum(grid) {\n  const rows = grid.length\n  const cols = grid[0].length\n  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0))\n  dp[0][0] = grid[0][0]\n  for (let c = 1; c < cols; c++) dp[0][c] = dp[0][c - 1] + grid[0][c]\n  for (let r = 1; r < rows; r++) dp[r][0] = dp[r - 1][0] + grid[r][0]\n  for (let r = 1; r < rows; r++) {\n    for (let c = 1; c < cols; c++) dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c]\n  }\n  return dp[rows - 1][cols - 1]\n}\n",
    "typescript": "function minPathSum(grid: number[][]): number) {\n  const rows = grid.length\n  const cols = grid[0].length\n  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0))\n  dp[0][0] = grid[0][0]\n  for (let c = 1; c < cols; c++) dp[0][c] = dp[0][c - 1] + grid[0][c]\n  for (let r = 1; r < rows; r++) dp[r][0] = dp[r - 1][0] + grid[r][0]\n  for (let r = 1; r < rows; r++) {\n    for (let c = 1; c < cols; c++) dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c]\n  }\n  return dp[rows - 1][cols - 1]\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              1,
              3,
              1
            ],
            [
              1,
              5,
              1
            ],
            [
              4,
              2,
              1
            ]
          ]
        ],
        "expected": 7
      },
      {
        "args": [
          [
            [
              5
            ]
          ]
        ],
        "expected": 5
      }
    ]
  },
  {
    "id": "senior-075",
    "level": "senior",
    "title": "Subsecuencia común",
    "prompt": "Devuelve la longitud de la subsecuencia común más larga. No tiene que ser contigua.\nEjemplo: \"abcde\", \"ace\" → 3.",
    "names": [
      "longestCommonSubsequence"
    ],
    "starter": "function longestCommonSubsequence(a, b) {\n  \n}\n",
    "explanation": "Si los caracteres finales coinciden, la respuesta crece desde la diagonal. Si no, es el máximo de ignorar un carácter de a o uno de b. No se reconstruye el texto, solo la longitud. La tabla es (n + 1) por (m + 1). En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica sobre prefijos",
    "javascript": "function longestCommonSubsequence(a, b) {\n  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))\n  for (let i = 1; i <= a.length; i++) {\n    for (let j = 1; j <= b.length; j++) {\n      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1\n      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])\n    }\n  }\n  return dp[a.length][b.length]\n}\n",
    "typescript": "function longestCommonSubsequence(a: string, b: string): number) {\n  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))\n  for (let i = 1; i <= a.length; i++) {\n    for (let j = 1; j <= b.length; j++) {\n      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1\n      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])\n    }\n  }\n  return dp[a.length][b.length]\n}\n",
    "cases": [
      {
        "args": [
          "abcde",
          "ace"
        ],
        "expected": 3
      },
      {
        "args": [
          "abc",
          "def"
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-076",
    "level": "senior",
    "title": "Cuadrado de unos",
    "prompt": "La matriz tiene \"0\" y \"1\". Devuelve el área del cuadrado de unos más grande.\nEjemplo: [[\"1\", \"0\"], [\"1\", \"1\"]] → 1.",
    "names": [
      "maximalSquare"
    ],
    "starter": "function maximalSquare(matrix) {\n  \n}\n",
    "explanation": "Si la casilla es \"1\", el lado del cuadrado que acaba ahí es 1 más el mínimo de los lados de arriba, izquierda y diagonal. Un \"0\" no sostiene ningún cuadrado. El área es el lado máximo al cuadrado. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica: el lado que termina en cada casilla",
    "javascript": "function maximalSquare(matrix) {\n  const rows = matrix.length\n  const cols = matrix[0].length\n  let best = 0\n  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0))\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (matrix[r][c] !== '1') continue\n      const up = r > 0 ? dp[r - 1][c] : 0\n      const left = c > 0 ? dp[r][c - 1] : 0\n      const diag = r > 0 && c > 0 ? dp[r - 1][c - 1] : 0\n      dp[r][c] = 1 + Math.min(up, left, diag)\n      if (dp[r][c] > best) best = dp[r][c]\n    }\n  }\n  return best * best\n}\n",
    "typescript": "function maximalSquare(matrix: string[][]): number) {\n  const rows = matrix.length\n  const cols = matrix[0].length\n  let best = 0\n  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0))\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (matrix[r][c] !== '1') continue\n      const up = r > 0 ? dp[r - 1][c] : 0\n      const left = c > 0 ? dp[r][c - 1] : 0\n      const diag = r > 0 && c > 0 ? dp[r - 1][c - 1] : 0\n      dp[r][c] = 1 + Math.min(up, left, diag)\n      if (dp[r][c] > best) best = dp[r][c]\n    }\n  }\n  return best * best\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              "1",
              "0"
            ],
            [
              "1",
              "1"
            ]
          ]
        ],
        "expected": 1
      },
      {
        "args": [
          [
            [
              "1",
              "1"
            ],
            [
              "1",
              "1"
            ]
          ]
        ],
        "expected": 4
      }
    ]
  },
  {
    "id": "senior-077",
    "level": "senior",
    "title": "Coste mínimo de subir",
    "prompt": "cost[i] es el coste de pisar el escalón i. Desde ahí se sube 1 o 2. Se puede empezar en el 0 o en el 1. El destino está justo después del último escalón y no cuesta. Devuelve el coste mínimo.\nEjemplo: [10, 15, 20] → 15. [1, 100, 1, 1, 1, 100, 1, 1, 100, 1] → 6.",
    "names": [
      "minCostClimb"
    ],
    "starter": "function minCostClimb(cost) {\n  \n}\n",
    "explanation": "Pagar el escalón i deja continuar desde ahí, así que el coste de usarlo es el escalón más el mínimo de haber llegado desde uno o dos antes. Al final se puede haber llegado al destino desde el último o desde el penúltimo, y se elige el menor. No hace falta el array entero. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "dos variables con el coste de llegar un paso atrás y dos atrás",
    "javascript": "function minCostClimb(cost) {\n  let prev = 0\n  let curr = 0\n  for (const step of cost) {\n    const next = step + (prev < curr ? prev : curr)\n    prev = curr\n    curr = next\n  }\n  return prev < curr ? prev : curr\n}\n",
    "typescript": "function minCostClimb(cost: number[]): number) {\n  let prev = 0\n  let curr = 0\n  for (const step of cost) {\n    const next = step + (prev < curr ? prev : curr)\n    prev = curr\n    curr = next\n  }\n  return prev < curr ? prev : curr\n}\n",
    "cases": [
      {
        "args": [
          [
            10,
            15,
            20
          ]
        ],
        "expected": 15
      },
      {
        "args": [
          [
            1,
            100,
            1,
            1,
            1,
            100,
            1,
            1,
            100,
            1
          ]
        ],
        "expected": 6
      }
    ]
  },
  {
    "id": "senior-078",
    "level": "senior",
    "title": "Decodificar dígitos",
    "prompt": "A es 1, B es 2, ..., Z es 26. ¿De cuántas formas se puede decodificar text? Un 0 solo no es válido. text tiene al menos un carácter.\nEjemplo: \"12\" → 2. \"226\" → 3. \"06\" → 0.",
    "names": [
      "numDecodings"
    ],
    "starter": "function numDecodings(text) {\n  \n}\n",
    "explanation": "Una cifra de 1 a 9 abre una forma a partir de las del prefijo anterior. Un par entre 10 y 26 abre otra a partir de dos posiciones atrás. El 0 solo no abre la de una cifra. Se guardan solo los dos totales anteriores. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica de uno y dos dígitos",
    "javascript": "function numDecodings(text) {\n  if (text[0] === '0') return 0\n  let prev = 1\n  let curr = 1\n  for (let i = 1; i < text.length; i++) {\n    let next = 0\n    if (text[i] !== '0') next += curr\n    const pair = Number(text.slice(i - 1, i + 1))\n    if (pair >= 10 && pair <= 26) next += prev\n    prev = curr\n    curr = next\n  }\n  return curr\n}\n",
    "typescript": "function numDecodings(text: string): number) {\n  if (text[0] === '0') return 0\n  let prev = 1\n  let curr = 1\n  for (let i = 1; i < text.length; i++) {\n    let next = 0\n    if (text[i] !== '0') next += curr\n    const pair = Number(text.slice(i - 1, i + 1))\n    if (pair >= 10 && pair <= 26) next += prev\n    prev = curr\n    curr = next\n  }\n  return curr\n}\n",
    "cases": [
      {
        "args": [
          "12"
        ],
        "expected": 2
      },
      {
        "args": [
          "226"
        ],
        "expected": 3
      },
      {
        "args": [
          "06"
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-079",
    "level": "senior",
    "title": "Robo en círculo",
    "prompt": "Las casas forman un círculo: la primera y la última son vecinas y no se pueden robar juntas. Por lo demás es el robo lineal. t tiene al menos una casa.\nEjemplo: [2, 3, 2] → 3. [1, 2, 3, 1] → 4.",
    "names": [
      "robCircular"
    ],
    "starter": "function robCircular(t) {\n  \n}\n",
    "explanation": "En un círculo, una solución óptima no roba las dos puntas a la vez. Entonces es el máximo entre el problema lineal que excluye la última y el que excluye la primera. El caso de una sola casa se aparta porque los dos rangos quedarían vacíos. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el robo lineal dos veces: sin la última casa y sin la primera",
    "javascript": "function robCircular(t) {\n  if (t.length === 1) return t[0]\n  function rob(start, end) {\n    let prev = 0\n    let curr = 0\n    for (let i = start; i <= end; i++) {\n      const next = curr > prev + t[i] ? curr : prev + t[i]\n      prev = curr\n      curr = next\n    }\n    return curr\n  }\n  const skipLast = rob(0, t.length - 2)\n  const skipFirst = rob(1, t.length - 1)\n  return skipLast > skipFirst ? skipLast : skipFirst\n}\n",
    "typescript": "function robCircular(t: number[]): number) {\n  if (t.length === 1) return t[0]\n  function rob(start, end) {\n    let prev = 0\n    let curr = 0\n    for (let i = start; i <= end; i++) {\n      const next = curr > prev + t[i] ? curr : prev + t[i]\n      prev = curr\n      curr = next\n    }\n    return curr\n  }\n  const skipLast = rob(0, t.length - 2)\n  const skipFirst = rob(1, t.length - 1)\n  return skipLast > skipFirst ? skipLast : skipFirst\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            3,
            2
          ]
        ],
        "expected": 3
      },
      {
        "args": [
          [
            1,
            2,
            3,
            1
          ]
        ],
        "expected": 4
      },
      {
        "args": [
          [
            5
          ]
        ],
        "expected": 5
      }
    ]
  },
  {
    "id": "senior-080",
    "level": "senior",
    "title": "Partir en dos sumas iguales",
    "prompt": "Di si t se puede partir en dos grupos con la misma suma. Los números son positivos.\nEjemplo: [1, 5, 11, 5] → true. [1, 2, 3, 5] → false.",
    "names": [
      "canPartition"
    ],
    "starter": "function canPartition(t) {\n  \n}\n",
    "explanation": "Si la suma total es impar, es imposible. Si es par, hay que saber si un subconjunto suma exactamente la mitad. Es la mochila 0/1 con valor booleano: ok[s] dice si alguna selección suma s. El recorrido hacia atrás evita reutilizar el mismo número. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "mochila booleana hacia la mitad de la suma",
    "javascript": "function canPartition(t) {\n  let total = 0\n  for (const n of t) total += n\n  if (total % 2 !== 0) return false\n  const target = total / 2\n  const ok = new Array(target + 1).fill(false)\n  ok[0] = true\n  for (const n of t) {\n    for (let sum = target; sum >= n; sum--) if (ok[sum - n]) ok[sum] = true\n  }\n  return ok[target]\n}\n",
    "typescript": "function canPartition(t: number[]): boolean) {\n  let total = 0\n  for (const n of t) total += n\n  if (total % 2 !== 0) return false\n  const target = total / 2\n  const ok = new Array(target + 1).fill(false)\n  ok[0] = true\n  for (const n of t) {\n    for (let sum = target; sum >= n; sum--) if (ok[sum - n]) ok[sum] = true\n  }\n  return ok[target]\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            5,
            11,
            5
          ]
        ],
        "expected": true
      },
      {
        "args": [
          [
            1,
            2,
            3,
            5
          ]
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "senior-081",
    "level": "senior",
    "title": "Patrón con punto y asterisco",
    "prompt": "El patrón usa letras, \".\" (un carácter) y \"*\" (cero o más del carácter anterior). El patrón es válido. Di si encaja con todo text.\nEjemplo: \"aa\", \"a*\" → true. \"ab\", \".*\" → true. \"aa\", \"a\" → false.",
    "names": [
      "regexIsMatch"
    ],
    "starter": "function regexIsMatch(text, pattern) {\n  \n}\n",
    "explanation": "dp[i][j] dice si los primeros i del texto encajan con los primeros j del patrón. Un * puede significar cero veces el carácter anterior, que es dp de dos columnas atrás, o una vez más si el carácter coincide, que es la fila anterior en la misma columna. Sin el caso de cero veces, \"a*\" no encajaría con el texto vacío. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "programación dinámica sobre texto y patrón",
    "javascript": "function regexIsMatch(text, pattern) {\n  const dp = Array.from({ length: text.length + 1 }, () => new Array(pattern.length + 1).fill(false))\n  dp[0][0] = true\n  for (let j = 2; j <= pattern.length; j++) {\n    if (pattern[j - 1] === '*') dp[0][j] = dp[0][j - 2]\n  }\n  for (let i = 1; i <= text.length; i++) {\n    for (let j = 1; j <= pattern.length; j++) {\n      if (pattern[j - 1] === '*') {\n        dp[i][j] = dp[i][j - 2]\n        const prev = pattern[j - 2]\n        if (prev === '.' || prev === text[i - 1]) dp[i][j] = dp[i][j] || dp[i - 1][j]\n      } else if (pattern[j - 1] === '.' || pattern[j - 1] === text[i - 1]) dp[i][j] = dp[i - 1][j - 1]\n    }\n  }\n  return dp[text.length][pattern.length]\n}\n",
    "typescript": "function regexIsMatch(text: string, pattern: string): boolean) {\n  const dp = Array.from({ length: text.length + 1 }, () => new Array(pattern.length + 1).fill(false))\n  dp[0][0] = true\n  for (let j = 2; j <= pattern.length; j++) {\n    if (pattern[j - 1] === '*') dp[0][j] = dp[0][j - 2]\n  }\n  for (let i = 1; i <= text.length; i++) {\n    for (let j = 1; j <= pattern.length; j++) {\n      if (pattern[j - 1] === '*') {\n        dp[i][j] = dp[i][j - 2]\n        const prev = pattern[j - 2]\n        if (prev === '.' || prev === text[i - 1]) dp[i][j] = dp[i][j] || dp[i - 1][j]\n      } else if (pattern[j - 1] === '.' || pattern[j - 1] === text[i - 1]) dp[i][j] = dp[i - 1][j - 1]\n    }\n  }\n  return dp[text.length][pattern.length]\n}\n",
    "cases": [
      {
        "args": [
          "aa",
          "a*"
        ],
        "expected": true
      },
      {
        "args": [
          "ab",
          ".*"
        ],
        "expected": true
      },
      {
        "args": [
          "aa",
          "a"
        ],
        "expected": false
      },
      {
        "args": [
          "",
          "a*"
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "senior-082",
    "level": "senior",
    "title": "Insertar intervalo",
    "prompt": "intervals está ordenado y sin solapes. Inserta next y fusiona lo que haga falta. Los intervalos son [inicio, fin] cerrados.\nEjemplo: [[1, 3], [6, 9]], [2, 5] → [[1, 5], [6, 9]].",
    "names": [
      "insertInterval"
    ],
    "starter": "function insertInterval(intervals, next) {\n  \n}\n",
    "explanation": "Lo que acaba antes de next se copia. Lo que empieza después se copia cuando next ya se ha colocado. Lo que solapa ensancha start y end. Al final, si next no se ha emitido, se añade. Es lineal porque la lista ya venía ordenada. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un recorrido en tres tramos: antes, solape y después",
    "javascript": "function insertInterval(intervals, next) {\n  const out = []\n  let start = next[0]\n  let end = next[1]\n  let placed = false\n  for (const interval of intervals) {\n    if (interval[1] < start) out.push(interval.slice())\n    else if (interval[0] > end) {\n      if (!placed) {\n        out.push([start, end])\n        placed = true\n      }\n      out.push(interval.slice())\n    } else {\n      if (interval[0] < start) start = interval[0]\n      if (interval[1] > end) end = interval[1]\n    }\n  }\n  if (!placed) out.push([start, end])\n  return out\n}\n",
    "typescript": "function insertInterval(intervals: number[][], next: number[]): number[][]) {\n  const out = []\n  let start = next[0]\n  let end = next[1]\n  let placed = false\n  for (const interval of intervals) {\n    if (interval[1] < start) out.push(interval.slice())\n    else if (interval[0] > end) {\n      if (!placed) {\n        out.push([start, end])\n        placed = true\n      }\n      out.push(interval.slice())\n    } else {\n      if (interval[0] < start) start = interval[0]\n      if (interval[1] > end) end = interval[1]\n    }\n  }\n  if (!placed) out.push([start, end])\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              1,
              3
            ],
            [
              6,
              9
            ]
          ],
          [
            2,
            5
          ]
        ],
        "expected": [
          [
            1,
            5
          ],
          [
            6,
            9
          ]
        ]
      },
      {
        "args": [
          [],
          [
            2,
            5
          ]
        ],
        "expected": [
          [
            2,
            5
          ]
        ]
      }
    ]
  },
  {
    "id": "senior-083",
    "level": "senior",
    "title": "Quitar solapes",
    "prompt": "Devuelve el mínimo de intervalos que hay que quitar para que no queden solapes. [inicio, fin) : tocar en el fin no es solape.\nEjemplo: [[1, 2], [2, 3], [3, 4], [1, 3]] → 1.",
    "names": [
      "eraseOverlapCount"
    ],
    "starter": "function eraseOverlapCount(intervals) {\n  \n}\n",
    "explanation": "Quitar el mínimo es quedarse con el máximo de intervalos compatibles, que es el problema de ordenar por el fin. La respuesta es la longitud menos los que se pudieron conservar. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el máximo de compatibles, restado del total",
    "javascript": "function eraseOverlapCount(intervals) {\n  const sorted = intervals.slice().sort((a, b) => a[1] - b[1])\n  let end = -1e15\n  let kept = 0\n  for (const interval of sorted) {\n    if (interval[0] >= end) {\n      kept++\n      end = interval[1]\n    }\n  }\n  return intervals.length - kept\n}\n",
    "typescript": "function eraseOverlapCount(intervals: number[][]): number) {\n  const sorted = intervals.slice().sort((a, b) => a[1] - b[1])\n  let end = -1e15\n  let kept = 0\n  for (const interval of sorted) {\n    if (interval[0] >= end) {\n      kept++\n      end = interval[1]\n    }\n  }\n  return intervals.length - kept\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              1,
              2
            ],
            [
              2,
              3
            ],
            [
              3,
              4
            ],
            [
              1,
              3
            ]
          ]
        ],
        "expected": 1
      },
      {
        "args": [
          [
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-084",
    "level": "senior",
    "title": "Flechas a los globos",
    "prompt": "Cada globo es [inicio, fin], cerrado. Una flecha en la posición x revienta los globos con inicio <= x <= fin. ¿Cuántas flechas hacen falta como mínimo?\nEjemplo: [[10, 16], [2, 8], [1, 6], [7, 12]] → 2.",
    "names": [
      "findMinArrow"
    ],
    "starter": "function findMinArrow(points) {\n  \n}\n",
    "explanation": "Ordenados por el fin, la primera flecha se dispara en el fin del primero: revienta a todos los que lo cubren y deja vivos a los que empiezan después. Cada globo que empieza después de la última flecha necesita otra. Es el mismo avaro que los intervalos, con la desigualdad estricta porque el extremo está incluido. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ordenar por el fin y disparar en ese fin",
    "javascript": "function findMinArrow(points) {\n  const sorted = points.slice().sort((a, b) => a[1] - b[1])\n  let arrows = 0\n  let end = -1e15\n  for (const point of sorted) {\n    if (point[0] > end) {\n      arrows++\n      end = point[1]\n    }\n  }\n  return arrows\n}\n",
    "typescript": "function findMinArrow(points: number[][]): number) {\n  const sorted = points.slice().sort((a, b) => a[1] - b[1])\n  let arrows = 0\n  let end = -1e15\n  for (const point of sorted) {\n    if (point[0] > end) {\n      arrows++\n      end = point[1]\n    }\n  }\n  return arrows\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              10,
              16
            ],
            [
              2,
              8
            ],
            [
              1,
              6
            ],
            [
              7,
              12
            ]
          ]
        ],
        "expected": 2
      },
      {
        "args": [
          [
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ]
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "senior-085",
    "level": "senior",
    "title": "Partir en etiquetas",
    "prompt": "Parte text en el mayor número de trozos tal que cada letra aparezca en un solo trozo. Devuelve las longitudes.\nEjemplo: \"ababcbacadefegdehijhklij\" → [9, 7, 8].",
    "names": [
      "partitionLabels"
    ],
    "starter": "function partitionLabels(text) {\n  \n}\n",
    "explanation": "Un trozo no puede cerrarse antes del último índice de ninguna letra que ya haya entrado. Se guarda ese último índice y se avanza el fin del trozo. Cuando el índice actual alcanza el fin, la letra no vuelve a salir y el trozo se cierra. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el último índice de cada letra y un fin de trozo que se va alargando",
    "javascript": "function partitionLabels(text) {\n  const last = new Map()\n  for (let i = 0; i < text.length; i++) last.set(text[i], i)\n  const out = []\n  let start = 0\n  let end = 0\n  for (let i = 0; i < text.length; i++) {\n    if (last.get(text[i]) > end) end = last.get(text[i])\n    if (i === end) {\n      out.push(end - start + 1)\n      start = i + 1\n    }\n  }\n  return out\n}\n",
    "typescript": "function partitionLabels(text: string): number[]) {\n  const last = new Map()\n  for (let i = 0; i < text.length; i++) last.set(text[i], i)\n  const out = []\n  let start = 0\n  let end = 0\n  for (let i = 0; i < text.length; i++) {\n    if (last.get(text[i]) > end) end = last.get(text[i])\n    if (i === end) {\n      out.push(end - start + 1)\n      start = i + 1\n    }\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          "ababcbacadefegdehijhklij"
        ],
        "expected": [
          9,
          7,
          8
        ]
      },
      {
        "args": [
          "abc"
        ],
        "expected": [
          1,
          1,
          1
        ]
      }
    ]
  },
  {
    "id": "senior-086",
    "level": "senior",
    "title": "Reorganizar sin vecinos iguales",
    "prompt": "Reorganiza text para que dos caracteres iguales no queden vecinos. Si es imposible, \"\". Cualquier organización válida vale; esta solución rellena primero las posiciones pares.\nEjemplo: \"aab\" → \"aba\". \"aaab\" → \"\".",
    "names": [
      "reorganizeString"
    ],
    "starter": "function reorganizeString(text) {\n  \n}\n",
    "explanation": "Si una letra aparece más de la mitad redondeada hacia arriba, es imposible: no hay huecos para separarla. Si cabe, se colocan las letras de más frecuente a menos frecuente en las posiciones pares y luego en las impares. Así las copias de la más frecuente no se tocan. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "el conteo, un límite de frecuencia y un relleno en dos pasadas",
    "javascript": "function reorganizeString(text) {\n  const count = new Map()\n  for (const ch of text) count.set(ch, (count.get(ch) ?? 0) + 1)\n  const letters = [...count.entries()].sort((a, b) => b[1] - a[1])\n  if (letters[0][1] > Math.floor((text.length + 1) / 2)) return \"\"\n  const out = new Array(text.length)\n  let index = 0\n  for (const [ch, times] of letters) {\n    for (let i = 0; i < times; i++) {\n      out[index] = ch\n      index += 2\n      if (index >= text.length) index = 1\n    }\n  }\n  return out.join('')\n}\n",
    "typescript": "function reorganizeString(text: string): string) {\n  const count = new Map()\n  for (const ch of text) count.set(ch, (count.get(ch) ?? 0) + 1)\n  const letters = [...count.entries()].sort((a, b) => b[1] - a[1])\n  if (letters[0][1] > Math.floor((text.length + 1) / 2)) return \"\"\n  const out = new Array(text.length)\n  let index = 0\n  for (const [ch, times] of letters) {\n    for (let i = 0; i < times; i++) {\n      out[index] = ch\n      index += 2\n      if (index >= text.length) index = 1\n    }\n  }\n  return out.join('')\n}\n",
    "cases": [
      {
        "args": [
          "aab"
        ],
        "expected": "aba"
      },
      {
        "args": [
          "aaab"
        ],
        "expected": ""
      }
    ]
  },
  {
    "id": "senior-087",
    "level": "senior",
    "title": "Orden personalizado",
    "prompt": "Ordena los caracteres de text según la primera aparición en order. Los que no están van al final, entre ellos por código de carácter. order no repite letras.\nEjemplo: \"cba\", \"abcd\" → \"cbad\".",
    "names": [
      "customSortString"
    ],
    "starter": "function customSortString(order, text) {\n  \n}\n",
    "explanation": "order define la prioridad. Una letra ausente recibe un rango alto para ir al final, y el código del carácter desempata esas. sort es estable en la práctica con este comparador total. Un conteo y un recorrido de order también valen y son lineales en el alfabeto. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un Map de rangos y sort",
    "javascript": "function customSortString(order, text) {\n  const rank = new Map()\n  for (let i = 0; i < order.length; i++) rank.set(order[i], i)\n  return text.split('').sort((a, b) => (rank.get(a) ?? 1000) - (rank.get(b) ?? 1000) || a.charCodeAt(0) - b.charCodeAt(0)).join('')\n}\n",
    "typescript": "function customSortString(order: string, text: string): string) {\n  const rank = new Map()\n  for (let i = 0; i < order.length; i++) rank.set(order[i], i)\n  return text.split('').sort((a, b) => (rank.get(a) ?? 1000) - (rank.get(b) ?? 1000) || a.charCodeAt(0) - b.charCodeAt(0)).join('')\n}\n",
    "cases": [
      {
        "args": [
          "cba",
          "abcd"
        ],
        "expected": "cbad"
      },
      {
        "args": [
          "",
          "ba"
        ],
        "expected": "ab"
      }
    ]
  },
  {
    "id": "senior-088",
    "level": "senior",
    "title": "Sumar a un objetivo con signos",
    "prompt": "A cada número se le pone + o -. ¿De cuántas formas la expresión suma target?\nEjemplo: [1, 1, 1, 1, 1], 3 → 5.",
    "names": [
      "findTargetSum"
    ],
    "starter": "function findTargetSum(t, target) {\n  \n}\n",
    "explanation": "Después de cada número, cada suma conocida se bifurca en más n y menos n. El Map acumula las formas. Es el problema de la mochila de signos, exponencial en el peor caso si las sumas no se repiten, y mucho mejor cuando coinciden. Probar los 2^n signos a mano solo cabe con n pequeño; aquí n de los ejemplos es 5, pero el Map escala mejor. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un Map de sumas alcanzadas y de cuántas formas",
    "javascript": "function findTargetSum(t, target) {\n  let ways = new Map([[0, 1]])\n  for (const n of t) {\n    const next = new Map()\n    for (const [sum, count] of ways) {\n      next.set(sum + n, (next.get(sum + n) ?? 0) + count)\n      next.set(sum - n, (next.get(sum - n) ?? 0) + count)\n    }\n    ways = next\n  }\n  return ways.get(target) ?? 0\n}\n",
    "typescript": "function findTargetSum(t: number[], target: number): number) {\n  let ways = new Map([[0, 1]])\n  for (const n of t) {\n    const next = new Map()\n    for (const [sum, count] of ways) {\n      next.set(sum + n, (next.get(sum + n) ?? 0) + count)\n      next.set(sum - n, (next.get(sum - n) ?? 0) + count)\n    }\n    ways = next\n  }\n  return ways.get(target) ?? 0\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            1,
            1,
            1,
            1
          ],
          3
        ],
        "expected": 5
      },
      {
        "args": [
          [
            1
          ],
          2
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-089",
    "level": "senior",
    "title": "Zigzag",
    "prompt": "Escribe text en zigzag de rows filas y léelo por filas. Si rows es 1, el texto no cambia.\nEjemplo: \"PAYPALISHIRING\", 3 → \"PAHNAPLSIIGYIR\".",
    "names": [
      "zigzag"
    ],
    "starter": "function zigzag(text, rows) {\n  \n}\n",
    "explanation": "Se baja fila a fila y, al tocar el borde, la dirección cambia. Cada carácter se concatena a su fila. Unir las filas da la lectura. Con una sola fila no hay rebote y el resultado es el original. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una dirección que rebota en los extremos",
    "javascript": "function zigzag(text, rows) {\n  if (rows === 1 || rows >= text.length) return text\n  const lines = Array.from({ length: rows }, () => '')\n  let row = 0\n  let dir = 1\n  for (const ch of text) {\n    lines[row] += ch\n    if (row === 0) dir = 1\n    else if (row === rows - 1) dir = -1\n    row += dir\n  }\n  return lines.join('')\n}\n",
    "typescript": "function zigzag(text: string, rows: number): string) {\n  if (rows === 1 || rows >= text.length) return text\n  const lines = Array.from({ length: rows }, () => '')\n  let row = 0\n  let dir = 1\n  for (const ch of text) {\n    lines[row] += ch\n    if (row === 0) dir = 1\n    else if (row === rows - 1) dir = -1\n    row += dir\n  }\n  return lines.join('')\n}\n",
    "cases": [
      {
        "args": [
          "PAYPALISHIRING",
          3
        ],
        "expected": "PAHNAPLSIIGYIR"
      },
      {
        "args": [
          "AB",
          1
        ],
        "expected": "AB"
      }
    ]
  },
  {
    "id": "senior-090",
    "level": "senior",
    "title": "Espiral",
    "prompt": "Recorre la matriz en espiral, en el sentido de las agujas del reloj.\nEjemplo: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] → [1, 2, 3, 6, 9, 8, 7, 4, 5].",
    "names": [
      "spiralOrder"
    ],
    "starter": "function spiralOrder(matrix) {\n  \n}\n",
    "explanation": "Se recorre la fila de arriba de izquierda a derecha, la columna derecha de arriba abajo, la fila de abajo de derecha a izquierda y la columna izquierda de abajo arriba. Después los bordes se acercan. Hay que comprobar que la fila o la columna todavía existen antes del tramo de vuelta, para no repetir el centro. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "cuatro bordes que se encogen",
    "javascript": "function spiralOrder(matrix) {\n  const out = []\n  let top = 0\n  let bottom = matrix.length - 1\n  let left = 0\n  let right = matrix[0].length - 1\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) out.push(matrix[top][c])\n    top++\n    for (let r = top; r <= bottom; r++) out.push(matrix[r][right])\n    right--\n    if (top <= bottom) {\n      for (let c = right; c >= left; c--) out.push(matrix[bottom][c])\n      bottom--\n    }\n    if (left <= right) {\n      for (let r = bottom; r >= top; r--) out.push(matrix[r][left])\n      left++\n    }\n  }\n  return out\n}\n",
    "typescript": "function spiralOrder(matrix: number[][]): number[]) {\n  const out = []\n  let top = 0\n  let bottom = matrix.length - 1\n  let left = 0\n  let right = matrix[0].length - 1\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) out.push(matrix[top][c])\n    top++\n    for (let r = top; r <= bottom; r++) out.push(matrix[r][right])\n    right--\n    if (top <= bottom) {\n      for (let c = right; c >= left; c--) out.push(matrix[bottom][c])\n      bottom--\n    }\n    if (left <= right) {\n      for (let r = bottom; r >= top; r--) out.push(matrix[r][left])\n      left++\n    }\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              1,
              2,
              3
            ],
            [
              4,
              5,
              6
            ],
            [
              7,
              8,
              9
            ]
          ]
        ],
        "expected": [
          1,
          2,
          3,
          6,
          9,
          8,
          7,
          4,
          5
        ]
      },
      {
        "args": [
          [
            [
              1,
              2,
              3
            ]
          ]
        ],
        "expected": [
          1,
          2,
          3
        ]
      }
    ]
  },
  {
    "id": "senior-091",
    "level": "senior",
    "title": "Mapa con tiempo",
    "prompt": "\"set\" guarda clave, valor y timestamp. Los timestamp de cada clave llegan en orden creciente. \"get\" devuelve el valor de esa clave con el mayor timestamp menor o igual que el pedido, o \"\" si no hay. Devuelve solo los get.\nEjemplo: set foo bar 1, set foo bar2 4, get foo 4, get foo 3 → [\"bar2\", \"bar\"].",
    "names": [
      "runTimeMap"
    ],
    "starter": "function runTimeMap(operations) {\n  \n}\n",
    "explanation": "Como los timestamp llegan ordenados, se pueden añadir al final de la lista de la clave. get recorre hasta pasar el tiempo pedido y se queda con el último que cabía. Con muchas lecturas, una búsqueda binaria sobre la lista baja cada get a log n. La lista ordenada es lo que lo permite; un Map de timestamp sueltos no daría el anterior. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "un Map de listas ordenadas por tiempo y una búsqueda lineal",
    "javascript": "function runTimeMap(operations) {\n  const store = new Map()\n  const out = []\n  for (const op of operations) {\n    if (op[0] === 'set') {\n      const list = store.get(op[1]) ?? []\n      list.push([op[3], op[2]])\n      store.set(op[1], list)\n    } else {\n      const list = store.get(op[1]) ?? []\n      let value = ''\n      for (const [time, stored] of list) {\n        if (time <= op[2]) value = stored\n        else break\n      }\n      out.push(value)\n    }\n  }\n  return out\n}\n",
    "typescript": "function runTimeMap(operations: Array<[\"set\", string, string, number] | [\"get\", string, number]>): string[]) {\n  const store = new Map()\n  const out = []\n  for (const op of operations) {\n    if (op[0] === 'set') {\n      const list = store.get(op[1]) ?? []\n      list.push([op[3], op[2]])\n      store.set(op[1], list)\n    } else {\n      const list = store.get(op[1]) ?? []\n      let value = ''\n      for (const [time, stored] of list) {\n        if (time <= op[2]) value = stored\n        else break\n      }\n      out.push(value)\n    }\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              "set",
              "foo",
              "bar",
              1
            ],
            [
              "set",
              "foo",
              "bar2",
              4
            ],
            [
              "get",
              "foo",
              4
            ],
            [
              "get",
              "foo",
              3
            ],
            [
              "get",
              "foo",
              0
            ]
          ]
        ],
        "expected": [
          "bar2",
          "bar",
          ""
        ]
      }
    ]
  },
  {
    "id": "senior-092",
    "level": "senior",
    "title": "Área máxima de isla",
    "prompt": "1 es tierra y 0 es agua. Las islas se unen en cruz. Devuelve el área de la isla más grande, o 0 si no hay tierra.\nEjemplo: [[0, 1], [1, 1]] → 3.",
    "names": [
      "maxAreaOfIsland"
    ],
    "starter": "function maxAreaOfIsland(grid) {\n  \n}\n",
    "explanation": "Es numIslands, pero cada recorrido suma casillas en vez de contar islas. El máximo de esas sumas es el área. Marcar al entrar evita contar dos veces la misma tierra. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "DFS que devuelve el tamaño y marca lo visitado",
    "javascript": "function maxAreaOfIsland(grid) {\n  const rows = grid.length\n  const cols = grid[0].length\n  const seen = grid.map((row) => row.map(() => false))\n  function area(r, c) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || seen[r][c] || grid[r][c] !== 1) return 0\n    seen[r][c] = true\n    return 1 + area(r + 1, c) + area(r - 1, c) + area(r, c + 1) + area(r, c - 1)\n  }\n  let best = 0\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      const next = area(r, c)\n      if (next > best) best = next\n    }\n  }\n  return best\n}\n",
    "typescript": "function maxAreaOfIsland(grid: number[][]): number) {\n  const rows = grid.length\n  const cols = grid[0].length\n  const seen = grid.map((row) => row.map(() => false))\n  function area(r, c) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || seen[r][c] || grid[r][c] !== 1) return 0\n    seen[r][c] = true\n    return 1 + area(r + 1, c) + area(r - 1, c) + area(r, c + 1) + area(r, c - 1)\n  }\n  let best = 0\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      const next = area(r, c)\n      if (next > best) best = next\n    }\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              0,
              1
            ],
            [
              1,
              1
            ]
          ]
        ],
        "expected": 3
      },
      {
        "args": [
          [
            [
              0,
              0
            ]
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-093",
    "level": "senior",
    "title": "Retardo de la red",
    "prompt": "Hay n nodos, del 1 a n. edges son [desde, hasta, peso] dirigidos y positivos. Devuelve el tiempo mínimo para que la señal desde start llegue a todos, o -1 si alguno no es alcanzable.\nEjemplo: 4, [[2, 1, 1], [2, 3, 1], [3, 4, 1]], 2 → 2.",
    "names": [
      "networkDelay"
    ],
    "starter": "function networkDelay(n, edges, start) {\n  \n}\n",
    "explanation": "El tiempo para avisar a todos es la distancia del nodo más lejano, no la suma. Si alguno queda a null, la red no está cubierta y la respuesta es -1. Los nodos van de 1 a n, así que el array tiene un hueco en el índice 0. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "Dijkstra y el máximo de las distancias",
    "javascript": "function networkDelay(n, edges, start) {\n  const next = Array.from({ length: n + 1 }, () => [])\n  for (const [from, to, weight] of edges) next[from].push([to, weight])\n  const dist = new Array(n + 1).fill(null)\n  dist[start] = 0\n  const used = new Array(n + 1).fill(false)\n  for (let step = 0; step < n; step++) {\n    let node = -1\n    for (let i = 1; i <= n; i++) {\n      if (!used[i] && dist[i] !== null && (node === -1 || dist[i] < dist[node])) node = i\n    }\n    if (node === -1) break\n    used[node] = true\n    for (const [to, weight] of next[node]) {\n      const nextDist = dist[node] + weight\n      if (dist[to] === null || nextDist < dist[to]) dist[to] = nextDist\n    }\n  }\n  let max = 0\n  for (let i = 1; i <= n; i++) {\n    if (dist[i] === null) return -1\n    if (dist[i] > max) max = dist[i]\n  }\n  return max\n}\n",
    "typescript": "function networkDelay(n: number, edges: number[][], start: number): number) {\n  const next = Array.from({ length: n + 1 }, () => [])\n  for (const [from, to, weight] of edges) next[from].push([to, weight])\n  const dist = new Array(n + 1).fill(null)\n  dist[start] = 0\n  const used = new Array(n + 1).fill(false)\n  for (let step = 0; step < n; step++) {\n    let node = -1\n    for (let i = 1; i <= n; i++) {\n      if (!used[i] && dist[i] !== null && (node === -1 || dist[i] < dist[node])) node = i\n    }\n    if (node === -1) break\n    used[node] = true\n    for (const [to, weight] of next[node]) {\n      const nextDist = dist[node] + weight\n      if (dist[to] === null || nextDist < dist[to]) dist[to] = nextDist\n    }\n  }\n  let max = 0\n  for (let i = 1; i <= n; i++) {\n    if (dist[i] === null) return -1\n    if (dist[i] > max) max = dist[i]\n  }\n  return max\n}\n",
    "cases": [
      {
        "args": [
          4,
          [
            [
              2,
              1,
              1
            ],
            [
              2,
              3,
              1
            ],
            [
              3,
              4,
              1
            ]
          ],
          2
        ],
        "expected": 2
      },
      {
        "args": [
          2,
          [
            [
              1,
              2,
              1
            ]
          ],
          2
        ],
        "expected": -1
      }
    ]
  },
  {
    "id": "senior-094",
    "level": "senior",
    "title": "Ventana mínima",
    "prompt": "Devuelve el substring más corto de text que contiene todas las letras de needle, con sus repeticiones. Si hay varios de esa longitud, el que empieza antes. Si no hay, \"\".\nEjemplo: \"ADOBECODEBANC\", \"ABC\" → \"BANC\".",
    "names": [
      "minWindow"
    ],
    "starter": "function minWindow(text, needle) {\n  \n}\n",
    "explanation": "Se amplía por la derecha hasta cubrir la aguja. Entonces se encoge por la izquierda mientras siga cubierta, y se guarda la ventana si es más corta. need cuenta cuántas letras siguen faltando, no solo si la letra existe. Es lineal. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "ventana deslizante y un contador de letras que faltan",
    "javascript": "function minWindow(text, needle) {\n  if (!needle) return \"\"\n  const need = new Map()\n  for (const ch of needle) need.set(ch, (need.get(ch) ?? 0) + 1)\n  let missing = needle.length\n  let best = \"\"\n  let start = 0\n  for (let i = 0; i < text.length; i++) {\n    if ((need.get(text[i]) ?? 0) > 0) missing--\n    need.set(text[i], (need.get(text[i]) ?? 0) - 1)\n    while (missing === 0) {\n      const size = i - start + 1\n      if (!best || size < best.length) best = text.slice(start, i + 1)\n      need.set(text[start], need.get(text[start]) + 1)\n      if (need.get(text[start]) > 0) missing++\n      start++\n    }\n  }\n  return best\n}\n",
    "typescript": "function minWindow(text: string, needle: string): string) {\n  if (!needle) return \"\"\n  const need = new Map()\n  for (const ch of needle) need.set(ch, (need.get(ch) ?? 0) + 1)\n  let missing = needle.length\n  let best = \"\"\n  let start = 0\n  for (let i = 0; i < text.length; i++) {\n    if ((need.get(text[i]) ?? 0) > 0) missing--\n    need.set(text[i], (need.get(text[i]) ?? 0) - 1)\n    while (missing === 0) {\n      const size = i - start + 1\n      if (!best || size < best.length) best = text.slice(start, i + 1)\n      need.set(text[start], need.get(text[start]) + 1)\n      if (need.get(text[start]) > 0) missing++\n      start++\n    }\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          "ADOBECODEBANC",
          "ABC"
        ],
        "expected": "BANC"
      },
      {
        "args": [
          "a",
          "aa"
        ],
        "expected": ""
      }
    ]
  },
  {
    "id": "senior-095",
    "level": "senior",
    "title": "Paréntesis válidos más largos",
    "prompt": "Devuelve la longitud del substring más largo de paréntesis válidos. Solo hay ( y ).\nEjemplo: \"(()\" → 2. \")()())\" → 4.",
    "names": [
      "longestValidParentheses"
    ],
    "starter": "function longestValidParentheses(text) {\n  \n}\n",
    "explanation": "La pila guarda índices, no solo paréntesis. El -1 es el borde anterior a un trozo válido. Un cierre con la pila vacía después de desapilar reinicia el borde. Un cierre con algo debajo mide i - cima. Esa longitud es un bloque válido contiguo. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "una pila de índices, con un centinela -1",
    "javascript": "function longestValidParentheses(text) {\n  const stack = [-1]\n  let best = 0\n  for (let i = 0; i < text.length; i++) {\n    if (text[i] === '(') stack.push(i)\n    else {\n      stack.pop()\n      if (stack.length === 0) stack.push(i)\n      else {\n        const size = i - stack[stack.length - 1]\n        if (size > best) best = size\n      }\n    }\n  }\n  return best\n}\n",
    "typescript": "function longestValidParentheses(text: string): number) {\n  const stack = [-1]\n  let best = 0\n  for (let i = 0; i < text.length; i++) {\n    if (text[i] === '(') stack.push(i)\n    else {\n      stack.pop()\n      if (stack.length === 0) stack.push(i)\n      else {\n        const size = i - stack[stack.length - 1]\n        if (size > best) best = size\n      }\n    }\n  }\n  return best\n}\n",
    "cases": [
      {
        "args": [
          "(()"
        ],
        "expected": 2
      },
      {
        "args": [
          ")()())"
        ],
        "expected": 4
      },
      {
        "args": [
          ""
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "senior-096",
    "level": "senior",
    "title": "Suma de combinaciones",
    "prompt": "candidates no tiene repetidos y son positivos. Devuelve las combinaciones que suman target. Se puede reutilizar un número. Dentro de cada combinación van en orden no decreciente. Las combinaciones salen en el orden del backtracking que prueba los candidatos de menor a mayor.\nEjemplo: [2, 3, 6, 7], 7 → [[2, 2, 3], [7]].",
    "names": [
      "combinationSum"
    ],
    "starter": "function combinationSum(candidates, target) {\n  \n}\n",
    "explanation": "Cada llamada puede volver a usar el candidato actual, por eso el siguiente start es i y no i + 1. No puede usar uno anterior, y eso evita contar 2,2,3 y 2,3,2 como dos soluciones. Se ordena al principio para que el orden de salida quede fijado. Si el candidato ya pasa del resto, se corta la rama. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "backtracking con un índice de inicio para no repetir permutaciones",
    "javascript": "function combinationSum(candidates, target) {\n  const out = []\n  const nums = candidates.slice().sort((a, b) => a - b)\n  function walk(start, left, cur) {\n    if (left === 0) {\n      out.push(cur.slice())\n      return\n    }\n    for (let i = start; i < nums.length; i++) {\n      if (nums[i] > left) break\n      cur.push(nums[i])\n      walk(i, left - nums[i], cur)\n      cur.pop()\n    }\n  }\n  walk(0, target, [])\n  return out\n}\n",
    "typescript": "function combinationSum(candidates: number[], target: number): number[][]) {\n  const out = []\n  const nums = candidates.slice().sort((a, b) => a - b)\n  function walk(start, left, cur) {\n    if (left === 0) {\n      out.push(cur.slice())\n      return\n    }\n    for (let i = start; i < nums.length; i++) {\n      if (nums[i] > left) break\n      cur.push(nums[i])\n      walk(i, left - nums[i], cur)\n      cur.pop()\n    }\n  }\n  walk(0, target, [])\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            2,
            3,
            6,
            7
          ],
          7
        ],
        "expected": [
          [
            2,
            2,
            3
          ],
          [
            7
          ]
        ]
      },
      {
        "args": [
          [
            2
          ],
          1
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "senior-097",
    "level": "senior",
    "title": "Permutaciones",
    "prompt": "Devuelve todas las permutaciones de t, que no tiene repetidos. El orden es el del backtracking que intercambia desde la posición actual hacia la derecha.\nEjemplo: [1, 2] → [[1, 2], [2, 1]]. [1, 2, 3] empieza por [1, 2, 3] y [1, 3, 2].",
    "names": [
      "permute"
    ],
    "starter": "function permute(t) {\n  \n}\n",
    "explanation": "En la posición start se prueba cada candidato que queda a la derecha, se intercambia, se baja, y se deshace el intercambio. Sin deshacer, la siguiente rama vería el array ya revuelto. El número de hojas es n!. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "backtracking con intercambio y deshacer",
    "javascript": "function permute(t) {\n  const out = []\n  const nums = t.slice()\n  function walk(start) {\n    if (start === nums.length) {\n      out.push(nums.slice())\n      return\n    }\n    for (let i = start; i < nums.length; i++) {\n      const tmp = nums[start]\n      nums[start] = nums[i]\n      nums[i] = tmp\n      walk(start + 1)\n      nums[i] = nums[start]\n      nums[start] = tmp\n    }\n  }\n  walk(0)\n  return out\n}\n",
    "typescript": "function permute(t: number[]): number[][]) {\n  const out = []\n  const nums = t.slice()\n  function walk(start) {\n    if (start === nums.length) {\n      out.push(nums.slice())\n      return\n    }\n    for (let i = start; i < nums.length; i++) {\n      const tmp = nums[start]\n      nums[start] = nums[i]\n      nums[i] = tmp\n      walk(start + 1)\n      nums[i] = nums[start]\n      nums[start] = tmp\n    }\n  }\n  walk(0)\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2
          ]
        ],
        "expected": [
          [
            1,
            2
          ],
          [
            2,
            1
          ]
        ]
      },
      {
        "args": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          [
            1,
            2,
            3
          ],
          [
            1,
            3,
            2
          ],
          [
            2,
            1,
            3
          ],
          [
            2,
            3,
            1
          ],
          [
            3,
            2,
            1
          ],
          [
            3,
            1,
            2
          ]
        ]
      }
    ]
  },
  {
    "id": "senior-098",
    "level": "senior",
    "title": "Subconjuntos",
    "prompt": "Devuelve todos los subconjuntos de t, que no tiene repetidos. El orden es el del backtracking que decide incluir los elementos de izquierda a derecha. Incluye el vacío.\nEjemplo: [1, 2] → [[], [1], [1, 2], [2]].",
    "names": [
      "subsets"
    ],
    "starter": "function subsets(t) {\n  \n}\n",
    "explanation": "Cada llamada guarda la selección actual, vacío incluido, y luego prueba añadir cada elemento que todavía no se ha considerado. El índice de inicio impide repetir {1, 2} como {2, 1}. Hay 2^n subconjuntos. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "backtracking que avanza el índice de inicio",
    "javascript": "function subsets(t) {\n  const out = []\n  function walk(start, cur) {\n    out.push(cur.slice())\n    for (let i = start; i < t.length; i++) {\n      cur.push(t[i])\n      walk(i + 1, cur)\n      cur.pop()\n    }\n  }\n  walk(0, [])\n  return out\n}\n",
    "typescript": "function subsets(t: number[]): number[][]) {\n  const out = []\n  function walk(start, cur) {\n    out.push(cur.slice())\n    for (let i = start; i < t.length; i++) {\n      cur.push(t[i])\n      walk(i + 1, cur)\n      cur.pop()\n    }\n  }\n  walk(0, [])\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            1,
            2
          ]
        ],
        "expected": [
          [],
          [
            1
          ],
          [
            1,
            2
          ],
          [
            2
          ]
        ]
      },
      {
        "args": [
          []
        ],
        "expected": [
          []
        ]
      }
    ]
  },
  {
    "id": "senior-099",
    "level": "senior",
    "title": "Generar paréntesis",
    "prompt": "Devuelve todas las cadenas de n parejas de paréntesis bien formadas, en el orden del backtracking que prefiere abrir.\nEjemplo: 3 → [\"((()))\", \"(()())\", \"(())()\", \"()(())\", \"()()()\"].",
    "names": [
      "generateParentheses"
    ],
    "starter": "function generateParentheses(n) {\n  \n}\n",
    "explanation": "Se puede abrir mientras no se hayan usado las n aperturas. Se puede cerrar solo si hay más abiertos que cerrados: si no, la cadena quedaría inválida y no hace falta explorar esa rama. Al llegar a 2n caracteres, la cadena es una solución. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "backtracking con el número de abiertos y cerrados",
    "javascript": "function generateParentheses(n) {\n  const out = []\n  function walk(open, close, cur) {\n    if (cur.length === n * 2) {\n      out.push(cur)\n      return\n    }\n    if (open < n) walk(open + 1, close, cur + \"(\")\n    if (close < open) walk(open, close + 1, cur + \")\")\n  }\n  walk(0, 0, '')\n  return out\n}\n",
    "typescript": "function generateParentheses(n: number): string[]) {\n  const out = []\n  function walk(open, close, cur) {\n    if (cur.length === n * 2) {\n      out.push(cur)\n      return\n    }\n    if (open < n) walk(open + 1, close, cur + \"(\")\n    if (close < open) walk(open, close + 1, cur + \")\")\n  }\n  walk(0, 0, '')\n  return out\n}\n",
    "cases": [
      {
        "args": [
          3
        ],
        "expected": [
          "((()))",
          "(()())",
          "(())()",
          "()(())",
          "()()()"
        ]
      },
      {
        "args": [
          1
        ],
        "expected": [
          "()"
        ]
      }
    ]
  },
  {
    "id": "senior-100",
    "level": "senior",
    "title": "Rotar la matriz",
    "prompt": "Devuelve la matriz rotada 90 grados en el sentido de las agujas del reloj. Es cuadrada.\nEjemplo: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] → [[7, 4, 1], [8, 5, 2], [9, 6, 3]].",
    "names": [
      "rotateMatrix"
    ],
    "starter": "function rotateMatrix(matrix) {\n  \n}\n",
    "explanation": "Rotar en el sitio se hace por ciclos de cuatro casillas y no usa memoria extra. Construir una matriz nueva hace la misma transformación y es más fácil de comprobar: la fila nueva c sale de la columna c leída de abajo arriba. Aquí se construye la nueva para no mutar el argumento. En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.",
    "used": "la posición (r, c) pasa a (c, n - 1 - r)",
    "javascript": "function rotateMatrix(matrix) {\n  const n = matrix.length\n  const out = Array.from({ length: n }, () => new Array(n).fill(0))\n  for (let r = 0; r < n; r++) {\n    for (let c = 0; c < n; c++) out[c][n - 1 - r] = matrix[r][c]\n  }\n  return out\n}\n",
    "typescript": "function rotateMatrix(matrix: number[][]): number[][]) {\n  const n = matrix.length\n  const out = Array.from({ length: n }, () => new Array(n).fill(0))\n  for (let r = 0; r < n; r++) {\n    for (let c = 0; c < n; c++) out[c][n - 1 - r] = matrix[r][c]\n  }\n  return out\n}\n",
    "cases": [
      {
        "args": [
          [
            [
              1,
              2,
              3
            ],
            [
              4,
              5,
              6
            ],
            [
              7,
              8,
              9
            ]
          ]
        ],
        "expected": [
          [
            7,
            4,
            1
          ],
          [
            8,
            5,
            2
          ],
          [
            9,
            6,
            3
          ]
        ]
      },
      {
        "args": [
          [
            [
              1
            ]
          ]
        ],
        "expected": [
          [
            1
          ]
        ]
      }
    ]
  }
]

export function exercisesForLevel(level: Level): CodingExercise[] {
  return codingExercises.filter((exercise) => exercise.level === level)
}
