# Generated by Django 4.1 on 2022-08-31 20:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("location", "0006_location_image"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="locationcategory",
            options={
                "verbose_name": "(Справочник) Категория спортивной площадки",
                "verbose_name_plural": "(Справочник) Категории спортивных площадок",
            },
        ),
        migrations.AlterModelOptions(
            name="locationsporttype",
            options={
                "verbose_name": "(Справочник) Категория спорта на локации",
                "verbose_name_plural": "(Справочник) Категории спорта на локации",
            },
        ),
    ]
