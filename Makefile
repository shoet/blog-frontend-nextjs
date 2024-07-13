.PHONY: help deploy
.DEFAULT_GOAL := help

deploy: ## Build and Deploy by Serverless
	sls deploy --stage=dev --verbose

help: ## Show options
	@grep -E '^[a-zA-Z_]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
