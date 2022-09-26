# Generated by Django 4.1.1 on 2022-09-23 07:16

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_pokemon_types'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pokemon',
            name='types',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, default=list, size=None),
        ),
    ]
