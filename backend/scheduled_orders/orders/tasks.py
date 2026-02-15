import logging
from celery import shared_task
from django.utils import timezone
from .models import ScheduledOrder, OrderExecution

logger = logging.getLogger('orders')

@shared_task(bind=True)
def execute_scheduled_order(self, order_id):
    try:
        logger.info(f"Starting execution for order ID: {order_id}")

        scheduled_order = ScheduledOrder.objects.get(id=order_id)

        if not scheduled_order.is_active:
            logger.warning(f"Order {order_id} is inactive. Skipping.")
            return

        message = (
            f"Order placed for {scheduled_order.product} "
            f"(Qty: {scheduled_order.quantity})"
        )

        OrderExecution.objects.create(
            scheduled_order=scheduled_order,
            status='success',
            message=message
        )

        if scheduled_order.frequency == 'once':
            scheduled_order.is_active = False
            scheduled_order.save()
            logger.info(f"One-time order {order_id} deactivated.")

        logger.info(f"SUCCESS: {message}")

    except ScheduledOrder.DoesNotExist:
        logger.error(f"Order ID {order_id} does not exist.")

    except Exception as e:
        OrderExecution.objects.create(
            scheduled_order=scheduled_order,
            status='failed',
            message=str(e)
        )
        logger.exception(f"Execution failed for order {order_id}")
