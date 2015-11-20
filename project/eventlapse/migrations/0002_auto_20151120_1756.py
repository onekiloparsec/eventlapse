# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventlapse', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='identifier',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='article_url',
            field=models.URLField(null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='photo_url',
            field=models.URLField(null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='ranking',
            field=models.IntegerField(null=True, blank=True),
        ),
    ]
