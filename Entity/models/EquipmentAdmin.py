from django.db import models
class EquipmentAdmin(models.Model):
    EquipmentAdminName = models.CharField(max_length=225,unique=True)
    EquipmentAdminType = models.IntegerField()
    EquipmentAdminKey = models.CharField(max_length=225,unique=True)
    EquipmentAdminStatus = models.CharField(max_length=225)
