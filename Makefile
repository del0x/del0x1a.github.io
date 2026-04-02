.PHONY: build serve dev clean

build:
	python3 src/main.py

serve:
	npx serve docs -l 8888

dev:
	@echo "Starting dev server on http://localhost:8888"
	@trap 'kill 0' EXIT; \
	make serve & \
	find src templates notes static | entr -r make build

test:
	python3 -m unittest discover -s tests

clean:
	rm -rf docs/*