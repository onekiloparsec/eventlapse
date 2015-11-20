from django.conf import settings
from django.conf.urls import patterns, url, include
from django.contrib import admin
from django.http import HttpResponse
from django.views.generic.base import RedirectView

from project.eventlapse import views

robots_content = "" if settings.SITE_ID == 3 else "User-agent: *\nDisallow: /"

# The request-based view for the strictly empty URL / of host 'www'.
urlpatterns = patterns('',
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^robots\.txt$', lambda r: HttpResponse(robots_content)),
    url(r'^favicon\.ico$', RedirectView.as_view(url='/static/favicon.ico')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/articles/$', views.ArticleListAPIView.as_view(),  name='article-list'),
    url(r'^api/articles/(?P<pk>\d+)/$', views.ArticleDetailAPIView.as_view(), name='article-detail'),
    url(r'^api/locations/$', views.LocationListAPIView.as_view(),  name='location-list'),
    url(r'^api/locations/(?P<pk>\d+)/$', views.LocationDetailAPIView.as_view(), name='location-detail'),
)

handler404 = 'views.custom_404'

