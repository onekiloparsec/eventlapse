
from django.views.generic.base import TemplateView
from django.core import exceptions
from rest_framework import generics

from project.eventlapse import models
from project.eventlapse import serializers

import timestring

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
