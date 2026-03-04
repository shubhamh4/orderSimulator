import json
from django_celery_beat.models import IntervalSchedule, PeriodicTask
from .models import ScheduledOrder
from django.utils import timezone


def create_or_update_periodic_task(order: ScheduledOrder):
    if timezone.is_naive(order.start_time):
        order.start_time = timezone.make_aware(
            order.start_time,
            timezone.get_current_timezone()
        )
    task_name = f"scheduled_order_{order.id}"

    # Delete existing task if exists
    PeriodicTask.objects.filter(name=task_name).delete()

    if not order.is_active:
        return

    if order.frequency == 'once':
        # One-time execution using ETA
        from .tasks import execute_scheduled_order
        execute_scheduled_order.apply_async(
            args=[order.id],
            eta=order.start_time
        )
        return

    # Handle recurring intervals
    if order.frequency == 'daily':
        schedule, _ = IntervalSchedule.objects.get_or_create(
            every=1,
            period=IntervalSchedule.DAYS,
        )

    elif order.frequency == 'weekly':
        schedule, _ = IntervalSchedule.objects.get_or_create(
            every=7,
            period=IntervalSchedule.DAYS,
        )

    elif order.frequency == 'monthly':
        schedule, _ = IntervalSchedule.objects.get_or_create(
            every=30,
            period=IntervalSchedule.DAYS,
        )

    else:
        return

    PeriodicTask.objects.create(
        interval=schedule,
        name=task_name,
        task='orders.tasks.execute_scheduled_order',
        args=json.dumps([order.id]),
        start_time=order.start_time
    )
