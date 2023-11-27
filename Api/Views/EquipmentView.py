from Entity.models.Equipment import Equipment
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.EquipmentSerializer import EquipmentSerializer
from django.db.models import Q
import requests
import httpx
from django.utils.decorators import method_decorator
def getvalueByEquipmentName(equipmentName):
    url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/get/" + equipmentName

    with httpx.AsyncClient() as client:
        response =  client.get(url)
        if response.status_code == 200:
            json_data = response.json()
            return json_data[0]
        else:
            return None
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
            value= getvalueByEquipmentName(equipment.EquipmentKey)
            equipment.StatusActive=value
            equipment.save()
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
            a = str(request.data['StatusActive'])
            print(a)
            equipment.StatusActive=a
            equipment.save()
            url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/update/"+equipment.EquipmentKey+"?value="+a+"&fbclid=IwAR1swiQo5wywsl5hFCw1eIZRc9MkCtlVY0BZ7RgiozCZtp9Pe5Rn_BPtIlk"
            response = requests.get(url)

            if response.status_code == 200:
                
                return Response(equiupmentUpdateSerializer.data)
            else:
                print(f"Request failed with status code {response.status_code}")
                print(response.text)
                return Response({"message":"khong the thay doi"},status = 400)
        return Response(equiupmentUpdateSerializer.errors, status=400)
        