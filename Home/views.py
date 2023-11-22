from django.shortcuts import render
from django.views import View
import os
from django.http import HttpResponse

class Login(View):
    def get(self,request):
        return render(request,'Login.html')
class Room(View):
    def get(self,request):
        return render(request,'Room.html')
class EquipmentByRoom(View):
    def get(self,request,roomID):
        return render(request,'Equipment.html')
