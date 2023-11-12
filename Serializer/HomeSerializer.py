from rest_framework import serializers
from django.db import transaction
from Entity.models.Home import Home
class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = '__all__'
