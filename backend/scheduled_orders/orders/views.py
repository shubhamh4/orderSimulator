from rest_framework import viewsets, permissions
from .models import ScheduledOrder, OrderExecution, Product
from .serializers import ScheduledOrderSerializer, OrderExecutionSerializer, ProductSerializer
from django_celery_beat.models import IntervalSchedule, PeriodicTask
import json
from .services import create_or_update_periodic_task
from rest_framework.generics import ListAPIView
from rest_framework.authentication import get_authorization_header

class ScheduledOrderViewSet(viewsets.ModelViewSet):

    serializer_class = ScheduledOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ScheduledOrder.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        order = serializer.save(user=self.request.user)
        create_or_update_periodic_task(order)
    
    def perform_update(self, serializer):
        order = serializer.save()
        create_or_update_periodic_task(order)
        
    def perform_destroy(self, instance):
        from django_celery_beat.models import PeriodicTask
        task_name = f"scheduled_order_{instance.id}"
        PeriodicTask.objects.filter(name=task_name).delete()
        instance.delete()

class OrderExecutionViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = OrderExecutionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return OrderExecution.objects.filter(
            scheduled_order__user=self.request.user
        )

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Product.objects.all()