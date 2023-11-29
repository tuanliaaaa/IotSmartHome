from django.urls import path
from .Views.EquipmentView import EquipmentByRoomId,EquipmentById
from .Views.HomeView import HomeByUserLogin,AllHome,SearchHomeByAdmin,HomeDetailByAdmin
from .Views.RoomView import RoomByHomeId,AllRoom,SearchRoomByAdmin,RoomDetailByAdmin
from .Views.Dubao import Recommend
from .Views.token import Token
from .Views.UserViewByAdmin import AllUserByAdmin,UserById,SearchUserByAdmin,UserDetailByAdmin
from .Views.User import UserByLogin
from .Views.ModeView import ModeByUser
from .Views.RoomAdminView import AllRoomAdmin
from .Views.EquipmentAdmView import AllEquipment,SearchEquipmentByAdmin,EquipmentDetailByAdmin
from .Views.EquipmentAdminView import AllEquipmentAdmin
from .Views.SensorView import AllSensor,SearchSensorByAdmin,SensorDetailByAdmin
urlpatterns = [
    path('HomeByUserLogin',HomeByUserLogin.as_view()),
    path('RoomByHomeID/<int:homeID>',RoomByHomeId.as_view()),
    path('EquipmenByRoomID/<int:roomID>',EquipmentByRoomId.as_view()),
    path('EquipmentByID/<int:equipmentID>',EquipmentById.as_view()),
    path('Recommend',Recommend.as_view()),
    path('User/Token',Token.as_view()),
    path('UserByID/<int:UserID>',UserById.as_view()),


    path('AllRoomAdmin',AllRoomAdmin.as_view()),
    path('AllEquipmentAdmin',AllEquipmentAdmin.as_view()),


    path('ModeByUser',ModeByUser.as_view()),


    path('UserByLogin',UserByLogin.as_view()),
    path('AllUserByAdmin',AllUserByAdmin.as_view()),
    path('SearchUserByAdmin/<str:Username>',SearchUserByAdmin.as_view()),
    path('UserDetailByAdmin/<str:UserID>',UserDetailByAdmin.as_view()),

    path('AllHome',AllHome.as_view()),
    path('SearchHomeByAdmin/<str:HomeName>',SearchHomeByAdmin.as_view()),
    path('HomeDetailByAdmin/<str:HomeID>',HomeDetailByAdmin.as_view()),

    path('AllRoom',AllRoom.as_view()),
    path('SearchRoomByAdmin/<str:RoomName>',SearchRoomByAdmin.as_view()),
    path('RoomDetailByAdmin/<str:RoomID>',RoomDetailByAdmin.as_view()),

    path('AllEquipment',AllEquipment.as_view()),
    path('SearchEquipmentByAdmin/<str:EquipmentName>',SearchEquipmentByAdmin.as_view()),
    path('EquipmentDetailByAdmin/<str:EquipmentID>',EquipmentDetailByAdmin.as_view()),

    path('AllSensor',AllSensor.as_view()),
    path('SearchSensorByAdmin/<str:SensorName>',SearchSensorByAdmin.as_view()),
    path('SensorDetailByAdmin/<str:SensorID>',SensorDetailByAdmin.as_view()),


]