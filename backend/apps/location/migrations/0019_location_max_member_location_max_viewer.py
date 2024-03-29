# Generated by Django 4.0.7 on 2022-12-01 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0018_location_is_blocked'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='max_member',
            field=models.PositiveIntegerField(default=0, verbose_name='Максимальное количество участников'),
        ),
        migrations.AddField(
            model_name='location',
            name='max_viewer',
            field=models.PositiveIntegerField(default=0, verbose_name='Максимальное количество зрителей'),
        ),
    ]
