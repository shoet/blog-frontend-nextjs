.DEFAULT_GOAL := help

STAGE = dev

.PHONY: deploy
deploy: ## Deploy AppStack
	COMMIT_HASH=$(git rev-parse HEAD) STAGE=${STAGE} cdk deploy BlogFrontendAppStack-${STAGE} --require-approval never

.PHONY: logs
logs: ## Show ServerLog
	aws logs tail --follow --format short /aws/lambda/blog-frontend-${STAGE}

.PHONY: help
help: ## Show options
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
    awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
