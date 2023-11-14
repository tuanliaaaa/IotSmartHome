from rest_framework import serializers

from django.db import transaction
from Entity.models.Sensor import Sensor
class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }

