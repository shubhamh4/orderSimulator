from django.db import models
from django.contrib.auth.models import User


class ScheduledOrder(models.Model):

    FREQUENCY_CHOICES = [
        ('once', 'One Time'),
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='scheduled_orders')

    product = models.CharField(max_length=100, default="Coffee")
    quantity = models.PositiveIntegerField(default=1)

    start_time = models.DateTimeField()
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.product} ({self.frequency})"

class OrderExecution(models.Model):

    STATUS_CHOICES = [
        ('success', 'Success'),
        ('failed', 'Failed'),
    ]

    scheduled_order = models.ForeignKey(
        ScheduledOrder,
        on_delete=models.CASCADE,
        related_name='executions'
    )

    executed_at = models.DateTimeField(auto_now_add=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    message = models.TextField()

    def __str__(self):
        return f"Execution {self.id} - {self.status}"
