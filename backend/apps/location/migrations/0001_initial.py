# Generated by Django 4.1 on 2022-08-18 17:52

import colorfield.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="LocationCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, verbose_name="Наименование")),
                (
                    "slug",
                    models.SlugField(max_length=255, verbose_name="Слаг наименования"),
                ),
                (
                    "color",
                    colorfield.fields.ColorField(
                        default="#FFFFFF", image_field=None, max_length=18, samples=None
                    ),
                ),
            ],
            options={
                "verbose_name": "Категория спортивной площадки",
                "verbose_name_plural": "Категории спортивных площадок",
            },
        ),
        migrations.CreateModel(
            name="Location",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=510, verbose_name="Наименование")),
                ("direction", models.CharField(max_length=255, verbose_name="Адрес")),
                ("latitude", models.FloatField(verbose_name="Широта")),
                ("longitude", models.FloatField(verbose_name="Долгота")),
                (
                    "category",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="location.locationcategory",
                        verbose_name="Категория",
                    ),
                ),
            ],
            options={
                "verbose_name": "Спортивная площадка",
                "verbose_name_plural": "Спортивные площадки",
            },
        ),
    ]
