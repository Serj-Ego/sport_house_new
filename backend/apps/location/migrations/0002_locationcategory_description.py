# Generated by Django 4.1 on 2022-08-18 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("location", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="locationcategory",
            name="description",
            field=models.TextField(null=True, verbose_name="Описание"),
        ),
    ]
