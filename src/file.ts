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
  
  public async read<T = string>(settings: ParserSettings) {
    const target = await fs.readFile(this.path, "utf8")

    return this.parse<T>(target, { 
      delimiter: settings.delimiter,
      numeric: settings.numeric
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
}