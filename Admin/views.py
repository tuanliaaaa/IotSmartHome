from django.shortcuts import render
from django.views import View
import os
from django.http import HttpResponse

class Admin(View):
    def get(self,request):
        return render(request,'ManagerUserByAdmin.html')
class loginAdmin(View):
    def get(self,request):
        return render(request,'loginAdmin.html')   
class EditUser(View):
    def get(self,request,UserID):
        return render(request,'EditUserByAdmin.html') 
class RoomAdmin(View):
    def get(self,request):
        return render(request,"ManagerRoomByAdmin.html")
class HomeAdmin(View):
    def get(self,request):
        return render(request,"HomeAdmin.html")
class SensorAdmin(View):
    def get(self,request):
        return render(request,"SensorAdmin.html")
class EquimentAdmin(View):
    def get(self,request):
        return render(request,"EquimentAdmin.html")