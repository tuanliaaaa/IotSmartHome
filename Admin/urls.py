from django.urls import path
from django.shortcuts import redirect
from .views import Admin,loginAdmin,EditUser,RoomAdmin,SensorAdmin,HomeAdmin,EquimentAdmin
urlpatterns = [
    path('User',Admin.as_view()),
    path('Login',loginAdmin.as_view()),
    path('EditUser/<int:UserID>',EditUser.as_view()),
]