from Entity.models.Sensor import Sensor
from Entity.models.Equipment import Equipment
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.SensorSerializer import SensorSerializer,SensorSerializerEquipment
from django.db.models import Q
from core.roleLoginDecorater import RoleRequest
from django.utils.decorators import method_decorator

class AllSensor(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request):
        SensorList =Sensor.objects.all()        
        SensorListSerializer = SensorSerializerEquipment(SensorList,many = True)
        return Response(SensorListSerializer.data,status=200)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def post(self,request):
        try:
            equipment = Equipment.objects.get(pk=request.data.get('Equipment'))
        except:
            return Response({"message":"Equipment Not Found"}, status=404)
        sensorListSerializer = SensorSerializer(data=request.data)
        if sensorListSerializer.is_valid():
            sensorListSerializer.save()
            return Response(sensorListSerializer.data)
        return Response(sensorListSerializer.errors, status=400)
class SearchSensorByAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request,SensorName):
        sensorList = Sensor.objects.filter(SensorName__icontains=SensorName)
        sensorListSerializer = SensorSerializerEquipment(sensorList,many=True)
        return Response(sensorListSerializer.data,status=200)  
class SensorDetailByAdmin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def get(self,request,SensorID):
        try:
            sensor= Sensor.objects.get(pk=SensorID)
            sensorSerializer = SensorSerializerEquipment(sensor)
            return Response(sensorSerializer.data,status=200)
        except:
            return Response({"massage":"Sensor Not Found"},status=404)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def patch(self,request,SensorID):
        try:
            sensor= Sensor.objects.get(pk=SensorID)
          
        except:
            return Response({"massage":"Sensor Not Found"},status=404)
        sensorUpdateSerializer = SensorSerializer(sensor, data=request.data,partial=True)
        if sensorUpdateSerializer.is_valid():
            sensorUpdateSerializer.save()
            return Response(sensorUpdateSerializer.data,status=200)
        return Response(sensorUpdateSerializer.errors, status=400)
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def delete(self,request,SensorID):
        try:
            sensor= Sensor.objects.get(pk=SensorID)
            sensor.delete()
            return Response({'message':'Sensor đã xóa thành công'},status=204)
        except:
            return Response({"message":"Sensor Not Found"},status=404)
    

    
        