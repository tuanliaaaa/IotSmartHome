from django.shortcuts import render
from django.views import View
import os
from django.http import HttpResponse
# from core.settings import MEDIA_ROOT
class Home(View):
    def get(self, request):
        return render(request, 'Home.html')
class Login(View):
    def get(self,request):
        return render(request,'Login.html')
class Room(View):
    def get(self,request):
        return render(request,'Room.html')
