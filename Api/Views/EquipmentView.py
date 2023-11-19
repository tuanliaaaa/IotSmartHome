from Entity.models.Equipment import Equipment
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.EquipmentSerializer import EquipmentSerializer
from django.db.models import Q
import requests

from django.utils.decorators import method_decorator

class EquipmentByRoomId(APIView):
    def get(self,request,roomID):
        try:
            equipmentList = Equipment.objects.filter(Room_pk=roomID)
        except:
            return Response({"massage":"Thiết bị  không tồn tại"},status=204)
        equipmentListSerializer = EquipmentSerializer(equipmentList,many = True)
        return Response(equipmentListSerializer.data,status=200)

class EquipmentById(APIView):
    # @method_decorator(RoleRequest(allowedRoles=['Admin',]))
    def get(self,request,equipmentID):
        try:
            equipment = Equipment.objects.get(pk=equipmentID)
        except:
            return Response({"massage":"Thiết bị  không tồn tại"},status=204)
        equipmentSerializer = EquipmentSerializer(equipment)
        return Response(equipmentSerializer.data,status=200)
    # @method_decorator(RoleRequest(allowedRoles=['Admin',]))
    def patch(self, request, equipmentID):
        try:
            equipment = Equipment.objects.get(pk=equipmentID)
        except:
            return Response({"massage":"Thiết bị  không tồn tại"},status=204)
        equiupmentUpdateSerializer = EquipmentSerializer(equipment, data=request.data, partial=True)
        if equiupmentUpdateSerializer.is_valid():
            equiupmentUpdateSerializer.save()
            a = request.data['StatusActive']
            b = equipment['EquipmentName']
            url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/update/?value="+a

            response = requests.get(url)

            if response.status_code == 200:
                # Xử lý dữ liệu nhận được từ API
                data = response.json()
                print(data)
                return Response(equiupmentUpdateSerializer.data)
            else:
                print(f"Request failed with status code {response.status_code}")
                print(response.text)
                return Response({"message":"khong the thay doi"},status = 400)
        return Response(equiupmentUpdateSerializer.errors, status=400)
        