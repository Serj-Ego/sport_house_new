# Generated by Django 4.0.7 on 2022-11-21 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_breakfasteattype_dinnereattype_luncheattype'),
    ]

    operations = [
        migrations.CreateModel(
            name='LocationCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Наименование')),
            ],
            options={
                'verbose_name': '(Справочник) Категория спортивной площадки',
                'verbose_name_plural': '(Справочник) Категории спортивных площадок',
            },
        ),
        migrations.CreateModel(
            name='LocationSportType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Наименование')),
            ],
            options={
                'verbose_name': '(Справочник) Категория спорта на локации',
                'verbose_name_plural': '(Справочник) Категории спорта на локации',
            },
        ),
    ]
