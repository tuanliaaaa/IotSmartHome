from rest_framework import serializers
from Entity.models.Mode import Mode
class ModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mode
        fields = '__all__'
