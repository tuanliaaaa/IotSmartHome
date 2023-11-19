from django.db import models
from .Equipment import Equipment
from .User import User
class History(models.Model):
    StatusActive = models.CharField(max_length=225)
    Temprature = models.FloatField(null=True, blank=True)
    Humidity= models.FloatField(null=True, blank=True)
    Equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE,related_name='histories')
    User = models.ForeignKey(User,on_delete=models.CASCADE)