from Entity.models.EquipmentAdmin import EquipmentAdmin
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.EquipmentAdminSerializer import EquipmentAdminSerializer

from django.utils.decorators import method_decorator
from core.roleLoginDecorater import RoleRequest

class AllEquipmentAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request):
        equipmentAdminList =EquipmentAdmin.objects.all()        
        equipmentAdminListSerializer = EquipmentAdminSerializer(equipmentAdminList,many = True)
        return Response(equipmentAdminListSerializer.data,status=200)
