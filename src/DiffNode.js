class DiffNode {
  static TYPE_ADDED = 'added'
  static TYPE_REMOVED = 'removed'
  static TYPE_UPDATED = 'updated'
  static TYPE_UNCHANGED = 'unchanged'
  static TYPE_NESTED = 'nested'

  constructor(key, type, data = {}) {
    this.key = key
    this.type = type
    this.value = data.value
    this.value1 = data.value1
    this.value2 = data.value2
    this.children = data.children
  }

  isAdded = () => this.type === DiffNode.TYPE_ADDED

  isRemoved = () => this.type === DiffNode.TYPE_REMOVED

  isUpdated = () => this.type === DiffNode.TYPE_UPDATED

  isUnchanged = () => this.type === DiffNode.TYPE_UNCHANGED

  isNested = () => this.type === DiffNode.TYPE_NESTED

  getValue = () => this.value

  getOldValue = () => this.value1

  getNewValue = () => this.value2

  getChildren = () => this.children

  toJSON = () => {
    const base = { key: this.key, type: this.type }

    if (this.isAdded() || this.isRemoved() || this.isUnchanged()) {
      return { ...base, value: this.value }
    }

    if (this.isUpdated()) {
      return { ...base, oldValue: this.value1, newValue: this.value2 }
    }

    if (this.isNested()) {
      return { ...base, children: this.children.map(child => child.toJSON()) }
    }

    throw new Error(`Unknown node type: ${this.type}`)
  }
}

export default DiffNode
