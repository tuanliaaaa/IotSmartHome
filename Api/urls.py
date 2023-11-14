from django.urls import path
from .Views.SensorView import SensorByRoomId
from .Views.HomeView import HomeByUserId
from .Views.RoomView import RoomByHomeId
urlpatterns = [
    path('HomeByUserID/<int:id>',HomeByUserId.as_view()),
    path('RoomByHomeID/<int:id>',RoomByHomeId.as_view()),
    path('SensorByRoomID/<int:id>',SensorByRoomId.as_view()),
]