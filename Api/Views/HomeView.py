from Entity.models.Home import Home
from Entity.models.User import User
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.HomeSerializer import HomeRooms__roomAdminSerializer,HomeSerializer,HomeSerializerUser
from django.db.models import Q
from core.roleLoginDecorater import RoleRequest
from django.utils.decorators import method_decorator

class HomeByUserLogin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin','User']))
    def get(self,request):
        try:
            homeList = Home.objects.filter(User__pk = request.userID)
            
        except:
            return Response({"massage":"Nhà không tồn tại"},status=404)
        
        homeListSerializer = HomeRooms__roomAdminSerializer(homeList,many = True)
        return Response(homeListSerializer.data,status=200)
class AllHome(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request):
        homeList =Home.objects.all()        
        homeListSerializer = HomeSerializerUser(homeList,many = True)
        return Response(homeListSerializer.data,status=200)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def post(self,request):
        userID = request.data.get('User', None)
        if userID is None:
            return Response({"message":"vui lòng nhập userID"}, status=404)
        else:
            try:
                user = User.objects.get(pk=userID)
            except:
                return Response({"message":"User Not Found"}, status=404)
            home = Home.objects.filter(User=user)
            if(len(home)>1):
                return Response({"message":"User Đã Có Nhà"}, status=404)   
            homeListSerializer = HomeSerializer(data=request.data)
            if homeListSerializer.is_valid():
                homeListSerializer.save()
                return Response(homeListSerializer.data)
            return Response(homeListSerializer.errors, status=400)
class SearchHomeByAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request,HomeName):
        homeList = Home.objects.filter(HomeName__icontains=HomeName)
        homeListSerializer = HomeSerializerUser(homeList,many=True)
        return Response(homeListSerializer.data,status=200)  
class HomeDetailByAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request,HomeID):
        try:
            home= Home.objects.get(pk=HomeID)
            homeSerializer = HomeRooms__roomAdminSerializer(home)
            return Response(homeSerializer.data,status=200)
        except:
            return Response({"massage":"Home Not Found"},status=404)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def patch(self,request,HomeID):
        try:
            home= Home.objects.get(pk=HomeID)
        except:
            return Response({"massage":"Home Not Found"},status=200)
        homeUpdateSerializer = HomeSerializer(home, data=request.data,partial=True)
        if homeUpdateSerializer.is_valid():
            homeUpdateSerializer.save()
            return Response(homeUpdateSerializer.data)
        return Response(homeUpdateSerializer.errors, status=400)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def delete(self,request,HomeID):
        try:
            home= Home.objects.get(pk=HomeID)
            home.delete()
            return Response({'message':'Home đã xóa thành công'},status=204)
        except:
            return Response({"message":"Home Not Found"},status=404)
    

    
        