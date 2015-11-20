
from django.views.generic.base import TemplateView
from django.core import exceptions
from rest_framework import generics

from project.eventlapse import models
from project.eventlapse import serializers

class IndexView(TemplateView):
    template_name = 'eventlapse/index.html'
    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context["title"] = "eventlapse"
        return context

class ArticleListAPIView(generics.ListAPIView):
    queryset = models.Article.objects.all()
    serializer_class = serializers.ArticleSerializer

class ArticleDetailAPIView(generics.RetrieveAPIView):
    queryset = models.Article.objects.all()
    serializer_class = serializers.ArticleSerializer

class LocationListAPIView(generics.ListAPIView):
    queryset = models.Article.objects.all()
    serializer_class = serializers.LocationSerializer

class LocationDetailAPIView(generics.RetrieveAPIView):
    queryset = models.Article.objects.all()
    serializer_class = serializers.LocationSerializer
