import FileParser from './parsers/FileParser.js'
import DiffBuilder from './DiffBuilder.js'
import FormatterFactory from './formatters/FormatterFactory.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileParser = new FileParser()
  const data1 = fileParser.parseFile(filepath1)
  const data2 = fileParser.parseFile(filepath2)

  const diffBuilder = new DiffBuilder()
  const diff = diffBuilder.build(data1, data2)

  const formatterFactory = new FormatterFactory()
  const formatter = formatterFactory.getFormatter(format)

  return formatter.format(diff)
}

export default genDiff
