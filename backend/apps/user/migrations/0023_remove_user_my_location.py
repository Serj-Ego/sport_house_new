# Generated by Django 4.0.7 on 2022-11-21 11:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0022_alter_user_recommendation'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='my_location',
        ),
    ]
