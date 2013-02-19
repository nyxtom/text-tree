JS_FILES = \
	lib/text-tree.js

JS_COMPILER = \
        uglifyjs

all: text-tree.js text-tree.min.js
text-tree.js: $(JS_FILES)
text-tree.min.js: $(JS_FILES)

text-tree.js: Makefile
	  rm -f $@
	  cat $(filter %.js,$^) >> $@

%.min.js:: Makefile
	rm -f $@
	cat $(filter %.js,$^) | $(JS_COMPILER) >> $@

clean:
	rm -rf text-tree.js text-tree.min.js

test: all
	grunt test
