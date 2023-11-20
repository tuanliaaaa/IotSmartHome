from Entity.models.Home import Home
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.HomeSerializer import HomeSerializer
from django.db.models import Q

from django.utils.decorators import method_decorator

class HomeByUserId(APIView):
    def get(self,request,userID):
        try:
            homeList = Home.objects.filter(User__pk = userID)
            
        except:
            return Response({"massage":"Nhà không tồn tại"},status=204)
        
        homeListSerializer = HomeSerializer(homeList,many = True)
        print(homeListSerializer)
        return Response(homeListSerializer.data,status=200)
    

    
        