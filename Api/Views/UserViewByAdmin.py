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
class Signup(APIView):

    def post(self,request):
        userSerializer = UserSerializer(data=request.data)
        if userSerializer.is_valid():
            user=userSerializer.save()
            exp=datetime.now(tz=timezone.utc) + timedelta(minutes=50)
            roles=[]
            role= Role.objects.get(pk=2)
            userrole=UserRole(User=user,Role=role)
            userrole.save()
            userRoles=UserRole.objects.filter(User=user)
            for userRole in userRoles:
                roles.append(userRole.Role.RoleName)
            payLoad = {'UserID':user.pk,"Username":user.UserName,"Roles":roles,"exp":exp}
            jwtData = jwt.encode(payLoad,SECRET_KEY,) 
            jwtUser={"access":jwtData}
            return Response(jwtUser,status=201)
        return Response(userSerializer.errors, status=400)
class AllUserByAdmin(APIView):
    # @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request):
        userList = User.objects.filter(userrole__Role__RoleName="User")
        userListSerializer = UserByAdminSerializer(userList,many=True)
        return Response(userListSerializer.data,status=200)
class SearchUserByAdmin(APIView):
    # @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request,Username):
        userList = User.objects.filter(userrole__Role__RoleName="User",UserName__icontains=Username)
        userListSerializer = UserByAdminSerializer(userList,many=True)
        return Response(userListSerializer.data,status=200)  
class UserDetailByAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request,UserID):
        try:
            user= User.objects.get(userrole__Role__RoleName="User",pk=UserID)
            userSerializer = UserByAdminSerializer(user)
            return Response(userSerializer.data,status=200)
        except:
            return Response({"massage":"User không tồn tại"},status=404)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def patch(self,request,UserID):
        try:
            user= User.objects.get(userrole__Role__RoleName="User",pk=UserID)
            userUpdateSerializer = UserByAdminSerializer(user, data=request.data,partial=True)
            if userUpdateSerializer.is_valid():
                userUpdateSerializer.save()
                return Response(userUpdateSerializer.data)
            return Response(userUpdateSerializer.errors, status=400)
        except:
            return Response({"massage":"User không tồn tại"},status=200)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def delete(self,request,UserID):
        try:
            user= User.objects.get(userrole__Role__RoleName="User",pk=UserID)
            user.delete()
            return Response({'message':'User đã xóa thành công'},status=204)
        except:
            return Response({"message":"User Not Found"},status=404)




class UserById(APIView):
    # @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request,UserID):
        try:
            user= User.objects.get(pk=UserID)
            userSerializer = UserByAdminSerializer(user)
            return Response(userSerializer.data,status=200)
        except:
            return Response({"massage":"User không tồn tại"},status=204)   


class ChangePassword(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin','NormalUser']))
    def patch(self,request):
        user= User.objects.get(pk=request.userID)
        if not request.data['PasswordNew']:
            return Response({"mesage":"Vui lòng nhập Password mới"},status=200)
        if not request.data['Password']:
            return Response({"mesage":"Vui lòng nhập Password cũ"},status=200)
        if user.Password !=request.data['Password']:
            return Response({"mesage":"Sai Password cũ"},status=200)
        else:
            user.Password =request.data['PasswordNew']
            user.save()
            userSerializer=UserSerializer(user)
        return Response(userSerializer.data,status=200)