import Formatter from './Formatter.js'

class JsonFormatter extends Formatter {
  format = diff => JSON.stringify(diff.map(node => node.toJSON()), null, 2)
}

export default JsonFormatter
