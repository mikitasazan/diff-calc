import yaml from 'js-yaml'
import Parser from './Parser.js'

class YamlParser extends Parser {
  static supportedExtensions = ['.yml', '.yaml']

  parse = content => yaml.load(content)
}

export default YamlParser
