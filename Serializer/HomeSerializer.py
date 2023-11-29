from rest_framework import serializers

from Entity.models.Home import Home
from Serializer.RoomSerializer import RoomSerializer
class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }
class HomeRoomsAndSerializer(serializers.ModelSerializer):
    rooms = RoomSerializer(many=True, read_only=True)
    class Meta:
        model = Home
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }
