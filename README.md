# Lazy-search
[![NPM version](https://img.shields.io/npm/v/lazy-search.svg)](https://www.npmjs.com/package/lazy-search)

With just a little typing, you can find exactly what you want from your contents!
This library is implemented with a search function similar to the directory search used in Intellij.

## Installation

The easiest way to install lazy-search is with [`npm`][npm].

[npm]: https://www.npmjs.com/

```sh
npm i lazy-search
```

Alternately, download the source.

```sh
git clone https://github.com/stegano/lazy-search.git
```

## API

### LazySearch.prototype.find(contents, searchKeyword) : Object[]

- `contents`: You can enter content such as the content of a news article or a file path or anything.
- `searchKeyword`: Keyword to search, search keywords do not have to be exact.

## Examples

You can search even if your query is not correct, like the code below.

```javascript
var lazySearch = new LazySearch();
var contents = "Ttttest apple eeeee";
var mySearchKeyword = "aple"; // <- You probably wanted to search for "Apple" :)
var result = lazySearch.find(contents, mySearchKeyword); // -> [{"_rawData":[{"char":"a","index":8},{"char":"p","index":9},{"char":"l","index":11},{"char":"e","index":12}],"contents":"apple","distance":1}]
```

### Result: Object[]

- `_rawData`: LazySearch performs a search for each character. Store the character's position in `_rawData`.
  - `char`: The character found in the content.
  - `index`: The position of the character in the contents.
- `contents`: The string that most matches the search keyword.
- `distance`: The closer the search keyword is, the closer the distance value is to `1`.

## Docs

Create an API document using JSDoc.

```sh
npm install
npm run doc
```

## Tests

To run the test suite, first install the dependencies, then run npm test

```sh
npm ininstall
npm test
```
