# Generated by Django 4.2.7 on 2023-11-28 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Entity', '0010_equipmentadmin_equipmentadminkey_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipmentadmin',
            name='EquipmentAdminStatus',
            field=models.CharField(max_length=225, null=True),
        ),
        migrations.AddField(
            model_name='roomadmin',
            name='RoomAdminStatus',
            field=models.CharField(max_length=225, null=True),
        ),
    ]