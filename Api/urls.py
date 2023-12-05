from django.urls import path
from .Views.EquipmentView import EquipmentByRoomId,EquipmentById,ControllEquipmentByVoice
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
from .Views.ClockView import ClockAll,ClockByID
from .Views.CsvView import CSV
from .Views.EquipmentSuperAdminView import AllEquipmentSuperAdmin,SearchEquipmentBySuperAdmin,EquipmentDetailBySuperAdmin
from .Views.RoomSuperAdmin import AllRoomSuperAdmin,SearchRoomBySuperAdmin,RoomDetailBySuperAdmin
from .Views.UserViewBySuperAdmin import UserDetailBySuperAdmin,AllUserBySuperAdmin,SearchUserBySuperAdmin
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

    path('ClockAll',ClockAll.as_view()),
    path('ClockByID/<int:equipmentID>',ClockByID.as_view()),

    path('CSV',CSV.as_view()),
    path('ControllEquipmentByVoice',ControllEquipmentByVoice.as_view()),


    # --------------- SuperAdmin---------------
    path('AllEquipmentSuperAdmin',AllEquipmentSuperAdmin.as_view()),
    path('SearchEquipmentBySuperAdmin/<str:EquipmentAdminName>',SearchEquipmentBySuperAdmin.as_view()),
    path('EquipmentDetailBySuperAdmin/<str:EquipmentAdminID>',EquipmentDetailBySuperAdmin.as_view()),

    path('AllRoomSuperAdmin',AllRoomSuperAdmin.as_view()),
    path('SearchRoomBySuperAdmin/<str:RoomAdminName>',SearchRoomBySuperAdmin.as_view()),
    path('RoomDetailBySuperAdmin/<str:RoomAdminID>',RoomDetailBySuperAdmin.as_view()),

    path('AllUserBySuperAdmin',AllUserBySuperAdmin.as_view()),
    path('SearchUserBySuperAdmin/<str:Username>',SearchUserBySuperAdmin.as_view()),
    path('UserDetailBySuperAdmin/<str:UserID>',UserDetailBySuperAdmin.as_view()),
]