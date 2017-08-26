var expect = require("chai").expect;
var LazySearch = require("../src/index");
var lazySearch = new LazySearch();

describe("LazySearch", function () {

  describe("Basic test", function () {
    it("`LazySearch.prototype._findIndexOf`", function () {
      var actual = lazySearch._findIndexOf("012345a", "a", 0, null);
      expect(actual).to.equal(6);
    });
    it("`LazySearch.prototype._getFirstCharIndices`", function () {
      var actual = lazySearch._getFirstCharIndices("a12345a", "a");
      expect(actual).to.deep.equal([0, 6]);
    });
    it("`LazySearch.prototype._getInformation`", function () {
      var mockRawData = [
        [
          {
            "char": "a",
            "index": 0
          },
          {
            "char": "a",
            "index": 6
          }
        ]
      ];
      var actual = lazySearch._getInformation("a12345a", mockRawData);
      var expected = [{
        "_rawData": [
          {
            "char": "a",
            "index": 0
          },
          {
            "char": "a",
            "index": 6
          }
        ],
        "contents": "a12345a",
        "distance": 5
      }];
      expect(actual).to.deep.equal(expected);
    });
  });
  describe("Search test", function () {
    describe("`LazySearch.prototype.find`", function () {
      var contents = ``;
      before(function () {
        contents = `
        W. B. Yeats
        From Wikipedia, the free encyclopedia
        "Yeats" redirects here. For other uses, see Yeats (disambiguation).
        
        William Butler Yeats photographed in 1903 by Alice Boughton
        William Butler Yeats (/ˈjeɪts/; 13 June 1865 – 28 January 1939) was an Irish poet and one of the foremost figures of 20th century literature. A pillar of both the Irish and British literary establishments, he helped to found the Abbey Theatre, and in his later years served as an Irish Senator for two terms. Yeats was a driving force behind the Irish Literary Revival along with Lady Gregory, Edward Martyn and others.
        
        He was born in Sandymount, Ireland and educated there and in London. He spent childhood holidays in County Sligo and studied poetry from an early age when he became fascinated by Irish legends and the occult. These topics feature in the first phase of his work, which lasted roughly until the turn of the 20th century. His earliest volume of verse was published in 1889, and its slow-paced and lyrical poems display Yeats's debts to Edmund Spenser, Percy Bysshe Shelley, and the poets of the Pre-Raphaelite Brotherhood. From 1900, his poetry grew more physical and realistic. He largely renounced the transcendental beliefs of his youth, though he remained preoccupied with physical and spiritual masks, as well as with cyclical theories of life. In 1923, he was awarded the Nobel Prize in Literature.
        
        [Source - https://en.wikipedia.org/wiki/W._B._Yeats]
        `;
      });
      it("basic search test", function () {
        /**
         * The input keyword "wilboughton" finds "William Butler Yeats photographed in 1903 by Alice Boughton".
         * */
        var searchKeyword = "wilboughton";
        var actual = lazySearch.find(contents, searchKeyword);
        var expected = "William Butler Yeats photographed in 1903 by Alice Boughton";
        expect(actual[0].contents).to.equal(expected);
      });
      it("distance test", function () {
        var searchKeyword = "From Wikipedia, the free encyclopedia";
        var actual = lazySearch.find(contents, searchKeyword);
        /**
         * If the exact match of the search keyword, the distance must be `0`.
         * */
        var expected = 0;
        expect(actual[0].distance).to.equal(expected);
      });
      it("asd", function() {
        var contents = "Ttttest apple eeeee";
        var mySearchKeyword = "aple"; // <- You probably wanted to search for "Apple" :)
        var result = lazySearch.find(contents, mySearchKeyword); // ->
        console.log(JSON.stringify(result));
      })
    });
  });
});