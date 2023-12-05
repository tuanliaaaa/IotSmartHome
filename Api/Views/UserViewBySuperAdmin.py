from Entity.models.Role import Role
from Entity.models.User import User
from Entity.models.UserRole import UserRole
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.UserSerializer import UserSerializer,UserByAdminSerializer
from datetime import datetime,timedelta,timezone
from django.db.models import Q
from core.roleLoginDecorater import RoleRequest
from django.utils.decorators import method_decorator
import jwt

from core.settings import SECRET_KEY

class AllUserBySuperAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def get(self,request):
        userList = User.objects.filter(userrole__Role__RoleName="Admin")
        userListSerializer = UserByAdminSerializer(userList,many=True)
        return Response(userListSerializer.data,status=200)
class SearchUserBySuperAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def get(self,request,Username):
        userList = User.objects.filter(userrole__Role__RoleName="Admin",UserName__icontains=Username)
        userListSerializer = UserByAdminSerializer(userList,many=True)
        return Response(userListSerializer.data,status=200)  
class UserDetailBySuperAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def get(self,request,UserID):
        try:
            user= User.objects.get(userrole__Role__RoleName="Admin",pk=UserID)
            userSerializer = UserByAdminSerializer(user)
            return Response(userSerializer.data,status=200)
        except:
            return Response({"massage":"User không tồn tại"},status=404)
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def patch(self,request,UserID):
        try:
            user= User.objects.get(userrole__Role__RoleName="Admin",pk=UserID)
            userUpdateSerializer = UserByAdminSerializer(user, data=request.data,partial=True)
            if userUpdateSerializer.is_valid():
                userUpdateSerializer.save()
                return Response(userUpdateSerializer.data)
            return Response(userUpdateSerializer.errors, status=400)
        except:
            return Response({"massage":"User không tồn tại"},status=200)
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def delete(self,request,UserID):
        try:
            user= User.objects.get(userrole__Role__RoleName="Admin",pk=UserID)
            user.delete()
            return Response({'message':'User đã xóa thành công'},status=204)
        except:
            return Response({"message":"User Not Found"},status=404)




class UserById(APIView):
    # @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def get(self,request,UserID):
        try:
            user= User.objects.get(pk=UserID)
            userSerializer = UserByAdminSerializer(user)
            return Response(userSerializer.data,status=200)
        except:
            return Response({"massage":"User không tồn tại"},status=204)   
