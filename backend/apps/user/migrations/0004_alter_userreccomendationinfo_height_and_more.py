# Generated by Django 4.0.2 on 2022-08-12 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_userreccomendationinfo_age_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userreccomendationinfo',
            name='height',
            field=models.FloatField(blank=True, null=True, verbose_name='Рост'),
        ),
        migrations.AlterField(
            model_name='userreccomendationinfo',
            name='weight',
            field=models.FloatField(blank=True, null=True, verbose_name='Вес'),
        ),
    ]
