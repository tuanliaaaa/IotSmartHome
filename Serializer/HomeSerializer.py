from rest_framework import serializers
from Entity.models.Home import Home

class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }