from rest_framework import serializers
from Entity.models.Room import Room
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
