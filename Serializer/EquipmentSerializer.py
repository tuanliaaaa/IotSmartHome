from rest_framework import serializers
from Entity.models.Equipment import Equipment
from Entity.models.EquipmentAdmin import EquipmentAdmin
from Entity.models.Room import Room
from Entity.models.Sensor import Sensor
from Serializer.EquipmentAdminSerializer import EquipmentAdminSerializer
from Serializer.SensorSerializer import SensorSerializer
from Serializer import RoomSerializer
class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'
class EquipmentEquipmentAdminSerializer(serializers.ModelSerializer):
    EquipmentAdmin =  serializers.SerializerMethodField()

    class Meta:
        model = Equipment
        fields = '__all__'
    def get_EquipmentAdmin(self, obj):
        equipment = EquipmentAdmin.objects.filter(equipments=obj)
        if(len(equipment)>0):
            return EquipmentAdminSerializer(equipment[0]).data
        return []
class EquipmentEquipmentAdminAndRoomSerializer(serializers.ModelSerializer):
    EquipmentAdmin =  serializers.SerializerMethodField()
    Room = serializers.SerializerMethodField()
    class Meta:
        model = Equipment
        fields = '__all__'
    def get_EquipmentAdmin(self, obj):
        equipment = EquipmentAdmin.objects.filter(equipments=obj)
        if(len(equipment)>0):
            return EquipmentAdminSerializer(equipment[0]).data
        return []
    def get_Room(self, obj):
        room = Room.objects.filter(equipments=obj)
        if(len(room)>0):
            return RoomSerializer.RoomSerializer(room[0]).data
        else:return []
class EquipmentEquipmentAdminAndRoomAndSensorSerializer(serializers.ModelSerializer):
    EquipmentAdmin =  serializers.SerializerMethodField()
    Room = serializers.SerializerMethodField()
    Sensors =serializers.SerializerMethodField()
    class Meta:
        model = Equipment
        fields = '__all__'
    def get_EquipmentAdmin(self, obj):
        equipment = EquipmentAdmin.objects.filter(equipments=obj)
        if(len(equipment)>0):
            return EquipmentAdminSerializer(equipment[0]).data
        return []
    def get_Room(self, obj):
        room = Room.objects.filter(equipments=obj)
        if(len(room)>0):
            return RoomSerializer.RoomSerializer(room[0]).data
        else:return []
    def get_Sensors(self,obj):
        sensorList = Sensor.objects.filter(Equipment=obj)
        return SensorSerializer(sensorList,many=True).data
