import type { CodingExercise, PracticeCase } from '../domain/coding-exercise.ts'

export interface PracticeLine {
  level: 'log' | 'info' | 'warn' | 'error'
  text: string
}

function formatValue(value: unknown): string {
  if (typeof value === 'string') return value
  if (value instanceof Error) return value.message
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

export function functionProbe(names: readonly string[], cases: readonly PracticeCase[]): string {
  const pick = names.map((name) => `(typeof ${name} === "function" ? ${name} : null)`).join(' ?? ')
  return `
var __fn = ${pick};
if (typeof __fn !== "function") throw new Error(${JSON.stringify(`Define la función ${names.join(' o ')}.`)});
var __cases = ${JSON.stringify(cases)};
function __same(a, b) {
  if (typeof a === "number" && typeof b === "number" && Number.isNaN(a) && Number.isNaN(b)) return true;
  return JSON.stringify(a) === JSON.stringify(b);
}
for (var __i = 0; __i < __cases.length; __i++) {
  var __item = __cases[__i];
  var __got;
  try {
    __got = __fn.apply(null, __item.args);
  } catch (__error) {
    throw new Error("El caso " + (__i + 1) + " ha lanzado: " + (__error && __error.message ? __error.message : __error));
  }
  if (!__same(__got, __item.expected)) {
    throw new Error("Caso " + (__i + 1) + ": con " + JSON.stringify(__item.args) + " se esperaba " + JSON.stringify(__item.expected) + " y se obtuvo " + JSON.stringify(__got) + ".");
  }
}
console.log("Correcto. " + __cases.length + " casos.");
`
}

export function practiceProgram(exercise: CodingExercise, userCode: string): string {
  const lines = [`var __practiceSource = ${JSON.stringify(userCode)};`]
  for (const rule of exercise.forbid ?? []) {
    lines.push(
      `if (new RegExp(${JSON.stringify(rule.pattern)}).test(__practiceSource)) throw new Error(${JSON.stringify(rule.message)});`,
    )
  }
  const probe =
    exercise.probe ??
    (exercise.cases
      ? functionProbe(exercise.names, exercise.cases)
      : 'throw new Error("Este ejercicio no tiene comprobación.");')
  if (!exercise.captureLogs) {
    return `${lines.join('\n')}\n${userCode}\n${probe}`
  }
  return `${lines.join('\n')}
var __practiceLogs = [];
var __practiceLog = console.log.bind(console);
console.log = function () {
  var parts = [];
  for (var i = 0; i < arguments.length; i++) {
    var value = arguments[i];
    if (typeof value === "string") parts.push(value);
    else {
      try { parts.push(JSON.stringify(value)); }
      catch (error) { parts.push(String(value)); }
    }
  }
  __practiceLogs.push(parts.join(" "));
};
${userCode}
console.log = __practiceLog;
${probe}`
}

export function runPracticeProgram(program: string): PracticeLine[] {
  const lines: PracticeLine[] = []
  const localConsole = {
    log: (...args: unknown[]) => lines.push({ level: 'log', text: args.map(formatValue).join(' ') }),
    info: (...args: unknown[]) => lines.push({ level: 'info', text: args.map(formatValue).join(' ') }),
    warn: (...args: unknown[]) => lines.push({ level: 'warn', text: args.map(formatValue).join(' ') }),
    error: (...args: unknown[]) => lines.push({ level: 'error', text: args.map(formatValue).join(' ') }),
  }
  try {
    const execute = new Function('console', program) as (console: typeof localConsole) => void
    execute(localConsole)
  } catch (error) {
    lines.push({ level: 'error', text: error instanceof Error ? error.message : String(error) })
  }
  if (lines.length === 0) {
    lines.push({ level: 'info', text: 'El código no ha escrito nada en la consola.' })
  }
  return lines
}

export function practicePassed(lines: readonly PracticeLine[]): boolean {
  return lines.some((line) => line.level === 'log' && line.text.startsWith('Correcto'))
}

export const practiceRunnerHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head><body><script>
function runPractice(source, id) {
  var lines = [];
  function push(level, args) {
    if (lines.length >= 40) return;
    var text = Array.prototype.map.call(args, function (value) {
      if (typeof value === "string") return value;
      if (value instanceof Error) return value.message;
      try { return JSON.stringify(value); } catch (e) { return String(value); }
    }).join(" ");
    lines.push({ level: level, text: text });
  }
  console.log = function () { push("log", arguments); };
  console.info = function () { push("info", arguments); };
  console.warn = function () { push("warn", arguments); };
  console.error = function () { push("error", arguments); };
  try {
    var execute = new Function(source);
    execute();
  } catch (error) {
    push("error", [error && error.message ? error.message : String(error)]);
  }
  if (!lines.length) push("info", ["El código no ha escrito nada en la consola."]);
  window.ReactNativeWebView.postMessage(JSON.stringify({ id: id, lines: lines }));
}
</script></body></html>`
