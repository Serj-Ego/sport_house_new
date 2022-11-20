import logging

from sentry_sdk.integrations.celery import CeleryIntegration
from sentry_sdk.integrations.logging import LoggingIntegration
from sentry_sdk.integrations.redis import RedisIntegration

from .base import *  # noqa
from .base import env
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = env.bool("DJANGO_DEBUG", False)
# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = env(
    "DJANGO_SECRET_KEY",
)
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=["example.com"])

# DATABASES
# ------------------------------------------------------------------------------
DATABASES = {"default": env.db("DATABASE_URL")}  # noqa F405
DATABASES["default"]["ATOMIC_REQUESTS"] = True  # noqa F405
DATABASES["default"]["CONN_MAX_AGE"] = env.int("CONN_MAX_AGE", default=60)  # noqa F405

# CACHES
# ------------------------------------------------------------------------------
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": env("REDIS_URL"),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            # Mimicing memcache behavior.
            # https://github.com/jazzband/django-redis#memcached-exceptions-behavior
            "IGNORE_EXCEPTIONS": True,
        },
    }
}
# Celery
# ------------------------------------------------------------------------------

# http://docs.celeryproject.org/en/latest/userguide/configuration.html#task-eager-propagates
CELERY_TASK_EAGER_PROPAGATES = True

# ADMIN
# ------------------------------------------------------------------------------
# Django Admin URL regex.
ADMIN_URL = "api/" + env("DJANGO_ADMIN_URL")

# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#default-from-email
DEFAULT_FROM_EMAIL = env(
    "DJANGO_DEFAULT_FROM_EMAIL", default="my-sport-house <noreply@my-sport-house.ru>"
)
# https://docs.djangoproject.com/en/dev/ref/settings/#server-email
SERVER_EMAIL = env("DJANGO_SERVER_EMAIL", default=DEFAULT_FROM_EMAIL)
# https://docs.djangoproject.com/en/dev/ref/settings/#email-subject-prefix
EMAIL_SUBJECT_PREFIX = env(
    "DJANGO_EMAIL_SUBJECT_PREFIX",
    default="[Sport House]",
)
EMAIL_BACKEND = env(
    "DJANGO_EMAIL_BACKEND", default="django.core.mail.backends.console.EmailBackend"
)
EMAIL_HOST = env("EMAIL_HOST")  # mail service smtp
EMAIL_HOST_USER = env("EMAIL_HOST_USER")  # email id
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")  # password
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL")
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_USE_SSL = env("EMAIL_USE_SSL")

# django-extensions
# ------------------------------------------------------------------------------
# https://django-extensions.readthedocs.io/en/latest/installation_instructions.html#configuration
INSTALLED_APPS += []  # noqa F405

# Your stuff...
# ------------------------------------------------------------------------------
STATIC_URL = "/api/static/"

if env.bool("PRODUCTION"):
    # https://docs.djangoproject.com/en/dev/ref/settings/#session-cookie-secure
    SESSION_COOKIE_SECURE = False
    # https://docs.djangoproject.com/en/dev/ref/settings/#csrf-cookie-secure
    CSRF_COOKIE_SECURE = False
    # https://docs.djangoproject.com/en/dev/ref/settings/#session-cookie-httponly
    SESSION_COOKIE_HTTPONLY = False
    # https://docs.djangoproject.com/en/dev/ref/settings/#csrf-cookie-httponly
    CSRF_COOKIE_HTTPONLY = False
    CORS_ALLOWED_ORIGINS = [
        "https://my-sport-house.ru",
        "https://api.my-sport-house.ru",
        "http://api.my-sport-house.ru",
    ]
    CORS_ORIGIN_WHITELIST = (
        "https://my-sport-house.ru",
        "https://api.my-sport-house.ru",
        "http://api.my-sport-house.ru",
    )
    # # SECURITY
    # # ------------------------------------------------------------------------------
    # # https://docs.djangoproject.com/en/dev/ref/settings/#secure-proxy-ssl-header
    # SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    # # https://docs.djangoproject.com/en/dev/ref/settings/#secure-ssl-redirect
    # SECURE_SSL_REDIRECT = env.bool("DJANGO_SECURE_SSL_REDIRECT", default=True)
    # # https://docs.djangoproject.com/en/dev/ref/settings/#session-cookie-secure
    # SESSION_COOKIE_SECURE = True
    # # https://docs.djangoproject.com/en/dev/ref/settings/#csrf-cookie-secure
    # CSRF_COOKIE_SECURE = True
    # # https://docs.djangoproject.com/en/dev/topics/security/#ssl-https
    # # https://docs.djangoproject.com/en/dev/ref/settings/#secure-hsts-seconds
    # SECURE_HSTS_SECONDS = 60
    # # https://docs.djangoproject.com/en/dev/ref/settings/#secure-hsts-include-subdomains
    # SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool(
    #     "DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS", default=True
    # )
    # # https://docs.djangoproject.com/en/dev/ref/settings/#secure-hsts-preload
    # SECURE_HSTS_PRELOAD = env.bool("DJANGO_SECURE_HSTS_PRELOAD", default=True)
    # # https://docs.djangoproject.com/en/dev/ref/middleware/#x-content-type-options-nosniff
    # SECURE_CONTENT_TYPE_NOSNIFF = env.bool(
    #     "DJANGO_SECURE_CONTENT_TYPE_NOSNIFF", default=True
    # )
sentry_logging = LoggingIntegration(
    level=logging.INFO,  # Capture info and above as breadcrumbs
    event_level=logging.ERROR,  # Send errors as events
)
integrations = [
    sentry_logging,
    DjangoIntegration(),
    CeleryIntegration(),
    RedisIntegration(),
]
sentry_sdk.init(
    dsn="https://223a0a851d804201a906f7f9875c8404@o1361402.ingest.sentry.io/6741134",
    integrations=integrations,
    traces_sample_rate=1.0,
    send_default_pii=True,
)
