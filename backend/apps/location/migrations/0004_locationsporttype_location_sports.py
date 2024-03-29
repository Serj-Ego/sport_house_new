# Generated by Django 4.1 on 2022-08-18 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("location", "0003_remove_locationcategory_slug"),
    ]

    operations = [
        migrations.CreateModel(
            name="LocationSportType",
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
            ],
            options={
                "verbose_name": "Категория спорта на локации",
                "verbose_name_plural": "Категории спорта на локации",
            },
        ),
        migrations.AddField(
            model_name="location",
            name="sports",
            field=models.ManyToManyField(
                to="location.locationsporttype",
                verbose_name="Список категорий спорта на площадке",
            ),
        ),
    ]
