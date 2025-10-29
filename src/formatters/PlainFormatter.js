import Formatter from './Formatter.js'

class PlainFormatter extends Formatter {
  formatValue = (value) => {
    if (value === null) return 'null'
    if (this.isObject(value)) return '[complex value]'
    return typeof value === 'string' ? `'${value}'` : String(value)
  }

  formatNode = (node, parentPath) => {
    const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key

    if (node.isAdded()) {
      return `Property '${currentPath}' was added with value: ${this.formatValue(node.getValue())}`
    }

    if (node.isRemoved()) {
      return `Property '${currentPath}' was removed`
    }

    if (node.isUpdated()) {
      const oldValue = this.formatValue(node.getOldValue())
      const newValue = this.formatValue(node.getNewValue())
      return `Property '${currentPath}' was updated. From ${oldValue} to ${newValue}`
    }

    if (node.isNested()) {
      return this.formatDiff(node.getChildren(), currentPath)
    }

    if (node.isUnchanged()) {
      return []
    }

    throw new Error(`Unknown node type: ${node.type}`)
  }

  formatDiff = (diff, parentPath = '') => {
    const lines = diff
      .sort((a, b) => a.key.localeCompare(b.key))
      .flatMap(node => this.formatNode(node, parentPath))

    return lines.join('\n')
  }

  format = diff => this.formatDiff(diff)
}

export default PlainFormatter
