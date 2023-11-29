from django.urls import path
from django.shortcuts import redirect
from .views import Admin,loginAdmin,EditUser,RoomAdmin,SensorAdmin,HomeAdmin,EquimentAdmin,EditHome,AddHome
urlpatterns = [
    path('Login',loginAdmin.as_view()),
    path('User',Admin.as_view()),
    path('EditUser/<int:UserID>',EditUser.as_view()),
    path('RoomAdmin',RoomAdmin.as_view()),

    path('HomeAdmin',HomeAdmin.as_view()),
    path('EditHome/<int:HomeID>',EditHome.as_view()),
    path('AddHome',AddHome.as_view()),

]