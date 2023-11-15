from Entity.models.Sensor import Sensor
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.EquipmentSerializer import EquipmentSerializer
from django.db.models import Q

from django.utils.decorators import method_decorator

class EquipmentByRoomId(APIView):
    def get(self,request,roomID):
        try:
            equipmentList = Sensor.objects.filter(Room_pk=roomID)
        except:
            return Response({"massage":"Thiết bị  không tồn tại"},status=204)
        equipmentListSerializer = EquipmentSerializer(equipmentList,many = True)
        return Response(equipmentListSerializer.data,status=200)

class EquipmentById(APIView):
    # @method_decorator(RoleRequest(allowedRoles=['Admin',]))
    def get(self,request,equipmentID):
        try:
            equipment = Sensor.objects.get(pk=equipmentID)
        except:
            return Response({"massage":"Thiết bị  không tồn tại"},status=204)
        equipmentSerializer = EquipmentSerializer(equipment)
        return Response(equipmentSerializer.data,status=200)
    # @method_decorator(RoleRequest(allowedRoles=['Admin',]))
    def patch(self, request, equipmentID):
        try:
            equipment = Sensor.objects.get(pk=equipmentID)
        except:
            return Response({"massage":"Thiết bị  không tồn tại"},status=204)
        equiupmentUpdateSerializer = EquipmentSerializer(equipment, data=request.data, partial=True)
        if equiupmentUpdateSerializer.is_valid():
            equiupmentUpdateSerializer.save()
            return Response(equiupmentUpdateSerializer.data)
        return Response(equiupmentUpdateSerializer.errors, status=400)
        