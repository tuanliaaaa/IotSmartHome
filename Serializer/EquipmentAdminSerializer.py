from rest_framework import serializers
from Entity.models.EquipmentAdmin import EquipmentAdmin
class EquipmentAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentAdmin
        fields = '__all__'
