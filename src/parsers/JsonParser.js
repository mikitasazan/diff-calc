import Parser from './Parser.js'

class JsonParser extends Parser {
  static supportedExtensions = ['.json']

  parse = content => JSON.parse(content)
}

export default JsonParser
