class Formatter {
  format() {
    throw new Error('format() must be implemented by subclass')
  }

  isObject = value => typeof value === 'object' && value !== null
}

export default Formatter
