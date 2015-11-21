# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventlapse', '0006_auto_20151121_1021'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='locations',
            field=models.ManyToManyField(related_name='article', to='eventlapse.Location', blank=True),
        ),
    ]
