# Generated by Django 4.2.7 on 2023-11-28 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Entity', '0012_alter_equipment_equipmentadmin_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roomadmin',
            name='RoomAdminKey',
            field=models.CharField(max_length=225, unique=True),
        ),
        migrations.AlterField(
            model_name='roomadmin',
            name='RoomAdminStatus',
            field=models.CharField(max_length=225),
        ),
    ]
