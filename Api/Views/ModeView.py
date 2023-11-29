from Entity.models.Role import Role
from Entity.models.User import User
from Entity.models.UserRole import UserRole
from Entity.models.Mode import Mode
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.UserSerializer import UserSerializer,UserByAdminSerializer
from Serializer.UserRoleSerializer import UserRolesSerializer
from Serializer.ModeSerializer import ModeSerializer
from datetime import datetime,timedelta,timezone
from django.db.models import Q
from core.roleLoginDecorater import RoleRequest
from django.utils.decorators import method_decorator
import jwt

class ModeByUser(APIView):
    @method_decorator(RoleRequest(allowedRoles=['User']))
    def get(self,request):
        try:
            user= User.objects.get(pk=request.userID)
        except:
            return Response({"message":"User Not Found"},status=404)
        mode = Mode.objects.filter(Home__User=user)[0]
        modeSerializer =ModeSerializer(mode)
        return Response(modeSerializer.data,status=200)
    @method_decorator(RoleRequest(allowedRoles=['User']))
    def patch(self,request):
        try:
            user= User.objects.get(pk=request.userID)
        except:
            return Response({"message":"User Not Found"},status=404)
        mode = Mode.objects.filter(Home__User=user)[0] 
        if request.data['StatusMode']:
            mode.StatusMode=request.data['StatusMode']
            mode.save()
        modeSerializer =ModeSerializer(mode)
        return Response(modeSerializer.data,status=200)