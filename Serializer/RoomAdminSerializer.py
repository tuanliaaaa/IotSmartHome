from rest_framework import serializers
from Entity.models.RoomAdmin import RoomAdmin

class RoomAdminSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = RoomAdmin
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }

