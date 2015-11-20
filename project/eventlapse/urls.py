from django.conf import settings
from django.conf.urls import patterns, url, include
from django.contrib import admin
from django.http import HttpResponse
from django.views.generic.base import RedirectView

from project.eventlapse import views

robots_content = "" if settings.SITE_ID == 3 else "User-agent: *\nDisallow: /"

# The request-based view for the strictly empty URL / of host 'www'.
urlpatterns = patterns('',
    url(r'^robots\.txt$', lambda r: HttpResponse(robots_content)),
    url(r'^favicon\.ico$', RedirectView.as_view(url='/static/favicon.ico')),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^.*$', views.IndexView.as_view(), name='index'),
)


handler404 = 'views.custom_404'

