SHELL := /bin/bash
.DEFAULT_GOAL := help
.PHONY: help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
	| sed -n 's/^\(.*\): \(.*\)##\(.*\)/\1##\3/p' \
	| column -t -s '##'
setup: ## Prepare virtual env and setup project
	cd backend && poetry install &\
	cd frontend && yarn install & \
	pre-commit install
update: ## Update dependencies
	cd backend && poetry update & \
	cd frontend && yarn upgrade
start: ## Start be+fe
	cd backend && poetry run manage.py runserver & \
	cd frontend && npm run dev
be_init: ## Run migrations + create superuser from .env
	cd backend && poetry run python manage.py migrate && python manage.py createsuperuser --no-input
coverage: ## Generate coverage report
	cd backend && coverage run ./manage.py test && coverage report -m
be_shell: ## start be shell
	cd backend && python ./manage.py shell_plus
be_admin: ## Generate admin file for specific app `make be_admin app=items`
	cd backend && python ./manage.py admin_generator $(app)
sync_api: ## Regenerate api schema + rtk query slices
	cd backend && python ./manage.py spectacular --color --file ../docs/schema.yml && \
	cd ../frontend && npm run api-generate
