# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventlapse', '0007_auto_20151121_1023'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='category',
        ),
        migrations.RemoveField(
            model_name='article',
            name='ranking',
        ),
    ]
