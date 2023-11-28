from django.db import models
from .Home import Home
from . RoomAdmin import RoomAdmin
class Room(models.Model):
    RoomName = models.CharField(max_length=225)
    Home = models.ForeignKey(Home, on_delete=models.CASCADE,related_name='rooms')
    RoomAdmin =models.ForeignKey(RoomAdmin,on_delete=models.CASCADE,related_name='roomAdmin')