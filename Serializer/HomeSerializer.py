from rest_framework import serializers

from Entity.models.Home import Home
from Entity.models.User import User
from Serializer.RoomSerializer import RoomSerializer
from Serializer.UserSerializer import UserSerializer
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
    rooms = RoomSerializer(many=True, read_only=True)
    class Meta:
        model = Home
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }
    def get_User(self, obj):
        user = User.objects.filter(homes=obj)[0]
        return UserSerializer(user).data
