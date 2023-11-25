from django.urls import path
from .Views.EquipmentView import EquipmentByRoomId,EquipmentById
from .Views.HomeView import HomeByUserId
from .Views.RoomView import RoomByHomeId
from .Views.Dubao import Recommend
from .Views.token import Token
from .Views.UserView import AllUser,UserById,UserByIdForAdmin
urlpatterns = [
    path('HomeByUserID/<int:userID>',HomeByUserId.as_view()),
    path('RoomByHomeID/<int:homeID>',RoomByHomeId.as_view()),
    path('EquipmenByRoomID/<int:roomID>',EquipmentByRoomId.as_view()),
    path('EquipmentByID/<int:equipmentID>',EquipmentById.as_view()),
    path('Recommend',Recommend.as_view()),
    path('User/Token',Token.as_view()),
     path('AllUser',AllUser.as_view()),
     path('UserByID/<int:UserID>',UserById.as_view()),
     path('UserByIDForAdmin/<int:UserID>',UserByIdForAdmin.as_view()),
]