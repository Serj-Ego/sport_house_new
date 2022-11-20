# Generated by Django 4.0.7 on 2022-10-18 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_notificationtype'),
        ('location', '0007_alter_locationcategory_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='direction',
        ),
        migrations.RemoveField(
            model_name='location',
            name='image',
        ),
        migrations.RemoveField(
            model_name='location',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='location',
            name='longitude',
        ),
        migrations.AddField(
            model_name='location',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='Описание'),
        ),
        migrations.AddField(
            model_name='location',
            name='images',
            field=models.ManyToManyField(to='base.file', verbose_name='Изображения площадки'),
        ),
        migrations.RemoveField(
            model_name='location',
            name='category',
        ),
        migrations.AddField(
            model_name='location',
            name='category',
            field=models.ManyToManyField(to='location.locationcategory', verbose_name='Категорииб'),
        ),
    ]