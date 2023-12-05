
from Entity.models.RoomAdmin import RoomAdmin
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.RoomAdminSerializer import RoomAdminSerializer

from django.utils.decorators import method_decorator
from core.roleLoginDecorater import RoleRequest

class AllRoomSuperAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def get(self,request):
        roomAdminList =RoomAdmin.objects.all()        
        roomAdminListSerializer = RoomAdminSerializer(roomAdminList,many = True)
        return Response(roomAdminListSerializer.data,status=200)
#     @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
#     def post(self,request):
#         RoomListSerializer = RoomAdminSerializer(data=request.data)
#         if RoomListSerializer.is_valid():
#             RoomListSerializer.save()
#             return Response(RoomListSerializer.data)
#         return Response(RoomListSerializer.errors, status=400)
class SearchRoomBySuperAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def get(self,request,RoomAdminName):
        roomAdminList = RoomAdmin.objects.filter(RoomAdminName__icontains=RoomAdminName)
        roomListSerializer = RoomAdminSerializer(roomAdminList,many=True)
        return Response(roomListSerializer.data,status=200) 

class RoomDetailBySuperAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def get(self,request,RoomAdminID):
        try:
            roomAdmin= RoomAdmin.objects.get(pk=RoomAdminID)
            roomAdminSerializer = RoomAdminSerializer(roomAdmin)
            return Response(roomAdminSerializer.data,status=200)
        except:
            return Response({"massage":"Room Not Found"},status=404)
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def patch(self,request,RoomAdminID):
        try:
            roomAdmin= RoomAdmin.objects.get(pk=RoomAdminID)
        except:
            return Response({"massage":"RoomAdmin Not Found"},status=200)
        roomAdminUpdateSerializer = RoomAdminSerializer(roomAdmin, data=request.data,partial=True)
        if roomAdminUpdateSerializer.is_valid():
            roomAdminUpdateSerializer.save()
            return Response(roomAdminUpdateSerializer.data)
        return Response(roomAdminUpdateSerializer.errors, status=400)
#     @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
#     def delete(self,request,RoomAdminID):
#         try:
#             Room= RoomAdmin.objects.get(pk=RoomAdminID)
#             Room.delete()
#             return Response({'message':'Room đã xóa thành công'},status=204)
#         except:
#             return Response({"message":"Room Not Found"},status=404)
    

    
        