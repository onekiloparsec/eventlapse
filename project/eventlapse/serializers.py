
from rest_framework import serializers
from project.eventlapse import models


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Location

    articles = serializers.HyperlinkedIdentityField(many=True,
                                                    read_only=True,
                                                    view_name='article-detail',)


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Article

    location = LocationSerializer(required=False)
    category = CategorySerializer(required=True, many=True)

class ArticleCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ArticleCount

