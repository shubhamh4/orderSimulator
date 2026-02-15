from rest_framework import serializers
from .models import ScheduledOrder, OrderExecution


class ScheduledOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = ScheduledOrder
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class OrderExecutionSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderExecution
        fields = '__all__'
