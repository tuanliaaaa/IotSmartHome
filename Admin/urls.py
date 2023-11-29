from django.urls import path
from django.shortcuts import redirect
from .views import (Admin,loginAdmin,EditUser,RoomAdmin,SensorAdmin,HomeAdmin,EquimentAdmin,EditHome,AddHome,EditRoom
,EquipmentAdmin)
from .views import AddRoom,AddEquipment,EditEquipment
urlpatterns = [
    path('Login',loginAdmin.as_view()),
    path('User',Admin.as_view()),
    path('EditUser/<int:UserID>',EditUser.as_view()),
    path('RoomAdmin',RoomAdmin.as_view()),
    path('EditRoom/<int:RoomID>',EditRoom.as_view()),
    path('AddRoom',AddRoom.as_view()),

    path('HomeAdmin',HomeAdmin.as_view()),
    path('EditHome/<int:HomeID>',EditHome.as_view()),
    path('AddHome',AddHome.as_view()),

    path('EquipmentAdmin',EquipmentAdmin.as_view()),
    path('EditEquipment/<int:EquipmentID>',EditEquipment.as_view()),
    path('AddEquipment',AddEquipment.as_view()),

]