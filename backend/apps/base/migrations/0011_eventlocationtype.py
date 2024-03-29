# Generated by Django 4.0.7 on 2022-11-21 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_locationcoating_locationlight_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventLocationType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Наименование')),
            ],
            options={
                'verbose_name': '(Справочник) Вид мероприятия на спортивной площадке',
                'verbose_name_plural': '(Справочник) Виды мероприятий на спортивной площадке',
            },
        ),
    ]
