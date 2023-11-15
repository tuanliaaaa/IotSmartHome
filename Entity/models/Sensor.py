from django.db import models
from .Equipment import Equipment
class Sensor(models.Model):
    SensorIP = models.CharField(max_length=225)
    SensorName = models.CharField(max_length=225)
    StatusSensor = models.CharField(max_length=225)
    Equipment = models.ForeignKey(Equipment, on_delete=models.SET_NULL, null=True, blank=True,related_name='sensors')