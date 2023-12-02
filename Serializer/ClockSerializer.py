from rest_framework import serializers
from Entity.models.Clock import Clock
class ClockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clock
        fields = '__all__'
