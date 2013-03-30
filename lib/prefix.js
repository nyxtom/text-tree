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

