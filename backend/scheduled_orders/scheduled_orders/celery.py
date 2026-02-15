import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'scheduled_orders.settings')

app = Celery('scheduled_orders')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()
