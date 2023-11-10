import fs from "fs/promises"

interface Config {
  day: number
  outFile?: boolean
}

interface AocConfig extends Config {
  file: `day${number}.txt`
  outFilePath?: `out${number}.txt`
}

function defineConfig(config: Config): AocConfig {
  console.log("DEFINING CONFIG FOR DAY:", config.day)

  const __config: AocConfig = {
    ...config,
    file: `day${config.day}.txt`
  }

  if (config.outFile) {
    __config.outFilePath = `out${config.day}.txt`

    console.log("Checking outfile availability...")
    
    fs.access(__config.outFilePath)
      .then(() => {
        console.log("File exists, proceeding.")
      })
      .catch(() => {
        console.log("File does not exist, creating...")
      })
  }

  return __config
}

export default defineConfig({
  day: 1,
  outFile: true
})