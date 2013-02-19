var textTree = require('../lib/text-tree.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['Trie'] = {
    setUp: function(done) {
        done();
    },
    'autocomplete': function(test) {
        test.expect(3);
        var trie = new textTree.trie();
        trie.insert('hello world');
        trie.insert('hi');
        trie.insert('world');
        var words = trie.autoComplete('h');
        test.equals(words.length, 2);
        test.equals(words[0], 'hello world');
        test.equals(words[1], 'hi');
        test.done();
    }
};
