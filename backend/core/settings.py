import os
from datetime import timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("SECRET_KEY", "DummyKey")
ENVIRONMENT = os.environ.get("ENVIRONMENT", "dev")
DEBUG = bool(os.environ.get("DEBUG", True))
ALLOWED_HOSTS = list(map(str.strip, os.environ.get("ALLOWED_HOSTS", "").split(",")))
CORS_ORIGIN_WHITELIST = list(os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost").split(","))
CORS_ALLOWED_ORIGINS = CORS_ORIGIN_WHITELIST
CSRF_TRUSTED_ORIGINS = CORS_ORIGIN_WHITELIST


COMMON_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
]

THIRD_PARTY_APPS = [
    "django_extensions",
    "rest_framework",
    "drf_spectacular",
]

PROJECT_APPS = ["authentication", "items"]

INSTALLED_APPS = COMMON_APPS + THIRD_PARTY_APPS + PROJECT_APPS

SHELL_PLUS_IMPORTS = [
    "from mixer.backend.django import mixer",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=int(os.environ.get("ACCESS_TOKEN_LIFETIME", 1))),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=int(os.environ.get("REFRESH_TOKEN_LIFETIME_DAYS", 1))),
}
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "core.paginators.ResultSetPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_AUTHENTICATION_CLASSES": ("rest_framework_simplejwt.authentication.JWTAuthentication",),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_THROTTLE_RATES": {
        "search": "5/minute",
    },
}
SPECTACULAR_SETTINGS = {
    "TITLE": "Expiration tracker API",
    "DESCRIPTION": "App to track expiration dates of medication and other goods",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "COMPONENT_SPLIT_REQUEST": True,
}


WSGI_APPLICATION = "core.wsgi.application"
if ENVIRONMENT == "demo":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        },
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.environ.get("POSTGRES_DB", ""),
            "USER": os.environ.get("POSTGRES_USER", ""),
            "PASSWORD": os.environ.get("POSTGRES_PASSWORD", ""),
            "HOST": os.environ.get("DB_HOST", ""),
            "PORT": os.environ.get("DB_PORT", ""),
        },
    }


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


LANGUAGE_CODE = "en-us"

TIME_ZONE = "Europe/Kiev"

USE_I18N = True

USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
AUTH_USER_MODEL = "authentication.User"
STATIC_URL = "/static/"
STATIC_ROOT = os.path.abspath(os.path.join(BASE_DIR, "static"))
MEDIA_ROOT = os.path.abspath(os.path.join(BASE_DIR, "attachments"))
MEDIA_URL = "/attachments/"
# * Subdir hosting
PUBLIC_URL = os.environ.get("PUBLIC_URL", "")
if PUBLIC_URL:
    USE_X_FORWARDED_HOST = True
    FORCE_SCRIPT_NAME = PUBLIC_URL + "/"
    SESSION_COOKIE_PATH = PUBLIC_URL + "/"
    MEDIA_URL = PUBLIC_URL + "/attachments/"
    STATIC_URL = PUBLIC_URL + "/static/"
LOGIN_URL = "login/"
LOGIN_REDIRECT_URL = PUBLIC_URL + "/"
LOGOUT_REDIRECT_URL = PUBLIC_URL + "/"
# * Search related settings
SEARCH_REGION = "ua-uk"
SEARCH_LIMIT = 5
