/*
 * text-tree
 * https://github.com/nyxtom/text-tree
 *
 * Copyright (c) 2013 Thomas Holloway
 * Licensed under the MIT license.
 */

(function () {
    // Initial setup
    // --------------

    // save a reference to the global object
    var root = this;

    // the top-level namespace. All public `textTree` classes and modules will 
    // be attached to this. Exported for both CommonJS and the browser
    var textTree, $self;
    if (typeof exports !== 'undefined') {
        $self = textTree = exports;
    } else {
        $self = textTree = root.textTree || {};
    }

    // current version of the library
    $self.VERSION = '0.1.0';

    /**
     * Trie: A ordered tree data structure used to store 
     * a dynamic set or associative array where the keys 
     * are usually strings. Unlike a binary search tree, 
     * no node in the tree stores the key associated with 
     * that node; instead, its position in the tree defines 
     * the key with which it is associated. All descendants of 
     * a node have a common prefix of the string associated 
     * with that node and the root node is associated with the 
     * empty string. Values are normally not associated with 
     * every node, only the leaves and some inner nodes that 
     * coorespond to keys of interest. 
     *
     * @api public
     */
    $self.trie = function () {
        this.words = 0;
        this.prefixes = 0;
        this.children = [];
    };

    $self.trie.prototype.insert = function (str, pos) {
        if (str.length == 0) { // blank strings cannot be inserted
            return;
        }

        var self = this;
        var k, child;

        if (pos === undefined) {
            pos = 0;
        }
        if (pos === str.length) {
            self.words++;
            return;
        }

        self.prefixes++;
        k = str[pos];
        if (self.children[k] === undefined) { // if node for this character doesn't exist, create one
            self.children[k] = new $self.trie();
        }
        child = self.children[k];
        child.insert(str, pos + 1);
    };

    $self.trie.prototype.remove = function (str, pos) {
        if (str.length == 0) {
            return;
        }

        var self = this;
        var k, child;

        if (pos === undefined) {
            pos = 0;
        }
        if (self === undefined) {
            return;
        }
        if (pos === str.length) {
            self.words--;
            return;
        }
        self.prefixes--;
        k = str[pos];
        child = self.children[k];
        child.remove(str, pos + 1);
    };

    $self.trie.prototype.update = function (strOld, strNew) {
        if (strOld.length == 0 || strNew.length == 0) {
            return;
        }
        this.remove(strOld);
        this.insert(strNew);
    };

    $self.trie.prototype.countWord = function (str, pos) {
        if (str.length == 0) {
            return 0;
        }

        var self = this;
        var k, child;
        var ret = 0;

        if (pos === undefined) {
            pos = 0;
        }
        if (pos === str.length) {
            return self.words;
        }

        k = str[pos];
        child = self.children[k];
        if (child !== undefined) { // node exists
            ret = child.countWord(str, pos + 1);
        }
        return ret;
    };

    $self.trie.prototype.countPrefix = function (str, pos) {
        if (str.length == 0) {
            return 0;
        }

        var self = this;
        var k, child;
        var ret = 0;

        if (pos === undefined) {
            pos = 0;
        }
        if (pos === str.length) {
            return self.prefixes;
        }
        k = str[pos];
        child = self.children[k];
        if (child !== undefined) { // node exists
            ret = child.countPrefix(str, pos + 1);
        }
        return ret;
    };

    $self.trie.prototype.find = function (str) {
        return str.length > 0 && this.countWord(str) > 0;
    };

    $self.trie.prototype.getAllWords = function (str) {
        var self = this;
        var k, child;
        var ret = [];
        if (str === undefined) {
            str == "";
        }
        if (self === undefined) {
            return [];
        }
        if (self.words > 0) {
            ret.push(str);
        }
        for (k in self.children) {
            child = self.children[k];
            ret = ret.concat(child.getAllWords(str + k));
        }
        return ret;
    };

    $self.trie.prototype.autoComplete = function (str, pos) {
        if (str.length == 0) {
            return [];
        }

        var self = this;
        var k, child;

        if (pos === undefined) {
            pos = 0;
        }
        k = str[pos];
        child = self.children[k];
        if (child === undefined) { // node doesn't exist
            return [];
        }
        if (pos == str.length - 1) {
            return child.getAllWords(str);
        }
        return child.autoComplete(str, pos + 1);
    };

}).call(this);
