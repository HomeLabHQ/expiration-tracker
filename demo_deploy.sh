#!/usr/bin/env bash
#!/bin/sh

git pull
docker compose -f compose.override.yml up -d --build --force-recreate
setsid devtunnel host ${TUNNEL_ID} >/dev/null 2>&1 < /dev/null &
exec "$@"
