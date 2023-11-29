from Entity.models.Equipment import Equipment
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.EquipmentSerializer import EquipmentEquipmentAdminSerializer,EquipmentEquipmentAdminAndRoomSerializer,EquipmentEquipmentAdminAndRoomAndSensorSerializer,EquipmentSerializer
from django.db.models import Q

from django.utils.decorators import method_decorator
from core.roleLoginDecorater import RoleRequest

class EquipmentByHomeId(APIView):
    def get(self,request,homeID):
        try:
            EquipmentList = Equipment.objects.filter(Home_pk=homeID)
        except:
            return Response({"massage":"Equipment Not Found"},status=204)
        EquipmentListSerializer = EquipmentEquipmentAdminSerializer(EquipmentList,many = True)
        return Response(EquipmentListSerializer.data,status=200)
class AllEquipment(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request):
        EquipmentList =Equipment.objects.all()        
        EquipmentListSerializer = EquipmentEquipmentAdminAndRoomSerializer(EquipmentList,many = True)
        return Response(EquipmentListSerializer.data,status=200)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def post(self,request):
        EquipmentListSerializer = EquipmentSerializer(data=request.data)
        if EquipmentListSerializer.is_valid():
            EquipmentListSerializer.save()
            return Response(EquipmentListSerializer.data)
        return Response(EquipmentListSerializer.errors, status=400)
class SearchEquipmentByAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request,EquipmentName):
        equipmentList = Equipment.objects.filter(EquipmentName__icontains=EquipmentName)
        equipmentListSerializer = EquipmentEquipmentAdminAndRoomSerializer(equipmentList,many=True)
        return Response(equipmentListSerializer.data,status=200)  
class EquipmentDetailByAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request,EquipmentID):
        try:
            equipment= Equipment.objects.get(pk=EquipmentID)
            equipmentSerializer = EquipmentEquipmentAdminAndRoomAndSensorSerializer(equipment)
            return Response(equipmentSerializer.data,status=200)
        except:
            return Response({"massage":"Equipment Not Found"},status=404)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def patch(self,request,EquipmentID):
        try:
            equipment= Equipment.objects.get(pk=EquipmentID)
        except:
            return Response({"massage":"Home Not Found"},status=200)
        equipmentUpdateSerializer = EquipmentSerializer(equipment, data=request.data,partial=True)
        if equipmentUpdateSerializer.is_valid():
            equipmentUpdateSerializer.save()
            return Response(equipmentUpdateSerializer.data)
        return Response(equipmentUpdateSerializer.errors, status=400)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def delete(self,request,EquipmentID):
        try:
            equipment= Equipment.objects.get(pk=EquipmentID)
            equipment.delete()
            return Response({'message':'Equipment đã xóa thành công'},status=204)
        except:
            return Response({"message":"Equipment Not Found"},status=404)
    

    
        