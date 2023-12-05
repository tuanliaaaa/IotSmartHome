from django.urls import path
from django.shortcuts import redirect
from .Views import (UserSuperAdmin,loginSuperAdmin,EquipmentSuperAdmin,EditEquipmentSuperAdmin,AddEquipmentSuperAdmin
,RoomSuperAdmin,EditRoomSuperAdmin)

urlpatterns = [
    path('Login',loginSuperAdmin.as_view()),
    path('EquipmentSuperAdmin',EquipmentSuperAdmin.as_view()),
    path('EditEquipmentSuperAdmin/<int:EquipmentAdminID>',EditEquipmentSuperAdmin.as_view()),
    path('AddEquipmentSuperAdmin',AddEquipmentSuperAdmin.as_view()),

    path('RoomSuperAdmin',RoomSuperAdmin.as_view()),
    path('EditRoomSuperAdmin/<int:RoomAdminID>',EditRoomSuperAdmin.as_view()),
    # path('AddRoomSuperAdmin',AddRoomSuperAdmin.as_view()),

]