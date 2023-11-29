from rest_framework import serializers
from Entity.models.Room import Room
from Entity.models.Home import Home
from Entity.models.RoomAdmin import RoomAdmin
from Entity.models.Equipment import Equipment
from Serializer.RoomAdminSerializer import RoomAdminSerializer
from Serializer import HomeSerializer
class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }
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
class RoomRoomAdminAndHomeSerializer(serializers.ModelSerializer):
    RoomAdmin =  serializers.SerializerMethodField()
    Home = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }
    def get_RoomAdmin(self, obj):
        room = RoomAdmin.objects.filter(rooms=obj)[0]
        return RoomAdminSerializer(room).data
    def get_Home(self, obj):
        home = Home.objects.filter(rooms=obj)[0]
        return HomeSerializer.HomeSerializer(home).data
class RoomRoomAdminAndHomeAndEquipmentSerializer(serializers.ModelSerializer):
    RoomAdmin =  serializers.SerializerMethodField()
    Home = serializers.SerializerMethodField()
    Equipments = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }
    def get_RoomAdmin(self, obj):
        room = RoomAdmin.objects.filter(rooms=obj)[0]
        return RoomAdminSerializer(room).data
    def get_Home(self, obj):
        home = Home.objects.filter(rooms=obj)[0]
        return HomeSerializer.HomeSerializer(home).data
    def get_Equipments(self, obj):
        equipmentList = Equipment.objects.filter(Room=obj)
        return EquipmentSerializer(equipmentList,many=True).data