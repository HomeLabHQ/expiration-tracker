#!/usr/bin/env bash
#!/bin/sh

git pull
docker compose -f compose.override.yml up -d --build
docker exec -it expiration-tracker-api python manage.py migrate
docker exec -it expiration-tracker-api python manage.py createsuperuser --no-input
setsid devtunnel host ${DEMO_TUNNEL} >/dev/null 2>&1 < /dev/null &
exec "$@"
