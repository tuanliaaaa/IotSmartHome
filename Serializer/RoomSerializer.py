from rest_framework import serializers
from Entity.models.Room import Room
from Entity.models.RoomAdmin import RoomAdmin
from Serializer.RoomAdminSerializer import RoomAdminSerializer
class RoomSerializer(serializers.ModelSerializer):
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

