SHELL := /bin/bash
.DEFAULT_GOAL := help
.PHONY: help
include .env
help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
	| sed -n 's/^\(.*\): \(.*\)##\(.*\)/\1##\3/p' \
	| column -t -s '##'
setup: ## Prepare virtual env and setup project
	cd backend && poetry install &\
	cd frontend && yarn install & \
	pre-commit install
env: ## Sync env from secret storage `make env type=staging`
	infisical export --env $(type) >.env
update: ## Update dependencies
	cd backend && poetry update && \
	cd frontend && yarn upgrade
dev: ## Start docker compose stack for development
	docker compose -f compose.dev.yml up db -d
db: ## Make migrations + Migrate
	poetry -C backend run python ./backend/manage.py makemigrations &&  poetry -C backend run python ./backend/manage.py migrate
lint: ## Lint BE+FE
	poetry -C backend run ruff . --fix --config ./backend/pyproject.toml  &&  cd frontend && npm run lint &&  npm run type-check
api: ## Regenerate api schema + rtk query slices
	poetry -C backend run ./backend/manage.py spectacular --color --file ./docs/schema.yml && \
	cd frontend && npm run api-generate
be_init: ## Run migrations + create superuser from .env
	poetry -C backend run python ./backend/manage.py migrate && \
	poetry -C backend run python ./backend/manage.py createsuperuser --no-input
coverage: ## Generate coverage report
	cd backend && coverage run ./manage.py test && coverage report -m
be_shell: ## start be shell
	poetry -C backend run ./backend/manage.py shell_plus
be_admin: ## Generate admin file for specific app `make be_admin app=items`
	poetry -C backend run ./backend/manage.py admin_generator $(app)
erd: ## Generate ERD with some hectic file manipulation
	poetry -C backend run ./backend/manage.py graph_models -a  -g  -o docs/database/database.dot && \
	mv docs/database/database.dot docs/database/database.md && \
	sed -i '' '1s/^/```dot\n/' docs/database/database.md && echo '```' >> docs/database/database.md
deploy_docs: ## Deploy documentation to github pages
	mkdocs gh-deploy
