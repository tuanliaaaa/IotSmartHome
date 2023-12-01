from django.shortcuts import render
from django.views import View
import os
from django.http import HttpResponse

class Admin(View):
    def get(self,request):
        return render(request,'ManagerUserByAdmin.html')
class loginSuperAdmin(View):
    def get(self,request):
        return render(request,'loginSuperAdmin.html')   

    