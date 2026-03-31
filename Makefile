.PHONY: build serve dev clean

build:
	python3 src/main.py

serve:
	npx serve docs -l 8888

dev:
	find src templates notes static | entr -r sh -c "make build"

test:
	python3 -m unittest discover -s tests

clean:
	rm -rf docs/*