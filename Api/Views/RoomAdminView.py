from Entity.models.RoomAdmin import RoomAdmin
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.RoomAdminSerializer import RoomAdminSerializer

from django.utils.decorators import method_decorator
from core.roleLoginDecorater import RoleRequest

class AllRoomAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request):
        roomAdminList =RoomAdmin.objects.all()        
        roomAdminListSerializer = RoomAdminSerializer(roomAdminList,many = True)
        return Response(roomAdminListSerializer.data,status=200)
