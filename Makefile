# Variables defined for executing the make script
NAME=yengas/backend-boilerplate
DEV_SUFFIX=-dev
VERSION=0.0.1
HOST_PORT=8080
CONTAINER_PORT=8080

.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

all: build

## Docker related tasks
build: ## Build the container with the cache.
	docker build -t $(NAME):$(VERSION) .
build-nc: ## Build the container without the caches.
	docker build --no-cache -t $(NAME):$(VERSION) .
build-dev: ## Build the development container.
	docker build -t $(NAME)$(DEV_SUFFIX):$(VERSION) -f development.Dockerfile .

run: build # Runs the application in production mode, assuming you're listening on predefined ports.
	docker run -p $(HOST_PORT):$(CONTAINER_PORT) -it $(NAME):$(VERSION) ${ARGS}
run-dev: # Runs the docker-compose up command.
	@docker-compose up

run-dev-script: # Starts dev server by binding the current directory as /application/code
	docker run -it -v ${CURDIR}:/application/code -w "/application/code" $(NAME)$(DEV_SUFFIX):$(VERSION) ${ARGS}
run-test: # Run all tests with run-dev-script
	@make ARGS="npm test" run-dev-script
run-lint: # Run lint with run-dev-script
	@make ARGS="npm run lint" run-dev-script
run-mock: # Run the mock server, assuming you're listening on port predefined ports.
	docker run -it -p $(HOST_PORT):$(CONTAINER_PORT) -v ${CURDIR}:/application/code -w "/application/code" $(NAME)$(DEV_SUFFIX):$(VERSION) npm run serve:mock
