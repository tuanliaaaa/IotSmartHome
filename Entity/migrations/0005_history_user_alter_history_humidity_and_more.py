# Generated by Django 4.2.7 on 2023-11-19 09:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Entity', '0004_alter_equipment_equipmenttype'),
    ]

    operations = [
        migrations.AddField(
            model_name='history',
            name='User',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Entity.user'),
        ),
        migrations.AlterField(
            model_name='history',
            name='Humidity',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='history',
            name='Temprature',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
