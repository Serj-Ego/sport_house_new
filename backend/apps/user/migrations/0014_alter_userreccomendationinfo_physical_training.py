# Generated by Django 4.1 on 2022-09-01 18:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0003_physicaltraining"),
        ("user", "0013_userrecommendation_sport"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userreccomendationinfo",
            name="physical_training",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="base.physicaltraining",
                verbose_name="Физическая подготовка",
            ),
        ),
    ]
