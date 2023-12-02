from Entity.models.Clock import Clock
from Entity.models.User import User
from rest_framework.views import APIView
from rest_framework.response import Response
from Serializer.ClockSerializer import ClockSerializer
from django.db.models import Q
from core.roleLoginDecorater import RoleRequest
from django.utils.decorators import method_decorator

class ClockAll(APIView):
    @method_decorator(RoleRequest(allowedRoles=['User']))
    def get(self,request):
        try:
            clock = Clock.objects.filter(Equipment__Room__Home__User__pk = request.userID) 
        except:
            return Response({"massage":"Nhà không tồn tại"},status=404)
        
        clockListSerializer = ClockSerializer(clock,many = True)
        return Response(clockListSerializer.data,status=200)
    @method_decorator(RoleRequest(allowedRoles=['User']))
    def post(self,request):
        clockListSerializer = ClockSerializer(data=request.data)
        if clockListSerializer.is_valid():
            clockListSerializer.save()
            return Response(clockListSerializer.data,status=201)
        return Response(clockListSerializer.errors, status=400)
class ClockByID(APIView):
    @method_decorator(RoleRequest(allowedRoles=['User']))
    def get(self,request,equipmentID):
        try:
            clock = Clock.objects.filter(Equipment__pk = equipmentID) 
        except:
            return Response({"massage":"Equipment không tồn tại"},status=404)
        
        clockListSerializer = ClockSerializer(clock,many = True)
        return Response(clockListSerializer.data,status=200)
    @method_decorator(RoleRequest(allowedRoles=['User']))
    def delete(self,request,equipmentID):
        try:
            clock = Clock.objects.filter(pk = equipmentID) 
        except:
            return Response({"massage":"Equipment không tồn tại"},status=404)
        
        clock.delete()
        return Response({"message":"xóa thành công"},status=204)