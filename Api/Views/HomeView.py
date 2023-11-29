from Entity.models.Home import Home
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.HomeSerializer import HomeRoomsAndSerializer
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
        
        homeListSerializer = HomeRoomsAndSerializer(homeList,many = True)
        return Response(homeListSerializer.data,status=200)
    

    
        