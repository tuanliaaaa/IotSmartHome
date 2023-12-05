from Entity.models.Role import Role
from Entity.models.User import User
from Entity.models.UserRole import UserRole
from Entity.models.Equipment import Equipment
from Entity.models.History import History
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.UserSerializer import UserSerializer,UserByAdminSerializer
from Serializer.UserRoleSerializer import UserRolesSerializer
from Serializer.HistorySerializer import HistorySerializer
from datetime import datetime,timedelta,timezone
from django.db.models import Q
from core.roleLoginDecorater import RoleRequest
from django.utils.decorators import method_decorator
import jwt
import requests
class HistoryByIdEquipment(APIView):
    @method_decorator(RoleRequest(allowedRoles=['User']))
    def post(self,request,idEquipment):
        equipment = Equipment.objects.get(pk=idEquipment)
        user = User.objects.get(pk=request.userID)
        statusactive = request.data['StatusActive']
        temprature = request.data['Temprature']
        humidity= request.data['Humidity']
        time = datetime.now()
        statusp1=0
        statusp2=0
        statusp3=0
        url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/get/V15?&fbclid=IwAR1swiQo5wywsl5hFCw1eIZRc9MkCtlVY0BZ7RgiozCZtp9Pe5Rn_BPtIlk"
        response = requests.get(url)
        if response.status_code == 200:
            statusp1=response.json()[0]
        url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/get/V16?&fbclid=IwAR1swiQo5wywsl5hFCw1eIZRc9MkCtlVY0BZ7RgiozCZtp9Pe5Rn_BPtIlk"
        response = requests.get(url)
        if response.status_code == 200:
            statusp2=response.json()[0]
        url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/get/V17?&fbclid=IwAR1swiQo5wywsl5hFCw1eIZRc9MkCtlVY0BZ7RgiozCZtp9Pe5Rn_BPtIlk"
        response = requests.get(url)
        if response.status_code == 200:
            statusp3=response.json()[0]
        statusroom = str(statusp1)+str(statusp2)+str(statusp3)
        history = History(Equipment=equipment,User = user,StatusActive = statusactive,Temprature = temprature,Humidity=humidity,Time=time,StatusRoom =statusroom)
        history.save()
        historySerializer = HistorySerializer(history)
        print("hjhh")
        return Response(historySerializer.data,status=200)