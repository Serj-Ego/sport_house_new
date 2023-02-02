# Generated by Django 4.0.7 on 2022-12-02 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_eventlocationtype'),
        ('location', '0020_remove_location_sport_type_location_sport_type1'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='sport_type1',
        ),
        migrations.AddField(
            model_name='location',
            name='sport_type',
            field=models.ManyToManyField(to='base.locationsporttype', verbose_name='Вид спорта'),
        ),
    ]