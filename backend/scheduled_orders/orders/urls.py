from rest_framework.routers import DefaultRouter
from .views import ScheduledOrderViewSet, OrderExecutionViewSet

router = DefaultRouter()
router.register(r'scheduled-orders', ScheduledOrderViewSet, basename='scheduled-order')
router.register(r'executions', OrderExecutionViewSet, basename='execution')

urlpatterns = router.urls
