.PHONY: help deploy
.DEFAULT_GOAL := help

## Default stage
STAGE=dev 

deploy: ## Build and Deploy by Serverless
	sls deploy --stage=${STAGE} --verbose

help: ## Show options
	@grep -E '^[a-zA-Z_]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
