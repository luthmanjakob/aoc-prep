import { TempFile } from "./file"
import config from "./config"

const fileReader = async (path: string) => {
  const file = new TempFile(path)
  return file.read<number>({ numeric: true })
}

const test = async () => {
  const content = await fileReader(config.file)
  const result = content.reduce((a, b) => a + b)

  if (!config.outFile) {
    console.log(`[RESULT ${new Date().toLocaleString()}]: ${result}`)
  }

  if (config.outFile) {
    await TempFile.create(config.outFilePath, result.toString())
    console.log("Wrote to outfile, exiting.")
  }
}

test()
