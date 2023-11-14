from Entity.models.Home import Home
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.HomeSerializer import HomeSerializer
from django.db.models import Q

from django.utils.decorators import method_decorator

class HomeByUserId(APIView):
    def get(self,request,id):
        try:
            home = Home.objects.filter(pk=id)
            homeList = []
            for i in home:
                homeList.append(i)
            homeSerializer = HomeSerializer(homeList,many = True)
            return Response(homeSerializer.data,status=200)
        except:
            return Response({"massage":"Nhà không tồn tại"},status=204)

    
        