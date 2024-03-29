# Generated by Django 4.0.7 on 2022-10-24 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='BreakfastEatType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Вид блюда')),
                ('index', models.IntegerField(unique=True, verbose_name='Индекс блюда (для ИИ)')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание')),
            ],
            options={
                'verbose_name': '(Справочник) Виды блюд на завтрак',
                'verbose_name_plural': '(Справочник) Виды блюд на завтрак',
            },
        ),
        migrations.CreateModel(
            name='DinnerEatType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Вид блюда')),
                ('index', models.IntegerField(unique=True, verbose_name='Индекс блюда (для ИИ)')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание')),
            ],
            options={
                'verbose_name': '(Справочник) Виды блюд на ужин',
                'verbose_name_plural': '(Справочник) Виды блюд на ужин',
            },
        ),
        migrations.CreateModel(
            name='LunchEatType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Вид блюда')),
                ('index', models.IntegerField(unique=True, verbose_name='Индекс блюда (для ИИ)')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание')),
            ],
            options={
                'verbose_name': '(Справочник) Виды блюд на обед',
                'verbose_name_plural': '(Справочник) Виды блюд на обед',
            },
        ),
    ]
