import Formatter from './Formatter.js'

class StylishFormatter extends Formatter {
  formatValue = (value, depth) => {
    if (value === null) return 'null'
    if (!this.isObject(value)) return String(value)

    const indent = ' '.repeat((depth + 1) * 4)
    const lines = Object.entries(value)
      .map(([key, val]) => `${indent}${key}: ${this.formatValue(val, depth + 1)}`)

    return `{\n${lines.join('\n')}\n${' '.repeat(depth * 4)}}`
  }

  formatNode = (node, depth) => {
    const indent = ' '.repeat(depth * 4 + 2)

    if (node.isAdded()) {
      return `${indent}+ ${node.key}: ${this.formatValue(node.getValue(), depth + 1)}`
    }

    if (node.isRemoved()) {
      return `${indent}- ${node.key}: ${this.formatValue(node.getValue(), depth + 1)}`
    }

    if (node.isUpdated()) {
      return [
        `${indent}- ${node.key}: ${this.formatValue(node.getOldValue(), depth + 1)}`,
        `${indent}+ ${node.key}: ${this.formatValue(node.getNewValue(), depth + 1)}`,
      ]
    }

    if (node.isUnchanged()) {
      return `${indent}  ${node.key}: ${this.formatValue(node.getValue(), depth + 1)}`
    }

    if (node.isNested()) {
      return `${indent}  ${node.key}: ${this.formatDiff(node.getChildren(), depth + 1)}`
    }

    throw new Error(`Unknown node type: ${node.type}`)
  }

  formatDiff = (diff, depth = 0) => {
    const lines = diff.flatMap(node => this.formatNode(node, depth))

    return depth === 0
      ? `{\n${lines.join('\n')}\n}`
      : `{\n${lines.join('\n')}\n${' '.repeat(depth * 4)}}`
  }

  format = diff => this.formatDiff(diff)
}

export default StylishFormatter
