from django.db import models
from .Room import Room
class Equipment(models.Model):
    StatusActive = models.CharField(max_length=225)
    EquipmentName = models.CharField(max_length=225)
    Room = models.ForeignKey(Room, on_delete=models.CASCADE,related_name='equipments')