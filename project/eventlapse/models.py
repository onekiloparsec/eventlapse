
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)

class Location(models.Model):
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
    ranking = models.IntegerField(null=True, blank=True)

    category = models.ForeignKey(Category, null=True, blank=True, related_name='articles')
    location = models.ForeignKey(Location, null=True, blank=True, related_name='articles')







