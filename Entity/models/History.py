from django.db import models
from .Equipment import Equipment
class History(models.Model):
    StatusActive = models.CharField(max_length=225)
    Temprature = models.FloatField()
    Humidity= models.FloatField()
    Equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE,related_name='histories')