import { FileReader } from "./file"

const fileReader = async (path: string) => {
  const fileReader = new FileReader(path)
  return fileReader.read<number>({ numeric: true })
}

const test = async () => {
  const content = await fileReader("aoc.txt")
  const result = content.reduce((a, b) => a + b)

  console.table(JSON.stringify({ 
    fileContent: content, 
    summarizedResult: result 
  }))
}

test()