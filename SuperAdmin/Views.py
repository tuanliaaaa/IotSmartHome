from django.shortcuts import render
from django.views import View
import os
from django.http import HttpResponse

class UserSuperAdmin(View):
    def get(self,request):
        return render(request,'ManagerUserBySuperAdmin.html')
class loginSuperAdmin(View):
    def get(self,request):
        return render(request,'loginSuperAdmin.html')   
class EquipmentSuperAdmin(View):
    def get(self,request):
        return render(request,'ManageEquipmentBySuperAdmin.html')  
class EditEquipmentSuperAdmin(View):
    def get(self,request,EquipmentAdminID):
        return render(request,'EditEquipmentBySuperAdmin.html')  
class AddEquipmentSuperAdmin(View):
    def get(self,request):
        return render(request,'AddEquipmentBySuperAdmin.html')
class RoomSuperAdmin(View):
    def get(self,request):
        return render(request,'ManagerRoomBySuperAdmin.html')  
class EditRoomSuperAdmin(View):
    def get(self,request,RoomAdminID):
        return render(request,'EditRoomBySuperAdmin.html')  
    
class EditUserSuperAdmin(View):
    def get(self,request,UserAdminID):
        return render(request,'EditUserBySuperAdmin.html')