from Entity.models.Room import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.RoomSerializer import RoomRoomAdminSerializer,RoomRoomAdminAndHomeAndEquipmentSerializer,RoomRoomAdminAndHomeSerializer,RoomSerializer
from django.db.models import Q

from django.utils.decorators import method_decorator
from core.roleLoginDecorater import RoleRequest

class RoomByHomeId(APIView):
    def get(self,request,homeID):
        try:
            roomList = Room.objects.filter(Home_pk=homeID)
        except:
            return Response({"massage":"Phòng không tồn tại"},status=204)
        roomListSerializer = RoomRoomAdminSerializer(roomList,many = True)
        return Response(roomListSerializer.data,status=200)
class AllRoom(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request):
        roomList =Room.objects.all()        
        roomListSerializer = RoomRoomAdminAndHomeSerializer(roomList,many = True)
        return Response(roomListSerializer.data,status=200)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def post(self,request):
        roomListSerializer = RoomSerializer(data=request.data)
        if roomListSerializer.is_valid():
            roomListSerializer.save()
            return Response(roomListSerializer.data)
        return Response(roomListSerializer.errors, status=400)
class SearchRoomByAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request,RoomName):
        roomList = Room.objects.filter(RoomName__icontains=RoomName)
        roomListSerializer = RoomRoomAdminAndHomeSerializer(roomList,many=True)
        return Response(roomListSerializer.data,status=200)  
class RoomDetailByAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request,RoomID):
        try:
            room= Room.objects.get(pk=RoomID)
            roomSerializer = RoomRoomAdminAndHomeAndEquipmentSerializer(room)
            return Response(roomSerializer.data,status=200)
        except:
            return Response({"massage":"Room Not Found"},status=404)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def patch(self,request,RoomID):
        try:
            room= Room.objects.get(pk=RoomID)
        except:
            return Response({"massage":"Home Not Found"},status=200)
        roomUpdateSerializer = RoomSerializer(room, data=request.data,partial=True)
        if roomUpdateSerializer.is_valid():
            roomUpdateSerializer.save()
            return Response(roomUpdateSerializer.data)
        return Response(roomUpdateSerializer.errors, status=400)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def delete(self,request,RoomID):
        try:
            room= Room.objects.get(pk=RoomID)
            room.delete()
            return Response({'message':'Home đã xóa thành công'},status=204)
        except:
            return Response({"message":"Home Not Found"},status=404)
    

    
        