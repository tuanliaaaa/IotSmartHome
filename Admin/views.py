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
class EditRoom(View):
    def get(self,request,RoomID):
        return render(request,'EditRoomByAdmin.html') 
class HomeAdmin(View):
    def get(self,request):
        return render(request,"ManagerHomeByAdmin.html")
class EquipmentAdmin(View):
    def get(self,request):
        return render(request,"ManagerEquipmentByAdmin.html")
class EditEquipment(View):
    def get(self,request,EquipmentID):
        return render(request,'EditEquipmentByAdmin.html') 
class AddEquipment(View):
    def get(self,request):
        return render(request,'AddEquipmentByAdmin.html') 
class SensorAdmin(View):
    def get(self,request):
        return render(request,"SensorAdmin.html")
class EquimentAdmin(View):
    def get(self,request):
        return render(request,"EquimentAdmin.html")
class EditHome(View):
    def get(self,request,HomeID):
        return render(request,'EditHomeByAdmin.html') 
class AddHome(View):
    def get(self,request):
        return render(request,'AddHomeByAdmin.html') 
class AddRoom(View):
    def get(self,request):
        return render(request,'AddRoomByAdmin.html') 
    