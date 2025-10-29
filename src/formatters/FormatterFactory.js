import StylishFormatter from './StylishFormatter.js'
import PlainFormatter from './PlainFormatter.js'
import JsonFormatter from './JsonFormatter.js'

class FormatterFactory {
  constructor() {
    this.formatters = {
      stylish: new StylishFormatter(),
      plain: new PlainFormatter(),
      json: new JsonFormatter(),
    }
  }

  getFormatter = (formatName) => {
    const formatter = this.formatters[formatName]

    if (!formatter) {
      throw new Error(`Unknown format: ${formatName}`)
    }

    return formatter
  }
}

export default FormatterFactory
