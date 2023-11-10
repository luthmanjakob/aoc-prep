import { FileReader } from "./file"
import config from "./config"

const fileReader = async (path: string) => {
  const fileReader = new FileReader(path)
  return fileReader.read<number>({ numeric: true })
}

const test = async () => {
  const content = await fileReader(config.file)
  const result = content.reduce((a, b) => a + b)

  if (!config.outFile) {
    console.log(`[RESULT ${new Date().toLocaleString()}]: ${result}`)
  }

  if (config.outFile) {
    await FileReader.create(config.outFilePath, result.toString())
    console.log("Wrote to outfile, exiting.")
  }
}

test()
