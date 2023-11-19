from django.db import models
from .Home import Home
class Room(models.Model):
    RoomName = models.CharField(max_length=225)
    Home = models.ForeignKey(Home, on_delete=models.CASCADE,related_name='rooms')