# Generated by Django 4.0.7 on 2022-11-22 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0016_listlocationstatus_listmanagerlocation_location_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='worktimelocation',
            name='end_date',
            field=models.DateTimeField(null=True, verbose_name='Завершение работы'),
        ),
        migrations.AlterField(
            model_name='worktimelocation',
            name='start_date',
            field=models.DateTimeField(null=True, verbose_name='Начало работы'),
        ),
    ]