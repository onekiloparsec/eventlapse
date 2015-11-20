# -*- coding: utf-8 -*-

from defaults import *

# Remember that DEBUG = True makes Celery leaking.
DEBUG = True #bool(os.environ.get('DJANGO_DEBUG', ''))

# Allow all host headers
# Check https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = [
    'arcsecond-staging.herokuapp.com'
]

# INSTALLED_APPS += ('lockdown',)
# MIDDLEWARE_CLASSES += ('lockdown.middleware.LockdownMiddleware',)
#
# # To the contrary of lockdown doc, one must use a string for a password, with this form.
# LOCKDOWN_FORM = 'lockdown.forms.LockdownForm'
# LOCKDOWN_PASSWORD = 'MarcLevyIsWritingBoringBooks'
# LOCKDOWN_URL_EXCEPTIONS = (r'^/admin/$',)

SITE_ID = 2  # Local=1, Staging=2, Prod=3

CORS_ORIGIN_ALLOW_ALL = True
# CORS_ORIGIN_WHITELIST = (
#     'arcsecond-staging.herokuapp.com',
# )

ARCSECOND_API_ROOT_URL = "//arcsecond-staging.herokuapp.com/api"
PARENT_HOST = "arcsecond-staging.herokuapp.com"

