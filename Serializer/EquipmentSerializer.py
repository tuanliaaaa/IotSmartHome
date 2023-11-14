from rest_framework import serializers
from Entity.models.Equipment import Equipment
class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'
