/**
 * @class
 * */
var LazySearch = function () {
  if (!(this instanceof LazySearch)) {
    return new LazySearch();
  }
};

/**
 * @param {String} contents All contents.
 * @param {String} searchKeyword Keyword to search.
 * @return {Object[]} Search results.
 * */
LazySearch.prototype.find = function (contents, searchKeyword) {
  var ret = [];
  var proto = LazySearch.prototype;
  var _contents = contents || "";
  var _searchKeyword = searchKeyword || "";
  var searchKeywordFirstChar = _searchKeyword.length > 0 ? _searchKeyword[0] : "";
  var startOffsets = proto._getFirstCharIndices(_contents, searchKeywordFirstChar);
  for (var k = 0; k < startOffsets.length; k++) {
    var bucket = [];
    for (var charIndex, offset = startOffsets[k], i = 0; i < _searchKeyword.length; i++) {
      var searchKeywordChar = _searchKeyword[i];
      charIndex = proto._findIndexOf(_contents, searchKeywordChar, offset, null);
      if (charIndex !== -1) {
        bucket.push({
          char: searchKeywordChar,
          index: charIndex
        });
        offset = charIndex + 1;
      } else {
        break;
      }
    }
    if (i === _searchKeyword.length) {
      ret.push(bucket);
    }
  }
  return proto._getInformation(contents, ret);
};
/**
 * @param {String} contents All contents.
 * @param {String} char Character to find.
 * @param {Number} offset Starting point the content search offsets.
 * @param {Object} options Options, default -> { caseSensitive: true }.
 * @return {Number} Contents index.
 * */
LazySearch.prototype._findIndexOf = function _findIndexOf(contents, char, offset, options) {
  var _contents = contents || "";
  var _char = char || "";
  var _offset = Number(offset) || 0;
  var _options = options || {
      caseSensitive: true
    };
  var ret = -1;
  var regexp = RegExp(_char, _options.caseSensitive ? "i" : "");
  for (var i = _offset; i < _contents.length; i++) {
    if (regexp.test(_contents[i])) {
      ret = i;
      break;
    }
  }
  return ret;
};
/**
 * @param {String} contents All contents.
 * @param {String} char Character to find.
 * @return {Number[]} Contents indices.
 * */
LazySearch.prototype._getFirstCharIndices = function _getFirstCharIndices(contents, char) {
  var ret = [];
  var _contents = contents || "";
  var _char = char || "";
  var regexp = RegExp(_char, "i");
  for (var contentChar, i = 0, len = _contents.length; i < len; i++) {
    contentChar = _contents[i];
    if (regexp.test(contentChar)) {
      ret.push(i);
    }
  }
  return ret;
};
/**
 * @param {String} contents All contents.
 * @param {Object[]} resultData Raw data.
 * @return {Object[]} Processed information.
 * */
LazySearch.prototype._getInformation = function _getInformation(contents, resultData) {
  var ret = [];
  var _contents = contents || "";
  var _resultData = resultData || [];
  for (var data, i = 0; i < _resultData.length; i++) {
    var distance = 0;
    data = _resultData[i];
    var prevData = null;
    data.forEach(function (item) {
      if (prevData) {
        distance += item.index - prevData.index - 1;
      }
      prevData = item;
    });
    ret.push({
      _rawData: data,
      contents: _contents.slice(data[0].index, data[data.length - 1].index + 1),
      distance: distance
    });
  }
  ret.sort(function (a, b) {
    return a.distance - b.distance;
  });
  return ret;
};

module.exports = LazySearch;