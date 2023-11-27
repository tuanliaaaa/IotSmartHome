from django.urls import path
from django.shortcuts import redirect
from .views import Login,Room,EquipmentByRoom,Alarm
urlpatterns = [
    path('Login',Login.as_view()),
    path('Room',Room.as_view()),
    path('EquipmentByRoom/<int:roomID>',EquipmentByRoom.as_view()),
    path('Alarm/<int:equimentID>',Alarm.as_view()),
]