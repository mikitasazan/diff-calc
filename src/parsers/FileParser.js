import path from 'path'
import JsonParser from './JsonParser.js'
import YamlParser from './YamlParser.js'

class FileParser {
  constructor() {
    this.parsers = [
      new JsonParser(),
      new YamlParser(),
    ]
  }

  getParser = (filepath) => {
    const extension = path.extname(filepath).toLowerCase()
    const parser = this.parsers.find(p => p.supports(extension))

    if (!parser) {
      throw new Error(`Unsupported file extension: ${extension}`)
    }

    return parser
  }

  parseFile = (filepath) => {
    const parser = this.getParser(filepath)
    const content = parser.readFile(filepath)
    return parser.parse(content)
  }
}

export default FileParser
