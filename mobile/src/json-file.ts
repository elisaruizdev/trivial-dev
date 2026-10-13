import { File, Paths } from 'expo-file-system'

/** Un JSON en los documentos de la app. `read` limpia lo leído y da el valor vacío si falta o está roto. */
export class JsonFile<T> {
  private readonly filename: string
  private readonly read: (value: unknown) => T

  constructor(filename: string, read: (value: unknown) => T) {
    this.filename = filename
    this.read = read
  }

  private open(): File {
    return new File(Paths.document, this.filename)
  }

  async load(): Promise<T> {
    const file = this.open()
    if (!file.exists) return this.read(null)
    try {
      return this.read(JSON.parse(await file.text()) as unknown)
    } catch {
      return this.read(null)
    }
  }

  async save(value: T): Promise<void> {
    const file = this.open()
    if (!file.exists) file.create()
    file.write(JSON.stringify(value))
  }
}
