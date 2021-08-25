SHELL=/bin/bash

.PHONY: build
build: 
	docker build . -t axentix/docs:build-test
	docker run --rm -it -p 1314:80 axentix/docs:build-test

.PHONY: dev
dev:
	docker build . -t axentix/docs:dev --target dev
	docker run --rm -it -v $$PWD:/src -p 1313:1313 axentix/docs:dev