from Entity.models.Sensor import Sensor
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.SensorSerializer import SensorSerializer
from django.db.models import Q

from django.utils.decorators import method_decorator

class SensorByRoomId(APIView):
    def get(self,request,id):
        try:
            sen = Sensor.objects.filter(pk=id)
            senList = []
            for i in sen:
                senList.append(i)
            senSerializer = SensorSerializer(senList,many = True)
            return Response(senSerializer.data,status=200)
        except:
            return Response({"massage":"Thiết bị  không tồn tại"},status=204)

    
        