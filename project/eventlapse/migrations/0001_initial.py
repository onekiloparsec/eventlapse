# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=300, null=True, blank=True)),
                ('teaser_title', models.CharField(max_length=300, null=True, blank=True)),
                ('introduction', models.TextField(null=True, blank=True)),
                ('text', models.TextField(null=True, blank=True)),
                ('date', models.DateTimeField(null=True, blank=True)),
                ('photo_url', models.URLField()),
                ('article_url', models.URLField()),
                ('ranking', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('city', models.CharField(max_length=100, null=True, blank=True)),
                ('country', models.CharField(max_length=100, null=True, blank=True)),
                ('longitude', models.FloatField(null=True, blank=True)),
                ('latitude', models.FloatField(null=True, blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.ForeignKey(related_name='articles', blank=True, to='eventlapse.Category', null=True),
        ),
        migrations.AddField(
            model_name='article',
            name='location',
            field=models.ForeignKey(related_name='articles', blank=True, to='eventlapse.Location', null=True),
        ),
    ]
