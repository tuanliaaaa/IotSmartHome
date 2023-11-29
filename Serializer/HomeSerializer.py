from rest_framework import serializers

from Entity.models.Home import Home
from Entity.models.User import User
from Entity.models.Room import Room
from Entity.models.RoomAdmin import RoomAdmin
from Serializer import HomeSerializer
from Serializer.RoomAdminSerializer import RoomAdminSerializer
from .UserSerializer import UserSerializer
class RoomRoomAdminSerializer(serializers.ModelSerializer):
    RoomAdmin =  serializers.SerializerMethodField()
  

    class Meta:
        model = Room
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }
    def get_RoomAdmin(self, obj):
        room = RoomAdmin.objects.filter(rooms=obj)[0]
        return RoomAdminSerializer(room).data
   


class HomeSerializerUser(serializers.ModelSerializer):
    User =  serializers.SerializerMethodField()
    class Meta:
        model = Home
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }
    def get_User(self, obj):
        user = User.objects.filter(homes=obj)[0]
        return UserSerializer(user).data
class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }
class HomeRooms__roomAdminSerializer(serializers.ModelSerializer):
    User =  serializers.SerializerMethodField()
    rooms = RoomRoomAdminSerializer(many=True, read_only=True)
    class Meta:
        model = Home
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }
    def get_User(self, obj):
        user = User.objects.filter(homes=obj)[0]
        return UserSerializer(user).data
