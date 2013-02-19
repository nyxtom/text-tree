JS_FILES = \
	lib/textTree.js

JS_COMPILER = \
        uglifyjs

all: textTree.js textTree.min.js
textTree.js: $(JS_FILES)
textTree.min.js: $(JS_FILES)

textTree.js: Makefile
	  rm -f $@
	  cat $(filter %.js,$^) >> $@

%.min.js:: Makefile
	rm -f $@
	cat $(filter %.js,$^) | $(JS_COMPILER) >> $@

clean:
	rm -rf textTree.js textTree.min.js

test: all
	grunt test
