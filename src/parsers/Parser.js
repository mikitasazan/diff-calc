import fs from 'fs'
import path from 'path'

class Parser {
  static supportedExtensions = []

  parse() {
    throw new Error('parse() must be implemented by subclass')
  }

  supports(extension) {
    return this.constructor.supportedExtensions.includes(extension.toLowerCase())
  }

  readFile(filepath) {
    const absolutePath = path.resolve(process.cwd(), filepath)
    return fs.readFileSync(absolutePath, 'utf-8')
  }
}

export default Parser
