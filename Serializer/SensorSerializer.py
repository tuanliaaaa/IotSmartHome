from rest_framework import serializers

from django.db import transaction
from Entity.models.Sensor import Sensor
from Entity.models.Equipment import Equipment
class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'
class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }
class SensorSerializerEquipment(serializers.ModelSerializer):
    Equipment =  serializers.SerializerMethodField()
    class Meta:
        model = Sensor
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }
    def get_Equipment(self, obj):
        equipmentList = Equipment.objects.filter(sensors=obj)
        if(len(equipmentList)>0):
            return EquipmentSerializer(equipmentList[0]).data
        return []

