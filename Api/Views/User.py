from Entity.models.Role import Role
from Entity.models.User import User
from Entity.models.UserRole import UserRole
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.UserSerializer import UserSerializer,UserByAdminSerializer
from Serializer.UserRoleSerializer import UserRolesSerializer
from datetime import datetime,timedelta,timezone
from django.db.models import Q
from core.roleLoginDecorater import RoleRequest
from django.utils.decorators import method_decorator
import jwt
class UserByLogin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin','User']))
    def get(self,request):
        try:
            user= User.objects.get(pk=request.userID)
        except:
            return Response({"message":"User Not Found"},status=404)
        userSerializer = UserRolesSerializer(user)
        return Response(userSerializer.data,status=200)
    # @method_decorator(RoleRequest(allowedRoles=['Admin','NormalUser']))
    # def patch(self,request):
    #     user= User.objects.get(pk=request.userID)
    #     if request.data['FullName']:
    #         user.FullName=request.data['FullName']
    #         user.save()
    #     userSerializer = UserSerializer(user)
    #     return Response(userSerializer.data,status=200)