# Generated by Django 4.1 on 2022-08-18 18:17

import apps.location.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("location", "0004_locationsporttype_location_sports"),
    ]

    operations = [
        migrations.AddField(
            model_name="locationsporttype",
            name="icon",
            field=models.ImageField(
                null=True,
                upload_to=apps.location.models.get_file_path,
                verbose_name="Иконка категории",
            ),
        ),
    ]