from django.db import models
class RoomAdmin(models.Model):
    RoomAdminName = models.CharField(max_length=225,unique=True)
    RoomAdminKey = models.CharField(max_length=225,unique=True)
    RoomAdminStatus = models.CharField(max_length=225)
    
