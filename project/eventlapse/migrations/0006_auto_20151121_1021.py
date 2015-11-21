# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventlapse', '0005_location_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='location',
        ),
        migrations.AddField(
            model_name='article',
            name='locations',
            field=models.ManyToManyField(related_name='articles', to='eventlapse.Location', blank=True),
        ),
    ]
