# Generated by Django 4.1.6 on 2023-02-19 09:08

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_alter_card_date_created_alter_card_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='card',
            name='guest_user',
        ),
        migrations.AlterField(
            model_name='card',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2023, 2, 19, 14, 38, 18, 112527)),
        ),
    ]
