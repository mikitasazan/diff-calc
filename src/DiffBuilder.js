import DiffNode from './DiffNode.js'

class DiffBuilder {
  isObject = value => typeof value === 'object' && value !== null

  getAllKeys = (obj1, obj2) => {
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
    return Array.from(keys).sort()
  }

  buildNode = (key, data1, data2) => {
    const hasInData1 = key in data1
    const hasInData2 = key in data2

    if (!hasInData2) {
      return new DiffNode(key, DiffNode.TYPE_REMOVED, { value: data1[key] })
    }

    if (!hasInData1) {
      return new DiffNode(key, DiffNode.TYPE_ADDED, { value: data2[key] })
    }

    const value1 = data1[key]
    const value2 = data2[key]

    if (this.isObject(value1) && this.isObject(value2)) {
      return new DiffNode(key, DiffNode.TYPE_NESTED, {
        children: this.build(value1, value2),
      })
    }

    if (value1 !== value2) {
      return new DiffNode(key, DiffNode.TYPE_UPDATED, { value1, value2 })
    }

    return new DiffNode(key, DiffNode.TYPE_UNCHANGED, { value: value1 })
  }

  build = (data1, data2) => {
    const keys = this.getAllKeys(data1, data2)
    return keys.map(key => this.buildNode(key, data1, data2))
  }
}

export default DiffBuilder
