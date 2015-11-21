
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)

class Location(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)

class Article(models.Model):
    identifier = models.IntegerField(null=True, blank=True)

    title = models.CharField(max_length=300, null=True, blank=True)
    teaser_title = models.CharField(max_length=300, null=True, blank=True)
    introduction = models.TextField(null=True, blank=True)
    text = models.TextField(null=True, blank=True)

    date = models.DateTimeField(null=True, blank=True)

    photo_url = models.URLField(null=True, blank=True)
    article_url = models.URLField(null=True, blank=True)

    locations = models.ManyToManyField(Location, blank=True, related_name='article')

class ArticleCount(models.Model):
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    days = models.IntegerField(null=True, blank=True)
    count = models.IntegerField(null=True, blank=True)






