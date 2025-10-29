# Architecture Documentation

## Overview

This project has been refactored using **Object-Oriented Programming (OOP)** principles with modern design patterns. The architecture follows SOLID principles and promotes maintainability, extensibility, and testability.

## Design Patterns Used

### 1. Strategy Pattern (File Parsers)
**Location**: `src/parsers/`

The parsing logic uses the Strategy pattern to handle different file formats:

```
Parser (Abstract Base Class)
  ├── JsonParser
  └── YamlParser
```

**Benefits**:
- Easy to add new file format parsers
- Each parser encapsulates its parsing logic
- No conditional branching in client code

### 2. Factory Pattern (Formatters)
**Location**: `src/formatters/FormatterFactory.js`

The `FormatterFactory` class manages formatter instances and provides them on demand:

```javascript
const formatter = formatterFactory.getFormatter('stylish')
formatter.format(diff)
```

**Benefits**:
- Centralized formatter creation
- Single source of truth for available formats
- Easy format validation

### 3. Template Method Pattern (Formatters)
**Location**: `src/formatters/Formatter.js`

Base `Formatter` class defines the contract, concrete formatters implement specific formatting:

```
Formatter (Abstract Base Class)
  ├── StylishFormatter
  ├── PlainFormatter
  └── JsonFormatter
```

**Benefits**:
- Consistent interface across all formatters
- Shared utility methods (e.g., `isObject`)
- Easy to add new output formats

### 4. Builder Pattern (DiffBuilder)
**Location**: `src/DiffBuilder.js`

The `DiffBuilder` class constructs the Abstract Syntax Tree (AST) representing differences:

**Benefits**:
- Separates diff construction logic from representation
- Recursive building of nested structures
- Clear, testable methods

## Core Components

### DiffNode Class
**File**: `src/DiffNode.js`

Encapsulates a single node in the diff AST:

- **Static Type Constants**: `TYPE_ADDED`, `TYPE_REMOVED`, `TYPE_UPDATED`, `TYPE_UNCHANGED`, `TYPE_NESTED`
- **Type Checkers**: `isAdded()`, `isRemoved()`, `isUpdated()`, `isUnchanged()`, `isNested()`
- **Value Accessors**: `getValue()`, `getOldValue()`, `getNewValue()`, `getChildren()`
- **Serialization**: `toJSON()` for JSON formatter

**Benefits**:
- Type-safe node representation
- Encapsulation of node logic
- Self-describing objects

### FileParser System
**Files**: `src/parsers/`

- **Parser (Base)**: Defines contract and shared logic
- **JsonParser**: Parses `.json` files
- **YamlParser**: Parses `.yml` and `.yaml` files
- **FileParser**: Coordinates parsing based on file extension

**Benefits**:
- Extensible: add new parsers by extending `Parser`
- Separation of concerns: file I/O, parsing, and strategy selection
- Single Responsibility Principle

### DiffBuilder
**File**: `src/DiffBuilder.js`

Constructs the diff AST by comparing two data structures:

**Methods**:
- `build(data1, data2)`: Main entry point
- `buildNode(key, data1, data2)`: Creates individual DiffNode
- `getAllKeys(obj1, obj2)`: Merges and sorts keys
- `isObject(value)`: Type checking utility

**Benefits**:
- Clear, readable algorithm
- Recursive handling of nested structures
- Easy to unit test

### Formatter System
**Files**: `src/formatters/`

- **Formatter (Base)**: Abstract formatter with shared utilities
- **StylishFormatter**: Tree-like indented output
- **PlainFormatter**: Human-readable change descriptions
- **JsonFormatter**: Machine-readable JSON output
- **FormatterFactory**: Manages formatter instances

**Benefits**:
- Polymorphism: all formatters share the same interface
- Open/Closed Principle: open for extension, closed for modification
- Each formatter focuses on a single output format

## Data Flow

```
1. FileParser reads and parses files
   ↓
2. DiffBuilder creates AST of DiffNodes
   ↓
3. FormatterFactory provides appropriate formatter
   ↓
4. Formatter transforms AST to output string
```

## SOLID Principles Applied

### Single Responsibility Principle
- **DiffNode**: Represents a single node
- **Parser classes**: Handle one file format
- **Formatter classes**: Produce one output format
- **DiffBuilder**: Builds diff tree only

### Open/Closed Principle
- Add new parsers without modifying existing code
- Add new formatters without modifying core logic
- Extend base classes for new functionality

### Liskov Substitution Principle
- Any `Parser` subclass can replace the base `Parser`
- Any `Formatter` subclass can replace the base `Formatter`

### Interface Segregation Principle
- Each class has a focused, minimal interface
- No client depends on methods it doesn't use

### Dependency Inversion Principle
- High-level modules (`genDiff`) depend on abstractions
- Concrete implementations are injected/created at runtime

## Code Style

The project follows these conventions:

- **Arrow functions** for class methods and callbacks
- **No semicolons** (consistent with ESLint config)
- **2-space indentation**
- **Single quotes** for strings
- **Object curly spacing** enabled
- **Declarative/functional** approach where appropriate

## Extensibility Examples

### Adding a New File Format (XML)

```javascript
// src/parsers/XmlParser.js
import Parser from './Parser.js'
import xml2js from 'xml2js'

class XmlParser extends Parser {
  static supportedExtensions = ['.xml']

  parse = async (content) => {
    const parser = new xml2js.Parser()
    return parser.parseStringPromise(content)
  }
}

export default XmlParser
```

Then register in `FileParser`:

```javascript
this.parsers = [
  new JsonParser(),
  new YamlParser(),
  new XmlParser(), // ← Add here
]
```

### Adding a New Output Format (Markdown)

```javascript
// src/formatters/MarkdownFormatter.js
import Formatter from './Formatter.js'

class MarkdownFormatter extends Formatter {
  format = (diff) => {
    // Implementation
  }
}

export default MarkdownFormatter
```

Then register in `FormatterFactory`:

```javascript
this.formatters = {
  stylish: new StylishFormatter(),
  plain: new PlainFormatter(),
  json: new JsonFormatter(),
  markdown: new MarkdownFormatter(), // ← Add here
}
```

## Testing Strategy

All tests pass without modification because:

1. **Public API unchanged**: `genDiff(filepath1, filepath2, format)` signature remains the same
2. **Output format preserved**: Formatters produce identical output
3. **AST structure maintained**: Internal representation compatible with tests

## Migration from Old Code

| Old Module | New Module | Pattern |
|------------|------------|---------|
| `buildDiff.js` | `DiffBuilder.js` | Builder |
| `parsers.js` + `yamlParser.js` | `parsers/FileParser.js` + strategies | Strategy |
| `formatters/index.js` | `formatters/FormatterFactory.js` | Factory |
| `formatters/stylish.js` | `formatters/StylishFormatter.js` | Template Method |
| `formatters/plain.js` | `formatters/PlainFormatter.js` | Template Method |
| `formatters/json.js` | `formatters/JsonFormatter.js` | Template Method |
| Plain objects | `DiffNode` class | Encapsulation |

## Benefits of This Refactoring

1. **Maintainability**: Clear separation of concerns
2. **Testability**: Each class can be unit tested independently
3. **Extensibility**: Easy to add new formats and parsers
4. **Readability**: Self-documenting code with clear class names
5. **Type Safety**: Encapsulated types prevent invalid states
6. **Reusability**: Formatters and parsers can be reused
7. **Professionalism**: Industry-standard patterns and practices
