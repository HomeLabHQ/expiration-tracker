###############################################
# Base Image
###############################################
FROM python:3.11-slim AS python_base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.6.1  \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/code" \
    VENV_PATH="/code/.venv"

# prepend poetry and venv to path
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"

###############################################
# Builder Image
###############################################
FROM python_base AS builder_base
RUN apt-get update && \
    apt-get --no-install-recommends -y install \
    curl=7.88.1-10+deb12u1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# install poetry - respects $POETRY_VERSION & $POETRY_HOME
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl -sSL https://install.python-poetry.org | python3 -

# copy project requirement files here to ensure they will be cached.
WORKDIR $PYSETUP_PATH
COPY ./backend/poetry.lock ./backend/pyproject.toml ./

# install runtime deps - uses $POETRY_VIRTUALENVS_IN_PROJECT internally
RUN poetry install

###############################################
# Production Image
###############################################
FROM python_base AS production
COPY --from=builder_base $PYSETUP_PATH $PYSETUP_PATH
WORKDIR $PYSETUP_PATH
COPY ./backend $PYSETUP_PATH

ENTRYPOINT [ "./entrypoint.sh" ]
