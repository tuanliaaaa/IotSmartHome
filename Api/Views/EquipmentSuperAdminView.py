
from Entity.models.EquipmentAdmin import EquipmentAdmin
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.EquipmentAdminSerializer import EquipmentAdminSerializer

from django.utils.decorators import method_decorator
from core.roleLoginDecorater import RoleRequest

class AllEquipmentSuperAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def get(self,request):
        equipmentAdminList =EquipmentAdmin.objects.all()        
        equipmentAdminListSerializer = EquipmentAdminSerializer(equipmentAdminList,many = True)
        return Response(equipmentAdminListSerializer.data,status=200)
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def post(self,request):
        EquipmentListSerializer = EquipmentAdminSerializer(data=request.data)
        if EquipmentListSerializer.is_valid():
            EquipmentListSerializer.save()
            return Response(EquipmentListSerializer.data)
        return Response(EquipmentListSerializer.errors, status=400)
class SearchEquipmentBySuperAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def get(self,request,EquipmentAdminName):
        equipmentAdminList = EquipmentAdmin.objects.filter(EquipmentAdminName__icontains=EquipmentAdminName)
        equipmentListSerializer = EquipmentAdminSerializer(equipmentAdminList,many=True)
        return Response(equipmentListSerializer.data,status=200) 

class EquipmentDetailBySuperAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def get(self,request,EquipmentAdminID):
        try:
            equipmentAdmin= EquipmentAdmin.objects.get(pk=EquipmentAdminID)
            equipmentAdminSerializer = EquipmentAdminSerializer(equipmentAdmin)
            return Response(equipmentAdminSerializer.data,status=200)
        except:
            return Response({"massage":"Equipment Not Found"},status=404)
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def patch(self,request,EquipmentAdminID):
        try:
            equipmentAdmin= EquipmentAdmin.objects.get(pk=EquipmentAdminID)
        except:
            return Response({"massage":"equipmentAdmin Not Found"},status=200)
        equipmentAdminUpdateSerializer = EquipmentAdminSerializer(equipmentAdmin, data=request.data,partial=True)
        if equipmentAdminUpdateSerializer.is_valid():
            equipmentAdminUpdateSerializer.save()
            return Response(equipmentAdminUpdateSerializer.data)
        return Response(equipmentAdminUpdateSerializer.errors, status=400)
    @method_decorator(RoleRequest(allowedRoles=['SuperAdmin']))
    def delete(self,request,EquipmentAdminID):
        try:
            equipment= EquipmentAdmin.objects.get(pk=EquipmentAdminID)
            equipment.delete()
            return Response({'message':'Equipment đã xóa thành công'},status=204)
        except:
            return Response({"message":"Equipment Not Found"},status=404)
    

    
        