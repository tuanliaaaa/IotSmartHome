from django.urls import path
from django.shortcuts import redirect
from .Views import (Admin,loginSuperAdmin)
urlpatterns = [
    path('Login',loginSuperAdmin.as_view()),
]