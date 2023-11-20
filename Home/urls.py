from django.urls import path
from django.shortcuts import redirect
from .views import Home,Login,Room
urlpatterns = [
    path('', lambda request: redirect('Home')),
    path('Home/', Home.as_view(),name='Home'),
    path('Login',Login.as_view()),
    path('Room',Room.as_view()),
]