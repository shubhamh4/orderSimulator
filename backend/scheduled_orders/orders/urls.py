from rest_framework.routers import DefaultRouter
from .views import ScheduledOrderViewSet, OrderExecutionViewSet, ProductViewSet

router = DefaultRouter()
router.register(r'scheduled-orders', ScheduledOrderViewSet, basename='scheduled-order')
router.register(r'executions', OrderExecutionViewSet, basename='execution')
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = router.urls
