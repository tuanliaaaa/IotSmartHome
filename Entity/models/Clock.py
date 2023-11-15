from django.db import models
from .Equipment import Equipment
class Clock(models.Model):
    StatusActive = models.CharField(max_length=225)
    TimeAction = models.DateTimeField()
    Equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE,related_name='clocks')