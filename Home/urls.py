from django.urls import path
from django.shortcuts import redirect
from .views import Login,Room,EquipmentByRoom,EquipmentDetail,image_view
urlpatterns = [
    path('Login',Login.as_view()),
    path('Room',Room.as_view()),
    path('EquipmentByRoom/<int:roomID>',EquipmentByRoom.as_view()),
    path('EquipmentDetail/<int:equimentID>',EquipmentDetail.as_view()),
    path('Home/Media/Image/<str:image_name>',image_view),
]