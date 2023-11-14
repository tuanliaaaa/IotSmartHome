from Entity.models.Room import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.RoomSerializer import RoomSerializer
from django.db.models import Q

from django.utils.decorators import method_decorator

class RoomByHomeId(APIView):
    def get(self,request,id):
        try:
            room = Room.objects.filter(pk=id)
            roomList = []
            for i in room:
                roomList.append(i)
            roomSerializer = RoomSerializer(roomList,many = True)
            return Response(roomSerializer.data,status=200)
        except:
            return Response({"massage":"Phòng không tồn tại"},status=204)

    
        