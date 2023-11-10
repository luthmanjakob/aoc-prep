import fs from "fs/promises"

interface ParserSettings {
  delimiter?: string
  numeric?: boolean
}

export class FileReader {
  private readonly path: string

  public constructor(path: string) {
    this.path = path
  }
  
  public async read<T = string>(settings?: ParserSettings) {
    const target = await fs.readFile(this.path, "utf8")

    return this.parse<T>(target, { 
      delimiter: settings?.delimiter,
      numeric: settings?.numeric
    })
  }

  private parse<T>(target: string, settings: ParserSettings) {
    const delimiter = settings.delimiter ?? "\r\n"

    if (settings.numeric) {
      return target.split(delimiter)
        .map(x => +x) as T[]
    }

    return target.split(delimiter) as T[]
  }

  public static async create(path?: string, content?: string) {
    if (!path) {
      return []
    }

    try {
      await fs.appendFile(path, `[${new Date().toLocaleString()}]: ${content}\r\n` ?? "")

      const fileReader = new FileReader(path)

      return await fileReader.read()
    } catch (error) {
      console.log(error)
    }

    return []
  }
}