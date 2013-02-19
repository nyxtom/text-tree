# textTree

Simple data structure and algorithms for use in tries, suffix trees and the like.

## Getting Started
Install the module with: `npm install textTree`

```javascript
var textTree = require('textTree');
var trie = new textTree.trie();
trie.insert('hello world');
trie.insert('hi');
trie.insert('world');
trie.insert('wonderful');
trie.insert('wicked');
trie.autoComplete('wo'); // ['wonderful', 'world']
```

```javascript
// Alternatively if you are using client side javascript
<script type="text/javascript" src="textTree.min.js"></script>
<script type="text/javascript">
var trie = new textTree.trie();
trie.insert('hello world');
trie.insert('hi');
trie.insert('world');
trie.insert('wonderful');
trie.insert('wicked');
console.log(trie.autoComplete('wo')); // ['wonderful', 'world']
</script>

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## License
Copyright (c) 2013 Thomas Holloway  
Licensed under the MIT license.
