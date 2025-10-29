# gen-diff

[![Actions Status](https://github.com/mikitasazan/gen-diff/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/mikitasazan/gen-diff/actions)

CLI tool that compares two configuration files (JSON, YAML) and displays their differences.

## Installation

```bash
make install
make link
```

## Usage

```bash
# Stylish format (default)
gen-diff <filepath1> <filepath2>

# Plain text format
gen-diff -f plain <filepath1> <filepath2>
```

## Development

```bash
make test          # Run tests
make lint          # Run linter
make test-coverage # Coverage report
```
