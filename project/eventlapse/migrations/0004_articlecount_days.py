# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventlapse', '0003_articlecount'),
    ]

    operations = [
        migrations.AddField(
            model_name='articlecount',
            name='days',
            field=models.IntegerField(null=True, blank=True),
        ),
    ]
