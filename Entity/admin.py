from django.contrib import admin
from . models import *
# Register your models here.
admin.site.register(User.User)
admin.site.register(Role.Role)
admin.site.register(UserRole.UserRole)
admin.site.register(Home.Home)
admin.site.register(Room.Room)
admin.site.register(Equipment.Equipment)
admin.site.register(Sensor.Sensor)

