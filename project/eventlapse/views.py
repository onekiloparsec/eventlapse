from django.http import HttpResponse
from django.views.generic.base import TemplateView
from django.core import exceptions
from django.template import RequestContext
from django.conf import settings
from django.shortcuts import render, render_to_response

from rest_framework import generics

from project.eventlapse import models
from project.eventlapse import serializers

import timestring
import datetime

class IndexView(TemplateView):
    template_name = 'eventlapse/index.html'
    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context["title"] = "eventlapse"
        return context

class ArticleListAPIView(generics.ListAPIView):
    queryset = models.Article.objects.all()
    serializer_class = serializers.ArticleSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = models.Article.objects.all()

        day_number = self.request.query_params.get('day_number', None)
        if day_number is not None:
            first_article = models.Article.objects.all().order_by("date").first()
            day_date = first_article.date + datetime.timedelta(int(day_number))
            day_date_next = day_date + datetime.timedelta(1)
            queryset = queryset.filter(date__gte=day_date, date__lte=day_date_next)

        else:
            until = self.request.query_params.get('until', None)
            if until is not None:
                until_date = timestring.Date(until).date
                if until_date is not None:
                    queryset = queryset.filter(date__lte=until_date)

            since = self.request.query_params.get('since', None)
            if since is not None:
                since_date = timestring.Date(since).date
                if since_date is not None:
                    queryset = queryset.filter(date__gte=since_date)


        return queryset


class ArticleDetailAPIView(generics.RetrieveAPIView):
    queryset = models.Article.objects.all()
    serializer_class = serializers.ArticleSerializer

class LocationListAPIView(generics.ListAPIView):
    queryset = models.Article.objects.all()
    serializer_class = serializers.LocationSerializer

class LocationDetailAPIView(generics.RetrieveAPIView):
    queryset = models.Article.objects.all()
    serializer_class = serializers.LocationSerializer


class ArticleCountListAPIView(generics.ListAPIView):
    queryset = models.ArticleCount.objects.all()
    serializer_class = serializers.ArticleCountSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = models.ArticleCount.objects.all()

        days = self.request.query_params.get('days', None)
        if days is None:
            queryset = queryset.filter(days__gte=28)
        else:
            queryset = queryset.filter(days=days)

        return queryset

class ArticleCountDetailAPIView(generics.RetrieveAPIView):
    queryset = models.ArticleCount.objects.all()
    serializer_class = serializers.ArticleCountSerializer




import json
import twitter
import requests
import base64
import urllib2
from ..utils import get_env_variable

twitter_bearer = None

class TweetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, twitter.Status) or isinstance(obj, twitter.hashtag.Hashtag) or isinstance(obj, twitter.User) or isinstance(obj, twitter.url.Url):
            return obj.__dict__
        # Let the base class default method raise the TypeError
        return json.JSONEncoder.default(self, obj)


def search_tweets(term=None, geocode=None, since_id=None, max_id=None, until=None, count=15, lang=None, locale=None, result_type='popular', include_entities=None):
    """
    returns twitter feed with settings as described below, contains all related twitter settings
    """
    api = twitter.Api(consumer_key=get_env_variable('TWITTER_CONSUMER_KEY'),
                      consumer_secret=get_env_variable('TWITTER_CONSUMER_SERCRET'),
                      access_token_key=get_env_variable('TWITTER_ACCESS_TOKEN_KEY'),
                      access_token_secret=get_env_variable('TWITTER_ACCESS_TOKEN_SECRET'))

    return api.GetSearch(term=term, geocode=geocode, since_id=since_id, max_id=max_id, until=until,
                         count=count, lang=lang, locale=locale, result_type=result_type, include_entities=include_entities)


def tweetsAPIView(request):
    payload = {"grant_type":"client_credentials"}
    secret = get_env_variable('TWITTER_CONSUMER_KEY')+":"+get_env_variable('TWITTER_CONSUMER_SERCRET')
    post_headers = {'Authorization': "Basic "+base64.b64encode(secret)}
    post_resp = requests.post("https://api.twitter.com/oauth2/token", headers=post_headers, data=payload)
    resp_data = json.loads(post_resp.text)
    twitter_bearer = resp_data["access_token"]
    get_headers = {'Authorization': "Bearer "+twitter_bearer}
    day_number = request.GET.get("day_number", "1")
    start_date = datetime.datetime(2010, 12, 1) + datetime.timedelta(int(day_number))
    end_date = start_date + datetime.timedelta(10)
    query = urllib2.quote("#sidibouzid OR #tunisia OR #Tunisie OR #maniftunis since:"+start_date.date().isoformat()) # .date() to converte a datetime instance to a date one.
    get_resp = requests.get("https://api.twitter.com/1.1/search/tweets.json?q="+query+"&result_type=popular", headers=get_headers)
    return HttpResponse(get_resp.text, content_type='application/json')

