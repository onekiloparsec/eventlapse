
from rest_framework import serializers
from project.eventlapse import models


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Location
        fields = ('id', 'name', 'longitude', 'latitude')

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Article
    locations = LocationSerializer(required=False, many=True)

class ArticleCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ArticleCount

