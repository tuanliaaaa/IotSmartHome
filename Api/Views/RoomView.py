from Entity.models.Room import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.RoomSerializer import RoomSerializer
from django.db.models import Q

from django.utils.decorators import method_decorator

class RoomByHomeId(APIView):
    def get(self,request,homeID):
        try:
            roomList = Room.objects.filter(Home_pk=homeID)
        except:
            return Response({"massage":"Phòng không tồn tại"},status=204)
        roomListSerializer = RoomSerializer(roomList,many = True)
        return Response(roomListSerializer.data,status=200)

    
        