from django.db import models
from .Room import Room
from .EquipmentAdmin import EquipmentAdmin
class Equipment(models.Model):
    StatusActive = models.CharField(max_length=225)
    EquipmentName = models.CharField(max_length=225)
    EquipmentKey = models.CharField(max_length=225)
    EquipmentType = models.IntegerField()
    Room = models.ForeignKey(Room, on_delete=models.CASCADE,related_name='equipments')
    EquipmentAdmin = models.ForeignKey(EquipmentAdmin,on_delete=models.CASCADE,related_name='equipments')