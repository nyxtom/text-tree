
    /**
     * Suffix Trees is a data structure that presents the suffixes of a 
     * given string in a way that allows for a particularly fast 
     * implementation of many important string operations. The suffix 
     * tree for a string S is a tree whose edges are labeled with strings, 
     * such that each suffix of S corresponds to exactly one path from 
     * the tree's root to a leaf. It is thus a radix tree for the suffixes 
     * of S. A suffix is a special kind of a Trie.
     *
     * Generalized suffix trees are suffix trees made for a set of words 
     * instead of only for a single word. It represents all suffixes from 
     * this set of words. Each word must be terminated by a different 
     * termination symbol or word.
     *
     * Common functionality with this kind of data structure includes:
     * * string searching (if string P of length M is a substring in O(m) time)
     * * find the first occurrance of the patterns P1,...Pq of total length m
     * * find all z occurrences of the patterns P1,...Pq of total length m
     * * Search for a regular expression P in time expected sublinear in n
     */
    $self.suffixTree = function () {
        this.activePoint = null;
        this.phrases = 0;
        this.root = new $self.node();
        this.doc = new $self.document(0);
    };

    $self.suffixTree.prototype.addSentence = function (doc, startIndex, endIndex) {
        if (this.phrases == 0) {
            this.activePoint = new $self.suffix(this.root, 0, -1);
        };
        
        var oldCount = this.doc.count();
        var span = endIndex - startIndex;
        var offset = oldCount + span;
        for (var i = startIndex; i < endIndex; i++) {
            this.doc.addWord(doc.wordAt(i));
            this.addWord(this.doc.count() - 1, doc, offset);
        }

        this.phrases++;
    };

    $self.suffixTree.prototype.addWord = function (wordIndex, doc, maxIndex) {
        var parent = null;
        var lastParent = null;
        var word = this.doc.wordAt(wordIndex);
        
        // An edge is added (if necessary) for all nodes found
        // between the active one and the last one. The active node
        // is the first node which is not a leaf (a leaf node will never
        // change its type again and will be ignored in the next steps).
        // The end node is the first node for which an edge must not be added
        // (and the same for its successors, because they are suffixes for
        //  the end node and already have the required edges).
        while (true) {
            parent = this.activePoint.origin_;
            
            if (this.activePoint.isExplicit()) {
                if (parent.hasEdge(word)) {
                    break;
                }
            }
        }
    };

    $self.node = function () {
        this.edges = {};
        this.edgeCount = 0;
        this.suffixNode_ = null;
    };

    $self.node.prototype.suffixNode = function (_value) {
        if (typeof _value !== 'undefined') {
            this.suffixNode_ = _value;
        }
        return this.suffixNode_;
    };

    $self.node.prototype.edge = function (word, edge) {
        if (typeof edge !== 'undefined') {
            if (!this.hasEdge(word)) {
                this.edgeCount++;
            }
            this.edges[word] = edge;
        }
        else if (edge == null) {
            if (this.hasEdge(word)) {
                delete this.edges[word];
                this.edgeCount--;
            }
        }
        return this.edges[word];
    };
    
    $self.node.prototype.isLeaf = function () {
        return this.edgeCount == 0;
    };

    $self.node.prototype.hasEdge = function (word) {
        return typeof this.edges[word] !== 'undefined';
    };

    $self.node.prototype.toString = function () {
        return this.isLeaf() ? "Leaf" : "Edges: " + this.edgeCount;
    };

    $self.edge = function (doc, firstIndex, lastIndex, previous, next) {
        this.doc = doc;
        this.firstIndex_ = first;
        this.lastIndex_ = last;
        this.previous_ = previous;
        this.next_ = next;
    };

    $self.edge.prototype.firstIndex = function (_value) {
        if (typeof _value == 'number') {
            this.firstIndex_ = _value;
        }
        return this.firstIndex_;
    };

    $self.edge.prototype.lastIndex = function (_value) {
        if (typeof _value == 'number') {
            this.lastIndex_ = _value;
        }
        return this.lastIndex_;
    };

    $self.edge.prototype.previous = function (_value) {
        if (typeof _value !== 'undefined') {
            this.previous_ = _value;
        }
        return this.previous_;
    };

    $self.edge.prototype.next = function (_value) {
        if (typeof _value !== 'undefined') {
            this.next_ = _value;
        }
        return this.next_;
    };

    $self.edge.prototype.span = function () {
        return this.lastIndex_ - this.firstIndex_;
    };

    $self.suffix = function (origin, firstIndex, lastIndex) {
        this.origin_ = origin;
        this.firstIndex_ = firstIndex;
        this.lastIndex_ = lastIndex;
    };

    $self.suffix.prototype.origin = function (_value) {
        if (typeof _value !== 'undefined') {
            this.origin_ = _value;
        }
        return this.origin;
    };

    $self.suffix.firstIndex = function (_value) {
        if (typeof _value == 'number') {
            this.firstIndex_ = _value;
        }
        return this.firstIndex_;
    };

    $self.suffix.prototype.lastIndex = function (_value) {
        if (typeof _value == 'number') {
            this.lastIndex_ = _value;
        }
        return this.lastIndex_;
    };

    $self.suffix.prototype.isExplicit = function () {
        return this.firstIndex_ > this.lastIndex_;
    };

    $self.suffix.prototype.isImplicit = function () {
        return this.firstIndex_ <= this.lastIndex_;
    };

    $self.suffix.prototype.span = function () {
        return this.lastIndex_ - this.firstIndex_;
    };
